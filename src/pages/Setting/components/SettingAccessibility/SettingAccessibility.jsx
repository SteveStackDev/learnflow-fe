import { useState } from "react";
import { useToast } from "~/context/ToastContext.jsx";
import styles from "./SettingAccessibility.module.css";

function SettingAccessibility() {
  const [reducedMotion, setReducedMotion] = useState(false);
  const [highContrast, setHighContrast] = useState(false);
  const [screenReader, setScreenReader] = useState(false);
  const { toast } = useToast();

  const handleSave = () => {
    toast.success("Cập nhật tùy chọn hỗ trợ tiếp cận thành công!", "Hỗ trợ tiếp cận");
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.section_title}>Hỗ trợ tiếp cận</h2>

      <div className={styles.card}>
        <h3 className={styles.card_title}>Tùy chọn hiển thị & Tương tác</h3>

        <div className={styles.row_between}>
          <div>
            <span className={styles.item_title}>Giảm chuyển động (Reduced Motion)</span>
            <p className={styles.desc}>
              Tắt các hiệu ứng chuyển động mượt và hiệu ứng bay bổng trong hệ thống.
            </p>
          </div>
          <input
            type="checkbox"
            checked={reducedMotion}
            onChange={(e) => setReducedMotion(e.target.checked)}
            className={styles.checkbox}
          />
        </div>

        <hr className={styles.divider} />

        <div className={styles.row_between}>
          <div>
            <span className={styles.item_title}>Độ tương phản cao (High Contrast Mode)</span>
            <p className={styles.desc}>
              Tăng độ đậm nét và độ tương phản giữa văn bản và nền để dễ đọc hơn.
            </p>
          </div>
          <input
            type="checkbox"
            checked={highContrast}
            onChange={(e) => setHighContrast(e.target.checked)}
            className={styles.checkbox}
          />
        </div>

        <hr className={styles.divider} />

        <div className={styles.row_between}>
          <div>
            <span className={styles.item_title}>Tối ưu trình đọc màn hình (Screen Reader)</span>
            <p className={styles.desc}>
              Cung cấp nhãn aria chi tiết hơn cho các nút bấm và trình soạn thảo code.
            </p>
          </div>
          <input
            type="checkbox"
            checked={screenReader}
            onChange={(e) => setScreenReader(e.target.checked)}
            className={styles.checkbox}
          />
        </div>
      </div>

      <div className={styles.actions}>
        <button type="button" onClick={handleSave} className={styles.submit_btn}>
          Lưu tùy chọn
        </button>
      </div>
    </div>
  );
}

export default SettingAccessibility;
