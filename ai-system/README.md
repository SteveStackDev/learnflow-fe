# FySet AI Diagnosis — theo ARCHITECTURAL CONTRACT

Bản này thay thế bản trước (dùng RAG aggregation làm classifier). Kiến trúc
hiện tại đúng theo contract đã chốt:

```
C++ WA Submission
    -> LLM Error Classifier      (services/llm_classifier.py)
    -> error_type
    -> RAG (BGE-M3 + FAISS)      (query theo template cố định + filter theo error_type)
    -> Relevant Knowledge
    -> Recommendation            (ranking theo feedback thật)
    -> Video / Article / Exercise
    -> LLM Explainer
    -> Final Diagnosis
```

## Chạy thật (cần API key + tải BGE-M3)

```bash
pip install sentence-transformers faiss-cpu openai
export OPENROUTER_API_KEY="sk-or-v1-..."     # PowerShell: $env:OPENROUTER_API_KEY="..."
export FYSET_LLM_MODEL="openai/gpt-4o-mini"  # đổi theo model đang test

# Demo 1 submission, in đủ 5 stage [1]-[5]
python main.py demo --code data/sample_bai1/case04.cpp

# Benchmark LLM Classifier ĐỘC LẬP (mục 7 contract) — full 10 case, không phụ thuộc RAG coverage
python main.py classifier-benchmark

# Đánh giá retrieval ĐỘC LẬP (mục 8 contract) — 30 query, Hit@1/Hit@3/Recall@3/MRR
python main.py rag-eval

# Benchmark FULL pipeline end-to-end (để demo, không phải số liệu chính cho mục 7)
python main.py benchmark
```

Thêm `--fake-embedder` vào `demo`/`benchmark`/`rag-eval` để chạy offline
(không cần tải BGE-M3, dùng embedder giả) — CHỈ để kiểm tra pipeline không
crash, không dùng số liệu này cho báo cáo.

## Vì sao có 3 lệnh benchmark khác nhau

| Lệnh | Đo gì | Có phụ thuộc RAG coverage không |
|---|---|---|
| `classifier-benchmark` | Chỉ LLM Classifier, so ground truth | Không — chạy đủ 10/10 case |
| `rag-eval` | Chỉ chất lượng retrieval (Hit@K/MRR) | Có — chỉ chạy trên 6 loại có knowledge |
| `benchmark` | Toàn bộ pipeline (để demo/xem diagnosis cuối) | Gián tiếp có, vì RAG là 1 bước trong pipeline |

Không được lấy accuracy của `benchmark` (full pipeline) rồi gọi đó là
"classifier accuracy" hay "RAG accuracy" — dùng đúng lệnh tương ứng.

## classification_source — luôn đọc field này

- `"llm"` — LLM Classifier chạy thành công, đây là đường chính.
- `"rag_aggregation_fallback_llm_error:<lý do>"` — LLM lỗi, pipeline fallback
  sang RAG aggregation (dùng code làm query, KHÔNG dùng template vì lúc này
  chưa biết error_type). Nếu thấy source này trong kết quả benchmark, đừng
  báo cáo đó là "LLM classifier accuracy" — đó là accuracy của fallback.

## Knowledge coverage — vẫn còn giới hạn, chưa che giấu

Chỉ 6/11 error_type có `.md`: `BOUNDARY_ERROR, GREEDY_LOGIC_ERROR,
INTEGER_OVERFLOW, LOOP_CONDITION, OFF_BY_ONE, WRONG_SORT_ORDER`. RAG cho 5
loại còn lại (`MISSING_UPDATE, WRONG_INITIALIZATION, EDGE_CASE,
WRONG_FORMULA, OTHER`) sẽ trả evidence rỗng — không tự bịa hay fallback
ngầm sang loại khác. LLM Classifier KHÔNG bị giới hạn này (không phụ thuộc
knowledge base), nên `classifier-benchmark` vẫn chấm được cả 11 loại.

## Demo phần feedback + ranking (không cần LLM/mạng)

```bash
python main.py feedback --error-type OFF_BY_ONE --resource-id off_by_one_01 \
    --reason EXAMPLE_NOT_SIMILAR --follow-up FIND_ANOTHER
# -> trả resource khác (off_by_one_article_01), đã loại resource vừa reject

python main.py feedback --error-type OFF_BY_ONE --resource-id off_by_one_article_01 \
    --reason STILL_CONFUSED --follow-up EXPLAIN_DIRECTLY
# -> {"action": "TRIGGER_EXPLAIN"}
```

Reason codes đúng contract: `TOO_BASIC, TOO_ADVANCED, WRONG_ERROR,
EXAMPLE_NOT_SIMILAR, STILL_CONFUSED, OTHER`.

## Test (offline, không cần mạng/BGE-M3 thật)

```bash
pip install pytest numpy faiss-cpu
python -m pytest tests/ -v   # 26 test
```

## Cấu trúc

```
schemas/models.py             # Dataclass dùng chung
providers/embedder.py         # BgeM3Embedder (thật) + DeterministicFakeEmbedder (test)
providers/llm_provider.py     # LLMAPIError / LLMTruncatedError / LLMInvalidResponseError + latency
services/llm_classifier.py    # LLM Classifier — CHÍNH của pipeline (classify_with_llm, classify_for_benchmark)
services/query_templates.py   # RAG_QUERY_TEMPLATES cố định (viết tay, không dùng LLM sinh query)
services/knowledge_base.py    # Chunking + FAISS + retrieve_for_error_type (RAG chính) + aggregate_error_type (chỉ fallback/tiện ích)
services/resource_catalog.py  # Resource metadata theo error_type
services/recommendation.py    # Ranking theo feedback + luồng "Không liên quan"
services/feedback.py          # Log feedback + usefulness_score (Laplace-smoothed)
services/explainer.py         # LLM Explainer — nhận evidence, KHÔNG tự đổi error_type
services/pipeline.py          # Orchestrator: classify_error_type() + diagnose() + diagnose_verbose() + run_pipeline_benchmark()
services/classifier_benchmark.py  # Benchmark LLM Classifier độc lập (mục 7 contract)
services/rag_evaluation.py    # Đánh giá retrieval độc lập (mục 8 contract)
data/rag_eval/queries.json    # 30 query (6 error_type x 5), viết tay từ nội dung knowledge/*.md
main.py                       # CLI: demo, benchmark, classifier-benchmark, rag-eval, feedback
tests/                        # 26 test, chạy offline bằng DeterministicFakeEmbedder + fake LLMProvider
```

## Việc còn lại (ngoài phạm vi contract hiện tại, KHÔNG tự làm thêm)

- Recommendation nhận `retrieved_knowledge` đúng shape input theo contract,
  nhưng ranking hiện tại chỉ dùng feedback, chưa dùng nội dung chunk để đổi
  logic — để sẵn cho personalization sau, không tự thêm logic ngoài yêu cầu.
- Thí nghiệm so sánh 3 LLM (đổi `FYSET_LLM_MODEL` giữa 3 lần chạy
  `classifier-benchmark`, so `macro_f1`/`accuracy`/`avg_latency_ms`) — chưa
  có script gộp kết quả 3 lần chạy, tự làm nếu cần cho mục 7-9 báo cáo.
- Mini-test (bước cuối roadmap gốc) chưa làm — đúng phạm vi đã thống nhất.
