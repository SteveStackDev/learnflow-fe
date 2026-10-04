import React, { useState, useEffect, useRef, useCallback, memo } from "react";
import Icon from "~/components/Icon/Icon";
import { useToast } from "~/context/ToastContext.jsx";
import styles from "./TestCaseCard.module.css";

// Helper tính dung lượng và thống kê dữ liệu
function formatDataStats(str = "") {
  const chars = str.length;
  if (chars === 0) return null;
  const bytes = new Blob([str]).size;
  const lines = str.split("\n").length;
  
  let sizeLabel = `${bytes} B`;
  if (bytes >= 1024 * 1024) {
    sizeLabel = `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  } else if (bytes >= 1024) {
    sizeLabel = `${(bytes / 1024).toFixed(1)} KB`;
  }

  return `${lines.toLocaleString()} dòng | ${chars.toLocaleString()} ký tự (${sizeLabel})`;
}

const TestCaseCard = memo(function TestCaseCard({
  tc,
  tcIdx,
  sIdx,
  canDelete,
  onRemove,
  onChange,
}) {
  const { toast } = useToast();
  
  // Local state for smooth, un-throttled typing
  const [localInput, setLocalInput] = useState(tc.input || "");
  const [localExpected, setLocalExpected] = useState(tc.expected || "");
  
  const inputDebounceTimer = useRef(null);
  const expectedDebounceTimer = useRef(null);

  const inputFileRef = useRef(null);
  const expectedFileRef = useRef(null);

  // Sync external changes (e.g. when changing subtasks or resetting draft)
  useEffect(() => {
    setLocalInput(tc.input || "");
  }, [tc.input]);

  useEffect(() => {
    setLocalExpected(tc.expected || "");
  }, [tc.expected]);

  // Clean up debounce timers
  useEffect(() => {
    return () => {
      if (inputDebounceTimer.current) clearTimeout(inputDebounceTimer.current);
      if (expectedDebounceTimer.current) clearTimeout(expectedDebounceTimer.current);
    };
  }, []);

  // Handle Input typing with debounce
  const handleInputChange = useCallback((e) => {
    const val = e.target.value;
    setLocalInput(val);

    if (inputDebounceTimer.current) clearTimeout(inputDebounceTimer.current);
    inputDebounceTimer.current = setTimeout(() => {
      onChange(sIdx, tcIdx, "input", val);
    }, 250);
  }, [sIdx, tcIdx, onChange]);

  const handleInputBlur = useCallback(() => {
    if (inputDebounceTimer.current) clearTimeout(inputDebounceTimer.current);
    onChange(sIdx, tcIdx, "input", localInput);
  }, [sIdx, tcIdx, localInput, onChange]);

  // Handle Expected typing with debounce
  const handleExpectedChange = useCallback((e) => {
    const val = e.target.value;
    setLocalExpected(val);

    if (expectedDebounceTimer.current) clearTimeout(expectedDebounceTimer.current);
    expectedDebounceTimer.current = setTimeout(() => {
      onChange(sIdx, tcIdx, "expected", val);
    }, 250);
  }, [sIdx, tcIdx, onChange]);

  const handleExpectedBlur = useCallback(() => {
    if (expectedDebounceTimer.current) clearTimeout(expectedDebounceTimer.current);
    onChange(sIdx, tcIdx, "expected", localExpected);
  }, [sIdx, tcIdx, localExpected, onChange]);

  // File Upload handler for large testcases (10^5 elements from .in / .txt file)
  const handleFileUpload = (e, field) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result || "";
      if (field === "input") {
        setLocalInput(content);
        onChange(sIdx, tcIdx, "input", content);
        toast.success(`Đã nạp thành công file ${file.name} (${(file.size / 1024).toFixed(1)} KB) vào INPUT!`, "Nạp file thành công");
      } else {
        setLocalExpected(content);
        onChange(sIdx, tcIdx, "expected", content);
        toast.success(`Đã nạp thành công file ${file.name} (${(file.size / 1024).toFixed(1)} KB) vào KẾT QUẢ KỲ VỌNG!`, "Nạp file thành công");
      }
    };
    reader.onerror = () => {
      toast.error("Không thể đọc tệp tin đã chọn!", "Lỗi nạp file");
    };
    reader.readAsText(file);
    e.target.value = ""; // Reset input
  };

  const copyToClipboard = (text, label) => {
    if (!text) {
      toast.info(`Không có dữ liệu ${label} để sao chép!`, "Thông báo");
      return;
    }
    navigator.clipboard.writeText(text);
    toast.success(`Đã sao chép ${label} vào clipboard!`, "Sao chép");
  };

  const clearField = (field, label) => {
    if (field === "input") {
      setLocalInput("");
      onChange(sIdx, tcIdx, "input", "");
    } else {
      setLocalExpected("");
      onChange(sIdx, tcIdx, "expected", "");
    }
    toast.info(`Đã xóa trắng ${label}!`, "Đã xóa");
  };

  const inputStats = formatDataStats(localInput);
  const expectedStats = formatDataStats(localExpected);

  return (
    <div className={styles.tc_card}>
      {/* Hidden file inputs */}
      <input
        type="file"
        ref={inputFileRef}
        style={{ display: "none" }}
        accept=".in,.txt,.dat"
        onChange={(e) => handleFileUpload(e, "input")}
      />
      <input
        type="file"
        ref={expectedFileRef}
        style={{ display: "none" }}
        accept=".out,.ans,.txt"
        onChange={(e) => handleFileUpload(e, "expected")}
      />

      {/* Header */}
      <div className={styles.tc_header}>
        <div className={styles.tc_header_left}>
          <span className={styles.tc_badge_num}>
            <Icon name="Code" size={14} />
            Test #{tcIdx + 1}
          </span>
          {tc.isHidden ? (
            <span className={styles.tc_type_tag_hidden}>
              <Icon name="Lock" size={12} />
              Test Ẩn (Hidden)
            </span>
          ) : (
            <span className={styles.tc_type_tag_public}>
              <Icon name="Eye" size={12} />
              Công Khai (Public)
            </span>
          )}
        </div>

        {canDelete && (
          <button
            type="button"
            className={styles.remove_btn}
            onClick={() => onRemove(sIdx, tcIdx)}
            title="Xóa Test Case này"
          >
            <Icon name="Trash2" size={14} />
            <span>Xóa Test</span>
          </button>
        )}
      </div>

      {/* Body: Inputs Grid */}
      <div className={styles.tc_body}>
        <div className={styles.tc_code_grid}>
          {/* 1. INPUT Box */}
          <div className={styles.tc_code_box}>
            <div className={styles.tc_code_header}>
              <label className={`${styles.tc_code_label} ${styles.tc_code_label_stdin}`}>
                <Icon name="Terminal" size={13} />
                INPUT (stdin) <span className={styles.required_mark}>*</span>
              </label>
              
              <div className={styles.tc_tools_row}>
                {inputStats && (
                  <span className={styles.tc_meta_badge} title={inputStats}>
                    {inputStats}
                  </span>
                )}
                <button
                  type="button"
                  className={styles.tc_file_btn}
                  onClick={() => inputFileRef.current?.click()}
                  title="Tải tệp tin (.in, .txt) chứa test input lớn (10^5 elements) trực tiếp"
                >
                  <Icon name="Upload" size={12} />
                  <span>Tải file .in</span>
                </button>
                {localInput && (
                  <>
                    <button
                      type="button"
                      className={styles.tc_file_btn}
                      onClick={() => copyToClipboard(localInput, "INPUT")}
                      title="Sao chép INPUT"
                    >
                      <Icon name="Copy" size={12} />
                    </button>
                    <button
                      type="button"
                      className={styles.tc_file_btn}
                      onClick={() => clearField("input", "INPUT")}
                      title="Xóa trắng INPUT"
                    >
                      <Icon name="X" size={12} />
                    </button>
                  </>
                )}
              </div>
            </div>

            <textarea
              className={styles.tc_textarea}
              placeholder="Dữ liệu truyền vào stdin (hỗ trợ dữ liệu lớn 10^5, 10^6)..."
              value={localInput}
              onChange={handleInputChange}
              onBlur={handleInputBlur}
              rows={3}
              required
            />
          </div>

          {/* 2. EXPECTED Box */}
          <div className={styles.tc_code_box}>
            <div className={styles.tc_code_header}>
              <label className={`${styles.tc_code_label} ${styles.tc_code_label_stdout}`}>
                <Icon name="Play" size={13} />
                KẾT QUẢ KỲ VỌNG (Expected stdout) <span className={styles.required_mark}>*</span>
              </label>

              <div className={styles.tc_tools_row}>
                {expectedStats && (
                  <span className={styles.tc_meta_badge} title={expectedStats}>
                    {expectedStats}
                  </span>
                )}
                <button
                  type="button"
                  className={styles.tc_file_btn}
                  onClick={() => expectedFileRef.current?.click()}
                  title="Tải tệp tin (.out, .ans, .txt) chứa kết quả kỳ vọng lớn trực tiếp"
                >
                  <Icon name="Upload" size={12} />
                  <span>Tải file .out</span>
                </button>
                {localExpected && (
                  <>
                    <button
                      type="button"
                      className={styles.tc_file_btn}
                      onClick={() => copyToClipboard(localExpected, "KẾT QUẢ KỲ VỌNG")}
                      title="Sao chép KẾT QUẢ"
                    >
                      <Icon name="Copy" size={12} />
                    </button>
                    <button
                      type="button"
                      className={styles.tc_file_btn}
                      onClick={() => clearField("expected", "KẾT QUẢ KỲ VỌNG")}
                      title="Xóa trắng KẾT QUẢ"
                    >
                      <Icon name="X" size={12} />
                    </button>
                  </>
                )}
              </div>
            </div>

            <textarea
              className={styles.tc_textarea}
              placeholder="Kết quả stdout mong đợi..."
              value={localExpected}
              onChange={handleExpectedChange}
              onBlur={handleExpectedBlur}
              rows={3}
              required
            />
          </div>
        </div>

        {/* Footer: Points & isHidden */}
        <div className={styles.tc_footer_row}>
          <div className={styles.tc_points_group}>
            <span className={styles.tc_points_label}>Điểm test:</span>
            <input
              type="number"
              className={styles.tc_points_input}
              placeholder="100"
              value={tc.points !== undefined && tc.points !== null ? tc.points : 0}
              onChange={(e) => onChange(sIdx, tcIdx, "points", Number(e.target.value))}
            />
            <span className={styles.tc_points_label}>pt</span>
          </div>

          <div className={styles.checkbox_row} style={{ margin: 0 }}>
            <label className={styles.checkbox_label}>
              <input
                type="checkbox"
                checked={tc.isHidden}
                onChange={(e) => onChange(sIdx, tcIdx, "isHidden", e.target.checked)}
              />
              <span>Đặt làm Test Case Ẩn (Hidden Case)</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
});

export default TestCaseCard;
