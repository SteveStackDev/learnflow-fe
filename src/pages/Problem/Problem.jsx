import { useState, useEffect, useRef } from "react";
// Data
import { problemData } from "./data";

// Import CSS Modules
import styles from "./Problem.module.css";
// Components
import Icon from "~/components/Icon/Icon";
import EmptyState from "~/components/EmptyState/EmptyState";
import { SkeletonCard } from "~/components/Skeleton/Skeleton.jsx";
// Hooks
import useScrollReveal from "~/hooks/useScrollReveal";

const SORT_OPTIONS = [
  { id: "popular", label: "Phổ biến" },
  { id: "latest", label: "Mới nhất" },
  { id: "rate", label: "Tỷ lệ làm đúng" },
];

function Problem() {
  const [activeTab, setActiveTab] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSort, setSelectedSort] = useState(SORT_OPTIONS[0]);
  const [isSortDropdownOpen, setIsSortDropdownOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const sortDropdownRef = useRef(null);

  useScrollReveal();

  const handleTabChange = (index) => {
    setActiveTab(index);
  };

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


  return (
    <>
      <div className={styles.problempage}>
        {/* Ambient Background Glow Orbs */}
        <div className={styles["problempage__orb-1"]} />
        <div className={styles["problempage__orb-2"]} />
        <div className={styles["problempage__orb-3"]} />
        <div className={styles["problempage__orb-4"]} />



        {/* 1. Hero Section */}
        <section className={styles["prob-hero"]}>
          <div className={styles["prob-hero__container"]}>
            <div className={styles["prob-hero__content"]}>
              <div className={styles["prob-hero__left"]}>
                <div className={styles["prob-hero__badge-wrap"]}>
                  <span className={styles["prob-hero__tag"]}>
                    <Icon name="Code" size={15} />
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
                    <Icon name="Terminal" size={16} />
                    <span>Bắt đầu ngay</span>
                  </button>
                  <button
                    type="button"
                    className={`${styles["prob-hero__btn"]} ${styles["prob-hero__btn--outlined"]}`}
                  >
                    <Icon name="Clock" size={16} />
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
                    <Icon name="Search" size={18} />
                  </span>
                  <input
                    id="problem-search-input"
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Tìm kiếm bài tập theo tên hoặc chủ đề..."
                    aria-label="Tìm kiếm bài tập theo tên hoặc chủ đề"
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
                      <Icon name="ChevronDown" size={16} strokeWidth={2.5} />
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
                              <Icon name="Check" size={15} strokeWidth={3} />
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
                  <div key={obj.id || obj.slug || obj.name || obj.title || obj} className={styles["prob-filter__stat-card"]}>
                    <div
                      className={`${styles["prob-filter__stat-icon"]} ${
                        index === 0
                          ? styles["prob-filter__stat-icon--blue"]
                          : index === 1
                          ? styles["prob-filter__stat-icon--yellow"]
                          : styles["prob-filter__stat-icon--dark"]
                      }`}
                    >
                      <Icon name={obj.iconName} size={20} />
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

            {isLoading ? (
              <div className={styles["prob-challenges__list"]}>
                <SkeletonCard />
                <SkeletonCard />
                <SkeletonCard />
                <SkeletonCard />
                <SkeletonCard />
                <SkeletonCard />
              </div>
            ) : problemData.items.filter((item) => {
              const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                    item.description.toLowerCase().includes(searchQuery.toLowerCase());
              return matchesSearch;
            }).length === 0 ? (
              <EmptyState
                iconName="Search"
                title="Không tìm thấy bài tập phù hợp"
                description="Không có bài tập nào khớp với từ khóa tìm kiếm của bạn."
                actionLabel="Xóa bộ lọc"
                onAction={() => setSearchQuery("")}
              />
            ) : (
              <div className={styles["prob-challenges__list"]}>
                {problemData.items.filter((item) => {
                  const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                        item.description.toLowerCase().includes(searchQuery.toLowerCase());
                  return matchesSearch;
                }).map((obj) => (
                  <div key={obj.id || obj.slug || obj.name || obj.title || obj} className={`${styles["prob-challenges__card"]} reveal-card`}>
                    <div className={styles["prob-challenges__card-header"]}>
                      <div className={styles["prob-challenges__card-icon"]}>
                        <Icon name={obj.iconName} size={22} />
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
                        <Icon name="Clock" size={15} />
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
            )}

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
                <div key={obj.id || obj.slug || obj.name || obj.title || obj} className={`${styles["prob-guide__card"]} reveal-card`}>
                  <div className={styles["prob-guide__icon"]}>
                    <Icon name={obj.iconName} size={24} />
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
                  key={obj.id || obj.slug || obj.name || obj.title || obj}
                  open={index === 0}
                  className={styles["prob-faq__accordion"]}
                >
                  <summary className={styles["prob-faq__accordion-summary"]}>
                    <span className={styles["prob-faq__accordion-title"]}>
                      {obj.question}
                    </span>
                    <span className={styles["prob-faq__accordion-icon"]}>
                      <Icon name="ChevronDown" size={18} strokeWidth={2.5} />
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
