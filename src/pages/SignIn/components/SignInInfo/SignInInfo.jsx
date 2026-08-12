import { Link } from "react-router";
import Icon from "~/components/Icon/Icon";
import styles from "./SignInInfo.module.css";

function SignInInfo({ signInData, greetingPhrases, phraseIndex, charIndex }) {
  return (
    <div className={styles["signin-info"]}>
      {/* Background Glow Orbs */}
      <div className={styles["signin-info__orb-1"]} />
      <div className={styles["signin-info__orb-2"]} />

      {/* Background Code Snippet Pattern */}
      <div className={styles["signin-info__code-pattern"]}>
        <code>{`// FySet EdTech Hub`}</code>
        <code>{`import { FySet } from "@fyset/core";`}</code>
        <code>{`const student = new FySet({`}</code>
        <code>{`  level: "Developer",`}</code>
        <code>{`  goal: "Fullstack Mastery"`}</code>
        <code>{`});`}</code>
        <code>{`student.startJourney();`}</code>
      </div>

      <div className={styles["signin-info__wrapper"]}>
        <Link to="/" className={styles["signin-info__back-btn"]}>
          <span className={styles["signin-info__back-icon"]}>←</span> Trang chủ
        </Link>

        <div className={styles["signin-info__logo-group"]}>
          <div className={styles["signin-info__logo-box"]}>
            <Icon name="PlayLogo" size={24} />
          </div>
          <span className={styles["signin-info__logo-text"]}>FySet</span>
        </div>

        <h1 className={styles["signin-info__title"]}>
          <span className={styles["signin-info__title-prefix"]}>Chào mừng bạn </span>
          <span className={styles["signin-info__title--highlight"]}>
            {greetingPhrases[phraseIndex].substring(0, charIndex)}
            <span className={styles["signin-info__cursor"]}>|</span>
          </span>
        </h1>
        <p className={styles["signin-info__desc"]}>
          Tiếp tục hành trình trở thành lập trình viên chuyên nghiệp với kho bài tập và lộ trình học
          cá nhân hóa.
        </p>

        <div className={styles["signin-info__feat-list"]}>
          {signInData.features.map((feat) => (
            <div
              key={feat.id || feat.slug || feat.name || feat.title || feat}
              className={styles["signin-info__feat-card"]}
            >
              <div className={styles["signin-info__feat-icon"]}>
                <Icon name={feat.iconName} size={20} />
              </div>
              <div className={styles["signin-info__feat-content"]}>
                <h3 className={styles["signin-info__feat-title"]}>{feat.title}</h3>
                <p className={styles["signin-info__feat-desc"]}>{feat.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SignInInfo;
