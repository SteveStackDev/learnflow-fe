// Data
import { contestData } from "./data";
// Import CSS Modules
import styles from "./Contest.module.css";

function Contest() {
  return (
    <>
      <div className={styles.contestpage}>
        {/* Hero Section */}
        <section className={styles["contest-hero"]}>
          <div className={styles["contest-hero__container"]}>
            <div className={styles["contest-hero__content"]}>
              <span className={styles["contest-hero__tag"]}>
                Chinh phục thử thách mới
              </span>
              <h1 className={styles["contest-hero__title"]}>
                Đấu trường lập trình LearnFlow
              </h1>
              <p className={styles["contest-hero__desc"]}>
                Nơi hội tụ những tài năng lập trình xuất sắc nhất. Thử thách bản
                thân qua các kỳ thi thuật toán đỉnh cao, bứt phá giới hạn kỹ
                năng và khẳng định vị thế trên bảng xếp hạng.
              </p>
              <div className={styles["contest-hero__btn-group"]}>
                <button
                  type="button"
                  className={`${styles["contest-hero__btn"]} ${styles["contest-hero__btn--contained"]}`}
                >
                  Tham gia ngay
                </button>
                <button
                  type="button"
                  className={`${styles["contest-hero__btn"]} ${styles["contest-hero__btn--outlined"]}`}
                >
                  Xem luật chơi
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Overview Stats Section */}
        <section className={styles["contest-stats"]}>
          <div className={styles["contest-stats__container"]}>
            <div className={styles["contest-stats__list"]}>
              {contestData.stats.map((obj, index) => (
                <div key={index} className={styles["contest-stats__card"]}>
                  <span className={styles["contest-stats__label"]}>
                    {obj.title}
                  </span>
                  <span className={styles["contest-stats__value"]}>
                    {obj.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Filter & Search Section */}
        <section className={styles["contest-filters"]}>
          <div className={styles["contest-filters__container"]}>
            <div className={styles["contest-filters__row"]}>
              <input
                type="text"
                placeholder="Tìm contest bạn muốn tham gia..."
                className={styles["contest-filters__search-input"]}
              />
              <div className={styles["contest-filters__tab-group"]}>
                {contestData.tabs.map((item, index) => (
                  <button
                    key={index}
                    type="button"
                    className={`${styles["contest-filters__tab-btn"]} ${
                      index === 0
                        ? styles["contest-filters__tab-btn--active"]
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

        {/* Contests Section */}
        <section className={styles["contest-grid"]}>
          <div className={styles["contest-grid__container"]}>
            <div className={styles["contest-grid__list"]}>
              {contestData.items.map((obj, index) => (
                <div key={index} className={styles["contest-grid__card"]}>
                  <div className={styles["contest-grid__card-header"]}>
                    <span className={styles["contest-grid__status-badge"]}>
                      {obj.statusLabel}
                    </span>
                  </div>
                  <img
                    src={obj.imageUrl}
                    alt={obj.title}
                    className={styles["contest-grid__card-img"]}
                  />
                  <div className={styles["contest-grid__card-body"]}>
                    <h3 className={styles["contest-grid__card-title"]}>
                      {obj.title}
                    </h3>
                    <div className={styles["contest-grid__card-meta"]}>
                      <span
                        className={`${styles["contest-grid__meta-item"]} ${styles["contest-grid__meta-item--time"]}`}
                      >
                        {obj.time}
                      </span>
                      <span
                        className={`${styles["contest-grid__meta-item"]} ${styles["contest-grid__meta-item--duration"]}`}
                      >
                        {obj.duration}
                      </span>
                      <span
                        className={`${styles["contest-grid__meta-item"]} ${styles["contest-grid__meta-item--participants"]}`}
                      >
                        {obj.participants}
                      </span>
                    </div>
                  </div>
                  <div className={styles["contest-grid__card-actions"]}>
                    <button
                      type="button"
                      className={`${styles["contest-grid__action-btn"]} ${styles[`contest-grid__action-btn--${obj.actionVariant}`]}`}
                    >
                      {obj.actionText}
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div className={styles["contest-grid__pagination-wrapper"]}>
              <nav className={styles["contest-grid__pagination"]}>
                <button
                  type="button"
                  className={styles["contest-grid__page-btn"]}
                  disabled
                >
                  «
                </button>
                <button
                  type="button"
                  className={`${styles["contest-grid__page-btn"]} ${styles["contest-grid__page-btn--active"]}`}
                >
                  1
                </button>
                <button
                  type="button"
                  className={styles["contest-grid__page-btn"]}
                >
                  2
                </button>
                <button
                  type="button"
                  className={styles["contest-grid__page-btn"]}
                >
                  3
                </button>
                <span className={styles["contest-grid__page-ellipsis"]}>
                  ...
                </span>
                <button
                  type="button"
                  className={styles["contest-grid__page-btn"]}
                >
                  12
                </button>
                <button
                  type="button"
                  className={styles["contest-grid__page-btn"]}
                >
                  »
                </button>
              </nav>
            </div>
          </div>
        </section>

        {/* Reason Section */}
        <section className={styles["contest-why"]}>
          <div className={styles["contest-why__container"]}>
            <h2
              className={`${styles["contest-why__section-title"]} ${styles["contest-why__section-title--center"]}`}
            >
              Tại sao nên tham gia Contest?
            </h2>
            <div className={styles["contest-why__list"]}>
              {contestData.benefits.map((obj, index) => (
                <div key={index} className={styles["contest-why__card"]}>
                  <div className={styles["contest-why__icon"]}>
                    {obj.iconName}
                  </div>
                  <h3 className={styles["contest-why__title"]}>{obj.title}</h3>
                  <p className={styles["contest-why__desc"]}>
                    {obj.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className={styles["contest-faq"]}>
          <div className={styles["contest-faq__container"]}>
            <h2 className={styles["contest-faq__section-title"]}>
              Những câu hỏi thường gặp
            </h2>
            <div className={styles["contest-faq__accordion-group"]}>
              {contestData.faqs.map((obj, index) => (
                <details
                  key={index}
                  open={index === 0}
                  className={styles["contest-faq__accordion"]}
                >
                  <summary className={styles["contest-faq__accordion-summary"]}>
                    <span className={styles["contest-faq__accordion-title"]}>
                      {obj.question}
                    </span>
                  </summary>
                  <div className={styles["contest-faq__accordion-details"]}>
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

export default Contest;
