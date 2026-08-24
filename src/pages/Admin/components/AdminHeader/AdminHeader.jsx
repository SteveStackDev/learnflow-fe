import React, { useState, useEffect } from "react";
import Icon from "~/components/Icon/Icon";
import { useToast } from "~/context/ToastContext.jsx";
import styles from "./AdminHeader.module.css";

const TAB_TITLES = {
  course: "COURSE_MODULE",
  problem: "PROBLEM_BANK",
  contest: "CONTEST_ARENA",
  user: "USER_DIRECTORY",
  comment: "COMMENT_MODERATOR",
  blog: "BLOG_PUBLISHER",
  message: "SYSTEM_MESSAGES",
  feedback: "USER_FEEDBACK",
};

export default function AdminHeader({ activeTab, onToggleSidebar }) {
  const { toast } = useToast();
  const currentTabName = TAB_TITLES[activeTab] || "IDLE_STATE";

  // Typing animation state for terminal command execution
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    let index = 0;
    setDisplayedText("");

    const timer = setInterval(() => {
      if (index <= currentTabName.length) {
        setDisplayedText(currentTabName.slice(0, index));
        index++;
      } else {
        clearInterval(timer);
      }
    }, 45); // Typing speed per character (45ms)

    return () => clearInterval(timer);
  }, [currentTabName]);

  return (
    <header className={styles.terminal_header}>
      {/* Left: Mobile Menu Button, Window Dots & Command Prompt */}
      <div className={styles.terminal_left}>
        {/* Mobile Sidebar Toggle Button */}
        {onToggleSidebar && (
          <button
            type="button"
            className={styles.mobile_menu_btn}
            onClick={onToggleSidebar}
            title="Mở menu quản trị"
          >
            <Icon name="Menu" size={18} />
          </button>
        )}

        <div className={styles.window_dots}>
          <span className={`${styles.dot} ${styles.dot_close}`} />
          <span className={`${styles.dot} ${styles.dot_minimize}`} />
          <span className={`${styles.dot} ${styles.dot_expand}`} />
        </div>

        <div className={styles.prompt_box}>
          <span className={styles.prompt_user}>root@fyset-admin</span>
          <span className={styles.prompt_sep}>:</span>
          <span className={styles.prompt_path}>~/console</span>
          <span className={styles.prompt_symbol}>#</span>
          <span className={styles.prompt_command}>
            exec --module=
            <span className={styles.highlight_tab}>
              {displayedText}
            </span>
          </span>
        </div>
      </div>

      {/* Right: Terminal Quick Tools & System Status */}
      <div className={styles.terminal_right}>
        {/* System Online Pulse Pill */}
        <div className={styles.status_pill}>
          <span className={styles.status_pulse} />
          <span className={styles.status_text}>SYS.ONLINE</span>
        </div>

        {/* Terminal Style Search Input */}
        <div className={styles.terminal_search}>
          <input
            type="text"
            placeholder="grep_search..."
            className={styles.terminal_input}
          />
          <Icon name="Search" size={14} className={styles.search_icon} />
        </div>

        {/* Notification Bell */}
        <button
          type="button"
          className={styles.terminal_bell}
          onClick={() => toast.info("System logs healthy. No alert flags.", "Terminal Console")}
          title="Terminal Alerts"
        >
          <Icon name="Bell" size={16} />
          <span className={styles.bell_badge} />
        </button>
      </div>
    </header>
  );
}
