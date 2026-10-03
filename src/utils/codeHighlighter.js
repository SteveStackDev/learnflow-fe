/**
 * FySet Code Syntax Highlighter & Smart Indenter Engine
 * Hỗ trợ đa ngôn ngữ: C++, C, Python 3, Java, JavaScript
 */

function escapeHtml(str) {
  if (!str) return "";
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

export function highlightCode(code, language = "cpp") {
  if (!code) return { __html: "" };

  let rawCode = code;
  if (rawCode.endsWith("\n")) {
    rawCode += " ";
  }

  const lang = (language || "cpp").toLowerCase();

  // -------------------------------------------------------------
  // Regular Expressions theo từng nhóm ngôn ngữ
  // -------------------------------------------------------------
  let combinedRegex;

  if (lang.includes("py")) {
    // PYTHON
    combinedRegex = new RegExp(
      [
        // 1. Comments
        /(#.*)/.source,
        // 2. Multiline / Standard Strings & Formatted Strings
        /("""[\s\S]*?"""|'''[\s\S]*?'''|f"[^"\\]*(?:\\.[^"\\]*)*"|f'[^'\\]*(?:\\.[^'\\]*)*'|r"[^"\\]*(?:\\.[^'\\]*)*"|r'[^'\\]*(?:\\.[^'\\]*)*'|"[^"\\]*(?:\\.[^'\\]*)*"|'[^'\\]*(?:\\.[^'\\]*)*')/.source,
        // 3. Keywords
        /\b(def|class|return|if|elif|else|for|while|break|continue|pass|import|from|as|try|except|finally|raise|with|yield|async|await|lambda|global|nonlocal|in|is|not|and|or)\b/.source,
        // 4. Built-in Types & Constants
        /\b(True|False|None|self|cls|int|float|str|bool|list|dict|set|tuple|bytes|bytearray|object)\b/.source,
        // 5. Built-in Functions & Standard Library
        /\b(print|input|len|range|enumerate|zip|min|max|sum|abs|map|filter|sorted|reversed|open|type|isinstance|sys|math|collections|itertools|heapq|bisect|stdin|stdout|readline|read|split|append|extend|pop|insert|remove)\b/.source,
        // 6. Numbers (hex, float, int)
        /\b(0x[0-9a-fA-F]+|0b[01]+|\d+(?:\.\d+)?(?:e[+-]?\d+)?)\b/.source,
        // 7. Function Call / Definition
        /(\b[a-zA-Z_]\w*\b)(?=\s*\()/.source,
        // 8. Operators
        /(::|->|==|!=|<=|>=|\+=|-=|\*=|(?<!\/)\/=(?!\/)|\/\/=|\/\/|\*\*|\+|-|\*|\/|%|=|&|\||\^|~|<|>)/.source,
      ].join("|"),
      "g"
    );
  } else if (lang.includes("java")) {
    // JAVA
    combinedRegex = new RegExp(
      [
        // 1. Comments
        /(\/\/.*|\/\*[\s\S]*?\*\/)/.source,
        // 2. Strings & Characters
        /("[^"\\]*(?:\\.[^"\\]*)*"|'[^'\\]*(?:\\.[^'\\]*)*')/.source,
        // 3. Keywords
        /\b(public|private|protected|class|interface|enum|extends|implements|static|final|abstract|void|return|if|else|for|while|do|switch|case|default|break|continue|new|this|super|import|package|try|catch|finally|throw|throws|instanceof)\b/.source,
        // 4. Types
        /\b(int|long|double|float|char|boolean|byte|short|String|Integer|Long|Double|Float|Character|Boolean|Scanner|System|Math|Arrays|Collections|ArrayList|List|HashMap|Map|HashSet|Set|Queue|Stack|PriorityQueue|StringBuilder|BufferedReader|InputStreamReader|StringTokenizer)\b/.source,
        // 5. Built-ins / Literals / Constants
        /\b(true|false|null|out|in|err|println|print|printf|next|nextInt|nextLong|nextDouble|nextLine|hasNext|hasNextInt|size|add|get|set|remove|contains|isEmpty|length|charAt|substring|toString)\b/.source,
        // 6. Numbers
        /\b(0x[0-9a-fA-F]+L?|\d+(?:\.\d+)?(?:[fFdDlL])?)\b/.source,
        // 7. Function Call
        /(\b[a-zA-Z_]\w*\b)(?=\s*\()/.source,
        // 8. Operators
        /(::|->|==|!=|<=|>=|\+\+|--|\+=|-=|\*=|(?<!\/)\/=(?!\/)|\+|-|\*|\/|%|=|&&|\|\||!|&|\||\^|~|<|>)/.source,
      ].join("|"),
      "g"
    );
  } else if (lang.includes("js") || lang.includes("javascript") || lang.includes("node")) {
    // JAVASCRIPT
    combinedRegex = new RegExp(
      [
        // 1. Comments
        /(\/\/.*|\/\*[\s\S]*?\*\/)/.source,
        // 2. Strings (including template literals)
        /(`(?:[^`\\]*(?:\\.[^`\\]*)*)`|"[^"\\]*(?:\\.[^"\\]*)*"|'[^'\\]*(?:\\.[^'\\]*)*')/.source,
        // 3. Keywords
        /\b(function|return|if|else|for|while|do|switch|case|default|break|continue|var|let|const|class|extends|new|this|import|export|from|default|async|await|try|catch|finally|throw|typeof|instanceof|in|of|yield|void|delete)\b/.source,
        // 4. Types / Standard Globals
        /\b(console|process|fs|require|Math|Array|Object|String|Number|Boolean|Set|Map|Promise|JSON|BigInt|Symbol|Date|RegExp|Error)\b/.source,
        // 5. Built-ins / Literals
        /\b(true|false|null|undefined|NaN|Infinity|log|error|warn|info|readFileSync|writeFileSync|trim|split|join|map|filter|reduce|forEach|push|pop|shift|unshift|slice|splice|indexOf|includes|find|findIndex|length)\b/.source,
        // 6. Numbers
        /\b(0x[0-9a-fA-F]+n?|0b[01]+|\d+(?:\.\d+)?n?)\b/.source,
        // 7. Function Call
        /(\b[a-zA-Z_]\w*\b)(?=\s*\()/.source,
        // 8. Operators
        /(=>|\.\.\.|===|!==|==|!=|<=|>=|\+\+|--|\+=|-=|\*=|(?<!\/)\/=(?!\/)|\+|-|\*|\/|%|=|&&|\|\||\?\?|\?|!|&|\||\^|~|<|>)/.source,
      ].join("|"),
      "g"
    );
  } else {
    // C++ (g++) & C (gcc) - Comprehensive CP & Standard Library Highlighting
    combinedRegex = new RegExp(
      [
        // 1. Preprocessor directives (#include <...>, #include "...", #define, etc.)
        /(#(?:include\s*<[^>]+>|include\s*"[^"]+"|define\b|ifdef\b|ifndef\b|endif\b|pragma\b|if\b|else\b|elif\b|undef\b|error\b))/.source,
        // 2. Comments (//... or /*...*/)
        /(\/\/.*|\/\*[\s\S]*?\*\/)/.source,
        // 3. Strings & Chars
        /("[^"\\]*(?:\\.[^"\\]*)*"|'[^'\\]*(?:\\.[^'\\]*)*')/.source,
        // 4. Keywords
        /\b(using|namespace|return|if|else|for|while|do|switch|case|default|break|continue|goto|struct|class|public|private|protected|template|typename|typedef|const|static|constexpr|inline|virtual|override|explicit|friend|operator|sizeof|new|delete|try|catch|throw|this|decltype)\b/.source,
        // 5. Types (including CP multi-word types like long long)
        /\b(long\s+long|unsigned\s+long\s+long|unsigned\s+int|long\s+double|int|long|double|float|char|bool|void|short|unsigned|signed|size_t|auto|string|vector|pair|tuple|map|set|unordered_map|unordered_set|multimap|multiset|queue|stack|deque|priority_queue|bitset|int64_t|int32_t|uint64_t|uint32_t)\b/.source,
        // 6. Built-in IO, Streams, Literals & Functions
        /\b(cin|cout|cerr|endl|ios_base|sync_with_stdio|tie|std|nullptr|NULL|true|false|INF|min|max|swap|sort|reverse|push_back|pop_back|emplace_back|push|pop|top|front|back|size|empty|begin|end|rbegin|rend|insert|erase|find|count|clear|lower_bound|upper_bound|fill|memset|memcpy|printf|scanf|puts|getchar|putchar)\b/.source,
        // 7. Numbers (hex, binary, float, scientific notation 1e9, int)
        /\b(0x[0-9a-fA-F]+|0b[01]+|\d+(?:\.\d+)?(?:e[+-]?\d+)?(?:LL|ULL|ll|ull|L|U|l|u|f)?)\b/.source,
        // 8. Function Call (identifier followed by paren)
        /(\b[a-zA-Z_]\w*\b)(?=\s*\()/.source,
        // 9. C++ Specific Operators (::, <<, >>, ->, etc.)
        /(::|->|<<|>>|==|!=|<=|>=|\+\+|--|\+=|-=|\*=|(?<!\/)\/=(?!\/)|\+|-|\*|\/|%|=|&&|\|\||!|&|\||\^|~|<|>)/.source,
      ].join("|"),
      "g"
    );
  }

  let result = "";
  let lastIndex = 0;
  let match;

  while ((match = combinedRegex.exec(rawCode)) !== null) {
    const textBefore = rawCode.slice(lastIndex, match.index);
    result += escapeHtml(textBefore);

    if (lang.includes("py")) {
      const [, comment, str, kw, typeToken, builtin, num, func, op] = match;
      if (comment) {
        result += `<span class="syn_comment">${escapeHtml(comment)}</span>`;
      } else if (str) {
        result += `<span class="syn_string">${escapeHtml(str)}</span>`;
      } else if (kw) {
        result += `<span class="syn_keyword">${escapeHtml(kw)}</span>`;
      } else if (typeToken) {
        result += `<span class="syn_type">${escapeHtml(typeToken)}</span>`;
      } else if (builtin) {
        result += `<span class="syn_builtin">${escapeHtml(builtin)}</span>`;
      } else if (num) {
        result += `<span class="syn_number">${escapeHtml(num)}</span>`;
      } else if (func) {
        result += `<span class="syn_function">${escapeHtml(func)}</span>`;
      } else if (op) {
        result += `<span class="syn_operator">${escapeHtml(op)}</span>`;
      }
    } else if (lang.includes("java")) {
      const [, comment, str, kw, typeToken, builtin, num, func, op] = match;
      if (comment) {
        result += `<span class="syn_comment">${escapeHtml(comment)}</span>`;
      } else if (str) {
        result += `<span class="syn_string">${escapeHtml(str)}</span>`;
      } else if (kw) {
        result += `<span class="syn_keyword">${escapeHtml(kw)}</span>`;
      } else if (typeToken) {
        result += `<span class="syn_type">${escapeHtml(typeToken)}</span>`;
      } else if (builtin) {
        result += `<span class="syn_builtin">${escapeHtml(builtin)}</span>`;
      } else if (num) {
        result += `<span class="syn_number">${escapeHtml(num)}</span>`;
      } else if (func) {
        result += `<span class="syn_function">${escapeHtml(func)}</span>`;
      } else if (op) {
        result += `<span class="syn_operator">${escapeHtml(op)}</span>`;
      }
    } else if (lang.includes("js") || lang.includes("javascript") || lang.includes("node")) {
      const [, comment, str, kw, typeToken, builtin, num, func, op] = match;
      if (comment) {
        result += `<span class="syn_comment">${escapeHtml(comment)}</span>`;
      } else if (str) {
        result += `<span class="syn_string">${escapeHtml(str)}</span>`;
      } else if (kw) {
        result += `<span class="syn_keyword">${escapeHtml(kw)}</span>`;
      } else if (typeToken) {
        result += `<span class="syn_type">${escapeHtml(typeToken)}</span>`;
      } else if (builtin) {
        result += `<span class="syn_builtin">${escapeHtml(builtin)}</span>`;
      } else if (num) {
        result += `<span class="syn_number">${escapeHtml(num)}</span>`;
      } else if (func) {
        result += `<span class="syn_function">${escapeHtml(func)}</span>`;
      } else if (op) {
        result += `<span class="syn_operator">${escapeHtml(op)}</span>`;
      }
    } else {
      // C++ / C
      const [, preprocessor, comment, str, kw, typeToken, builtin, num, func, op] = match;
      if (preprocessor) {
        result += `<span class="syn_preprocessor">${escapeHtml(preprocessor)}</span>`;
      } else if (comment) {
        result += `<span class="syn_comment">${escapeHtml(comment)}</span>`;
      } else if (str) {
        result += `<span class="syn_string">${escapeHtml(str)}</span>`;
      } else if (kw) {
        result += `<span class="syn_keyword">${escapeHtml(kw)}</span>`;
      } else if (typeToken) {
        result += `<span class="syn_type">${escapeHtml(typeToken)}</span>`;
      } else if (builtin) {
        result += `<span class="syn_builtin">${escapeHtml(builtin)}</span>`;
      } else if (num) {
        result += `<span class="syn_number">${escapeHtml(num)}</span>`;
      } else if (func) {
        result += `<span class="syn_function">${escapeHtml(func)}</span>`;
      } else if (op) {
        result += `<span class="syn_operator">${escapeHtml(op)}</span>`;
      }
    }

    lastIndex = combinedRegex.lastIndex;
  }

  result += escapeHtml(rawCode.slice(lastIndex));
  return { __html: result };
}

/**
 * Xử lý Auto-indentation & Auto-closing Brackets khi gõ phím
 */
export function handleEditorKeyDown(e, code, setCode, textareaRef, language = "cpp") {
  const textarea = textareaRef?.current;
  if (!textarea) return;

  const val = code || "";
  const start = textarea.selectionStart;
  const end = textarea.selectionEnd;
  const lang = (language || "cpp").toLowerCase();

  // 1. Phím TAB / SHIFT+TAB
  if (e.key === "Tab") {
    e.preventDefault();

    // Nếu đang bôi đen nhiều dòng -> Indent / Unindent khối
    if (start !== end && val.slice(start, end).includes("\n")) {
      const lineStart = val.lastIndexOf("\n", start - 1) + 1;
      const lineEnd = val.indexOf("\n", end) === -1 ? val.length : val.indexOf("\n", end);
      const selectedBlock = val.slice(lineStart, lineEnd);
      const lines = selectedBlock.split("\n");

      if (e.shiftKey) {
        // Unindent 4 spaces
        const unindentedLines = lines.map((l) => (l.startsWith("    ") ? l.slice(4) : l.replace(/^\t/, "")));
        const newBlock = unindentedLines.join("\n");
        const newVal = val.slice(0, lineStart) + newBlock + val.slice(lineEnd);
        setCode(newVal);
        setTimeout(() => {
          textarea.selectionStart = lineStart;
          textarea.selectionEnd = lineStart + newBlock.length;
        }, 0);
      } else {
        // Indent 4 spaces
        const indentedLines = lines.map((l) => "    " + l);
        const newBlock = indentedLines.join("\n");
        const newVal = val.slice(0, lineStart) + newBlock + val.slice(lineEnd);
        setCode(newVal);
        setTimeout(() => {
          textarea.selectionStart = lineStart;
          textarea.selectionEnd = lineStart + newBlock.length;
        }, 0);
      }
      return;
    }

    // Nhấn Tab đơn lẻ -> chèn 4 khoảng trắng
    if (!e.shiftKey) {
      const insertSpaces = "    ";
      const newVal = val.substring(0, start) + insertSpaces + val.substring(end);
      setCode(newVal);
      setTimeout(() => {
        textarea.selectionStart = textarea.selectionEnd = start + 4;
      }, 0);
    }
    return;
  }

  // 2. Phím ENTER (Xuống dòng thông minh có tự động thụt dòng khi có {})
  if (e.key === "Enter") {
    e.preventDefault();

    // Tìm dòng hiện tại
    const lineStart = val.lastIndexOf("\n", start - 1) + 1;
    const currentLine = val.slice(lineStart, start);
    const leadingWhitespaceMatch = currentLine.match(/^[ \t]*/);
    const baseIndent = leadingWhitespaceMatch ? leadingWhitespaceMatch[0] : "";

    const charBefore = val[start - 1];
    const charAfter = val[start];

    // Trường hợp A: Nhấn Enter ngay ở giữa cặp ngoặc { | }
    if (
      (charBefore === "{" && charAfter === "}") ||
      (charBefore === "(" && charAfter === ")") ||
      (charBefore === "[" && charAfter === "]")
    ) {
      const extraIndent = "    ";
      const insertText = `\n${baseIndent}${extraIndent}\n${baseIndent}`;
      const newVal = val.substring(0, start) + insertText + val.substring(end);
      setCode(newVal);

      setTimeout(() => {
        const newCursorPos = start + 1 + baseIndent.length + extraIndent.length;
        textarea.selectionStart = textarea.selectionEnd = newCursorPos;
      }, 0);
      return;
    }

    // Trường hợp B: Dòng kết thúc bằng { hoặc ( hoặc [ (hoặc : trong Python)
    const trimmedBefore = currentLine.trimEnd();
    const shouldIncreaseIndent =
      trimmedBefore.endsWith("{") ||
      trimmedBefore.endsWith("(") ||
      trimmedBefore.endsWith("[") ||
      (lang.includes("py") && trimmedBefore.endsWith(":"));

    if (shouldIncreaseIndent) {
      const extraIndent = "    ";
      const insertText = `\n${baseIndent}${extraIndent}`;
      const newVal = val.substring(0, start) + insertText + val.substring(end);
      setCode(newVal);

      setTimeout(() => {
        const newCursorPos = start + insertText.length;
        textarea.selectionStart = textarea.selectionEnd = newCursorPos;
      }, 0);
      return;
    }

    // Trường hợp C: Xuống dòng thông thường -> Giữ nguyên base indent của dòng hiện tại
    const insertText = `\n${baseIndent}`;
    const newVal = val.substring(0, start) + insertText + val.substring(end);
    setCode(newVal);

    setTimeout(() => {
      const newCursorPos = start + insertText.length;
      textarea.selectionStart = textarea.selectionEnd = newCursorPos;
    }, 0);
    return;
  }

  // 3. Tự động đóng cặp ngoặc { }, ( ), [ ], " ", ' '
  const openPairs = {
    "{": "}",
    "(": ")",
    "[": "]",
    '"': '"',
    "'": "'",
    "`": "`",
  };

  if (openPairs[e.key]) {
    const openChar = e.key;
    const closeChar = openPairs[openChar];

    // Nếu gõ dấu nháy và ký tự tiếp theo đã là dấu nháy đó -> bỏ qua chỉ nhảy con trỏ
    if ((openChar === '"' || openChar === "'" || openChar === "`") && val[start] === openChar) {
      e.preventDefault();
      textarea.selectionStart = textarea.selectionEnd = start + 1;
      return;
    }

    e.preventDefault();
    const selectedText = val.slice(start, end);
    const insertText = `${openChar}${selectedText}${closeChar}`;
    const newVal = val.substring(0, start) + insertText + val.substring(end);
    setCode(newVal);

    setTimeout(() => {
      if (selectedText.length > 0) {
        textarea.selectionStart = start + 1;
        textarea.selectionEnd = start + 1 + selectedText.length;
      } else {
        textarea.selectionStart = textarea.selectionEnd = start + 1;
      }
    }, 0);
    return;
  }

  // 4. Nếu gõ dấu đóng ngoặc }, ), ] khi trước mặt đã có sẵn dấu đó -> Chỉ nhảy con trỏ qua
  if (e.key === "}" || e.key === ")" || e.key === "]") {
    if (val[start] === e.key && start === end) {
      e.preventDefault();
      textarea.selectionStart = textarea.selectionEnd = start + 1;
      return;
    }
  }

  // 5. Phím Backspace khi ở giữa cặp ngoặc rỗng { } hoặc ( ) hoặc [ ] hoặc "" -> xóa cả đôi
  if (e.key === "Backspace" && start === end && start > 0) {
    const charBefore = val[start - 1];
    const charAfter = val[start];

    if (
      (charBefore === "{" && charAfter === "}") ||
      (charBefore === "(" && charAfter === ")") ||
      (charBefore === "[" && charAfter === "]") ||
      (charBefore === '"' && charAfter === '"') ||
      (charBefore === "'" && charAfter === "'") ||
      (charBefore === "`" && charAfter === "`")
    ) {
      e.preventDefault();
      const newVal = val.substring(0, start - 1) + val.substring(start + 1);
      setCode(newVal);
      setTimeout(() => {
        textarea.selectionStart = textarea.selectionEnd = start - 1;
      }, 0);
      return;
    }
  }
}
