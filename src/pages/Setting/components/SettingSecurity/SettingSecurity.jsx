import { useState } from "react";
import { useToast } from "~/context/ToastContext.jsx";
import styles from "./SettingSecurity.module.css";
import userService from "~/services/userService.js";

function SettingSecurity() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { toast } = useToast();

  const handlePasswordChange = async (e) => {
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

    const data = await userService.changePassword({
      oldPassword: currentPassword,
      newPassword,
      confirmPassword,
    });

    if (!data.success) {
      toast.error(data.message || "Đổi mật khẩu thất bại!", "Bảo mật");
      return;
    }

    toast.success("Đổi mật khẩu thành công!", "Bảo mật");
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.section_title}>Bảo mật</h2>

      {/* Change Password Form */}
      <form onSubmit={handlePasswordChange} className={styles.card}>
        <h3 className={styles.card_title}>Đổi mật khẩu</h3>
        <p className={styles.desc}>
          Đảm bảo tài khoản của bạn sử dụng mật khẩu mạnh và an toàn để phòng tránh truy cập trái phép.
        </p>

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
    </div>
  );
}

export default SettingSecurity;
