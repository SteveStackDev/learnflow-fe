import { Link } from "react-router";
import Icon from "~/components/Icon/Icon";
import styles from "./SignUpInfo.module.css";

function SignUpInfo({ signUpData }) {
  return (
    <div className={styles["signup-info"]}>
      <div className={styles["signup-info__wrapper"]}>
        <Link to="/" className={styles["signup-info__back-btn"]}>
          <span className={styles["signup-info__back-icon"]}>←</span>
          <span>Quay về Trang chủ</span>
        </Link>

        <div className={styles["signup-info__logo-group"]}>
          <div className={styles["signup-info__logo-box"]}>
            <Icon name="Layers" size={22} strokeWidth={2.5} />
          </div>
          <span className={styles["signup-info__logo-text"]}>LearnFlow</span>
        </div>

        <h1 className={styles["signup-info__title"]}>
          Bắt đầu hành trình{" "}
          <span className={styles["signup-info__title--highlight"]}>học tập</span> cùng LearnFlow
        </h1>
        <p className={styles["signup-info__desc"]}>
          Tham gia cùng hàng ngàn học viên khác để xây dựng kỹ năng lập trình bền vững qua các lộ
          trình học bài bản và dự án thực tế.
        </p>

        <div className={styles["signup-info__benefits-stack"]}>
          {signUpData.benefits.map((obj) => (
            <div
              key={obj.id || obj.slug || obj.name || obj.title || obj}
              className={styles["signup-info__benefit-card"]}
            >
              <div className={styles["signup-info__benefit-icon"]}>
                <Icon name={obj.iconName} size={20} />
              </div>
              <div className={styles["signup-info__benefit-content"]}>
                <h3 className={styles["signup-info__benefit-title"]}>{obj.title}</h3>
                <p className={styles["signup-info__benefit-desc"]}>{obj.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SignUpInfo;
