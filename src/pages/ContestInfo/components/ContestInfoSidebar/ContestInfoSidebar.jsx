import React from "react";
import { useNavigate } from "react-router";
import { Button } from "~/components/ui";
import Icon from "~/components/Icon/Icon";
import styles from "./ContestInfoSidebar.module.css";

export default function ContestInfoSidebar({
  contest,
  isRegistered,
  onRegisterToggle,
  activeTab,
  onTabChange,
}) {
  const navigate = useNavigate();
  const isUpcoming = contest.status === "upcoming";

  const getButtonText = () => {
    if (isUpcoming) {
      return isRegistered ? "✓ Đã đăng ký" : "Đăng ký ngay";
    }
    if (contest.status === "running") {
      return "Vào thi ngay";
    }
    return "Luyện tập";
  };

  const getButtonClass = () => {
    if (isUpcoming) {
      return isRegistered ? styles.action_btn_registered : styles.action_btn_upcoming;
    }
    if (contest.status === "running") {
      return styles.action_btn_running;
    }
    return styles.action_btn_finished;
  };

  const menuItems = [
    { id: "standings", label: "Bảng xếp hạng", icon: "Trophy" },
    { id: "submissions", label: "Bài đã nộp", icon: "Code" },
    { id: "announcements", label: "Thông báo", icon: "Bell" },
  ];

  return (
    <aside className={styles.sidebar}>
      <button
        className={styles.back_btn}
        onClick={() => navigate("/contest/list")}
        title="Quay lại danh sách kỳ thi"
      >
        <Icon name="ArrowLeft" size={16} />
        <span>Danh sách kỳ thi</span>
      </button>

      <div className={styles.contest_header}>
        <div className={styles.trophy_icon}>
          <Icon name="Trophy" size={22} />
        </div>
        <div className={styles.contest_info}>
          <h2 className={styles.contest_title}>{contest.title || "Kỳ thi Toàn cầu #24"}</h2>
          <span className={styles.contest_division}>{contest.division || "Hạng 1 + Hạng 2"}</span>
        </div>
      </div>

      <Button
        className={`${styles.action_btn} ${getButtonClass()}`}
        onClick={onRegisterToggle}
        leftIcon={
          isUpcoming
            ? "Calendar"
            : contest.status === "running"
            ? "Play"
            : "CheckCircle"
        }
      >
        {getButtonText()}
      </Button>

      {/* Menu Tabs: Always visible in UI, disabled when contest is upcoming */}
      <nav className={styles.nav_menu}>
        {menuItems.map((item) => {
          const isActive = !isUpcoming && activeTab === item.id;
          return (
            <button
              key={item.id}
              className={`${styles.nav_item} ${
                isActive ? styles.nav_item_active : ""
              } ${isUpcoming ? styles.nav_item_disabled : ""}`}
              onClick={() => onTabChange(item.id)}
              disabled={isUpcoming}
              title={
                isUpcoming
                  ? "Kỳ thi chưa diễn ra. Tính năng sẽ mở khi kỳ thi bắt đầu."
                  : item.label
              }
            >
              <Icon name={item.icon} size={18} />
              <span>{item.label}</span>
              {isUpcoming && (
                <span style={{ marginLeft: "auto", opacity: 0.6 }}>
                  <Icon name="Lock" size={14} />
                </span>
              )}
            </button>
          );
        })}
      </nav>
    </aside>
  );
}
