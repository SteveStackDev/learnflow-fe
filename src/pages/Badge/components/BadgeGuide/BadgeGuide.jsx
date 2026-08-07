import Icon from "~/components/Icon/Icon";
import styles from "./BadgeGuide.module.css";

function BadgeGuide({ guides }) {
  return (
    <section className={styles["badge-guide"]}>
      <div className={styles["badge-guide__container"]}>
        <div className={styles["badge-guide__header"]}>
          <h2 className={styles["badge-guide__section-title"]}>
            Làm thế nào để kiếm Badge?
          </h2>
        </div>
        <div className={styles["badge-guide__list"]}>
          {guides.map((obj) => (
            <div key={obj.id} className={`${styles["badge-guide__card"]} reveal-card`}>
              <div className={styles["badge-guide__icon"]}>
                <Icon name={obj.iconName} size={24} />
              </div>
              <h3 className={styles["badge-guide__title"]}>{obj.title}</h3>
              <p className={styles["badge-guide__desc"]}>
                {obj.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default BadgeGuide;
