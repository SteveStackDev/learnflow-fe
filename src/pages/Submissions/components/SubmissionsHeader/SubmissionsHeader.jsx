import React from "react";
import { Link } from "react-router";
import Icon from "~/components/Icon/Icon";
import styles from "./SubmissionsHeader.module.css";

export function SubmissionsHeader({ scopeType, scopeId, scopeTitle, backUrl }) {
  let titleText = "Lịch sử nộp bài";
  let subtitleText = "Theo dõi và phân tích quá trình giải quyết vấn đề của bạn.";

  if (scopeType === "problem") {
    titleText = `Lịch sử nộp bài: ${scopeTitle || `Bài tập #${scopeId}`}`;
    subtitleText = `Danh sách tất cả lần nộp bài của bạn cho bài tập này.`;
  } else if (scopeType === "contest") {
    titleText = `Lịch sử nộp bài: ${scopeTitle || `Cuộc thi #${scopeId}`}`;
    subtitleText = `Danh sách tất cả lần nộp bài của bạn trong cuộc thi này.`;
  }

  return (
    <div className={styles.header_container}>
      {backUrl && (
        <div className={styles.back_link_wrapper}>
          <Link to={backUrl} className={styles.back_btn}>
            <Icon name="ArrowLeft" size={16} />
            <span>
              {scopeType === "problem"
                ? `Quay lại Bài tập`
                : scopeType === "contest"
                ? `Quay lại Cuộc thi`
                : `Quay lại`}
            </span>
          </Link>
        </div>
      )}

      <div className={styles.header_content}>
        <div>
          <div className={styles.title_row}>
            <h1 className={styles.page_title}>{titleText}</h1>
            {scopeType && (
              <span className={`${styles.scope_badge} ${styles[`scope_badge--${scopeType}`]}`}>
                {scopeType === "problem" ? "Bài tập" : "Cuộc thi"}
              </span>
            )}
          </div>
          <p className={styles.page_subtitle}>{subtitleText}</p>
        </div>
      </div>
    </div>
  );
}

export default SubmissionsHeader;
