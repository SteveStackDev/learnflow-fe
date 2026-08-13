import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import Icon from "~/components/Icon/Icon";
import { useToast } from "~/context/ToastContext.jsx";
import styles from "./ContestTable.module.css";

export function ContestTable({ contests, onOpenPreview }) {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [registeredMap, setRegisteredMap] = useState({});

  const handleRegister = (contestId, contestTitle) => {
    setRegisteredMap((prev) => ({ ...prev, [contestId]: true }));
    toast.success(`Đã đăng ký tham gia ${contestTitle}!`, "Đăng ký thành công");
  };

  if (!contests || contests.length === 0) {
    return (
      <div className={styles.table_card}>
        <div className={styles.empty_state}>
          <Icon name="Search" size={32} style={{ marginBottom: 8, opacity: 0.5 }} />
          <div>Không tìm thấy cuộc thi phù hợp với từ khóa của bạn.</div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.table_card}>
      <div className={styles.table_responsive}>
        <table className={styles.contest_table}>
          <thead>
            <tr>
              <th>Contest Name</th>
              <th>Writers</th>
              <th>Start Time</th>
              <th>Duration</th>
              <th>Action / Preview</th>
            </tr>
          </thead>
          <tbody>
            {contests.map((item) => (
              <tr key={item.id}>
                {/* Contest Name Cell */}
                <td>
                  <div className={styles.contest_info_cell}>
                    <div className={styles.title_row}>
                      {item.status === "LIVE" && (
                        <span className={`${styles.status_badge} ${styles["status_badge--live"]}`}>
                          <span className={styles.live_dot} />
                          LIVE
                        </span>
                      )}
                      {item.status === "UPCOMING" && (
                        <span
                          className={`${styles.status_badge} ${styles["status_badge--upcoming"]}`}
                        >
                          UPCOMING
                        </span>
                      )}
                      {item.status === "FINISHED" && (
                        <span
                          className={`${styles.status_badge} ${styles["status_badge--finished"]}`}
                        >
                          FINISHED
                        </span>
                      )}

                      <Link to={`/contest/${item.id}`} className={styles.contest_title}>
                        {item.title}
                      </Link>
                    </div>

                    <div className={styles.participants_meta}>
                      <Icon name="Users" size={13} />
                      <span>{item.participants} participants</span>
                    </div>
                  </div>
                </td>

                {/* Writers Cell */}
                <td>
                  <span className={styles.text_muted}>{item.writers}</span>
                </td>

                {/* Start Time Cell */}
                <td>
                  <span className={styles.start_time_text}>{item.startTime}</span>
                </td>

                {/* Duration Cell */}
                <td>
                  <span className={styles.duration_text}>{item.duration}</span>
                </td>

                {/* Action & Preview Cell */}
                <td>
                  <div className={styles.action_cell}>
                    {/* Primary Action Button */}
                    {item.status === "LIVE" && (
                      <Link to={`/contest/${item.id}`} className={styles.join_btn}>
                        <span>Join Now</span>
                      </Link>
                    )}

                    {item.status === "UPCOMING" &&
                      (registeredMap[item.id] ? (
                        <div className={styles.registered_badge}>
                          <Icon name="Check" size={14} />
                          <span>Đã đăng ký</span>
                        </div>
                      ) : (
                        <button
                          type="button"
                          onClick={() => handleRegister(item.id, item.title)}
                          className={styles.register_btn}
                        >
                          <span>Register</span>
                        </button>
                      ))}

                    {item.status === "FINISHED" && (
                      <Link to={`/contest/${item.id}/result`} className={styles.standings_btn}>
                        <span>Final Standings</span>
                        <Icon name="ArrowRight" size={14} />
                      </Link>
                    )}

                    {/* Secondary Action: Preview Problems */}
                    <button
                      type="button"
                      onClick={() => onOpenPreview(item)}
                      className={styles.preview_btn}
                    >
                      <Icon name="List" size={13} />
                      <span>Preview Problems</span>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ContestTable;
