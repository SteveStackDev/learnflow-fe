"""
Resource metadata (roadmap mục "4. Thêm resource metadata").

QUAN TRỌNG: đây là dữ liệu placeholder — chỉ 6 error_type có knowledge/*.md
mới có resource thật để gán. 5 error_type còn lại trong taxonomy của
main.py (MISSING_UPDATE, WRONG_INITIALIZATION, EDGE_CASE, WRONG_FORMULA,
OTHER) CHƯA có resource — cần bổ sung bài viết/video cho các loại này trước
khi demo, nếu không hệ thống sẽ trả "chưa có tài nguyên phù hợp" cho ~40%
số case trong bộ ground_truth hiện tại (xem knowledge_base.known_error_types).
"""
from typing import Optional

from schemas.models import Resource

_CATALOG = {
    "OFF_BY_ONE": [
        Resource(
            resource_id="off_by_one_01",
            resource_type="video",
            title="Hiểu lỗi lệch một đơn vị (off-by-one) trong vòng lặp",
            difficulty="beginner",
            error_type="OFF_BY_ONE",
        ),
        Resource(
            resource_id="off_by_one_article_01",
            resource_type="article",
            title="Vì sao `i <= n` thường là dấu hiệu của off-by-one",
            difficulty="beginner",
            error_type="OFF_BY_ONE",
        ),
    ],
    "LOOP_CONDITION": [
        Resource(
            resource_id="loop_condition_01",
            resource_type="video",
            title="Phân biệt điều kiện dừng vòng lặp sai logic vs sai một đơn vị",
            difficulty="beginner",
            error_type="LOOP_CONDITION",
        ),
        Resource(
            resource_id="loop_condition_02",
            resource_type="article",
            title="Checklist: kiểm tra điều kiện vòng lặp trước khi nộp bài",
            difficulty="beginner",
            error_type="LOOP_CONDITION",
        ),
    ],
    "BOUNDARY_ERROR": [
        Resource(
            resource_id="boundary_error_01",
            resource_type="video",
            title="Xử lý điều kiện biên trong bài toán mảng/số",
            difficulty="intermediate",
            error_type="BOUNDARY_ERROR",
        ),
    ],
    "INTEGER_OVERFLOW": [
        Resource(
            resource_id="integer_overflow_01",
            resource_type="article",
            title="Khi nào cần dùng long long thay vì int trong C++",
            difficulty="beginner",
            error_type="INTEGER_OVERFLOW",
        ),
    ],
    "WRONG_SORT_ORDER": [
        Resource(
            resource_id="wrong_sort_order_01",
            resource_type="video",
            title="Sắp xếp tăng dần vs giảm dần: chọn sai chiều ảnh hưởng thuật toán Greedy thế nào",
            difficulty="beginner",
            error_type="WRONG_SORT_ORDER",
        ),
    ],
    "GREEDY_LOGIC_ERROR": [
        Resource(
            resource_id="greedy_logic_error_01",
            resource_type="video",
            title="Vì sao chiến lược Greedy của bạn không tối ưu",
            difficulty="intermediate",
            error_type="GREEDY_LOGIC_ERROR",
        ),
    ],
}


def get_resource(error_type: str) -> Optional[Resource]:
    """Trả về resource đầu tiên phù hợp, hoặc None nếu chưa có tài nguyên
    cho error_type này (xem cảnh báo ở đầu file).

    Giữ hàm này để tương thích ngược (ai gọi code cũ không bị vỡ), nhưng
    pipeline chính giờ dùng services.recommendation.recommend_resource() để
    có ranking theo feedback thay vì luôn trả về ứng viên đầu tiên."""
    candidates = _CATALOG.get(error_type)
    return candidates[0] if candidates else None


def get_candidates(error_type: str) -> list:
    """Toàn bộ resource ứng viên cho 1 error_type (chưa xếp hạng)."""
    return list(_CATALOG.get(error_type, []))


def covered_error_types() -> set:
    return set(_CATALOG.keys())
