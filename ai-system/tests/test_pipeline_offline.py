"""
Test chạy offline (không cần mạng, không cần model BGE-M3 thật) — dùng
DeterministicFakeEmbedder để kiểm tra ĐÚNG phần logic quan trọng nhất:
chunking, retrieval, và đặc biệt là aggregate_error_type (MUST HAVE).

Chạy: python -m pytest tests/ -v   (từ thư mục fyset_llm_test)
"""
import os
import sys

sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from providers.embedder import DeterministicFakeEmbedder
from schemas.models import RetrievedChunk
from services.knowledge_base import KnowledgeBase, load_markdown_chunks
from services import resource_catalog


KNOWLEDGE_DIR = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "knowledge")


def test_load_markdown_chunks_off_by_one():
    filepath = os.path.join(KNOWLEDGE_DIR, "off_by_one.md")
    chunks = load_markdown_chunks(filepath)

    assert len(chunks) > 0
    assert all(c["error_type"] == "OFF_BY_ONE" for c in chunks)
    section_names = {c["section"] for c in chunks}
    assert "Definition" in section_names
    assert "Symptoms" in section_names


def test_knowledge_base_build_with_fake_embedder():
    kb = KnowledgeBase(DeterministicFakeEmbedder(), knowledge_dir=KNOWLEDGE_DIR).build()

    assert len(kb.documents) > 0
    known = kb.known_error_types()
    assert "OFF_BY_ONE" in known
    # Ghi lại đúng gap đã phát hiện: 5 loại lỗi trong taxonomy main.py KHÔNG
    # có knowledge tương ứng ở bản hiện tại.
    missing = {"MISSING_UPDATE", "WRONG_INITIALIZATION", "EDGE_CASE", "WRONG_FORMULA", "OTHER"}
    assert missing.isdisjoint(known), (
        "Nếu test này fail nghĩa là ai đó đã bổ sung knowledge cho các loại "
        "lỗi còn thiếu — cập nhật lại comment/cảnh báo liên quan trong "
        "resource_catalog.py và main.py."
    )


def test_retrieve_returns_relevant_chunks_for_off_by_one_query():
    kb = KnowledgeBase(DeterministicFakeEmbedder(), knowledge_dir=KNOWLEDGE_DIR).build()

    # Dùng chính từ khoá xuất hiện trong off_by_one.md để test retrieval
    # hoạt động đúng hướng (không kiểm tra semantic thật vì embedder giả).
    query = "for i <= n loop chạy dư một lần index boundary"
    results = kb.retrieve(query, top_k=5)

    assert len(results) == 5
    assert any(r.error_type == "OFF_BY_ONE" for r in results)


def test_aggregate_error_type_matches_roadmap_example():
    """Đúng ví dụ trong roadmap:
        OFF_BY_ONE       0.5901
        LOOP_CONDITION   0.5808
        OFF_BY_ONE       0.5710
        -> aggregate -> OFF_BY_ONE
    """
    chunks = [
        RetrievedChunk("off_by_one.md", "OFF_BY_ONE", "Definition", "...", 0.5901),
        RetrievedChunk("loop_condition.md", "LOOP_CONDITION", "Definition", "...", 0.5808),
        RetrievedChunk("off_by_one.md", "OFF_BY_ONE", "Symptoms", "...", 0.5710),
    ]

    best_type, confidence = KnowledgeBase.aggregate_error_type(chunks)

    assert best_type == "OFF_BY_ONE"
    expected_confidence = (0.5901 + 0.5710) / (0.5901 + 0.5808 + 0.5710)
    assert abs(confidence - expected_confidence) < 1e-6


def test_aggregate_error_type_empty_input_does_not_crash():
    best_type, confidence = KnowledgeBase.aggregate_error_type([])
    assert best_type == "OTHER"
    assert confidence == 0.0


def test_resource_catalog_returns_none_for_uncovered_type():
    # EDGE_CASE không có knowledge -> cũng không nên có resource giả
    assert resource_catalog.get_resource("EDGE_CASE") is None
    assert resource_catalog.get_resource("OFF_BY_ONE") is not None
