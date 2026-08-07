import styles from "./PricingHero.module.css";

function PricingHero({ isYearly, setIsYearly }) {
  return (
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
  );
}

export default PricingHero;
