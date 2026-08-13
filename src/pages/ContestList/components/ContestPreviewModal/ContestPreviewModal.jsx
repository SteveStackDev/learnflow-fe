import React from "react";
import { Link } from "react-router";
import Icon from "~/components/Icon/Icon";
import styles from "./ContestPreviewModal.module.css";

export function ContestPreviewModal({ contest, onClose }) {
  if (!contest) return null;

  return (
    <div className={styles.modal_overlay} onClick={onClose}>
      <div className={styles.modal_card} onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className={styles.modal_header}>
          <div className={styles.modal_title_group}>
            <Icon name="List" size={18} style={{ color: "#0950c3" }} />
            <h3 className={styles.modal_title}>{contest.title} - Preview</h3>
          </div>
          <button type="button" onClick={onClose} className={styles.close_btn}>
            <Icon name="X" size={18} />
          </button>
        </div>

        {/* Body Problems List */}
        <div className={styles.modal_body}>
          {contest.problemsPreview && contest.problemsPreview.length > 0 ? (
            contest.problemsPreview.map((prob) => (
              <div key={prob.id} className={styles.problem_item}>
                <div className={styles.prob_left}>
                  <div className={styles.prob_badge}>{prob.id}</div>
                  <span className={styles.prob_title}>{prob.title}</span>
                </div>

                <div className={styles.prob_right}>
                  <span
                    className={`${styles.diff_tag} ${
                      prob.difficulty === "Dễ"
                        ? styles["diff_tag--easy"]
                        : prob.difficulty === "Trung bình"
                        ? styles["diff_tag--medium"]
                        : styles["diff_tag--hard"]
                    }`}
                  >
                    {prob.difficulty}
                  </span>
                  <span className={styles.pts_tag}>{prob.points} pts</span>
                </div>
              </div>
            ))
          ) : (
            <div style={{ padding: "20px", textAlign: "center", color: "#64748b" }}>
              Chưa có thông tin xem trước cho cuộc thi này.
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className={styles.modal_footer}>
          <button type="button" onClick={onClose} className={styles.cancel_btn}>
            Đóng
          </button>
          <Link to={`/contest/${contest.id}`} className={styles.enter_btn}>
            <span>Vào cuộc thi</span>
            <Icon name="ArrowRight" size={15} />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ContestPreviewModal;
