import Icon from "~/components/Icon/Icon";
import heroUrl from "~/assets/images/Home/hero.webp";
import styles from "./AboutFeatures.module.css";

function AboutFeatures({ features }) {
  return (
    <section className={styles["about-features"]}>
      <div className={styles["about-features__container"]}>
        <div className={styles["about-features__content"]}>
          <h2 className={styles["about-features__title"]}>
            FySet là gì? <br /> Hệ sinh thái học tập có định hướng
          </h2>

          <div className={styles["about-features__list"]}>
            {features.map((obj) => {
              return (
                <div
                  key={obj.id || obj.slug || obj.name || obj.title || obj}
                  className={`${styles["about-features__item"]} reveal-card`}
                >
                  <span className={styles["about-features__icon"]}>
                    <Icon name={obj.iconName} size={22} />
                  </span>
                  <div className={styles["about-features__info"]}>
                    <h3 className={styles["about-features__item-title"]}>{obj.title}</h3>
                    <p className={styles["about-features__desc"]}>{obj.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className={styles["about-features__media"]}>
          <img
            className={styles["about-features__img"]}
            src={heroUrl}
            alt="Feature Showcase"
            loading="lazy"
            decoding="async"
          />
        </div>
      </div>
    </section>
  );
}

export default AboutFeatures;
