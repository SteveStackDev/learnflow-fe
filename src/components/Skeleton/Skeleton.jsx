import styles from "./Skeleton.module.css";

export function Skeleton({
  variant = "text",
  width,
  height,
  className = "",
  style = {},
}) {
  const inlineStyle = {
    ...(width ? { width } : {}),
    ...(height ? { height } : {}),
    ...style,
  };

  return (
    <div
      className={`${styles.skeleton} ${styles[`skeleton--${variant}`]} ${className}`}
      style={inlineStyle}
      aria-hidden="true"
    />
  );
}

export function SkeletonCard() {
  return (
    <div className={styles["skeleton-card-wrapper"]}>
      <Skeleton variant="card" className={styles["skeleton-card-wrapper__media"]} />
      <div className={styles["skeleton-card-wrapper__header"]}>
        <Skeleton variant="avatar" />
        <Skeleton variant="title" style={{ width: "60%", margin: 0 }} />
      </div>
      <div className={styles["skeleton-card-wrapper__body"]}>
        <Skeleton variant="text" style={{ width: "90%" }} />
        <Skeleton variant="text" style={{ width: "70%" }} />
      </div>
      <Skeleton variant="text" height={36} style={{ borderRadius: 10, marginTop: 8 }} />
    </div>
  );
}

export function SkeletonTableRow() {
  return (
    <div className={styles["skeleton-table-row"]}>
      <Skeleton variant="avatar" style={{ width: 32, height: 32 }} />
      <Skeleton variant="avatar" />
      <Skeleton variant="text" style={{ width: "40%", margin: 0 }} />
      <Skeleton variant="text" style={{ width: "20%", margin: 0, marginLeft: "auto" }} />
    </div>
  );
}

export function SkeletonPricingCard() {
  return (
    <div className={styles["skeleton-pricing-wrapper"]}>
      <Skeleton variant="title" style={{ width: "40%" }} />
      <Skeleton variant="text" style={{ width: "80%" }} />
      <Skeleton variant="text" height={48} style={{ width: "50%", margin: "16px 0" }} />
      <Skeleton variant="text" style={{ width: "100%" }} />
      <Skeleton variant="text" style={{ width: "90%" }} />
      <Skeleton variant="text" style={{ width: "85%" }} />
      <Skeleton variant="text" height={42} style={{ borderRadius: 12, marginTop: 16 }} />
    </div>
  );
}

export default Skeleton;
