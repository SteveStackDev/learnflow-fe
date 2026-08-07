import styles from "./PricingComparison.module.css";

function PricingComparison({ comparisons }) {
  return (
    <section className={styles["price-comparison"]}>
      <div className={styles["price-comparison__container"]}>
        <div className={styles["price-comparison__header"]}>
          <h2 className={styles["price-comparison__section-title"]}>So sánh chi tiết các gói</h2>
          <p className={styles["price-comparison__section-subtitle"]}>
            Tìm hiểu kỹ hơn về sự khác biệt giữa các cấp độ thành viên.
          </p>
        </div>

        <div className={styles["price-comparison__table-wrapper"]}>
          <table className={styles["price-comparison__table"]}>
            <thead>
              <tr
                className={`${styles["price-comparison__table-row"]} ${styles["price-comparison__table-row--header"]}`}
              >
                <th
                  className={`${styles["price-comparison__table-cell"]} ${styles["price-comparison__table-cell--header-label"]}`}
                >
                  Tính năng
                </th>
                <th
                  className={`${styles["price-comparison__table-cell"]} ${styles["price-comparison__table-cell--header"]}`}
                >
                  Free
                </th>
                <th
                  className={`${styles["price-comparison__table-cell"]} ${styles["price-comparison__table-cell--header"]} ${styles["price-comparison__table-cell--popular"]}`}
                >
                  Plus
                </th>
                <th
                  className={`${styles["price-comparison__table-cell"]} ${styles["price-comparison__table-cell--header"]}`}
                >
                  Pro
                </th>
              </tr>
            </thead>
            <tbody>
              {comparisons.map((obj) => {
                if (obj.type === "section") {
                  return (
                    <tr
                      key={obj.id || obj.slug || obj.name || obj.title || obj}
                      className={`${styles["price-comparison__table-row"]} ${styles["price-comparison__table-row--section"]}`}
                    >
                      <td
                        colSpan={4}
                        className={`${styles["price-comparison__table-cell"]} ${styles["price-comparison__table-cell--section"]}`}
                      >
                        {obj.name}
                      </td>
                    </tr>
                  );
                }
                return (
                  <tr
                    key={obj.id || obj.slug || obj.name || obj.title || obj}
                    className={styles["price-comparison__table-row"]}
                  >
                    <td
                      className={`${styles["price-comparison__table-cell"]} ${styles["price-comparison__table-cell--label"]}`}
                    >
                      {obj.name}
                    </td>
                    <td className={styles["price-comparison__table-cell"]}>
                      {obj.free === "✓" ? (
                        <span className={styles["price-comparison__check"]}>✓</span>
                      ) : obj.free === "—" ? (
                        <span className={styles["price-comparison__dash"]}>—</span>
                      ) : (
                        obj.free
                      )}
                    </td>
                    <td
                      className={`${styles["price-comparison__table-cell"]} ${styles["price-comparison__table-cell--popular"]}`}
                    >
                      {obj.plus === "✓" ? (
                        <span className={styles["price-comparison__check"]}>✓</span>
                      ) : obj.plus === "—" ? (
                        <span className={styles["price-comparison__dash"]}>—</span>
                      ) : (
                        obj.plus
                      )}
                    </td>
                    <td className={styles["price-comparison__table-cell"]}>
                      {obj.pro === "✓" ? (
                        <span className={styles["price-comparison__check"]}>✓</span>
                      ) : obj.pro === "—" ? (
                        <span className={styles["price-comparison__dash"]}>—</span>
                      ) : (
                        obj.pro
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

export default PricingComparison;
