import React, { useState } from "react";
import Icon from "~/components/Icon/Icon";
import { Button, FormField, DropdownMenu } from "~/components/ui";
import {
  FORM_DIFFICULTY_OPTIONS,
  FORM_TOPIC_OPTIONS,
  FORM_STATUS_OPTIONS,
} from "~/constants/mockAdminProblem";
import styles from "./AdminProblemEditorTab.module.css";

export default function AdminProblemEditorTab({ problemState, setProblemState }) {
  const [examples, setExamples] = useState(
    problemState.examples && problemState.examples.length > 0
      ? problemState.examples
      : [
          {
            input: "5 10\n2 3 1 5 4",
            output: "3",
            explanation: "Thuê các công nhân có mức công 1, 2, 3 (tổng = 6 <= 10). Số công nhân lớn nhất là 3.",
          },
        ]
  );

  const handleAddExample = () => {
    const updated = [
      ...examples,
      { input: "", output: "", explanation: "" },
    ];
    setExamples(updated);
    setProblemState({ ...problemState, examples: updated });
  };

  const handleExampleChange = (index, field, value) => {
    const updated = examples.map((ex, idx) =>
      idx === index ? { ...ex, [field]: value } : ex
    );
    setExamples(updated);
    setProblemState({ ...problemState, examples: updated });
  };

  const handleRemoveExample = (index) => {
    const updated = examples.filter((_, idx) => idx !== index);
    setExamples(updated);
    setProblemState({ ...problemState, examples: updated });
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      {/* 1. Basic Metadata Card */}
      <div className={styles.card}>
        <h3 className={styles.card_title}>
          <Icon name="Settings" size={18} /> Basic Information & Attributes
        </h3>

        <div className={styles.grid_2col}>
          <FormField
            label="Problem Title"
            placeholder="e.g. Công trình xây dựng"
            value={problemState.title || ""}
            onChange={(e) => setProblemState({ ...problemState, title: e.target.value })}
          />

          <FormField
            label="URL Slug"
            placeholder="e.g. cong-trinh-xay-dung"
            value={problemState.slug || ""}
            onChange={(e) => setProblemState({ ...problemState, slug: e.target.value })}
          />
        </div>

        <div className={styles.grid_3col}>
          <div className={styles.form_group}>
            <label className={styles.label}>Difficulty Level</label>
            <DropdownMenu
              options={FORM_DIFFICULTY_OPTIONS}
              value={problemState.difficulty || "Easy"}
              onChange={(val) => setProblemState({ ...problemState, difficulty: val })}
            />
          </div>

          <div className={styles.form_group}>
            <label className={styles.label}>Topic / Category</label>
            <DropdownMenu
              options={FORM_TOPIC_OPTIONS}
              value={problemState.topic || "Array & Hashing"}
              onChange={(val) => setProblemState({ ...problemState, topic: val })}
            />
          </div>

          <div className={styles.form_group}>
            <label className={styles.label}>Status</label>
            <DropdownMenu
              options={FORM_STATUS_OPTIONS}
              value={problemState.status || "Active"}
              onChange={(val) => setProblemState({ ...problemState, status: val })}
            />
          </div>
        </div>
      </div>

      {/* 2. Problem Statement (Mô tả bài toán) */}
      <div className={styles.card}>
        <h3 className={styles.card_title}>
          <Icon name="FileText" size={18} /> 1. Mô tả bài toán (Problem Statement)
        </h3>

        <div className={styles.editor_wrapper}>
          <div className={styles.editor_toolbar}>
            <button type="button" className={styles.tool_btn} title="Bold"><Icon name="Bold" size={14} /></button>
            <button type="button" className={styles.tool_btn} title="Italic"><Icon name="Italic" size={14} /></button>
            <button type="button" className={styles.tool_btn} title="Code Block"><Icon name="Code" size={14} /></button>
            <button type="button" className={styles.tool_btn} title="List"><Icon name="List" size={14} /></button>
            <button type="button" className={styles.tool_btn} title="Sparkles AI"><Icon name="Sparkles" size={14} /></button>
          </div>
          <textarea
            className={`${styles.textarea} ${styles.textarea_editor}`}
            placeholder="Một đội công nhân gồm N người đang chuẩn bị xây dựng một tòa nhà cao tầng..."
            rows={5}
            value={problemState.description || problemState.statement || ""}
            onChange={(e) => setProblemState({ ...problemState, description: e.target.value, statement: e.target.value })}
          />
        </div>
      </div>

      {/* 3. Input & Output Format (Đầu vào & Đầu ra) */}
      <div className={styles.card}>
        <h3 className={styles.card_title}>
          <Icon name="LogIn" size={18} /> 2. Định dạng Đầu vào & Đầu ra (Input & Output Format)
        </h3>

        <div className={styles.form_group}>
          <label className={styles.label}>Đầu vào (Input Format)</label>
          <textarea
            className={styles.textarea}
            rows={3}
            placeholder="- Dòng đầu tiên gồm hai số nguyên dương N và T...\n- Dòng thứ hai gồm N số công nhân..."
            value={problemState.inputFormat || ""}
            onChange={(e) => setProblemState({ ...problemState, inputFormat: e.target.value })}
          />
        </div>

        <div className={styles.form_group} style={{ marginTop: 12 }}>
          <label className={styles.label}>Đầu ra (Output Format)</label>
          <textarea
            className={styles.textarea}
            rows={3}
            placeholder="- In ra một số nguyên duy nhất là số lượng công nhân lớn nhất..."
            value={problemState.outputFormat || ""}
            onChange={(e) => setProblemState({ ...problemState, outputFormat: e.target.value })}
          />
        </div>
      </div>

      {/* 4. Constraints Card (Ràng buộc) */}
      <div className={styles.card}>
        <h3 className={styles.card_title}>
          <Icon name="ShieldAlert" size={18} /> 3. Ràng buộc dữ liệu (Constraints)
        </h3>

        <div className={styles.form_group}>
          <label className={styles.label}>Ràng buộc (Một điều kiện mỗi dòng)</label>
          <textarea
            className={styles.textarea}
            rows={4}
            placeholder="1 <= N <= 10^6\n1 <= T <= 10^12\n1 <= a[i] <= 10^9"
            value={problemState.constraints || ""}
            onChange={(e) => setProblemState({ ...problemState, constraints: e.target.value })}
          />
        </div>
      </div>

      {/* 5. Examples Card (Ví dụ mẫu - NẰM Ở DƯỚI CÙNG) */}
      <div className={styles.card}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <h3 className={styles.card_title} style={{ margin: 0 }}>
            <Icon name="Layers" size={18} /> 4. Ví dụ mẫu (Sample Cases)
          </h3>
          <Button variant="outline" size="sm" onClick={handleAddExample}>
            <Icon name="Plus" size={14} /> Thêm Ví dụ (Add Example)
          </Button>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {examples.map((ex, idx) => (
            <div key={idx} className={styles.example_box}>
              <div className={styles.example_header} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontWeight: 700 }}>Ví dụ #{idx + 1}</span>
                {examples.length > 1 && (
                  <button
                    type="button"
                    onClick={() => handleRemoveExample(idx)}
                    style={{ background: "none", border: "none", color: "#ef4444", cursor: "pointer", fontSize: "0.8rem" }}
                  >
                    Xóa ví dụ
                  </button>
                )}
              </div>
              <div className={styles.grid_2col}>
                <FormField
                  label="Input"
                  value={ex.input}
                  onChange={(e) => handleExampleChange(idx, "input", e.target.value)}
                />
                <FormField
                  label="Output"
                  value={ex.output}
                  onChange={(e) => handleExampleChange(idx, "output", e.target.value)}
                />
              </div>
              <FormField
                label="Explanation (Giải thích)"
                value={ex.explanation}
                onChange={(e) => handleExampleChange(idx, "explanation", e.target.value)}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
