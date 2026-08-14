import React from "react";
import { Card } from "~/components/ui";
import Icon from "~/components/Icon/Icon";
import styles from "./CheckoutPaymentMethods.module.css";

export function CheckoutPaymentMethods({ methods, selectedId, onSelectMethod }) {
  return (
    <Card className={styles.methods_card}>
      <div className={styles.section_header}>
        <div className={styles.icon_wrap}>
          <Icon name="CreditCard" size={20} className={styles.header_icon} />
        </div>
        <h2 className={styles.section_title}>Phương thức thanh toán</h2>
      </div>

      <div className={styles.methods_grid}>
        {methods.map((method) => {
          const isSelected = method.id === selectedId;

          return (
            <div
              key={method.id}
              onClick={() => onSelectMethod(method.id)}
              className={`${styles.method_option} ${
                isSelected ? styles["method_option--selected"] : ""
              }`}
            >
              <div className={styles.option_icon_box}>
                <Icon name={method.icon} size={28} />
              </div>
              <span className={styles.option_title}>{method.title}</span>
              <span className={styles.option_desc}>{method.description}</span>
            </div>
          );
        })}
      </div>
    </Card>
  );
}

export default CheckoutPaymentMethods;
