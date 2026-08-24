import React from "react";
import Icon from "~/components/Icon/Icon";
import { ScrollArea } from "~/components/ui";
import styles from "./AdminSidebar.module.css";

const NAV_SECTIONS = [
  {
    title: "QUẢN LÝ CHÍNH",
    items: [
      { id: "course", label: "COURSE", icon: "Book" },
      { id: "problem", label: "PROBLEM", icon: "Code" },
      { id: "contest", label: "CONTEST", icon: "Trophy" },
    ],
  },
  {
    title: "NGƯỜI DÙNG & TƯƠNG TÁC",
    items: [
      { id: "user", label: "USER", icon: "Users" },
      { id: "comment", label: "COMMENT", icon: "MessageSquare" },
      { id: "blog", label: "BLOG", icon: "Newspaper" },
    ],
  },
  {
    title: "HỆ THỐNG",
    items: [
      { id: "message", label: "MESSAGE", icon: "Mail", badgeCount: 3 },
      { id: "feedback", label: "FEEDBACK", icon: "HelpCircle" },
    ],
  },
];

export default function AdminSidebar({ activeTab, onSelectTab, setActiveTab, isOpen, onClose }) {
  const handleItemClick = (tabId) => {
    const callback = onSelectTab || setActiveTab;
    if (typeof callback === "function") {
      callback(tabId);
    }
    if (onClose) onClose(); // Auto-close drawer on mobile when tab selected
  };

  return (
    <aside className={`${styles.sidebar} ${isOpen ? styles.sidebar_open : ""}`}>
      {/* Mobile Header with Close Button */}
      <div className={styles.mobile_header}>
        <span className={styles.mobile_title}>MENU QUẢN TRỊ</span>
        <button
          type="button"
          className={styles.close_btn}
          onClick={onClose}
          title="Đóng menu"
        >
          <Icon name="X" size={18} />
        </button>
      </div>

      {/* Navigation Sections */}
      <ScrollArea className={styles.nav_scroll}>
        <nav className={styles.nav_menu}>
          {NAV_SECTIONS.map((section) => (
            <div key={section.title} className={styles.section_group}>
              <h4 className={styles.section_title}>{section.title}</h4>
              <div className={styles.items_list}>
                {section.items.map((item) => {
                  const isActive = activeTab === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      className={`${styles.nav_item} ${isActive ? styles.nav_item_active : ""}`}
                      onClick={() => handleItemClick(item.id)}
                    >
                      <div className={styles.item_left}>
                        <Icon name={item.icon} size={18} className={styles.item_icon} />
                        <span className={styles.item_label}>{item.label}</span>
                      </div>
                      {item.badgeCount && (
                        <span className={styles.count_badge}>{item.badgeCount}</span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>
      </ScrollArea>
    </aside>
  );
}
