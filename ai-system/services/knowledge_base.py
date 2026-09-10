"""
KnowledgeBase: nạp knowledge/*.md, chunk theo heading cấp 2, embed, đánh index
FAISS, và cung cấp retrieval + error-type aggregation.

Đây là bản refactor có cấu trúc của rag.py gốc (vốn là 1 script chạy thẳng
từ trên xuống, không tái sử dụng được). Logic chunking giữ nguyên 100% so
với bản gốc bro đã viết — chỉ đóng gói lại thành class để orchestrator
(main.py) gọi được nhiều lần, và để test được.

CẬP NHẬT theo ARCHITECTURAL CONTRACT: aggregate_error_type() KHÔNG còn là
bước phân loại chính của pipeline (đã chuyển sang services/llm_classifier.py).
Hàm này giờ chỉ dùng trong 2 trường hợp:
  1. Làm fallback rõ ràng khi LLM Classifier lỗi (xem services/pipeline.py).
  2. Tiện ích nội bộ để test retrieval, không phải luồng chính.
Bước RAG chính trong pipeline dùng retrieve_for_error_type(): nhận error_type
ĐÃ được classifier xác định, build query từ template cố định (xem
services/query_templates.py), retrieve semantic bằng BGE-M3+FAISS, rồi
FILTER kết quả chỉ giữ đúng error_type đó — tránh việc retrieval tự kéo
nhầm chunk của loại lỗi khác vào Top-K.
"""
import os
import re
from typing import List, Tuple

import numpy as np

from schemas.models import RetrievedChunk

try:
    import faiss
except ImportError:  # pragma: no cover
    faiss = None


def load_markdown_chunks(filepath: str) -> List[dict]:
    """Tách 1 file .md thành các chunk theo heading cấp 2 (##).

    Giữ nguyên logic từ rag.py gốc.
    """
    with open(filepath, "r", encoding="utf-8") as f:
        content = f.read()

    filename = os.path.basename(filepath)
    error_type = os.path.splitext(filename)[0].upper()

    sections = re.split(r"\n(?=## )", content)
    chunks = []

    for section in sections:
        section = section.strip()
        if not section:
            continue

        lines = section.splitlines()
        if lines[0].startswith("## "):
            section_name = lines[0][3:].strip()
        else:
            section_name = "Introduction"

        chunks.append(
            {
                "filename": filename,
                "error_type": error_type,
                "section": section_name,
                "text": section,
            }
        )

    return chunks


class KnowledgeBase:
    def __init__(self, embedder, knowledge_dir: str = "knowledge"):
        self.embedder = embedder
        self.knowledge_dir = knowledge_dir
        self.documents: List[dict] = []
        self.index = None

    def build(self) -> "KnowledgeBase":
        if not os.path.isdir(self.knowledge_dir):
            raise FileNotFoundError(f"Không tìm thấy thư mục knowledge base: {self.knowledge_dir}")

        documents = []
        for filename in sorted(os.listdir(self.knowledge_dir)):
            if not filename.endswith(".md"):
                continue
            filepath = os.path.join(self.knowledge_dir, filename)
            documents.extend(load_markdown_chunks(filepath))

        if not documents:
            raise ValueError(f"Knowledge base rỗng, không có file .md nào trong {self.knowledge_dir}")

        self.documents = documents
        texts = [doc["text"] for doc in documents]
        embeddings = self.embedder.encode(texts, normalize=True)

        if faiss is None:
            raise ImportError("Chưa cài `faiss-cpu`. Chạy: pip install faiss-cpu")

        dimension = embeddings.shape[1]
        self.index = faiss.IndexFlatIP(dimension)
        self.index.add(embeddings)
        return self

    def known_error_types(self) -> set:
        """Danh sách error_type THỰC SỰ có tài liệu trong knowledge base.

        Quan trọng: dùng để phát hiện các error_type trong taxonomy (main.py)
        nhưng KHÔNG có file .md tương ứng (ví dụ MISSING_UPDATE, EDGE_CASE,
        WRONG_FORMULA, OTHER ở bản hiện tại) -> RAG sẽ không bao giờ đoán
        đúng các loại này vì không có gì để retrieve. Đây là giới hạn thật
        của hệ thống, phải nêu rõ trong báo cáo (mục 8), không nên che giấu.
        """
        return {doc["error_type"] for doc in self.documents}

    def retrieve(self, query: str, top_k: int = 5) -> List[RetrievedChunk]:
        if self.index is None:
            raise RuntimeError("KnowledgeBase chưa build(). Gọi .build() trước.")

        query_embedding = self.embedder.encode([query], normalize=True)
        scores, indices = self.index.search(query_embedding, top_k)

        results = []
        for idx, score in zip(indices[0], scores[0]):
            if idx < 0:
                continue
            doc = self.documents[idx]
            results.append(
                RetrievedChunk(
                    filename=doc["filename"],
                    error_type=doc["error_type"],
                    section=doc["section"],
                    text=doc["text"],
                    score=float(score),
                )
            )
        return results

    def retrieve_for_error_type(self, query: str, error_type: str, top_k: int = 5, pool_size: int = None) -> List[RetrievedChunk]:
        """Retrieve rồi FILTER theo error_type đã biết trước (từ LLM Classifier).

        Đây là bước RAG đúng theo ARCHITECTURAL CONTRACT: classifier đã xác
        định error_type, RAG chỉ có nhiệm vụ tìm kiến thức liên quan đến
        đúng loại lỗi đó — không được để retrieval tự kéo nhầm chunk của
        error_type khác vào Top-K cuối cùng trả về.

        Cách làm: retrieve một pool rộng hơn top_k (mặc định gấp 4 lần, tối
        thiểu toàn bộ knowledge base nếu nhỏ) bằng semantic search FAISS
        thật, sau đó lọc chỉ giữ chunk có đúng error_type, rồi cắt về top_k.
        Nếu error_type không có bất kỳ chunk nào (thuộc nhóm chưa coverage),
        trả về list rỗng — KHÔNG fallback ngầm sang error_type khác.
        """
        if pool_size is None:
            pool_size = max(top_k * 4, len(self.documents))
        pool_size = min(pool_size, len(self.documents))

        pool = self.retrieve(query, top_k=pool_size)
        filtered = [c for c in pool if c.error_type == error_type]
        return filtered[:top_k]

    @staticmethod
    def aggregate_error_type(chunks: List[RetrievedChunk]) -> Tuple[str, float]:
        """Group theo error_type -> cộng dồn score -> chọn error_type có tổng
        score cao nhất. confidence = tỉ trọng score của error_type thắng
        trên tổng score của toàn bộ top-K (không phải xác suất thống kê
        chuẩn, chỉ là một proxy đơn giản, cần nói rõ trong báo cáo).

        Khớp đúng ví dụ trong roadmap:
            OFF_BY_ONE       0.5901
            LOOP_CONDITION   0.5808
            OFF_BY_ONE       0.5710
            -> aggregate -> OFF_BY_ONE (0.5901+0.5710=1.1611 > 0.5808)
        """
        if not chunks:
            return "OTHER", 0.0

        totals: dict = {}
        for c in chunks:
            totals[c.error_type] = totals.get(c.error_type, 0.0) + c.score

        best_type = max(totals, key=totals.get)
        total_all = sum(totals.values())
        confidence = totals[best_type] / total_all if total_all > 0 else 0.0
        return best_type, confidence
