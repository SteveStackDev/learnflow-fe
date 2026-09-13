"""
Benchmark LLM Classifier ĐỘC LẬP — đúng mục 7 ARCHITECTURAL CONTRACT.

Khác với run_pipeline_benchmark() trong pipeline.py (chạy cả pipeline, bao
gồm cả RAG + Explainer): file này CHỈ gọi LLM Classifier, chạy trên ĐỦ 10
case ground_truth (không bị giới hạn bởi 6/11 error_type có knowledge —
classifier không phụ thuộc knowledge base), và phân biệt rõ 5 trạng thái:

    CORRECT / WRONG / INVALID_RESPONSE / TRUNCATED / API_ERROR

API_ERROR / TRUNCATED / INVALID_RESPONSE KHÔNG được tính là WRONG.
"""
import json
import os
import time

from providers.llm_provider import LLMProvider
from services import llm_classifier


def _macro_f1(labels, predictions, classes):
    """Macro-F1 thủ công (không phụ thuộc sklearn), chỉ tính trên các class
    thực sự xuất hiện trong `labels` (ground truth) của lần chạy này."""
    f1s = []
    for c in classes:
        tp = sum(1 for l, p in zip(labels, predictions) if l == c and p == c)
        fp = sum(1 for l, p in zip(labels, predictions) if l != c and p == c)
        fn = sum(1 for l, p in zip(labels, predictions) if l == c and p != c)
        if tp + fp == 0 and tp + fn == 0:
            continue
        precision = tp / (tp + fp) if (tp + fp) > 0 else 0.0
        recall = tp / (tp + fn) if (tp + fn) > 0 else 0.0
        f1 = 2 * precision * recall / (precision + recall) if (precision + recall) > 0 else 0.0
        f1s.append(f1)
    return sum(f1s) / len(f1s) if f1s else 0.0


def run_classifier_benchmark(
    llm: LLMProvider,
    problem_file: str,
    samples_dir: str,
    ground_truth_file: str,
    result_file: str,
) -> dict:
    with open(problem_file, "r", encoding="utf-8") as f:
        problem = json.load(f)
    with open(ground_truth_file, "r", encoding="utf-8") as f:
        ground_truth = json.load(f)

    cpp_files = sorted(fn for fn in os.listdir(samples_dir) if fn.endswith(".cpp"))

    per_case = []
    status_counts = {"CORRECT": 0, "WRONG": 0, "INVALID_RESPONSE": 0, "TRUNCATED": 0, "API_ERROR": 0}
    latencies = []
    labels_for_f1 = []
    predictions_for_f1 = []

    for filename in cpp_files:
        if filename not in ground_truth:
            continue
        filepath = os.path.join(samples_dir, filename)
        with open(filepath, "r", encoding="utf-8") as f:
            code = f.read()

        expected = ground_truth[filename]
        raw = llm_classifier.classify_for_benchmark(llm, problem, code)

        if raw["latency_ms"] is not None:
            latencies.append(raw["latency_ms"])

        if raw["status"] == "OK":
            is_correct = raw["predicted_error_type"] == expected
            status = "CORRECT" if is_correct else "WRONG"
            labels_for_f1.append(expected)
            predictions_for_f1.append(raw["predicted_error_type"])
        else:
            status = raw["status"]

        status_counts[status] += 1
        per_case.append({
            "id": filename,
            "ground_truth": expected,
            "predicted_error_type": raw["predicted_error_type"],
            "confidence": raw["confidence"],
            "status": status,
            "latency_ms": raw["latency_ms"],
            "error": raw["error"],
        })

    total = len(per_case)
    valid = status_counts["CORRECT"] + status_counts["WRONG"]

    classes = sorted(set(labels_for_f1))
    macro_f1 = _macro_f1(labels_for_f1, predictions_for_f1, classes)

    summary = {
        "total_samples": total,
        "status_counts": status_counts,
        "accuracy": status_counts["CORRECT"] / valid if valid > 0 else None,
        "macro_f1": macro_f1,
        "valid_response_rate": valid / total if total > 0 else 0.0,
        "truncated_rate": status_counts["TRUNCATED"] / total if total > 0 else 0.0,
        "invalid_response_rate": status_counts["INVALID_RESPONSE"] / total if total > 0 else 0.0,
        "api_error_rate": status_counts["API_ERROR"] / total if total > 0 else 0.0,
        "avg_latency_ms": sum(latencies) / len(latencies) if latencies else None,
        "note": (
            "accuracy va macro_f1 chi tinh tren cac case status=OK (CORRECT+WRONG). "
            "API_ERROR/TRUNCATED/INVALID_RESPONSE KHONG duoc tinh la WRONG, "
            "chi phan anh qua *_rate tuong ung."
        ),
    }

    output = {"summary": summary, "per_case": per_case}

    os.makedirs(os.path.dirname(result_file), exist_ok=True)
    with open(result_file, "w", encoding="utf-8") as f:
        json.dump(output, f, ensure_ascii=False, indent=2)

    return output


if __name__ == "__main__":
    from providers.llm_provider import LLMProvider

    PROBLEM_FILE = "data/problems/de_bai1.json"
    SAMPLES_DIR = "data/sample_bai1"
    GROUND_TRUTH_FILE = "data/sample_bai1/ground_truth.json"
    RESULT_FILE = "data/sample_bai1/results/classifier_benchmark_result.json"

    print("=" * 70)
    print("FySet - LLM CLASSIFIER Benchmark (doc lap, khong phu thuoc RAG coverage)")
    print("=" * 70)

    llm = LLMProvider()
    if not llm.available:
        print("[WARNING] Khong co OPENROUTER_API_KEY -> toan bo case se la API_ERROR.")
    else:
        print(f"[OK] LLM available (model={llm.model})")

    output = run_classifier_benchmark(
        llm=llm,
        problem_file=PROBLEM_FILE,
        samples_dir=SAMPLES_DIR,
        ground_truth_file=GROUND_TRUTH_FILE,
        result_file=RESULT_FILE,
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
    print(f"[OK] Ket qua day du da luu: {RESULT_FILE}")
