import { useState, useRef, useEffect } from "react";
import { useToast } from "~/context/ToastContext.jsx";
import { useAuth } from "~/context/AuthContext.jsx";
import Icon from "~/components/Icon/Icon";
import styles from "./SettingAccount.module.css";
import userService from "~/services/userService.js";

function SettingAccount() {
  const { user, refreshUser } = useAuth(); // Lấy user và refreshUser từ AuthContext

  const [username, setUsername] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  
  const [isLoading, setIsLoading] = useState(false);
  const [isUploadingAvatar, setIsUploadingAvatar] = useState(false);
  const [isSavingUsername, setIsSavingUsername] = useState(false);

  const fileInputRef = useRef(null);
  const { toast } = useToast();

  // Load lại thông tin mới nhất từ API khi component mount/reload
  useEffect(() => {
    const initData = async () => {
      setIsLoading(true);
      await refreshUser(); // Gọi API getMe ép buộc lấy dữ liệu mới nhất
      setIsLoading(false);
    };
    initData();
  }, [refreshUser]);

  // Cập nhật local state mỗi khi user trong AuthContext thay đổi
  useEffect(() => {
    if (user && Object.keys(user).length > 0) {
      setUsername(user.username || user.name || "");
      
      const currentAvatar =
        user.avatar ||
        user.avatarUrl ||
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80";
      
      setAvatarUrl(currentAvatar);
    }
  }, [user]);

  const handleSave = async (e) => {
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

    if (cleanUsername === (user?.username || user?.name)) {
      toast.info("Tên người dùng không có thay đổi!", "Tài khoản");
      return;
    }

    setIsSavingUsername(true);
    try {
      await userService.changeUsername(cleanUsername);

      // Gọi refreshUser để fetch lại /auth/get-me và sync toàn bộ App
      await refreshUser();

      toast.success("Cập nhật tên người dùng thành công!", "Tài khoản");
    } catch (err) {
      toast.error(err.message || "Đổi tên người dùng thất bại!", "Tài khoản");
    } finally {
      setIsSavingUsername(false);
    }
  };

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileSelect = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Vui lòng chọn tệp định dạng hình ảnh (JPG, PNG, GIF)!", "Đổi ảnh");
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      toast.error("Kích thước ảnh tối đa 2MB!", "Đổi ảnh");
      return;
    }

    setIsUploadingAvatar(true);
    try {
      // Upload ảnh
      await userService.updateAvatar(file);

      // Đồng bộ lại dữ liệu mới nhất từ server
      await refreshUser();

      toast.success("Cập nhật ảnh đại diện thành công!", "Ảnh đại diện");
    } catch (err) {
      toast.error(err.message || "Tải ảnh lên thất bại!", "Đổi ảnh");
    } finally {
      setIsUploadingAvatar(false);
      if (e.target) e.target.value = ""; // Reset input
    }
  };

  if (isLoading && (!user || Object.keys(user).length === 0)) {
    return <div className={styles.container}>Đang tải thông tin tài khoản...</div>;
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.section_title}>Tài khoản</h2>

      <form onSubmit={handleSave} className={styles.form}>
        {/* SECTION 1: PROFILE */}
        <div className={styles.card_block}>
          <div className={styles.card_header_row}>
            <div>
              <h3 className={styles.sub_title}>Hồ sơ cá nhân (Profile)</h3>
              <p className={styles.card_desc}>
                Cập nhật ảnh đại diện và tên người dùng của bạn trên hệ thống.
              </p>
            </div>
          </div>

          {/* Avatar Group */}
          <div className={styles.avatar_group}>
            <span className={styles.label}>Ảnh đại diện</span>
            <div className={styles.avatar_row}>
              <img
                src={avatarUrl}
                alt={`Ảnh đại diện của ${user?.name || user?.username || "người dùng"}`}
                className={styles.avatar_img}
              />
              <div className={styles.avatar_meta}>
                <input
                  type="file"
                  ref={fileInputRef}
                  style={{ display: "none" }}
                  accept="image/*"
                  onChange={handleFileSelect}
                />
                <button
                  type="button"
                  onClick={handleAvatarClick}
                  disabled={isUploadingAvatar}
                  className={styles.avatar_btn}
                >
                  <Icon name="Upload" size={14} />
                  {isUploadingAvatar ? "Đang tải ảnh..." : "Đổi ảnh đại diện"}
                </button>
                <span className={styles.avatar_hint}>Hỗ trợ JPG, PNG, GIF hoặc WEBP. Tối đa 2MB.</span>
              </div>
            </div>
          </div>

          {/* Username */}
          <div className={styles.field_group}>
            <label htmlFor="setting-username" className={styles.label}>
              Tên người dùng (Username)
            </label>
            <div className={styles.username_action_row}>
              <div className={styles.input_prefix_wrapper}>
                <span className={styles.prefix}>@</span>
                <input
                  id="setting-username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Nhập tên người dùng mới"
                  maxLength={30}
                  className={`${styles.input} ${styles.input_has_prefix}`}
                />
              </div>
              <button
                type="submit"
                disabled={
                  isSavingUsername ||
                  !username.trim() ||
                  username.trim() === (user?.username || user?.name)
                }
                className={styles.inline_save_btn}
              >
                {isSavingUsername ? (
                  <>
                    <span className={styles.spinner_sm} />
                    <span>Đang lưu...</span>
                  </>
                ) : (
                  <>
                    <Icon name="Check" size={14} />
                    <span>Lưu tên</span>
                  </>
                )}
              </button>
            </div>
            <span className={styles.hint_text}>
              Từ 3 đến 30 ký tự, có thể dùng chữ cái, chữ số, dấu gạch dưới (_), gạch ngang (-) hoặc dấu chấm (.).
            </span>
          </div>

          {/* Card Footer Action */}
          <div className={styles.profile_card_actions}>
            <button
              type="submit"
              disabled={
                isSavingUsername ||
                !username.trim() ||
                username.trim() === (user?.username || user?.name)
              }
              className={styles.submit_btn}
            >
              {isSavingUsername ? (
                <>
                  <span className={styles.spinner_sm} />
                  <span>Đang lưu thay đổi...</span>
                </>
              ) : (
                "Lưu thay đổi hồ sơ"
              )}
            </button>
          </div>
        </div>

        {/* SECTION 2: CONTACT (EMAIL) */}
        <div className={styles.card_block}>
          <h3 className={styles.sub_title}>Thông tin liên hệ</h3>

          <div className={styles.info_row}>
            <div className={styles.info_field_wrap}>
              <label htmlFor="setting-email" className={styles.label}>
                Email
              </label>
              <input
                id="setting-email"
                type="email"
                value={user?.email || ""}
                readOnly
                className={`${styles.input} ${styles.input_wide}`}
              />
            </div>
            <button
              type="button"
              onClick={() =>
                toast.info("Vui lòng xác thực OTP qua Email để thay đổi!", "Đổi Email")
              }
              className={styles.link_btn}
            >
              Thay đổi
            </button>
          </div>
        </div>

        {/* SECTION 3: ACCOUNT DETAILS */}
        <div className={styles.card_block}>
          <h3 className={styles.sub_title}>Thông tin tài khoản (Account)</h3>
          <div className={styles.grid_2cols}>
            <div className={styles.meta_box}>
              <span className={styles.meta_label}>Ngày tham gia (Joined date)</span>
              <span className={styles.meta_val}>
                {user?.createdAt
                  ? new Date(user.createdAt).toLocaleDateString("vi-VN")
                  : user?.joinedDate || "15/01/2026"}
              </span>
            </div>
            <div className={styles.meta_box}>
              <span className={styles.meta_label}>Mã tài khoản (Account ID)</span>
              <span className={styles.meta_val_code}>
                #{user?.accountId || user?._id || "FYSET-89412"}
              </span>
            </div>
          </div>
        </div>

        {/* Save Bar */}
        <div className={styles.actions_bar}>
          <button type="submit" disabled={isSavingUsername} className={styles.submit_btn}>
            {isSavingUsername ? "Đang lưu..." : "Lưu thay đổi"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default SettingAccount;