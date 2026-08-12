import { useState } from "react";
import { useToast } from "~/context/ToastContext.jsx";
import Icon from "~/components/Icon/Icon";
import styles from "./SettingSecurity.module.css";

function SettingSecurity({ userData }) {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [twoFactor, setTwoFactor] = useState(userData.twoFactorEnabled || false);
  const { toast } = useToast();

  const handlePasswordChange = (e) => {
    e.preventDefault();
    if (!currentPassword) {
      toast.error("Vui lòng nhập mật khẩu hiện tại!", "Bảo mật");
      return;
    }
    if (!newPassword || newPassword.length < 6) {
      toast.error("Mật khẩu mới phải từ 6 ký tự trở lên!", "Bảo mật");
      return;
    }
    if (newPassword !== confirmPassword) {
      toast.error("Mật khẩu xác nhận không trùng khớp!", "Bảo mật");
      return;
    }

    toast.success("Đổi mật khẩu thành công!", "Bảo mật");
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  const handleToggle2FA = () => {
    const nextState = !twoFactor;
    setTwoFactor(nextState);
    toast.info(
      nextState ? "Đã bật xác thực 2 lớp (2FA)!" : "Đã tắt xác thực 2 lớp (2FA).",
      "Xác thực 2 yếu tố",
    );
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.section_title}>Bảo mật</h2>

      {/* Change Password Form */}
      <form onSubmit={handlePasswordChange} className={styles.card}>
        <h3 className={styles.card_title}>Đổi mật khẩu</h3>

        <div className={styles.field_group}>
          <label htmlFor="sec-curr-pass" className={styles.label}>
            Mật khẩu hiện tại
          </label>
          <input
            id="sec-curr-pass"
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            placeholder="••••••••"
            className={styles.input}
          />
        </div>

        <div className={styles.field_group}>
          <label htmlFor="sec-new-pass" className={styles.label}>
            Mật khẩu mới
          </label>
          <input
            id="sec-new-pass"
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="••••••••"
            className={styles.input}
          />
        </div>

        <div className={styles.field_group}>
          <label htmlFor="sec-conf-pass" className={styles.label}>
            Xác nhận mật khẩu mới
          </label>
          <input
            id="sec-conf-pass"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="••••••••"
            className={styles.input}
          />
        </div>

        <div className={styles.actions}>
          <button type="submit" className={styles.submit_btn}>
            Cập nhật mật khẩu
          </button>
        </div>
      </form>

      {/* 2FA Card */}
      <div className={styles.card}>
        <div className={styles.row_between}>
          <div>
            <h3 className={styles.card_title}>Xác thực 2 yếu tố (2FA)</h3>
            <p className={styles.desc}>
              Tăng cường bảo mật bằng mã xác thực gửi qua ứng dụng Google Authenticator.
            </p>
          </div>
          <button
            type="button"
            onClick={handleToggle2FA}
            className={`${styles.toggle_btn} ${twoFactor ? styles["toggle_btn--active"] : ""}`}
          >
            {twoFactor ? "Đã bật" : "Bật 2FA"}
          </button>
        </div>
      </div>

      {/* Active Sessions */}
      <div className={styles.card}>
        <h3 className={styles.card_title}>Phiên đăng nhập gần đây</h3>
        <div className={styles.session_list}>
          <div className={styles.session_item}>
            <div className={styles.session_icon}>
              <Icon name="Monitor" size={20} />
            </div>
            <div className={styles.session_info}>
              <span className={styles.session_device}>Chrome trên Windows 11 (Thiết bị này)</span>
              <span className={styles.session_meta}>
                TP. Hồ Chí Minh, Việt Nam • Đang hoạt động
              </span>
            </div>
            <span className={styles.current_badge}>Hiện tại</span>
          </div>

          <div className={styles.session_item}>
            <div className={styles.session_icon}>
              <Icon name="Smartphone" size={20} />
            </div>
            <div className={styles.session_info}>
              <span className={styles.session_device}>FySet App trên iPhone 14 Pro</span>
              <span className={styles.session_meta}>Hoạt động 2 giờ trước</span>
            </div>
            <button
              type="button"
              onClick={() => toast.info("Đã đăng xuất khỏi thiết bị!", "Đăng xuất")}
              className={styles.logout_link}
            >
              Đăng xuất
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SettingSecurity;
