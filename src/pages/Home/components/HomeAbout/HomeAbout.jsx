import { Link } from "react-router";
import Icon from "~/components/Icon/Icon";
import heroUrl from "~/assets/images/Home/hero.webp";
import styles from "./HomeAbout.module.css";

function HomeAbout({ highlights }) {
  return (
    <section className={styles["home-about"]}>
      <div className={styles["home-about__container"]}>
        <div className={styles["home-about__media"]}>
          <div className={styles["home-about__img-frame"]}>
            <img
              className={styles["home-about__img"]}
              src={heroUrl}
              alt="LearnFlow About Image"
              loading="lazy"
              decoding="async"
            />
          </div>
        </div>

        <div className={styles["home-about__content"]}>
          <h2 className={styles["home-about__section-title"]}>Tại sao chọn LearnFlow?</h2>
          <p className={styles["home-about__text"]}>
            Khác với các nền tảng giải đố thuần túy như LeetCode có thể gây ngợp cho người mới,
            LearnFlow được thiết kế như một <strong>người dẫn đường</strong>. Chúng tôi không chỉ
            đưa bài tập, chúng tôi xây dựng tư duy lập trình từ những viên gạch đầu tiên.
          </p>

          <div className={styles["home-about__list"]}>
            {highlights.map((obj) => (
              <div
                key={obj.id || obj.slug || obj.name || obj.title || obj}
                className={styles["home-about__item"]}
              >
                <div className={styles["home-about__item-icon"]}>
                  <Icon name={obj.iconName} size={22} />
                </div>
                <div className={styles["home-about__item-info"]}>
                  <h3 className={styles["home-about__item-title"]}>{obj.title}</h3>
                  <p className={styles["home-about__item-desc"]}>{obj.description}</p>
                </div>
              </div>
            ))}
          </div>

          <Link
            to="/about"
            className={`${styles["home-about__btn"]} ${styles["home-about__btn--contained"]}`}
          >
            Tìm hiểu thêm về LearnFlow
          </Link>
        </div>
      </div>
    </section>
  );
}

export default HomeAbout;
