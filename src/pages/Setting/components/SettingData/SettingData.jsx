import { useToast } from "~/context/ToastContext.jsx";
import styles from "./SettingData.module.css";

function SettingData() {
  const { toast } = useToast();

  const handleExportData = () => {
    toast.success(
      "Yêu cầu xuất dữ liệu đã được khởi tạo! Một bản sao ZIP sẽ gửi về email của bạn.",
      "Dữ liệu",
    );
  };

  const handleDeleteAccount = () => {
    toast.error("Vui lòng xác nhận qua email để xóa tài khoản!", "Vùng nguy hiểm");
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.section_title}>Dữ liệu & Quyền riêng tư</h2>

      {/* Export Data */}
      <div className={styles.card}>
        <h3 className={styles.card_title}>Tải xuống dữ liệu của bạn</h3>
        <p className={styles.desc}>
          Tải về toàn bộ lịch sử nộp bài tập, thành tích Streak, lộ trình và huy hiệu đã thu thập
          dưới dạng file JSON/ZIP.
        </p>
        <div className={styles.actions_left}>
          <button type="button" onClick={handleExportData} className={styles.export_btn}>
            Xuất bản sao dữ liệu
          </button>
        </div>
      </div>

      {/* Danger Zone */}
      <div className={`${styles.card} ${styles["card--danger"]}`}>
        <h3 className={styles.danger_title}>Vùng nguy hiểm</h3>
        <p className={styles.desc}>
          Khi xóa tài khoản, tất cả tiến độ học tập, bài tập đã giải và danh hiệu của bạn trên FySet
          sẽ bị xóa vĩnh viễn và không thể khôi phục.
        </p>
        <div className={styles.actions_left}>
          <button type="button" onClick={handleDeleteAccount} className={styles.delete_btn}>
            Xóa tài khoản vĩnh viễn
          </button>
        </div>
      </div>
    </div>
  );
}

export default SettingData;
