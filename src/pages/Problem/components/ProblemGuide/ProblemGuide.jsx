import Icon from "~/components/Icon/Icon";
import styles from "./ProblemGuide.module.css";

function ProblemGuide({ guides }) {
  return (
    <section className={styles["prob-guide"]}>
      <div className={styles["prob-guide__container"]}>
        <div className={styles["prob-guide__header"]}>
          <h2 className={styles["prob-guide__section-title"]}>
            Cách luyện tập hiệu quả trên FySet
          </h2>
          <p className={styles["prob-guide__section-subtitle"]}>
            Phương pháp tiếp cận khoa học giúp bạn nắm vững kiến thức nhanh hơn.
          </p>
        </div>

        <div className={styles["prob-guide__list"]}>
          {guides.map((obj) => (
            <div
              key={obj.id || obj.slug || obj.name || obj.title || obj}
              className={`${styles["prob-guide__card"]} reveal-card`}
            >
              <div className={styles["prob-guide__icon"]}>
                <Icon name={obj.iconName} size={24} />
              </div>
              <h3 className={styles["prob-guide__title"]}>{obj.title}</h3>
              <p className={styles["prob-guide__desc"]}>{obj.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ProblemGuide;
