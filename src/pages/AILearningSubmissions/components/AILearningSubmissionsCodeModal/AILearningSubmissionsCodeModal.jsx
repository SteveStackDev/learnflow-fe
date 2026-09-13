import { useState, useEffect } from "react";
import styles from "./AILearningSubmissionsCodeModal.module.css";
import Icon from "~/components/Icon/Icon";
import { Button } from "~/components/ui";

function AILearningSubmissionsCodeModal({ submission, isOpen, onClose }) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  if (!isOpen || !submission) return null;

  const codeText =
    submission.code ||
    `#include <bits/stdc++.h>
using namespace std;

// Mã nguồn bài nộp #${submission.id}
int main() {
    int n;
    long long target;
    if (!(cin >> n >> target)) return 0;
    vector<long long> nums(n);
    for (int i = 0; i < n; ++i) cin >> nums[i];
    
    // Thuật toán Binary Search On Answer
    int l = 0, r = n - 1;
    while (l < r) {
        int mid = l + (r - l + 1) / 2;
        if (nums[mid] <= target) l = mid;
        else r = mid - 1;
    }
    cout << (nums[l] == target ? l : -1) << endl;
    return 0;
}`;

  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText(codeText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy code: ", err);
    }
  };

  const isAC = submission.status === "AC";

  return (
    <div className={styles.modal_overlay} onClick={onClose} role="dialog" aria-modal="true">
      <div className={styles.modal_container} onClick={(e) => e.stopPropagation()}>
        {/* Modal Header */}
        <div className={styles.modal_header}>
          <div className={styles.header_left}>
            <div
              className={`${styles.status_badge} ${
                isAC ? styles["status_badge--ac"] : styles["status_badge--wa"]
              }`}
            >
              <Icon name={isAC ? "Check" : "X"} size={14} />
              <span>{submission.status}</span>
            </div>
            <div>
              <h3 className={styles.modal_title}>
                Mã nguồn bài nộp #{submission.id}
              </h3>
              <div className={styles.modal_meta}>
                <span>{submission.submittedAt}</span>
                <span>•</span>
                <span>{submission.language || "C++"}</span>
                {submission.runtime && (
                  <>
                    <span>•</span>
                    <span>{submission.runtime}</span>
                  </>
                )}
                {submission.memory && (
                  <>
                    <span>•</span>
                    <span>{submission.memory}</span>
                  </>
                )}
              </div>
            </div>
          </div>

          <div className={styles.header_actions}>
            <Button
              variant="outlined"
              size="sm"
              leftIcon={copied ? "Check" : "Copy"}
              onClick={handleCopyCode}
              className={styles.copy_btn}
            >
              {copied ? "Đã sao chép!" : "Sao chép"}
            </Button>

            <button
              type="button"
              onClick={onClose}
              className={styles.close_btn}
              title="Đóng cửa sổ"
              aria-label="Close"
            >
              <Icon name="X" size={18} />
            </button>
          </div>
        </div>

        {/* Modal Body: Code Editor View */}
        <div className={styles.modal_body}>
          <div className={styles.code_toolbar}>
            <span className={styles.lang_pill}>{submission.language || "C++ 17"}</span>
            <span className={styles.line_count}>
              {codeText.split("\n").length} dòng
            </span>
          </div>

          <pre className={styles.code_pre}>
            <code>{codeText}</code>
          </pre>
        </div>

        {/* Modal Footer */}
        <div className={styles.modal_footer}>
          <Button variant="outlined" size="sm" onClick={onClose} className={styles.secondary_close_btn}>
            Đóng
          </Button>
        </div>
      </div>
    </div>
  );
}

export default AILearningSubmissionsCodeModal;
