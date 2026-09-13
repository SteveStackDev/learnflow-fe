"""
Schemas dùng chung cho toàn bộ pipeline chẩn đoán lỗi FySet.

Dùng dataclass thường (không phụ thuộc pydantic) để nhẹ, dễ đọc.
"""
from dataclasses import dataclass, field
from typing import Optional


@dataclass
class RetrievedChunk:
    """Một đoạn (chunk) tri thức lấy từ knowledge base sau bước retrieval."""
    filename: str
    error_type: str
    section: str
    text: str
    score: float


@dataclass
class ClassificationResult:
    """Kết quả bước phân loại lỗi (dù bằng RAG aggregation hay LLM)."""
    error_type: str
    confidence: float
    source: str  # "rag_aggregation" | "llm" | "heuristic_fallback"
    evidence: list = field(default_factory=list)  # list[RetrievedChunk] nếu có


@dataclass
class Resource:
    resource_id: str
    resource_type: str  # "video" | "article" | "exercise"
    title: str
    difficulty: str     # "beginner" | "intermediate" | "advanced"
    error_type: str
    url: Optional[str] = None


@dataclass
class Diagnosis:
    """Kết quả cuối cùng trả về cho Frontend — khớp schema mục 5 trong hồ sơ dự án."""
    error_type: str
    confidence: float
    suspected_location: str
    explanation: str
    related_topic: str
    recommended_resource: Optional[dict]
    classification_source: str
    retrieved_evidence: list = field(default_factory=list)  # list[str] tên section đã dùng làm bằng chứng
