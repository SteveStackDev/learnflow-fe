"""
RAG_QUERY_TEMPLATES: query cố định (deterministic), viết tay dựa trên đúng
nội dung "Typical Keywords" + "Symptoms" của từng file knowledge/*.md.

KHÔNG dùng LLM để tự sinh query — đúng yêu cầu "Speedrun thì deterministic
trước" — để demo dễ giải thích, reproducible 100% giữa các lần chạy.

Chỉ có 6 error_type ở đây vì knowledge base hiện chỉ phủ 6/11 loại (xem
services/knowledge_base.py -> known_error_types()).
"""

RAG_QUERY_TEMPLATES = {
    "OFF_BY_ONE": (
        "C++ off-by-one error, index lệch một đơn vị, loop bound i <= n "
        "hoặc i < n, vòng lặp chạy thừa hoặc thiếu đúng một phần tử"
    ),
    "LOOP_CONDITION": (
        "C++ sai điều kiện dừng vòng lặp, logic biểu thức while hoặc for sai, "
        "vòng lặp chạy vô hạn hoặc kết thúc quá sớm, dùng && thay vì ||"
    ),
    "BOUNDARY_ERROR": (
        "C++ sai miền giá trị hoặc search space, binary search boundary, "
        "two pointers range, invariant sai, left right mid low high"
    ),
    "INTEGER_OVERFLOW": (
        "C++ tràn số nguyên integer overflow, kết quả vượt phạm vi int, "
        "cần dùng long long, overflow khi nhân hoặc cộng giá trị lớn"
    ),
    "WRONG_SORT_ORDER": (
        "C++ sắp xếp sai thứ tự, ascending thay vì descending, sai comparator, "
        "sort theo sai tiêu chí property"
    ),
    "GREEDY_LOGIC_ERROR": (
        "C++ chiến lược greedy sai, lựa chọn cục bộ không tối ưu, "
        "sai tiêu chí lựa chọn, exchange argument không đúng"
    ),
}


def build_rag_query(error_type: str) -> str:
    """query = f'{error_type}: {template}' — đúng format contract yêu cầu.

    Nếu error_type không có template (thuộc nhóm chưa có knowledge coverage),
    trả về query rỗng có đánh dấu rõ, để bên gọi biết mà xử lý (không nên
    retrieve gì cả thay vì retrieve nhầm)."""
    template = RAG_QUERY_TEMPLATES.get(error_type)
    if template is None:
        return f"{error_type}: [KHÔNG CÓ TEMPLATE - error_type chưa có knowledge coverage]"
    return f"{error_type}: {template}"
