import { useState } from "react";
// Data
import { pricingData } from "./data";
// Import CSS Modules
import styles from "./Pricing.module.css";

function Pricing() {
  const [isYearly, setIsYearly] = useState(false);

  return (
    <>
      <div className={styles.pricingpage}>
        {/* Ambient Background Glow Orbs */}
        <div className={styles["pricingpage__orb-1"]} />
        <div className={styles["pricingpage__orb-2"]} />

        {/* 1. Header Hero Section */}
        <section className={styles["price-hero"]}>
          <div className={styles["price-hero__container"]}>
            <div className={styles["price-hero__content"]}>
              <h1 className={styles["price-hero__title"]}>
                Chọn lộ trình phát triển phù hợp với bạn
              </h1>
              <p className={styles["price-hero__desc"]}>
                Từ những bước đầu tiên làm quen với mã nguồn đến việc trở thành
                chuyên gia lập trình với sự hỗ trợ của AI. LearnFlow đồng hành
                cùng mọi giai đoạn sự nghiệp của bạn.
              </p>

              {/* Billing Toggle Switch */}
              <div className={styles["price-hero__toggle-wrapper"]}>
                <span
                  className={`${styles["price-hero__toggle-label"]} ${
                    !isYearly ? styles["price-hero__toggle-label--active"] : ""
                  }`}
                >
                  Thanh toán tháng
                </span>
                <label className={styles["price-hero__switch"]}>
                  <input
                    type="checkbox"
                    checked={isYearly}
                    onChange={(e) => setIsYearly(e.target.checked)}
                    className={styles["price-hero__switch-input"]}
                  />
                  <span className={styles["price-hero__switch-slider"]}></span>
                </label>
                <span
                  className={`${styles["price-hero__toggle-label"]} ${
                    isYearly ? styles["price-hero__toggle-label--active"] : ""
                  }`}
                >
                  Thanh toán năm
                </span>
                <span className={styles["price-hero__badge"]}>Giảm 20%</span>
              </div>
            </div>
          </div>
        </section>

        {/* 2. Pricing Cards Section */}
        <section className={styles["price-cards"]}>
          <div className={styles["price-cards__container"]}>
            <div className={styles["price-cards__list"]}>
              {pricingData.items.map((obj, index) => {
                // Calculate dynamic price based on toggle
                let displayPrice = obj.price;
                if (isYearly) {
                  if (index === 1) displayPrice = "159.000đ";
                  if (index === 2) displayPrice = "319.000đ";
                }

                return (
                  <div
                    key={index}
                    className={`${styles["price-cards__card"]} ${
                      obj.isPopular ? styles["price-cards__card--popular"] : ""
                    } ${
                      index === 2 ? styles["price-cards__card--pro"] : ""
                    }`}
                  >
                    {obj.isPopular && (
                      <div className={styles["price-cards__card-badge-wrap"]}>
                        <span className={styles["price-cards__card-badge"]}>
                          Phổ biến nhất
                        </span>
                      </div>
                    )}

                    <div className={styles["price-cards__card-content"]}>
                      <h3 className={styles["price-cards__card-title"]}>
                        {obj.title}
                      </h3>
                      <div className={styles["price-cards__card-price-box"]}>
                        <span className={styles["price-cards__card-price"]}>
                          {displayPrice}
                        </span>
                        <span className={styles["price-cards__card-period"]}>
                          {obj.period}
                        </span>
                      </div>

                      <ul className={styles["price-cards__card-features"]}>
                        {obj.features.map((item, featIndex) => (
                          <li
                            key={featIndex}
                            className={styles["price-cards__feature-item"]}
                          >
                            <span className={styles["price-cards__feature-icon"]}>
                              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                <polyline points="20 6 9 17 4 12" />
                              </svg>
                            </span>
                            <span className={styles["price-cards__feature-text"]}>
                              {item}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className={styles["price-cards__card-actions"]}>
                      <button
                        type="button"
                        className={`${styles["price-cards__btn"]} ${
                          obj.isPopular
                            ? styles["price-cards__btn--contained"]
                            : index === 2
                            ? styles["price-cards__btn--dark"]
                            : styles["price-cards__btn--outlined"]
                        }`}
                      >
                        {obj.buttonText}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* 3. Detailed Comparison Section */}
        <section className={styles["price-comparison"]}>
          <div className={styles["price-comparison__container"]}>
            <div className={styles["price-comparison__header"]}>
              <h2 className={styles["price-comparison__section-title"]}>
                So sánh chi tiết các gói
              </h2>
              <p className={styles["price-comparison__section-subtitle"]}>
                Tìm hiểu kỹ hơn về sự khác biệt giữa các cấp độ thành viên.
              </p>
            </div>

            <div className={styles["price-comparison__table-wrapper"]}>
              <table className={styles["price-comparison__table"]}>
                <thead>
                  <tr
                    className={`${styles["price-comparison__table-row"]} ${styles["price-comparison__table-row--header"]}`}
                  >
                    <th
                      className={`${styles["price-comparison__table-cell"]} ${styles["price-comparison__table-cell--header-label"]}`}
                    >
                      Tính năng
                    </th>
                    <th
                      className={`${styles["price-comparison__table-cell"]} ${styles["price-comparison__table-cell--header"]}`}
                    >
                      Free
                    </th>
                    <th
                      className={`${styles["price-comparison__table-cell"]} ${styles["price-comparison__table-cell--header"]} ${styles["price-comparison__table-cell--popular"]}`}
                    >
                      Plus
                    </th>
                    <th
                      className={`${styles["price-comparison__table-cell"]} ${styles["price-comparison__table-cell--header"]}`}
                    >
                      Pro
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {pricingData.comparisons.map((obj, index) => {
                    if (obj.type === "section") {
                      return (
                        <tr
                          key={index}
                          className={`${styles["price-comparison__table-row"]} ${styles["price-comparison__table-row--section"]}`}
                        >
                          <td
                            colSpan={4}
                            className={`${styles["price-comparison__table-cell"]} ${styles["price-comparison__table-cell--section"]}`}
                          >
                            {obj.name}
                          </td>
                        </tr>
                      );
                    }
                    return (
                      <tr
                        key={index}
                        className={styles["price-comparison__table-row"]}
                      >
                        <td
                          className={`${styles["price-comparison__table-cell"]} ${styles["price-comparison__table-cell--label"]}`}
                        >
                          {obj.name}
                        </td>
                        <td className={styles["price-comparison__table-cell"]}>
                          {obj.free === "✓" ? (
                            <span className={styles["price-comparison__check"]}>✓</span>
                          ) : obj.free === "—" ? (
                            <span className={styles["price-comparison__dash"]}>—</span>
                          ) : (
                            obj.free
                          )}
                        </td>
                        <td
                          className={`${styles["price-comparison__table-cell"]} ${styles["price-comparison__table-cell--popular"]}`}
                        >
                          {obj.plus === "✓" ? (
                            <span className={styles["price-comparison__check"]}>✓</span>
                          ) : obj.plus === "—" ? (
                            <span className={styles["price-comparison__dash"]}>—</span>
                          ) : (
                            obj.plus
                          )}
                        </td>
                        <td className={styles["price-comparison__table-cell"]}>
                          {obj.pro === "✓" ? (
                            <span className={styles["price-comparison__check"]}>✓</span>
                          ) : obj.pro === "—" ? (
                            <span className={styles["price-comparison__dash"]}>—</span>
                          ) : (
                            obj.pro
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* 4. FAQ Section */}
        <section className={styles["price-faq"]}>
          <div className={styles["price-faq__container"]}>
            <div className={styles["price-faq__header"]}>
              <h2 className={styles["price-faq__section-title"]}>
                Các câu hỏi thường gặp
              </h2>
              <p className={styles["price-faq__section-subtitle"]}>
                Mọi điều bạn cần biết về gói dịch vụ của LearnFlow.
              </p>
            </div>

            <div className={styles["price-faq__accordion-group"]}>
              {pricingData.faqs.map((obj, index) => (
                <details
                  key={index}
                  open={index === 0}
                  className={styles["price-faq__accordion"]}
                >
                  <summary className={styles["price-faq__accordion-summary"]}>
                    <span className={styles["price-faq__accordion-title"]}>
                      {obj.question}
                    </span>
                    <span className={styles["price-faq__accordion-icon"]}>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <polyline points="6 9 12 15 18 9" />
                      </svg>
                    </span>
                  </summary>
                  <div className={styles["price-faq__accordion-details"]}>
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

export default Pricing;
