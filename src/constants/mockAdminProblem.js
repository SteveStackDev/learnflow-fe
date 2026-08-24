export const DIFFICULTY_OPTIONS = [
  { value: "all", label: "Difficulty: Tất cả" },
  { value: "Easy", label: "Easy (Dễ)" },
  { value: "Medium", label: "Medium (Trung bình)" },
  { value: "Hard", label: "Hard (Khó)" },
];

export const FORM_DIFFICULTY_OPTIONS = [
  { value: "Easy", label: "Easy (Dễ)" },
  { value: "Medium", label: "Medium (Trung bình)" },
  { value: "Hard", label: "Hard (Khó)" },
];

export const TOPIC_OPTIONS = [
  { value: "all", label: "Topic: Tất cả" },
  { value: "Array & Hashing", label: "Array & Hashing" },
  { value: "String", label: "String" },
  { value: "Tree & Binary Search", label: "Tree & Binary Search" },
  { value: "Dynamic Programming", label: "Dynamic Programming" },
  { value: "Graph & BFS/DFS", label: "Graph & BFS/DFS" },
];

export const FORM_TOPIC_OPTIONS = [
  { value: "Array & Hashing", label: "Array & Hashing" },
  { value: "String", label: "String" },
  { value: "Tree & Binary Search", label: "Tree & Binary Search" },
  { value: "Dynamic Programming", label: "Dynamic Programming" },
  { value: "Graph & BFS/DFS", label: "Graph & BFS/DFS" },
];

export const LANGUAGE_OPTIONS = [
  { value: "all", label: "Language: Tất cả" },
  { value: "C++", label: "C++ (GCC 11)" },
  { value: "Java", label: "Java 17" },
  { value: "Python", label: "Python 3.10" },
  { value: "JavaScript", label: "JavaScript (Node 18)" },
];

export const STATUS_OPTIONS = [
  { value: "all", label: "Status: Tất cả" },
  { value: "Active", label: "Active (Đã xuất bản)" },
  { value: "Draft", label: "Draft (Bản nháp)" },
  { value: "Archived", label: "Archived (Lưu trữ)" },
];

export const FORM_STATUS_OPTIONS = [
  { value: "Active", label: "Active (Đã xuất bản)" },
  { value: "Draft", label: "Draft (Bản nháp)" },
  { value: "Archived", label: "Archived (Lưu trữ)" },
];

export const ALL_LANGUAGES = [
  { id: "cpp", name: "C++ (GCC 11)" },
  { id: "java", name: "Java 17" },
  { id: "python", name: "Python 3.10" },
  { id: "javascript", name: "JavaScript (Node 18)" },
];

export const DEFAULT_PROBLEM_TEMPLATE = {
  points: 500,
  description:
    "Một đội công nhân gồm N người đang chuẩn bị xây dựng một tòa nhà cao tầng để phục vụ cho một sự kiện hợp tác quan trọng giữa hai công ty. Mỗi công nhân thứ i có mức tiền công là a[i] đồng cho mỗi tháng làm việc. Chủ đầu tư có ngân sách tối đa T đồng để thuê công nhân trong tháng này. Chủ đầu tư muốn thuê được nhiều công nhân nhất có thể và yêu cầu tổng tiền công của tất cả công nhân được thuê không vượt quá T. Hãy giúp chủ đầu tư xác định số lượng công nhân lớn nhất có thể thuê.",
  inputFormat:
    "- Dòng đầu tiên gồm hai số nguyên dương N và T, tương ứng với số lượng công nhân và tổng số tiền mà chủ đầu tư hiện có.\n- Dòng thứ hai gồm N số công nhân, mỗi công nhân thứ i nhận được số tiền công a[i] đồng.",
  outputFormat:
    "- In ra một số nguyên duy nhất là số lượng công nhân lớn nhất mà chủ đầu tư có thể thuê sao cho tổng tiền công không vượt quá T.",
  constraints:
    "- 1 <= N <= 10^6\n- 1 <= T <= 10^12\n- 1 <= a[i] <= 10^9\n- Công nhân thứ i có thể được thuê hoặc không được thuê.",
  hints: "Sử dụng giải thuật Tham ăn (Greedy) bằng cách sắp xếp mảng tiền công tăng dần.",
  examples: [
    {
      id: "ex-1",
      input: "5 10\n2 3 1 5 4",
      output: "3",
      explanation: "Thuê các công nhân có mức công 1, 2, 3 (tổng = 6 <= 10). Số công nhân lớn nhất là 3.",
    },
  ],
  testCases: [
    { id: "tc-1", input: "5 10\n2 3 1 5 4", expected: "3", isHidden: false, points: 200 },
    { id: "tc-2", input: "3 5\n6 7 8", expected: "0", isHidden: false, points: 150 },
    { id: "tc-3", input: "1 10\n5", expected: "1", isHidden: true, points: 150 },
  ],
  supportedLanguages: ["C++", "Java", "Python", "JavaScript"],
};

export const INITIAL_PROBLEMS = [
  {
    id: "prob-01",
    code: "01",
    title: "Công trình xây dựng",
    slug: "cong-trinh-xay-dung",
    difficulty: "Easy",
    topic: "Array & Hashing",
    points: 500,
    solved: 12400,
    acceptanceRate: 68,
    status: "Active",
    supportedLanguages: ["C++", "Java", "Python", "JavaScript"],
    description:
      "Một đội công nhân gồm N người đang chuẩn bị xây dựng một tòa nhà cao tầng để phục vụ cho một sự kiện hợp tác quan trọng giữa hai công ty. Mỗi công nhân thứ i có mức tiền công là a[i] đồng cho mỗi tháng làm việc. Chủ đầu tư có ngân sách tối đa T đồng để thuê công nhân trong tháng này. Chủ đầu tư muốn thuê được nhiều công nhân nhất có thể và yêu cầu tổng tiền công của tất cả công nhân được thuê không vượt quá T. Hãy giúp chủ đầu tư xác định số lượng công nhân lớn nhất có thể thuê.",
    inputFormat:
      "- Dòng đầu tiên gồm hai số nguyên dương N và T, tương ứng với số lượng công nhân và tổng số tiền mà chủ đầu tư hiện có.\n- Dòng thứ hai gồm N số công nhân, mỗi công nhân thứ i nhận được số tiền công a[i] đồng.",
    outputFormat:
      "- In ra một số nguyên duy nhất là số lượng công nhân lớn nhất mà chủ đầu tư có thể thuê sao cho tổng tiền công không vượt quá T.",
    constraints: "- 1 <= N <= 10^6\n- 1 <= T <= 10^12\n- 1 <= a[i] <= 10^9\n- Công nhân thứ i có thể được thuê hoặc không được thuê.",
    hints: "Sử dụng giải thuật Tham ăn (Greedy) bằng cách sắp xếp mảng tiền công tăng dần.",
    examples: [
      {
        id: "ex-1",
        input: "5 10\n2 3 1 5 4",
        output: "3",
        explanation: "Thuê các công nhân có mức công 1, 2, 3 (tổng = 6 <= 10). Số công nhân lớn nhất là 3.",
      },
    ],
    testCases: [
      { id: "tc-1", input: "5 10\n2 3 1 5 4", expected: "3", isHidden: false, points: 200 },
      { id: "tc-2", input: "3 5\n6 7 8", expected: "0", isHidden: false, points: 150 },
      { id: "tc-3", input: "1 10\n5", expected: "1", isHidden: true, points: 150 },
    ],
  },
  {
    id: "prob-02",
    code: "02",
    title: "Binary Tree Level Order Traversal",
    slug: "binary-tree-level-order",
    difficulty: "Medium",
    topic: "Tree & Binary Search",
    points: 1000,
    solved: 8420,
    acceptanceRate: 54,
    status: "Active",
    supportedLanguages: ["C++", "Java", "Python"],
    description:
      "Cho một cây nhị phân, hãy duyệt các nút theo thứ tự từng tầng từ trên xuống dưới, từ trái sang phải.",
    inputFormat: "- Dòng duy nhất chứa cây nhị phân dạng mảng level-order.",
    outputFormat: "- Mảng 2 chiều đại diện cho giá trị các nút theo từng tầng.",
    constraints: "- Số lượng nút trong cây nằm trong khoảng [0, 2000].\n- -1000 <= Node.val <= 1000",
    hints: "Sử dụng giải thuật duyệt theo chiều rộng BFS với hàng đợi Queue.",
    examples: [
      {
        id: "ex-1",
        input: "root = [3,9,20,null,null,15,7]",
        output: "[[3],[9,20],[15,7]]",
        explanation: "Các tầng lần lượt là [3], [9,20], [15,7].",
      },
    ],
    testCases: [
      { id: "tc-1", input: "root = [3,9,20,null,null,15,7]", expected: "[[3],[9,20],[15,7]]", isHidden: false, points: 1000 },
    ],
  },
];
