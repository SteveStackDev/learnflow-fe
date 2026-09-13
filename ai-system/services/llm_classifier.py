"""
LLM Classifier - day la classifier CHINH cua pipeline theo ARCHITECTURAL CONTRACT.

Nhan problem + code C++, tra ve error_type + confidence bang cach hoi thang LLM
(zero-shot, khong retrieval).
"""

import json as _json

from providers.llm_provider import (
    LLMAPIError,
    LLMInvalidResponseError,
    LLMProvider,
    LLMTruncatedError,
    LLMUnavailableError,
)

from schemas.models import ClassificationResult


ERROR_TYPES = [
    "MISSING_UPDATE",
    "LOOP_CONDITION",
    "OFF_BY_ONE",
    "BOUNDARY_ERROR",
    "WRONG_INITIALIZATION",
    "INTEGER_OVERFLOW",
    "WRONG_SORT_ORDER",
    "EDGE_CASE",
    "WRONG_FORMULA",
    "GREEDY_LOGIC_ERROR",
    "OTHER",
]


_SYSTEM = """
You are a C++ Online Judge bug classifier.

Follow the taxonomy and classification rules provided in the user prompt.

Classify the submission into exactly ONE allowed error type.

Return ONLY valid JSON.
Do not use Markdown.
Do not add extra fields.
"""


def _build_prompt(problem: dict, code: str) -> str:
    problem_text = _json.dumps(
        problem,
        ensure_ascii=False,
        indent=2,
    )

    taxonomy = """
MISSING_UPDATE:
- Biến điều khiển hoặc biến trạng thái cần được cập nhật trong vòng lặp nhưng
  bị quên cập nhật, cập nhật sai biến, hoặc cập nhật sai giá trị.
- Ví dụ: quên i++, dùng j++ thay vì i++, hoặc không cập nhật cur sau mỗi bước.

LOOP_CONDITION:
- Biểu thức điều kiện của vòng lặp là nguyên nhân trực tiếp làm thuật toán
  chạy sai số lần hoặc dừng/tiếp tục sai.
- Chọn loại này khi biến vẫn được cập nhật đúng nhưng điều kiện loop sai.
- Ví dụ: dùng while (i < n - 1) khi cần i < n, hoặc điều kiện while có logic sai.
- Nếu lỗi đồng thời gây truy cập ngoài miền chỉ số, ưu tiên BOUNDARY_ERROR.

OFF_BY_ONE:
- Số lần lặp, chỉ số, vị trí hoặc kết quả bị lệch đúng một đơn vị.
- Lỗi có thể làm duyệt thiếu/thừa đúng một phần tử hoặc kết quả bị +1/-1.
- Ví dụ: ans - 1, bắt đầu từ i = 1 thay vì i = 0, duyệt đến n-1 thay vì n.
- Chỉ chọn OFF_BY_ONE khi bản chất chính là lệch đúng một đơn vị.
- Nếu lỗi gây truy cập ngoài miền hợp lệ, ưu tiên BOUNDARY_ERROR.

BOUNDARY_ERROR:
- Code truy cập hoặc có thể truy cập dữ liệu ngoài miền hợp lệ,
  hoặc vi phạm giới hạn kích thước/range được cho bởi đề bài.
- Ví dụ: a[n], a[-1], vector có n phần tử nhưng truy cập index n,
  int a[100005] trong khi N có thể lên tới 10^6.
- Khi có out-of-bounds thực sự hoặc có khả năng xảy ra,
  BOUNDARY_ERROR có ưu tiên cao hơn OFF_BY_ONE và LOOP_CONDITION.

WRONG_INITIALIZATION:
- Biến, accumulator, pointer, cấu trúc dữ liệu hoặc trạng thái ban đầu
  được khởi tạo bằng giá trị sai.
- Lỗi tồn tại ngay trước khi thuật toán bắt đầu xử lý dữ liệu.

INTEGER_OVERFLOW:
- Kiểu dữ liệu không đủ lớn khiến giá trị trung gian hoặc kết quả bị overflow.
- Ví dụ: dùng int cho tổng có thể lên tới 10^12 hoặc nhân hai số khoảng 10^9.

WRONG_SORT_ORDER:
- Thứ tự sắp xếp được sử dụng thực sự trái với yêu cầu của thuật toán.
- Ví dụ: cần ascending nhưng dùng descending.
- Chỉ chọn loại này khi chính thứ tự sort là nguyên nhân gây WA.

EDGE_CASE:
- Thuật toán chính đúng trên các trường hợp thông thường nhưng xử lý sai
  một trường hợp đặc biệt hoặc giá trị biên cụ thể.
- Ví dụ: n = 1, tất cả phần tử âm, dữ liệu rỗng nếu đề cho phép,
  hoặc một giá trị biên đặc biệt.
- Không dùng EDGE_CASE nếu lỗi đã được giải thích trực tiếp bởi một loại
  cụ thể hơn như BOUNDARY_ERROR, OFF_BY_ONE hoặc LOOP_CONDITION.

WRONG_FORMULA:
- Công thức, phép tính, hoặc phép biến đổi toán học chính của thuật toán sai.
- Ví dụ: dùng a[i] * i thay vì a[i] * (i + 1), hoặc tính kết quả bằng công thức sai.

GREEDY_LOGIC_ERROR:
- Chiến lược greedy hoặc tiêu chí lựa chọn cục bộ là sai,
  dù các thao tác phụ như sorting có thể hoàn toàn đúng.
- Ví dụ: chọn phần tử lớn nhất trước trong khi greedy đúng cần chọn nhỏ nhất.
- Nếu nguyên nhân trực tiếp là thứ tự sort sai, chọn WRONG_SORT_ORDER.
- Nếu sort đúng nhưng quyết định chọn phần tử sai, chọn GREEDY_LOGIC_ERROR.

OTHER:
- Lỗi chính không thuộc bất kỳ loại nào ở trên.
- Chỉ sử dụng khi không thể xác định lỗi thuộc một category cụ thể.
"""

    rules = """
QUY TẮC PHÂN BIỆT LỖI:

1. BOUNDARY_ERROR vs OFF_BY_ONE vs LOOP_CONDITION

Đây là nhóm dễ nhầm nhất.

BOUNDARY_ERROR:
- Nếu code thực sự truy cập hoặc có khả năng truy cập index ngoài miền hợp lệ,
  chọn BOUNDARY_ERROR.
- Ví dụ:
    a[n]
    a[-1]
    vector[n] khi vector có size = n
    int a[100005] khi đề cho N <= 1000000
- Nếu một điều kiện loop sai trực tiếp dẫn đến việc truy cập a[n],
  chọn BOUNDARY_ERROR.

OFF_BY_ONE:
- Nếu không có out-of-bounds nhưng index, số lần lặp hoặc kết quả
  bị lệch đúng một đơn vị, chọn OFF_BY_ONE.
- Ví dụ:
    ans - 1
    duyệt thiếu đúng phần tử cuối
    bắt đầu từ index 1 thay vì index 0
- OFF_BY_ONE mô tả bản chất "lệch một đơn vị", không phải mọi trường hợp
  có dấu hiệu < / <=.

LOOP_CONDITION:
- Nếu biến điều khiển được cập nhật đúng nhưng chính biểu thức điều kiện
  của loop có logic sai, chọn LOOP_CONDITION.
- Ví dụ:
    while (x > 0) thay vì while (x >= 0)
    for (...; i < n - 1; ...)
    dùng điều kiện dừng sai khiến thuật toán không thực hiện đúng logic.

QUY TẮC:
- Có out-of-bounds thực sự hoặc có thể xảy ra
  -> BOUNDARY_ERROR.
- Không out-of-bounds và chỉ lệch đúng một đơn vị
  -> OFF_BY_ONE.
- Điều kiện loop có logic sai và đó là nguyên nhân chính
  -> LOOP_CONDITION.


2. MISSING_UPDATE vs LOOP_CONDITION

MISSING_UPDATE:
- Biến điều khiển/trạng thái cần thay đổi nhưng:
    * quên cập nhật,
    * cập nhật nhầm biến,
    * cập nhật sai giá trị.

LOOP_CONDITION:
- Biến vẫn được cập nhật đúng nhưng điều kiện quyết định
  tiếp tục/dừng loop bị sai.

Ví dụ:
    for (int i = 0; i < n; ) {
        ...
    }
-> MISSING_UPDATE nếu thiếu i++.

Ví dụ:
    for (int i = 0; i < n - 1; ++i)
-> LOOP_CONDITION hoặc OFF_BY_ONE tùy bản chất lỗi.

Không chọn LOOP_CONDITION nếu nguyên nhân thực sự là biến điều khiển
không được cập nhật.


3. WRONG_SORT_ORDER vs GREEDY_LOGIC_ERROR

WRONG_SORT_ORDER:
- Comparator hoặc thứ tự sort thực sự trái với yêu cầu.
- Ví dụ:
    sort(a.begin(), a.end(), greater<int>());

GREEDY_LOGIC_ERROR:
- Sort đúng nhưng quyết định lựa chọn greedy sai.
- Ví dụ:
    sort ascending
    nhưng lại cố tình chọn phần tử lớn nhất trước.

Không chọn WRONG_SORT_ORDER chỉ vì code có sort.


4. WRONG_INITIALIZATION vs WRONG_FORMULA

WRONG_INITIALIZATION:
- Giá trị ban đầu của biến/trạng thái sai trước khi xử lý dữ liệu.

WRONG_FORMULA:
- Công thức hoặc phép tính được áp dụng trong quá trình xử lý sai.

Nếu công thức đúng nhưng biến ban đầu sai
-> WRONG_INITIALIZATION.

Nếu initialization đúng nhưng phép tính chính sai
-> WRONG_FORMULA.


5. INTEGER_OVERFLOW

Chỉ chọn INTEGER_OVERFLOW khi:
- Kiểu dữ liệu không đủ biểu diễn giá trị có thể xuất hiện theo constraints,
  hoặc
- phép tính trung gian có thể overflow.

Không chọn WRONG_FORMULA chỉ vì kết quả bị sai do overflow.


6. EDGE_CASE

EDGE_CASE không phải category chung chung.

Chỉ chọn EDGE_CASE khi:
- logic chính của thuật toán đúng,
- nhưng một input đặc biệt/biên làm code thất bại,
- và lỗi đó không được giải thích tốt hơn bởi category cụ thể khác.

Ví dụ:
- n = 1 không được xử lý đúng,
- một trường hợp đặc biệt của dữ liệu làm logic fail.

Nếu nguyên nhân thực sự là:
- BOUNDARY_ERROR
- OFF_BY_ONE
- LOOP_CONDITION
- INTEGER_OVERFLOW
- WRONG_INITIALIZATION
- WRONG_FORMULA
- ...

thì chọn category cụ thể đó, không chọn EDGE_CASE.


7. ROOT CAUSE

Không phân loại chỉ dựa trên symptom.

Hãy tìm ROOT CAUSE trực tiếp gây ra WA.

Ví dụ:

    for (int i = 0; i <= n; ++i)
        cout << a[i];

Nếu a có index hợp lệ 0..n-1 và code thực sự truy cập a[n]:
-> BOUNDARY_ERROR.

Ví dụ:

    cout << ans - 1;

Nếu ans đúng nhưng kết quả bị giảm đúng 1:
-> OFF_BY_ONE.

Ví dụ:

    for (int i = 0; i < n - 1; ++i)
        ...

Nếu code không truy cập ngoài mảng và lỗi chỉ khiến phần tử cuối
bị bỏ qua:
-> OFF_BY_ONE.

Ví dụ:

    while (sum < target)
        ...

Nếu sum được update đúng nhưng điều kiện phải là sum <= target:
-> LOOP_CONDITION.

Ví dụ:

    for (int i = 0; i < n; )
        ...

Nếu thiếu i++:
-> MISSING_UPDATE.


8. KHÔNG SUY LUẬN CATEGORY CHỈ TỪ MỘT TOKEN

Không được quyết định category chỉ vì nhìn thấy:
- <=
- <
- sort()
- ++
- -- 
- int
- vector
- if

Phải xem Problem + constraints + toàn bộ code để xác định
nguyên nhân gây WA.


9. KHI NHIỀU CATEGORY CÓ VẺ PHÙ HỢP

Ưu tiên category mô tả chính xác ROOT CAUSE nhất.

Đặc biệt:
- Out-of-bounds thật sự/có thể xảy ra
  -> BOUNDARY_ERROR
- Chỉ lệch đúng một đơn vị
  -> OFF_BY_ONE
- Điều kiện loop sai về logic
  -> LOOP_CONDITION
- Biến trạng thái/loop không được update đúng
  -> MISSING_UPDATE
- Thứ tự sort sai
  -> WRONG_SORT_ORDER
- Chiến lược greedy sai dù sort đúng
  -> GREEDY_LOGIC_ERROR

Không chọn một lỗi chỉ vì nó là hậu quả của lỗi khác.


10. OUTPUT

Chỉ được trả về MỘT ERROR TYPE.

Không tạo ERROR TYPE mới.
Không trả về nhiều ERROR TYPE.
Không thêm field ngoài:
- error_type
- confidence
"""


    return f"""
Bạn là AI chuyên phân loại lỗi lập trình C++ trên Online Judge.

Submission dưới đây được xác định là WA.

NHIỆM VỤ:
- Phân tích Problem và Submission.
- Xác định MỘT lỗi chính có khả năng gây ra WA.
- Tìm ROOT CAUSE, không chỉ mô tả symptom.
- Chỉ chọn MỘT ERROR TYPE trong taxonomy.
- Không tự tạo ERROR TYPE mới.

IMPORTANT:
- Không phân loại chỉ dựa trên một dòng code hoặc một token.
- Không phân loại chỉ vì nhìn thấy <, <=, sort(), ++, int, vector, v.v.
- Phải xem cả Problem, constraints và toàn bộ Submission.
- Nếu nhiều category có vẻ phù hợp, áp dụng chính xác các quy tắc phân biệt.
- Chọn lỗi trực tiếp nhất gây ra WA.

TAXONOMY:
{taxonomy}

{rules}

Problem:
{problem_text}

Submission:
```cpp
{code}

Chỉ trả về JSON hợp lệ.
Không Markdown.
Không giải thích.
Không thêm field khác.

Format:
{{
"error_type": "ONE_ALLOWED_ERROR_TYPE",
"confidence": 0.0
}}

Yêu cầu:

error_type phải đúng một trong các giá trị:
{", ".join(ERROR_TYPES)}
confidence phải nằm trong [0.0, 1.0].
Chỉ trả về hai field: error_type và confidence.
"""
def classify_with_llm(
  llm: LLMProvider,
  problem: dict,
  code: str,
) -> ClassificationResult:
  """Classify one submission for the main pipeline.

  Provider errors intentionally propagate so the pipeline can perform its
  explicit fallback path.
  """
  prompt = _build_prompt(problem, code)
  parsed = llm.chat_json(system=_SYSTEM, user=prompt)

  error_type = parsed.get("error_type")
  confidence = parsed.get("confidence", 0.0)

  if error_type not in ERROR_TYPES:
    raise LLMInvalidResponseError(
      f"LLM tra error_type ngoai taxonomy: {error_type!r}"
    )

  try:
    confidence = float(confidence)
  except (TypeError, ValueError) as exc:
    raise LLMInvalidResponseError(
      f"LLM tra confidence khong hop le: {confidence!r}"
    ) from exc

  if not 0.0 <= confidence <= 1.0:
    raise LLMInvalidResponseError(
      f"LLM tra confidence ngoai [0,1]: {confidence!r}"
    )

  return ClassificationResult(
    error_type=error_type,
    confidence=confidence,
    source="llm",
  )


def classify_for_benchmark(
  llm: LLMProvider,
  problem: dict,
  code: str,
) -> dict:
  """Classify one submission while preserving benchmark failure statuses."""
  prompt = _build_prompt(problem, code)

  try:
    parsed, meta = llm.chat_json_with_meta(
      system=_SYSTEM,
      user=prompt,
    )
  except LLMTruncatedError as exc:
    return {
      "status": "TRUNCATED",
      "error": str(exc),
      "predicted_error_type": None,
      "confidence": None,
      "latency_ms": None,
    }
  except LLMAPIError as exc:
    return {
      "status": "API_ERROR",
      "error": str(exc),
      "predicted_error_type": None,
      "confidence": None,
      "latency_ms": None,
    }
  except LLMInvalidResponseError as exc:
    return {
      "status": "INVALID_RESPONSE",
      "error": str(exc),
      "predicted_error_type": None,
      "confidence": None,
      "latency_ms": None,
    }

  error_type = parsed.get("error_type")
  confidence = parsed.get("confidence", 0.0)
  latency_ms = meta.get("latency_ms")

  if error_type not in ERROR_TYPES:
    return {
      "status": "INVALID_RESPONSE",
      "error": f"error_type ngoai taxonomy: {error_type!r}",
      "predicted_error_type": None,
      "confidence": None,
      "latency_ms": latency_ms,
    }

  try:
    confidence = float(confidence)
  except (TypeError, ValueError):
    return {
      "status": "INVALID_RESPONSE",
      "error": f"confidence khong hop le: {confidence!r}",
      "predicted_error_type": None,
      "confidence": None,
      "latency_ms": latency_ms,
    }

  if not 0.0 <= confidence <= 1.0:
    return {
      "status": "INVALID_RESPONSE",
      "error": f"confidence ngoai [0,1]: {confidence!r}",
      "predicted_error_type": None,
      "confidence": None,
      "latency_ms": latency_ms,
    }

  return {
    "status": "OK",
    "error": None,
    "predicted_error_type": error_type,
    "confidence": confidence,
    "latency_ms": latency_ms,
  }