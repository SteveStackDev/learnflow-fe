import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import Icon from "~/components/Icon/Icon";
import { problemService } from "~/services/problemService";
import styles from "./DashboardSolvedProblems.module.css";

const STATUS_CONFIG = {
  solved: { icon: "CheckCircle", label: "Đã giải", cls: "solved" },
  AC: { icon: "CheckCircle", label: "Đã giải", cls: "solved" },
  ACCEPTED: { icon: "CheckCircle", label: "Đã giải", cls: "solved" },
  attempted: { icon: "Clock", label: "Đang làm", cls: "attempted" },
  unsolved: { icon: "Minus", label: "Chưa giải", cls: "unsolved" },
};

const DIFF_CONFIG = {
  easy: { label: "Dễ", cls: "easy" },
  Dễ: { label: "Dễ", cls: "easy" },
  medium: { label: "Trung bình", cls: "medium" },
  "Trung bình": { label: "Trung bình", cls: "medium" },
  hard: { label: "Khó", cls: "hard" },
  Khó: { label: "Khó", cls: "hard" },
};

export default function DashboardSolvedProblems() {
  const navigate = useNavigate();
  const [problems, setProblems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    setIsLoading(true);

    problemService
      .getUserProblems()
      .then((data) => {
        if (!isMounted) return;
        const rawList = Array.isArray(data) ? data : [];

        // Deduplicate submissions: Mỗi bài tập chỉ hiển thị đúng 1 dòng duy nhất
        const uniqueMap = new Map();

        rawList.forEach((item) => {
          if (!item) return;
          const p = item.problemId || item;
          const pId = String(p._id || p.id || item.problemId || item.id || "");
          const pCode = String(p.code || item.code || "");
          const pTitle = String(p.title || item.title || "").trim().toLowerCase();

          // Tìm xem bài này đã có trong Map chưa (khớp theo ID, Code hoặc Tiêu đề)
          let existingKey = null;
          for (const [key, existing] of uniqueMap.entries()) {
            const exP = existing.problemId || existing;
            const exId = String(exP._id || exP.id || existing.problemId || existing.id || "");
            const exCode = String(exP.code || existing.code || "");
            const exTitle = String(exP.title || existing.title || "").trim().toLowerCase();

            if (
              (pId && exId && pId === exId) ||
              (pCode && exCode && pCode === exCode) ||
              (pTitle && exTitle && pTitle === exTitle)
            ) {
              existingKey = key;
              break;
            }
          }

          const rawStatus = String(item.status || "").toUpperCase();
          const isAC =
            item.userStatus === "solved" ||
            rawStatus === "AC" ||
            rawStatus === "ACCEPTED" ||
            rawStatus === "SOLVED" ||
            (item.score != null && item.maxScore != null && Number(item.score) >= Number(item.maxScore) && Number(item.maxScore) > 0);

          const canonicalKey = pId || pCode || pTitle || `p_${uniqueMap.size}`;

          if (existingKey) {
            const existing = uniqueMap.get(existingKey);
            const existingIsAC =
              existing.userStatus === "solved" ||
              existing.status === "AC" ||
              existing.status === "ACCEPTED" ||
              existing.status === "SOLVED";

            const finalUserStatus = isAC || existingIsAC ? "solved" : "attempted";
            const finalStatus = isAC || existingIsAC ? "AC" : (item.status || existing.status);

            uniqueMap.set(existingKey, {
              ...existing,
              ...item,
              userStatus: finalUserStatus,
              status: finalStatus,
              problemId: {
                ...(existing.problemId || {}),
                ...(item.problemId || {}),
                code: pCode || existing.code || existing.problemId?.code,
                title: p.title || item.title || existing.title || existing.problemId?.title,
              },
            });
          } else {
            uniqueMap.set(canonicalKey, {
              ...item,
              userStatus: isAC ? "solved" : "attempted",
              status: isAC ? "AC" : item.status,
            });
          }
        });

        const uniqueList = Array.from(uniqueMap.values());
        setProblems(uniqueList.slice(0, 8));
      })
      .catch((err) => {
        console.error("Failed to load user problems:", err);
        if (isMounted) setProblems([]);
      })
      .finally(() => {
        if (isMounted) setIsLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const handleRowClick = (item) => {
    const targetId = item?.problemId?._id || item?.problemId?.id || item?.id;
    if (targetId) navigate(`/problem/${targetId}`);
  };

  const getStatus = (item) => {
    const s = String(item?.userStatus || item?.status || "unsolved").toLowerCase();
    if (s === "solved" || s === "ac" || s === "accepted") {
      return STATUS_CONFIG.solved;
    }
    if (s === "attempted" || s === "wa" || s === "tle" || s === "re" || s === "ce") {
      return STATUS_CONFIG.attempted;
    }
    return STATUS_CONFIG.unsolved;
  };

  const getDiff = (item) => {
    const d = item?.problemId?.difficulty || item?.difficulty || "easy";
    return DIFF_CONFIG[d] || DIFF_CONFIG.easy;
  };

  const solvedCount = problems.filter((p) => {
    const s = String(p?.userStatus || p?.status || "").toLowerCase();
    return s === "solved" || s === "ac" || s === "accepted";
  }).length;

  return (
    <section className={styles.widget}>
      {/* Header */}
      <div className={styles.widget_header}>
        <div className={styles.header_left}>
          <span className={styles.header_icon}>
            <Icon name="Code2" size={18} />
          </span>
          <div>
            <h3 className={styles.header_title}>Bài Tập Đã Làm</h3>
            <p className={styles.header_subtitle}>
              {solvedCount} đã giải / {problems.length} bài tập
            </p>
          </div>
        </div>
        <button
          className={styles.view_all_btn}
          onClick={() => navigate("/problem")}
        >
          Xem tất cả
          <Icon name="ChevronRight" size={14} />
        </button>
      </div>

      {/* Table */}
      <div className={styles.table_wrap}>
        <table className={styles.table}>
          <thead className={styles.thead}>
            <tr>
              <th className={styles.th} style={{ width: "70px" }}>TRẠNG THÁI</th>
              <th className={styles.th} style={{ width: "50px" }}>#</th>
              <th className={styles.th}>TÊN BÀI TẬP</th>
              <th className={styles.th} style={{ width: "110px" }}>ĐỘ KHÓ</th>
              <th className={styles.th} style={{ width: "90px" }}>TỶ LỆ</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              Array.from({ length: 5 }).map((_, i) => (
                <tr key={i} className={styles.skeleton_row}>
                  <td className={styles.td}><div className={styles.skel_icon} /></td>
                  <td className={styles.td}><div className={styles.skel_sm} /></td>
                  <td className={styles.td}><div className={styles.skel_lg} /></td>
                  <td className={styles.td}><div className={styles.skel_md} /></td>
                  <td className={styles.td}><div className={styles.skel_sm} /></td>
                </tr>
              ))
            ) : problems.length === 0 ? (
              <tr>
                <td colSpan="5" className={styles.empty_cell}>
                  <div className={styles.empty_state}>
                    <Icon name="Code2" size={28} />
                    <p>Chưa có bài tập nào được làm</p>
                    <button onClick={() => navigate("/problem")} className={styles.explore_btn}>
                      Bắt đầu luyện tập
                    </button>
                  </div>
                </td>
              </tr>
            ) : (
              problems.map((item, idx) => {
                const statusCfg = getStatus(item);
                const diffCfg = getDiff(item);
                const problemDetail = item?.problemId || {};

                return (
                  <tr
                    key={item.id || item._id || idx}
                    className={styles.tbody_row}
                    onClick={() => handleRowClick(item)}
                    style={{ animationDelay: `${idx * 60}ms` }}
                  >
                    <td className={styles.td}>
                      <span className={`${styles.status_icon} ${styles[`status_${statusCfg.cls}`]}`} title={statusCfg.label}>
                        <Icon name={statusCfg.icon} size={16} />
                      </span>
                    </td>
                    <td className={styles.td}>
                      <span className={styles.code_num}>#{problemDetail.code || item.code || "01"}</span>
                    </td>
                    <td className={styles.td}>
                      <span className={styles.problem_title}>{problemDetail.title || item.title || "Bài tập thuật toán"}</span>
                      {(problemDetail.topic || item.topic) && (
                        <span className={styles.topic_tag}>{problemDetail.topic || item.topic}</span>
                      )}
                    </td>
                    <td className={styles.td}>
                      <span className={`${styles.diff_badge} ${styles[`diff_${diffCfg.cls}`]}`}>
                        {diffCfg.label}
                      </span>
                    </td>
                    <td className={styles.td}>
                      <span className={styles.acceptance}>
                        {problemDetail.acceptance ? problemDetail.acceptance : `${problemDetail.acceptanceRate || 0}%`}
                      </span>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}