import { useState, useEffect, useRef } from "react";
// Data
import { problemData } from "./data";

// Import CSS Modules
import styles from "./Problem.module.css";

const SORT_OPTIONS = [
  { id: "popular", label: "Phổ biến" },
  { id: "latest", label: "Mới nhất" },
  { id: "rate", label: "Tỷ lệ làm đúng" },
];

function Problem() {
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
      <div className={styles.problempage}>
        {/* Ambient Background Glow Orbs */}
        <div className={styles["problempage__orb-1"]} />
        <div className={styles["problempage__orb-2"]} />



        {/* 1. Hero Section */}
        <section className={styles["prob-hero"]}>
          <div className={styles["prob-hero__container"]}>
            <div className={styles["prob-hero__content"]}>
              <div className={styles["prob-hero__left"]}>
                <div className={styles["prob-hero__badge-wrap"]}>
                  <span className={styles["prob-hero__tag"]}>
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="16 18 22 12 16 6" />
                      <polyline points="8 6 2 12 8 18" />
                    </svg>
                    Thử thách lập trình thực chiến
                  </span>
                </div>
                <h1 className={styles["prob-hero__title"]}>
                  Kho Bài Tập & Thử Thách Lập Trình
                </h1>
                <p className={styles["prob-hero__desc"]}>
                  Luyện tập tư duy logic, cấu trúc dữ liệu và giải thuật thông
                  qua hệ thống bài tập thực tiễn từ cơ bản đến nâng cao. Mỗi thử
                  thách là một bước tiến gần hơn tới sự nghiệp lập trình chuyên
                  nghiệp.
                </p>
                <div className={styles["prob-hero__btn-group"]}>
                  <button
                    type="button"
                    className={`${styles["prob-hero__btn"]} ${styles["prob-hero__btn--contained"]}`}
                  >
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                      <polygon points="5 3 19 12 5 21 5 3" />
                    </svg>
                    <span>Bắt đầu ngay</span>
                  </button>
                  <button
                    type="button"
                    className={`${styles["prob-hero__btn"]} ${styles["prob-hero__btn--outlined"]}`}
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10" />
                      <polygon points="10 8 16 12 10 16 10 8" />
                    </svg>
                    <span>Xem hướng dẫn</span>
                  </button>
                </div>
              </div>

              {/* Right Side: Code Editor Mockup Card */}
              <div className={styles["prob-hero__right"]}>
                <div className={styles["prob-hero__code-card"]}>
                  <div className={styles["prob-hero__code-header"]}>
                    <div className={styles["prob-hero__code-dots"]}>
                      <span className={`${styles["prob-hero__dot"]} ${styles["prob-hero__dot--red"]}`} />
                      <span className={`${styles["prob-hero__dot"]} ${styles["prob-hero__dot--yellow"]}`} />
                      <span className={`${styles["prob-hero__dot"]} ${styles["prob-hero__dot--green"]}`} />
                    </div>
                    <span className={styles["prob-hero__code-filename"]}>
                      learnflow_algorithm.cpp
                    </span>
                  </div>

                  <div className={styles["prob-hero__code-body"]}>
                    <div className={styles["prob-hero__code-line"]}>
                      <span className={styles["prob-hero__code-comment"]}>// Tìm đường đi ngắn nhất</span>
                    </div>
                    <div className={styles["prob-hero__code-line"]}>
                      <code>
                        <span className={styles["prob-hero__code-keyword"]}>int</span> <span className={styles["prob-hero__code-func"]}>dijkstra</span>(vector&lt;vector&lt;pair&lt;<span className={styles["prob-hero__code-keyword"]}>int</span>, <span className={styles["prob-hero__code-keyword"]}>int</span>&gt;&gt;&gt;&amp; adj, <span className={styles["prob-hero__code-keyword"]}>int</span> n, <span className={styles["prob-hero__code-keyword"]}>int</span> src) &#123;
                      </code>
                    </div>
                    <div className={styles["prob-hero__code-line"]}>
                      <code>
                        &nbsp;&nbsp;priority_queue&lt;pair&lt;<span className={styles["prob-hero__code-keyword"]}>int</span>, <span className={styles["prob-hero__code-keyword"]}>int</span>&gt;, vector&lt;pair&lt;<span className={styles["prob-hero__code-keyword"]}>int</span>, <span className={styles["prob-hero__code-keyword"]}>int</span>&gt;&gt;, greater&lt;pair&lt;<span className={styles["prob-hero__code-keyword"]}>int</span>, <span className={styles["prob-hero__code-keyword"]}>int</span>&gt;&gt;&gt; pq;
                      </code>
                    </div>
                    <div className={styles["prob-hero__code-line"]}>
                      <code>
                        &nbsp;&nbsp;vector&lt;<span className={styles["prob-hero__code-keyword"]}>int</span>&gt; <span className={styles["prob-hero__code-var"]}>dist</span>(n, INF);
                      </code>
                    </div>
                    <div className={styles["prob-hero__code-line"]}>
                      <code>
                        &nbsp;&nbsp;pq.<span className={styles["prob-hero__code-method"]}>push</span>(&#123;<span className={styles["prob-hero__code-num"]}>0</span>, src&#125;);
                      </code>
                    </div>
                    <div className={styles["prob-hero__code-line"]}>
                      <code>
                        &nbsp;&nbsp;<span className={styles["prob-hero__code-var"]}>dist</span>[src] = <span className={styles["prob-hero__code-num"]}>0</span>;
                      </code>
                    </div>
                    <div className={styles["prob-hero__code-line"]}>
                      <code>
                        &nbsp;&nbsp;<span className={styles["prob-hero__code-keyword"]}>while</span>(!pq.<span className={styles["prob-hero__code-method"]}>empty</span>()) &#123; <span className={styles["prob-hero__code-comment"]}>// ...</span> &#125;
                      </code>
                    </div>
                    <div className={styles["prob-hero__code-line"]}>
                      <code>
                        &nbsp;&nbsp;<span className={styles["prob-hero__code-keyword"]}>return</span> <span className={styles["prob-hero__code-var"]}>dist</span>[target];
                      </code>
                    </div>
                    <div className={styles["prob-hero__code-line"]}>
                      <code>&#125;</code>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 1.5 Daily Challenge */}
        <section className={styles["prob-daily"]}>
          <div className={styles["prob-daily__container"]}>
            <div className={`${styles["prob-daily__card"]} reveal-card`}>
              <div className={styles["prob-daily__info"]}>
                <div className={styles["prob-daily__badge"]}>Thử thách hằng ngày</div>
                <h3 className={styles["prob-daily__title"]}>Merge k Sorted Lists</h3>
                <p className={styles["prob-daily__desc"]}>Cho mảng k danh sách liên kết đã sắp xếp, kết hợp tất cả chúng lại thành một danh sách liên kết duy nhất.</p>
                <div className={styles["prob-daily__meta"]}>
                  <span className={`${styles["prob-challenges__level-badge"]} ${styles["prob-challenges__level-badge--hard"]}`}>
                    <span className={styles["prob-challenges__badge-dot"]} />
                    Khó
                  </span>
                  <span className={styles["prob-daily__reward"]}>+50 XP</span>
                </div>
              </div>
              <div className={styles["prob-daily__action"]}>
                <div className={styles["prob-daily__timer"]}>
                  <span className={styles["prob-daily__timer-label"]}>Kết thúc sau</span>
                  <div className={styles["prob-daily__countdown"]}>
                    <span>14</span>:<span>22</span>:<span>59</span>
                  </div>
                </div>
                <button type="button" className={styles["prob-daily__btn"]}>
                  Giải ngay
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* 2. Search, Filter & Stats Section */}
        <section className={styles["prob-filter"]}>
          <div className={styles["prob-filter__container"]}>
            <div className={styles["prob-filter__card-wrapper"]}>
              <div className={styles["prob-filter__search-row"]}>
                <div className={styles["prob-filter__search-box"]}>
                  <span className={styles["prob-filter__search-icon"]}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="11" cy="11" r="8" />
                      <line x1="21" y1="21" x2="16.65" y2="16.65" />
                    </svg>
                  </span>
                  <input
                    type="text"
                    placeholder="Tìm kiếm bài tập theo tên hoặc chủ đề..."
                    className={styles["prob-filter__search-input"]}
                  />
                </div>

                {/* Custom Sort Dropdown */}
                <div
                  className={styles["prob-filter__select-wrapper"]}
                  ref={sortDropdownRef}
                >
                  <button
                    type="button"
                    onClick={() => setIsSortDropdownOpen(!isSortDropdownOpen)}
                    className={`${styles["prob-filter__dropdown-btn"]} ${
                      isSortDropdownOpen ? styles["prob-filter__dropdown-btn--open"] : ""
                    }`}
                  >
                    <span>{selectedSort.label}</span>
                    <span className={styles["prob-filter__dropdown-chevron"]}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <polyline points="6 9 12 15 18 9" />
                      </svg>
                    </span>
                  </button>

                  {isSortDropdownOpen && (
                    <div className={styles["prob-filter__dropdown-menu"]}>
                      {SORT_OPTIONS.map((option) => (
                        <div
                          key={option.id}
                          onClick={() => {
                            setSelectedSort(option);
                            setIsSortDropdownOpen(false);
                          }}
                          className={`${styles["prob-filter__dropdown-item"]} ${
                            selectedSort.id === option.id
                              ? styles["prob-filter__dropdown-item--selected"]
                              : ""
                          }`}
                        >
                          <span>{option.label}</span>
                          {selectedSort.id === option.id && (
                            <span className={styles["prob-filter__dropdown-check"]}>
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
              </div>

              {/* 3 Metric Stat Cards */}
              <div className={styles["prob-filter__stat-list"]}>
                {problemData.stats.map((obj, index) => (
                  <div key={index} className={styles["prob-filter__stat-card"]}>
                    <div
                      className={`${styles["prob-filter__stat-icon"]} ${
                        index === 0
                          ? styles["prob-filter__stat-icon--blue"]
                          : index === 1
                          ? styles["prob-filter__stat-icon--yellow"]
                          : styles["prob-filter__stat-icon--dark"]
                      }`}
                    >
                      {index === 0 && (
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <polyline points="16 18 22 12 16 6" />
                          <polyline points="8 6 2 12 8 18" />
                        </svg>
                      )}
                      {index === 1 && (
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <rect x="3" y="3" width="7" height="7" />
                          <rect x="14" y="3" width="7" height="7" />
                          <rect x="14" y="14" width="7" height="7" />
                          <rect x="3" y="14" width="7" height="7" />
                        </svg>
                      )}
                      {index === 2 && (
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <circle cx="12" cy="12" r="10" />
                          <polyline points="12 6 12 12 16 14" />
                        </svg>
                      )}
                    </div>
                    <div className={styles["prob-filter__stat-info"]}>
                      <span className={styles["prob-filter__stat-label"]}>
                        {obj.title}
                      </span>
                      <span className={styles["prob-filter__stat-value"]}>
                        {obj.value}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 3. Challenges Cards Grid Section */}
        <section className={styles["prob-challenges"]}>
          <div className={styles["prob-challenges__container"]}>
            <div className={styles["prob-challenges__header"]}>
              <h2 className={styles["prob-challenges__section-title"]}>
                Danh sách thử thách
              </h2>
            </div>

            <div className={styles["prob-challenges__list"]}>
              {problemData.items.map((obj, index) => (
                <div key={index} className={`${styles["prob-challenges__card"]} reveal-card`}>
                  <div className={styles["prob-challenges__card-header"]}>
                    <div className={styles["prob-challenges__card-icon"]}>
                      {index === 0 && (
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <circle cx="12" cy="12" r="10" />
                          <line x1="12" y1="8" x2="12" y2="16" />
                          <line x1="8" y1="12" x2="16" y2="12" />
                        </svg>
                      )}
                      {index === 1 && (
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <polyline points="17 1 21 5 17 9" />
                          <path d="M3 11V9a4 4 0 0 1 4-4h14" />
                          <polyline points="7 23 3 19 7 15" />
                          <path d="M21 13v2a4 4 0 0 1-4 4H3" />
                        </svg>
                      )}
                      {index === 2 && (
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <circle cx="6" cy="6" r="3" />
                          <circle cx="18" cy="18" r="3" />
                          <path d="M6 9v12" />
                          <path d="M18 9v6" />
                        </svg>
                      )}
                      {index === 3 && (
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                          <line x1="8" y1="21" x2="16" y2="21" />
                          <line x1="12" y1="17" x2="12" y2="21" />
                        </svg>
                      )}
                      {index === 4 && (
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <circle cx="12" cy="5" r="3" />
                          <circle cx="6" cy="19" r="3" />
                          <circle cx="18" cy="19" r="3" />
                          <line x1="12" y1="8" x2="6" y2="16" />
                          <line x1="12" y1="8" x2="18" y2="16" />
                        </svg>
                      )}
                      {index === 5 && (
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <ellipse cx="12" cy="5" rx="9" ry="3" />
                          <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
                          <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
                        </svg>
                      )}
                    </div>
                    <span
                      className={`${styles["prob-challenges__level-badge"]} ${
                        obj.level === "Dễ"
                          ? styles["prob-challenges__level-badge--easy"]
                          : obj.level === "Trung bình"
                          ? styles["prob-challenges__level-badge--medium"]
                          : styles["prob-challenges__level-badge--hard"]
                      }`}
                    >
                      <span className={styles["prob-challenges__badge-dot"]} />
                      {obj.level}
                    </span>
                  </div>

                  <div className={styles["prob-challenges__card-body"]}>
                    <h3 className={styles["prob-challenges__card-title"]}>
                      {obj.title}
                    </h3>
                    <p className={styles["prob-challenges__card-desc"]}>
                      {obj.description}
                    </p>
                    <div className={styles["prob-challenges__tag-group"]}>
                      {obj.tags.map((item, tIdx) => (
                        <span
                          key={tIdx}
                          className={styles["prob-challenges__tag-item"]}
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className={styles["prob-challenges__card-actions"]}>
                    <span className={styles["prob-challenges__rate-text"]}>
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="10" />
                        <polyline points="12 6 12 12 16 14" />
                      </svg>
                      Tỷ lệ: {obj.successRate}
                    </span>
                    <button
                      type="button"
                      className={styles["prob-challenges__action-btn"]}
                    >
                      Giải bài
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div className={styles["prob-challenges__pagination-wrapper"]}>
              <nav className={styles["prob-challenges__pagination"]}>
                <button
                  type="button"
                  className={styles["prob-challenges__page-btn"]}
                  disabled
                >
                  ‹
                </button>
                <button
                  type="button"
                  className={`${styles["prob-challenges__page-btn"]} ${styles["prob-challenges__page-btn--active"]}`}
                >
                  1
                </button>
                <button
                  type="button"
                  className={styles["prob-challenges__page-btn"]}
                >
                  2
                </button>
                <button
                  type="button"
                  className={styles["prob-challenges__page-btn"]}
                >
                  3
                </button>
                <span className={styles["prob-challenges__page-ellipsis"]}>
                  -
                </span>
                <button
                  type="button"
                  className={styles["prob-challenges__page-btn"]}
                >
                  15
                </button>
                <button
                  type="button"
                  className={styles["prob-challenges__page-btn"]}
                >
                  ›
                </button>
              </nav>
            </div>
          </div>
        </section>

        {/* 4. Guides Section */}
        <section className={styles["prob-guide"]}>
          <div className={styles["prob-guide__container"]}>
            <div className={styles["prob-guide__header"]}>
              <h2 className={styles["prob-guide__section-title"]}>
                Cách luyện tập hiệu quả trên LearnFlow
              </h2>
              <p className={styles["prob-guide__section-subtitle"]}>
                Phương pháp tiếp cận khoa học giúp bạn nắm vững kiến thức nhanh
                hơn.
              </p>
            </div>

            <div className={styles["prob-guide__list"]}>
              {problemData.guides.map((obj, index) => (
                <div key={index} className={`${styles["prob-guide__card"]} reveal-card`}>
                  <div className={styles["prob-guide__icon"]}>
                    {index === 0 && (
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="10" />
                        <path d="M8 14s1.5 2 4 2 4-2 4-2" />
                        <line x1="9" y1="9" x2="9.01" y2="9" />
                        <line x1="15" y1="9" x2="15.01" y2="9" />
                      </svg>
                    )}
                    {index === 1 && (
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
                      </svg>
                    )}
                    {index === 2 && (
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="3" y="3" width="7" height="7" />
                        <rect x="14" y="3" width="7" height="7" />
                        <rect x="14" y="14" width="7" height="7" />
                        <rect x="3" y="14" width="7" height="7" />
                      </svg>
                    )}
                    {index === 3 && (
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
                        <polyline points="17 6 23 6 23 12" />
                      </svg>
                    )}
                  </div>
                  <h3 className={styles["prob-guide__title"]}>{obj.title}</h3>
                  <p className={styles["prob-guide__desc"]}>
                    {obj.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 5. FAQ Section */}
        <section className={styles["prob-faq"]}>
          <div className={styles["prob-faq__container"]}>
            <div className={styles["prob-faq__header"]}>
              <h2 className={styles["prob-faq__section-title"]}>
                Câu hỏi thường gặp
              </h2>
            </div>

            <div className={styles["prob-faq__accordion-group"]}>
              {problemData.faqs.map((obj, index) => (
                <details
                  key={index}
                  open={index === 0}
                  className={styles["prob-faq__accordion"]}
                >
                  <summary className={styles["prob-faq__accordion-summary"]}>
                    <span className={styles["prob-faq__accordion-title"]}>
                      {obj.question}
                    </span>
                    <span className={styles["prob-faq__accordion-icon"]}>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <polyline points="6 9 12 15 18 9" />
                      </svg>
                    </span>
                  </summary>
                  <div className={styles["prob-faq__accordion-details"]}>
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

export default Problem;
