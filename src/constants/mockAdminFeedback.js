export const FEEDBACK_TYPE_OPTIONS = [
  { value: "all", label: "Type: Tất cả" },
  { value: "Bug", label: "Bug (Lỗi hệ thống)" },
  { value: "Idea", label: "Idea (Ý tưởng mới)" },
  { value: "Feature Request", label: "Feature Request (Tính năng)" },
  { value: "General", label: "General (Chung)" },
];

export const FEEDBACK_STATUS_OPTIONS = [
  { value: "all", label: "Status: Tất cả" },
  { value: "New", label: "New (Mới tiếp nhận)" },
  { value: "Reviewing", label: "Reviewing (Đang xem xét)" },
  { value: "Resolved", label: "Resolved (Đã xử lý)" },
  { value: "Rejected", label: "Rejected (Từ chối)" },
];

export const FEEDBACK_PRIORITY_OPTIONS = [
  { value: "all", label: "Priority: Tất cả" },
  { value: "High", label: "High (Cao)" },
  { value: "Medium", label: "Medium (Trung bình)" },
  { value: "Low", label: "Low (Thấp)" },
];

export const FEEDBACK_DATE_OPTIONS = [
  { value: "all", label: "Date: Tất cả" },
  { value: "today", label: "Hôm nay" },
  { value: "this_week", label: "Tuần này" },
  { value: "this_month", label: "Tháng này" },
];

export const INITIAL_FEEDBACKS = [
  {
    id: "fb-501",
    user: {
      id: "usr-101",
      name: "Michael Steve",
      email: "michael.steve@fytech.io",
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80",
    },
    subject: "Lỗi hiển thị Code Editor bị giậtLag khi nộp bài C++",
    type: "Bug",
    priority: "High",
    status: "New",
    date: "22 Aug 2026",
    description: "Khi tôi tiến hành viết code bài Two Sum trên trình duyệt Chrome và bấm nút 'Run Code', khung Editor bị đứng khoảng 3 giây trước khi trả kết quả test cases. Nhờ team hỗ trợ kiểm tra tối ưu lại.",
    attachments: [
      { name: "screenshot_editor_lag.png", url: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&auto=format&fit=crop&q=80" },
    ],
    adminNotes: "Đã chuyển ticket cho team Frontend kỹ thuật xem xét tối ưu Monaco/Monaco-editor component.",
  },
  {
    id: "fb-502",
    user: {
      id: "usr-102",
      name: "Alex Chen",
      email: "alex.chen@gmail.com",
      avatar: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=150&auto=format&fit=crop&q=80",
    },
    subject: "Đề xuất thêm chế độ Dark Mode tự động theo hệ điều hành OS",
    type: "Idea",
    priority: "Medium",
    status: "Reviewing",
    date: "20 Aug 2026",
    description: "Hi team FySet, hiện tại nút đổi theme Dark/Light cần bấm thủ công. Tôi đề xuất thêm lựa chọn 'System Default' để giao diện tự động sync theo Dark Mode của Windows/macOS.",
    attachments: [],
    adminNotes: "Ý tưởng rất tuyệt vời. Đang xem xét đưa vào bản cập nhật v2.6.",
  },
  {
    id: "fb-503",
    user: {
      id: "usr-103",
      name: "Elena Rostova",
      email: "elena.rostova@tech.de",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
    },
    subject: "Yêu cầu tính năng xuất file PDF chứng chỉ sau khi hoàn thành khóa học",
    type: "Feature Request",
    priority: "Medium",
    status: "Resolved",
    date: "15 Aug 2026",
    description: "Học viên sau khi hoàn thành 100% khóa học nên có nút tải về Certificate định dạng PDF có mã QR code xác thực.",
    attachments: [],
    adminNotes: "Đã hoàn thành tích hợp tính năng chứng chỉ khóa học ở bản v2.4.",
  },
];
