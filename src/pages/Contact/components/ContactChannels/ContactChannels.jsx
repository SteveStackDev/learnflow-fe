import Icon from "~/components/Icon/Icon";
import styles from "./ContactChannels.module.css";

function ContactChannels({ departments }) {
  return (
    <section className={styles["contact-channels"]}>
      <div className={styles["contact-channels__container"]}>
        <h2 className={styles["contact-channels__section-title"]}>
          Kênh hỗ trợ chuyên biệt
        </h2>
        <div className={styles["contact-channels__list"]}>
          {departments.map((obj) => (
            <div key={obj.id || obj.slug || obj.name || obj.title || obj} className={`${styles["contact-channels__card"]} reveal-card`}>
              <span className={styles["contact-channels__icon"]}>
                <Icon name={obj.iconName} size={22} />
              </span>
              <h3 className={styles["contact-channels__title"]}>
                {obj.title}
              </h3>
              <p className={styles["contact-channels__desc"]}>
                {obj.description}
              </p>
              <a
                href={`mailto:${obj.email}`}
                className={styles["contact-channels__link"]}
              >
                {obj.email}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ContactChannels;
