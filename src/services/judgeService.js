/**
 * FySet Code Judge Service Client
 * Kết nối trực tiếp tới Django Judge Backend API để nộp bài, chạy thử và lấy dữ liệu chấm điểm thực tế.
 */

const API_BASE_URL = "http://127.0.0.1:8000/api/judge";
const JUDGE_TIMEOUT_MS = 60000; // 60s timeout

/**
 * Nộp bài và nhận kết quả chấm từ máy chủ Django
 */
export async function submitCode({
  problemId,
  sourceCode,
  language = "cpp",
  timeoutMs = JUDGE_TIMEOUT_MS,
}) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(`${API_BASE_URL}/submit/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        problem_id: Number(problemId),
        source_code: sourceCode,
        language,
      }),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Gửi bài tập lên máy chấm thất bại!");
    }

    return {
      submission_id: data.submission_id,
      problem_id: data.problem_id,
      status: data.status,
      score: data.score != null ? data.score : 0,
      max_score: data.max_score != null ? data.max_score : 100,
      execution_time: data.execution_time != null ? data.execution_time : 0.0,
      passed_tests: data.passed_tests != null ? data.passed_tests : 0,
      total_tests: data.total_tests != null ? data.total_tests : 0,
      test_results: data.test_results || [],
      subtasks: data.subtasks || [],
      logs: data.logs || [],
      isFallback: false,
    };
  } catch (error) {
    clearTimeout(timeoutId);

    if (error.name === "AbortError") {
      throw new Error(`Thời gian chấm bài vượt quá ${timeoutMs / 1000} giây (Timeout). Vui lòng thử lại sau!`);
    }

    throw new Error(error.message || "Không thể kết nối tới máy chủ máy chấm Django!");
  }
}

/**
 * Chạy thử mã nguồn trên 1 testcase mẫu từ server
 */
export async function runCodeSample({
  sourceCode = "",
  language = "cpp",
  sampleInput = "",
  expectedOutput = "",
}) {
  const code = (sourceCode || "").trim();

  if (!code) {
    return {
      success: false,
      stdout: "",
      error: "Mã nguồn không được để trống!",
      executionTime: "0.00s",
    };
  }

  try {
    const response = await fetch(`${API_BASE_URL}/run-sample/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        source_code: sourceCode,
        language,
        sample_input: sampleInput,
        expected_output: expectedOutput,
      }),
    });

    const data = await response.json();

    if (response.ok) {
      return {
        success: data.success,
        status: data.status,
        stdout: data.stdout || "",
        stderr: data.stderr || "",
        input: sampleInput,
        expectedOutput: expectedOutput,
        executionTime: data.executionTime || "0.02s",
        memory: data.memory || "2.1MB",
        error: data.error || (data.status !== "AC" && data.stderr ? data.stderr : ""),
      };
    } else {
      return {
        success: false,
        stdout: "",
        error: data.error || "Chạy thử thất bại từ máy chủ!",
        executionTime: "0.00s",
      };
    }
  } catch (err) {
    return {
      success: false,
      stdout: "",
      error: err.message || "Không thể kết nối tới máy chủ chạy thử!",
      executionTime: "0.00s",
    };
  }
}

/**
 * Lấy chi tiết bài nộp theo ID từ server
 */
export async function getSubmission(submissionId) {
  const response = await fetch(`${API_BASE_URL}/submissions/${submissionId}/`);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Khôi phục dữ liệu bài nộp thất bại");
  }

  return data;
}

/**
 * Lấy toàn bộ danh sách bài nộp từ server
 */
export async function getSubmissions() {
  const response = await fetch(`${API_BASE_URL}/submissions/`);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Không thể lấy danh sách bài nộp");
  }

  return data;
}