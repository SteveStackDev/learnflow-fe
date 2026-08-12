export const problemResultData = {
  id: "1",
  problemTitle: "1. Two Sum (Hai số tổng)",
  difficulty: "Easy",
  difficultyLabel: "Dễ",
  language: "Python3",
  submittedAt: "12:35 PM - Hôn nay",
  submittedCode: `class Solution:
    def twoSum(self, nums: List[int], target: int) -> List[int]:
        num_map = {}
        for i, num in enumerate(nums):
            complement = target - num
            if complement in num_map:
                return [num_map[complement], i]
            num_map[num] = i
        return []`,
  status: "Accepted",
  statusLabel: "Chấp nhận (Accepted)",
  statusDescription: "Bài làm của bạn đã vượt qua tất cả test cases mẫu và ẩn thành công!",
  runtime: "36 ms",
  runtimePercentile: "Nhanh hơn 94.2% bài nộp Python3",
  memory: "16.4 MB",
  memoryPercentile: "Tiết kiệm bộ nhớ hơn 88.5% bài nộp Python3",
  passedTestCases: 15,
  totalTestCases: 15,
  testCases: [
    {
      id: 1,
      label: "Case 1",
      input: "nums = [2, 7, 11, 15]\ntarget = 9",
      expectedOutput: "[0, 1]",
      actualOutput: "[0, 1]",
      status: "Passed",
    },
    {
      id: 2,
      label: "Case 2",
      input: "nums = [3, 2, 4]\ntarget = 6",
      expectedOutput: "[1, 2]",
      actualOutput: "[1, 2]",
      status: "Passed",
    },
    {
      id: 3,
      label: "Case 3",
      input: "nums = [3, 3]\ntarget = 6",
      expectedOutput: "[0, 1]",
      actualOutput: "[0, 1]",
      status: "Passed",
    },
  ],
};
