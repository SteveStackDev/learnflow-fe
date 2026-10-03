import { useNavigate } from "react-router";
import styles from "./ProblemListTable.module.css";
import Icon from "~/components/Icon/Icon";
import { Pagination, ScrollArea } from "~/components/ui";
import useScrollReveal from "~/hooks/useScrollReveal";
import { useAuth } from "~/context/AuthContext.jsx";
import { useToast } from "~/context/ToastContext.jsx";

function ProblemListTable({
  displayedItems,
  filteredCount,
  currentPage,
  setCurrentPage,
  totalPages,
  itemsPerPage,
  isLoading = false,
}) {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { toast } = useToast();
  useScrollReveal(".reveal-card", [displayedItems, currentPage, isLoading]);

  const handleRowClick = (item) => {
    if (!isAuthenticated) {
      toast.warning("Vui lòng đăng nhập để xem chi tiết bài tập!", "Yêu cầu đăng nhập");
      navigate("/signin");
      return;
    }
    navigate(`/problem/${item.slug || item.id}`);
  };

  const handleLinkClick = (e, item) => {
    e.stopPropagation();
    e.preventDefault();
    handleRowClick(item);
  };


  const getStatusIcon = (status) => {
    const s = String(status || "").toLowerCase();
    if (s === "solved" || s === "ac" || s === "accepted") {
      return (
        <span
          className={`${styles.status_icon} ${styles["status_icon--solved"]}`}
          title="Đã giải thành công (Accepted)"
        >
          <Icon name="CheckCircle2" size={18} />
        </span>
      );
    }
    if (s === "attempted" || s === "wa" || s === "tle" || s === "re" || s === "ce") {
      return (
        <span
          className={`${styles.status_icon} ${styles["status_icon--attempted"]}`}
          title="Đang làm (Chưa đạt điểm tối đa)"
        >
          <Icon name="Clock" size={18} />
        </span>
      );
    }
    return (
      <span className={`${styles.status_icon} ${styles["status_icon--unsolved"]}`} title="Chưa giải">
        <Icon name="Minus" size={16} />
      </span>
    );
  };

  const getBadgeClass = (level) => {
    if (level === "Dễ" || level === "Easy") return styles["badge--easy"];
    if (level === "Trung bình" || level === "Medium") return styles["badge--medium"];
    return styles["badge--hard"];
  };

  return (
    <section className={`${styles.table_card} reveal-card`}>
      <ScrollArea className={styles.table_wrap}>
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
            {isLoading ? (
              <tr>
                <td colSpan="6" style={{ textAlign: "center", padding: "50px 20px" }}>
                  <div style={{ display: "inline-flex", alignItems: "center", gap: 10, color: "#94a3b8" }}>
                    <Icon name="Loader2" size={20} className="animate-spin" />
                    <span>Đang tải danh sách bài tập từ máy chủ...</span>
                  </div>
                </td>
              </tr>
            ) : displayedItems.length === 0 ? (
              <tr>
                <td colSpan="6" style={{ textAlign: "center", padding: "40px 20px", color: "#94a3b8" }}>
                  Chưa có bài tập nào hoặc không tìm thấy bài tập phù hợp.
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
                  <td className={styles.td}>{getStatusIcon(item.userStatus || item.status)}</td>
                  <td className={styles.td}>#{item.code || item.number || item.id}</td>
                  <td className={styles.td}>
                    <a
                      href={`/problem/${item.slug || item.id}`}
                      className={styles.title_link}
                      onClick={(e) => handleLinkClick(e, item)}
                    >
                      {item.title}
                    </a>
                  </td>
                  <td className={styles.td}>
                    <span className={`${styles.badge} ${getBadgeClass(item.level || item.difficulty)}`}>
                      {item.level || item.difficultyLabel || "Dễ"}
                    </span>
                  </td>
                  <td className={styles.td}>
                    {item.acceptance || item.successRate || `${item.acceptanceRate || 0}%`}
                  </td>
                  <td className={styles.td}>
                    <div className={styles.tags_wrap}>
                      {(item.tags || [item.topic || "Thuật toán"]).map((tag) => (
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
      </ScrollArea>

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
