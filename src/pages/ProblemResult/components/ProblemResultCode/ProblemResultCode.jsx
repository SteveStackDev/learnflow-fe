import { useState, useRef } from "react";
import styles from "./ProblemResultCode.module.css";
import Icon from "~/components/Icon/Icon";
import { useToast } from "~/context/ToastContext";
import { Button, ScrollArea } from "~/components/ui";
import { highlightCode } from "~/utils/codeHighlighter";

function ProblemResultCode({ resultData }) {
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);
  const lineNumbersRef = useRef(null);

  const lines = (resultData.submittedCode || "").split("\n");
  const lineNumbers = Array.from({ length: lines.length }, (_, i) => i + 1);

  const getDifficultyClass = (diff) => {
    const d = String(diff || "").toLowerCase();
    if (d.includes("khó") || d.includes("hard")) return styles.badge_hard;
    if (d.includes("trung bình") || d.includes("medium")) return styles.badge_medium;
    return styles.badge_easy;
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(resultData.submittedCode);
    setCopied(true);
    toast.success("Đã sao chép mã nguồn làm vào clipboard!", "Sao chép");
    setTimeout(() => setCopied(false), 2000);
  };

  const handleScroll = (e) => {
    if (lineNumbersRef.current) {
      lineNumbersRef.current.scrollTop = e.target.scrollTop;
    }
  };

  return (
    <div className={styles.result_code_card}>
      {/* Problem Title & Header Bar */}
      <div className={styles.header_bar}>
        <div className={styles.title_group}>
          <h1 className={styles.problem_title}>{resultData.problemTitle}</h1>
          <span
            className={`${styles.badge} ${getDifficultyClass(
              resultData.difficultyLabel || resultData.difficulty
            )}`}
          >
            {resultData.difficultyLabel || "Dễ"}
          </span>
        </div>

        <div className={styles.meta_info}>
          <span className={styles.meta_item}>
            <Icon name="Code" size={14} />
            {resultData.language}
          </span>
          <span className={styles.meta_item}>
            <Icon name="Clock" size={14} />
            {resultData.submittedAt}
          </span>
        </div>
      </div>

      {/* Submitted Code Viewer Toolbar */}
      <div className={styles.code_toolbar}>
        <div className={styles.toolbar_left}>
          <span className={styles.code_tag}>Mã nguồn bài làm của bạn</span>
          <span className={styles.lines_count}>{lines.length} dòng</span>
        </div>

        <Button
          variant="ghost"
          size="sm"
          leftIcon={copied ? "Check" : "Copy"}
          onClick={handleCopyCode}
        >
          {copied ? "Đã chép" : "Sao chép"}
        </Button>
      </div>

      {/* Syntax Highlighted Code Viewer with Shared UI ScrollArea */}
      <div className={styles.code_workspace}>
        <div className={styles.line_numbers} ref={lineNumbersRef}>
          {lineNumbers.map((num) => (
            <div key={num} className={styles.line_number_item}>
              {num}
            </div>
          ))}
        </div>

        <ScrollArea className={styles.code_content_wrap} onScroll={handleScroll}>
          <pre
            className={styles.code_highlight_layer}
            dangerouslySetInnerHTML={highlightCode(resultData.submittedCode, resultData.language || "cpp")}
          />
        </ScrollArea>
      </div>
    </div>
  );
}

export default ProblemResultCode;
