import { useState } from "react";
import { useToast } from "~/context/ToastContext.jsx";
import Icon from "~/components/Icon/Icon";
import { DropdownMenu } from "~/components/ui";
import styles from "./SettingPrivacy.module.css";

const SOCIAL_OPTIONS = [
  { value: "everyone", label: "Mọi người" },
  { value: "friends", label: "Chỉ bạn bè" },
  { value: "nobody", label: "Không ai" },
];

function SettingPrivacy({ userData = {} }) {
  // 1. Profile Visibility
  const [profileVisibility, setProfileVisibility] = useState(
    userData.privacy?.profileVisibility || "public",
  );

  // 2. Activity Toggles
  const [showLearningActivity, setShowLearningActivity] = useState(
    userData.privacy?.showLearningActivity ?? true,
  );
  const [showSolvedProblems, setShowSolvedProblems] = useState(
    userData.privacy?.showSolvedProblems ?? true,
  );
  const [showCourseProgress, setShowCourseProgress] = useState(
    userData.privacy?.showCourseProgress ?? true,
  );
  const [showBadges, setShowBadges] = useState(userData.privacy?.showBadges ?? true);
  const [showContestStats, setShowContestStats] = useState(
    userData.privacy?.showContestStats ?? true,
  );

  // 3. Social Selects
  const [whoCanFollow, setWhoCanFollow] = useState(userData.privacy?.whoCanFollow || "everyone");
  const [whoCanMessage, setWhoCanMessage] = useState(userData.privacy?.whoCanMessage || "friends");
  const [whoCanMention, setWhoCanMention] = useState(userData.privacy?.whoCanMention || "everyone");

  const { toast } = useToast();

  const handleSave = (e) => {
    e.preventDefault();
    toast.success("Cập nhật thiết lập quyền riêng tư thành công!", "Quyền riêng tư");
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSave}>
        {/* SECTION 1: PROFILE VISIBILITY */}
        <div className={styles.card}>
          <h3 className={styles.card_title}>Chế độ hiển thị trang cá nhân</h3>
          <p className={styles.card_desc}>
            Quyết định ai có thể truy cập và xem thông tin trang cá nhân của bạn.
          </p>

          <div className={styles.radio_group}>
            {/* Public */}
            <label
              className={`${styles.radio_card} ${
                profileVisibility === "public" ? styles["radio_card--active"] : ""
              }`}
            >
              <input
                type="radio"
                name="profileVisibility"
                value="public"
                checked={profileVisibility === "public"}
                onChange={(e) => setProfileVisibility(e.target.value)}
                className={styles.radio_input}
              />
              <div className={styles.radio_content}>
                <div className={styles.radio_header}>
                  <Icon name="Globe" size={18} className={styles.radio_icon} />
                  <span className={styles.radio_title}>Công khai (Public)</span>
                </div>
                <span className={styles.radio_desc}>
                  Tất cả người dùng FySet và khách truy cập đều có thể xem trang cá nhân của bạn.
                </span>
              </div>
            </label>

            {/* Followers only */}
            <label
              className={`${styles.radio_card} ${
                profileVisibility === "followers" ? styles["radio_card--active"] : ""
              }`}
            >
              <input
                type="radio"
                name="profileVisibility"
                value="followers"
                checked={profileVisibility === "followers"}
                onChange={(e) => setProfileVisibility(e.target.value)}
                className={styles.radio_input}
              />
              <div className={styles.radio_content}>
                <div className={styles.radio_header}>
                  <Icon name="Users" size={18} className={styles.radio_icon} />
                  <span className={styles.radio_title}>Người theo dõi</span>
                </div>
                <span className={styles.radio_desc}>
                  Chỉ những tài khoản đang theo dõi bạn mới có thể xem thông tin chi tiết.
                </span>
              </div>
            </label>

            {/* Private */}
            <label
              className={`${styles.radio_card} ${
                profileVisibility === "private" ? styles["radio_card--active"] : ""
              }`}
            >
              <input
                type="radio"
                name="profileVisibility"
                value="private"
                checked={profileVisibility === "private"}
                onChange={(e) => setProfileVisibility(e.target.value)}
                className={styles.radio_input}
              />
              <div className={styles.radio_content}>
                <div className={styles.radio_header}>
                  <Icon name="Lock" size={18} className={styles.radio_icon} />
                  <span className={styles.radio_title}>Riêng tư (Private)</span>
                </div>
                <span className={styles.radio_desc}>
                  Chỉ bạn mới có thể xem đầy đủ thông tin cá nhân trên trang cá nhân.
                </span>
              </div>
            </label>
          </div>
        </div>

        {/* SECTION 2: ACTIVITY & DATA SHARING */}
        <div className={styles.card}>
          <h3 className={styles.card_title}>Hoạt động & Dữ liệu</h3>

          <div className={styles.toggle_list}>
            <div className={styles.row_between}>
              <div>
                <span className={styles.toggle_title}>Hoạt động học tập gần đây</span>
                <span className={styles.toggle_desc}>
                  Hiển thị chuỗi ngày học (Streak) và lịch sử tham gia khóa học
                </span>
              </div>
              <input
                type="checkbox"
                checked={showLearningActivity}
                onChange={(e) => setShowLearningActivity(e.target.checked)}
                className={styles.checkbox}
              />
            </div>

            <hr className={styles.divider} />

            <div className={styles.row_between}>
              <div>
                <span className={styles.toggle_title}>Danh sách bài tập đã giải</span>
                <span className={styles.toggle_desc}>
                  Cho phép mọi người xem số bài tập bạn đã nộp thành công
                </span>
              </div>
              <input
                type="checkbox"
                checked={showSolvedProblems}
                onChange={(e) => setShowSolvedProblems(e.target.checked)}
                className={styles.checkbox}
              />
            </div>

            <hr className={styles.divider} />

            <div className={styles.row_between}>
              <div>
                <span className={styles.toggle_title}>Tiến độ khóa học</span>
                <span className={styles.toggle_desc}>
                  Cho phép xem % hoàn thành các khóa học bạn đang tham gia
                </span>
              </div>
              <input
                type="checkbox"
                checked={showCourseProgress}
                onChange={(e) => setShowCourseProgress(e.target.checked)}
                className={styles.checkbox}
              />
            </div>

            <hr className={styles.divider} />

            <div className={styles.row_between}>
              <div>
                <span className={styles.toggle_title}>Danh hiệu & Huy hiệu</span>
                <span className={styles.toggle_desc}>
                  Khoe bộ sưu tập huy hiệu thành tích trên hồ sơ
                </span>
              </div>
              <input
                type="checkbox"
                checked={showBadges}
                onChange={(e) => setShowBadges(e.target.checked)}
                className={styles.checkbox}
              />
            </div>

            <hr className={styles.divider} />

            <div className={styles.row_between}>
              <div>
                <span className={styles.toggle_title}>Thống kê cuộc thi</span>
                <span className={styles.toggle_desc}>
                  Hiển thị điểm số, thứ hạng thi đấu rèn luyện
                </span>
              </div>
              <input
                type="checkbox"
                checked={showContestStats}
                onChange={(e) => setShowContestStats(e.target.checked)}
                className={styles.checkbox}
              />
            </div>
          </div>
        </div>

        {/* SECTION 3: SOCIAL */}
        <div className={styles.card}>
          <h3 className={styles.card_title}>Tương tác xã hội</h3>

          <div className={styles.select_grid}>
            {/* Who can follow me */}
            <div className={styles.select_group}>
              <label htmlFor="privacy-follow" className={styles.select_label}>
                Ai có thể theo dõi tôi
              </label>
              <DropdownMenu
                options={SOCIAL_OPTIONS}
                value={whoCanFollow}
                onChange={setWhoCanFollow}
              />
            </div>

            {/* Who can message me */}
            <div className={styles.select_group}>
              <label htmlFor="privacy-message" className={styles.select_label}>
                Ai có thể nhắn tin cho tôi
              </label>
              <DropdownMenu
                options={SOCIAL_OPTIONS}
                value={whoCanMessage}
                onChange={setWhoCanMessage}
              />
            </div>

            {/* Who can mention me */}
            <div className={styles.select_group}>
              <label htmlFor="privacy-mention" className={styles.select_label}>
                Ai có thể nhắc đến tôi
              </label>
              <DropdownMenu
                options={SOCIAL_OPTIONS}
                value={whoCanMention}
                onChange={setWhoCanMention}
              />
            </div>
          </div>
        </div>

        {/* Save Bar */}
        <div className={styles.actions}>
          <button type="submit" className={styles.submit_btn}>
            Lưu thiết lập
          </button>
        </div>
      </form>
    </div>
  );
}

export default SettingPrivacy;
