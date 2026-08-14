import { useNavigate } from "react-router";
import { Button } from "~/components/ui";
import Icon from "~/components/Icon/Icon";
import { useToast } from "~/context/ToastContext.jsx";
import styles from "./PricingCards.module.css";

function PricingCards({ items, isYearly }) {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSelectPackage = (title) => {
    toast.info(`Đã chọn gói "${title}"! Chuyển sang trang thanh toán...`, "Đăng ký gói cước");
    navigate("/checkout");
  };

  return (
    <section className={styles["price-cards"]}>
      <div className={styles["price-cards__container"]}>
        <div className={styles["price-cards__list"]}>
          {items.map((obj, index) => {
            // Calculate dynamic price based on toggle
            let displayPrice = obj.price;
            if (isYearly) {
              if (index === 1) displayPrice = "159.000đ";
              if (index === 2) displayPrice = "319.000đ";
            }

            return (
              <div
                key={obj.id || obj.slug || obj.name || obj.title || obj}
                className={`${styles["price-cards__card"]} ${
                  obj.isPopular ? styles["price-cards__card--popular"] : ""
                } ${index === 2 ? styles["price-cards__card--pro"] : ""}`}
              >
                {obj.isPopular && (
                  <div className={styles["price-cards__card-badge-wrap"]}>
                    <span className={styles["price-cards__card-badge"]}>Phổ biến nhất</span>
                  </div>
                )}

                <div className={styles["price-cards__card-content"]}>
                  <h3 className={styles["price-cards__card-title"]}>{obj.title}</h3>
                  <div className={styles["price-cards__card-price-box"]}>
                    <span className={styles["price-cards__card-price"]}>{displayPrice}</span>
                    <span className={styles["price-cards__card-period"]}>{obj.period}</span>
                  </div>

                  <ul className={styles["price-cards__card-features"]}>
                    {obj.features.map((item) => (
                      <li
                        key={item.id || item.text || item.title || item}
                        className={styles["price-cards__feature-item"]}
                      >
                        <span className={styles["price-cards__feature-icon"]}>
                          <Icon name="Check" size={16} />
                        </span>
                        <span className={styles["price-cards__feature-text"]}>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className={styles["price-cards__card-actions"]}>
                  <Button
                    variant={obj.isPopular ? "contained" : index === 2 ? "dark" : "outlined"}
                    className={styles.card_btn}
                    onClick={() => handleSelectPackage(obj.title)}
                  >
                    {obj.buttonText}
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default PricingCards;
