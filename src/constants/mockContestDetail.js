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
  leaderboard: [
    { rank: 1, name: "Michael Steve", avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80", score: "5,200 pt", isCurrentUser: false },
    { rank: 2, name: "Elena Rostova", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80", score: "4,850 pt", isCurrentUser: false },
    { rank: 3, name: "Alex Chen", avatar: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=150&auto=format&fit=crop&q=80", score: "4,200 pt", isCurrentUser: false },
    { rank: 4, name: "Sarah Jenkins", avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80", score: "3,800 pt", isCurrentUser: false },
    { rank: 42, name: "AlexCoder99 (Bạn)", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=AlexCoder99", score: "1,500 pt", isCurrentUser: true },
  ],
  problems: [
    {
      id: "A",
      letter: "A",
      title: "Bài 1: Công trình xây dựng",
      points: 500,
      status: "solved", // 'solved' | 'active' | 'unsolved' | 'locked'
      timeLimit: "1.0s",
      memoryLimit: "256MB",
      statement:
        "Một đội công nhân gồm N người đang chuẩn bị xây dựng một tòa nhà cao tầng để phục vụ cho một sự kiện hợp tác quan trọng giữa hai công ty. Mỗi công nhân thứ i có mức tiền công là a[i] đồng cho mỗi tháng làm việc. Chủ đầu tư có ngân sách tối đa T đồng để thuê công nhân trong tháng này. Chủ đầu tư muốn thuê được nhiều công nhân nhất có thể và yêu cầu tổng tiền công của tất cả công nhân được thuê không vượt quá T. Hãy giúp chủ đầu tư xác định số lượng công nhân lớn nhất có thể thuê.",
      inputFormat: [
        "Dòng đầu tiên gồm hai số nguyên dương N và T, tương ứng với số lượng công nhân và tổng số tiền mà chủ đầu tư hiện có.",
        "Dòng thứ hai gồm N số công nhân, mỗi công nhân thứ i nhận được số tiền công a[i] đồng.",
      ],
      outputFormat: [
        "In ra một số nguyên duy nhất là số lượng công nhân lớn nhất mà chủ đầu tư có thể thuê sao cho tổng tiền công không vượt quá T.",
      ],
      constraints: [
        "1 <= N <= 10^6",
        "1 <= T <= 10^12",
        "1 <= a[i] <= 10^9",
        "Công nhân thứ i có thể được thuê hoặc không được thuê.",
      ],
      examples: [
        {
          input: "5 10\n2 3 1 5 4",
          output: "3",
          explanation: "Thuê các công nhân có mức công 1, 2, 3 (tổng = 6 <= 10). Số công nhân lớn nhất thuê được là 3.",
        },
        {
          input: "3 5\n6 7 8",
          output: "0",
          explanation: "Không đủ ngân sách để thuê bất kỳ công nhân nào.",
        },
      ],
      starterCode: {
        cpp: `#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\n\nint main() {\n    long long n, t;\n    cin >> n >> t;\n    vector<long long> a(n);\n    for(int i=0; i<n; i++) cin >> a[i];\n    sort(a.begin(), a.end());\n    long long count = 0, sum = 0;\n    for(int i=0; i<n; i++) {\n        if(sum + a[i] <= t) {\n            sum += a[i];\n            count++;\n        } else break;\n    }\n    cout << count << endl;\n    return 0;\n}`,
        python: `n, t = map(int, input().split())\na = list(map(int, input().split()))\na.sort()\ncount = sum_val = 0\nfor val in a:\n    if sum_val + val <= t:\n        sum_val += val\n        count += 1\n    else:\n        break\nprint(count)`,
        java: `import java.util.*;\npublic class Solution {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        long t = sc.nextLong();\n        long[] a = new long[n];\n        for(int i=0; i<n; i++) a[i] = sc.nextLong();\n        Arrays.sort(a);\n        int count = 0;\n        long sum = 0;\n        for(int i=0; i<n; i++) {\n            if(sum + a[i] <= t) {\n                sum += a[i];\n                count++;\n            } else break;\n        }\n        System.out.println(count);\n    }\n}`,
        js: `const fs = require('fs');\nconst input = fs.readFileSync('/dev/stdin').toString().trim().split(/\\s+/);\nif (input.length >= 2) {\n  const n = parseInt(input[0]);\n  const t = BigInt(input[1]);\n  const a = input.slice(2, 2 + n).map(x => BigInt(x)).sort((x, y) => (x < y ? -1 : 1));\n  let count = 0, sum = 0n;\n  for (let i = 0; i < a.length; i++) {\n    if (sum + a[i] <= t) { sum += a[i]; count++; } else break;\n  }\n  console.log(count);\n}`,
      },
      testCases: [
        { id: 1, label: "Case 1", input: "5 10\n2 3 1 5 4", expected: "3" },
        { id: 2, label: "Case 2", input: "3 5\n6 7 8", expected: "0" },
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
        "Cho một gốc của một cây nhị phân (Binary Tree), hãy xác định xem nó có phải là một Cây tìm kiếm nhị phân hợp lệ (Valid Binary Search Tree - BST) hay không.",
      inputFormat: [
        "Dòng đầu tiên chứa danh sách các giá trị nút theo thứ tự level-order (dùng null cho nút rỗng).",
      ],
      outputFormat: [
        "In ra true nếu cây là BST hợp lệ, ngược lại in ra false.",
      ],
      constraints: [
        "Số lượng nút trong cây nằm trong khoảng [1, 10^4].",
        "-2^31 <= Node.val <= 2^31 - 1.",
      ],
      examples: [
        {
          input: "root = [2,1,3]",
          output: "true",
          explanation: "Nút gốc 2 có con trái 1 < 2 và con phải 3 > 2.",
        },
        {
          input: "root = [5,1,4,null,null,3,6]",
          output: "false",
          explanation: "Nút gốc có giá trị 5 nhưng con phải là 4 (< 5).",
        },
      ],
      starterCode: {
        cpp: `#include <iostream>\nusing namespace std;\n\nint main() {\n    cout << "true" << endl;\n    return 0;\n}`,
        python: `print("true")`,
        java: `public class Solution {\n    public static void main(String[] args) {\n        System.out.println("true");\n    }\n}`,
        js: `console.log("true");`,
      },
      testCases: [
        { id: 1, label: "Case 1", input: "root = [2,1,3]", expected: "true" },
        { id: 2, label: "Case 2", input: "root = [5,1,4,null,null,3,6]", expected: "false" },
      ],
    },
  ],
};
