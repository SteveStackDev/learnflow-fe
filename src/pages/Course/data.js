import heroUrl from "~/assets/images/Home/hero.webp";

export const courseData = {
  categories: ["Tất cả", "Frontend", "Backend", "Data Science"],

  items: [
    {
      id: "course-1",
      category: "Frontend",
      level: "Cơ bản",
      title: "JavaScript nền tảng cho người mới",
      description: "Làm quen với ngôn ngữ lập trình phổ biến nhất thế giới và xây dựng dự án đầu tay.",
      lessonsCount: "12 bài",
      studentsCount: "2.5k",
      imageUrl: heroUrl,
    },
    {
      id: "course-2",
      category: "Frontend",
      level: "Trung cấp",
      title: "ReactJS thực chiến ứng dụng",
      description: "Xây dựng các ứng dụng web hiện đại với ReactJS, Hooks và Redux Toolkit.",
      lessonsCount: "24 bài",
      studentsCount: "1.8k",
      imageUrl: heroUrl,
    },
    {
      id: "course-3",
      category: "Backend",
      level: "Nâng cao",
      title: "Cấu trúc dữ liệu và giải thuật",
      description: "Nâng tầm tư duy lập trình và chinh phục các bài toán thuật toán nâng cao.",
      lessonsCount: "30 bài",
      studentsCount: "1.2k",
      imageUrl: heroUrl,
    },
    {
      id: "course-4",
      category: "Backend",
      level: "Trung cấp",
      title: "Node.js Backend nền tảng",
      description: "Làm chủ JavaScript ở phía Server và xây dựng RESTful APIs chuyên nghiệp.",
      lessonsCount: "18 bài",
      studentsCount: "900",
      imageUrl: heroUrl,
    },
    {
      id: "course-5",
      category: "Data Science",
      level: "Cơ bản",
      title: "Python cho Data Science & AI",
      description: "Học Python từ con số 0, khai phá dữ liệu với Pandas, NumPy và Matplotlib.",
      lessonsCount: "20 bài",
      studentsCount: "1.5k",
      imageUrl: heroUrl,
    },
    {
      id: "course-6",
      category: "Data Science",
      level: "Trung cấp",
      title: "Phân tích dữ liệu & Machine Learning",
      description: "Ứng dụng các thuật toán Học máy phổ biến để dự đoán và phân tích dữ liệu.",
      lessonsCount: "25 bài",
      studentsCount: "1.1k",
      imageUrl: heroUrl,
    },
  ],

  benefits: [
    {
      id: "benefit-1",
      title: "Học từ nền tảng",
      description:
        "Kiến thức được hệ thống bài bản, giúp bạn hiểu rõ bản chất cốt lõi thay vì chỉ học vẹt code.",
      iconName: "Award",
    },
    {
      id: "benefit-2",
      title: "Kết hợp Roadmap",
      description:
        "Mọi khóa học đều nằm trong lộ trình nghề nghiệp rõ ràng, định hướng tương lai cho bạn.",
      iconName: "Compass",
    },
    {
      id: "benefit-3",
      title: "Luyện tập Challenge",
      description:
        "Hệ thống bài tập thực hành và thử thách ngay trong trình duyệt giúp bạn nhớ lâu hơn.",
      iconName: "Cpu",
    },
  ],

  faqs: [
    {
      id: "faq-1",
      question: "Khóa học có dành cho người chưa biết gì về code không?",
      answer:
        "Có, các khóa học gắn tag 'Cơ bản' được thiết kế chi tiết dành riêng cho người mới bắt đầu từ con số 0.",
    },
    {
      id: "faq-2",
      question: "Tôi có được nhận chứng chỉ sau khi hoàn thành khóa học không?",
      answer:
        "Có, sau khi hoàn thành 100% bài học và vượt qua bài test cuối khóa, bạn sẽ nhận được chứng chỉ kỹ thuật số.",
    },
    {
      id: "faq-3",
      question: "Tôi có thể xem lại bài học khi đã kết thúc khóa học không?",
      answer:
        "Tài khoản của bạn được cấp quyền truy cập trọn đời, bạn có thể xem lại video và tài liệu bất cứ lúc nào.",
    },
  ],
};
