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
            Bảng Xếp Hạng{" "}
            <span className={styles["board-hero__title--highlight"]}>
              Vinh&nbsp;Danh&nbsp;Tài&nbsp;Năng
            </span>
          </h1>
          <p className={styles["board-hero__desc"]}>
            Nơi tôn vinh nỗ lực học tập không ngừng nghỉ của những nhà phát triển xuất sắc nhất trên
            LearnFlow.
          </p>
        </div>
      </div>
    </section>
  );
}

export default LeaderboardHero;
