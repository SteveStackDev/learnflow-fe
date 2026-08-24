export const problemDetailData = {
  id: "cong-trinh-xay-dung",
  number: 1,
  title: "Công trình xây dựng",
  author: "FySet Team",
  level: "Dễ",
  upvotes: "15.4K",
  downvotes: "203",
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
    "1 <= N <= 10⁶",
    "1 <= T <= 10¹²",
    "1 <= a[i] <= 10⁹",
    "Công nhân thứ i có thể được thuê hoặc không được thuê.",
  ],
  examples: [
    {
      id: 1,
      title: "Ví dụ 1:",
      input: "5 10\n2 3 1 5 4",
      output: "3",
      explanation: "Thuê các công nhân có mức công 1, 2, 3 (tổng = 6 <= 10). Số công nhân lớn nhất thuê được là 3.",
    },
    {
      id: 2,
      title: "Ví dụ 2:",
      input: "3 5\n6 7 8",
      output: "0",
      explanation: "Không đủ ngân sách để thuê bất kỳ công nhân nào.",
    },
  ],
  tags: ["Greedy (Tham ăn)", "Sort (Sắp xếp)", "Toán học (Math)"],

  languages: [
    {
      id: "python3",
      label: "Python3",
      template: `# Viết code của bạn tại đây
n, t = map(int, input().split())
a = list(map(int, input().split()))
a.sort()
count = 0
total = 0
for val in a:
    if total + val <= t:
        total += val
        count += 1
    else:
        break
print(count)`,
    },
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

  sampleTestCases: [
    {
      id: 1,
      name: "Test case 1",
      input: "5 10\n2 3 1 5 4",
      expectedOutput: "3",
      userOutput: "",
      status: "untested",
    },
    {
      id: 2,
      name: "Test case 2",
      input: "3 5\n6 7 8",
      expectedOutput: "0",
      userOutput: "",
      status: "untested",
    },
  ],
};
