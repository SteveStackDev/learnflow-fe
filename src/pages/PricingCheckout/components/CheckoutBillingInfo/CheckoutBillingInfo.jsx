import React, { useState } from "react";
import { Card } from "~/components/ui";
import Icon from "~/components/Icon/Icon";
import styles from "./CheckoutBillingInfo.module.css";

export function CheckoutBillingInfo() {
  const [useCurrentAccount, setUseCurrentAccount] = useState(true);

  return (
    <Card className={styles.card_container}>
      <div className={styles.section_header}>
        <div className={styles.icon_wrap}>
          <Icon name="FileText" size={20} className={styles.header_icon} />
        </div>
        <h2 className={styles.section_title}>Thông tin xuất hóa đơn</h2>
      </div>

      <div
        className={styles.option_row}
        onClick={() => setUseCurrentAccount(!useCurrentAccount)}
      >
        <div
          className={`${styles.radio_dot} ${
            useCurrentAccount ? styles["radio_dot--active"] : ""
          }`}
        >
          {useCurrentAccount && <span className={styles.radio_inner} />}
        </div>

        <div className={styles.option_text}>
          <span className={styles.option_title}>
            Sử dụng thông tin tài khoản hiện tại
          </span>
          <span className={styles.option_desc}>
            Hóa đơn điện tử e-Invoice sẽ được gửi tự động về email{" "}
            <strong>nguyen.vana@example.com</strong>
          </span>
        </div>
      </div>
    </Card>
  );
}

export default CheckoutBillingInfo;
