export const problemData = {
  stats: [
    { title: "Tổng số bài tập", value: "320+", iconName: "Code" },
    { title: "Chủ đề đa dạng", value: "15+", iconName: "Grid" },
    { title: "Bài mới tuần này", value: "12", iconName: "Clock" },
  ],

  items: [
    {
      id: "problem-1",
      level: "Dễ",
      title: "Tính tổng hai số nguyên",
      description:
        "Cho hai số nguyên a và b. Hãy thực hiện tính tổng của chúng và trả về kết quả chuẩn xác.",
      tags: ["Toán học", "Cơ bản"],
      successRate: "95%",
      passRateNum: 95,
      submissionsCount: 4500,
      createdAt: "2026-01-10",
      iconName: "Zap",
    },
    {
      id: "problem-2",
      level: "Trung bình",
      title: "Kiểm tra chuỗi đối xứng",
      description:
        "Kiểm tra xem một chuỗi ký tự có phải là chuỗi đối xứng (Palindrome) hay không.",
      tags: ["Chuỗi", "Hai con trỏ"],
      successRate: "72%",
      passRateNum: 72,
      submissionsCount: 3200,
      createdAt: "2026-02-05",
      iconName: "Code",
    },
    {
      id: "problem-3",
      level: "Khó",
      title: "Tìm đường đi ngắn nhất (Dijkstra)",
      description:
        "Cho một đồ thị có trọng số dương, hãy tìm đường đi ngắn nhất giữa hai đỉnh bằng Dijkstra.",
      tags: ["Đồ thị", "Thuật toán"],
      successRate: "45%",
      passRateNum: 45,
      submissionsCount: 1800,
      createdAt: "2026-03-01",
      iconName: "Database",
    },
    {
      id: "problem-4",
      level: "Trung bình",
      title: "Tìm số lớn nhất trong mảng",
      description:
        "Viết hàm nhận vào một mảng các số nguyên và trả về giá trị lớn nhất.",
      tags: ["Mảng", "Vòng lặp"],
      successRate: "88%",
      passRateNum: 88,
      submissionsCount: 3900,
      createdAt: "2026-01-25",
      iconName: "Layers",
    },
    {
      id: "problem-5",
      level: "Khó",
      title: "Cân bằng cây nhị phân (AVL Tree)",
      description:
        "Cho một cây nhị phân tìm kiếm, hãy thực hiện các phép xoay để biến nó thành cây AVL.",
      tags: ["Cây", "Đệ quy"],
      successRate: "31%",
      passRateNum: 31,
      submissionsCount: 950,
      createdAt: "2026-03-20",
      iconName: "Cpu",
    },
    {
      id: "problem-6",
      level: "Dễ",
      title: "Hash Map đếm số lần xuất hiện",
      description:
        "Sử dụng Hash Map để đếm số lần xuất hiện của mỗi phần tử trong mảng cho trước.",
      tags: ["Hash Map", "Tối ưu"],
      successRate: "91%",
      passRateNum: 91,
      submissionsCount: 4100,
      createdAt: "2026-02-15",
      iconName: "Terminal",
    },
    {
      id: "problem-7",
      level: "Trung bình",
      title: "Đảo ngược danh sách liên kết",
      description:
        "Cho con trỏ head của danh sách liên kết đơn, hãy đảo ngược danh sách và trả về con trỏ mới.",
      tags: ["Linked List", "Pointer"],
      successRate: "78%",
      passRateNum: 78,
      submissionsCount: 2900,
      createdAt: "2026-04-02",
      iconName: "Code",
    },
    {
      id: "problem-8",
      level: "Khó",
      title: "Quy hoạch động: Bài toán cái túi (Knapsack)",
      description:
        "Cho các vật phẩm có trọng lượng và giá trị, hãy chọn các vật phẩm sao cho tổng giá trị lớn nhất.",
      tags: ["Dynamic Programming", "Thuật toán"],
      successRate: "42%",
      passRateNum: 42,
      submissionsCount: 1600,
      createdAt: "2026-04-12",
      iconName: "Database",
    },
    {
      id: "problem-9",
      level: "Dễ",
      title: "Hợp nhất hai mảng đã sắp xếp",
      description:
        "Cho hai mảng số nguyên đã sắp xếp tăng dần, hợp nhất chúng thành một mảng duy nhất.",
      tags: ["Mảng", "Hai con trỏ"],
      successRate: "89%",
      passRateNum: 89,
      submissionsCount: 3700,
      createdAt: "2026-03-28",
      iconName: "Layers",
    },
    {
      id: "problem-10",
      level: "Trung bình",
      title: "Tìm kiếm nhị phân trên mảng xoay",
      description:
        "Tìm giá trị target trong một mảng đã được xoay tại một điểm chốt bất kỳ.",
      tags: ["Binary Search", "Mảng"],
      successRate: "65%",
      passRateNum: 65,
      submissionsCount: 2400,
      createdAt: "2026-04-05",
      iconName: "Zap",
    },
    {
      id: "problem-11",
      level: "Khó",
      title: "LRU Cache - Bộ nhớ đệm ít dùng nhất",
      description:
        "Thiết kế cấu trúc dữ liệu LRU Cache hỗ trợ các thao tác get và put trong thời gian O(1).",
      tags: ["Hash Map", "Doubly Linked List"],
      successRate: "38%",
      passRateNum: 38,
      submissionsCount: 1200,
      createdAt: "2026-04-18",
      iconName: "Cpu",
    },
    {
      id: "problem-12",
      level: "Dễ",
      title: "Kiểm tra số nguyên tố",
      description:
        "Viết hàm kiểm tra một số n có phải là số nguyên tố hay không trong thời gian O(sqrt(n)).",
      tags: ["Toán học", "Cơ bản"],
      successRate: "94%",
      passRateNum: 94,
      submissionsCount: 4800,
      createdAt: "2026-01-05",
      iconName: "Terminal",
    },
  ],

  guides: [
    {
      id: "guide-1",
      title: "Bắt đầu từ bài dễ",
      description:
        "Xây dựng sự tự tin từ những bài tập cơ bản trước khi chinh phục thử thách khó.",
      iconName: "Star",
    },
    {
      id: "guide-2",
      title: "Kết hợp lý thuyết",
      description:
        "Đừng chỉ code, hãy hiểu rõ nguyên lý đứng sau mỗi thuật toán bạn sử dụng.",
      iconName: "Book",
    },
    {
      id: "guide-3",
      title: "Luyện theo chủ đề",
      description:
        "Tập trung vào một dạng bài để thành thục kỹ năng tư duy cho chủ đề đó.",
      iconName: "Grid",
    },
    {
      id: "guide-4",
      title: "Theo dõi tiến độ",
      description:
        "Ghi nhận từng thành tựu nhỏ để duy trì động lực học tập mỗi ngày.",
      iconName: "Zap",
    },
  ],
};
