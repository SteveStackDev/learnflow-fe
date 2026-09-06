// ==========================================================================
// Mock data for the "AI Learning" feature (WA Analysis / personalized learning loop).
// In production, this should be replaced by real submission history + an LLM-backed
// diagnosis endpoint. Shape is kept close to the eventual API response so swapping
// in real data later only touches this file and the service layer, not the UI.
// ==========================================================================

// ---- Page 1: AI Learning Dashboard ---------------------------------------

// ---- Page 1: AI Learning Dashboard ---------------------------------------

export const aiLearningSummary = {
  problemsSolved: 42,
  solvedTrend: "↑ 14% tuần này",
  wrongAnswers: 18,
  waTag: "WA / TLE",
  algorithmsToReview: 2,
  priorityTag: "Ưu tiên cao",
  confidenceIndex: "87.5%",
  scanTag: "Deep Scan",
};

export const mentorInsight = {
  date: "Hôm nay",
  badge: "Thời gian thực",
  quote:
    "Bạn nắm vững công thức biến đổi trạng thái trong Dynamic Programming, tuy nhiên 68% số lần sai ở Binary Search xuất phát từ việc dùng nhầm l < r thay vì l <= r và quên xử lý khi mảng xoay có phần tử trùng lặp.",
  highlightKeywords: ["Dynamic Programming", "Binary Search", "l < r", "l <= r"],
};

// status: "good" | "review" | "weak"
export const algorithms = [
  {
    slug: "binary-search",
    name: "Binary Search",
    solvedCount: 8,
    waCount: 3,
    problemsCount: 3,
    waTotalCount: 11,
    mainWeakness: "Boundary & Off-by-one",
    guideRecommendation: "Đọc Mini-Guide bên dưới",
    status: "review",
    statusLabel: "Cần củng cố",
    possibleWeakness: "Boundary Conditions",
    aiAnalysisUpdated: "12 phút trước",
    subtitle: "Problems where you received Wrong Answer",
    aiPatternDiagnosis: {
      tag: "AI PATTERN DIAGNOSIS",
      question: "Tại sao bạn thường gặp WA ở Binary Search?",
      narrative:
        "AI đã duyệt qua 11 lần nộp bài của bạn và phát hiện 82% lỗi xuất phát từ việc tính toán cận giữa hoặc gán lại biến mid gây lặp vô tận / bỏ sót phần tử cận biên.",
      highlightPercent: "82%",
      keyTakeaways: [
        {
          id: 1,
          textBefore: "Tránh ",
          code1: "(l + r) / 2",
          textMiddle: " để ngừa tràn số nguyên (Integer Overflow). Dùng ",
          code2: "l + (r - l) / 2",
          textAfter: ".",
        },
        {
          id: 2,
          textBefore: "Khi dùng ",
          code1: "while (l <= r)",
          textMiddle: ": luôn cập nhật ",
          code2: "l = mid + 1",
          textAfter: " hoặc r = mid - 1.",
        },
        {
          id: 3,
          textBefore: "Với ",
          code1: "Binary Search on Answer",
          textMiddle: ": Luôn bảo toàn tính đơn điệu (Monotonicity) của hàm điều kiện ",
          code2: "check(mid)",
          textAfter: ".",
        },
      ],
      ctaButtonLabel: "Mở bài giảng chuyên sâu: Xóa bỏ bẫy biên",
    },
    quickPractice: {
      title: "Thực hành giải quyết lỗi ngay",
      description: "Làm lại bài Lower Bound ngay bây giờ với gợi ý từng bước từ trợ lý AI.",
      problemId: "lower-bound",
      rewardBadge: "+35 Điểm năng lực",
      actionLabel: "Bắt đầu fix",
    },
  },
  {
    slug: "dynamic-programming",
    name: "Dynamic Programming",
    solvedCount: 12,
    waCount: 1,
    problemsCount: 1,
    waTotalCount: 1,
    mainWeakness: "Base Cases",
    guideRecommendation: "Đọc Mini-Guide bên dưới",
    status: "good",
    statusLabel: "Đạt chuẩn",
    strengthHighlight: "Mastered: 1D DP & Memoization, ready for 2D Grid.",
    possibleWeakness: null,
    aiAnalysisUpdated: "1 giờ trước",
    subtitle: "Problems where you received Wrong Answer",
    aiPatternDiagnosis: {
      tag: "AI PATTERN DIAGNOSIS",
      question: "Tối ưu hóa bảng phương trình trạng thái DP",
      narrative:
        "Bạn nắm vững công thức biến đổi trạng thái trong Dynamic Programming, chỉ cần lưu ý điều kiện khởi tạo biên f[0] và tràn bộ nhớ mảng phụ.",
      keyTakeaways: [
        {
          id: 1,
          textBefore: "Luôn khởi tạo mảng với giá trị vô cùng ",
          code1: "INF",
          textMiddle: " hoặc ",
          code2: "-1",
          textAfter: " trước khi duyệt.",
        },
      ],
      ctaButtonLabel: "Xem chuyên đề Quy hoạch động",
    },
    quickPractice: {
      title: "Thực hành giải quyết lỗi ngay",
      description: "Làm lại bài Coin Change để hoàn thiện kỹ năng nén trạng thái.",
      problemId: "coin-change",
      rewardBadge: "+25 Điểm năng lực",
      actionLabel: "Bắt đầu fix",
    },
  },
  {
    slug: "graph",
    name: "Graph",
    solvedCount: 15,
    waCount: 6,
    problemsCount: 2,
    waTotalCount: 6,
    mainWeakness: "Cycle Detection & Visited Array",
    guideRecommendation: "Đọc Mini-Guide bên dưới",
    status: "review",
    statusLabel: "Cần củng cố",
    possibleWeakness: "Graph Traversal",
    aiAnalysisUpdated: "25 phút trước",
    subtitle: "Problems where you received Wrong Answer",
    aiPatternDiagnosis: {
      tag: "AI PATTERN DIAGNOSIS",
      question: "Lỗi lặp vô hạn và không đánh dấu Visited trong BFS/DFS",
      narrative:
        "75% lỗi WA/TLE trong đồ thị đến từ việc push node vào queue nhiều lần mà không đánh dấu visited[u] = true ngay lúc push.",
      keyTakeaways: [
        {
          id: 1,
          textBefore: "Trong BFS, luôn gán ",
          code1: "visited[v] = true",
          textMiddle: " ngay khi ",
          code2: "q.push(v)",
          textAfter: ".",
        },
      ],
      ctaButtonLabel: "Xem bài giảng: Tránh lặp trong Duyệt đồ thị",
    },
    quickPractice: {
      title: "Thực hành giải quyết lỗi ngay",
      description: "Khắc phục lỗi TLE trong bài Shortest Path in Grid với gợi ý từ AI.",
      problemId: "shortest-path-grid",
      rewardBadge: "+40 Điểm năng lực",
      actionLabel: "Bắt đầu fix",
    },
  },
];

export const codeSpotlightData = {
  title: "Search in Rotated Sorted Array",
  subtitle: "Ví dụ sai sót phổ biến gần nhất được AI giải mã từ bài nộp:",
  submissionId: "8491024",
  language: "Python 3",
  bugSection: {
    title: "Đoạn code phát hiện lỗi (Boundary Bug)",
    tag: "Gây TLE / WA",
    explanation: "# Điều kiện vòng lặp thiếu dấu bằng khi l == r",
    codeLines: [
      { text: "# Điều kiện vòng lặp thiếu dấu bằng khi l == r", type: "comment" },
      { text: "while left < right:", type: "normal" },
      { text: "    mid = (left + right) // 2", type: "normal" },
      { text: "    if nums[mid] == target: return mid", type: "normal" },
      { text: "# Sai: Bỏ sót trường hợp mảng chỉ có 1 phần tử hoặc l == r", type: "error-comment" },
      { text: "if nums[left] < nums[mid]:", type: "error" },
      { text: "    left = mid # Gây Infinite Loop khi left == mid", type: "error" },
    ],
  },
  fixSection: {
    title: "Gợi ý sửa tối ưu từ AI (Optimal Fix)",
    tag: "O(log N) Time • O(1) Space",
    explanation: "# Luôn sử dụng left <= right và mid +/- 1",
    codeLines: [
      { text: "# Luôn sử dụng left <= right và mid +/- 1", type: "comment" },
      { text: "while left <= right:", type: "normal" },
      { text: "    mid = (left + right) // 2", type: "normal" },
      { text: "    if nums[mid] == target: return mid", type: "normal" },
      { text: "if nums[left] <= nums[mid]:", type: "success" },
      { text: "    if nums[left] <= target < nums[mid]: right = mid - 1", type: "success" },
      { text: "    else: left = mid + 1 # Tiến tới biên an toàn", type: "success" },
    ],
  },
};

export const practiceQueueData = [
  {
    id: 33,
    title: "33. Search in Rotated Sorted Array",
    subtext: "LeetCode #33 • Classic",
    algorithm: "Binary Search",
    difficulty: "Medium",
    aiObjective: "Xử lý điều kiện biên left <= right",
    successRate: 92,
    tag: "boundary",
    isPriority: true,
  },
  {
    id: 207,
    title: "207. Course Schedule (Cycle Detection)",
    subtext: "LeetCode #207 • Directed Graph",
    algorithm: "Graph Traversal",
    difficulty: "Medium",
    aiObjective: "Khử lặp visited array & Topological Sort",
    successRate: 60,
    tag: "graph",
    isPriority: false,
  },
  {
    id: 278,
    title: "278. First Bad Version",
    subtext: "LeetCode #278 • Binary Search",
    algorithm: "Binary Search",
    difficulty: "Easy",
    aiObjective: "Tránh Integer Overflow khi tính mid",
    successRate: 96,
    tag: "boundary",
    isPriority: false,
  },
  {
    id: 153,
    title: "153. Find Minimum in Rotated Sorted Array",
    subtext: "LeetCode #153 • Binary Search",
    algorithm: "Binary Search",
    difficulty: "Medium",
    aiObjective: "Hội tụ điều kiện biên mảng không đối xứng",
    successRate: 88,
    tag: "boundary",
    isPriority: true,
  },
  {
    id: 300,
    title: "300. Longest Increasing Subsequence",
    subtext: "LeetCode #300 • Dynamic Programming",
    algorithm: "Dynamic Programming",
    difficulty: "Medium",
    aiObjective: "Tối ưu từ O(N^2) sang O(N log N) kết hợp Binary Search",
    successRate: 75,
    tag: "dp",
    isPriority: false,
  },
];

export const algorithmBySlug = Object.fromEntries(algorithms.map((a) => [a.slug, a]));

// ---- Page 2: Problems with WA, grouped by algorithm -----------------------

export const problemsByAlgorithm = {
  "binary-search": [
    {
      id: "binary-search-on-answer",
      title: "Binary Search on Answer",
      difficulty: "Medium",
      tags: ["Binary Search", "Search Space", "Monotonic Predicate"],
      waCount: 4,
      solvedCount: 1,
      eventuallySolved: true,
      lastStatus: "AC",
      possibleWeakness: "Boundary Conditions",
    },
    {
      id: "lower-bound",
      title: "Lower Bound",
      difficulty: "Easy",
      tags: ["Binary Search", "Array Indexing"],
      waCount: 2,
      solvedCount: 1,
      eventuallySolved: true,
      lastStatus: "AC",
      possibleWeakness: "Off-by-one",
    },
    {
      id: "aggressive-cows",
      title: "Aggressive Cows (Khoảng cách cực đại)",
      difficulty: "Medium",
      tags: ["Binary Search", "Greedy Check"],
      waCount: 5,
      solvedCount: 0,
      eventuallySolved: false,
      lastStatus: "WA",
      possibleWeakness: "Invariant check (l < r vs l <= r)",
    },
  ],
  "dynamic-programming": [
    {
      id: "coin-change",
      title: "Coin Change",
      difficulty: "Medium",
      tags: ["Dynamic Programming"],
      waCount: 1,
      solvedCount: 1,
      eventuallySolved: true,
      lastStatus: "AC",
      possibleWeakness: null,
    },
  ],
  graph: [
    {
      id: "shortest-path-grid",
      title: "Shortest Path in Grid",
      difficulty: "Medium",
      tags: ["Graph", "BFS"],
      waCount: 3,
      solvedCount: 0,
      eventuallySolved: false,
      lastStatus: "WA",
      possibleWeakness: "Graph Traversal",
    },
    {
      id: "course-schedule",
      title: "Course Schedule",
      difficulty: "Hard",
      tags: ["Graph", "Topological Sort"],
      waCount: 3,
      solvedCount: 1,
      eventuallySolved: true,
      lastStatus: "AC",
      possibleWeakness: "Cycle Detection",
    },
  ],
};

// ---- Page 3: Submission history, grouped by problem ------------------------
// status: "AC" | "WA" | "TLE" | "MLE" | "CE"

export const problemSubmissionMeta = {
  "binary-search-on-answer": {
    problemId: "binary-search-on-answer",
    title: "Binary Search On Answer",
    code: "#BS-102",
    difficulty: "Medium",
    difficultyLabel: "Trung bình (Medium)",
    algorithmName: "Binary Search",
    algorithmSlug: "binary-search",
    subtitle: "Lịch sử các lần nộp bài (Your Submission History) & phân tích thông minh từ AI Mentor",
    stats: {
      totalAttempts: "4 lần thử",
      totalAttemptsCount: 4,
      totalAttemptsBadge: "#4",
      latestResult: "AC - Đã chấp nhận",
      latestStatusCode: "AC",
      commonError: "3x WA (Sai biên tìm kiếm)",
      commonErrorCode: "WA",
    },
    aiMentorDiagnosis: {
      title: "Chẩn đoán tiến trình từ AI Mentor",
      tag: "Tự động tóm tắt",
      updatedAt: "Cập nhật 5 phút trước",
      textBefore1: "AI đã phát hiện bạn gặp lỗi lặp vô hạn ở 3 lần nộp trước vì tính toán ",
      codeChip1: "mid = (l + r) / 2",
      textBefore2: " khi điều kiện thu hẹp cận dưới ",
      codeChip2: "l = mid",
      textBefore3: ". Ở lần nộp thứ 4 (AC), bạn đã chuẩn hóa thành công công thức làm tròn lên ",
      codeChip3: "mid = l + (r - l + 1) / 2",
      textAfter: ".",
      reinforcedKnowledge: "Lựa chọn cận làm tròn trong Tìm kiếm nhị phân",
      deepDiagnosticSubmissionId: "12345",
    },
  },
};

export const submissionsByProblem = {
  "binary-search-on-answer": [
    {
      id: "12346",
      status: "AC",
      statusLabel: "AC - Accepted",
      tag: "Lần nộp mới nhất",
      tagType: "latest",
      submittedAt: "3 Th9, 19:03",
      language: "C++ 17",
      runtime: "39ms",
      memory: "8.3 MB",
      canViewCode: true,
      code: `#include <bits/stdc++.h>
using namespace std;

// Chuẩn hóa công thức làm tròn lên: mid = l + (r - l + 1) / 2
bool check(vector<int> &a, int mid, int x) {
    return a[mid] <= x;
}

int solve(vector<int> &a, int n, int x) {
    int l = 0;
    int r = n - 1;

    while (l < r) {
        int mid = l + (r - l + 1) / 2;

        if (check(a, mid, x))
            l = mid;
        else
            r = mid - 1;
    }

    return a[l] == x ? l : -1;
}`,
    },
    {
      id: "12345",
      status: "WA",
      statusLabel: "WA - Wrong Answer",
      tag: "Lỗi Test case 3/20",
      tagType: "test-error",
      submittedAt: "3 Th9, 18:47",
      language: "C++",
      runtime: "42ms",
      memory: "8.4 MB",
      errorNote: "Lỗi tràn số hoặc lặp vô hạn",
      canAnalyze: true,
    },
    {
      id: "12344",
      status: "WA",
      statusLabel: "WA - Wrong Answer",
      submittedAt: "3 Th9, 18:40",
      language: "C++",
      runtime: "39ms",
      memory: "8.3 MB",
      canAnalyze: true,
    },
    {
      id: "12343",
      status: "WA",
      statusLabel: "WA - Wrong Answer",
      tag: "Lần nộp đầu tiên",
      tagType: "first",
      submittedAt: "3 Th9, 18:32",
      language: "C++",
      runtime: "36ms",
      memory: "8.1 MB",
      canViewDetails: true,
      code: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    int n, x;
    if (!(cin >> n >> x)) return 0;
    vector<int> a(n);
    for (int i = 0; i < n; i++) cin >> a[i];

    int l = 0, r = n - 1;
    while (l < r) {
        int mid = (l + r) / 2;
        if (a[mid] < x) l = mid;
        else r = mid - 1;
    }
    cout << (a[l] == x ? l : -1) << endl;
    return 0;
}`,
    },
  ],
  "lower-bound": [
    { id: "22102", status: "AC", statusLabel: "AC - Accepted", tag: "Lần nộp mới nhất", tagType: "latest", submittedAt: "1 Th9, 09:20", language: "Python3", runtime: "28ms", memory: "7.9 MB", canViewCode: true },
    { id: "22101", status: "WA", statusLabel: "WA - Wrong Answer", tag: "Lỗi Test case 2/15", tagType: "test-error", submittedAt: "1 Th9, 09:12", language: "Python3", runtime: "88ms", memory: "16.1 MB", canAnalyze: true },
  ],
  "aggressive-cows": [
    { id: "41005", status: "WA", statusLabel: "WA - Wrong Answer", tag: "Lỗi Test case 4/18", tagType: "test-error", submittedAt: "2 Th9, 14:15", language: "C++", runtime: "65ms", memory: "9.1 MB", canAnalyze: true },
    { id: "41004", status: "WA", statusLabel: "WA - Wrong Answer", submittedAt: "2 Th9, 14:02", language: "C++", runtime: "62ms", memory: "9.0 MB", canAnalyze: true },
    { id: "41003", status: "WA", statusLabel: "WA - Wrong Answer", tag: "Lần nộp đầu tiên", tagType: "first", submittedAt: "2 Th9, 13:50", language: "C++", runtime: "58ms", memory: "8.9 MB", canViewDetails: true },
  ],
  "shortest-path-grid": [
    { id: "31007", status: "WA", statusLabel: "WA - Wrong Answer", tag: "Lỗi Test case 8/25", tagType: "test-error", submittedAt: "28 Th8, 21:10", language: "C++", canAnalyze: true },
    { id: "31006", status: "TLE", statusLabel: "TLE - Time Limit Exceeded", submittedAt: "28 Th8, 21:02", language: "C++" },
    { id: "31005", status: "WA", statusLabel: "WA - Wrong Answer", tag: "Lần nộp đầu tiên", tagType: "first", submittedAt: "28 Th8, 20:51", language: "C++", canViewDetails: true },
  ],
};

// ---- Page 4: Full detail for a single submission + AI diagnosis ------------
// Only WA submissions have `aiAnalysis` — matches the product rule that
// MVP diagnosis focuses on WA first.

export const submissionDetails = {
  "12345": {
    problemId: "binary-search-on-answer",
    problemTitle: "Binary Search on Answer",
    difficulty: "Medium",
    tags: ["Binary Search", "Search Space"],
    status: "WA",
    submittedAt: "Sep 3, 18:47",
    language: "C++",
    runtime: "42 ms",
    memory: "8.4 MB",
    problemStatement: `Given a sorted array of n integers and a value X, find the position
of X in the array using binary search.

If X does not exist in the array, output -1.

Constraints:
- 1 <= n <= 10^5
- The array is sorted in non-decreasing order`,
    code: `#include <bits/stdc++.h>
using namespace std;

bool check(vector<int> &a, int mid, int x) {
    return a[mid] >= x;
}

int solve(vector<int> &a, int n, int x) {
    int l = 0;
    int r = n - 1;

    while (l < r) {
        int mid = (l + r) / 2;

        if (check(a, mid, x))
            r = mid - 1;
        else
            l = mid + 1;
    }

    return a[l] == x ? l : -1;
}`,
    failedTestCase: {
      input: "5 10\n2 3 1 5 4",
      expected: "4",
      actual: "5",
    },
    aiAnalysis: {
      diagnosis: "Boundary Condition",
      confidence: "High", // "High" | "Medium" | "Low"
      confidenceScore: 0.91,
      suspectedLines: [15, 16],
      explanation:
        "Your binary search updates the right boundary with `r = mid - 1`. In this search pattern, this can skip the correct answer when `mid` itself may still be a valid candidate.",
      evidence:
        "For this input, the search removes the value at the candidate position from the search space even though it is the correct answer — so the loop converges on the wrong index.",
      concepts: ["Binary Search Invariant", "Boundary Conditions", "Lower Bound / Upper Bound"],
      recommendations: [
        { id: "res-1", title: "Binary Search Invariants", type: "lesson" },
        { id: "res-2", title: "Boundary Conditions", type: "lesson" },
        { id: "res-3", title: "Lower Bound vs Upper Bound", type: "lesson" },
      ],
      quiz: {
        question:
          "Why can using `r = mid - 1` be incorrect in this binary search pattern?",
        options: [
          { id: "a", text: "It makes the algorithm slower" },
          { id: "b", text: "It may remove a valid candidate from the search space" },
          { id: "c", text: "It causes integer overflow" },
          { id: "d", text: "It always causes TLE" },
        ],
        correctOptionId: "b",
        alternateExplanation:
          "Think of it with your own code: when `check(mid)` is true, `mid` could still be the answer, so shrinking to `r = mid - 1` throws that candidate away. The fix is to only exclude positions you have already proven cannot be correct — for this pattern, keep `r = mid` instead so `mid` stays in play.",
      },
      nextProblem: { id: "lower-bound", title: "Lower Bound" },
    },
  },
  "12344": {
    problemId: "binary-search-on-answer",
    problemTitle: "Binary Search on Answer",
    difficulty: "Medium",
    tags: ["Binary Search", "Search Space"],
    status: "WA",
    submittedAt: "Sep 3, 18:40",
    language: "C++",
    runtime: "39 ms",
    memory: "8.3 MB",
    problemStatement: `Given a sorted array of n integers and a value X, find the position
of X in the array using binary search.

If X does not exist in the array, output -1.

Constraints:
- 1 <= n <= 10^5
- The array is sorted in non-decreasing order`,
    code: `#include <bits/stdc++.h>
using namespace std;

int solve(vector<int> &a, int n, int x) {
    int l = 0;
    int r = n - 1;

    while (l < r) {
        int mid = (l + r) / 2;

        if (a[mid] < x)
            l = mid;
        else
            r = mid - 1;
    }

    return a[l] == x ? l : -1;
}`,
    failedTestCase: {
      input: "5 10\n2 3 1 5 4",
      expected: "4",
      actual: "-1",
    },
    aiAnalysis: {
      diagnosis: "Infinite Loop Risk / Boundary Condition",
      confidence: "Medium",
      confidenceScore: 0.68,
      suspectedLines: [8, 9],
      explanation:
        "Setting `l = mid` without adjusting the midpoint calculation can cause `l` to stop making progress when `l` and `r` are adjacent, which can also produce an incorrect final index.",
      evidence:
        "On this input, the search narrows to a range that never converges on the correct index, so the final check returns -1 instead of the expected position.",
      concepts: ["Binary Search Invariant", "Boundary Conditions"],
      recommendations: [
        { id: "res-1", title: "Binary Search Invariants", type: "lesson" },
        { id: "res-2", title: "Boundary Conditions", type: "lesson" },
      ],
      quiz: {
        question: "What is the main risk of writing `l = mid` inside a `while (l < r)` loop?",
        options: [
          { id: "a", text: "It always causes a compile error" },
          { id: "b", text: "The loop may never terminate if `mid` doesn't change `l`" },
          { id: "c", text: "It uses too much memory" },
          { id: "d", text: "It only works for floating point arrays" },
        ],
        correctOptionId: "b",
        alternateExplanation:
          "When `l` and `r` are next to each other, `mid = (l + r) / 2` can equal `l` again, so `l = mid` doesn't move the boundary — the loop can stall. A common fix is to bias the midpoint calculation, e.g. `mid = (l + r + 1) / 2`, whenever you assign to the left boundary.",
      },
      nextProblem: { id: "lower-bound", title: "Lower Bound" },
    },
  },
  "22101": {
    problemId: "lower-bound",
    problemTitle: "Lower Bound",
    difficulty: "Easy",
    tags: ["Binary Search"],
    status: "WA",
    submittedAt: "Sep 1, 09:12",
    language: "Python3",
    runtime: "88 ms",
    memory: "16.1 MB",
    problemStatement: `Given a sorted array and a value X, return the index of the first
element that is greater than or equal to X (the "lower bound").

If no such element exists, return the length of the array.`,
    code: `def lower_bound(a, x):
    l, r = 0, len(a) - 1
    while l < r:
        mid = (l + r) // 2
        if a[mid] < x:
            l = mid + 1
        else:
            r = mid
    return l if a[l] >= x else len(a)`,
    failedTestCase: {
      input: "a = [1, 3, 3, 5, 7]\nx = 8",
      expected: "5",
      actual: "IndexError: list index out of range",
    },
    aiAnalysis: {
      diagnosis: "Missing Upper Bound Check",
      confidence: "High",
      confidenceScore: 0.85,
      suspectedLines: [9],
      explanation:
        "The final check `a[l] >= x` assumes `l` is always a valid index. When every element is smaller than X, `l` converges to the last index, but the correct answer is actually one past the end of the array.",
      evidence:
        "For this input, every element is less than X = 8, so the expected answer is len(a) = 5, but the code tries to read `a[l]` at an index that is still inside the array and never returns the out-of-range case correctly.",
      concepts: ["Binary Search Invariant", "Lower Bound / Upper Bound", "Edge Cases"],
      recommendations: [
        { id: "res-3", title: "Lower Bound vs Upper Bound", type: "lesson" },
        { id: "res-4", title: "Handling Edge Cases in Binary Search", type: "lesson" },
      ],
      quiz: {
        question:
          "What should this function return when every element in the array is smaller than X?",
        options: [
          { id: "a", text: "0" },
          { id: "b", text: "The last valid index" },
          { id: "c", text: "len(a), i.e. one past the last index" },
          { id: "d", text: "None" },
        ],
        correctOptionId: "c",
        alternateExplanation:
          "'Lower bound' means the first position where a value >= X could be inserted. If nothing qualifies, that position is at the very end of the array — index len(a). Check for that case before indexing into `a[l]`.",
      },
      nextProblem: { id: "binary-search-on-answer", title: "Binary Search on Answer" },
    },
  },
};

// Spotlight submission alias
submissionDetails["8491024"] = {
  ...submissionDetails["12345"],
  problemTitle: "Search in Rotated Sorted Array",
  language: "Python 3",
  code: `def search(nums, target):
    left, right = 0, len(nums) - 1
    while left < right:
        mid = (left + right) // 2
        if nums[mid] == target:
            return mid
        if nums[left] < nums[mid]:
            left = mid
    return -1`,
};

