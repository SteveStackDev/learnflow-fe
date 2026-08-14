export const mockContestData = {
  id: "contest-15",
  badge: "CONTEST ARENA",
  title: "FySet Weekly Contest 15",
  remainingSeconds: 6150, // 01:42:30
  user: {
    name: "AlexCoder99",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=AlexCoder99",
    rank: "#42",
    score: 1500,
    maxScore: 5500,
  },
  problems: [
    {
      id: "A",
      letter: "A",
      title: "A. Two Sum Array",
      points: 500,
      status: "solved", // 'solved' | 'active' | 'unsolved' | 'locked'
      timeLimit: "0.5s",
      memoryLimit: "128MB",
      statement:
        "Cho một mảng các số nguyên nums và một số nguyên target, hãy trả về chỉ số của hai số sao cho tổng của chúng bằng target.",
      statementNotes: [
        "Bạn có thể giả định rằng mỗi đầu vào sẽ có chính xác một giải pháp, và bạn không được sử dụng cùng một phần tử hai lần.",
        "Bạn có thể trả về câu trả lời theo bất cứ thứ tự nào.",
      ],
      examples: [
        {
          input: "nums = [2,7,11,15], target = 9",
          output: "[0,1]",
          explanation: "Vì nums[0] + nums[1] == 9, chúng ta trả về [0, 1].",
        },
        {
          input: "nums = [3,2,4], target = 6",
          output: "[1,2]",
          explanation: "Vì nums[1] + nums[2] == 6, chúng ta trả về [1, 2].",
        },
      ],
      constraints: [
        "2 <= nums.length <= 10^4",
        "-10^9 <= nums[i] <= 10^9",
        "-10^9 <= target <= 10^9",
      ],
      starterCode: {
        cpp: `#include <iostream>\n#include <vector>\n\nusing namespace std;\n\nint main() {\n    // Code của bạn tại đây\n    return 0;\n}`,
        python: `# Viết code của bạn tại đây\nprint("Hello, World!")`,
        java: `public class Solution {\n    public static void main(String[] args) {\n        // Code tại đây\n    }\n}`,
        js: `// Viết code JS tại đây\nconsole.log("Hello, World!");`,
      },
      testCases: [
        { id: 1, label: "Case 1", input: "nums = [2,7,11,15], target = 9", expected: "[0,1]" },
        { id: 2, label: "Case 2", input: "nums = [3,2,4], target = 6", expected: "[1,2]" },
      ],
    },
    {
      id: "B",
      letter: "B",
      title: "B. Binary Search Tree Validation",
      points: 1000,
      status: "active",
      timeLimit: "1.0s",
      memoryLimit: "256MB",
      statement:
        "Given the root of a binary tree, determine if it is a valid binary search tree (BST).",
      statementNotes: [
        "A valid BST is defined as follows:",
        "• The left subtree of a node contains only nodes with keys less than the node's key.",
        "• The right subtree of a node contains only nodes with keys greater than the node's key.",
        "• Both the left and right subtrees must also be binary search trees.",
      ],
      examples: [
        {
          input: "root = [2,1,3]",
          output: "true",
          explanation: "Left child is 1 < 2, Right child is 3 > 2. Valid BST.",
        },
        {
          input: "root = [5,1,4,null,null,3,6]",
          output: "false",
          explanation: "The root node's value is 5 but its right child's value is 4.",
        },
      ],
      constraints: [
        "The number of nodes in the tree is in the range [1, 10^4].",
        "-2^31 <= Node.val <= 2^31 - 1",
      ],
      starterCode: {
        cpp: `#include <iostream>\n#include <vector>\n\nusing namespace std;\n\n// Definition for a binary tree node.\nstruct TreeNode {\n    int val;\n    TreeNode *left;\n    TreeNode *right;\n    TreeNode(int x) : val(x), left(NULL), right(NULL) {}\n};\n\nclass Solution {\npublic:\n    bool isValidBST(TreeNode* root) {\n        // Write your algorithm here\n        return true;\n    }\n};`,
        python: `# Definition for a binary tree node.\n# class TreeNode:\n#     def __init__(self, val=0, left=None, right=None):\n#         self.val = val\n#         self.left = left\n#         self.right = right\nclass Solution:\n    def isValidBST(self, root) -> bool:\n        return True`,
        java: `class Solution {\n    public boolean isValidBST(TreeNode root) {\n        return true;\n    }\n}`,
        js: `function isValidBST(root) {\n    return true;\n}`,
      },
      testCases: [
        { id: 1, label: "Case 1", input: "root = [2,1,3]", expected: "true" },
        { id: 2, label: "Case 2", input: "root = [5,1,4,null,null,3,6]", expected: "false" },
      ],
    },
    {
      id: "C",
      letter: "C",
      title: "C. Dynamic Programming - Coin Change",
      points: 1500,
      status: "unsolved",
      timeLimit: "2.0s",
      memoryLimit: "512MB",
      statement:
        "Cho mảng coins biểu thị các mệnh giá tiền xu khác nhau và số nguyên amount. Hãy tính số lượng xu ít nhất để tạo thành số tiền amount.",
      statementNotes: [
        "Nếu không có cách nào tạo ra amount từ các xu, hãy trả về -1.",
        "Bạn có thể sử dụng số lượng xu không giới hạn cho mỗi mệnh giá.",
      ],
      examples: [
        {
          input: "coins = [1,2,5], amount = 11",
          output: "3",
          explanation: "11 = 5 + 5 + 1",
        },
        {
          input: "coins = [2], amount = 3",
          output: "-1",
          explanation: "Không thể ghép thành số tiền 3.",
        },
      ],
      constraints: [
        "1 <= coins.length <= 12",
        "1 <= coins[i] <= 2^31 - 1",
        "0 <= amount <= 10^4",
      ],
      starterCode: {
        cpp: `#include <iostream>\n#include <vector>\n\nusing namespace std;\n\nclass Solution {\npublic:\n    int coinChange(vector<int>& coins, int amount) {\n        return -1;\n    }\n};`,
        python: `class Solution:\n    def coinChange(self, coins: list[int], amount: int) -> int:\n        return -1`,
        java: `class Solution {\n    public int coinChange(int[] coins, int amount) {\n        return -1;\n    }\n}`,
        js: `function coinChange(coins, amount) {\n    return -1;\n}`,
      },
      testCases: [
        { id: 1, label: "Case 1", input: "coins = [1,2,5], amount = 11", expected: "3" },
        { id: 2, label: "Case 2", input: "coins = [2], amount = 3", expected: "-1" },
      ],
    },
    {
      id: "D",
      letter: "D",
      title: "D. Graph Traversal - Shortest Path",
      points: 2500,
      status: "locked",
      timeLimit: "2.0s",
      memoryLimit: "512MB",
      statement:
        "Cho đồ thị vô hướng gồm N đỉnh và M cạnh có trọng số dương. Tìm đường đi ngắn nhất từ đỉnh 1 đến đỉnh N.",
      statementNotes: [
        "Trả về độ dài đường đi ngắn nhất hoặc -1 nếu không tồn tại đường đi.",
      ],
      examples: [
        {
          input: "n = 5, edges = [[1,2,2],[2,5,5],[1,3,1],[3,5,3]]",
          output: "4",
          explanation: "Đường đi 1 -> 3 -> 5 có tổng trọng số 1 + 3 = 4.",
        },
      ],
      constraints: ["1 <= n <= 10^5", "1 <= edges.length <= 2*10^5"],
      starterCode: {
        cpp: `// Graph algorithm starter code`,
        python: `# Graph algorithm starter code`,
        java: `// Graph algorithm starter code`,
        js: `// Graph algorithm starter code`,
      },
      testCases: [
        { id: 1, label: "Case 1", input: "n = 5, edges = [[1,2,2]...]", expected: "4" },
      ],
    },
  ],
  leaderboard: [
    { rank: 1, name: "CodeMaster", score: 3200, solvedCount: 3, avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=CodeMaster" },
    { rank: 2, name: "NeoHacker", score: 3150, solvedCount: 3, avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=NeoHacker" },
    { rank: 3, name: "ByteMe", score: 3100, solvedCount: 3, avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=ByteMe" },
    { rank: 4, name: "AlgoKing", score: 2900, solvedCount: 3, avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=AlgoKing" },
    { rank: 5, name: "DevQueen", score: 2850, solvedCount: 2, avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=DevQueen" },
    { rank: 6, name: "CyberNinja", score: 2600, solvedCount: 2, avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=CyberNinja" },
    { rank: 7, name: "ScriptGod", score: 2400, solvedCount: 2, avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=ScriptGod" },
    { rank: 41, name: "dev_guy", score: 1550, solvedCount: 2, avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=dev_guy" },
    { rank: 42, name: "You (AlexCoder99)", score: 1500, solvedCount: 2, isCurrentUser: true, avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=AlexCoder99" },
    { rank: 43, name: "coder_pro", score: 1450, solvedCount: 1, avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=coder_pro" },
  ],
};
