"""
Test cho phần feedback + ranking (services/feedback.py, services/recommendation.py).

Dùng 1 file log tạm (không đụng data/feedback/feedback_log.jsonl thật) để
test không ảnh hưởng dữ liệu demo.
"""
import os
import sys

sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

import pytest

from services import feedback, recommendation


@pytest.fixture(autouse=True)
def isolated_feedback_log(tmp_path, monkeypatch):
    """Trỏ FEEDBACK_LOG sang file tạm cho mỗi test, tránh ghi đè log thật."""
    log_path = tmp_path / "feedback_log.jsonl"
    monkeypatch.setattr(feedback, "FEEDBACK_LOG", str(log_path))
    yield


def test_usefulness_score_neutral_with_no_feedback():
    assert feedback.usefulness_score("off_by_one_01") == pytest.approx(0.5)


def test_usefulness_score_matches_roadmap_example_direction():
    # Video A: 78% hữu ích (giả lập bằng 78 positive / 22 negative)
    for _ in range(78):
        feedback.log_feedback("u", "OFF_BY_ONE", "video_a", relevant=True)
    for _ in range(22):
        feedback.log_feedback("u", "OFF_BY_ONE", "video_a", relevant=False, reason="STILL_CONFUSED")

    # Video B: 91% hữu ích
    for _ in range(91):
        feedback.log_feedback("u", "OFF_BY_ONE", "video_b", relevant=True)
    for _ in range(9):
        feedback.log_feedback("u", "OFF_BY_ONE", "video_b", relevant=False, reason="STILL_CONFUSED")

    score_a = feedback.usefulness_score("video_a")
    score_b = feedback.usefulness_score("video_b")

    assert score_b > score_a
    assert 0.75 < score_a < 0.81
    assert 0.88 < score_b < 0.93


def test_log_feedback_rejects_invalid_reason():
    with pytest.raises(ValueError):
        feedback.log_feedback("u", "OFF_BY_ONE", "off_by_one_01", relevant=False, reason="NOT_A_REAL_REASON")


def test_rank_candidates_excludes_rejected_resource():
    ranked_before = recommendation.rank_candidates("OFF_BY_ONE")
    ids_before = [r.resource_id for r in ranked_before]
    assert "off_by_one_01" in ids_before

    ranked_after = recommendation.rank_candidates("OFF_BY_ONE", exclude_ids=["off_by_one_01"])
    ids_after = [r.resource_id for r in ranked_after]
    assert "off_by_one_01" not in ids_after


def test_negative_feedback_then_reranks_below_alternative():
    # off_by_one_01 bị reject nhiều lần vì "ví dụ không giống bài" -> score giảm
    for _ in range(5):
        feedback.log_feedback(
            "u", "OFF_BY_ONE", "off_by_one_01", relevant=False, reason="EXAMPLE_NOT_SIMILAR"
        )
    # off_by_one_article_01 được feedback tốt
    for _ in range(5):
        feedback.log_feedback("u", "OFF_BY_ONE", "off_by_one_article_01", relevant=True)

    ranked = recommendation.rank_candidates("OFF_BY_ONE")
    assert ranked[0].resource_id == "off_by_one_article_01"


def test_handle_negative_feedback_find_another_returns_next_resource():
    result = recommendation.handle_negative_feedback(
        user_id="u1",
        error_type="OFF_BY_ONE",
        rejected_resource_id="off_by_one_01",
        reason="WRONG_ERROR",
        follow_up_choice="FIND_ANOTHER",
    )
    assert result["action"] == "SHOW_RESOURCE"
    assert result["resource"].resource_id != "off_by_one_01"

    # Feedback phải được ghi lại
    positive, negative = feedback.usefulness_stats("off_by_one_01")
    assert negative == 1


def test_handle_negative_feedback_explain_directly_returns_trigger():
    result = recommendation.handle_negative_feedback(
        user_id="u1",
        error_type="OFF_BY_ONE",
        rejected_resource_id="off_by_one_01",
        reason="STILL_CONFUSED",
        follow_up_choice="EXPLAIN_DIRECTLY",
    )
    assert result["action"] == "TRIGGER_EXPLAIN"


def test_handle_negative_feedback_no_more_resource_when_all_excluded():
    result = recommendation.handle_negative_feedback(
        user_id="u1",
        error_type="LOOP_CONDITION",
        rejected_resource_id="loop_condition_01",
        reason="TOO_BASIC",
        follow_up_choice="FIND_ANOTHER",
        already_excluded=["loop_condition_02"],
    )
    assert result["action"] == "NO_MORE_RESOURCE"
