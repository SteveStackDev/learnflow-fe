import AnimatedCounter from "~/components/AnimatedCounter/AnimatedCounter";
import styles from "./HomeStats.module.css";

function HomeStats({ stats }) {
  return (
    <section className={styles["home-stats"]}>
      <div className={styles["home-stats__container"]}>
        <div className={styles["home-stats__list"]}>
          {stats.map((obj, index) => (
            <div
              key={obj.id || obj.slug || obj.name || obj.title || obj}
              className={`${styles["home-stats__card"]} reveal-card`}
              style={{ transitionDelay: `${index * 130}ms` }}
            >
              <span className={styles["home-stats__card-number"]}>
                <AnimatedCounter value={obj.value} />
              </span>
              <p className={styles["home-stats__card-desc"]}>{obj.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default HomeStats;
