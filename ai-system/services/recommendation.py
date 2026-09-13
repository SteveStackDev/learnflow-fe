"""
Ranking resource theo feedback + luồng xử lý khi user bấm "Không liên quan"
— đúng kiến trúc trong tài liệu bro đưa:

    Video A -> OFF_BY_ONE -> "Không đúng lỗi" -> Negative feedback
        -> Giảm ranking Video A cho context tương tự -> Retrieve Video B

và:

    Bấm "Không liên quan" -> hỏi "Tìm tài liệu khác hay giải thích trực tiếp?"
        -> Tìm tài liệu khác: loại resource đã bị reject, recommend cái tiếp theo
        -> Giải thích cho tôi: gọi thẳng explainer với evidence đã có
"""
from typing import List, Optional

from schemas.models import Resource
from services import feedback, resource_catalog


def rank_candidates(error_type: str, exclude_ids: Optional[List[str]] = None, retrieved_knowledge: Optional[list] = None) -> List[Resource]:
    """Xếp hạng toàn bộ resource ứng viên của 1 error_type theo usefulness
    score (tính từ feedback thật), loại các resource_id trong exclude_ids
    (ví dụ đã bị user reject trong phiên hiện tại).

    retrieved_knowledge: các RetrievedChunk từ bước RAG, truyền vào theo
    đúng shape input mà ARCHITECTURAL CONTRACT yêu cầu cho Recommendation
    (error_type + retrieved knowledge + feedback). MVP hiện CHƯA dùng nội
    dung chunk để thay đổi thứ hạng (ranking vẫn thuần theo feedback) — chỗ
    này để sẵn cho bước personalization sau này, không tự ý implement thêm
    logic ngoài phạm vi đã thống nhất.
    """
    exclude_ids = set(exclude_ids or [])
    candidates = [r for r in resource_catalog.get_candidates(error_type) if r.resource_id not in exclude_ids]

    # Sắp theo usefulness_score giảm dần; hoà thì giữ thứ tự gốc trong catalog
    # (ổn định vì Python sort là stable sort).
    candidates.sort(key=lambda r: feedback.usefulness_score(r.resource_id), reverse=True)
    return candidates


def recommend_resource(error_type: str, exclude_ids: Optional[List[str]] = None, retrieved_knowledge: Optional[list] = None) -> Optional[Resource]:
    """Resource được xếp hạng cao nhất, dùng cho cả lần gợi ý đầu tiên lẫn
    lần gợi ý lại sau khi user reject resource trước đó."""
    ranked = rank_candidates(error_type, exclude_ids=exclude_ids, retrieved_knowledge=retrieved_knowledge)
    return ranked[0] if ranked else None


def handle_negative_feedback(
    user_id: str,
    error_type: str,
    rejected_resource_id: str,
    reason: str,
    follow_up_choice: str,
    already_excluded: Optional[List[str]] = None,
) -> dict:
    """Xử lý sau khi user bấm "Không liên quan" + chọn lý do + chọn hướng
    tiếp theo.

    follow_up_choice:
      - "FIND_ANOTHER"     -> trả resource tiếp theo (đã loại resource vừa bị reject)
      - "EXPLAIN_DIRECTLY" -> trả tín hiệu để pipeline gọi explainer trực tiếp
                              (không cần resource nữa)

    Trả về dict thống nhất để lớp gọi (API/CLI) dễ xử lý, không trả thẳng
    dataclass để tránh phải serialize thủ công ở nhiều nơi.
    """
    feedback.log_feedback(
        user_id=user_id,
        error_type=error_type,
        resource_id=rejected_resource_id,
        relevant=False,
        reason=reason,
    )

    if follow_up_choice == "FIND_ANOTHER":
        exclude_ids = list(already_excluded or []) + [rejected_resource_id]
        next_resource = recommend_resource(error_type, exclude_ids=exclude_ids)
        if next_resource is None:
            return {
                "action": "NO_MORE_RESOURCE",
                "message": "Đã hết resource khác cho loại lỗi này — nên chuyển sang giải thích trực tiếp.",
            }
        return {"action": "SHOW_RESOURCE", "resource": next_resource}

    if follow_up_choice == "EXPLAIN_DIRECTLY":
        return {"action": "TRIGGER_EXPLAIN"}

    raise ValueError(f"follow_up_choice không hợp lệ: {follow_up_choice!r}")


def log_positive_feedback(user_id: str, error_type: str, resource_id: str) -> dict:
    return feedback.log_feedback(
        user_id=user_id, error_type=error_type, resource_id=resource_id, relevant=True, reason=""
    )
