import { useState, useEffect } from "react";
import styles from "./ThemeToggle.module.css";

function ThemeToggle() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("learnflow_theme") || "light";
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("learnflow_theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <div className={styles["theme-toggle__wrapper"]}>
      <span className={styles["theme-toggle__tooltip"]}>
        {theme === "light" ? "Bật giao diện Tối 🌙" : "Bật giao diện Sáng ☀️"}
      </span>
      <button
        type="button"
        onClick={toggleTheme}
        className={styles["theme-toggle__btn"]}
        aria-label="Toggle Theme Mode"
      >
        <span className={styles["theme-toggle__icon"]}>
          {theme === "light" ? (
            /* Sun Icon */
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="5" />
              <line x1="12" y1="1" x2="12" y2="3" />
              <line x1="12" y1="21" x2="12" y2="23" />
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
              <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
              <line x1="1" y1="12" x2="3" y2="12" />
              <line x1="21" y1="12" x2="23" y2="12" />
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
              <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
            </svg>
          ) : (
            /* Moon Icon */
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
            </svg>
          )}
        </span>
      </button>
    </div>
  );
}

export default ThemeToggle;
