import Icon from "~/components/Icon/Icon";
import styles from "./AboutHero.module.css";

function AboutHero({ CAROUSEL_SLIDES, currentSlide, setCurrentSlide, handlePrev, handleNext }) {
  return (
    <section className={styles["about-hero"]}>
      <div className={styles["about-hero__container"]}>
        <div className={styles["about-hero__content"]}>
          <span className={styles["about-hero__badge"]}>
            <Icon name="Clock" size={16} />
            Về chúng tôi
          </span>
          <h1 className={styles["about-hero__title"]}>
            Kiến tạo tương lai <br /> cho lập trình viên Việt
          </h1>
          <p className={styles["about-hero__desc"]}>
            FySet không chỉ là một nền tảng học tập, mà là bệ phóng cho sự nghiệp công nghệ của bạn.
            Chúng tôi mang đến phương pháp học tập cá nhân hóa, giúp bạn vượt qua rào cản và làm chủ
            mã nguồn một cách tự tin nhất.
          </p>
          <div className={styles["about-hero__actions"]}>
            <button
              type="button"
              className={`${styles["about-hero__btn"]} ${styles["about-hero__btn--contained"]}`}
            >
              Khám phá lộ trình
            </button>
            <button
              type="button"
              className={`${styles["about-hero__btn"]} ${styles["about-hero__btn--outlined"]}`}
            >
              Xem video
            </button>
          </div>
        </div>

        <div className={styles["about-hero__media"]}>
          <div className={styles["about-carousel"]}>
            <div className={styles["about-carousel__slides-container"]}>
              {CAROUSEL_SLIDES.map((slide, idx) => (
                <div
                  key={slide.id}
                  className={`${styles["about-carousel__slide"]} ${
                    currentSlide === idx ? styles["about-carousel__slide--active"] : ""
                  }`}
                >
                  <img
                    src={slide.image}
                    alt={`Hình ảnh ${slide.title}`}
                    loading="lazy"
                    decoding="async"
                    className={styles["about-carousel__img"]}
                  />
                  <div className={styles["about-carousel__overlay"]} />
                  <div className={styles["about-carousel__content"]}>
                    <span className={styles["about-carousel__badge"]}>{slide.badge}</span>
                    <h3 className={styles["about-carousel__title"]}>{slide.title}</h3>
                    <p className={styles["about-carousel__desc"]}>{slide.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Arrow Navigation */}
            <button
              type="button"
              onClick={handlePrev}
              className={`${styles["about-carousel__arrow"]} ${styles["about-carousel__arrow--prev"]}`}
              aria-label="Previous slide"
            >
              <Icon name="ChevronLeft" size={16} />
            </button>
            <button
              type="button"
              onClick={handleNext}
              className={`${styles["about-carousel__arrow"]} ${styles["about-carousel__arrow--next"]}`}
              aria-label="Next slide"
            >
              <Icon name="ChevronRight" size={15} />
            </button>

            {/* Dot Pagination */}
            <div className={styles["about-carousel__dots"]}>
              {CAROUSEL_SLIDES.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setCurrentSlide(idx)}
                  className={`${styles["about-carousel__dot"]} ${
                    currentSlide === idx ? styles["about-carousel__dot--active"] : ""
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutHero;
