import React from "react";
import Icon from "~/components/Icon/Icon";
import { ChatInput, Card } from "~/components/ui";
import { useToast } from "~/context/ToastContext.jsx";
import styles from "./ContestInfoAnnouncements.module.css";

export default function ContestInfoAnnouncements({ announcements = [] }) {
  const { toast } = useToast();

  const defaultAnnouncements = [
    {
      id: "ann-1",
      time: "2026-08-14 18:12:01",
      badge: "Thông báo",
      title: "Bài C. Even If the World Turns",
      content:
        "Ban tổ chức đã điều chỉnh ví dụ giải thích cho test D1/D2. Quý thí sinh vui lòng tải lại trang đề bài để xem nội dung mới nhất.",
    },
    {
      id: "ann-2",
      time: "2026-08-14 17:35:18",
      badge: "Chung",
      title: "Quy định chấm bài & chống gian lận",
      content:
        "Hệ thống tự động chấm sẽ quét bài lặp code giữa các thí sinh. Tất cả các vi phạm sẽ bị loại khỏi bảng xếp hạng chính thức.",
    },
  ];

  const items = announcements.length > 0 ? announcements : defaultAnnouncements;

  const handleSendQuestion = ({ text }) => {
    if (text) {
      toast.success("Đã gửi thắc mắc của bạn tới Ban Tổ Chức!", "Thảo luận");
    }
  };

  return (
    <Card className={styles.container}>
      <div className={styles.header}>
        <Icon name="MessageSquare" size={20} color="#0950c3" />
        <h3 className={styles.header_title}>Thắc mắc & Thông báo về kỳ thi</h3>
      </div>

      <div className={styles.announcements_list}>
        {items.map((item) => (
          <Card key={item.id} className={styles.card}>
            <div className={styles.meta_row}>
              <span className={styles.time_text}>{item.time}</span>
              <span className={styles.badge}>{item.badge}</span>
            </div>
            <h4 className={styles.card_title}>{item.title}</h4>
            <p className={styles.card_content}>{item.content}</p>
          </Card>
        ))}
      </div>

      <div className={styles.chat_wrapper}>
        <ChatInput
          placeholder="Gửi câu hỏi hoặc thắc mắc của bạn về kỳ thi này..."
          onSend={handleSendQuestion}
        />
      </div>
    </Card>
  );
}
