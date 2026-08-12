import { useState, useEffect } from "react";
import { useTheme } from "~/context/ThemeContext.jsx";
import { useToast } from "~/context/ToastContext.jsx";
import Icon from "~/components/Icon/Icon";
import styles from "./SettingAppearance.module.css";

function SettingAppearance() {
  const { theme, changeTheme } = useTheme();
  const { toast } = useToast();
  const [language, setLanguage] = useState(
    () => localStorage.getItem("fySet_lang") || document.documentElement.lang || "vi",
  );

  useEffect(() => {
    // Clean up any legacy Google Translate elements or cookies
    document.cookie = "googtrans=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
    document.cookie = `googtrans=; domain=${window.location.hostname}; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;`;

    const oldScript = document.getElementById("google-translate-script");
    if (oldScript) oldScript.remove();

    const oldContainer = document.getElementById("google_translate_element");
    if (oldContainer) oldContainer.remove();

    const iframe = document.querySelector("iframe.goog-te-banner-frame");
    if (iframe) iframe.remove();
  }, []);

  const handleSelectTheme = (mode) => {
    changeTheme(mode);
    toast.success(`Đã chuyển sang giao diện ${mode === "dark" ? "Tối" : "Sáng"}!`, "Giao diện");
  };

  const handleSelectLanguage = (lang) => {
    setLanguage(lang);
    localStorage.setItem("fySet_lang", lang);
    document.documentElement.lang = lang;

    toast.success(
      `Đã chuyển thiết lập ngôn ngữ trang web sang ${lang === "en" ? "Tiếng Anh (English)" : "Tiếng Việt"}!`,
      "Ngôn ngữ",
    );
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.section_title}>Giao diện</h2>

      {/* Theme Cards */}
      <div className={styles.card}>
        <h3 className={styles.card_title}>Chủ đề</h3>
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

      {/* Language Selection Card */}
      <div className={styles.card}>
        <h3 className={styles.card_title}>Ngôn ngữ hiển thị</h3>
        <p className={styles.desc}>
          Chọn ngôn ngữ ưu tiên hiển thị các nội dung trên toàn bộ hệ thống FySet.
        </p>

        <div className={styles.language_grid}>
          <div
            onClick={() => handleSelectLanguage("vi")}
            className={`${styles.language_card} ${language === "vi" ? styles["language_card--active"] : ""}`}
          >
            <div className={styles.language_flag}>🇻🇳</div>
            <div className={styles.language_info}>
              <span className={styles.language_name}>Tiếng Việt</span>
              <span className={styles.language_sub}>Việt Nam</span>
            </div>
            {language === "vi" && <Icon name="Check" size={18} className={styles.check_icon} />}
          </div>

          <div
            onClick={() => handleSelectLanguage("en")}
            className={`${styles.language_card} ${language === "en" ? styles["language_card--active"] : ""}`}
          >
            <div className={styles.language_flag}>🇬🇧</div>
            <div className={styles.language_info}>
              <span className={styles.language_name}>Tiếng Anh</span>
              <span className={styles.language_sub}>English</span>
            </div>
            {language === "en" && <Icon name="Check" size={18} className={styles.check_icon} />}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SettingAppearance;
