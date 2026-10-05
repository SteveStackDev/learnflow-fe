import { useState, useEffect } from "react";
import { useToast } from "~/context/ToastContext.jsx";
import { useAuth } from "~/context/AuthContext.jsx";
import Icon from "~/components/Icon/Icon.jsx";
import userService from "~/services/userService.js";
import styles from "./SettingSecurity.module.css";

function SettingSecurity() {
  const { user, refreshUser, updateUser } = useAuth();
  const { toast } = useToast();

  // State cho Đổi Username
  const [username, setUsername] = useState("");
  const [isSavingUsername, setIsSavingUsername] = useState(false);

  // State cho Đổi Mật khẩu
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSavingPassword, setIsSavingPassword] = useState(false);

  // State ẩn/hiện mật khẩu
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Đồng bộ username hiện tại từ AuthContext
  useEffect(() => {
    if (user && Object.keys(user).length > 0) {
      setUsername(user.username || user.name || "");
    }
  }, [user]);

  // Xử lý đổi Username
  const handleUsernameChange = async (e) => {
    e.preventDefault();
    const cleanUsername = username.trim();

    if (!cleanUsername) {
      toast.error("Tên người dùng không được để trống!", "Tài khoản");
      return;
    }

    if (cleanUsername.length < 3 || cleanUsername.length > 30) {
      toast.error("Tên người dùng phải có độ dài từ 3 đến 30 ký tự!", "Tài khoản");
      return;
    }

    const usernameRegex = /^[a-zA-Z0-9_.-]+$/;
    if (!usernameRegex.test(cleanUsername)) {
      toast.error(
        "Tên người dùng chỉ được chứa chữ cái, số, dấu gạch dưới (_), gạch ngang (-) hoặc dấu chấm (.)",
        "Tài khoản"
      );
      return;
    }

    if (cleanUsername === (user?.username || user?.name)) {
      toast.info("Tên người dùng không có thay đổi!", "Tài khoản");
      return;
    }

    setIsSavingUsername(true);
    try {
      await userService.changeUsername(cleanUsername);

      // Cập nhật ngay vào state và localStorage để duy trì sau khi F5
      updateUser({
        ...user,
        username: cleanUsername,
        name: cleanUsername,
      });

      // Đồng bộ thông tin người dùng mới nhất vào toàn bộ App
      await refreshUser();

      toast.success("Cập nhật tên người dùng thành công!", "Tài khoản");
    } catch (err) {
      toast.error(err.message || "Đổi tên người dùng thất bại!", "Tài khoản");
    } finally {
      setIsSavingUsername(false);
    }
  };

  // Xử lý đổi Mật khẩu
  const handlePasswordChange = async (e) => {
    e.preventDefault();

    if (!currentPassword) {
      toast.error("Vui lòng nhập mật khẩu hiện tại!", "Bảo mật");
      return;
    }

    if (!newPassword || newPassword.length < 8) {
      toast.error("Mật khẩu mới phải có ít nhất 8 ký tự!", "Bảo mật");
      return;
    }

    if (newPassword === currentPassword) {
      toast.error("Mật khẩu mới không được trùng với mật khẩu hiện tại!", "Bảo mật");
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("Mật khẩu xác nhận không trùng khớp!", "Bảo mật");
      return;
    }

    setIsSavingPassword(true);
    try {
      await userService.changePassword({
        oldPassword: currentPassword,
        newPassword,
        confirmPassword,
      });

      toast.success("Cập nhật mật khẩu thành công!", "Bảo mật");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err) {
      toast.error(err.message || "Đổi mật khẩu thất bại!", "Bảo mật");
    } finally {
      setIsSavingPassword(false);
    }
  };

  const isSocialLogin = Boolean(user?.isSocialLogin || user?.googleId || user?.githubId);

  return (
    <div className={styles.container}>
      <div className={styles.header_section}>
        <h2 className={styles.section_title}>Bảo mật & Tài khoản</h2>
        <p className={styles.section_desc}>
          Quản lý thông tin định danh, tên người dùng và mật khẩu bảo vệ tài khoản của bạn.
        </p>
      </div>

      {/* CARD 1: ĐỔI TÊN NGƯỜI DÙNG (USERNAME) */}
      <div className={styles.card}>
        <div className={styles.card_header}>
          <div className={styles.card_icon_wrap}>
            <Icon name="AtSign" size={20} />
          </div>
          <div>
            <h3 className={styles.card_title}>Đổi tên người dùng (Username)</h3>
            <p className={styles.desc}>
              Tên người dùng là định danh duy nhất của bạn trên FySet dùng trong hồ sơ cá nhân và bảng xếp hạng.
            </p>
          </div>
        </div>

        <form onSubmit={handleUsernameChange} className={styles.form_content}>
          <div className={styles.current_badge_row}>
            <span className={styles.badge_label}>Tên hiện tại:</span>
            <span className={styles.current_username_badge}>
              @{user?.username || user?.name || "chưa_đặt"}
            </span>
          </div>

          <div className={styles.field_group}>
            <label htmlFor="sec-username" className={styles.label}>
              Tên người dùng mới
            </label>
            <div className={styles.input_prefix_wrapper}>
              <span className={styles.prefix}>@</span>
              <input
                id="sec-username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="vd: nguyenvana"
                maxLength={30}
                className={`${styles.input} ${styles.input_has_prefix}`}
              />
            </div>
            <span className={styles.hint_text}>
              Từ 3 đến 30 ký tự, có thể dùng chữ cái, chữ số, dấu gạch dưới (_), gạch ngang (-) hoặc dấu chấm (.).
            </span>
          </div>

          <div className={styles.actions}>
            <button
              type="submit"
              disabled={isSavingUsername || username.trim() === (user?.username || user?.name)}
              className={styles.submit_btn}
            >
              {isSavingUsername ? (
                <>
                  <span className={styles.spinner} />
                  <span>Đang lưu...</span>
                </>
              ) : (
                "Cập nhật tên người dùng"
              )}
            </button>
          </div>
        </form>
      </div>

      {/* CARD 2: ĐỔI MẬT KHẨU (CHANGE PASSWORD) */}
      <div className={styles.card}>
        <div className={styles.card_header}>
          <div className={styles.card_icon_wrap}>
            <Icon name="Lock" size={20} />
          </div>
          <div>
            <h3 className={styles.card_title}>Đổi mật khẩu</h3>
            <p className={styles.desc}>
              Đảm bảo tài khoản của bạn sử dụng mật khẩu mạnh để phòng tránh truy cập trái phép.
            </p>
          </div>
        </div>

        {isSocialLogin ? (
          <div className={styles.social_notice_box}>
            <div className={styles.notice_icon}>
              <Icon name="ShieldCheck" size={24} />
            </div>
            <div className={styles.notice_content}>
              <h4 className={styles.notice_title}>Tài khoản liên kết mạng xã hội</h4>
              <p className={styles.notice_desc}>
                Tài khoản của bạn đăng nhập an toàn thông qua Google / GitHub. Bạn không cần thiết lập hoặc thay đổi mật khẩu cho phương thức này.
              </p>
            </div>
          </div>
        ) : (
          <form onSubmit={handlePasswordChange} className={styles.form_content}>
            <div className={styles.field_group}>
              <label htmlFor="sec-curr-pass" className={styles.label}>
                Mật khẩu hiện tại
              </label>
              <div className={styles.password_input_wrap}>
                <input
                  id="sec-curr-pass"
                  type={showCurrentPassword ? "text" : "password"}
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  placeholder="Nhập mật khẩu hiện tại"
                  className={styles.input}
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowCurrentPassword((prev) => !prev)}
                  className={styles.eye_toggle_btn}
                  aria-label={showCurrentPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
                >
                  <Icon name={showCurrentPassword ? "EyeOff" : "Eye"} size={18} />
                </button>
              </div>
            </div>

            <div className={styles.grid_2cols}>
              <div className={styles.field_group}>
                <label htmlFor="sec-new-pass" className={styles.label}>
                  Mật khẩu mới
                </label>
                <div className={styles.password_input_wrap}>
                  <input
                    id="sec-new-pass"
                    type={showNewPassword ? "text" : "password"}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Tối thiểu 8 ký tự"
                    className={styles.input}
                    autoComplete="new-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword((prev) => !prev)}
                    className={styles.eye_toggle_btn}
                    aria-label={showNewPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
                  >
                    <Icon name={showNewPassword ? "EyeOff" : "Eye"} size={18} />
                  </button>
                </div>
              </div>

              <div className={styles.field_group}>
                <label htmlFor="sec-conf-pass" className={styles.label}>
                  Xác nhận mật khẩu mới
                </label>
                <div className={styles.password_input_wrap}>
                  <input
                    id="sec-conf-pass"
                    type={showConfirmPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Nhập lại mật khẩu mới"
                    className={styles.input}
                    autoComplete="new-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword((prev) => !prev)}
                    className={styles.eye_toggle_btn}
                    aria-label={showConfirmPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
                  >
                    <Icon name={showConfirmPassword ? "EyeOff" : "Eye"} size={18} />
                  </button>
                </div>
              </div>
            </div>

            <div className={styles.password_requirements}>
              <span className={styles.req_title}>Yêu cầu mật khẩu an toàn:</span>
              <ul className={styles.req_list}>
                <li>Có độ dài ít nhất 8 ký tự.</li>
                <li>Bao gồm chữ thường, chữ hoa, số và ký tự đặc biệt (!@#$%...).</li>
                <li>Không trùng lặp với mật khẩu hiện tại.</li>
              </ul>
            </div>

            <div className={styles.actions}>
              <button
                type="submit"
                disabled={isSavingPassword || !currentPassword || !newPassword || !confirmPassword}
                className={styles.submit_btn}
              >
                {isSavingPassword ? (
                  <>
                    <span className={styles.spinner} />
                    <span>Đang cập nhật...</span>
                  </>
                ) : (
                  "Cập nhật mật khẩu"
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default SettingSecurity;
