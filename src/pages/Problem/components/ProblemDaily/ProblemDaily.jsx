import styles from "./ProblemDaily.module.css";

function ProblemDaily() {
  return (
    <section className={styles["prob-daily"]}>
      <div className={styles["prob-daily__container"]}>
        <div className={`${styles["prob-daily__card"]} reveal-card`}>
          <div className={styles["prob-daily__info"]}>
            <div className={styles["prob-daily__badge"]}>Thử thách hằng ngày</div>
            <h3 className={styles["prob-daily__title"]}>Merge k Sorted Lists</h3>
            <p className={styles["prob-daily__desc"]}>Cho mảng k danh sách liên kết đã sắp xếp, kết hợp tất cả chúng lại thành một danh sách liên kết duy nhất.</p>
            <div className={styles["prob-daily__meta"]}>
              <span className={`${styles["prob-challenges__level-badge"]} ${styles["prob-challenges__level-badge--hard"]}`}>
                <span className={styles["prob-challenges__badge-dot"]} />
                Khó
              </span>
              <span className={styles["prob-daily__reward"]}>+50 XP</span>
            </div>
          </div>
          <div className={styles["prob-daily__action"]}>
            <div className={styles["prob-daily__timer"]}>
              <span className={styles["prob-daily__timer-label"]}>Kết thúc sau</span>
              <div className={styles["prob-daily__countdown"]}>
                <span>14</span>:<span>22</span>:<span>59</span>
              </div>
            </div>
            <button type="button" className={styles["prob-daily__btn"]}>
              Giải ngay
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProblemDaily;
