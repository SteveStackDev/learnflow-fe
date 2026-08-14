import { Link, useNavigate } from "react-router";
import styles from "./ProblemListTable.module.css";
import Icon from "~/components/Icon/Icon";
import { Pagination } from "~/components/ui";
import useScrollReveal from "~/hooks/useScrollReveal";

function ProblemListTable({
  displayedItems,
  filteredCount,
  currentPage,
  setCurrentPage,
  totalPages,
  itemsPerPage,
}) {
  const navigate = useNavigate();
  useScrollReveal(".reveal-card", [displayedItems, currentPage]);

  const handleRowClick = (item) => {
    navigate(`/problem/${item.slug || item.id}`);
  };

  const getStatusIcon = (status) => {
    if (status === "solved") {
      return (
        <span
          className={`${styles.status_icon} ${styles["status_icon--solved"]}`}
          title="Đã giải thành công"
        >
          <Icon name="CheckCircle" size={18} />
        </span>
      );
    }
    if (status === "attempted") {
      return (
        <span
          className={`${styles.status_icon} ${styles["status_icon--attempted"]}`}
          title="Đã làm nhưng chưa vượt qua toàn bộ test case"
        >
          <Icon name="Clock" size={18} />
        </span>
      );
    }
    return (
      <span
        className={`${styles.status_icon} ${styles["status_icon--unsolved"]}`}
        title="Chưa thử sức"
      >
        <Icon name="Circle" size={18} />
      </span>
    );
  };

  const getBadgeClass = (level) => {
    if (level === "Dễ") return styles["badge--easy"];
    if (level === "Trung bình") return styles["badge--medium"];
    return styles["badge--hard"];
  };

  return (
    <section className={`${styles.table_card} reveal-card`}>
      <div className={styles.table_wrap}>
        <table className={styles.table}>
          <thead className={styles.thead}>
            <tr>
              <th className={styles.th} style={{ width: "80px" }}>
                TRẠNG THÁI
              </th>
              <th className={styles.th} style={{ width: "60px" }}>
                #
              </th>
              <th className={styles.th}>TÊN BÀI TẬP</th>
              <th className={styles.th} style={{ width: "130px" }}>
                ĐỘ KHÓ
              </th>
              <th className={styles.th} style={{ width: "160px" }}>
                TỶ LỆ CHẤP NHẬN
              </th>
              <th className={styles.th}>THẺ</th>
            </tr>
          </thead>
          <tbody>
            {displayedItems.length === 0 ? (
              <tr>
                <td colSpan="6" style={{ textAlign: "center", padding: "40px 20px" }}>
                  Không tìm thấy bài tập nào phù hợp với bộ lọc hiện tại.
                </td>
              </tr>
            ) : (
              displayedItems.map((item, index) => (
                <tr
                  key={`${item.id}-${currentPage}`}
                  className={styles.tbody_row}
                  onClick={() => handleRowClick(item)}
                  style={{ animationDelay: `${index * 85}ms` }}
                >
                  <td className={styles.td}>{getStatusIcon(item.status)}</td>
                  <td className={styles.td}>{item.number}</td>
                  <td className={styles.td}>
                    <Link
                      to={`/problem/${item.slug || item.id}`}
                      className={styles.title_link}
                      onClick={(e) => e.stopPropagation()}
                    >
                      {item.title}
                    </Link>
                  </td>
                  <td className={styles.td}>
                    <span className={`${styles.badge} ${getBadgeClass(item.level)}`}>
                      {item.level}
                    </span>
                  </td>
                  <td className={styles.td}>{item.acceptance}</td>
                  <td className={styles.td}>
                    <div className={styles.tags_wrap}>
                      {item.tags.map((tag) => (
                        <span key={tag} className={styles.tag_chip}>
                          {tag}
                        </span>
                      ))}
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Table Footer & Pagination */}
      <div className={styles.table_footer}>
        <div className={styles.footer_info}>
          Hiển thị {displayedItems.length > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0}-
          {Math.min(currentPage * itemsPerPage, filteredCount)} trên {filteredCount} bài tập
        </div>

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          showWrapper={false}
        />
      </div>
    </section>
  );
}

export default ProblemListTable;
