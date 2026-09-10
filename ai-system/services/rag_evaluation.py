"""
Đánh giá RIÊNG chất lượng retrieval của RAG — đúng mục 8 ARCHITECTURAL
CONTRACT. KHÔNG dùng aggregate_error_type(), KHÔNG dùng LLM Classifier —
chỉ đo trực tiếp thứ hạng error_type của các chunk trả về từ
KnowledgeBase.retrieve() (semantic search thô, BGE-M3 + FAISS).

Không được gộp kết quả này với accuracy của classifier.
"""
import json
import os

from services.knowledge_base import KnowledgeBase


def evaluate_retrieval(kb: KnowledgeBase, queries_file: str, top_k: int = 3, result_file: str = None) -> dict:
    with open(queries_file, "r", encoding="utf-8") as f:
        eval_set = json.load(f)

    per_query = []
    hit_at_1 = 0
    hit_at_k = 0
    reciprocal_ranks = []

    for item in eval_set:
        query = item["query"]
        expected = item["error_type"]

        chunks = kb.retrieve(query, top_k=top_k)
        labels = [c.error_type for c in chunks]

        is_hit_1 = bool(labels) and labels[0] == expected
        is_hit_k = expected in labels

        rank = next((i + 1 for i, l in enumerate(labels) if l == expected), None)
        rr = 1.0 / rank if rank else 0.0

        hit_at_1 += int(is_hit_1)
        hit_at_k += int(is_hit_k)
        reciprocal_ranks.append(rr)

        per_query.append({
            "query": query,
            "expected_error_type": expected,
            "retrieved_error_types": labels,
            "retrieved_scores": [round(c.score, 4) for c in chunks],
            "hit_at_1": is_hit_1,
            f"hit_at_{top_k}": is_hit_k,
            "rank_of_expected": rank,
            "reciprocal_rank": rr,
        })

    n = len(eval_set)
    summary = {
        "n_queries": n,
        "top_k": top_k,
        "hit_at_1": hit_at_1 / n if n else 0.0,
        f"hit_at_{top_k}": hit_at_k / n if n else 0.0,
        f"recall_at_{top_k}": hit_at_k / n if n else 0.0,  # tương đương Hit@K vì mỗi query chỉ có 1 error_type liên quan
        "mrr": sum(reciprocal_ranks) / n if n else 0.0,
        "note": (
            f"Recall@{top_k} == Hit@{top_k} trong bộ eval này vì mỗi query chỉ có "
            "đúng 1 error_type liên quan (single-relevant-class), không phải trùng "
            "hợp tính sai."
        ),
    }

    output = {"summary": summary, "per_query": per_query}

    if result_file:
        os.makedirs(os.path.dirname(result_file), exist_ok=True)
        with open(result_file, "w", encoding="utf-8") as f:
            json.dump(output, f, ensure_ascii=False, indent=2)

    return output
