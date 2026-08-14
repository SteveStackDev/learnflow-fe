import React from "react";
import { Link } from "react-router";
import styles from "./CheckoutHeader.module.css";

export function CheckoutHeader() {
  return (
    <header className={styles.header}>
      <div className={styles.header_text}>
        <h1 className={styles.title}>Thanh toán an toàn</h1>
        <p className={styles.subtitle}>
          Hoàn tất giao dịch để bắt đầu hành trình học tập cùng FySet.
        </p>
      </div>

      <Link to="/" className={styles.brand_logo} title="Trang chủ FySet">
        <span className={styles.logo_text}>FySet</span>
      </Link>
    </header>
  );
}

export default CheckoutHeader;
