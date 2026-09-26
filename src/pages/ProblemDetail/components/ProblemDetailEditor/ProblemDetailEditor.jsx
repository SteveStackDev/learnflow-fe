import { useRef, useState, useEffect } from "react";
import styles from "./ProblemDetailEditor.module.css";
import Icon from "~/components/Icon/Icon";
import ProblemDetailFooter from "../ProblemDetailFooter/ProblemDetailFooter";

function escapeHtml(str) {
  if (!str) return "";
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
  code,
  setCode,
  languages = [],
  selectedLanguage,
  onLanguageChange,
  onResetCode,
  onRunCode,
  onSubmitCode,
  isSubmitting,
  isExecuting,
  onFileUpload,
}) {
  const textareaRef = useRef(null);
  const lineNumbersRef = useRef(null);
  const dropdownRef = useRef(null);
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);

  const defaultLanguages = [
    { id: "cpp", label: "C++ (g++)" },
    { id: "c", label: "C (gcc)" },
    { id: "python", label: "Python 3" },
    { id: "java", label: "Java (OpenJDK 17)" },
    { id: "javascript", label: "JavaScript (Node.js)" },
  ];

  const availableLanguages = languages && languages.length > 0 ? languages : defaultLanguages;
  const currentLang = selectedLanguage || availableLanguages[0];

  // Close dropdown on outside click
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsLangDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

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
      const val = code || "";
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
          {/* Interactive Multi-Language Dropdown Selector */}
          <div className={styles.select_wrapper} ref={dropdownRef}>
            <button
              type="button"
              className={styles.select_btn}
              onClick={() => setIsLangDropdownOpen((prev) => !prev)}
              title="Chọn ngôn ngữ lập trình cho bài tập"
            >
              <Icon name="Code" size={14} style={{ color: "#0950c3" }} />
              <span>{currentLang.label || currentLang.name || "C++"}</span>
              <Icon name="ChevronDown" size={13} style={{ opacity: 0.6 }} />
            </button>

            {isLangDropdownOpen && (
              <div className={styles.dropdown_menu}>
                {availableLanguages.map((lang) => {
                  const isSelected = lang.id === currentLang.id;
                  return (
                    <div
                      key={lang.id}
                      className={`${styles.dropdown_item} ${isSelected ? styles["dropdown_item--selected"] : ""}`}
                      onClick={() => {
                        if (onLanguageChange) {
                          onLanguageChange(lang);
                        }
                        setIsLangDropdownOpen(false);
                      }}
                    >
                      <span>{lang.label || lang.name}</span>
                      {isSelected && <Icon name="Check" size={13} />}
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          <button
            type="button"
            onClick={onResetCode}
            className={styles.tool_icon_btn}
            title="Đặt lại mã mẫu ban đầu cho ngôn ngữ hiện tại"
          >
            <Icon name="RotateCcw" size={15} />
          </button>
        </div>

        <div className={styles.toolbar_right}>
          <button type="button" className={styles.tool_icon_btn} title="Cài đặt trình soạn thảo">
            <Icon name="Settings" size={15} />
          </button>
          <button type="button" className={styles.tool_icon_btn} title="Toàn màn hình">
            <Icon name="Maximize2" size={15} />
          </button>
        </div>
      </div>

      {/* Code Area Workspace - Identical to ContestCodeEditor */}
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
              aria-hidden="true"
              className={styles.code_highlight_layer}
              dangerouslySetInnerHTML={highlightCode(code)}
            />
            <textarea
              ref={textareaRef}
              value={code || ""}
              rows={Math.max(lines.length, 15)}
              onChange={(e) => setCode(e.target.value)}
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

      {/* Embedded Problem Footer Actions */}
      <ProblemDetailFooter
        onRunCode={onRunCode}
        onSubmitCode={onSubmitCode}
        isSubmitting={isSubmitting}
        isExecuting={isExecuting}
        onFileUpload={onFileUpload}
      />
    </div>
  );
}

export default ProblemDetailEditor;
