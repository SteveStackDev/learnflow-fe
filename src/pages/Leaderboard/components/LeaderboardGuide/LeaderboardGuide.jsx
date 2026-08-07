import Icon from "~/components/Icon/Icon";
import styles from "./LeaderboardGuide.module.css";

function LeaderboardGuide({ guides }) {
  return (
    <section className={styles["board-guide"]}>
      <div className={styles["board-guide__container"]}>
        <div className={styles["board-guide__header"]}>
          <h2 className={styles["board-guide__section-title"]}>Làm thế nào để leo hạng?</h2>
        </div>
        <div className={styles["board-guide__list"]}>
          {guides.map((obj) => (
            <div
              key={obj.id || obj.slug || obj.name || obj.title || obj}
              className={`${styles["board-guide__card"]} reveal-card`}
            >
              <div className={styles["board-guide__icon"]}>
                <Icon name={obj.iconName} size={22} />
              </div>
              <h3 className={styles["board-guide__title"]}>{obj.title}</h3>
              <p className={styles["board-guide__desc"]}>{obj.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default LeaderboardGuide;
