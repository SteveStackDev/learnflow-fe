// Data
import { pricingData } from "./data";
// Import CSS Modules
import styles from "./Pricing.module.css";

function Pricing() {
  return (
    <>
      <div className={styles.pricingpage}>
        {/* Header & Toggle Section */}
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

              {/* Toggle Billing State */}
              <div className={styles["price-hero__toggle-wrapper"]}>
                <span className={styles["price-hero__toggle-label"]}>
                  Thanh toán tháng
                </span>
                <label className={styles["price-hero__switch"]}>
                  <input
                    type="checkbox"
                    defaultChecked={false}
                    className={styles["price-hero__switch-input"]}
                  />
                  <span className={styles["price-hero__switch-slider"]}></span>
                </label>
                <span className={styles["price-hero__toggle-label"]}>
                  Thanh toán năm
                </span>
                <span className={styles["price-hero__badge"]}>Giảm 20%</span>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Cards Section */}
        <section className={styles["price-cards"]}>
          <div className={styles["price-cards__container"]}>
            <div className={styles["price-cards__list"]}>
              {pricingData.items.map((obj, index) => (
                <div
                  key={index}
                  className={`${styles["price-cards__card"]} ${
                    obj.isPopular ? styles["price-cards__card--popular"] : ""
                  }`}
                >
                  {obj.isPopular && (
                    <span className={styles["price-cards__card-badge"]}>
                      Phổ biến nhất
                    </span>
                  )}

                  <div className={styles["price-cards__card-content"]}>
                    <h3 className={styles["price-cards__card-title"]}>
                      {obj.title}
                    </h3>
                    <div className={styles["price-cards__card-price-box"]}>
                      <span className={styles["price-cards__card-price"]}>
                        {obj.price}
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
                            ✓
                          </span>{" "}
                          {item}
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
                          : styles["price-cards__btn--outlined"]
                      }`}
                    >
                      {obj.buttonText}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Detail Comparison Section */}
        <section className={styles["price-comparison"]}>
          <div className={styles["price-comparison__container"]}>
            <h2 className={styles["price-comparison__section-title"]}>
              So sánh chi tiết các gói
            </h2>
            <p className={styles["price-comparison__section-subtitle"]}>
              Tìm hiểu kỹ hơn về sự khác biệt giữa các cấp độ thành viên.
            </p>

            <div className={styles["price-comparison__table-wrapper"]}>
              <table className={styles["price-comparison__table"]}>
                <thead>
                  <tr
                    className={`${styles["price-comparison__table-row"]} ${styles["price-comparison__table-row--header"]}`}
                  >
                    <th
                      className={`${styles["price-comparison__table-cell"]} ${styles["price-comparison__table-cell--header"]}`}
                    >
                      Tính năng
                    </th>
                    <th
                      className={`${styles["price-comparison__table-cell"]} ${styles["price-comparison__table-cell--header"]}`}
                    >
                      Free
                    </th>
                    <th
                      className={`${styles["price-comparison__table-cell"]} ${styles["price-comparison__table-cell--header"]}`}
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
                          {obj.free}
                        </td>
                        <td className={styles["price-comparison__table-cell"]}>
                          {obj.plus}
                        </td>
                        <td className={styles["price-comparison__table-cell"]}>
                          {obj.pro}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className={styles["price-faq"]}>
          <div className={styles["price-faq__container"]}>
            <h2 className={styles["price-faq__section-title"]}>
              Các câu hỏi thường gặp
            </h2>
            <p className={styles["price-faq__section-subtitle"]}>
              Mọi điều bạn cần biết về gói dịch vụ của LearnFlow.
            </p>

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
