export const MOCK_CHAPTERS = [
  {
    id: "chap-1",
    title: "Chapter 1: Giới thiệu & Cấu trúc dự án",
    lessons: [
      { id: "les-1", title: "Lesson 1: Tổng quan về ReactJS và DOM ảo", duration: "12 mins" },
      { id: "les-2", title: "Lesson 2: Cài đặt Node.js và Vite", duration: "18 mins" },
      { id: "les-3", title: "Lesson 3: Viết Component đầu tiên với JSX", duration: "24 mins" },
    ],
  },
  {
    id: "chap-2",
    title: "Chapter 2: State, Props & Lifecycle",
    lessons: [
      { id: "les-4", title: "Lesson 4: Sử dụng useState Hook hiệu quả", duration: "20 mins" },
      { id: "les-5", title: "Lesson 5: Quản lý tác vụ với useEffect", duration: "25 mins" },
      { id: "les-6", title: "Lesson 6: Truyền dữ liệu qua Props & PropTypes", duration: "15 mins" },
    ],
  },
];

export const MOCK_STUDENTS = [
  { id: "std-1", name: "Nguyen Van A", email: "nguyenvana@gmail.com", progress: 85, joinedDate: "12/08/2026" },
  { id: "std-2", name: "Tran Thi B", email: "tranthib@gmail.com", progress: 60, joinedDate: "14/08/2026" },
  { id: "std-3", name: "Le Van C", email: "levanc@gmail.com", progress: 100, joinedDate: "01/08/2026" },
  { id: "std-4", name: "Pham Hoang D", email: "hoangd@gmail.com", progress: 30, joinedDate: "19/08/2026" },
];
