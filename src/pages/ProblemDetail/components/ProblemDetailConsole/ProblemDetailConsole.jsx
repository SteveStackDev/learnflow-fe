import styles from "./ProblemDetailConsole.module.css";
import Icon from "~/components/Icon/Icon";

function ProblemDetailConsole({ consoleLogs }) {
  return (
    <div className={styles.console_panel}>
      {/* Console Header Bar */}
      <div className={styles.header_bar}>
        <div className={styles.header_title}>
          <Icon name="Terminal" size={16} />
          <span>Console Log</span>
        </div>
      </div>

      {/* Terminal Output Window */}
      <div className={styles.console_body}>
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
            </div>
          ))
        ) : (
          <div className={styles.empty_log}>
            Chưa có dữ liệu Console Log. Bấm nút &quot;Chạy thử&quot; hoặc &quot;Nộp bài&quot; để
            xem kết quả biên dịch và thông tin xuất dữ liệu (stdout).
          </div>
        )}
      </div>
    </div>
  );
}

export default ProblemDetailConsole;
