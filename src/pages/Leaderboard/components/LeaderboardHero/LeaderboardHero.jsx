import Icon from "~/components/Icon/Icon";
import styles from "./LeaderboardHero.module.css";

function LeaderboardHero() {
  return (
    <section className={styles["board-hero"]}>
      <div className={styles["board-hero__container"]}>
        <div className={styles["board-hero__content"]}>
          <div className={styles["board-hero__badge-wrap"]}>
            <span className={styles["board-hero__tag"]}>
              <Icon name="Book" size={16} />
              Bảng danh vọng
            </span>
          </div>
          <h1 className={styles["board-hero__title"]}>
            Tôn vinh nỗ lực học tập không ngừng nghỉ. Nơi những nhà phát
            triển tài năng hội ngộ, thi đua và chinh phục những đỉnh cao
            công nghệ mới mỗi ngày.
          </h1>
        </div>
      </div>
    </section>
  );
}

export default LeaderboardHero;
