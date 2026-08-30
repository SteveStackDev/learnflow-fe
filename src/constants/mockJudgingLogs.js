/**
 * FySet Judging Engine Mock Simulation Data & Log Sequences
 */

export const mockRunCodeLogs = (problemTitle = "Bài tập") => [
  { type: "info", text: `⚙️ Đang thực thi mã nguồn C++ cho ${problemTitle}...` },
  { type: "stdout", text: "Input: N = 5, T = 10 \n2 3 1 5 4" },
  { type: "stdout", text: "Output: 3" },
  { type: "success", text: "✅ Biên dịch & Chạy thử thành công (0ms, 14.2MB)" },
];

export const mockJudgingSequence = {
  step1: (problemId = "A") => ({
    stepLabel: "[1/3] Đang gửi mã nguồn tới hệ thống chấm...",
    logs: [
      { type: "info", text: `[${new Date().toLocaleTimeString()}] 🚀 Bắt đầu quá trình chấm bài (Judge Engine - Bài ${problemId})...` },
      { type: "info", text: "[1/3] Đang tải mã nguồn C++..." },
    ],
  }),

  step2: {
    stepLabel: "[2/3] Đang biên dịch mã nguồn C++...",
    logs: [
      { type: "stdout", text: "[2/3] g++ -O3 solution.cpp -o solution" },
      { type: "success", text: "✅ Biên dịch thành công! Không có lỗi (0 Warnings)." },
    ],
  },

  step3: {
    stepLabel: "[3/3] Đang chạy kiểm thử các Subtasks (Sub 1, Sub 2, Sub 3)...",
    logs: [
      { type: "stdout", text: "[3/3] Subtask 1 (30 pts): Passed 5/5 testcases (Max time: 14ms)" },
      { type: "stdout", text: "[3/3] Subtask 2 (30 pts): Passed 5/5 testcases (Max time: 28ms)" },
      { type: "stdout", text: "[3/3] Subtask 3 (40 pts): Passed 5/5 testcases (Max time: 36ms)" },
      { type: "success", text: "🎉 Verdict: ACCEPTED (100/100 Pts). Đang chuyển tới trang Kết quả..." },
    ],
  },
};
