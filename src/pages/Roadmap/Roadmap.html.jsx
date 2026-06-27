// Data
import { roadmapData } from "./data";

// Images
import heroUrl from "~/assets/images/Home/hero.webp";

// Import CSS Modules
import styles from "./Roadmap.module.css";

function Roadmap() {
  return (
    <>
      <div className={styles.roadmappage}>
        {/* Hero Section */}
        <section className={styles["roadmap-hero"]}>
          <div className={styles["roadmap-hero__container"]}>
            <div className={styles["roadmap-hero__content"]}>
              <div className={styles["roadmap-hero__left"]}>
                <span className={styles["roadmap-hero__badge"]}>
                  Định hướng tương lai
                </span>
                <h1 className={styles["roadmap-hero__title"]}>
                  Lộ Trình Nghề Nghiệp Công Nghệ
                </h1>
                <p className={styles["roadmap-hero__desc"]}>
                  Không còn lạc lối giữa hàng nghìn công nghệ. Chúng tôi cung
                  cấp bản đồ học tập chi tiết từ con số 0 đến khi bạn sẵn sàng
                  cho công việc mơ ước.
                </p>
                <div className={styles["roadmap-hero__btn-group"]}>
                  <button
                    type="button"
                    className={`${styles["roadmap-hero__btn"]} ${styles["roadmap-hero__btn--contained"]}`}
                  >
                    Khám phá ngay
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
                <img
                  className={styles["roadmap-hero__img"]}
                  src={heroUrl}
                  alt="Hero Image"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Search & Filter Section */}
        <section className={styles["roadmap-filters"]}>
          <div className={styles["roadmap-filters__container"]}>
            <h2 className={styles["roadmap-filters__section-title"]}>
              Lựa chọn con đường của bạn
            </h2>

            <div className={styles["roadmap-filters__row"]}>
              <input
                type="text"
                placeholder="Tìm vị trí công nghệ bạn muốn theo đuổi..."
                className={styles["roadmap-filters__search-input"]}
              />
              <span className={styles["roadmap-filters__stats"]}>
                {roadmapData.totalCountText}
              </span>
            </div>

            <div className={styles["roadmap-filters__row"]}>
              <div className={styles["roadmap-filters__tab-group"]}>
                {roadmapData.tabs.map((item, index) => (
                  <button
                    key={index}
                    type="button"
                    className={`${styles["roadmap-filters__tab-btn"]} ${
                      index === 0
                        ? styles["roadmap-filters__tab-btn--active"]
                        : ""
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>

              <div className={styles["roadmap-filters__select-wrapper"]}>
                <select
                  defaultValue="all"
                  className={styles["roadmap-filters__select"]}
                >
                  <option value="all">Tất cả trình độ</option>
                </select>
              </div>
            </div>
          </div>
        </section>

        {/* Cards Section */}
        <section className={styles["roadmap-cards"]}>
          <div className={styles["roadmap-cards__container"]}>
            <div className={styles["roadmap-cards__list"]}>
              {roadmapData.items.map((card, index) => (
                <div key={index} className={styles["roadmap-cards__card"]}>
                  {card.badge && (
                    <span className={styles["roadmap-cards__card-badge"]}>
                      {card.statusLabel}
                    </span>
                  )}
                  <img
                    className={styles["roadmap-cards__card-media"]}
                    src={card.imageUrl}
                    alt={card.title}
                  />
                  <div className={styles["roadmap-cards__card-content"]}>
                    <h3 className={styles["roadmap-cards__card-title"]}>
                      {card.title}
                    </h3>
                    <p className={styles["roadmap-cards__card-desc"]}>
                      {card.description}
                    </p>

                    <div className={styles["roadmap-cards__card-tags"]}>
                      {card.tags.map((item, tagIndex) => (
                        <span
                          key={tagIndex}
                          className={styles["roadmap-cards__tag-chip"]}
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className={styles["roadmap-cards__card-actions"]}>
                    <button
                      type="button"
                      className={styles["roadmap-cards__card-btn"]}
                    >
                      {card.actionText}
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div className={styles["roadmap-cards__pagination-wrapper"]}>
              <nav className={styles["roadmap-cards__pagination"]}>
                <button
                  type="button"
                  className={styles["roadmap-cards__page-btn"]}
                  disabled
                >
                  «
                </button>
                <button
                  type="button"
                  className={`${styles["roadmap-cards__page-btn"]} ${styles["roadmap-cards__page-btn--active"]}`}
                >
                  1
                </button>
                <button
                  type="button"
                  className={styles["roadmap-cards__page-btn"]}
                >
                  2
                </button>
                <button
                  type="button"
                  className={styles["roadmap-cards__page-btn"]}
                >
                  3
                </button>
                <button
                  type="button"
                  className={styles["roadmap-cards__page-btn"]}
                >
                  »
                </button>
              </nav>
            </div>
          </div>
        </section>

        {/* Suggestion Section */}
        <section className={styles["roadmap-suggestions"]}>
          <div className={styles["roadmap-suggestions__container"]}>
            <h2 className={styles["roadmap-suggestions__section-title"]}>
              Không biết bắt đầu từ đâu?
            </h2>
            <p className={styles["roadmap-suggestions__section-subtitle"]}>
              Đừng lo lắng, hãy chọn lĩnh vực mà bạn cảm thấy hứng thú nhất.
              Chúng tôi sẽ gợi ý hướng đi phù hợp.
            </p>

            <div className={styles["roadmap-suggestions__list"]}>
              {roadmapData.suggestions.map((obj, index) => (
                <div
                  key={index}
                  className={styles["roadmap-suggestions__card"]}
                >
                  <div className={styles["roadmap-suggestions__icon"]}>
                    {obj.iconName}
                  </div>
                  <h3 className={styles["roadmap-suggestions__title"]}>
                    {obj.title}
                  </h3>
                  <p className={styles["roadmap-suggestions__desc"]}>
                    {obj.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className={styles["roadmap-faq"]}>
          <div className={styles["roadmap-faq__container"]}>
            <div className={styles["roadmap-faq__accordion-group"]}>
              {roadmapData.faqs.map((obj, index) => {
                return (
                  <details
                    key={index}
                    open={index === 0}
                    className={styles["roadmap-faq__accordion"]}
                  >
                    <summary
                      className={styles["roadmap-faq__accordion-summary"]}
                    >
                      <span className={styles["roadmap-faq__accordion-title"]}>
                        {obj.question}
                      </span>
                    </summary>
                    <div className={styles["roadmap-faq__accordion-details"]}>
                      <p>{obj.answer}</p>
                    </div>
                  </details>
                );
              })}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default Roadmap;
