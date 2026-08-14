import { useState, useRef } from "react";
import styles from "./ProblemDetailEditor.module.css";
import Icon from "~/components/Icon/Icon";
import ProblemDetailFooter from "../ProblemDetailFooter/ProblemDetailFooter";

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

function ProblemDetailEditor({
  languages,
  selectedLanguage,
  setSelectedLanguage,
  code,
  setCode,
  onResetCode,
  onRunCode,
  onSubmitCode,
  isSubmitting,
  onFileUpload,
}) {
  const [openLangDropdown, setOpenLangDropdown] = useState(false);
  const textareaRef = useRef(null);
  const lineNumbersRef = useRef(null);

  // Calculate line numbers strictly matching actual code lines
  const lines = (code || "").split("\n");
  const lineNumbers = Array.from({ length: Math.max(lines.length, 1) }, (_, i) => i + 1);

  const handleScroll = (e) => {
    if (lineNumbersRef.current) {
      lineNumbersRef.current.scrollTop = e.target.scrollTop;
    }
  };

  const handleWorkspaceClick = (e) => {
    if (e.target !== textareaRef.current && textareaRef.current) {
      textareaRef.current.focus();
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Tab") {
      e.preventDefault();
      const start = e.target.selectionStart;
      const end = e.target.selectionEnd;
      const val = code;
      setCode(val.substring(0, start) + "    " + val.substring(end));
      setTimeout(() => {
        if (textareaRef.current) {
          textareaRef.current.selectionStart = textareaRef.current.selectionEnd = start + 4;
        }
      }, 0);
    }
  };

  return (
    <div className={styles.editor_panel}>
      {/* Editor Header Toolbar */}
      <div className={styles.toolbar}>
        <div className={styles.toolbar_left}>
          {/* Language Selector */}
          <div className={styles.select_wrapper}>
            <button
              type="button"
              onClick={() => setOpenLangDropdown(!openLangDropdown)}
              className={styles.select_btn}
            >
              <span>{selectedLanguage.label}</span>
              <Icon name="ChevronDown" size={14} />
            </button>

            {openLangDropdown && (
              <div className={styles.dropdown_menu}>
                {languages.map((lang) => (
                  <div
                    key={lang.id}
                    onClick={() => {
                      setSelectedLanguage(lang);
                      setOpenLangDropdown(false);
                    }}
                    className={`${styles.dropdown_item} ${
                      selectedLanguage.id === lang.id ? styles["dropdown_item--selected"] : ""
                    }`}
                  >
                    <span>{lang.label}</span>
                    {selectedLanguage.id === lang.id && <Icon name="Check" size={14} />}
                  </div>
                ))}
              </div>
            )}
          </div>

          <button
            type="button"
            onClick={onResetCode}
            className={styles.tool_icon_btn}
            title="Đặt lại mã mẫu"
          >
            <Icon name="RotateCcw" size={16} />
          </button>
        </div>

        <div className={styles.toolbar_right}>
          <button type="button" className={styles.tool_icon_btn} title="Cài đặt trình soạn thảo">
            <Icon name="Settings" size={16} />
          </button>
          <button type="button" className={styles.tool_icon_btn} title="Toàn màn hình">
            <Icon name="Maximize2" size={16} />
          </button>
        </div>
      </div>

      {/* Code Textarea Workspace */}
      <div className={styles.workspace} onClick={handleWorkspaceClick}>
        {/* Fixed Width Centered Line Numbers */}
        <div className={styles.line_numbers} ref={lineNumbersRef}>
          {lineNumbers.map((num) => (
            <div key={num} className={styles.line_number_item}>
              {num}
            </div>
          ))}
        </div>

        {/* Single Scrollable Code Container */}
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
              onChange={(e) => setCode(e.target.value)}
              onKeyDown={handleKeyDown}
              className={styles.code_textarea}
              spellCheck="false"
            />
          </div>
        </div>
      </div>

      {/* Editor Integrated Footer Action Bar */}
      <ProblemDetailFooter
        onRunCode={onRunCode}
        onSubmitCode={onSubmitCode}
        isSubmitting={isSubmitting}
        onFileUpload={onFileUpload}
      />
    </div>
  );
}

export default ProblemDetailEditor;
