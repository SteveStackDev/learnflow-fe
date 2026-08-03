import React from "react";
import styles from "./PageLoader.module.css";
import Icon from "~/components/Icon/Icon";

export default function PageLoader() {
  return (
    <div className={styles.pageloader}>
      <div className={styles.pageloader__content}>
        <div className={styles["pageloader__spinner-wrap"]}>
          <div className={styles.pageloader__ring} />
          <div className={styles.pageloader__logo}>
            <Icon name="Zap" size={28} />
          </div>
        </div>
        <span className={styles.pageloader__text}>LearnFlow đang tải...</span>
      </div>
    </div>
  );
}
