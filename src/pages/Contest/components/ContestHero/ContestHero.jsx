import Icon from "~/components/Icon/Icon";
import styles from "./ContestHero.module.css";

function ContestHero() {
  return (
    <section className={styles["contest-hero"]}>
      <div className={styles["contest-hero__container"]}>
        <div className={styles["contest-hero__content"]}>
          <div className={styles["contest-hero__badge-wrap"]}>
            <span className={styles["contest-hero__tag"]}>
              <Icon name="Star" size={18} />
              Chinh phục thử thách mới
            </span>
          </div>
          <h1 className={styles["contest-hero__title"]}>
            Đấu trường lập trình{" "}
            <span className={styles["contest-hero__title--highlight"]}>
              LearnFlow
            </span>
          </h1>
          <p className={styles["contest-hero__desc"]}>
            Nơi hội tụ những tài năng lập trình xuất sắc nhất. Thử thách bản
            thân qua các kỳ thi thuật toán đỉnh cao, bứt phá giới hạn kỹ
            năng và khẳng định vị thế trên bảng xếp hạng.
          </p>
          <div className={styles["contest-hero__btn-group"]}>
            <button
              type="button"
              className={`${styles["contest-hero__btn"]} ${styles["contest-hero__btn--contained"]}`}
            >
              <Icon name="Book" size={16} />
              <span>Tham gia ngay</span>
            </button>
            <button
              type="button"
              className={`${styles["contest-hero__btn"]} ${styles["contest-hero__btn--outlined"]}`}
            >
              <span>Xem luật chơi</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ContestHero;
