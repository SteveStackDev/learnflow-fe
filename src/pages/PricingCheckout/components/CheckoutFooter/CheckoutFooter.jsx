import React from "react";
import { Link } from "react-router";
import styles from "./CheckoutFooter.module.css";

export function CheckoutFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.copyright}>
        © {currentYear} FySet. All rights reserved.
      </div>

      <div className={styles.footer_links}>
        <Link to="#" className={styles.link}>
          Privacy Policy
        </Link>
        <span className={styles.dot}>•</span>
        <Link to="#" className={styles.link}>
          Terms of Service
        </Link>
        <span className={styles.dot}>•</span>
        <Link to="#" className={styles.link}>
          Refund Policy
        </Link>
        <span className={styles.dot}>•</span>
        <Link to="/contact" className={styles.link}>
          Contact Support
        </Link>
      </div>
    </footer>
  );
}

export default CheckoutFooter;
