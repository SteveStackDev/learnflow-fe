/**
 * FySet Problem Detail Mock Data (C++ & Multi-language for Judge Engine)
 */

export const problemDetailData = {
  id: "1",
  title: "Two Sum (Hai số tổng)",
  difficulty: "Easy",
  difficultyLabel: "Dễ",
  timeLimit: "2.0s",
  memoryLimit: "256MB",
  author: {
    name: "FySet DevTeam",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=fyset-dev",
    role: "System Admin",
    userId: "user-01",
  },
  stats: {
    acceptedCount: 1420,
    submissionCount: 2850,
    acceptedRate: "49.8%",
    points: 100,
  },
  description: `Cho một mảng các số nguyên \`nums\` gồm \`N\` phần tử và một số nguyên \`target\` (\`T\`). Hãy tìm và in ra hai chỉ số (0-indexed) của hai số trong mảng sao cho tổng của chúng bằng \`target\`.

Bạn có thể giả định rằng mỗi đầu vào sẽ có **đúng một giải pháp duy nhất**, và bạn không được sử dụng cùng một phần tử hai lần. In ra hai chỉ số cách nhau bởi một khoảng trắng theo thứ tự tăng dần.`,

  inputFormat: [
    "Dòng đầu tiên chứa hai số nguyên N và T (2 <= N <= 10^5, -10^9 <= T <= 10^9).",
    "Dòng thứ hai chứa N số nguyên phân tách bởi khoảng trắng (-10^9 <= nums[i] <= 10^9).",
  ],
  outputFormat: [
    "In ra hai chỉ số (0-indexed) cách nhau bởi khoảng trắng thỏa mãn nums[i] + nums[j] == T.",
  ],
  constraints: [
    "2 <= N <= 10^5",
    "-10^9 <= nums[i] <= 10^9",
    "-10^9 <= target <= 10^9",
    "Chỉ tồn tại đúng 1 đáp án hợp lệ duy nhất.",
  ],
  examples: [
    {
      input: "4 9\n2 7 11 15",
      output: "0 1",
      explanation: "nums[0] + nums[1] = 2 + 7 = 9. Chỉ số tương ứng là 0 và 1.",
    },
    {
      input: "3 6\n3 2 4",
      output: "1 2",
      explanation: "nums[1] + nums[2] = 2 + 4 = 6. Chỉ số tương ứng là 1 và 2.",
    },
    {
      input: "2 6\n3 3",
      output: "0 1",
      explanation: "nums[0] + nums[1] = 3 + 3 = 6. Chỉ số tương ứng là 0 và 1.",
    },
  ],
  tags: ["Hash Table (Bảng băm)", "Array (Mảng)", "Two Pointers (Hai con trỏ)"],

  languages: [
    {
      id: "cpp",
      label: "C++",
      template: `#include <iostream>

using namespace std;

int main()
{
    cout << "Hello world!" << endl;
    return 0;
}`,
    },
    {
      id: "python",
      label: "Python 3",
      template: `import sys

def main():
    input_data = sys.stdin.read().split()
    if not input_data:
        return
    # Viết mã nguồn giải thuật của bạn tại đây
    pass

if __name__ == "__main__":
    main()`,
    },
    {
      id: "java",
      label: "Java",
      template: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        // Viết mã nguồn giải thuật của bạn tại đây
    }
}`,
    },
    {
      id: "javascript",
      label: "JavaScript (Node.js)",
      template: `const fs = require("fs");

function main() {
    const input = fs.readFileSync(0, "utf-8").trim();
    if (!input) return;
    // Viết mã nguồn giải thuật của bạn tại đây
}

main();`,
    },
  ],
};

export default problemDetailData;
