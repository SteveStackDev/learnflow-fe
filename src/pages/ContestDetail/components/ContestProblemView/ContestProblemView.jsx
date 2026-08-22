import React, { useState } from "react";
import Icon from "~/components/Icon/Icon";
import { ScrollArea } from "~/components/ui";
import styles from "./ContestProblemView.module.css";

export default function ContestProblemView({ problem }) {
  const [activeTab, setActiveTab] = useState("desc");

  if (!problem) return null;

  return (
    <div className={styles.panel}>
      {/* Sub Tabs Bar */}
      <div className={styles.tabs_nav}>
        <button
          type="button"
          className={`${styles.tab_btn} ${activeTab === "desc" ? styles["tab_btn--active"] : ""}`}
          onClick={() => setActiveTab("desc")}
        >
          <Icon name="FileText" size={15} />
          <span>Mô tả bài tập</span>
        </button>
        <button
          type="button"
          className={`${styles.tab_btn} ${activeTab === "solution" ? styles["tab_btn--active"] : ""}`}
          onClick={() => setActiveTab("solution")}
        >
          <Icon name="FlaskConical" size={15} />
          <span>Hướng dẫn & Solution</span>
        </button>
      </div>

      {/* Main Content Area */}
      <ScrollArea className={styles.content_scroll}>
        {activeTab === "desc" && (
          <>
            <h2 className={styles.title}>{problem.title}</h2>

            <div className={styles.meta_chips}>
              <span className={styles.chip}>Time Limit: {problem.timeLimit}</span>
              <span className={styles.chip}>Memory Limit: {problem.memoryLimit}</span>
              <span className={`${styles.chip} ${styles.chip_points}`}>{problem.points} pt</span>
            </div>

            {/* 1. Problem Statement (Mô tả bài toán) */}
            <div className={styles.statement}>{problem.statement}</div>

            {problem.statementNotes &&
              problem.statementNotes.map((note, idx) => (
                <p key={idx} className={styles.statement_note}>
                  {note}
                </p>
              ))}

            {/* 2. Input Format (Đầu vào) */}
            {(problem.inputFormat || problem.input_format) && (
              <div className={styles.section_block}>
                <h3 className={styles.section_heading}>Đầu vào</h3>
                <ul className={styles.format_list}>
                  {Array.isArray(problem.inputFormat || problem.input_format) ? (
                    (problem.inputFormat || problem.input_format).map((line, idx) => (
                      <li key={idx} className={styles.format_item}>{line}</li>
                    ))
                  ) : (
                    <li className={styles.format_item}>{problem.inputFormat || problem.input_format}</li>
                  )}
                </ul>
              </div>
            )}

            {/* 3. Output Format (Đầu ra) */}
            {(problem.outputFormat || problem.output_format) && (
              <div className={styles.section_block}>
                <h3 className={styles.section_heading}>Đầu ra</h3>
                <ul className={styles.format_list}>
                  {Array.isArray(problem.outputFormat || problem.output_format) ? (
                    (problem.outputFormat || problem.output_format).map((line, idx) => (
                      <li key={idx} className={styles.format_item}>{line}</li>
                    ))
                  ) : (
                    <li className={styles.format_item}>{problem.outputFormat || problem.output_format}</li>
                  )}
                </ul>
              </div>
            )}

            {/* 4. Constraints (Ràng buộc) */}
            {problem.constraints && problem.constraints.length > 0 && (
              <div className={styles.section_block}>
                <h3 className={styles.section_heading}>Ràng buộc</h3>
                <ul className={styles.constraints_list}>
                  {Array.isArray(problem.constraints) ? (
                    problem.constraints.map((c, idx) => (
                      <li key={idx} className={styles.constraint_item}>
                        <code>{c}</code>
                      </li>
                    ))
                  ) : (
                    problem.constraints.split("\n").map((c, idx) => (
                      <li key={idx} className={styles.constraint_item}>
                        <code>{c}</code>
                      </li>
                    ))
                  )}
                </ul>
              </div>
            )}

            {/* 5. Examples (Ví dụ 1:, Ví dụ 2: - Không lặp lại tiêu đề Ví dụ mẫu) */}
            {problem.examples && problem.examples.length > 0 && (
              <div className={styles.section_block} style={{ marginTop: 16 }}>
                {problem.examples.map((ex, idx) => (
                  <div key={idx} className={styles.example_card}>
                    <div className={styles.example_title}>{ex.title || `Ví dụ ${idx + 1}:`}</div>
                    <div className={styles.example_grid}>
                      <div className={styles.code_box}>
                        <div className={styles.box_label}>INPUT:</div>
                        <pre className={styles.pre_code}>{ex.input}</pre>
                      </div>
                      <div className={styles.code_box}>
                        <div className={styles.box_label}>OUTPUT:</div>
                        <pre className={styles.pre_code}>{ex.output}</pre>
                      </div>
                    </div>
                    {ex.explanation && (
                      <div className={styles.explanation_box}>
                        <span className={styles.explanation_label}>Giải thích:</span> {ex.explanation}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        {activeTab === "solution" && (
          <div>
            <h3 className={styles.section_heading}>Giải pháp & Thuật toán đề xuất</h3>
            <p className={styles.statement}>
              Bài toán có thể được giải bằng cách áp dụng giải thuật Tham ăn (Greedy) kết hợp Sắp xếp (Sort) để đạt hiệu năng tối ưu O(N log N).
            </p>
          </div>
        )}
      </ScrollArea>
    </div>
  );
}
