import Icon from "~/components/Icon/Icon";
import styles from "./DashboardContribution.module.css";

function DashboardContribution({ matrix = [] }) {
  const now = new Date();
  const currentMonth = now.getMonth() + 1;
  const currentYear = now.getFullYear();
  // Dynamic days in current month (e.g. 31 days for August)
  const totalDaysInMonth = new Date(currentYear, currentMonth, 0).getDate();

  // Slice matrix to match exact days in the current month
  const currentMonthMatrix = matrix.slice(0, totalDaysInMonth);
  const activeCount = currentMonthMatrix.filter((item) => item.count > 0).length;

  return (
    <div className={styles.contribution_card}>
      <div className={styles.contribution_header}>
        <h3 className={styles.contribution_title}>
          <Icon name="Calendar" size={18} className={styles.contribution_title_icon} />
          <span>Điểm danh online</span>
        </h3>
        <span className={styles.contribution_subtitle}>
          Tháng {currentMonth}/{currentYear} • {activeCount}/{totalDaysInMonth} ngày
        </span>
      </div>

      {/* GitHub Grid with Day Numbers */}
      <div className={styles.contribution_grid}>
        {currentMonthMatrix.map((item, idx) => (
          <div
            key={idx}
            className={`${styles.contribution_cell} ${styles[`level_${item.level}`]}`}
            title={`Ngày ${idx + 1}/${currentMonth}/${currentYear}: ${item.count} hoạt động`}
          >
            <span className={styles.contribution_day_num}>{idx + 1}</span>
          </div>
        ))}
      </div>

      {/* Footer Legend */}
      <div className={styles.contribution_footer}>
        <span>Ít</span>
        <div className={styles.legend_cells}>
          <div className={`${styles.legend_box} ${styles.level_0}`} />
          <div className={`${styles.legend_box} ${styles.level_1}`} />
          <div className={`${styles.legend_box} ${styles.level_2}`} />
          <div className={`${styles.legend_box} ${styles.level_3}`} />
          <div className={`${styles.legend_box} ${styles.level_4}`} />
        </div>
        <span>Nhiều</span>
      </div>
    </div>
  );
}

export default DashboardContribution;
