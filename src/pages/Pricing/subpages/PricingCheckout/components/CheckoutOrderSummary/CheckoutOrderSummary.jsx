import React, { useState } from "react";
import { Card, Button, Badge } from "~/components/ui";
import Icon from "~/components/Icon/Icon";
import { useToast } from "~/context/ToastContext.jsx";
import styles from "./CheckoutOrderSummary.module.css";

export function CheckoutOrderSummary({
  planInfo,
  availablePromos,
  onConfirmPayment,
  isProcessing,
}) {
  const { toast } = useToast();
  const [promoInput, setPromoInput] = useState("PROMO20");
  const [appliedPromo, setAppliedPromo] = useState(availablePromos["PROMO20"]);

  const handleApplyPromo = () => {
    const code = promoInput.trim().toUpperCase();
    if (!code) {
      toast.warning("Vui lòng nhập mã giảm giá!", "Mã ưu đãi");
      return;
    }

    if (availablePromos[code]) {
      setAppliedPromo(availablePromos[code]);
      toast.success(
        `Áp dụng thành công mã ${code} (${availablePromos[code].title})!`,
        "Mã ưu đãi",
      );
    } else {
      toast.error("Mã giảm giá không hợp lệ hoặc đã hết hạn!", "Mã ưu đãi");
    }
  };

  // Calculate pricing breakdown
  const originalPrice = planInfo.price;
  const discountAmount = appliedPromo
    ? Math.round((originalPrice * appliedPromo.discountPercent) / 100)
    : 0;
  const finalPrice = Math.max(0, originalPrice - discountAmount);

  const formatVND = (num) => new Intl.NumberFormat("vi-VN").format(num) + " ₫";

  return (
    <Card className={styles.summary_card}>
      {/* Blue Header Banner */}
      <div className={styles.summary_header}>
        <h3 className={styles.header_title}>Tóm tắt đơn hàng</h3>
      </div>

      {/* Plan Showcase Details */}
      <div className={styles.summary_body}>
        <div className={styles.plan_item_row}>
          <div>
            <h4 className={styles.plan_title}>{planInfo.title}</h4>
            <Badge variant="primary" size="sm" style={{ marginTop: "6px" }}>
              {planInfo.durationBadge}
            </Badge>
          </div>
          <div className={styles.plan_price}>{planInfo.formattedPrice}</div>
        </div>

        <div className={styles.divider} />

        {/* Promo Code Input Field */}
        <div className={styles.promo_section}>
          <div className={styles.promo_input_wrap}>
            <input
              type="text"
              placeholder="NHẬP MÃ GIẢM GIÁ..."
              value={promoInput}
              onChange={(e) => setPromoInput(e.target.value)}
              className={styles.promo_input}
            />
            <Button variant="outlined" size="sm" onClick={handleApplyPromo}>
              Áp dụng
            </Button>
          </div>
        </div>

        {/* Breakdown Table */}
        <div className={styles.breakdown_table}>
          <div className={styles.breakdown_row}>
            <span className={styles.label_text}>Tạm tính</span>
            <span className={styles.val_text}>{formatVND(originalPrice)}</span>
          </div>

          {appliedPromo && (
            <div className={styles.breakdown_row}>
              <span className={styles.label_discount}>
                Giảm giá ({appliedPromo.code})
              </span>
              <span className={styles.val_discount}>
                -{formatVND(discountAmount)}
              </span>
            </div>
          )}

          <div className={styles.divider} />

          <div className={styles.total_row}>
            <span className={styles.total_label}>Tổng thanh toán</span>
            <span className={styles.total_val}>{formatVND(finalPrice)}</span>
          </div>
        </div>

        {/* Main Action Payment Button */}
        <div className={styles.action_section}>
          <Button
            variant="contained"
            size="lg"
            leftIcon="Lock"
            isLoading={isProcessing}
            onClick={() => onConfirmPayment(finalPrice)}
            className={styles.payment_btn}
          >
            Xác nhận thanh toán
          </Button>

          <p className={styles.disclaimer_text}>
            Bằng việc xác nhận, bạn đồng ý với{" "}
            <a href="#" className={styles.terms_link}>
              Điều khoản dịch vụ
            </a>{" "}
            của FySet.
          </p>
        </div>

        {/* Trust Security Badges */}
        <div className={styles.trust_badges_row}>
          <div className={styles.trust_item}>
            <Icon name="ShieldCheck" size={18} className={styles.trust_icon} />
            <span>BẢO MẬT 256-BIT</span>
          </div>
          <div className={styles.trust_item}>
            <Icon name="Lock" size={18} className={styles.trust_icon} />
            <span>MÃ HÓA SSL</span>
          </div>
          <div className={styles.trust_item}>
            <Icon name="CheckCircle" size={18} className={styles.trust_icon} />
            <span>THANH TOÁN AN TOÀN</span>
          </div>
        </div>
      </div>
    </Card>
  );
}

export default CheckoutOrderSummary;
