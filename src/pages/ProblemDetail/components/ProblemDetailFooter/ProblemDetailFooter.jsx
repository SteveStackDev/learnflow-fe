import { useRef } from "react";
import styles from "./ProblemDetailFooter.module.css";
import Icon from "~/components/Icon/Icon";
import { Button } from "~/components/ui";
import { useToast } from "~/context/ToastContext.jsx";

function ProblemDetailFooter({
  onRunCode,
  onSubmitCode,
  isSubmitting,
  isExecuting,
  onFileUpload,
}) {
  const fileInputRef = useRef(null);
  const { toast } = useToast();
  const isDisabled = isSubmitting || isExecuting;

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

        <Button
          variant="outlined"
          leftIcon="Upload"
          disabled={isDisabled}
          onClick={() => fileInputRef.current?.click()}
          title="Tải tệp mã nguồn từ máy tính"
        >
          Tải file lên
        </Button>

        <Button
          variant="outlined"
          leftIcon="Play"
          isLoading={isExecuting}
          disabled={isDisabled}
          onClick={onRunCode}
        >
          {isExecuting ? "Đang chạy..." : "Chạy thử"}
        </Button>

        <Button
          variant="contained"
          leftIcon="UploadCloud"
          isLoading={isSubmitting}
          disabled={isDisabled}
          onClick={onSubmitCode}
        >
          {isSubmitting ? "Đang chấm bài..." : "Nộp bài"}
        </Button>
      </div>
    </div>
  );
}

export default ProblemDetailFooter;
