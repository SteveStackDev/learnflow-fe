export const problemDetailData = {
  id: "two-sum",
  number: 1,
  title: "Hai số tổng (Two Sum)",
  level: "Dễ",
  upvotes: "15.4K",
  downvotes: "203",
  statement:
    "Cho một mảng các số nguyên nums và một số nguyên target, hãy trả về chỉ số (indices) của hai số sao cho tổng của chúng bằng target.",
  statementNotes: [
    "Bạn có thể giả định rằng mỗi đầu vào sẽ có chính xác một giải pháp, và bạn không được sử dụng cùng một phần tử hai lần.",
    "Bạn có thể trả về câu trả lời theo bất cứ thứ tự nào.",
  ],
  examples: [
    {
      id: 1,
      title: "Ví dụ 1:",
      input: "nums = [2,7,11,15], target = 9",
      output: "[0,1]",
      explanation: "Vì nums[0] + nums[1] == 9, chúng ta trả về [0, 1].",
    },
    {
      id: 2,
      title: "Ví dụ 2:",
      input: "nums = [3,2,4], target = 6",
      output: "[1,2]",
      explanation: "Vì nums[1] + nums[2] == 6, chúng ta trả về [1, 2].",
    },
    {
      id: 3,
      title: "Ví dụ 3:",
      input: "nums = [3,3], target = 6",
      output: "[0,1]",
      explanation: "Vì nums[0] + nums[1] == 6, chúng ta trả về [0, 1].",
    },
  ],
  constraints: [
    "2 <= nums.length <= 10⁴",
    "-10⁹ <= nums[i] <= 10⁹",
    "-10⁹ <= target <= 10⁹",
    "Chỉ có một giải pháp duy nhất tồn tại.",
  ],
  tags: ["Mảng (Array)", "Hash Table", "Toán học (Math)"],

  languages: [
    {
      id: "python3",
      label: "Python3",
      template: `# Viết code của bạn tại đây
print("Hello, World!")`,
    },
    {
      id: "cpp",
      label: "C++",
      template: `#include <iostream>
using namespace std;

int main() {
    cout << "Hello, World!" << endl;
    return 0;
}`,
    },
    {
      id: "java",
      label: "Java",
      template: `public class Main {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}`,
    },
    {
      id: "javascript",
      label: "JavaScript",
      template: `// Viết code của bạn tại đây
console.log("Hello, World!");`,
    },
  ],

  solution: {
    approach: "Sử dụng Hash Map (Bảng Băm)",
    complexity: {
      time: "O(n)",
      space: "O(n)",
    },
    explanation:
      "Thay vì duyệt 2 vòng lặp lồng nhau (O(n²)), ta duyệt qua mảng 1 lần duy nhất. Với mỗi phần tử, ta tính số còn thiếu diff = target - num và kiểm tra xem diff đã xuất hiện trong Hash Map chưa. Nếu có, ta trả về chỉ số ngay lập tức.",
  },

  discussions: [
    {
      id: 1,
      author: "Hoàng Nam",
      avatar: "HN",
      time: "2 giờ trước",
      likes: 42,
      content:
        "Giải pháp dùng Hash Table siêu tối ưu O(n) thời gian! Bài này là kinh điển cho ai mới bắt đầu học Cấu trúc dữ liệu & Thuật toán.",
    },
    {
      id: 2,
      author: "Phương Thảo",
      avatar: "PT",
      time: "5 giờ trước",
      likes: 18,
      content: "Mình lưu ý các bạn nhớ kiểm tra trường hợp mảng có 2 phần tử giống nhau nhé!",
    },
  ],
};
