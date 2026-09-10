"""
Abstraction cho tầng embedding, để KnowledgeBase không phụ thuộc cứng vào
sentence-transformers — tiện cho unit test chạy offline (không cần tải model
BGE-M3 ~2GB mỗi lần chạy CI), và tiện đổi model embedding sau này nếu cần.
"""
import hashlib
import numpy as np


class BgeM3Embedder:
    """Embedder thật, dùng cho môi trường chạy chính thức (cần cài
    sentence-transformers + tải model BAAI/bge-m3 lần đầu)."""

    def __init__(self, model_name: str = "BAAI/bge-m3"):
        from sentence_transformers import SentenceTransformer  # import trễ

        self.model = SentenceTransformer(model_name)

    def encode(self, texts: list, normalize: bool = True) -> np.ndarray:
        vecs = self.model.encode(texts, normalize_embeddings=normalize, show_progress_bar=False)
        return np.asarray(vecs, dtype="float32")


class DeterministicFakeEmbedder:
    """Embedder giả, KHÔNG dùng cho production.

    Chỉ dùng để test logic retrieval/aggregation (KnowledgeBase, ranking...)
    mà không cần tải model thật hay có mạng. Băm từng từ trong văn bản thành
    một vector cố định (hash trick) rồi cộng dồn + chuẩn hoá — đủ để hai đoạn
    văn bản có nhiều từ trùng nhau cho ra similarity cao hơn, mô phỏng đúng
    hành vi cần kiểm tra (aggregation theo error_type) mà không cần ngữ nghĩa
    thật.
    """

    def __init__(self, dim: int = 256):
        self.dim = dim

    def _hash_vec(self, token: str) -> np.ndarray:
        h = hashlib.sha256(token.encode("utf-8")).digest()
        seed = int.from_bytes(h[:8], "little")
        rng = np.random.default_rng(seed)
        return rng.normal(size=self.dim).astype("float32")

    def encode(self, texts: list, normalize: bool = True) -> np.ndarray:
        out = []
        for text in texts:
            tokens = text.lower().split()
            if not tokens:
                vec = np.zeros(self.dim, dtype="float32")
            else:
                vec = np.mean([self._hash_vec(t) for t in tokens], axis=0)
            if normalize:
                norm = np.linalg.norm(vec)
                if norm > 0:
                    vec = vec / norm
            out.append(vec)
        return np.asarray(out, dtype="float32")
