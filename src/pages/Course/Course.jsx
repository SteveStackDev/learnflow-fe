import { useState, useEffect, useRef, useMemo } from "react";
// Data
import { courseData } from "./data";

// Images
import heroUrl from "~/assets/images/Home/hero.webp";

// Import CSS Modules
import styles from "./Course.module.css";
// Components
import Icon from "~/components/Icon/Icon";
import EmptyState from "~/components/EmptyState/EmptyState";

// Hooks
import useScrollReveal from "~/hooks/useScrollReveal";

const SORT_OPTIONS = [
  { id: "popular", label: "Sắp xếp: Phổ biến nhất" },
  { id: "latest", label: "Sắp xếp: Mới nhất" },
  { id: "rating", label: "Sắp xếp: Đánh giá cao nhất" },
];

const ITEMS_PER_PAGE = 4; // 1 clean row of 4 cards!

function Course() {
  const [activeCategoryTab, setActiveCategoryTab] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSort, setSelectedSort] = useState(SORT_OPTIONS[0]);
  const [isSortDropdownOpen, setIsSortDropdownOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const sortDropdownRef = useRef(null);

  useScrollReveal();

  const handleCategoryChange = (index) => {
    setActiveCategoryTab(index);
    setCurrentPage(1);
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

  // Filter & Sort Logic
  const filteredAndSortedItems = useMemo(() => {
    const categories = courseData.categoryTabs || courseData.categories || ["Tất cả"];
    return (courseData.items || courseData.courses || [])
      .filter((item) => {
        const matchesSearch =
          item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.description.toLowerCase().includes(searchQuery.toLowerCase());
        const selectedTab = categories[activeCategoryTab] || "Tất cả";
        const matchesCategory =
          activeCategoryTab === 0 ||
          selectedTab === "Tất cả" ||
          selectedTab === "Tất cả khóa học" ||
          item.category === selectedTab ||
          item.level === selectedTab;
        return matchesSearch && matchesCategory;
      })
      .sort((a, b) => {
        if (selectedSort.id === "latest") {
          return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
        }
        if (selectedSort.id === "rating") {
          return (b.rating || 0) - (a.rating || 0);
        }
        return (b.studentsNum || 0) - (a.studentsNum || 0);
      });
  }, [searchQuery, activeCategoryTab, selectedSort]);

  // Reset page when search or sort changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedSort]);

  // Pagination calculation
  const totalPages = Math.max(1, Math.ceil(filteredAndSortedItems.length / ITEMS_PER_PAGE));
  const displayedItems = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredAndSortedItems.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredAndSortedItems, currentPage]);

  return (
    <>
      <div className={styles.coursepage}>
        {/* Ambient Background Glow Orbs */}
        <div className={styles["coursepage__orb-1"]} />
        <div className={styles["coursepage__orb-2"]} />
        <div className={styles["coursepage__orb-3"]} />
        <div className={styles["coursepage__orb-4"]} />

        {/* 1. Hero Section */}
        <section className={styles["course-hero"]}>
          <div className={styles["course-hero__container"]}>
            <div className={styles["course-hero__content"]}>
              <div className={styles["course-hero__left"]}>
                <div className={styles["course-hero__badge-wrap"]}>
                  <span className={styles["course-hero__tag"]}>
                    <Icon name="Book" size={16} />
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
                  <Icon name="Search" size={18} />
                </span>
                <input
                  id="course-search-input"
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Tìm khóa học bạn muốn bắt đầu..."
                  aria-label="Tìm khóa học bạn muốn bắt đầu"
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
                    <Icon name="ChevronDown" size={16} strokeWidth={2.5} />
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
                            <Icon name="Check" size={15} strokeWidth={3} />
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
                  <span className={styles["course-search-stats__stat-number"]}>
                    {filteredAndSortedItems.length}
                  </span>
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
                    key={item}
                    type="button"
                    onClick={() => handleCategoryChange(index)}
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
            {filteredAndSortedItems.length === 0 ? (
              <EmptyState
                iconName="Search"
                title="Không tìm thấy khóa học phù hợp"
                description="Không có khóa học nào khớp với từ khóa tìm kiếm hoặc danh mục của bạn."
                actionLabel="Xóa tìm kiếm"
                onAction={() => {
                  setSearchQuery("");
                  setActiveCategoryTab(0);
                }}
              />
            ) : (
              <div className={styles["course-grid__list-wrapper"]}>
                <button
                  type="button"
                  onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className={`${styles["course-grid__side-nav-btn"]} ${styles["course-grid__side-nav-btn--prev"]}`}
                  title="Quay lại trang trước"
                  aria-label="Quay lại trang trước"
                >
                  <Icon name="ChevronLeft" size={24} />
                </button>

                <div className={styles["course-grid__list"]}>
                  {displayedItems.map((obj) => (
                    <div key={obj.id} className={`${styles["course-grid__card"]} reveal-card`}>
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
                            <Icon name="Book" size={15} />
                            {obj.lessonsCount}
                          </span>
                          <span className={styles["course-grid__meta-text"]}>
                            <Icon name="Users" size={16} />
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

                <button
                  type="button"
                  onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className={`${styles["course-grid__side-nav-btn"]} ${styles["course-grid__side-nav-btn--next"]}`}
                  title="Tiến tới trang sau"
                  aria-label="Tiến tới trang sau"
                >
                  <Icon name="ChevronRight" size={24} />
                </button>
              </div>
            )}

            {/* Dynamic Pagination Controls */}
            {filteredAndSortedItems.length > 0 && (
              <div className={styles["course-grid__pagination-wrapper"]}>
                <nav className={styles["course-grid__pagination"]}>
                  <button
                    type="button"
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                    className={styles["course-grid__page-btn"]}
                    disabled={currentPage === 1}
                  >
                    ‹
                  </button>

                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                    <button
                      key={pageNum}
                      type="button"
                      onClick={() => setCurrentPage(pageNum)}
                      className={`${styles["course-grid__page-btn"]} ${
                        currentPage === pageNum ? styles["course-grid__page-btn--active"] : ""
                      }`}
                    >
                      {pageNum}
                    </button>
                  ))}

                  <button
                    type="button"
                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                    className={styles["course-grid__page-btn"]}
                    disabled={currentPage === totalPages}
                  >
                    ›
                  </button>
                </nav>
              </div>
            )}
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
              {courseData.benefits.map((obj) => (
                <div key={obj.id} className={`${styles["course-reasons__card"]} reveal-card`}>
                  <div className={styles["course-reasons__icon"]}>
                    <Icon name={obj.iconName} size={24} />
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
                  key={obj.id}
                  open={index === 0}
                  className={styles["course-faq__accordion"]}
                >
                  <summary className={styles["course-faq__accordion-summary"]}>
                    <span className={styles["course-faq__accordion-title"]}>
                      {obj.question}
                    </span>
                    <span className={styles["course-faq__accordion-icon"]}>
                      <Icon name="ChevronDown" size={18} strokeWidth={2.5} />
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
