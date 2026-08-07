import Icon from "~/components/Icon/Icon";
import heroUrl from "~/assets/images/Home/hero.webp";
import styles from "./RoadmapHero.module.css";

function RoadmapHero() {
  return (
    <section className={styles["roadmap-hero"]}>
      <div className={styles["roadmap-hero__container"]}>
        <div className={styles["roadmap-hero__content"]}>
          <div className={styles["roadmap-hero__left"]}>
            <div className={styles["roadmap-hero__badge-wrap"]}>
              <span className={styles["roadmap-hero__badge"]}>
                <Icon name="Clock" size={16} />
                Định hướng tương lai
              </span>
            </div>
            <h1 className={styles["roadmap-hero__title"]}>
              Lộ Trình Nghề Nghiệp{" "}
              <span className={styles["roadmap-hero__title--highlight"]}>Công&nbsp;Nghệ</span>
            </h1>
            <p className={styles["roadmap-hero__desc"]}>
              Không còn lạc lối giữa hàng nghìn công nghệ. Chúng tôi cung cấp bản đồ học tập chi
              tiết từ con số 0 đến khi bạn sẵn sàng cho công việc mơ ước.
            </p>
            <div className={styles["roadmap-hero__btn-group"]}>
              <button
                type="button"
                className={`${styles["roadmap-hero__btn"]} ${styles["roadmap-hero__btn--contained"]}`}
              >
                <span>Khám phá ngay</span>
              </button>
              <button
                type="button"
                className={`${styles["roadmap-hero__btn"]} ${styles["roadmap-hero__btn--outlined"]}`}
              >
                Tư vấn lộ trình
              </button>
            </div>
          </div>

          <div className={styles["roadmap-hero__right"]}>
            <div className={styles["roadmap-hero__img-frame"]}>
              <img
                className={styles["roadmap-hero__img"]}
                src={heroUrl}
                alt="Hero Roadmap Image"
                loading="lazy"
                decoding="async"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default RoadmapHero;
