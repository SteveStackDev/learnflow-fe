import { useRef } from "react";
import styles from "./ContestCodeEditor.module.css";
import Icon from "~/components/Icon/Icon";
import { Button } from "~/components/ui";
import { highlightCode, handleEditorKeyDown } from "~/utils/codeHighlighter";

export function ContestCodeEditor({
  code,
  onChangeCode,
  onResetCode,
  onRunTest,
  onSubmitCode,
  onFileUpload,
  isSubmitting,
  isExecuting,
  language = "cpp",
}) {
  const textareaRef = useRef(null);
  const lineNumbersRef = useRef(null);
  const fileInputRef = useRef(null);

  const lines = (code || "").split("\n");
  const lineNumbers = Array.from({ length: Math.max(lines.length, 1) }, (_, i) => i + 1);
  const isDisabled = isSubmitting || isExecuting;

  const handleScroll = (e) => {
    if (lineNumbersRef.current) {
      lineNumbersRef.current.scrollTop = e.target.scrollTop;
    }
  };

  const handleKeyDown = (e) => {
    handleEditorKeyDown(e, code, onChangeCode, textareaRef, language);
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result;
      if (typeof content === "string" && onFileUpload) {
        onFileUpload(content);
      }
    };
    reader.readAsText(file);
    e.target.value = "";
  };

  return (
    <section className={styles.editor_panel}>
      {/* Toolbar */}
      <div className={styles.toolbar}>
        <div className={styles.toolbar_left}>
          {/* Hardcoded Language Selector (C++ Only) */}
          <div className={styles.select_wrapper}>
            <button
              type="button"
              className={styles.select_btn}
              title="Hệ thống chấm chỉ hỗ trợ C++"
              style={{ cursor: "default" }}
            >
              <span>C++</span>
            </button>
          </div>

          <button
            type="button"
            onClick={onResetCode}
            className={styles.tool_btn}
            title="Đặt lại mã mẫu"
          >
            <Icon name="RotateCcw" size={15} />
          </button>
        </div>

        <div className={styles.toolbar_right}>
          <button type="button" className={styles.tool_btn} title="Cài đặt">
            <Icon name="Settings" size={15} />
          </button>
          <button type="button" className={styles.tool_btn} title="Toàn màn hình">
            <Icon name="Maximize2" size={15} />
          </button>
        </div>
      </div>

      {/* Code Area Workspace */}
      <div className={styles.workspace}>
        <div className={styles.line_numbers} ref={lineNumbersRef}>
          {lineNumbers.map((num) => (
            <div key={num} className={styles.line_number_item}>
              {num}
            </div>
          ))}
        </div>

        <div className={styles.code_scroll_container} onScroll={handleScroll}>
          <div className={styles.code_inner_wrap}>
            <pre
              className={styles.code_highlight_layer}
              dangerouslySetInnerHTML={highlightCode(code, language)}
            />
            <textarea
              ref={textareaRef}
              value={code || ""}
              rows={Math.max(lines.length, 15)}
              onChange={(e) => onChangeCode(e.target.value)}
              onKeyDown={handleKeyDown}
              className={styles.code_textarea}
              spellCheck="false"
              autoCapitalize="off"
              autoComplete="off"
              autoCorrect="off"
            />
          </div>
        </div>
      </div>

      {/* Integrated Footer Action Bar using UI Button component */}
      <div className={styles.footer_bar}>
        <div className={styles.save_status}>
          <Icon name="CheckCircle" size={16} />
          <span>Đã lưu tự động</span>
        </div>

        <div className={styles.actions_right}>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept=".cpp,.hpp,.c,.h,.txt"
            style={{ display: "none" }}
          />

          <Button
            variant="outlined"
            leftIcon="Upload"
            disabled={isDisabled}
            onClick={() => fileInputRef.current?.click()}
            title="Tải tệp mã nguồn C++ từ máy tính"
          >
            Tải file lên
          </Button>

          <Button
            variant="outlined"
            leftIcon="Play"
            isLoading={isExecuting}
            disabled={isDisabled}
            onClick={onRunTest}
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
    </section>
  );
}

export default ContestCodeEditor;
