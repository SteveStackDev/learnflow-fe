import Icon from "~/components/Icon/Icon";
import styles from "./HomeFeatures.module.css";

function HomeFeatures({ features }) {
  return (
    <section className={styles["home-features"]}>
      <div className={styles["home-features__container"]}>
        <div className={styles["home-features__header"]}>
          <h2 className={styles["home-features__section-title"]}>
            Tính năng nổi bật
          </h2>
          <p className={styles["home-features__section-subtitle"]}>
            Mọi công cụ bạn cần để trở thành một lập trình viên xuất sắc được
            gói gọn trong một nền tảng duy nhất.
          </p>
        </div>

        <div className={styles["home-features__list"]}>
          {features.map((obj, index) => (
            <div
              key={obj.id || obj.slug || obj.name || obj.title || obj}
              className={`${styles["home-features__card"]} reveal-card`}
              style={{ transitionDelay: `${index * 130}ms` }}
            >
              <div className={styles["home-features__card-icon"]}>
                <Icon name={obj.iconName} size={24} />
              </div>
              <h3 className={styles["home-features__card-title"]}>
                {obj.title}
              </h3>
              <p className={styles["home-features__card-desc"]}>
                {obj.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default HomeFeatures;
