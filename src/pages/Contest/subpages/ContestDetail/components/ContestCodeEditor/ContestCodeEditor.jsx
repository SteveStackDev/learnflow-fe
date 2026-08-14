import React, { useState, useRef } from "react";
import { Button } from "~/components/ui";
import Icon from "~/components/Icon/Icon";
import styles from "./ContestCodeEditor.module.css";

const LANGUAGES = [
  { id: "cpp", label: "C++ (GCC 9.2.0)" },
  { id: "python", label: "Python3" },
  { id: "java", label: "Java 17" },
  { id: "js", label: "JavaScript (Node 18)" },
];

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

export function ContestCodeEditor({
  code,
  onChangeCode,
  onResetCode,
  onRunTest,
  onSubmitCode,
  onFileUpload,
  isSubmitting,
}) {
  const [selectedLang, setSelectedLang] = useState(LANGUAGES[0]);
  const [openLangDropdown, setOpenLangDropdown] = useState(false);
  const textareaRef = useRef(null);
  const lineNumbersRef = useRef(null);
  const fileInputRef = useRef(null);

  const lines = (code || "").split("\n");
  const lineNumbers = Array.from({ length: Math.max(lines.length, 1) }, (_, i) => i + 1);

  const handleScroll = (e) => {
    if (lineNumbersRef.current) {
      lineNumbersRef.current.scrollTop = e.target.scrollTop;
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Tab") {
      e.preventDefault();
      const start = e.target.selectionStart;
      const end = e.target.selectionEnd;
      const val = code;
      onChangeCode(val.substring(0, start) + "    " + val.substring(end));
      setTimeout(() => {
        if (textareaRef.current) {
          textareaRef.current.selectionStart = textareaRef.current.selectionEnd = start + 4;
        }
      }, 0);
    }
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
          <div className={styles.select_wrapper}>
            <button
              type="button"
              onClick={() => setOpenLangDropdown(!openLangDropdown)}
              className={styles.select_btn}
            >
              <span>{selectedLang.label}</span>
              <Icon name="ChevronDown" size={14} />
            </button>

            {openLangDropdown && (
              <div className={styles.dropdown_menu}>
                {LANGUAGES.map((lang) => (
                  <div
                    key={lang.id}
                    onClick={() => {
                      setSelectedLang(lang);
                      setOpenLangDropdown(false);
                    }}
                    className={`${styles.dropdown_item} ${
                      selectedLang.id === lang.id ? styles["dropdown_item--selected"] : ""
                    }`}
                  >
                    <span>{lang.label}</span>
                    {selectedLang.id === lang.id && <Icon name="Check" size={14} />}
                  </div>
                ))}
              </div>
            )}
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

      {/* Code Area */}
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
              dangerouslySetInnerHTML={highlightCode(code)}
            />
            <textarea
              ref={textareaRef}
              value={code}
              rows={Math.max(lines.length, 15)}
              onChange={(e) => onChangeCode(e.target.value)}
              onKeyDown={handleKeyDown}
              className={styles.code_textarea}
              spellCheck="false"
            />
          </div>
        </div>
      </div>

      {/* Integrated Footer Action Bar */}
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
            accept=".py,.cpp,.c,.java,.js,.ts,.txt"
            style={{ display: "none" }}
          />

          <Button
            variant="outlined"
            leftIcon="Upload"
            onClick={() => fileInputRef.current?.click()}
            title="Tải tệp mã nguồn từ máy tính"
          >
            Tải file lên
          </Button>

          <Button
            variant="outlined"
            leftIcon="Play"
            onClick={onRunTest}
          >
            Chạy thử
          </Button>

          <Button
            variant="contained"
            leftIcon="UploadCloud"
            isLoading={isSubmitting}
            onClick={onSubmitCode}
          >
            Nộp bài ngay
          </Button>
        </div>
      </div>
    </section>
  );
}

export default ContestCodeEditor;
