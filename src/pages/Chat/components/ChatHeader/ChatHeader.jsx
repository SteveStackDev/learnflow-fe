import React, { useState, useRef, useEffect } from "react";
import Icon from "~/components/Icon/Icon";
import { useToast } from "~/context/ToastContext.jsx";
import styles from "./ChatHeader.module.css";

export default function ChatHeader({ activeChat, onBackToSidebar, onSelectUser }) {
  const { toast } = useToast();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!activeChat) return null;

  const handleAction = (actionName) => {
    setIsMenuOpen(false);
    toast.info(`Đã thực hiện: ${actionName}`, "Tùy chọn Messenger");
  };

  const handleOpenUserProfile = () => {
    onSelectUser?.({
      id: activeChat.id || "user-01",
      username: activeChat.name,
      handle: activeChat.name ? activeChat.name.toLowerCase().replace(/\s+/g, "_") : "alex_t",
      avatar: activeChat.avatar,
      bio: "Thành viên trên FySet Messenger.",
      status: activeChat.isOnline ? "online" : "offline",
      statusMessage: activeChat.statusText || "Đang trực tuyến 💬",
    });
  };

  return (
    <header className={styles.header}>
      {/* Active Chat Target Avatar & Name info */}
      <div className={styles.user_info}>
        {/* Mobile Back Button */}
        {onBackToSidebar && (
          <button
            type="button"
            className={styles.back_btn}
            onClick={onBackToSidebar}
            title="Quay lại danh sách cuộc trò chuyện"
            aria-label="Quay lại danh sách cuộc trò chuyện"
          >
            <Icon name="ArrowLeft" size={20} />
          </button>
        )}

        <div
          className={styles.avatar_wrapper}
          onClick={handleOpenUserProfile}
          style={{ cursor: "pointer" }}
          title="Click để xem Profile người dùng"
        >
          <img src={activeChat.avatar} alt={activeChat.name} className={styles.avatar} />
        </div>

        <div
          className={styles.name_meta}
          onClick={handleOpenUserProfile}
          style={{ cursor: "pointer" }}
          title="Click để xem Profile người dùng"
        >
          <h3 className={styles.name}>{activeChat.name}</h3>
          <span className={styles.status_text}>
            {activeChat.isOnline ? "● Đang trực tuyến" : activeChat.statusText}
          </span>
        </div>
      </div>

      {/* Header Action Buttons & 3 Dots Menu */}
      <div className={styles.action_group} ref={menuRef}>
        <button
          type="button"
          className={styles.icon_btn}
          onClick={() => toast.info("Tính năng Gọi thoại đang phát triển!", "Cuộc gọi")}
          title="Bắt đầu cuộc gọi thoại"
        >
          <Icon name="Phone" size={18} />
        </button>

        <button
          type="button"
          className={styles.icon_btn}
          onClick={() => toast.info("Tính năng Gọi Video đang phát triển!", "Cuộc gọi Video")}
          title="Bắt đầu cuộc gọi Video"
        >
          <Icon name="Video" size={18} />
        </button>

        <div className={styles.menu_wrapper}>
          <button
            type="button"
            className={`${styles.icon_btn} ${isMenuOpen ? styles.icon_btn_active : ""}`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            title="Thêm tùy chọn"
          >
            <Icon name="MoreVertical" size={18} />
          </button>

          {isMenuOpen && (
            <div className={styles.dropdown_menu}>
              <button
                type="button"
                className={styles.dropdown_item}
                onClick={() => handleAction("Xem trang cá nhân")}
              >
                <Icon name="User" size={16} />
                <span>Xem hồ sơ</span>
              </button>

              <button
                type="button"
                className={styles.dropdown_item}
                onClick={() => handleAction("Tắt thông báo")}
              >
                <Icon name="BellOff" size={16} />
                <span>Tắt thông báo</span>
              </button>

              <button
                type="button"
                className={styles.dropdown_item}
                onClick={() => handleAction("Ghim trò chuyện")}
              >
                <Icon name="Pin" size={16} />
                <span>Ghim hội thoại</span>
              </button>

              <div className={styles.menu_divider} />

              <button
                type="button"
                className={`${styles.dropdown_item} ${styles.dropdown_danger}`}
                onClick={() => handleAction("Xóa lịch sử cuộc trò chuyện")}
              >
                <Icon name="Trash2" size={16} />
                <span>Xóa trò chuyện</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
