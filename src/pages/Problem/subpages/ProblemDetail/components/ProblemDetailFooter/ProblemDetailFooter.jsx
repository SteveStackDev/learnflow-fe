import { useRef } from "react";
import styles from "./ProblemDetailFooter.module.css";
import Icon from "~/components/Icon/Icon";
import { useToast } from "~/context/ToastContext.jsx";

function ProblemDetailFooter({ onRunCode, onSubmitCode, isSubmitting, onFileUpload }) {
  const fileInputRef = useRef(null);
  const { toast } = useToast();

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result;
      if (typeof content === "string" && onFileUpload) {
        onFileUpload(content);
        toast.success(`Đã tải lên tệp "${file.name}" thành công!`, "Tải file lên");
      }
    };
    reader.readAsText(file);
    e.target.value = "";
  };

  return (
    <div className={styles.footer_bar}>
      <div className={styles.save_status}>
        <Icon name="CheckCircle" size={16} />
        <span>Đã lưu tự động</span>
      </div>

      <div className={styles.actions_right}>
        {/* Hidden File Input */}
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept=".py,.cpp,.c,.java,.js,.ts,.txt"
          style={{ display: "none" }}
        />

        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className={styles.upload_btn}
          title="Tải tệp mã nguồn từ máy tính"
        >
          <Icon name="Upload" size={15} />
          <span>Tải file lên</span>
        </button>

        <button type="button" onClick={onRunCode} className={styles.run_btn}>
          <Icon name="Play" size={15} />
          <span>Chạy thử</span>
        </button>

        <button
          type="button"
          onClick={onSubmitCode}
          disabled={isSubmitting}
          className={styles.submit_btn}
        >
          <Icon name="UploadCloud" size={16} />
          <span>{isSubmitting ? "Đang nộp..." : "Nộp bài"}</span>
        </button>
      </div>
    </div>
  );
}

export default ProblemDetailFooter;
