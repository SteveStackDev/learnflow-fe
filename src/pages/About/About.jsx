import { useEffect, useState } from "react";
// Data
import { aboutData } from "./data";
// Import CSS Modules
import styles from "./About.module.css";
// Components
import Icon from "~/components/Icon/Icon";

const CAROUSEL_SLIDES = [
  {
    id: 1,
    image: "/src/assets/images/About/about-workspace.webp",
    badge: "Thực chiến 24/7",
    title: "Hệ thống luyện code tự động",
    desc: "Chấm bài tự động và phản hồi ngay lập tức trên trình duyệt."
  },
  {
    id: 2,
    image: "/src/assets/images/About/about-community.webp",
    badge: "Cộng đồng 50.000+",
    title: "Cùng nhau phát triển & Học hỏi",
    desc: "Trao đổi kinh nghiệm với các chuyên gia và học viên khác."
  },
  {
    id: 3,
    image: "/src/assets/images/About/about-roadmap.webp",
    badge: "Lộ trình bài bản",
    title: "Chinh phục kỹ năng công nghệ",
    desc: "Định hướng rõ ràng từ cơ bản đến trình độ chuyên nghiệp."
  }
];

function About() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % CAROUSEL_SLIDES.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [currentSlide]);

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev === 0 ? CAROUSEL_SLIDES.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % CAROUSEL_SLIDES.length);
  };

  // Intersection Observer for scroll animations (Staggered)
  useEffect(() => {
    let delay = 0;
    let timeoutId;
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.style.transitionDelay = `${delay * 100}ms`;
            entry.target.classList.add("reveal-card--visible");
            delay++;
            observer.unobserve(entry.target);
          }
        });
        
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
          delay = 0;
        }, 150);
      },
      { threshold: 0.1, rootMargin: "0px 0px -20px 0px" }
    );

    const cards = document.querySelectorAll(".reveal-card");
    cards.forEach((card) => {
      card.style.transitionDelay = "0ms";
      observer.observe(card);
    });

    return () => {
      observer.disconnect();
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    <>
      <div className={styles.aboutpage}>
        {/* Ambient Background Glow Orbs */}
        <div className={styles["aboutpage__orb-1"]} />
        <div className={styles["aboutpage__orb-2"]} />
        <div className={styles["aboutpage__orb-3"]} />
        <div className={styles["aboutpage__orb-4"]} />

        {/* Hero Section */}
        <section className={styles["about-hero"]}>
          <div className={styles["about-hero__container"]}>
            <div className={styles["about-hero__content"]}>
              <span className={styles["about-hero__badge"]}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
                </svg>
                Về chúng tôi
              </span>
              <h1 className={styles["about-hero__title"]}>
                Kiến tạo tương lai <br /> cho lập trình viên Việt
              </h1>
              <p className={styles["about-hero__desc"]}>
                LearnFlow không chỉ là một nền tảng học tập, mà là bệ phóng cho
                sự nghiệp công nghệ của bạn. Chúng tôi mang đến phương pháp học
                tập cá nhân hóa, giúp bạn vượt qua rào cản và làm chủ mã nguồn
                một cách tự tin nhất.
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
                        alt={slide.title}
                        className={styles["about-carousel__img"]}
                      />
                      <div className={styles["about-carousel__overlay"]} />
                      <div className={styles["about-carousel__content"]}>
                        <span className={styles["about-carousel__badge"]}>
                          {slide.badge}
                        </span>
                        <h3 className={styles["about-carousel__title"]}>
                          {slide.title}
                        </h3>
                        <p className={styles["about-carousel__desc"]}>
                          {slide.desc}
                        </p>
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
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <polyline points="15 18 9 12 15 6" />
                  </svg>
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  className={`${styles["about-carousel__arrow"]} ${styles["about-carousel__arrow--next"]}`}
                  aria-label="Next slide"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
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

        {/* 1.5 Stats Widget */}
        <section className={`${styles["about-hero__stats-widget"]} reveal-card`}>
          <div className={styles["about-hero__stats-item"]}>
            <span className={styles["about-hero__stats-value"]}>50K+</span>
            <span className={styles["about-hero__stats-label"]}>Học viên</span>
          </div>
          <div className={styles["about-hero__stats-divider"]}></div>
          <div className={styles["about-hero__stats-item"]}>
            <span className={styles["about-hero__stats-value"]}>120+</span>
            <span className={styles["about-hero__stats-label"]}>Khóa học</span>
          </div>
          <div className={styles["about-hero__stats-divider"]}></div>
          <div className={styles["about-hero__stats-item"]}>
            <span className={styles["about-hero__stats-value"]}>15+</span>
            <span className={styles["about-hero__stats-label"]}>Chủ đề lập trình</span>
          </div>
        </section>

        {/* Feature Section */}
        <section className={styles["about-features"]}>
          <div className={styles["about-features__container"]}>
            <div className={styles["about-features__content"]}>
              <h2 className={styles["about-features__title"]}>
                LearnFlow là gì? <br /> Hệ sinh thái học tập có định hướng
              </h2>

              <div className={styles["about-features__list"]}>
                {aboutData.features.map((obj, index) => {
                  return (
                    <div key={obj.id || obj.slug || obj.name || obj.title || obj} className={`${styles["about-features__item"]} reveal-card`}>
                      <span className={styles["about-features__icon"]}>
                        <Icon name={obj.iconName} size={22} />
                      </span>
                      <div className={styles["about-features__info"]}>
                        <h3 className={styles["about-features__item-title"]}>
                          {obj.title}
                        </h3>
                        <p className={styles["about-features__desc"]}>
                          {obj.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className={styles["about-features__media"]}>
              <img
                className={styles["about-features__img"]}
                src="/src/assets/images/Home/hero.webp"
                alt="Feature Showcase"
              />
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default About;
