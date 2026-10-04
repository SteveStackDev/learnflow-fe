import { useState, useRef, useEffect } from "react";
import { useToast } from "~/context/ToastContext.jsx";
import userService from "./userService"; // Đảm bảo đường dẫn import đúng vị trí file userService của bạn
import styles from "./SettingAccount.module.css";

function SettingAccount({ userData }) {
  const [username, setUsername] = useState(userData?.username || "nguyenvana");
  const [avatarUrl, setAvatarUrl] = useState(() => {
    try {
      const u = JSON.parse(localStorage.getItem("fySet_user"));
      return (
        u?.avatar?.url ||
        u?.avatar ||
        userData?.avatar?.url ||
        userData?.avatarUrl ||
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
      );
    } catch {
      return (
        userData?.avatar?.url ||
        userData?.avatarUrl ||
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
      );
    }
  });

  const [isUploadingAvatar, setIsUploadingAvatar] = useState(false);
  const [isSavingUsername, setIsSavingUsername] = useState(false);
  const fileInputRef = useRef(null);
  const { toast } = useToast();

  useEffect(() => {
    if (userData?.username) {
      setUsername(userData.username);
    }
    const currentAvatar = userData?.avatar?.url || userData?.avatarUrl;
    if (currentAvatar) {
      setAvatarUrl(currentAvatar);
    }
  }, [userData]);

  const handleSave = async (e) => {
    e.preventDefault();
    if (!username || !username.trim()) {
      toast.error("Tên người dùng không được để trống!", "Tài khoản");
      return;
    }

    setIsSavingUsername(true);
    try {
      await userService.changeUsername(username.trim());

      // Đồng bộ thông tin tên người dùng mới vào localStorage
      try {
        const saved = JSON.parse(localStorage.getItem("fySet_user")) || {};
        saved.username = username.trim();
        localStorage.setItem("fySet_user", JSON.stringify(saved));
      } catch {
        // ignore
      }

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
      // Gọi API tải ảnh lên server
      const updatedUser = await userService.updateAvatar(file);
      
      // Backend trả về User document chứa avatar dạng { url, urlId }
      const newAvatarUrl = updatedUser?.avatar?.url || avatarUrl;

      setAvatarUrl(newAvatarUrl);

      // Đồng bộ vào localStorage để Header và các component khác nhận ảnh mới từ Cloudinary
      try {
        const saved = JSON.parse(localStorage.getItem("fySet_user")) || {};
        saved.avatar = updatedUser?.avatar || newAvatarUrl;
        localStorage.setItem("fySet_user", JSON.stringify(saved));
      } catch {
        // ignore
      }

      toast.success("Cập nhật ảnh đại diện thành công!", "Ảnh đại diện");
    } catch (err) {
      toast.error(err.message || "Tải ảnh lên thất bại!", "Đổi ảnh");
    } finally {
      setIsUploadingAvatar(false);
      if (e.target) e.target.value = ""; // Reset file input
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.section_title}>Tài khoản</h2>

      <form onSubmit={handleSave} className={styles.form}>
        {/* SECTION 1: PROFILE */}
        <div className={styles.card_block}>
          <h3 className={styles.sub_title}>Hồ sơ cá nhân (Profile)</h3>

          {/* Avatar Group */}
          <div className={styles.avatar_group}>
            <span className={styles.label}>Ảnh đại diện</span>
            <div className={styles.avatar_row}>
              <img
                src={avatarUrl}
                alt={`Ảnh đại diện của ${userData?.fullName || userData?.name || "người dùng"}`}
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
                  {isUploadingAvatar ? "Đang tải..." : "Đổi ảnh"}
                </button>
                <span className={styles.avatar_hint}>JPG, GIF hoặc PNG. Tối đa 2MB.</span>
              </div>
            </div>
          </div>

          {/* Username */}
          <div className={styles.field_group}>
            <label htmlFor="setting-username" className={styles.label}>
              Tên người dùng (Username)
            </label>
            <div className={styles.input_prefix_wrapper}>
              <span className={styles.prefix}>@</span>
              <input
                id="setting-username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className={`${styles.input} ${styles.input_has_prefix}`}
              />
            </div>
          </div>
        </div>

        {/* SECTION 2: CONTACT (EMAIL) */}
        <div className={styles.card_block}>
          <h3 className={styles.sub_title}>Thông tin liên hệ</h3>

          {/* Email Row */}
          <div className={styles.info_row}>
            <div className={styles.info_field_wrap}>
              <label htmlFor="setting-email" className={styles.label}>
                Email
              </label>
              <input
                id="setting-email"
                type="email"
                value={userData?.email || ""}
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
              <span className={styles.meta_val}>{userData?.joinedDate || "15/01/2026"}</span>
            </div>
            <div className={styles.meta_box}>
              <span className={styles.meta_label}>Mã tài khoản (Account ID)</span>
              <span className={styles.meta_val_code}>#{userData?.accountId || userData?._id || "FYSET-89412"}</span>
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