import React, { useState, useEffect } from "react";
import Icon from "~/components/Icon/Icon";
import { Button, FormField, DropdownMenu } from "~/components/ui";
import { useToast } from "~/context/ToastContext.jsx";
import {
  FORM_DIFFICULTY_OPTIONS,
  FORM_TOPIC_OPTIONS,
  FORM_STATUS_OPTIONS,
} from "~/constants/mockAdminProblem";
import styles from "./AdminProblemModal.module.css";

export default function AdminProblemModal({ isOpen, onClose, onSave, initialData }) {
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(1); // 1: Problem Details | 2: Test Cases

  const [formData, setFormData] = useState({
    title: "",
    difficulty: "Easy",
    topic: "Array & Hashing",
    points: 500,
    status: "Active",
    statement: "",
    inputFormat: "",
    outputFormat: "",
    constraints: "",
  });

  const [examples, setExamples] = useState([
    { input: "", output: "", explanation: "" },
  ]);

  const [testCases, setTestCases] = useState([
    { input: "", expected: "", points: 200, isHidden: false },
  ]);

  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title || "",
        difficulty: initialData.difficulty || "Easy",
        topic: initialData.topic || "Array & Hashing",
        points: initialData.points || 500,
        status: initialData.status || "Active",
        statement: initialData.statement || initialData.description || "",
        inputFormat: Array.isArray(initialData.inputFormat)
          ? initialData.inputFormat.join("\n")
          : initialData.inputFormat || "",
        outputFormat: Array.isArray(initialData.outputFormat)
          ? initialData.outputFormat.join("\n")
          : initialData.outputFormat || "",
        constraints: Array.isArray(initialData.constraints)
          ? initialData.constraints.join("\n")
          : initialData.constraints || "",
      });

      if (initialData.examples && initialData.examples.length > 0) {
        setExamples(
          initialData.examples.map((ex) => ({
            input: ex.input || "",
            output: ex.output || "",
            explanation: ex.explanation || "",
          }))
        );
      } else {
        setExamples([{ input: "", output: "", explanation: "" }]);
      }

      if (initialData.testCases && initialData.testCases.length > 0) {
        setTestCases(
          initialData.testCases.map((tc) => ({
            input: tc.input || "",
            expected: tc.expected || "",
            points: tc.points || 150,
            isHidden: !!tc.isHidden,
          }))
        );
      } else {
        setTestCases([
          { input: "5 10\n2 3 1 5 4", expected: "3", points: 200, isHidden: false },
          { input: "3 5\n6 7 8", expected: "0", points: 150, isHidden: true },
        ]);
      }
    } else {
      setFormData({
        title: "",
        difficulty: "Easy",
        topic: "Array & Hashing",
        points: 500,
        status: "Active",
        statement: "",
        inputFormat: "",
        outputFormat: "",
        constraints: "",
      });
      setExamples([{ input: "", output: "", explanation: "" }]);
      setTestCases([
        { input: "", expected: "", points: 200, isHidden: false },
      ]);
    }
    setCurrentStep(1);
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  // Example Handlers
  const handleAddExample = () => {
    setExamples((prev) => [...prev, { input: "", output: "", explanation: "" }]);
  };

  const handleRemoveExample = (index) => {
    if (examples.length <= 1) return;
    setExamples((prev) => prev.filter((_, idx) => idx !== index));
  };

  const handleExampleChange = (index, field, value) => {
    setExamples((prev) =>
      prev.map((ex, idx) => (idx === index ? { ...ex, [field]: value } : ex))
    );
  };

  // Test Case Handlers
  const handleAddTestCase = () => {
    setTestCases((prev) => [
      ...prev,
      { input: "", expected: "", points: 100, isHidden: false },
    ]);
  };

  const handleRemoveTestCase = (index) => {
    if (testCases.length <= 1) return;
    setTestCases((prev) => prev.filter((_, idx) => idx !== index));
  };

  const handleTestCaseChange = (index, field, value) => {
    setTestCases((prev) =>
      prev.map((tc, idx) => (idx === index ? { ...tc, [field]: value } : tc))
    );
  };

  // Validate Step 1
  const handleNextStep = (e) => {
    e.preventDefault();

    if (!formData.title.trim()) {
      toast.warning("Vui lòng nhập Tên bài tập (Title)!", "Thiếu thông tin bắt buộc");
      return;
    }

    if (!formData.statement.trim()) {
      toast.warning("Vui lòng nhập Mô tả chi tiết cho bài toán!", "Thiếu thông tin bắt buộc");
      return;
    }

    const hasInvalidExample = examples.some(
      (ex) => !ex.input.trim() || !ex.output.trim()
    );

    if (hasInvalidExample) {
      toast.warning(
        "Vui lòng nhập đầy đủ INPUT và OUTPUT cho tất cả các Ví dụ mẫu!",
        "Thiếu thông tin bắt buộc"
      );
      return;
    }

    toast.info("Đã chuyển sang Bước 2: Cấu hình Test Cases", "Bước 1 hoàn tất");
    setCurrentStep(2);
  };

  // Validate Step 2 & Save
  const handleFinalSubmit = (e) => {
    e.preventDefault();

    if (!formData.title.trim()) {
      toast.warning("Vui lòng nhập Tên bài tập!", "Thiếu thông tin bắt buộc");
      setCurrentStep(1);
      return;
    }

    const hasInvalidTestCase = testCases.some(
      (tc) => !tc.input.trim() || !tc.expected.trim()
    );

    if (hasInvalidTestCase) {
      toast.warning(
        "Vui lòng nhập đầy đủ Input và Kết quả kỳ vọng cho tất cả Test Cases!",
        "Thiếu thông tin bắt buộc"
      );
      return;
    }

    const formattedData = {
      ...formData,
      points: Number(formData.points) || 500,
      inputFormat: formData.inputFormat ? formData.inputFormat.split("\n") : [],
      outputFormat: formData.outputFormat ? formData.outputFormat.split("\n") : [],
      constraints: formData.constraints ? formData.constraints.split("\n") : [],
      examples: examples.map((ex, idx) => ({
        id: idx + 1,
        title: `Ví dụ ${idx + 1}:`,
        input: ex.input,
        output: ex.output,
        explanation: ex.explanation,
      })),
      testCases: testCases.map((tc, idx) => ({
        id: idx + 1,
        label: `Case ${idx + 1}`,
        input: tc.input,
        expected: tc.expected,
        points: Number(tc.points) || 100,
        isHidden: tc.isHidden,
      })),
    };

    toast.success(
      initialData ? "Đã lưu thay đổi bài tập thành công!" : "Tạo bài tập và cấu hình Test Cases thành công!",
      "Thành công"
    );
    onSave(formattedData);
  };

  return (
    <div className={styles.modal_overlay} onClick={onClose}>
      <div className={styles.modal_container} onClick={(e) => e.stopPropagation()}>
        {/* Header with Step Indicator */}
        <div className={styles.modal_header}>
          <div className={styles.header_title}>
            <Icon name="Code" size={20} className={styles.header_icon} />
            <div>
              <h3 className={styles.title_text}>
                {initialData ? "Chỉnh Sửa Bài Tập Thuật Toán" : "Thêm Bài Tập Thuật Toán Mới"}
              </h3>
              <div className={styles.stepper_sub}>
                <span
                  className={`${styles.step_badge} ${currentStep === 1 ? styles.step_badge_active : styles.step_badge_done}`}
                  onClick={() => setCurrentStep(1)}
                  style={{ cursor: "pointer" }}
                >
                  Bước 1: Nội dung đề bài
                </span>
                <Icon name="ChevronRight" size={14} className={styles.step_arrow} />
                <span
                  className={`${styles.step_badge} ${currentStep === 2 ? styles.step_badge_active : ""}`}
                >
                  Bước 2: Cấu hình Test Cases ({testCases.length})
                </span>
              </div>
            </div>
          </div>
          <button type="button" className={styles.close_btn} onClick={onClose}>
            <Icon name="X" size={18} />
          </button>
        </div>

        {/* STEP 1: PROBLEM DETAILS & EXAMPLES */}
        {currentStep === 1 && (
          <form onSubmit={handleNextStep} className={styles.modal_body}>
            {/* 1. Tên bài tập */}
            <FormField
              label="Tên bài tập (Title)"
              placeholder="Vd: Two Sum, Binary Tree Level Order Traversal..."
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
            />

            {/* Metadata Row */}
            <div className={styles.row_grid_3col}>
              <div className={styles.form_group}>
                <label className={styles.label}>Mức độ (Difficulty)</label>
                <DropdownMenu
                  options={FORM_DIFFICULTY_OPTIONS}
                  value={formData.difficulty}
                  onChange={(val) => setFormData({ ...formData, difficulty: val })}
                />
              </div>

              <div className={styles.form_group}>
                <label className={styles.label}>Chủ đề (Topic)</label>
                <DropdownMenu
                  options={FORM_TOPIC_OPTIONS}
                  value={formData.topic}
                  onChange={(val) => setFormData({ ...formData, topic: val })}
                />
              </div>

              <div className={styles.form_group}>
                <label className={styles.label}>Điểm bài tập (Points)</label>
                <input
                  type="number"
                  className={styles.textarea}
                  style={{ height: 42, padding: "8px 12px" }}
                  placeholder="500"
                  value={formData.points}
                  onChange={(e) => setFormData({ ...formData, points: e.target.value })}
                />
              </div>
            </div>

            <div className={styles.form_group}>
              <label className={styles.label}>Trạng thái (Status)</label>
              <DropdownMenu
                options={FORM_STATUS_OPTIONS}
                value={formData.status}
                onChange={(val) => setFormData({ ...formData, status: val })}
              />
            </div>

            {/* 2. Mô tả bài toán (Statement) */}
            <div className={styles.form_group}>
              <label className={styles.label}>
                Mô tả bài toán (Statement) <span className={styles.required_mark}>*</span>
              </label>
              <textarea
                className={styles.textarea}
                placeholder="Nhập nội dung mô tả đề bài chi tiết..."
                value={formData.statement}
                onChange={(e) => setFormData({ ...formData, statement: e.target.value })}
                rows={3}
                required
              />
            </div>

            {/* 3. Đầu vào & Đầu ra */}
            <div className={styles.row_grid}>
              <div className={styles.form_group}>
                <label className={styles.label}>Đầu vào (Input Format)</label>
                <textarea
                  className={styles.textarea}
                  placeholder="Mỗi dòng một quy cách..."
                  value={formData.inputFormat}
                  onChange={(e) => setFormData({ ...formData, inputFormat: e.target.value })}
                  rows={2}
                />
              </div>

              <div className={styles.form_group}>
                <label className={styles.label}>Đầu ra (Output Format)</label>
                <textarea
                  className={styles.textarea}
                  placeholder="Quy cách dữ liệu đầu ra..."
                  value={formData.outputFormat}
                  onChange={(e) => setFormData({ ...formData, outputFormat: e.target.value })}
                  rows={2}
                />
              </div>
            </div>

            {/* 4. Ràng buộc */}
            <div className={styles.form_group}>
              <label className={styles.label}>Ràng buộc (Constraints)</label>
              <textarea
                className={styles.textarea}
                placeholder="Vd: 1 <= N <= 10^5 (Mỗi ràng buộc 1 dòng)..."
                value={formData.constraints}
                onChange={(e) => setFormData({ ...formData, constraints: e.target.value })}
                rows={2}
              />
            </div>

            {/* 5. Dynamic Examples List Header & Add Button */}
            <div className={styles.example_header_bar}>
              <div className={styles.section_title_left}>
                <Icon name="FlaskConical" size={16} className={styles.header_icon} />
                <span className={styles.section_title_text}>Ví dụ mẫu ({examples.length})</span>
              </div>
              <Button
                type="button"
                variant="outline"
                size="sm"
                leftIcon="Plus"
                onClick={handleAddExample}
              >
                Thêm ví dụ mẫu
              </Button>
            </div>

            {/* Render List of Dynamic Examples */}
            <div className={styles.examples_list}>
              {examples.map((ex, idx) => (
                <div key={idx} className={styles.example_card_item}>
                  <div className={styles.example_card_header}>
                    <span className={styles.example_card_title}>Ví dụ #{idx + 1}</span>
                    {examples.length > 1 && (
                      <button
                        type="button"
                        className={styles.remove_btn}
                        onClick={() => handleRemoveExample(idx)}
                        title="Xóa ví dụ này"
                      >
                        <Icon name="Trash2" size={14} />
                        <span>Xóa</span>
                      </button>
                    )}
                  </div>

                  <div className={styles.row_grid}>
                    <div className={styles.form_group}>
                      <label className={styles.label}>
                        INPUT mẫu <span className={styles.required_mark}>*</span>
                      </label>
                      <textarea
                        className={styles.textarea}
                        placeholder="5 10&#10;2 3 1 5 4"
                        value={ex.input}
                        onChange={(e) => handleExampleChange(idx, "input", e.target.value)}
                        rows={3}
                        required
                      />
                    </div>

                    <div className={styles.form_group}>
                      <label className={styles.label}>
                        OUTPUT mẫu <span className={styles.required_mark}>*</span>
                      </label>
                      <textarea
                        className={styles.textarea}
                        placeholder="3"
                        value={ex.output}
                        onChange={(e) => handleExampleChange(idx, "output", e.target.value)}
                        rows={3}
                        required
                      />
                    </div>
                  </div>

                  <div className={styles.form_group} style={{ marginTop: 8 }}>
                    <label className={styles.label}>Giải thích (Explanation)</label>
                    <input
                      type="text"
                      className={styles.textarea}
                      placeholder="Giải thích ngắn gọn trường hợp mẫu..."
                      value={ex.explanation}
                      onChange={(e) => handleExampleChange(idx, "explanation", e.target.value)}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className={styles.modal_footer}>
              <Button type="button" variant="outline" onClick={onClose}>
                Hủy bỏ
              </Button>
              <Button type="submit" variant="primary" rightIcon="ArrowRight">
                Tiếp tục: Thêm Test Cases
              </Button>
            </div>
          </form>
        )}

        {/* STEP 2: TEST CASES CONFIGURATION */}
        {currentStep === 2 && (
          <form onSubmit={handleFinalSubmit} className={styles.modal_body}>
            <div className={styles.example_header_bar} style={{ marginTop: 0, paddingTop: 0, borderTop: "none" }}>
              <div className={styles.section_title_left}>
                <Icon name="CheckCircle" size={18} style={{ color: "#10b981" }} />
                <span className={styles.section_title_text}>
                  Danh sách Test Cases Kiểm Thử Tự Động ({testCases.length})
                </span>
              </div>
              <Button
                type="button"
                variant="outline"
                size="sm"
                leftIcon="Plus"
                onClick={handleAddTestCase}
              >
                Thêm Test Case Mới
              </Button>
            </div>

            <div className={styles.examples_list}>
              {testCases.map((tc, idx) => (
                <div key={idx} className={styles.example_card_item}>
                  <div className={styles.example_card_header}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <span className={styles.example_card_title}>Case #{idx + 1}</span>
                      {tc.isHidden && (
                        <span className={styles.hidden_tag}>Test Ẩn (Hidden Case)</span>
                      )}
                    </div>
                    {testCases.length > 1 && (
                      <button
                        type="button"
                        className={styles.remove_btn}
                        onClick={() => handleRemoveTestCase(idx)}
                        title="Xóa Test Case này"
                      >
                        <Icon name="Trash2" size={14} />
                        <span>Xóa Test</span>
                      </button>
                    )}
                  </div>

                  <div className={styles.row_grid}>
                    <div className={styles.form_group}>
                      <label className={styles.label}>
                        Input Dữ Liệu Test <span className={styles.required_mark}>*</span>
                      </label>
                      <textarea
                        className={styles.textarea}
                        placeholder="Dữ liệu truyền vào stdin..."
                        value={tc.input}
                        onChange={(e) => handleTestCaseChange(idx, "input", e.target.value)}
                        rows={3}
                        required
                      />
                    </div>

                    <div className={styles.form_group}>
                      <label className={styles.label}>
                        Kết Quả Kỳ Vọng (Expected Output) <span className={styles.required_mark}>*</span>
                      </label>
                      <textarea
                        className={styles.textarea}
                        placeholder="Kết quả stdout mong đợi..."
                        value={tc.expected}
                        onChange={(e) => handleTestCaseChange(idx, "expected", e.target.value)}
                        rows={3}
                        required
                      />
                    </div>
                  </div>

                  <div className={styles.row_grid} style={{ marginTop: 8 }}>
                    <div className={styles.form_group}>
                      <label className={styles.label}>Điểm cho Test Case này (Points)</label>
                      <input
                        type="number"
                        className={styles.textarea}
                        style={{ height: 38, padding: "6px 12px" }}
                        placeholder="100"
                        value={tc.points || 100}
                        onChange={(e) => handleTestCaseChange(idx, "points", e.target.value)}
                      />
                    </div>

                    <div className={styles.checkbox_row} style={{ marginTop: 24 }}>
                      <label className={styles.checkbox_label}>
                        <input
                          type="checkbox"
                          checked={tc.isHidden}
                          onChange={(e) => handleTestCaseChange(idx, "isHidden", e.target.checked)}
                        />
                        <span>Đặt làm Test Case Ẩn (Hidden)</span>
                      </label>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className={styles.modal_footer}>
              <Button
                type="button"
                variant="outline"
                leftIcon="ArrowLeft"
                onClick={() => setCurrentStep(1)}
              >
                Quay lại chỉnh sửa đề bài
              </Button>
              <Button type="submit" variant="primary" leftIcon="Check">
                {initialData ? "Lưu Bài Tập & Test Cases" : "Hoàn Tất Tạo Bài Tập"}
              </Button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
