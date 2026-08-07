import Icon from "~/components/Icon/Icon";
import styles from "./ContactFeatures.module.css";

function ContactFeatures({ topics }) {
  return (
    <section className={styles["contact-features"]}>
      <div className={styles["contact-features__container"]}>
        <h2 className={styles["contact-features__section-title"]}>
          LearnFlow là gì? Hệ sinh thái học tập có định hướng
        </h2>
        <div className={styles["contact-features__list"]}>
          {topics.map((obj) => (
            <div
              key={obj.id || obj.slug || obj.name || obj.title || obj}
              className={`${styles["contact-features__card"]} reveal-card`}
            >
              <span className={styles["contact-features__icon"]}>
                <Icon name={obj.iconName} size={22} />
              </span>
              <h3 className={styles["contact-features__title"]}>{obj.title}</h3>
              <p className={styles["contact-features__desc"]}>{obj.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ContactFeatures;
