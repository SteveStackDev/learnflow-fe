/**
 * FySet Code Judge Service Client
 * Handles code submission, execution timeout (60s), and polling submission status.
 */

const API_BASE_URL = "http://127.0.0.1:8000/api/judge";
const JUDGE_TIMEOUT_MS = 60000; // 60 seconds timeout for long judging requests

/**
 * Submit code for automated judging with 60s timeout support.
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
        problem_id: problemId,
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

    return data;
  } catch (error) {
    clearTimeout(timeoutId);

    if (error.name === "AbortError") {
      throw new Error(`Thời gian chấm bài vượt quá ${timeoutMs / 1000} giây (Timeout). Vui lòng thử lại sau!`, { cause: error });
    }

    throw error;
  }
}

/**
 * Fetch specific submission details by ID
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
 * Fetch all past submissions list
 */
export async function getSubmissions() {
  const response = await fetch(`${API_BASE_URL}/submissions/`);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Không thể lấy danh sách bài nộp");
  }

  return data;
}