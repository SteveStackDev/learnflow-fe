"""
Entry point CLI cho pipeline FySet - theo dung ARCHITECTURAL CONTRACT.

    python main.py demo --code path/to/file.cpp        # demo 1 submission, in tung stage
    python main.py benchmark [--fake-embedder]          # benchmark FULL pipeline (end-to-end)
    python main.py classifier-benchmark                 # benchmark LLM Classifier RIENG (muc 7)
    python main.py rag-eval [--fake-embedder]            # danh gia retrieval RIENG (muc 8)
    python main.py feedback --error-type ... --resource-id ... --reason ... --follow-up ...
"""
import argparse
import dataclasses
import json
import sys

from providers.llm_provider import LLMProvider
from services import classifier_benchmark, rag_evaluation
from services.pipeline import build_knowledge_base, diagnose_verbose, run_pipeline_benchmark

PROBLEM_FILE = "data/problems/de_bai1.json"
SAMPLES_DIR = "data/sample_bai1"
GROUND_TRUTH_FILE = "data/sample_bai1/ground_truth.json"
PIPELINE_RESULT_FILE = "data/sample_bai1/results/pipeline_result.json"
CLASSIFIER_RESULT_FILE = "data/sample_bai1/results/classifier_benchmark_result.json"
RAG_EVAL_QUERIES_FILE = "data/rag_eval/queries.json"
RAG_EVAL_RESULT_FILE = "data/rag_eval/rag_eval_result.json"


def _dc(obj):
    return dataclasses.asdict(obj) if dataclasses.is_dataclass(obj) else obj


def cmd_demo(args):
    with open(PROBLEM_FILE, "r", encoding="utf-8") as f:
        problem = json.load(f)
    with open(args.code, "r", encoding="utf-8") as f:
        code = f.read()

    kb = build_knowledge_base(use_fake_embedder=args.fake_embedder)
    llm = LLMProvider()

    result = diagnose_verbose(kb, llm, problem, code)
    classification = result["classification"]
    evidence = result["evidence"]
    resource = result["resource"]
    diagnosis = result["diagnosis"]

    print("=" * 70)
    print("[1] LLM CLASSIFIER")
    print("=" * 70)
    print(f"error_type: {classification.error_type}")
    print(f"confidence: {classification.confidence:.3f}")
    print(f"source:     {classification.source}")

    print()
    print("=" * 70)
    print("[2] RAG")
    print("=" * 70)
    print(f"query: {result['rag_query']}")
    if not evidence:
        print("(khong co chunk nao - error_type nay chua co knowledge coverage)")
    for i, c in enumerate(evidence, 1):
        print(f"#{i} {c.error_type} | {c.section} | score={c.score:.4f}")

    print()
    print("=" * 70)
    print("[3] RECOMMENDATION")
    print("=" * 70)
    if resource:
        print(f"resource:   {resource.title}")
        print(f"type:       {resource.resource_type}")
        print(f"difficulty: {resource.difficulty}")
    else:
        print("(chua co resource nao cho error_type nay)")

    print()
    print("=" * 70)
    print("[4] LLM EXPLAINER")
    print("=" * 70)
    print(f"suspected_location: {diagnosis.suspected_location}")
    print(f"explanation:        {diagnosis.explanation}")
    print(f"related_topic:      {diagnosis.related_topic}")

    print()
    print("=" * 70)
    print("[5] FINAL DIAGNOSIS")
    print("=" * 70)
    print(json.dumps(_dc(diagnosis), ensure_ascii=False, indent=2))


def cmd_benchmark(args):
    print("=" * 70)
    print("FySet - FULL PIPELINE Benchmark (Classifier -> RAG -> Recommendation -> Explainer)")
    print("=" * 70)

    kb = build_knowledge_base(use_fake_embedder=args.fake_embedder)
    print(f"[OK] Knowledge base: {len(kb.documents)} chunks, "
          f"error types covered: {sorted(kb.known_error_types())}")

    llm = LLMProvider()
    if llm.available:
        print(f"[OK] LLM available (model={llm.model})")
    else:
        print("[WARNING] Khong co OPENROUTER_API_KEY -> classifier se fallback "
              "sang RAG aggregation, va explainer se fallback sang ghep truc tiep tu tai lieu.")

    output = run_pipeline_benchmark(
        kb=kb, llm=llm,
        problem_file=PROBLEM_FILE, samples_dir=SAMPLES_DIR,
        ground_truth_file=GROUND_TRUTH_FILE, result_file=PIPELINE_RESULT_FILE,
    )

    print("-" * 70)
    for r in output["results"]:
        flag = "OK   " if r["correct"] else "WRONG"
        print(f"[{flag}] {r['id']:14s} gt={r['ground_truth']:20s} "
              f"pred={r['predicted_error_type']:20s} conf={r['confidence']:.3f} "
              f"source={r['classification_source']}")
    print("-" * 70)
    print(f"Accuracy (full pipeline, = classifier accuracy vi classifier quyet dinh error_type): "
          f"{output['correct']}/{output['total_samples']} = {output['accuracy']*100:.1f}%")
    print(f"[OK] Ket qua day du da luu: {PIPELINE_RESULT_FILE}")


def cmd_classifier_benchmark(args):
    print("=" * 70)
    print("FySet - LLM CLASSIFIER Benchmark (doc lap, khong phu thuoc RAG coverage)")
    print("=" * 70)

    llm = LLMProvider()
    if not llm.available:
        print("[WARNING] Khong co OPENROUTER_API_KEY -> toan bo case se la API_ERROR.")

    output = classifier_benchmark.run_classifier_benchmark(
        llm=llm, problem_file=PROBLEM_FILE, samples_dir=SAMPLES_DIR,
        ground_truth_file=GROUND_TRUTH_FILE, result_file=CLASSIFIER_RESULT_FILE,
    )

    print("-" * 70)
    for r in output["per_case"]:
        lat = f"{r['latency_ms']:.0f}ms" if r["latency_ms"] else "-"
        print(f"[{r['status']:17s}] {r['id']:14s} gt={r['ground_truth']:20s} "
              f"pred={str(r['predicted_error_type']):20s} latency={lat}")
    print("-" * 70)
    s = output["summary"]
    print(f"Status counts:       {s['status_counts']}")
    print(f"Accuracy (valid only): {s['accuracy']}")
    print(f"Macro-F1:            {s['macro_f1']:.3f}")
    print(f"Valid response rate: {s['valid_response_rate']*100:.1f}%")
    print(f"Truncated rate:      {s['truncated_rate']*100:.1f}%")
    print(f"Invalid resp. rate:  {s['invalid_response_rate']*100:.1f}%")
    print(f"API error rate:      {s['api_error_rate']*100:.1f}%")
    print(f"Avg latency:         {s['avg_latency_ms']}")
    print(f"[OK] Ket qua day du da luu: {CLASSIFIER_RESULT_FILE}")


def cmd_rag_eval(args):
    print("=" * 70)
    print("FySet - RAG RETRIEVAL Evaluation (doc lap, khong dung classifier)")
    print("=" * 70)

    kb = build_knowledge_base(use_fake_embedder=args.fake_embedder)
    output = rag_evaluation.evaluate_retrieval(
        kb, RAG_EVAL_QUERIES_FILE, top_k=args.top_k, result_file=RAG_EVAL_RESULT_FILE
    )

    s = output["summary"]
    print(f"n_queries: {s['n_queries']}  top_k: {s['top_k']}")
    print(f"Hit@1:               {s['hit_at_1']*100:.1f}%")
    print(f"Hit@{args.top_k}:               {s[f'hit_at_{args.top_k}']*100:.1f}%")
    print(f"Recall@{args.top_k}:            {s[f'recall_at_{args.top_k}']*100:.1f}%")
    print(f"MRR:                 {s['mrr']:.3f}")
    print(f"[OK] Ket qua day du da luu: {RAG_EVAL_RESULT_FILE}")


def cmd_feedback(args):
    from services import recommendation

    if not args.relevant:
        result = recommendation.handle_negative_feedback(
            user_id=args.user_id, error_type=args.error_type,
            rejected_resource_id=args.resource_id, reason=args.reason,
            follow_up_choice=args.follow_up,
        )
        printable = {k: (_dc(v) if k == "resource" else v) for k, v in result.items()}
        print(json.dumps(printable, ensure_ascii=False, indent=2))
    else:
        entry = recommendation.log_positive_feedback(
            user_id=args.user_id, error_type=args.error_type, resource_id=args.resource_id
        )
        print(json.dumps(entry, ensure_ascii=False, indent=2))


def main():
    parser = argparse.ArgumentParser(description="FySet AI Diagnosis pipeline")
    sub = parser.add_subparsers(dest="command", required=True)

    p_demo = sub.add_parser("demo", help="Chan doan 1 submission, in tung stage [1]-[5]")
    p_demo.add_argument("--code", required=True)
    p_demo.add_argument("--fake-embedder", action="store_true")
    p_demo.set_defaults(func=cmd_demo)

    p_bench = sub.add_parser("benchmark", help="Benchmark FULL pipeline end-to-end")
    p_bench.add_argument("--fake-embedder", action="store_true")
    p_bench.set_defaults(func=cmd_benchmark)

    p_cbench = sub.add_parser("classifier-benchmark", help="Benchmark LLM Classifier doc lap (muc 7)")
    p_cbench.set_defaults(func=cmd_classifier_benchmark)

    p_rageval = sub.add_parser("rag-eval", help="Danh gia retrieval doc lap (muc 8)")
    p_rageval.add_argument("--fake-embedder", action="store_true")
    p_rageval.add_argument("--top-k", type=int, default=3)
    p_rageval.set_defaults(func=cmd_rag_eval)

    p_fb = sub.add_parser("feedback", help="Mo phong gui feedback cho 1 resource")
    p_fb.add_argument("--user-id", default="demo_user")
    p_fb.add_argument("--error-type", required=True)
    p_fb.add_argument("--resource-id", required=True)
    p_fb.add_argument("--relevant", action="store_true")
    p_fb.add_argument("--reason", default="", choices=[
        "", "TOO_BASIC", "TOO_ADVANCED", "WRONG_ERROR", "EXAMPLE_NOT_SIMILAR", "STILL_CONFUSED", "OTHER",
    ])
    p_fb.add_argument("--follow-up", default="FIND_ANOTHER", choices=["FIND_ANOTHER", "EXPLAIN_DIRECTLY"])
    p_fb.set_defaults(func=cmd_feedback)

    args = parser.parse_args()
    args.func(args)


if __name__ == "__main__":
    sys.exit(main())
