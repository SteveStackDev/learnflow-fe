import os
import sys

sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

import pytest

from providers.embedder import DeterministicFakeEmbedder
from providers.llm_provider import LLMAPIError, LLMInvalidResponseError, LLMProvider, LLMTruncatedError
from schemas.models import ClassificationResult
from services import classifier_benchmark, llm_classifier, rag_evaluation
from services.knowledge_base import KnowledgeBase
from services.pipeline import classify_error_type
from services.query_templates import RAG_QUERY_TEMPLATES, build_rag_query

KNOWLEDGE_DIR = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "knowledge")
PROJECT_ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


# ---------------------------------------------------------------------------
# query_templates.py
# ---------------------------------------------------------------------------

def test_build_rag_query_format():
    query = build_rag_query("OFF_BY_ONE")
    assert query.startswith("OFF_BY_ONE:")
    assert RAG_QUERY_TEMPLATES["OFF_BY_ONE"] in query


def test_build_rag_query_unknown_type_marks_no_template():
    query = build_rag_query("EDGE_CASE")  # chưa có knowledge coverage
    assert "KHÔNG CÓ TEMPLATE" in query


# ---------------------------------------------------------------------------
# retrieve_for_error_type: RAG filter theo error_type đã biết
# ---------------------------------------------------------------------------

def test_retrieve_for_error_type_only_returns_matching_type():
    kb = KnowledgeBase(DeterministicFakeEmbedder(), knowledge_dir=KNOWLEDGE_DIR).build()
    query = build_rag_query("OFF_BY_ONE")

    results = kb.retrieve_for_error_type(query, "OFF_BY_ONE", top_k=5)

    assert len(results) > 0
    assert all(c.error_type == "OFF_BY_ONE" for c in results), (
        "retrieve_for_error_type không được để lọt chunk khác error_type vào kết quả"
    )


def test_retrieve_for_error_type_uncovered_type_returns_empty():
    kb = KnowledgeBase(DeterministicFakeEmbedder(), knowledge_dir=KNOWLEDGE_DIR).build()
    query = build_rag_query("EDGE_CASE")

    results = kb.retrieve_for_error_type(query, "EDGE_CASE", top_k=5)

    assert results == []


# ---------------------------------------------------------------------------
# classify_error_type: LLM là chính, fallback rõ ràng khi lỗi
# ---------------------------------------------------------------------------

class _FakeLLMAlwaysFails(LLMProvider):
    def __init__(self):
        self.model = "fake"
        self.available = True
        self.client = None

    def chat_json(self, *a, **kw):
        raise LLMAPIError("simulated API failure")


class _FakeLLMReturnsValid(LLMProvider):
    def __init__(self, error_type="OFF_BY_ONE", confidence=0.9):
        self.model = "fake"
        self.available = True
        self.client = None
        self._error_type = error_type
        self._confidence = confidence

    def chat_json(self, *a, **kw):
        return {"error_type": self._error_type, "confidence": self._confidence}


def test_classify_error_type_uses_llm_when_available():
    kb = KnowledgeBase(DeterministicFakeEmbedder(), knowledge_dir=KNOWLEDGE_DIR).build()
    llm = _FakeLLMReturnsValid(error_type="LOOP_CONDITION", confidence=0.77)

    result = classify_error_type(kb, llm, problem={}, code="int main(){}")

    assert result.error_type == "LOOP_CONDITION"
    assert result.confidence == pytest.approx(0.77)
    assert result.source == "llm"


def test_classify_error_type_falls_back_to_rag_when_llm_fails():
    kb = KnowledgeBase(DeterministicFakeEmbedder(), knowledge_dir=KNOWLEDGE_DIR).build()
    llm = _FakeLLMAlwaysFails()

    result = classify_error_type(kb, llm, problem={}, code="int main(){ for(int i=0;i<=n;i++){} }")

    assert result.source.startswith("rag_aggregation_fallback_llm_error"), (
        "classification_source phải ghi rõ đây là fallback do LLM lỗi, không được giả vờ là LLM"
    )


# ---------------------------------------------------------------------------
# classifier_benchmark.py: phân biệt status, macro-F1 không tính API_ERROR là WRONG
# ---------------------------------------------------------------------------

def test_macro_f1_perfect_predictions():
    labels = ["OFF_BY_ONE", "LOOP_CONDITION", "OFF_BY_ONE"]
    preds = ["OFF_BY_ONE", "LOOP_CONDITION", "OFF_BY_ONE"]
    f1 = classifier_benchmark._macro_f1(labels, preds, classes=["OFF_BY_ONE", "LOOP_CONDITION"])
    assert f1 == pytest.approx(1.0)


def test_macro_f1_all_wrong_is_zero():
    labels = ["OFF_BY_ONE", "LOOP_CONDITION"]
    preds = ["LOOP_CONDITION", "OFF_BY_ONE"]
    f1 = classifier_benchmark._macro_f1(labels, preds, classes=["OFF_BY_ONE", "LOOP_CONDITION"])
    assert f1 == pytest.approx(0.0)


def test_classify_for_benchmark_maps_api_error_status():
    llm = _FakeLLMAlwaysFails()
    raw = llm_classifier.classify_for_benchmark(llm, problem={}, code="int main(){}")
    assert raw["status"] == "API_ERROR"
    assert raw["predicted_error_type"] is None


class _FakeLLMTruncated(LLMProvider):
    def __init__(self):
        self.model = "fake"
        self.available = True
        self.client = None

    def chat_json_with_meta(self, *a, **kw):
        raise LLMTruncatedError("simulated truncation")


def test_classify_for_benchmark_maps_truncated_status():
    llm = _FakeLLMTruncated()
    raw = llm_classifier.classify_for_benchmark(llm, problem={}, code="int main(){}")
    assert raw["status"] == "TRUNCATED"


class _FakeLLMInvalidType(LLMProvider):
    def __init__(self):
        self.model = "fake"
        self.available = True
        self.client = None

    def chat_json_with_meta(self, *a, **kw):
        return {"error_type": "NOT_A_REAL_TYPE", "confidence": 0.5}, {"latency_ms": 12.0, "finish_reason": "stop"}


def test_classify_for_benchmark_rejects_out_of_taxonomy_type():
    llm = _FakeLLMInvalidType()
    raw = llm_classifier.classify_for_benchmark(llm, problem={}, code="int main(){}")
    assert raw["status"] == "INVALID_RESPONSE"


# ---------------------------------------------------------------------------
# rag_evaluation.py
# ---------------------------------------------------------------------------

def test_rag_evaluation_runs_on_full_query_set(tmp_path):
    kb = KnowledgeBase(DeterministicFakeEmbedder(), knowledge_dir=KNOWLEDGE_DIR).build()
    queries_file = os.path.join(PROJECT_ROOT, "data", "rag_eval", "queries.json")

    output = rag_evaluation.evaluate_retrieval(kb, queries_file, top_k=3)

    assert output["summary"]["n_queries"] == 30
    assert 0.0 <= output["summary"]["hit_at_1"] <= 1.0
    assert 0.0 <= output["summary"]["mrr"] <= 1.0
    # Với embedder giả (không có ngữ nghĩa thật), không assert số cụ thể -
    # chỉ assert cấu trúc/logic hoạt động không lỗi, số thật phải chạy bằng
    # BGE-M3 thật mới có ý nghĩa.
