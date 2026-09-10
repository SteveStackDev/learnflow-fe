"""
Feedback: log + tính usefulness score theo resource_id (đúng ví dụ trong
tài liệu kiến trúc: Video A 78% hữu ích vs Video B 91% hữu ích -> B nên được
ranking cao hơn).

Vẫn cố tình đơn giản: không có ML, chỉ là tỉ lệ positive/negative có làm mượt
Laplace (Bayesian smoothing) để tránh 1 feedback đầu tiên đẩy score về 0%
hoặc 100% ngay lập tức — hợp lý hơn cho một hệ thống mới có rất ít dữ liệu.
"""
import json
import os
import time
from typing import Tuple

FEEDBACK_LOG = "data/feedback/feedback_log.jsonl"

REASON_CODES = {
    "TOO_BASIC",           # Quá cơ bản
    "TOO_ADVANCED",        # Quá nâng cao
    "WRONG_ERROR",         # Không đúng lỗi của tôi
    "EXAMPLE_NOT_SIMILAR", # Ví dụ không giống bài của tôi
    "STILL_CONFUSED",      # Tôi vẫn chưa hiểu
    "OTHER",               # Khác...
}


def log_feedback(user_id: str, error_type: str, resource_id: str, relevant: bool, reason: str = "") -> dict:
    if not relevant and reason and reason not in REASON_CODES:
        raise ValueError(f"reason không hợp lệ: {reason!r}. Phải thuộc {REASON_CODES}")

    os.makedirs(os.path.dirname(FEEDBACK_LOG), exist_ok=True)
    entry = {
        "user_id": user_id,
        "error_type": error_type,
        "resource_id": resource_id,
        "relevant": relevant,
        "reason": reason,
        "timestamp": time.strftime("%Y-%m-%dT%H:%M:%S"),
    }
    with open(FEEDBACK_LOG, "a", encoding="utf-8") as f:
        f.write(json.dumps(entry, ensure_ascii=False) + "\n")
    return entry


def _read_all_feedback() -> list:
    if not os.path.exists(FEEDBACK_LOG):
        return []
    with open(FEEDBACK_LOG, "r", encoding="utf-8") as f:
        return [json.loads(line) for line in f if line.strip()]


def usefulness_stats(resource_id: str) -> Tuple[int, int]:
    """Trả (số positive, số negative) đã ghi nhận cho resource này."""
    positive = negative = 0
    for entry in _read_all_feedback():
        if entry["resource_id"] != resource_id:
            continue
        if entry["relevant"]:
            positive += 1
        else:
            negative += 1
    return positive, negative


def usefulness_score(resource_id: str) -> float:
    """Điểm hữu ích trong [0, 1], làm mượt Laplace (+1/+2) để chưa có feedback
    nào thì score = 0.5 (trung tính), không phải 0 hay 1 tuyệt đối."""
    positive, negative = usefulness_stats(resource_id)
    return (positive + 1) / (positive + negative + 2)


def reason_breakdown(error_type: str) -> dict:
    """Đếm số lượt feedback âm theo từng lý do, cho 1 error_type — dùng để
    biết resource đang thiếu hụt kiểu gì (quá cơ bản? sai lỗi? ...), phục vụ
    mục 8 báo cáo (phân tích hạn chế)."""
    counts = {code: 0 for code in REASON_CODES}
    for entry in _read_all_feedback():
        if entry["error_type"] == error_type and not entry["relevant"] and entry.get("reason"):
            counts[entry["reason"]] = counts.get(entry["reason"], 0) + 1
    return counts
