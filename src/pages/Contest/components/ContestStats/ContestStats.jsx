import Icon from "~/components/Icon/Icon";
import styles from "./ContestStats.module.css";

function ContestStats({ stats, totalContests }) {
  return (
    <section className={styles["contest-stats"]}>
      <div className={styles["contest-stats__container"]}>
        <div className={styles["contest-stats__list"]}>
          {stats.map((obj, index) => (
            <div key={obj.id || obj.slug || obj.name || obj.title || obj} className={`${styles["contest-stats__card"]} reveal-card`}>
              <div
                className={`${styles["contest-stats__icon"]} ${
                  index === 0
                    ? styles["contest-stats__icon--blue"]
                    : index === 1
                    ? styles["contest-stats__icon--yellow"]
                    : styles["contest-stats__icon--purple"]
                }`}
              >
                <Icon name={obj.iconName} size={22} />
              </div>
              <div className={styles["contest-stats__info"]}>
                <span className={styles["contest-stats__label"]}>
                  {obj.title}
                </span>
                <span className={styles["contest-stats__value"]}>
                  {obj.title === "Tổng Contest" ? totalContests : obj.value}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ContestStats;
