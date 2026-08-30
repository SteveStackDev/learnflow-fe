/**
 * FySet Problem Detail Mock Data (C++ Only for Judge Engine)
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
  description: `Cho một mảng các số nguyên \`nums\` và một số nguyên \`target\`, hãy tìm chỉ số (index) của hai số trong mảng sao cho tổng của chúng bằng \`target\`.

Bạn có thể giả định rằng mỗi đầu vào sẽ có **đúng một giải pháp**, và bạn không được sử dụng cùng một phần tử hai lần. Bạn có thể trả về câu trả lời theo bất kỳ thứ tự nào.`,

  inputFormat: [
    "Dòng đầu tiên chứa hai số nguyên N và T (1 <= N <= 10^5, 1 <= T <= 10^9).",
    "Dòng thứ hai chứa N số nguyên phân tách bởi khoảng trắng.",
  ],
  outputFormat: [
    "In ra số lượng phần tử tối đa có thể chọn.",
  ],
  constraints: [
    "2 <= nums.length <= 10^4",
    "-10^9 <= nums[i] <= 10^9",
    "-10^9 <= target <= 10^9",
    "Chỉ tồn tại đúng 1 đáp án hợp lệ.",
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
  tags: ["Greedy (Tham ăn)", "Sort (Sắp xếp)", "Toán học (Math)"],

  languages: [
    {
      id: "cpp",
      label: "C++",
      template: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    
    long long n, t;
    if (!(cin >> n >> t)) return 0;
    
    vector<long long> a(n);
    for (int i = 0; i < n; i++) cin >> a[i];
    sort(a.begin(), a.end());
    
    long long count = 0, sum = 0;
    for (int i = 0; i < n; i++) {
        if (sum + a[i] <= t) {
            sum += a[i];
            count++;
        } else break;
    }
    
    cout << count << "\n";
    return 0;
}`,
    },
  ],
};
