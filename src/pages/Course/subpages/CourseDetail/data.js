export const mockCourseDetailData = {
  id: "course-1",
  title: "Advanced React Patterns",
  subtitle: "Mastering Component Composition & Design Systems",
  progressPercent: 45,
  completedLessons: 12,
  totalLessons: 28,
  currentChapterTitle: "Chapter 3: Composition",

  chapters: [
    {
      id: "ch-1",
      title: "Chapter 1: Introduction",
      lessonCount: 4,
      totalDuration: "35 phút",
      defaultOpen: false,
      lessons: [
        { id: "les-1-1", title: "1.1 Giới thiệu về khóa học Advanced React", duration: "8:15", status: "completed" },
        { id: "les-1-2", title: "1.2 Cấu trúc dự án và môi trường phát triển", duration: "10:30", status: "completed" },
        { id: "les-1-3", title: "1.3 Tư duy xây dựng Reusable Components", duration: "9:45", status: "completed" },
        { id: "les-1-4", title: "1.4 Tổng quan về các Design Patterns nâng cao", duration: "6:30", status: "completed" },
      ],
    },
    {
      id: "ch-2",
      title: "Chapter 2: Core Concepts",
      lessonCount: 6,
      totalDuration: "55 phút",
      defaultOpen: false,
      lessons: [
        { id: "les-2-1", title: "2.1 Re-render Optimization & React.memo", duration: "11:20", status: "completed" },
        { id: "les-2-2", title: "2.2 Deep Dive useCallback & useMemo", duration: "14:15", status: "completed" },
        { id: "les-2-3", title: "2.3 Custom Hooks Architecture", duration: "12:50", status: "completed" },
        { id: "les-2-4", title: "2.4 Controlled vs Uncontrolled Components", duration: "9:10", status: "completed" },
        { id: "les-2-5", title: "2.5 Refs & DOM Manipulation with useImperativeHandle", duration: "7:25", status: "completed" },
      ],
    },
    {
      id: "ch-3",
      title: "Chapter 3: Composition",
      lessonCount: 8,
      totalDuration: "1h 20m",
      defaultOpen: true,
      lessons: [
        {
          id: "les-3-1",
          title: "3.1 Giới thiệu về Composition",
          duration: "8:45",
          status: "completed",
        },
        {
          id: "les-3-2",
          title: "3.2 Containment (The 'children' prop)",
          duration: "12:30",
          status: "completed",
        },
        {
          id: "les-3-3",
          title: "3.3 Specialization & Multiple 'Holes'",
          duration: "28:50",
          status: "active",
        },
        {
          id: "les-3-4",
          title: "3.4 Tránh Prop Drilling với Composition",
          duration: "15:20",
          status: "locked",
        },
        {
          id: "les-3-5",
          title: "3.5 Compound Components Pattern",
          duration: "18:40",
          status: "locked",
        },
        {
          id: "les-3-6",
          title: "3.6 Render Props Pattern trong Thực tế",
          duration: "14:10",
          status: "locked",
        },
      ],
    },
  ],

  lessonDetails: {
    "les-3-3": {
      id: "les-3-3",
      chapterTitle: "Chapter 3: Composition",
      lessonTitle: "3.3 Specialization & Multiple 'Holes'",
      videoDuration: "28:50",
      currentTime: "12:34",
      playbackSpeed: "1.25x",
      videoPosterUrl: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=1200&auto=format&fit=crop&q=80",
      description:
        "Trong bài học này, chúng ta sẽ đi sâu vào Component Composition trong React. Đây là một trong những pattern mạnh mẽ nhất giúp tái sử dụng logic, giảm thiểu 'prop drilling' và xây dựng các giao diện linh hoạt.",
      objectivesTitle: "Mục tiêu bài học",
      objectives: [
        "Hiểu rõ sự khác biệt giữa Containment và Specialization.",
        "Áp dụng 'children' prop để xây dựng Layout components linh hoạt.",
        "Khắc phục tình trạng Prop Drilling thông qua Composition thay vì Context API trong các trường hợp đơn giản.",
        "Thiết kế các API Component dễ bảo trì và mở rộng.",
      ],
      notes: [
        { timestamp: "04:12", text: "Specialization cho phép bạn định nghĩa các phiên bản cụ thể từ một component tổng quát." },
        { timestamp: "12:34", text: "Multiple Holes pattern: Truyền các JSX element qua props như leftIcon, rightAction." },
      ],
      resources: [
        { name: "Composition_Patterns_Cheatsheet.pdf", size: "2.4 MB", type: "pdf" },
        { name: "React_Composition_Demo_Code.zip", size: "5.1 MB", type: "zip" },
      ],
      discussions: [
        {
          author: "AlexCoder99",
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=AlexCoder99",
          time: "2 giờ trước",
          comment: "Pattern này thật sự giải quyết triệt để vấn đề lặp code khi thiết kế Dialog & Modal components!",
          likes: 14,
        },
        {
          author: "DevQueen",
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=DevQueen",
          time: "5 giờ trước",
          comment: "Thầy giải thích phần Multiple Holes rất trực quan. Cảm ơn FySet!",
          likes: 8,
        },
      ],
    },
  },
};
