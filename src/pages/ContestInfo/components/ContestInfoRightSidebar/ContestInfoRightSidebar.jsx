import React from "react";
import { Card, Button } from "~/components/ui";
import Icon from "~/components/Icon/Icon";
import styles from "./ContestInfoRightSidebar.module.css";

export default function ContestInfoRightSidebar({ contest, onActionClick }) {
  const getStatusBadge = () => {
    if (contest.status === "upcoming") {
      return <span className={`${styles.status_pill} ${styles.status_upcoming}`}>● Sắp diễn ra</span>;
    }
    if (contest.status === "running") {
      return <span className={`${styles.status_pill} ${styles.status_running}`}>● Đang diễn ra</span>;
    }
    return <span className={`${styles.status_pill} ${styles.status_finished}`}>● Đã kết thúc</span>;
  };

  const getStatusDesc = () => {
    if (contest.status === "upcoming") {
      return "Kỳ thi sẽ chính thức bắt đầu sau đếm ngược. Vui lòng đăng ký trước để tham gia.";
    }
    if (contest.status === "running") {
      return "Kỳ thi đang diễn ra trực tiếp! Tham gia làm bài ngay để ghi tên lên Bảng xếp hạng.";
    }
    return "Kỳ thi đã kết thúc. Bạn vẫn có thể truy cập để tự do luyện tập các bài tập trong đề.";
  };

  const getActionButtonClass = () => {
    if (contest.status === "upcoming") return styles.card_btn_upcoming;
    if (contest.status === "running") return styles.card_btn_running;
    return styles.card_btn_finished;
  };

  return (
    <aside className={styles.container}>
      {/* Contest Status Overview Card */}
      <Card className={styles.card}>
        <div className={styles.icon_badge_wrapper}>
          <div className={styles.trophy_badge}>
            <Icon name="Award" size={28} />
          </div>
        </div>

        <div className={styles.status_info}>
          <h3 className={styles.title}>{contest.title || "Codeforces Round 1116 (Div. 1)"}</h3>
          {getStatusBadge()}
          <p className={styles.desc_text}>{getStatusDesc()}</p>
        </div>

        <Button
          className={`${styles.card_btn} ${getActionButtonClass()}`}
          onClick={onActionClick}
        >
          {contest.status === "upcoming" && "Đăng ký ngay"}
          {contest.status === "running" && "Vào thi ngay"}
          {contest.status === "finished" && "Luyện tập lại"}
        </Button>
      </Card>

      {/* Virtual Participation Card */}
      <Card className={styles.card}>
        <div className={styles.section_header}>
          <Icon name="Zap" size={18} color="#0950c3" />
          <span>Tham gia thi ảo (Virtual)</span>
        </div>
        <p className={styles.desc_text}>
          Thi ảo là tính năng giúp bạn làm lại kỳ thi đã qua với đếm ngược và chấm điểm thời gian thực như tham gia kỳ thi thật.
        </p>
        <Button
          className={`${styles.card_btn} ${styles.card_btn_virtual}`}
          onClick={onActionClick}
        >
          Bắt đầu thi ảo
        </Button>
      </Card>

      {/* Contest Materials Card */}
      <Card className={styles.card}>
        <div className={styles.section_header}>
          <Icon name="Folder" size={18} color="#0950c3" />
          <span>Tài liệu kỳ thi</span>
        </div>
        <div className={styles.materials_list}>
          <a className={styles.material_item} href="#announcement">
            <Icon name="FileText" size={16} />
            <span>Thông báo chính thức (Tiếng Việt)</span>
          </a>
          <a className={styles.material_item} href="#tutorial">
            <Icon name="BookOpen" size={16} />
            <span>Hướng dẫn & Lời giải chi tiết (Editorial)</span>
          </a>
        </div>
      </Card>
    </aside>
  );
}
