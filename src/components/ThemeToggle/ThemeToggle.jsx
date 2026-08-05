import { useState, useEffect } from "react";
import Icon from "~/components/Icon/Icon";
import styles from "./ThemeToggle.module.css";

function ThemeToggle() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("learnflow_theme") || "light";
  });

  useEffect(() => {
    document.documentElement.classList.add("theme-switching");
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("learnflow_theme", theme);

    const timer = setTimeout(() => {
      document.documentElement.classList.remove("theme-switching");
    }, 50);

    return () => clearTimeout(timer);
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
            <Icon name="Sun" size={22} strokeWidth={2.2} />
          ) : (
            <Icon name="Moon" size={22} strokeWidth={2.2} />
          )}
        </span>
      </button>
    </div>
  );
}

export default ThemeToggle;
