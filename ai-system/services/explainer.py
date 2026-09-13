"""
Bước cuối của pipeline: đưa error_type (đã xác định bởi RAG aggregation)
+ các đoạn tri thức liên quan (retrieved evidence) + code + đề bài cho LLM,
để sinh lời giải thích cá nhân hóa — đây chính là "LLM + retrieved context"
(MUST HAVE) và đúng schema output đã thiết kế ở mục 5 hồ sơ dự án.

Nếu LLM không gọi được, dùng fallback dựng câu giải thích trực tiếp từ nội
dung retrieved evidence (KHÔNG bịa, chỉ ghép lại phần "Symptoms"/"Definition"
từ chunk điểm cao nhất) — để pipeline luôn trả về một kết quả có ích, thay
vì lỗi trắng như bản cũ.
"""
from typing import List

from providers.llm_provider import LLMProvider, LLMUnavailableError
from schemas.models import Diagnosis, RetrievedChunk


_SYSTEM = (
    "Bạn là trợ lý AI giải thích lỗi lập trình cho sinh viên đang tự học. "
    "Chỉ được HƯỚNG DẪN, không được đưa code đáp án đầy đủ."
)


def _build_prompt(problem: dict, code: str, error_type: str, evidence: List[RetrievedChunk]) -> str:
    import json as _json

    evidence_text = "\n\n".join(
        f"[{c.error_type} - {c.section}]\n{c.text}" for c in evidence
    )
    problem_text = _json.dumps(problem, ensure_ascii=False, indent=2)

    return f"""
Sinh viên vừa nộp bài và bị Wrong Answer. Hệ thống đã xác định loại lỗi khả
năng cao nhất là: {error_type}

Đề bài:
{problem_text}

Code của sinh viên:
```cpp
{code}
```

Tài liệu tham khảo liên quan (dùng làm bằng chứng, không tự bịa thêm kiến
thức ngoài các tài liệu này):
{evidence_text}

Hãy trả về CHỈ một JSON hợp lệ, không markdown, đúng cấu trúc:

{{
  "suspected_location": "mô tả ngắn vị trí/đoạn code nghi ngờ gây lỗi",
  "explanation": "giải thích ngắn gọn (3-5 câu), hướng dẫn sinh viên tự sửa, KHÔNG đưa code đáp án đầy đủ",
  "related_topic": "kiến thức nên ôn lại, ngắn gọn"
}}
"""


def explain(
    llm: LLMProvider,
    problem: dict,
    code: str,
    error_type: str,
    confidence: float,
    evidence: List[RetrievedChunk],
) -> Diagnosis:
    resource = None  # gán ở pipeline.py, service này không biết về resource_catalog

    try:
        prompt = _build_prompt(problem, code, error_type, evidence)
        parsed = llm.chat_json(system=_SYSTEM, user=prompt)
        return Diagnosis(
            error_type=error_type,
            confidence=confidence,
            suspected_location=parsed.get("suspected_location", ""),
            explanation=parsed.get("explanation", ""),
            related_topic=parsed.get("related_topic", error_type),
            recommended_resource=resource,
            classification_source="rag_aggregation",
            retrieved_evidence=[f"{c.filename}#{c.section}" for c in evidence],
        )
    except LLMUnavailableError as e:
        return _fallback_explain(error_type, confidence, evidence, reason=str(e))


def _fallback_explain(error_type: str, confidence: float, evidence: List[RetrievedChunk], reason: str) -> Diagnosis:
    """Không gọi được LLM -> ghép trực tiếp từ evidence, không bịa nội dung.

    Ưu tiên section "Symptoms" hoặc "Definition" của chunk có điểm cao nhất
    cùng error_type để làm câu giải thích tối thiểu.
    """
    same_type = [c for c in evidence if c.error_type == error_type]
    pick = None
    for wanted_section in ("Symptoms", "Definition"):
        for c in same_type:
            if c.section.lower() == wanted_section.lower():
                pick = c
                break
        if pick:
            break
    if pick is None and same_type:
        pick = same_type[0]

    explanation = (
        f"[Chế độ dự phòng - LLM không khả dụng: {reason}] "
        + (pick.text[:400] if pick else "Không tìm thấy tài liệu phù hợp cho loại lỗi này.")
    )

    return Diagnosis(
        error_type=error_type,
        confidence=confidence,
        suspected_location="(cần LLM để xác định vị trí cụ thể trong code)",
        explanation=explanation,
        related_topic=error_type,
        recommended_resource=None,
        classification_source="rag_aggregation_fallback_no_llm",
        retrieved_evidence=[f"{c.filename}#{c.section}" for c in evidence],
    )
