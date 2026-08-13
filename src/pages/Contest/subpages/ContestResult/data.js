export const mockContestResultData = {
  id: "result-b",
  problemId: "B",
  problemLetter: "B",
  problemTitle: "B. Binary Search Tree Validation",
  points: 1000,
  level: "Trung bình",
  language: "Python3",
  timestamp: "12:35 PM - Hôm nay",
  linesCount: 14,
  code: `# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right

class Solution:
    def isValidBST(self, root) -> bool:
        def validate(node, low=float('-inf'), high=float('inf')):
            if not node:
                return True
            if not (low < node.val < high):
                return False
            return validate(node.left, low, node.val) and validate(node.right, node.val, high)
        
        return validate(root)`,
  status: "Accepted",
  statusTitle: "Chấp nhận (Accepted)",
  statusSubtitle: "Bài làm của bạn đã vượt qua tất cả test cases mẫu và ẩn thành công!",
  metrics: {
    runtime: "36 ms",
    runtimePercent: "Nhanh hơn 94.2% bài nộp Python3",
    memory: "16.4 MB",
    memoryPercent: "Tiết kiệm bộ nhớ hơn 88.5% bài nộp Python3",
    testcasesPassed: "15/15",
    testcasesPercent: "100% Test cases passed",
  },
  testCases: [
    {
      id: 1,
      label: "Case 1",
      passed: true,
      input: "root = [2,1,3]",
      output: "true",
      expected: "true",
      runtime: "12ms",
      memory: "16.2MB",
    },
    {
      id: 2,
      label: "Case 2",
      passed: true,
      input: "root = [5,1,4,null,null,3,6]",
      output: "false",
      expected: "false",
      runtime: "14ms",
      memory: "16.4MB",
    },
    {
      id: 3,
      label: "Case 3",
      passed: true,
      input: "root = [10,5,15,null,null,6,20]",
      output: "false",
      expected: "false",
      runtime: "10ms",
      memory: "16.3MB",
    },
  ],
};
