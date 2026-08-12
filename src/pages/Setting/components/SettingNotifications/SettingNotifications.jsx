import { useState } from "react";
import { useToast } from "~/context/ToastContext.jsx";
import styles from "./SettingNotifications.module.css";

function SettingNotifications({ userData = {} }) {
  // Category 1: Email Notifications
  const [emailNotifs, setEmailNotifs] = useState(
    userData.notifications?.email || {
      courseUpdates: true,
      contestReminders: true,
      achievement: true,
      productUpdates: false,
    },
  );

  // Category 2: Push Notifications
  const [pushNotifs, setPushNotifs] = useState(
    userData.notifications?.push || {
      messages: true,
      contest: true,
      learningReminders: true,
    },
  );

  // Category 3: In-app Notifications
  const [inAppNotifs, setInAppNotifs] = useState(
    userData.notifications?.inApp || {
      social: true,
      achievement: true,
      system: true,
    },
  );

  const { toast } = useToast();

  const handleEmailToggle = (key) => {
    setEmailNotifs((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handlePushToggle = (key) => {
    setPushNotifs((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleInAppToggle = (key) => {
    setInAppNotifs((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    toast.success("Cập nhật cài đặt thông báo thành công!", "Thông báo");
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.section_title}>Thông báo</h2>

      <form onSubmit={handleSave} className={styles.form}>
        {/* CATEGORY 1: EMAIL NOTIFICATIONS */}
        <div className={styles.card}>
          <h3 className={styles.card_title}>Thông báo Email</h3>

          <div className={styles.toggles_list}>
            <div className={styles.row_between}>
              <div>
                <span className={styles.item_title}>Cập nhật khóa học</span>
                <p className={styles.desc}>
                  Nhận email khi có bài giảng, bài tập hoặc tài liệu mới được cập nhật.
                </p>
              </div>
              <input
                type="checkbox"
                checked={emailNotifs.courseUpdates}
                onChange={() => handleEmailToggle("courseUpdates")}
                className={styles.checkbox}
              />
            </div>

            <hr className={styles.divider} />

            <div className={styles.row_between}>
              <div>
                <span className={styles.item_title}>Nhắc nhở cuộc thi</span>
                <p className={styles.desc}>
                  Nhận email nhắc nhở trước khi các kỳ thi bạn đăng ký chuẩn bị diễn ra.
                </p>
              </div>
              <input
                type="checkbox"
                checked={emailNotifs.contestReminders}
                onChange={() => handleEmailToggle("contestReminders")}
                className={styles.checkbox}
              />
            </div>

            <hr className={styles.divider} />

            <div className={styles.row_between}>
              <div>
                <span className={styles.item_title}>Thành tích & Huy hiệu</span>
                <p className={styles.desc}>
                  Nhận email chúc mừng khi mở khóa danh hiệu và cột mốc mới trên FySet.
                </p>
              </div>
              <input
                type="checkbox"
                checked={emailNotifs.achievement}
                onChange={() => handleEmailToggle("achievement")}
                className={styles.checkbox}
              />
            </div>

            <hr className={styles.divider} />

            <div className={styles.row_between}>
              <div>
                <span className={styles.item_title}>Cập nhật sản phẩm</span>
                <p className={styles.desc}>
                  Nhận bản tin tính năng mới, cải tiến nền tảng và ưu đãi học tập.
                </p>
              </div>
              <input
                type="checkbox"
                checked={emailNotifs.productUpdates}
                onChange={() => handleEmailToggle("productUpdates")}
                className={styles.checkbox}
              />
            </div>
          </div>
        </div>

        {/* CATEGORY 2: PUSH NOTIFICATIONS */}
        <div className={styles.card}>
          <h3 className={styles.card_title}>Thông báo Đẩy</h3>

          <div className={styles.toggles_list}>
            <div className={styles.row_between}>
              <div>
                <span className={styles.item_title}>Tin nhắn</span>
                <p className={styles.desc}>Thông báo đẩy tức thì khi bạn nhận được tin nhắn mới.</p>
              </div>
              <input
                type="checkbox"
                checked={pushNotifs.messages}
                onChange={() => handlePushToggle("messages")}
                className={styles.checkbox}
              />
            </div>

            <hr className={styles.divider} />

            <div className={styles.row_between}>
              <div>
                <span className={styles.item_title}>Cuộc thi</span>
                <p className={styles.desc}>
                  Thông báo đẩy về thời gian bắt đầu và kết quả kỳ thi thi đấu.
                </p>
              </div>
              <input
                type="checkbox"
                checked={pushNotifs.contest}
                onChange={() => handlePushToggle("contest")}
                className={styles.checkbox}
              />
            </div>

            <hr className={styles.divider} />

            <div className={styles.row_between}>
              <div>
                <span className={styles.item_title}>Nhắc nhở học tập</span>
                <p className={styles.desc}>
                  Nhắc nhở duy trì chuỗi học tập hàng ngày (Streak) đúng giờ.
                </p>
              </div>
              <input
                type="checkbox"
                checked={pushNotifs.learningReminders}
                onChange={() => handlePushToggle("learningReminders")}
                className={styles.checkbox}
              />
            </div>
          </div>
        </div>

        {/* CATEGORY 3: IN-APP NOTIFICATIONS */}
        <div className={styles.card}>
          <h3 className={styles.card_title}>Thông báo Trong ứng dụng</h3>

          <div className={styles.toggles_list}>
            <div className={styles.row_between}>
              <div>
                <span className={styles.item_title}>Tương tác xã hội</span>
                <p className={styles.desc}>
                  Hiển thị thông báo khi có người theo dõi, thích hoặc nhắc đến bạn.
                </p>
              </div>
              <input
                type="checkbox"
                checked={inAppNotifs.social}
                onChange={() => handleInAppToggle("social")}
                className={styles.checkbox}
              />
            </div>

            <hr className={styles.divider} />

            <div className={styles.row_between}>
              <div>
                <span className={styles.item_title}>Thành tích</span>
                <p className={styles.desc}>
                  Hiển thị banner ăn mừng ngay màn hình khi nhận huy hiệu mới.
                </p>
              </div>
              <input
                type="checkbox"
                checked={inAppNotifs.achievement}
                onChange={() => handleInAppToggle("achievement")}
                className={styles.checkbox}
              />
            </div>

            <hr className={styles.divider} />

            <div className={styles.row_between}>
              <div>
                <span className={styles.item_title}>Hệ thống</span>
                <p className={styles.desc}>
                  Thông báo quan trọng về lịch bảo trì và cập nhật từ hệ thống.
                </p>
              </div>
              <input
                type="checkbox"
                checked={inAppNotifs.system}
                onChange={() => handleInAppToggle("system")}
                className={styles.checkbox}
              />
            </div>
          </div>
        </div>

        {/* Save Bar */}
        <div className={styles.actions}>
          <button type="submit" className={styles.submit_btn}>
            Lưu cài đặt thông báo
          </button>
        </div>
      </form>
    </div>
  );
}

export default SettingNotifications;
