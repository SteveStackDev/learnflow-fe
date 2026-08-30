import styles from "./ProblemDetailConsole.module.css";
import Icon from "~/components/Icon/Icon";
import { ScrollArea } from "~/components/ui";

function ProblemDetailConsole({ consoleLogs, onClearLogs, isSubmitting, isExecuting, judgingStep }) {
  return (
    <div className={styles.console_panel}>
      {/* Console Header Bar */}
      <div className={styles.header_bar}>
        <div className={styles.header_title}>
          <Icon name="Terminal" size={16} />
          <span>Console Log</span>
          {(isSubmitting || isExecuting) && (
            <span className={styles.status_badge}>
              <Icon name="Loader2" size={13} className={styles.spin_icon} />
              <span>{isSubmitting ? "Đang chấm bài..." : "Đang chạy..."}</span>
            </span>
          )}
        </div>

        {consoleLogs && consoleLogs.length > 0 && (
          <button
            type="button"
            onClick={onClearLogs}
            className={styles.clear_btn}
            title="Xóa lịch sử Console Log"
          >
            <Icon name="Trash2" size={14} />
            <span>Xóa Log</span>
          </button>
        )}
      </div>

      {/* Judging Live Banner */}
      {(isSubmitting || isExecuting) && (
        <div className={styles.judging_banner}>
          <div className={styles.banner_content}>
            <Icon name="Cpu" size={18} className={styles.banner_icon} />
            <div className={styles.banner_text}>
              <strong>{isSubmitting ? "Tiến trình Chấm bài tự động (FySet Judge Engine)" : "Đang thực thi mã nguồn..."}</strong>
              <p>{judgingStep || "Đang xử lý request (Timeout 60s)..."}</p>
            </div>
          </div>
          <div className={styles.progress_bar_wrap}>
            <div className={styles.progress_bar_fill} />
          </div>
        </div>
      )}

      {/* Terminal Output Window */}
      <ScrollArea className={styles.console_body}>
        {consoleLogs && consoleLogs.length > 0 ? (
          consoleLogs.map((log, idx) => (
            <div key={idx} className={styles.log_line}>
              {log.type === "info" && (
                <span className={styles.log_info}>[Compiler] {log.text}</span>
              )}
              {log.type === "stdout" && (
                <span className={styles.log_stdout}>[stdout] {log.text}</span>
              )}
              {log.type === "success" && (
                <span className={styles.log_success}>[Result] {log.text}</span>
              )}
              {log.type === "error" && (
                <span className={styles.log_error}>[Error] {log.text}</span>
              )}
              {log.type === "warning" && (
                <span className={styles.log_warning}>[Warning] {log.text}</span>
              )}
            </div>
          ))
        ) : (
          <div className={styles.empty_log}>
            Chưa có dữ liệu Console Log. Bấm nút &quot;Chạy thử&quot; hoặc &quot;Nộp bài&quot; để
            xem kết quả biên dịch và thông tin xuất dữ liệu (stdout).
          </div>
        )}
      </ScrollArea>
    </div>
  );
}

export default ProblemDetailConsole;
