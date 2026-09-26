/**
 * FySet Code Judge Service Client
 * Kết nối linh hoạt tới Django Judge Backend API (hỗ trợ qua Vite Proxy và kết nối trực tiếp)
 */

const ENDPOINTS = [
  "/api/judge", // 1. Ưu tiên đi qua Vite Proxy (Tránh 100% lỗi CORS và phân giải localhost)
  "http://localhost:8000/api/judge", // 2. Thử trực tiếp localhost:8000
  "http://127.0.0.1:8000/api/judge", // 3. Thử trực tiếp 127.0.0.1:8000
];

const JUDGE_TIMEOUT_MS = 60000; // 60s timeout

/**
 * Hàm gọi API máy chấm với cơ chế tự động thử nhiều đường dẫn kết nối
 */
async function callJudgeAPI(path, options = {}) {
  let lastError = null;

  for (const baseUrl of ENDPOINTS) {
    try {
      const url = `${baseUrl}${path}`;
      const response = await fetch(url, {
        ...options,
        headers: {
          "Content-Type": "application/json",
          ...(options.headers || {}),
        },
      });

      if (response.status === 503 || response.status === 502) {
        // Server proxy báo 503 backend offline, thử endpoint tiếp theo
        continue;
      }

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(data.error || data.message || `Lỗi máy chấm (${response.status})`);
      }

      return data;
    } catch (err) {
      lastError = err;
      // Thử tiếp endpoint dự phòng
      continue;
    }
  }

  throw new Error(
    lastError?.message || "Không thể kết nối tới máy chủ máy chấm Docker trên cổng 8000!",
  );
}

/**
 * Nộp bài và nhận kết quả chấm từ máy chủ Django
 */
export async function submitCode({
  problemId,
  sourceCode,
  language = "cpp",
  subtasks = [],
  testCases = [],
  examples = [],
  timeLimit = 2.0,
  memoryLimit = 256,
  timeoutMs = JUDGE_TIMEOUT_MS,
}) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const data = await callJudgeAPI("/submit/", {
      method: "POST",
      body: JSON.stringify({
        problem_id: String(problemId || "1"),
        source_code: sourceCode,
        language,
        subtasks,
        testCases,
        examples,
        time_limit: parseFloat(timeLimit) || 2.0,
        memory_limit: parseInt(memoryLimit) || 256,
      }),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    return {
      submission_id: data.submission_id || `sub_${Date.now()}`,
      problem_id: data.problem_id || problemId,
      status: data.status || "AC",
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
      throw new Error(
        `Thời gian chấm bài vượt quá ${timeoutMs / 1000} giây (Timeout). Vui lòng thử lại sau!`,
      );
    }

    throw error;
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
    const data = await callJudgeAPI("/run-sample/", {
      method: "POST",
      body: JSON.stringify({
        source_code: sourceCode,
        language,
        sample_input: sampleInput,
        expected_output: expectedOutput,
      }),
    });

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
  return await callJudgeAPI(`/submissions/${submissionId}/`);
}

/**
 * Lấy toàn bộ danh sách bài nộp từ server
 */
export async function getSubmissions() {
  return await callJudgeAPI("/submissions/");
}
