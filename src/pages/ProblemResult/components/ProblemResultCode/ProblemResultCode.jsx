import { useState, useRef } from "react";
import styles from "./ProblemResultCode.module.css";
import Icon from "~/components/Icon/Icon";
import { useToast } from "~/context/ToastContext";
import { Button, ScrollArea } from "~/components/ui";

function escapeHtml(str) {
  if (!str) return "";
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function highlightCode(code) {
  if (!code) return { __html: "" };

  const tokenRegex =
    /(#.*|\/\/.*|\/\*[\s\S]*?\*\/)|("[^"\\]*(?:\\.[^"\\]*)*"|'[^'\\]*(?:\\.[^'\\]*)*')|\b(class|def|return|if|else|for|while|in|import|from|public|private|protected|using|namespace|include|var|let|const|function|new|pass|cout|endl|print|console|log)\b|\b(vector|unordered_map|HashMap|List|Map|Set|int|string|bool|void|double|float|char|auto|self|System|out|println)\b|\b(\d+)\b|(\b[a-zA-Z_]\w*\b(?=\s*\())/g;

  let result = "";
  let lastIndex = 0;
  let match;

  while ((match = tokenRegex.exec(code)) !== null) {
    const textBefore = code.slice(lastIndex, match.index);
    result += escapeHtml(textBefore);

    const [, comment, str, keyword, typeToken, numToken, funcToken] = match;

    if (comment) {
      result += `<span class="syn_comment">${escapeHtml(comment)}</span>`;
    } else if (str) {
      result += `<span class="syn_string">${escapeHtml(str)}</span>`;
    } else if (keyword) {
      result += `<span class="syn_keyword">${escapeHtml(keyword)}</span>`;
    } else if (typeToken) {
      result += `<span class="syn_type">${escapeHtml(typeToken)}</span>`;
    } else if (numToken) {
      result += `<span class="syn_number">${escapeHtml(numToken)}</span>`;
    } else if (funcToken) {
      result += `<span class="syn_function">${escapeHtml(funcToken)}</span>`;
    }

    lastIndex = tokenRegex.lastIndex;
  }

  result += escapeHtml(code.slice(lastIndex));

  return { __html: result };
}

function ProblemResultCode({ resultData }) {
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);
  const lineNumbersRef = useRef(null);

  const lines = (resultData.submittedCode || "").split("\n");
  const lineNumbers = Array.from({ length: lines.length }, (_, i) => i + 1);

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
          <span className={`${styles.badge} ${styles.badge_easy}`}>
            {resultData.difficultyLabel}
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
            dangerouslySetInnerHTML={highlightCode(resultData.submittedCode)}
          />
        </ScrollArea>
      </div>
    </div>
  );
}

export default ProblemResultCode;
