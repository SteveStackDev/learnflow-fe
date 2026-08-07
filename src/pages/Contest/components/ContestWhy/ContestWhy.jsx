import Icon from "~/components/Icon/Icon";
import styles from "./ContestWhy.module.css";

function ContestWhy({ benefits }) {
  return (
    <section className={styles["contest-why"]}>
      <div className={styles["contest-why__container"]}>
        <div className={styles["contest-why__header"]}>
          <h2 className={styles["contest-why__section-title"]}>
            Tại sao nên tham gia Contest?
          </h2>
          <div className={styles["contest-why__title-line"]} />
        </div>

        <div className={styles["contest-why__list"]}>
          {benefits.map((obj) => (
            <div key={obj.id || obj.slug || obj.name || obj.title || obj} className={`${styles["contest-why__card"]} reveal-card`}>
              <div className={styles["contest-why__icon"]}>
                <Icon name={obj.iconName} size={24} />
              </div>
              <h3 className={styles["contest-why__title"]}>{obj.title}</h3>
              <p className={styles["contest-why__desc"]}>
                {obj.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ContestWhy;
