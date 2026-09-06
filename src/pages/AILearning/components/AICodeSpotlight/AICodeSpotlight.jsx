import React, { useState } from "react";
import { Link } from "react-router";
import styles from "./AICodeSpotlight.module.css";
import { Card } from "~/components/ui/Card/Card";
import { Badge } from "~/components/ui/Badge/Badge";
import { Button } from "~/components/ui/Button/Button";
import Icon from "~/components/Icon/Icon";
import { useToast } from "~/context/ToastContext";

export function AICodeSpotlight({ data }) {
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);

  const bugSection = data?.bugSection || {
    title: "Đoạn code phát hiện lỗi (Boundary Bug)",
    tag: "Gây TLE / WA",
    codeLines: [],
  };

  const fixSection = data?.fixSection || {
    title: "Gợi ý sửa tối ưu từ AI (Optimal Fix)",
    tag: "O(log N) Time • O(1) Space",
    codeLines: [],
  };

  const handleCopyFix = () => {
    const textToCopy = fixSection.codeLines.map((l) => l.text).join("\n");
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    toast.success("Đã sao chép đoạn mã tối ưu vào bộ nhớ tạm!", "Sao chép thành công");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className={`${styles.spotlight_section} reveal-card`}>
      <div className={styles.section_header}>
        <div className={styles.header_left}>
          <div className={styles.title_row}>
            <h2 className={styles.section_title}>Code Diagnostic Spotlight</h2>
            <Badge variant="error" size="sm" className={styles.wa_badge}>
              WA Fix Breakdown
            </Badge>
          </div>
          <p className={styles.section_subtitle}>
            Ví dụ sai sót phổ biến gần nhất được AI giải mã từ bài nộp:{" "}
            <span className={styles.problem_highlight}>
              {data?.title || "Search in Rotated Sorted Array"}
            </span>
          </p>
        </div>

        <div className={styles.header_right}>
          <Link
            to={`/ai-learning/submission/${data?.submissionId || "8491024"}`}
            className={styles.submission_link}
          >
            <span>Chi tiết chẩn đoán #{data?.submissionId || "8491024"}</span>
            <Icon name="ArrowRight" size={14} />
          </Link>
          <Button
            variant="ghost"
            size="sm"
            leftIcon={copied ? "CheckCircle2" : "Copy"}
            onClick={handleCopyFix}
            className={styles.copy_btn}
          >
            {copied ? "Đã chép" : "Chép code tối ưu"}
          </Button>
        </div>
      </div>

      <div className={styles.dual_container}>
        {/* Left Panel: Bug Detection */}
        <Card variant="elevated" className={`${styles.code_box} ${styles.code_box_bug}`}>
          <div className={styles.panel_topbar}>
            <div className={styles.topbar_title_row}>
              <span className={styles.dot_bug} />
              <span className={styles.topbar_title}>{bugSection.title}</span>
            </div>
            <Badge variant="error" size="sm" className={styles.panel_tag}>
              {bugSection.tag}
            </Badge>
          </div>

          <div className={styles.code_editor}>
            <pre className={styles.code_pre}>
              {bugSection.codeLines.map((line, idx) => (
                <div
                  key={idx}
                  className={`${styles.code_line} ${
                    line.type === "error" || line.type === "error-comment"
                      ? styles.line_error
                      : line.type === "comment"
                        ? styles.line_comment
                        : ""
                  }`}
                >
                  <span className={styles.line_number}>{idx + 1}</span>
                  <span className={styles.line_content}>{line.text}</span>
                </div>
              ))}
            </pre>
          </div>
        </Card>

        {/* Right Panel: Optimal AI Fix */}
        <Card variant="elevated" className={`${styles.code_box} ${styles.code_box_fix}`}>
          <div className={styles.panel_topbar}>
            <div className={styles.topbar_title_row}>
              <span className={styles.dot_fix} />
              <span className={styles.topbar_title}>{fixSection.title}</span>
            </div>
            <Badge variant="success" size="sm" className={styles.panel_tag_success}>
              {fixSection.tag}
            </Badge>
          </div>

          <div className={styles.code_editor}>
            <pre className={styles.code_pre}>
              {fixSection.codeLines.map((line, idx) => (
                <div
                  key={idx}
                  className={`${styles.code_line} ${
                    line.type === "success"
                      ? styles.line_success
                      : line.type === "comment"
                        ? styles.line_comment
                        : ""
                  }`}
                >
                  <span className={styles.line_number}>{idx + 1}</span>
                  <span className={styles.line_content}>{line.text}</span>
                </div>
              ))}
            </pre>
          </div>
        </Card>
      </div>
    </section>
  );
}

export default AICodeSpotlight;
