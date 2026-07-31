import { useState, useEffect, useRef } from "react";
// Data
import { courseData } from "./data";

// Images
import heroUrl from "~/assets/images/Home/hero.webp";

// Import CSS Modules
import styles from "./Course.module.css";

const SORT_OPTIONS = [
  { id: "popular", label: "Sắp xếp: Phổ biến nhất" },
  { id: "latest", label: "Sắp xếp: Mới nhất" },
  { id: "rating", label: "Sắp xếp: Đánh giá cao nhất" },
];

function Course() {
  const [activeCategoryTab, setActiveCategoryTab] = useState(0);
  const [selectedSort, setSelectedSort] = useState(SORT_OPTIONS[0]);
  const [isSortDropdownOpen, setIsSortDropdownOpen] = useState(false);
  const sortDropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (sortDropdownRef.current && !sortDropdownRef.current.contains(event.target)) {
        setIsSortDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);


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
      // Reset any inline delay if re-running
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
      <div className={styles.coursepage}>
        {/* Ambient Background Glow Orbs */}
        <div className={styles["coursepage__orb-1"]} />
        <div className={styles["coursepage__orb-2"]} />



        {/* 1. Hero Section */}
        <section className={styles["course-hero"]}>
          <div className={styles["course-hero__container"]}>
            <div className={styles["course-hero__content"]}>
              <div className={styles["course-hero__left"]}>
                <div className={styles["course-hero__badge-wrap"]}>
                  <span className={styles["course-hero__tag"]}>
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                      <path d="M6 12v5c3 3 9 3 12 0v-5" />
                    </svg>
                    Nâng tầm kỹ năng lập trình
                  </span>
                </div>
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
                <div className={styles["course-hero__img-frame"]}>
                  <img
                    src={heroUrl}
                    alt="Course Hero Image"
                    className={styles["course-hero__img"]}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 1.5 Continue Learning Widget */}
        <section className={styles["course-continue"]}>
          <div className={styles["course-continue__container"]}>
            <div className={styles["course-continue__header"]}>
              <h2 className={styles["course-continue__title"]}>Khóa học đang học</h2>
            </div>
            <div className={styles["course-continue__card"]}>
              <div className={styles["course-continue__info"]}>
                <h3 className={styles["course-continue__course-title"]}>Lập trình ReactJS Cơ bản đến Nâng cao</h3>
                <p className={styles["course-continue__lesson"]}>Bài học tiếp theo: Hooks trong React (useState, useEffect)</p>
              </div>
              <div className={styles["course-continue__progress-area"]}>
                <div className={styles["course-continue__progress-text"]}>
                  <span>Tiến độ</span>
                  <span className={styles["course-continue__percentage"]}>68%</span>
                </div>
                <div className={styles["course-continue__progress-bar-bg"]}>
                  <div className={styles["course-continue__progress-bar-fill"]} style={{ width: "68%" }}></div>
                </div>
              </div>
              <button type="button" className={styles["course-continue__btn"]}>
                Tiếp tục học
              </button>
            </div>
          </div>
        </section>

        {/* 2. Search & Stats Bar Section */}
        <section className={styles["course-search-stats"]}>
          <div className={styles["course-search-stats__container"]}>
            <div className={styles["course-search-stats__card-wrapper"]}>
              {/* Search Input */}
              <div className={styles["course-search-stats__search-box"]}>
                <span className={styles["course-search-stats__search-icon"]}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="11" cy="11" r="8" />
                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                  </svg>
                </span>
                <input
                  type="text"
                  placeholder="Tìm khóa học bạn muốn bắt đầu..."
                  className={styles["course-search-stats__search-input"]}
                />
              </div>

              {/* Custom Sort Dropdown */}
              <div
                className={styles["course-search-stats__select-wrapper"]}
                ref={sortDropdownRef}
              >
                <button
                  type="button"
                  onClick={() => setIsSortDropdownOpen(!isSortDropdownOpen)}
                  className={`${styles["course-search-stats__dropdown-btn"]} ${
                    isSortDropdownOpen ? styles["course-search-stats__dropdown-btn--open"] : ""
                  }`}
                >
                  <span>{selectedSort.label}</span>
                  <span className={styles["course-search-stats__dropdown-chevron"]}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </span>
                </button>

                {isSortDropdownOpen && (
                  <div className={styles["course-search-stats__dropdown-menu"]}>
                    {SORT_OPTIONS.map((option) => (
                      <div
                        key={option.id}
                        onClick={() => {
                          setSelectedSort(option);
                          setIsSortDropdownOpen(false);
                        }}
                        className={`${styles["course-search-stats__dropdown-item"]} ${
                          selectedSort.id === option.id
                            ? styles["course-search-stats__dropdown-item--selected"]
                            : ""
                        }`}
                      >
                        <span>{option.label}</span>
                        {selectedSort.id === option.id && (
                          <span className={styles["course-search-stats__dropdown-check"]}>
                            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                              <polyline points="20 6 9 17 4 12" />
                            </svg>
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Stats Badge */}
              <div className={styles["course-search-stats__stats-group"]}>
                <div className={styles["course-search-stats__stat-item"]}>
                  <span className={styles["course-search-stats__stat-number"]}>120+</span>
                  <span className={styles["course-search-stats__stat-label"]}>Khóa học</span>
                </div>
                <div className={styles["course-search-stats__divider"]} />
                <div className={styles["course-search-stats__stat-item"]}>
                  <span className={styles["course-search-stats__stat-number"]}>15</span>
                  <span className={styles["course-search-stats__stat-label"]}>Lĩnh vực</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 3. Filter Tabs & Header Section */}
        <section className={styles["course-filters"]}>
          <div className={styles["course-filters__container"]}>
            <div className={styles["course-filters__header-row"]}>
              <div className={styles["course-filters__title-wrap"]}>
                <h2 className={styles["course-filters__section-title"]}>
                  Tất cả khóa học
                </h2>
                <p className={styles["course-filters__section-subtitle"]}>
                  Lựa chọn lộ trình học tập tối ưu cho sự nghiệp của bạn.
                </p>
              </div>

              <div className={styles["course-filters__tab-group"]}>
                {courseData.categories.map((item, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => setActiveCategoryTab(index)}
                    className={`${styles["course-filters__tab-btn"]} ${
                      activeCategoryTab === index
                        ? styles["course-filters__tab-btn--active"]
                        : ""
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 4. Courses Cards Grid Section */}
        <section className={styles["course-grid"]}>
          <div className={styles["course-grid__container"]}>
            <div className={styles["course-grid__list"]}>
              {courseData.items.map((obj, index) => (
                <div key={index} className={`${styles["course-grid__card"]} reveal-card`}>
                  <div className={styles["course-grid__card-media-wrap"]}>
                    <span
                      className={`${styles["course-grid__level-chip"]} ${
                        obj.level === "Cơ bản"
                          ? styles["course-grid__level-chip--basic"]
                          : obj.level === "Trung cấp"
                          ? styles["course-grid__level-chip--intermediate"]
                          : styles["course-grid__level-chip--advanced"]
                      }`}
                    >
                      {obj.level}
                    </span>
                    <img
                      src={heroUrl}
                      alt={obj.title}
                      className={styles["course-grid__card-img"]}
                    />
                  </div>

                  <div className={styles["course-grid__card-body"]}>
                    <h3 className={styles["course-grid__card-title"]}>
                      {obj.title}
                    </h3>
                    <p className={styles["course-grid__card-desc"]}>
                      {obj.description}
                    </p>
                    <div className={styles["course-grid__card-meta"]}>
                      <span className={styles["course-grid__meta-text"]}>
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                          <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
                        </svg>
                        {obj.lessonsCount}
                      </span>
                      <span className={styles["course-grid__meta-text"]}>
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                          <circle cx="9" cy="7" r="4" />
                        </svg>
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

            {/* Pagination Controls */}
            <div className={styles["course-grid__pagination-wrapper"]}>
              <nav className={styles["course-grid__pagination"]}>
                <button
                  type="button"
                  className={styles["course-grid__page-btn"]}
                  disabled
                >
                  ‹
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
                  ..
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
                  ›
                </button>
              </nav>
            </div>
          </div>
        </section>

        {/* 5. Reasons Section */}
        <section className={styles["course-reasons"]}>
          <div className={styles["course-reasons__container"]}>
            <div className={styles["course-reasons__header"]}>
              <h2 className={styles["course-reasons__section-title"]}>
                Tại sao nên học khóa học tại LearnFlow?
              </h2>
              <p className={styles["course-reasons__section-subtitle"]}>
                Chúng tôi mang đến môi trường học tập lập trình khác biệt, tập trung
                vào kết quả và sự phát triển lâu dài.
              </p>
            </div>

            <div className={styles["course-reasons__list"]}>
              {courseData.benefits.map((obj, index) => (
                <div key={index} className={`${styles["course-reasons__card"]} reveal-card`}>
                  <div className={styles["course-reasons__icon"]}>
                    {index === 0 && (
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                        <path d="M6 12v5c3 3 9 3 12 0v-5" />
                      </svg>
                    )}
                    {index === 1 && (
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6" />
                        <line x1="8" y1="2" x2="8" y2="18" />
                        <line x1="16" y1="6" x2="16" y2="22" />
                      </svg>
                    )}
                    {index === 2 && (
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                        <line x1="8" y1="21" x2="16" y2="21" />
                        <line x1="12" y1="17" x2="12" y2="21" />
                      </svg>
                    )}
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

        {/* 6. FAQ Section */}
        <section className={styles["course-faq"]}>
          <div className={styles["course-faq__container"]}>
            <div className={styles["course-faq__header"]}>
              <h2 className={styles["course-faq__section-title"]}>
                Câu hỏi thường gặp
              </h2>
            </div>

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
                    <span className={styles["course-faq__accordion-icon"]}>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <polyline points="6 9 12 15 18 9" />
                      </svg>
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
