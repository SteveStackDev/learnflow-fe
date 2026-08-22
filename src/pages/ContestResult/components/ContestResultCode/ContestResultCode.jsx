import React, { useState } from "react";
import { Button, ScrollArea } from "~/components/ui";
import Icon from "~/components/Icon/Icon";
import { useToast } from "~/context/ToastContext.jsx";
import styles from "./ContestResultCode.module.css";

function escapeHtml(str) {
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function highlightCode(code) {
  if (!code) return { __html: "" };

  let rawCode = code;
  if (rawCode.endsWith("\n")) {
    rawCode += " ";
  }

  const tokenRegex =
    /(#.*|\/\/.*|\/\*[\s\S]*?\*\/)|("[^"\\]*(?:\\.[^"\\]*)*"|'[^'\\]*(?:\\.[^'\\]*)*')|\b(class|def|return|if|else|for|while|in|import|from|public|private|protected|using|namespace|include|var|let|const|function|new|pass|cout|endl|print|console|log)\b|\b(vector|unordered_map|HashMap|List|Map|Set|int|string|bool|void|double|float|char|auto|self|System|out|println)\b|\b(\d+)\b|(\b[a-zA-Z_]\w*\b(?=\s*\())/g;

  let result = "";
  let lastIndex = 0;
  let match;

  while ((match = tokenRegex.exec(rawCode)) !== null) {
    const textBefore = rawCode.slice(lastIndex, match.index);
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

  result += escapeHtml(rawCode.slice(lastIndex));

  return { __html: result };
}

export function ContestResultCode({ resultData }) {
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);

  const lines = (resultData.code || "").split("\n");
  const lineNumbers = Array.from({ length: Math.max(lines.length, 1) }, (_, i) => i + 1);

  const handleCopyCode = () => {
    navigator.clipboard.writeText(resultData.code);
    setCopied(true);
    toast.success("Đã sao chép mã nguồn bài làm vào bộ nhớ tạm!", "Sao chép code");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={styles.result_code_card}>
      {/* Header Bar */}
      <div className={styles.header_bar}>
        <div className={styles.title_group}>
          <h2 className={styles.problem_title}>{resultData.problemTitle}</h2>
          <span className={styles.badge}>{resultData.level}</span>
        </div>

        <div className={styles.meta_info}>
          <span className={styles.meta_item}>
            <Icon name="Code" size={15} />
            {resultData.language}
          </span>
          <span className={styles.meta_item}>
            <Icon name="Clock" size={15} />
            {resultData.timestamp}
          </span>
        </div>
      </div>

      {/* Code Toolbar */}
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

      {/* Code Workspace */}
      <ScrollArea className={styles.code_workspace}>
        <div className={styles.line_numbers}>
          {lineNumbers.map((num) => (
            <div key={num} className={styles.line_number_item}>
              {num}
            </div>
          ))}
        </div>

        <div className={styles.code_content_wrap}>
          <pre
            className={styles.code_highlight_layer}
            dangerouslySetInnerHTML={highlightCode(resultData.code)}
          />
        </div>
      </ScrollArea>
    </div>
  );
}

export default ContestResultCode;
