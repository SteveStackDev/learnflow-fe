import Icon from "~/components/Icon/Icon";
import styles from "./AboutValues.module.css";

function AboutValues({ values }) {
  if (!values || values.length === 0) return null;

  return (
    <section className={styles["about-values"]}>
      <div className={styles["about-values__container"]}>
        <div className={styles["about-values__header"]}>
          <span className={styles["about-values__tag"]}>Values</span>
          <h2 className={styles["about-values__title"]}>Giá trị cốt lõi & Kim chỉ nam</h2>
          <p className={styles["about-values__subtitle"]}>
            Những định hướng giúp LearnFlow không ngừng phát triển và đồng hành cùng lập trình viên
            Việt.
          </p>
        </div>

        <div className={styles["about-values__grid"]}>
          {values.map((item) => (
            <div key={item.id} className={`${styles["about-values__card"]} reveal-card`}>
              <div className={styles["about-values__icon-box"]}>
                <Icon name={item.iconName} size={24} />
              </div>
              <h3 className={styles["about-values__card-title"]}>{item.title}</h3>
              {Array.isArray(item.description) ? (
                <ul className={styles["about-values__list"]}>
                  {item.description.map((desc, idx) => (
                    <li key={idx} className={styles["about-values__list-item"]}>
                      <Icon name="CheckCircle2" size={16} />
                      <span>{desc}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className={styles["about-values__card-desc"]}>{item.description}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default AboutValues;
