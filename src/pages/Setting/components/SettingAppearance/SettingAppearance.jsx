import { useContext } from "react";
import { ThemeContext } from "~/context/ThemeContext";
import { useToast } from "~/context/ToastContext.jsx";
import Icon from "~/components/Icon/Icon";
import styles from "./SettingAppearance.module.css";

function SettingAppearance() {
  const { theme, changeTheme } = useContext(ThemeContext);
  const { toast } = useToast();

  const handleSelectTheme = (mode) => {
    changeTheme(mode);
    toast.success(`Đã chuyển sang giao diện ${mode === "dark" ? "Tối" : "Sáng"}!`, "Giao diện");
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.section_title}>Giao diện</h2>

      {/* Theme Cards */}
      <div className={styles.card}>
        <h3 className={styles.card_title}>Chủ đề</h3>
        <p className={styles.desc}>
          Tùy chỉnh giao diện hiển thị phù hợp với thị giác và sở thích của bạn.
        </p>
        <div className={styles.theme_grid}>
          <div
            onClick={() => handleSelectTheme("light")}
            className={`${styles.theme_card} ${theme === "light" ? styles["theme_card--active"] : ""}`}
          >
            <div className={`${styles.preview_box} ${styles["preview_box--light"]}`}>
              <div className={styles.preview_header} />
              <div className={styles.preview_lines}>
                <span />
                <span />
              </div>
            </div>
            <div className={styles.theme_label}>
              <Icon name="Sun" size={16} />
              <span>Giao diện Sáng</span>
            </div>
          </div>

          <div
            onClick={() => handleSelectTheme("dark")}
            className={`${styles.theme_card} ${theme === "dark" ? styles["theme_card--active"] : ""}`}
          >
            <div className={`${styles.preview_box} ${styles["preview_box--dark"]}`}>
              <div className={styles.preview_header} />
              <div className={styles.preview_lines}>
                <span />
                <span />
              </div>
            </div>
            <div className={styles.theme_label}>
              <Icon name="Moon" size={16} />
              <span>Giao diện Tối</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SettingAppearance;
