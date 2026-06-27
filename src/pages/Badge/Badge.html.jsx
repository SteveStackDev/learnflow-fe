// Data
import { badgeData } from "./data";
// Import CSS Modules
import styles from "./Badge.module.css";

function Badge() {
  return (
    <>
      <div className={styles.badgepage}>
        {/* Hero Section */}
        <section className={styles["badge-hero"]}>
          <div className={styles["badge-hero__container"]}>
            <div className={styles["badge-hero__content"]}>
              <span className={styles["badge-hero__badge"]}>
                Gamification Hệ thống
              </span>
              <h1 className={styles["badge-hero__title"]}>
                Mỗi danh hiệu là một cột mốc trên hành trình học tập
              </h1>
              <p className={styles["badge-hero__desc"]}>
                Khám phá hệ thống danh hiệu độc đáo của LearnFlow. Mỗi badge
                không chỉ là phần thưởng mà còn là sự ghi nhận nỗ lực bền bỉ, kỹ
                năng vượt trội và tinh thần cầu tiến của bạn.
              </p>
              <button
                type="button"
                className={`${styles["badge-hero__btn"]} ${styles["badge-hero__btn--contained"]}`}
              >
                Khám phá nhiệm vụ
              </button>
            </div>
          </div>
        </section>

        {/* Overview Stats Section */}
        <section className={styles["badge-stats"]}>
          <div className={styles["badge-stats__container"]}>
            <div className={styles["badge-stats__list"]}>
              <div className={styles["badge-stats__card"]}>
                <span className={styles["badge-stats__label"]}>
                  Tổng danh hiệu
                </span>
                <span className={styles["badge-stats__value"]}>64</span>
              </div>

              <div className={styles["badge-stats__card"]}>
                <span className={styles["badge-stats__label"]}>
                  Đã đạt được
                </span>
                <span className={styles["badge-stats__value"]}>12</span>
              </div>

              <div className={styles["badge-stats__card"]}>
                <div className={styles["badge-stats__progress-info"]}>
                  <span className={styles["badge-stats__label"]}>
                    Tiến độ tổng quan
                  </span>
                  <span className={styles["badge-stats__percent"]}>18.7%</span>
                </div>
                {/* Custom Linear Progress */}
                <div className={styles["badge-stats__progress-bar"]}>
                  <div
                    className={styles["badge-stats__progress-fill"]}
                    style={{ width: "18.7%" }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Search & Filter Section */}
        <section className={styles["badge-filters"]}>
          <div className={styles["badge-filters__container"]}>
            <div className={styles["badge-filters__wrapper"]}>
              <input
                type="text"
                placeholder="Tìm badge bạn muốn chinh phục..."
                className={styles["badge-filters__search-input"]}
              />
              <div className={styles["badge-filters__tab-group"]}>
                {badgeData.tabs.map((item, index) => (
                  <button
                    key={index}
                    type="button"
                    className={`${styles["badge-filters__tab-btn"]} ${
                      index === 0
                        ? styles["badge-filters__tab-btn--active"]
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

        {/* Badges Section */}
        <section className={styles["badge-grid"]}>
          <div className={styles["badge-grid__container"]}>
            <div className={styles["badge-grid__list"]}>
              {badgeData.items.map((obj, index) => (
                <div
                  key={index}
                  className={`${styles["badge-grid__card"]} ${
                    obj.status === "locked"
                      ? styles["badge-grid__card--locked"]
                      : ""
                  }`}
                >
                  <div className={styles["badge-grid__card-header"]}>
                    <span
                      className={`${styles["badge-grid__status-chip"]} ${styles[`badge-grid__status-chip--${obj.status}`]}`}
                    >
                      {obj.badgeText}
                    </span>
                  </div>
                  <div className={styles["badge-grid__card-body"]}>
                    <div className={styles["badge-grid__card-icon"]}>
                      {obj.iconName}
                    </div>
                    <h3 className={styles["badge-grid__card-title"]}>
                      {obj.title}
                    </h3>
                    <p className={styles["badge-grid__card-desc"]}>
                      {obj.description}
                    </p>
                  </div>
                  <div className={styles["badge-grid__card-actions"]}>
                    <button
                      type="button"
                      className={`${styles["badge-grid__btn"]} ${
                        obj.status === "received"
                          ? styles["badge-grid__btn--contained"]
                          : styles["badge-grid__btn--outlined"]
                      }`}
                      disabled={obj.status === "locked"}
                    >
                      {obj.buttonText}
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div className={styles["badge-grid__pagination-wrapper"]}>
              <nav className={styles["badge-grid__pagination"]}>
                <button
                  type="button"
                  className={styles["badge-grid__page-btn"]}
                  disabled
                >
                  «
                </button>
                <button
                  type="button"
                  className={`${styles["badge-grid__page-btn"]} ${styles["badge-grid__page-btn--active"]}`}
                >
                  1
                </button>
                <button
                  type="button"
                  className={styles["badge-grid__page-btn"]}
                >
                  2
                </button>
                <button
                  type="button"
                  className={styles["badge-grid__page-btn"]}
                >
                  3
                </button>
                <span className={styles["badge-grid__page-ellipsis"]}>...</span>
                <button
                  type="button"
                  className={styles["badge-grid__page-btn"]}
                >
                  8
                </button>
                <button
                  type="button"
                  className={styles["badge-grid__page-btn"]}
                >
                  »
                </button>
              </nav>
            </div>
          </div>
        </section>

        {/* Guide Section */}
        <section className={styles["badge-guide"]}>
          <div className={styles["badge-guide__container"]}>
            <h2 className={styles["badge-guide__section-title"]}>
              Làm thế nào để kiếm Badge?
            </h2>
            <div className={styles["badge-guide__list"]}>
              {badgeData.guides.map((obj, index) => (
                <div key={index} className={styles["badge-guide__card"]}>
                  <div className={styles["badge-guide__icon"]}>
                    {obj.iconName}
                  </div>
                  <h3 className={styles["badge-guide__title"]}>{obj.title}</h3>
                  <p className={styles["badge-guide__desc"]}>
                    {obj.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className={styles["badge-faq"]}>
          <div className={styles["badge-faq__container"]}>
            <h2 className={styles["badge-faq__section-title"]}>
              Câu hỏi thường gặp
            </h2>
            <div className={styles["badge-faq__accordion-group"]}>
              {badgeData.faqs.map((obj, index) => (
                <details
                  key={index}
                  open={index === 0}
                  className={styles["badge-faq__accordion"]}
                >
                  <summary className={styles["badge-faq__accordion-summary"]}>
                    <span className={styles["badge-faq__accordion-title"]}>
                      {obj.question}
                    </span>
                  </summary>
                  <div className={styles["badge-faq__accordion-details"]}>
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

export default Badge;
