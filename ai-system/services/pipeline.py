"""
Orchestrator chinh cua pipeline FySet - dung theo ARCHITECTURAL CONTRACT:

    C++ WA Submission
        -> LLM Error Classifier          [services/llm_classifier.py]
        -> error_type
        -> RAG (BGE-M3 + FAISS)          [retrieve_for_error_type: query
                                           theo template co dinh + filter
                                           dung error_type]
        -> Relevant Knowledge
        -> Recommendation                [services/recommendation.py]
        -> Video/Article/Exercise
        -> LLM Explainer                 [services/explainer.py]
        -> Final Diagnosis

Fallback: NEU va CHI NEU LLM Classifier that bai (LLMUnavailableError va
cac subclass), pipeline moi duoc fallback sang RAG aggregation (dung code
lam query, khong dung template vi luc nay chua biet error_type) - va PHAI
ghi ro classification_source la fallback, khong duoc gia vo day la ket qua
LLM.
"""
import dataclasses
import json
import os

from providers.embedder import BgeM3Embedder, DeterministicFakeEmbedder
from providers.llm_provider import LLMProvider, LLMUnavailableError
from schemas.models import ClassificationResult, Diagnosis
from services import llm_classifier, recommendation
from services.explainer import explain
from services.knowledge_base import KnowledgeBase
from services.query_templates import build_rag_query

TOP_K = 5


def build_knowledge_base(knowledge_dir: str = "knowledge", use_fake_embedder: bool = False) -> KnowledgeBase:
    embedder = DeterministicFakeEmbedder() if use_fake_embedder else BgeM3Embedder()
    return KnowledgeBase(embedder, knowledge_dir=knowledge_dir).build()


def classify_error_type(kb: KnowledgeBase, llm: LLMProvider, problem: dict, code: str) -> ClassificationResult:
    """STAGE 1: LLM Classifier la nguon chinh. Chi fallback sang RAG
    aggregation khi LLM that bai, va ghi ro classification_source."""
    try:
        return llm_classifier.classify_with_llm(llm, problem, code)
    except LLMUnavailableError as e:
        # Fallback ro rang - dung code lam query vi chua co error_type de
        # build template. Day la co che du phong, KHONG phai luong chinh.
        chunks = kb.retrieve(query=code, top_k=TOP_K)
        error_type, confidence = KnowledgeBase.aggregate_error_type(chunks)
        return ClassificationResult(
            error_type=error_type,
            confidence=confidence,
            source=f"rag_aggregation_fallback_llm_error:{e}",
            evidence=chunks,
        )


def diagnose(kb: KnowledgeBase, llm: LLMProvider, problem: dict, code: str) -> Diagnosis:
    """Chan doan 1 submission Wrong Answer, tra ve Diagnosis day du."""
    # STAGE 1: LLM Classifier
    classification = classify_error_type(kb, llm, problem, code)

    # STAGE 2: RAG - query theo template co dinh (KHONG dung code lam query
    # o day nua), filter theo error_type da biet
    if classification.source == "llm":
        query = build_rag_query(classification.error_type)
        evidence = kb.retrieve_for_error_type(query, classification.error_type, top_k=TOP_K)
    else:
        # Fallback path da co san evidence tu buoc aggregate ben tren
        evidence = classification.evidence

    # STAGE 3: Recommendation
    resource = recommendation.recommend_resource(classification.error_type, retrieved_knowledge=evidence)
    resource_dict = dataclasses.asdict(resource) if resource else None

    # STAGE 4: LLM Explainer (khong tu quyet lai error_type)
    diagnosis = explain(
        llm=llm,
        problem=problem,
        code=code,
        error_type=classification.error_type,
        confidence=classification.confidence,
        evidence=evidence,
    )
    diagnosis.recommended_resource = resource_dict
    diagnosis.classification_source = classification.source
    return diagnosis


def diagnose_verbose(kb: KnowledgeBase, llm: LLMProvider, problem: dict, code: str) -> dict:
    """Ban day du hon cua diagnose(), tra ve TUNG STAGE rieng - dung cho CLI
    demo (main.py) de in ro [1] CLASSIFIER [2] RAG [3] RECOMMENDATION
    [4] EXPLAINER [5] FINAL DIAGNOSIS theo dung yeu cau contract muc 11."""
    classification = classify_error_type(kb, llm, problem, code)

    if classification.source == "llm":
        query = build_rag_query(classification.error_type)
        evidence = kb.retrieve_for_error_type(query, classification.error_type, top_k=TOP_K)
    else:
        query = "(fallback - dung code lam query, xem aggregate_error_type)"
        evidence = classification.evidence

    resource = recommendation.recommend_resource(classification.error_type, retrieved_knowledge=evidence)
    resource_dict = dataclasses.asdict(resource) if resource else None

    diagnosis = explain(
        llm=llm,
        problem=problem,
        code=code,
        error_type=classification.error_type,
        confidence=classification.confidence,
        evidence=evidence,
    )
    diagnosis.recommended_resource = resource_dict
    diagnosis.classification_source = classification.source

    return {
        "classification": classification,
        "rag_query": query,
        "evidence": evidence,
        "resource": resource,
        "diagnosis": diagnosis,
    }


def run_pipeline_benchmark(
    kb: KnowledgeBase,
    llm: LLMProvider,
    problem_file: str,
    samples_dir: str,
    ground_truth_file: str,
    result_file: str,
) -> dict:
    """Benchmark END-TO-END pipeline (khong phai classifier rieng - xem
    services/classifier_benchmark.py cho benchmark classifier doc lap dung
    contract muc 7). Vi kien truc moi dung LLM Classifier de quyet dinh
    error_type, accuracy o day VE MAT KY THUAT trung voi classifier accuracy
    khi chay full pipeline - nhung van tach rieng file/ham vi muc dich khac
    nhau (day la de demo/luu ket qua diagnosis day du, khong phai de bao
    cao so lieu classifier)."""
    with open(problem_file, "r", encoding="utf-8") as f:
        problem = json.load(f)
    with open(ground_truth_file, "r", encoding="utf-8") as f:
        ground_truth = json.load(f)

    cpp_files = sorted(fn for fn in os.listdir(samples_dir) if fn.endswith(".cpp"))
    known_types = kb.known_error_types()

    results = []
    correct = 0
    total = 0

    for filename in cpp_files:
        if filename not in ground_truth:
            continue
        filepath = os.path.join(samples_dir, filename)
        with open(filepath, "r", encoding="utf-8") as f:
            code = f.read()

        expected = ground_truth[filename]
        diagnosis = diagnose(kb, llm, problem, code)
        is_correct = diagnosis.error_type == expected
        total += 1
        correct += int(is_correct)

        results.append({
            "id": filename,
            "ground_truth": expected,
            "ground_truth_has_knowledge": expected in known_types,
            "predicted_error_type": diagnosis.error_type,
            "confidence": diagnosis.confidence,
            "correct": is_correct,
            "classification_source": diagnosis.classification_source,
            "explanation": diagnosis.explanation,
            "recommended_resource": diagnosis.recommended_resource,
        })

    output = {
        "total_samples": total,
        "correct": correct,
        "accuracy": correct / total if total else 0.0,
        "known_error_types_in_kb": sorted(known_types),
        "results": results,
    }

    os.makedirs(os.path.dirname(result_file), exist_ok=True)
    with open(result_file, "w", encoding="utf-8") as f:
        json.dump(output, f, ensure_ascii=False, indent=2)

    return output
