import Icon from "~/components/Icon/Icon";
import EmptyState from "~/components/EmptyState/EmptyState";
import { Pagination } from "~/components/ui";
import styles from "./LeaderboardTable.module.css";

function LeaderboardTable({
  filteredAndSortedItems,
  displayedItems,
  currentPage,
  setCurrentPage,
  totalPages,
  setSearchQuery,
  setActiveTab,
}) {
  return (
    <section className={styles["board-ranking"]}>
      <div className={styles["board-ranking__container"]}>
        <div className={styles["board-ranking__table-wrapper"]}>
          <table className={styles["board-ranking__table"]}>
            <thead>
              <tr
                className={`${styles["board-ranking__table-row"]} ${styles["board-ranking__table-row--header"]}`}
              >
                <th
                  className={`${styles["board-ranking__table-cell"]} ${styles["board-ranking__table-cell--header"]}`}
                >
                  HẠNG
                </th>
                <th
                  className={`${styles["board-ranking__table-cell"]} ${styles["board-ranking__table-cell--header"]}`}
                >
                  NGƯỜI DÙNG
                </th>
                <th
                  className={`${styles["board-ranking__table-cell"]} ${styles["board-ranking__table-cell--header"]}`}
                >
                  THÀNH TÍCH
                </th>
                <th
                  className={`${styles["board-ranking__table-cell"]} ${styles["board-ranking__table-cell--header"]}`}
                >
                  XU HƯỚNG
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredAndSortedItems.length === 0 ? (
                <tr>
                  <td colSpan={6}>
                    <EmptyState
                      iconName="Search"
                      title="Không tìm thấy người dùng"
                      description="Không có ai trong bảng xếp hạng khớp với từ khóa của bạn."
                      actionLabel="Xóa tìm kiếm"
                      onAction={() => {
                        setSearchQuery("");
                        setActiveTab(0);
                      }}
                    />
                  </td>
                </tr>
              ) : (
                displayedItems.map((obj) => (
                  <tr
                    key={obj.id || obj.slug || obj.name || obj.title || obj}
                    className={`${styles["board-ranking__table-row"]} ${
                      obj.isCurrentUser ? styles["board-ranking__table-row--current-user"] : ""
                    }`}
                  >
                    <td
                      className={`${styles["board-ranking__table-cell"]} ${styles["board-ranking__table-cell--rank"]}`}
                    >
                      {obj.rank}
                    </td>
                    <td className={styles["board-ranking__table-cell"]}>
                      <div className={styles["board-ranking__user-info"]}>
                        {obj.isCurrentUser ? (
                          <div className={styles["board-ranking__avatar-fallback"]}>B</div>
                        ) : (
                          <img
                            className={styles["board-ranking__avatar"]}
                            src={obj.avatarUrl}
                            alt={`Ảnh đại diện của ${obj.name}`}
                            loading="lazy"
                            decoding="async"
                          />
                        )}
                        <span className={styles["board-ranking__user-name"]}>{obj.name}</span>
                        {obj.isCurrentUser && (
                          <span className={styles["board-ranking__chip-tag"]}>CURRENT</span>
                        )}
                      </div>
                    </td>
                    <td
                      className={`${styles["board-ranking__table-cell"]} ${styles["board-ranking__table-cell--points"]}`}
                    >
                      {obj.points}
                    </td>
                    <td className={styles["board-ranking__table-cell"]}>
                      <span
                        className={`${styles["board-ranking__trend-label"]} ${
                          styles[`board-ranking__trend-label--${obj.trend}`]
                        }`}
                      >
                        {obj.trend === "up" && (
                          <span className={styles["board-ranking__trend-icon--up"]}>
                            <Icon name="TrendingUp" size={16} />
                          </span>
                        )}
                        {obj.trend === "down" && (
                          <span className={styles["board-ranking__trend-icon--down"]}>
                            <Icon name="TrendingDown" size={16} />
                          </span>
                        )}
                        {obj.trend === "same" && (
                          <span className={styles["board-ranking__trend-icon--same"]}>—</span>
                        )}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Dynamic Pagination Controls */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
    </section>
  );
}

export default LeaderboardTable;
