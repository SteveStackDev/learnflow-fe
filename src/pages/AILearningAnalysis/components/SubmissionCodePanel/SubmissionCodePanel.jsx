import { useState } from "react";
import styles from "./SubmissionCodePanel.module.css";
import Icon from "~/components/Icon/Icon";
import { useToast } from "~/context/ToastContext";
import { Card, Badge, Button, ScrollArea } from "~/components/ui";

function escapeHtml(str) {
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

function SubmissionCodePanel({ submission, suspectedLines = [] }) {
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);

  const codeLines = (submission.code || "").split("\n");
  const suspectedSet = new Set(suspectedLines);

  const handleCopy = () => {
    navigator.clipboard.writeText(submission.code || "");
    setCopied(true);
    if (toast?.success) {
      toast.success("Mã nguồn đã được sao chép vào bộ nhớ tạm.", "Đã sao chép");
    }
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Card hoverable className={styles.code_card}>
      {/* Code Toolbar */}
      <div className={styles.code_toolbar}>
        <div className={styles.toolbar_left}>
          <h3 className={styles.toolbar_title}>
            Your Code – Submission #{submission.id}
          </h3>
          <Badge variant="neutral" size="sm" className={styles.lines_count_badge}>
            {codeLines.length} lines
          </Badge>
        </div>

        <Button
          variant="outlined"
          size="sm"
          leftIcon={copied ? "Check" : "Copy"}
          onClick={handleCopy}
          className={styles.copy_btn}
        >
          {copied ? "Copied" : "Copy"}
        </Button>
      </div>

      {/* Code Editor Viewport with Line Numbers and Error Highlighting */}
      <ScrollArea className={styles.code_scroll_viewport}>
        <div className={styles.code_grid}>
          {/* Gutter: Line numbers */}
          <div className={styles.gutter}>
            {codeLines.map((_, i) => {
              const lineNo = i + 1;
              const isSuspected = suspectedSet.has(lineNo);
              return (
                <div
                  key={lineNo}
                  className={`${styles.line_number} ${
                    isSuspected ? styles["line_number--suspected"] : ""
                  }`}
                >
                  {lineNo}
                </div>
              );
            })}
          </div>

          {/* Code Text Content */}
          <div className={styles.code_lines_container}>
            {codeLines.map((line, i) => {
              const lineNo = i + 1;
              const isSuspected = suspectedSet.has(lineNo);
              return (
                <div
                  key={lineNo}
                  className={`${styles.code_line} ${
                    isSuspected ? styles["code_line--suspected"] : ""
                  }`}
                >
                  <pre
                    className={styles.code_text}
                    dangerouslySetInnerHTML={highlightCode(line || " ")}
                  />
                  {isSuspected && (
                    <span className={styles.suspected_flag} title="AI phát hiện vị trí nghi vấn lỗi">
                      <Icon name="AlertCircle" size={13} />
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </ScrollArea>

      {/* Footer Banner: Suspected Lines Hint */}
      {suspectedLines.length > 0 && (
        <div className={styles.suspected_footer}>
          <Icon name="AlertCircle" size={15} className={styles.suspected_icon} />
          <span className={styles.suspected_text}>
            AI suspects the issue is around line{suspectedLines.length > 1 ? "s" : ""}{" "}
            <strong>{suspectedLines.join(", ")}</strong>
          </span>
        </div>
      )}
    </Card>
  );
}

export default SubmissionCodePanel;
