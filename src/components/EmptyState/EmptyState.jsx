import Icon from "~/components/Icon/Icon";
import styles from "./EmptyState.module.css";

export function EmptyState({
  iconName = "Search",
  title = "Không tìm thấy kết quả phù hợp",
  description = "Thử thay đổi từ khóa tìm kiếm hoặc điều chỉnh bộ lọc để xem nội dung khác.",
  actionLabel = "Xóa bộ lọc",
  onAction,
  className = "",
}) {
  return (
    <div className={`${styles["empty-state"]} ${className}`}>
      <div className={styles["empty-state__icon-wrapper"]}>
        <Icon name={iconName} size={32} />
      </div>
      <h3 className={styles["empty-state__title"]}>{title}</h3>
      <p className={styles["empty-state__desc"]}>{description}</p>
      {onAction && (
        <button type="button" onClick={onAction} className={styles["empty-state__btn"]}>
          <Icon name="RotateCcw" size={16} />
          <span>{actionLabel}</span>
        </button>
      )}
    </div>
  );
}

export default EmptyState;
