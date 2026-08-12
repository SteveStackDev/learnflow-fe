import { useState } from "react";
import { useToast } from "~/context/ToastContext.jsx";
import Icon from "~/components/Icon/Icon";
import styles from "./SettingIntegrations.module.css";

function SettingIntegrations() {
  const [connections, setConnections] = useState({
    github: true,
    google: true,
    discord: false,
    leetcode: false,
  });
  const { toast } = useToast();

  const handleToggleConnect = (serviceName, title) => {
    const nextState = !connections[serviceName];
    setConnections((prev) => ({ ...prev, [serviceName]: nextState }));
    toast.info(
      nextState ? `Đã kết nối thành công với ${title}!` : `Đã ngắt kết nối với ${title}.`,
      "Tích hợp tài khoản",
    );
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.section_title}>Tích hợp tài khoản</h2>

      <div className={styles.card}>
        <h3 className={styles.card_title}>Tài khoản bên thứ ba</h3>
        <p className={styles.desc}>
          Kết nối tài khoản xã hội để đăng nhập nhanh và đồng bộ hóa tiến độ code.
        </p>

        <div className={styles.integrations_list}>
          {/* GitHub */}
          <div className={styles.item}>
            <div className={styles.brand_box}>
              <Icon name="Github" size={24} />
              <div>
                <span className={styles.brand_name}>GitHub</span>
                <span className={styles.brand_status}>
                  {connections.github ? "Đã liên kết (@nguyenvana)" : "Chưa liên kết"}
                </span>
              </div>
            </div>
            <button
              type="button"
              onClick={() => handleToggleConnect("github", "GitHub")}
              className={`${styles.connect_btn} ${connections.github ? styles["connect_btn--connected"] : ""}`}
            >
              {connections.github ? "Ngắt kết nối" : "Kết nối"}
            </button>
          </div>

          {/* Google */}
          <div className={styles.item}>
            <div className={styles.brand_box}>
              <Icon name="Google" size={24} />
              <div>
                <span className={styles.brand_name}>Google</span>
                <span className={styles.brand_status}>
                  {connections.google ? "Đã liên kết (nguyenvana@gmail.com)" : "Chưa liên kết"}
                </span>
              </div>
            </div>
            <button
              type="button"
              onClick={() => handleToggleConnect("google", "Google")}
              className={`${styles.connect_btn} ${connections.google ? styles["connect_btn--connected"] : ""}`}
            >
              {connections.google ? "Ngắt kết nối" : "Kết nối"}
            </button>
          </div>

          {/* Discord */}
          <div className={styles.item}>
            <div className={styles.brand_box}>
              <Icon name="Discord" size={24} />
              <div>
                <span className={styles.brand_name}>Discord</span>
                <span className={styles.brand_status}>
                  {connections.discord ? "Đã liên kết" : "Chưa liên kết"}
                </span>
              </div>
            </div>
            <button
              type="button"
              onClick={() => handleToggleConnect("discord", "Discord")}
              className={`${styles.connect_btn} ${connections.discord ? styles["connect_btn--connected"] : ""}`}
            >
              {connections.discord ? "Ngắt kết nối" : "Kết nối"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SettingIntegrations;
