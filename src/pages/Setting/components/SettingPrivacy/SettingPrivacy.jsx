import { useState, useRef, useEffect } from "react";
import { useToast } from "~/context/ToastContext.jsx";
import Icon from "~/components/Icon/Icon";
import styles from "./SettingPrivacy.module.css";

const SOCIAL_OPTIONS = [
  { value: "everyone", label: "Mọi người" },
  { value: "friends", label: "Chỉ bạn bè" },
  { value: "nobody", label: "Không ai" },
];

function CustomSelect({ id, value, onChange, options }) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  const selectedOption = options.find((opt) => opt.value === value) || options[0];

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className={styles.custom_select_container} ref={containerRef}>
      <button
        id={id}
        type="button"
        className={`${styles.custom_select_btn} ${isOpen ? styles["custom_select_btn--open"] : ""}`}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <span>{selectedOption.label}</span>
        <Icon
          name="ChevronDown"
          size={16}
          className={`${styles.custom_select_chevron} ${isOpen ? styles["custom_select_chevron--rotated"] : ""}`}
        />
      </button>

      {isOpen && (
        <div className={styles.custom_select_menu}>
          {options.map((opt) => {
            const isSelected = opt.value === value;
            return (
              <button
                key={opt.value}
                type="button"
                className={`${styles.custom_select_option} ${isSelected ? styles["custom_select_option--selected"] : ""}`}
                onClick={() => {
                  onChange(opt.value);
                  setIsOpen(false);
                }}
              >
                <span>{opt.label}</span>
                {isSelected && <Icon name="Check" size={14} className={styles.option_check_icon} />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

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
      <h2 className={styles.section_title}>Quyền riêng tư</h2>

      <form onSubmit={handleSave} className={styles.form}>
        {/* SECTION 1: PROFILE VISIBILITY */}
        <div className={styles.card}>
          <h3 className={styles.card_title}>Hiển thị hồ sơ</h3>
          <p className={styles.desc}>Thiết lập mức độ công khai hồ sơ của bạn trên hệ thống.</p>

          <div className={styles.radio_group}>
            <label className={styles.radio_label}>
              <input
                type="radio"
                name="profileVisibility"
                value="public"
                checked={profileVisibility === "public"}
                onChange={(e) => setProfileVisibility(e.target.value)}
                className={styles.radio}
              />
              <div>
                <span className={styles.radio_title}>Công khai</span>
                <span className={styles.radio_desc}>
                  Tất cả mọi người trên FySet đều có thể xem trang cá nhân của bạn.
                </span>
              </div>
            </label>

            <label className={styles.radio_label}>
              <input
                type="radio"
                name="profileVisibility"
                value="friends"
                checked={profileVisibility === "friends"}
                onChange={(e) => setProfileVisibility(e.target.value)}
                className={styles.radio}
              />
              <div>
                <span className={styles.radio_title}>Bạn bè / Người theo dõi</span>
                <span className={styles.radio_desc}>
                  Chỉ những người bạn kết nối hoặc theo dõi mới xem được thông tin.
                </span>
              </div>
            </label>

            <label className={styles.radio_label}>
              <input
                type="radio"
                name="profileVisibility"
                value="private"
                checked={profileVisibility === "private"}
                onChange={(e) => setProfileVisibility(e.target.value)}
                className={styles.radio}
              />
              <div>
                <span className={styles.radio_title}>Riêng tư</span>
                <span className={styles.radio_desc}>
                  Chỉ duy nhất mình bạn có thể xem trang cá nhân.
                </span>
              </div>
            </label>
          </div>
        </div>

        {/* SECTION 2: ACTIVITY */}
        <div className={styles.card}>
          <h3 className={styles.card_title}>Hoạt động</h3>
          <p className={styles.sub_label}>Cho phép hiển thị:</p>

          <div className={styles.toggles_list}>
            <div className={styles.row_between}>
              <div>
                <span className={styles.toggle_title}>Hoạt động học tập</span>
                <span className={styles.toggle_desc}>
                  Hiển thị thời gian và lộ trình học tập hàng ngày
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
                <span className={styles.toggle_title}>Bài tập đã giải</span>
                <span className={styles.toggle_desc}>
                  Công khai danh sách các bài tập thuật toán bạn đã vượt qua
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
              <CustomSelect
                id="privacy-follow"
                value={whoCanFollow}
                onChange={setWhoCanFollow}
                options={SOCIAL_OPTIONS}
              />
            </div>

            {/* Who can message me */}
            <div className={styles.select_group}>
              <label htmlFor="privacy-message" className={styles.select_label}>
                Ai có thể nhắn tin cho tôi
              </label>
              <CustomSelect
                id="privacy-message"
                value={whoCanMessage}
                onChange={setWhoCanMessage}
                options={SOCIAL_OPTIONS}
              />
            </div>

            {/* Who can mention me */}
            <div className={styles.select_group}>
              <label htmlFor="privacy-mention" className={styles.select_label}>
                Ai có thể nhắc đến tôi
              </label>
              <CustomSelect
                id="privacy-mention"
                value={whoCanMention}
                onChange={setWhoCanMention}
                options={SOCIAL_OPTIONS}
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
