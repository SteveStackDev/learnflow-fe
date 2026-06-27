// Data
import { courseData } from "./data";

// Images
import heroUrl from "~/assets/images/Home/hero.webp";

// Import CSS Modules
import styles from "./Course.module.css";

function Course() {
  return (
    <>
      <div className={styles.coursepage}>
        {/* Hero Section */}
        <section className={styles["course-hero"]}>
          <div className={styles["course-hero__container"]}>
            <div className={styles["course-hero__content"]}>
              <span className={styles["course-hero__tag"]}>
                Nâng tầm kỹ năng lập trình
              </span>
              <h1 className={styles["course-hero__title"]}>
                Khám phá khóa học phù hợp với mục tiêu của bạn
              </h1>
              <p className={styles["course-hero__desc"]}>
                Hệ thống khóa học từ cơ bản đến nâng cao, được thiết kế bởi các
                chuyên gia để giúp bạn trở thành lập trình viên thực thụ.
              </p>
              <div className={styles["course-hero__btn-group"]}>
                <button
                  type="button"
                  className={`${styles["course-hero__btn"]} ${styles["course-hero__btn--contained"]}`}
                >
                  Bắt đầu học ngay
                </button>
                <button
                  type="button"
                  className={`${styles["course-hero__btn"]} ${styles["course-hero__btn--outlined"]}`}
                >
                  Tìm hiểu thêm
                </button>
              </div>
            </div>
            <div className={styles["course-hero__media"]}>
              <img
                src={heroUrl}
                alt="Hero Image"
                className={styles["course-hero__img"]}
              />
            </div>
          </div>
        </section>

        {/* Search & Stats Section */}
        <section className={styles["course-search-stats"]}>
          <div className={styles["course-search-stats__container"]}>
            <div className={styles["course-search-stats__row"]}>
              <input
                type="text"
                placeholder="Tìm khóa học bạn muốn bắt đầu..."
                className={styles["course-search-stats__search-input"]}
              />

              <div className={styles["course-search-stats__select-wrapper"]}>
                <select
                  defaultValue="popular"
                  className={styles["course-search-stats__select"]}
                >
                  <option value="popular">Sắp xếp: Phổ biến nhất</option>
                </select>
              </div>

              <div className={styles["course-search-stats__stats-group"]}>
                <div className={styles["course-search-stats__stat-item"]}>
                  <span className={styles["course-search-stats__stat-number"]}>
                    120+
                  </span>
                  <span className={styles["course-search-stats__stat-label"]}>
                    Khóa học
                  </span>
                </div>
                <div className={styles["course-search-stats__stat-item"]}>
                  <span className={styles["course-search-stats__stat-number"]}>
                    15
                  </span>
                  <span className={styles["course-search-stats__stat-label"]}>
                    Lĩnh vực
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Filter Section */}
        <section className={styles["course-filters"]}>
          <div className={styles["course-filters__container"]}>
            <h2 className={styles["course-filters__section-title"]}>
              Tất cả khóa học
            </h2>
            <p className={styles["course-filters__section-subtitle"]}>
              Lựa chọn lộ trình học tập tối ưu cho sự nghiệp của bạn.
            </p>
            <div className={styles["course-filters__tab-group"]}>
              {courseData.categories.map((item, index) => (
                <button
                  key={index}
                  type="button"
                  className={`${styles["course-filters__tab-btn"]} ${
                    index === 0 ? styles["course-filters__tab-btn--active"] : ""
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Courses Section */}
        <section className={styles["course-grid"]}>
          <div className={styles["course-grid__container"]}>
            <div className={styles["course-grid__list"]}>
              {courseData.items.map((obj, index) => (
                <div key={index} className={styles["course-grid__card"]}>
                  <div className={styles["course-grid__card-header"]}>
                    <span className={styles["course-grid__level-chip"]}>
                      {obj.level}
                    </span>
                  </div>
                  <img
                    src={obj.imageUrl}
                    alt={obj.title}
                    className={styles["course-grid__card-img"]}
                  />
                  <div className={styles["course-grid__card-body"]}>
                    <h3 className={styles["course-grid__card-title"]}>
                      {obj.title}
                    </h3>
                    <p className={styles["course-grid__card-desc"]}>
                      {obj.description}
                    </p>
                    <div className={styles["course-grid__card-meta"]}>
                      <span className={styles["course-grid__meta-text"]}>
                        {obj.lessonsCount}
                      </span>
                      <span className={styles["course-grid__meta-text"]}>
                        {obj.studentsCount} học viên
                      </span>
                    </div>
                  </div>
                  <div className={styles["course-grid__card-actions"]}>
                    <button
                      type="button"
                      className={styles["course-grid__action-btn"]}
                    >
                      Xem chi tiết
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div className={styles["course-grid__pagination-wrapper"]}>
              <nav className={styles["course-grid__pagination"]}>
                <button
                  type="button"
                  className={styles["course-grid__page-btn"]}
                  disabled
                >
                  «
                </button>
                <button
                  type="button"
                  className={`${styles["course-grid__page-btn"]} ${styles["course-grid__page-btn--active"]}`}
                >
                  1
                </button>
                <button
                  type="button"
                  className={styles["course-grid__page-btn"]}
                >
                  2
                </button>
                <button
                  type="button"
                  className={styles["course-grid__page-btn"]}
                >
                  3
                </button>
                <span className={styles["course-grid__page-ellipsis"]}>
                  ...
                </span>
                <button
                  type="button"
                  className={styles["course-grid__page-btn"]}
                >
                  7
                </button>
                <button
                  type="button"
                  className={styles["course-grid__page-btn"]}
                >
                  »
                </button>
              </nav>
            </div>
          </div>
        </section>

        {/* Reason Section */}
        <section className={styles["course-reasons"]}>
          <div className={styles["course-reasons__container"]}>
            <h2
              className={`${styles["course-reasons__section-title"]} ${styles["course-reasons__section-title--center"]}`}
            >
              Tại sao nên học khóa học tại LearnFlow?
            </h2>
            <p
              className={`${styles["course-reasons__section-subtitle"]} ${styles["course-reasons__section-subtitle--center"]}`}
            >
              Chúng tôi mang đến môi trường học tập trình khác biệt, tập trung
              vào kết quả và sự phát triển lâu dài.
            </p>
            <div className={styles["course-reasons__list"]}>
              {courseData.benefits.map((obj, index) => (
                <div key={index} className={styles["course-reasons__card"]}>
                  <div className={styles["course-reasons__icon"]}>
                    {obj.iconName}
                  </div>
                  <h3 className={styles["course-reasons__title"]}>
                    {obj.title}
                  </h3>
                  <p className={styles["course-reasons__desc"]}>
                    {obj.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className={styles["course-faq"]}>
          <div className={styles["course-faq__container"]}>
            <h2 className={styles["course-faq__section-title"]}>
              Câu hỏi thường gặp
            </h2>
            <div className={styles["course-faq__accordion-group"]}>
              {courseData.faqs.map((obj, index) => (
                <details
                  key={index}
                  open={index === 0}
                  className={styles["course-faq__accordion"]}
                >
                  <summary className={styles["course-faq__accordion-summary"]}>
                    <span className={styles["course-faq__accordion-title"]}>
                      {obj.question}
                    </span>
                  </summary>
                  <div className={styles["course-faq__accordion-details"]}>
                    <p>{obj.answer}</p>
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default Course;
