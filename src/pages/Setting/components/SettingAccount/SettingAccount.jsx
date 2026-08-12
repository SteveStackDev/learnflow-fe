import { useState } from "react";
import { useToast } from "~/context/ToastContext.jsx";
import Icon from "~/components/Icon/Icon";
import styles from "./SettingAccount.module.css";

function SettingAccount({ userData }) {
  const [fullname, setFullname] = useState(userData.fullname || "Nguyễn Văn A");
  const [username, setUsername] = useState(userData.username || "nguyenvana");
  const [bio, setBio] = useState(userData.bio || "");
  const [phone, setPhone] = useState(userData.phone || "+84 912 345 678");
  const [phoneVerified, setPhoneVerified] = useState(userData.phoneVerified ?? true);
  const { toast } = useToast();

  const handleSave = (e) => {
    e.preventDefault();
    toast.success("Cập nhật thông tin hồ sơ tài khoản thành công!", "Tài khoản");
  };

  const handleAvatarChange = () => {
    toast.info("Tính năng đổi ảnh đại diện đang được phát triển!", "Đổi ảnh đại diện");
  };

  const handleVerifyPhone = () => {
    if (!phoneVerified) {
      setPhoneVerified(true);
      toast.success("Xác thực số điện thoại thành công!", "Số điện thoại");
    } else {
      toast.info("Số điện thoại của bạn đã được xác thực trước đó.", "Số điện thoại");
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
              <img src={userData.avatarUrl} alt="Avatar" className={styles.avatar_img} />
              <div className={styles.avatar_meta}>
                <button type="button" onClick={handleAvatarChange} className={styles.avatar_btn}>
                  Đổi ảnh
                </button>
                <span className={styles.avatar_hint}>JPG, GIF hoặc PNG. Tối đa 2MB.</span>
              </div>
            </div>
          </div>

          <div className={styles.grid_2cols}>
            {/* Display Name */}
            <div className={styles.field_group}>
              <label htmlFor="setting-fullname" className={styles.label}>
                Tên hiển thị (Display name)
              </label>
              <input
                id="setting-fullname"
                type="text"
                value={fullname}
                onChange={(e) => setFullname(e.target.value)}
                className={styles.input}
              />
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

          {/* Bio */}
          <div className={styles.field_group}>
            <div className={styles.label_row}>
              <label htmlFor="setting-bio" className={styles.label}>
                Tiểu sử (Bio)
              </label>
              <span className={styles.char_counter}>{bio.length}/250</span>
            </div>
            <textarea
              id="setting-bio"
              rows={3}
              maxLength={250}
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Chia sẻ một chút về bản thân bạn (tối đa 250 ký tự)..."
              className={styles.textarea}
            />
          </div>
        </div>

        {/* SECTION 2: EMAIL & PHONE */}
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
                value={userData.email}
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

          {/* Phone Row */}
          <div className={styles.info_row}>
            <div className={styles.info_field_wrap}>
              <div className={styles.phone_header}>
                <label htmlFor="setting-phone" className={styles.label}>
                  Số điện thoại
                </label>
                <span
                  className={`${styles.verify_badge} ${
                    phoneVerified
                      ? styles["verify_badge--success"]
                      : styles["verify_badge--warning"]
                  }`}
                >
                  <Icon name={phoneVerified ? "CheckCircle2" : "AlertCircle"} size={13} />
                  {phoneVerified ? "Đã xác thực" : "Chưa xác thực"}
                </span>
              </div>
              <input
                id="setting-phone"
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className={`${styles.input} ${styles.input_wide}`}
              />
            </div>
            <button type="button" onClick={handleVerifyPhone} className={styles.link_btn}>
              {phoneVerified ? "Cập nhật" : "Xác thực ngay"}
            </button>
          </div>
        </div>

        {/* SECTION 3: ACCOUNT DETAILS */}
        <div className={styles.card_block}>
          <h3 className={styles.sub_title}>Thông tin tài khoản (Account)</h3>
          <div className={styles.grid_2cols}>
            <div className={styles.meta_box}>
              <span className={styles.meta_label}>Ngày tham gia (Joined date)</span>
              <span className={styles.meta_val}>{userData.joinedDate || "15/01/2026"}</span>
            </div>
            <div className={styles.meta_box}>
              <span className={styles.meta_label}>Mã tài khoản (Account ID)</span>
              <span className={styles.meta_val_code}>#{userData.accountId || "FYSET-89412"}</span>
            </div>
          </div>
        </div>

        {/* Save Bar */}
        <div className={styles.actions_bar}>
          <button type="submit" className={styles.submit_btn}>
            Lưu thay đổi
          </button>
        </div>
      </form>
    </div>
  );
}

export default SettingAccount;
