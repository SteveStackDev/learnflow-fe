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

const DRAFT_STORAGE_KEY = "fyset_admin_problem_draft_v1";

// Helper chia đều điểm số nguyên chuẩn xác không bao giờ bị lệch tổng
function distributePoints(totalPoints, count) {
  if (count <= 0) return [];
  const numPoints = Math.max(0, Math.floor(Number(totalPoints) || 0));
  const base = Math.floor(numPoints / count);
  const remainder = numPoints % count;
  return Array.from({ length: count }, (_, idx) => base + (idx < remainder ? 1 : 0));
}

export default function AdminProblemModal({ isOpen, onClose, onSave, initialData }) {
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(1); // 1: Problem Details | 2: Test Cases
  const [hasDraft, setHasDraft] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    difficulty: "Easy",
    topic: "Array & Hashing",
    points: 500,
    status: "Active",
    timeLimit: "2.0",
    memoryLimit: "256",
    statement: "",
    imageDescription: "",
    inputFormat: "",
    outputFormat: "",
    constraints: "",
  });

  const [examples, setExamples] = useState([
    { input: "", output: "", explanation: "" },
  ]);

  const [subtasks, setSubtasks] = useState([
    {
      id: 1,
      name: "Subtask 1",
      points: 200,
      constraints: "N <= 100",
      testCases: [
        { id: 1, input: "", expected: "", points: 100, isHidden: false },
        { id: 2, input: "", expected: "", points: 100, isHidden: true },
      ],
    },
    {
      id: 2,
      name: "Subtask 2",
      points: 300,
      constraints: "N <= 10^5",
      testCases: [
        { id: 3, input: "", expected: "", points: 300, isHidden: true },
      ],
    },
  ]);
  const [activeSubtaskIdx, setActiveSubtaskIdx] = useState(0);

  // 1. Khôi phục dữ liệu từ initialData (nếu sửa) hoặc từ localStorage Draft (nếu tạo mới)
  useEffect(() => {
    if (!isOpen) return;

    if (initialData) {
      setHasDraft(false);
      setFormData({
        title: initialData.title || "",
        difficulty: initialData.difficulty || "Easy",
        topic: initialData.topic || "Array & Hashing",
        points: initialData.points || 500,
        status: initialData.status || "Active",
        timeLimit: initialData.timeLimit
          ? String(initialData.timeLimit).replace("s", "")
          : initialData.time_limit
          ? String(initialData.time_limit)
          : "2.0",
        memoryLimit: initialData.memoryLimit
          ? String(initialData.memoryLimit).replace("MB", "")
          : initialData.memory_limit
          ? String(initialData.memory_limit)
          : "256",
        statement: initialData.statement || initialData.description || "",
        imageDescription: initialData.imageDescription || initialData.image_description || "",
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

      if (initialData.subtasks && initialData.subtasks.length > 0) {
        setSubtasks(
          initialData.subtasks.map((st, sIdx) => ({
            id: st.id || sIdx + 1,
            name: st.name || `Subtask ${sIdx + 1}`,
            points: Number(st.points) || 100,
            constraints: st.constraints || "",
            testCases:
              st.testCases && st.testCases.length > 0
                ? st.testCases.map((tc, tIdx) => ({
                    id: tc.id || tIdx + 1,
                    input: tc.input || "",
                    expected: tc.expected || "",
                    points: Number(tc.points) || 100,
                    isHidden: !!tc.isHidden,
                  }))
                : [{ id: 1, input: "", expected: "", points: 100, isHidden: false }],
          }))
        );
      } else if (initialData.testCases && initialData.testCases.length > 0) {
        setSubtasks([
          {
            id: 1,
            name: "Subtask 1 (Mặc định)",
            points: Number(initialData.points) || 500,
            constraints: "",
            testCases: initialData.testCases.map((tc, tIdx) => ({
              id: tc.id || tIdx + 1,
              input: tc.input || "",
              expected: tc.expected || "",
              points: Number(tc.points) || 100,
              isHidden: !!tc.isHidden,
            })),
          },
        ]);
      } else {
        setSubtasks([
          {
            id: 1,
            name: "Subtask 1",
            points: 200,
            constraints: "N <= 100",
            testCases: [
              { id: 1, input: "", expected: "", points: 100, isHidden: false },
              { id: 2, input: "", expected: "", points: 100, isHidden: true },
            ],
          },
          {
            id: 2,
            name: "Subtask 2",
            points: 300,
            constraints: "N <= 10^5",
            testCases: [
              { id: 3, input: "", expected: "", points: 300, isHidden: true },
            ],
          },
        ]);
      }
    } else {
      // Đang tạo bài mới -> Thử nạp từ bản nháp đã lưu
      let draftRestored = false;
      try {
        const savedDraft = localStorage.getItem(DRAFT_STORAGE_KEY);
        if (savedDraft) {
          const parsed = JSON.parse(savedDraft);
          if (parsed && parsed.formData) {
            setFormData(parsed.formData);
            if (parsed.examples && parsed.examples.length > 0) {
              setExamples(parsed.examples);
            }
            if (parsed.subtasks && parsed.subtasks.length > 0) {
              setSubtasks(parsed.subtasks);
            }
            setHasDraft(true);
            draftRestored = true;
          }
        }
      } catch (err) {
        console.warn("[AdminProblemModal] Lỗi đọc draft từ localStorage:", err);
      }

      if (!draftRestored) {
        setFormData({
          title: "",
          difficulty: "Easy",
          topic: "Array & Hashing",
          points: 500,
          status: "Active",
          timeLimit: "2.0",
          memoryLimit: "256",
          statement: "",
          imageDescription: "",
          inputFormat: "",
          outputFormat: "",
          constraints: "",
        });
        setExamples([{ input: "", output: "", explanation: "" }]);
        setSubtasks([
          {
            id: 1,
            name: "Subtask 1",
            points: 200,
            constraints: "N <= 100",
            testCases: [
              { id: 1, input: "", expected: "", points: 100, isHidden: false },
              { id: 2, input: "", expected: "", points: 100, isHidden: true },
            ],
          },
          {
            id: 2,
            name: "Subtask 2",
            points: 300,
            constraints: "N <= 10^5",
            testCases: [
              { id: 3, input: "", expected: "", points: 300, isHidden: true },
            ],
          },
        ]);
        setHasDraft(false);
      }
    }
    setActiveSubtaskIdx(0);
    setCurrentStep(1);
  }, [initialData, isOpen]);

  // 2. Tự động lưu bản nháp vào localStorage mỗi khi người dùng nhập dữ liệu
  useEffect(() => {
    if (!isOpen || initialData) return;

    const hasContent = Boolean(
      (formData.title && formData.title.trim()) ||
      (formData.statement && formData.statement.trim()) ||
      (formData.imageDescription && formData.imageDescription.trim()) ||
      (formData.inputFormat && formData.inputFormat.trim()) ||
      (formData.outputFormat && formData.outputFormat.trim()) ||
      (formData.constraints && formData.constraints.trim()) ||
      examples.some((e) => e.input || e.output || e.explanation) ||
      subtasks.some((s) => s.testCases && s.testCases.some((t) => t.input || t.expected))
    );

    if (hasContent) {
      try {
        const payload = {
          formData,
          examples,
          subtasks,
          savedAt: Date.now(),
        };
        localStorage.setItem(DRAFT_STORAGE_KEY, JSON.stringify(payload));
        setHasDraft(true);
      } catch (err) {
        console.warn("[AdminProblemModal] Lỗi auto-save draft:", err);
      }
    }
  }, [formData, examples, subtasks, isOpen, initialData]);

  // Xóa bản nháp và làm mới toàn bộ form
  const handleClearDraft = () => {
    try {
      localStorage.removeItem(DRAFT_STORAGE_KEY);
    } catch {
      // bỏ qua lỗi nếu có
    }

    setFormData({
      title: "",
      difficulty: "Easy",
      topic: "Array & Hashing",
      points: 500,
      status: "Active",
      timeLimit: "2.0",
      memoryLimit: "256",
      statement: "",
      imageDescription: "",
      inputFormat: "",
      outputFormat: "",
      constraints: "",
    });
    setExamples([{ input: "", output: "", explanation: "" }]);
    setSubtasks([
      {
        id: 1,
        name: "Subtask 1",
        points: 200,
        constraints: "N <= 100",
        testCases: [
          { id: 1, input: "", expected: "", points: 100, isHidden: false },
          { id: 2, input: "", expected: "", points: 100, isHidden: true },
        ],
      },
      {
        id: 2,
        name: "Subtask 2",
        points: 300,
        constraints: "N <= 10^5",
        testCases: [
          { id: 3, input: "", expected: "", points: 300, isHidden: true },
        ],
      },
    ]);
    setHasDraft(false);
    toast.info("Đã xóa bản nháp và làm mới form điền!", "Làm mới form");
  };

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

  // Points Calculations
  const maxProblemPoints = Number(formData.points) || 0;
  const totalSubtaskPoints = subtasks.reduce(
    (sum, s) => sum + (Number(s.points) || 0),
    0
  );
  const isOverPoints = totalSubtaskPoints > maxProblemPoints;
  const isMatchPoints = totalSubtaskPoints === maxProblemPoints;

  // Subtask Handlers
  const handleAddSubtask = () => {
    const newNum = subtasks.length + 1;
    const remainingPoints = Math.max(0, maxProblemPoints - totalSubtaskPoints);
    const defaultPoints = remainingPoints > 0 ? remainingPoints : 100;
    const newSt = {
      id: Date.now(),
      name: `Subtask ${newNum}`,
      points: defaultPoints,
      constraints: "",
      testCases: [
        { id: Date.now() + 1, input: "", expected: "", points: defaultPoints, isHidden: false },
      ],
    };
    setSubtasks((prev) => [...prev, newSt]);
    setActiveSubtaskIdx(subtasks.length);
  };

  const handleRemoveSubtask = (idxToRemove) => {
    if (subtasks.length <= 1) {
      toast.warning("Bài tập phải có ít nhất 1 Subtask!", "Thông báo");
      return;
    }
    setSubtasks((prev) => prev.filter((_, idx) => idx !== idxToRemove));
    if (activeSubtaskIdx >= idxToRemove && activeSubtaskIdx > 0) {
      setActiveSubtaskIdx(activeSubtaskIdx - 1);
    }
  };

  const handleSubtaskFieldChange = (sIdx, field, value) => {
    setSubtasks((prev) =>
      prev.map((st, idx) => {
        if (idx !== sIdx) return st;
        if (field === "points") {
          const newPts = Math.max(0, Number(value) || 0);
          const tcCount = st.testCases?.length || 0;
          if (tcCount > 0) {
            const distributed = distributePoints(newPts, tcCount);
            const updatedTests = st.testCases.map((tc, tcIdx) => ({
              ...tc,
              points: distributed[tcIdx] ?? 0,
            }));
            return { ...st, points: value, testCases: updatedTests };
          }
          return { ...st, points: value };
        }
        return { ...st, [field]: value };
      })
    );
  };

  // Test Case in Subtask Handlers - Tự động chia lại điểm theo thời gian thực
  const handleAddTestCaseToSubtask = (sIdx) => {
    setSubtasks((prev) =>
      prev.map((st, idx) => {
        if (idx !== sIdx) return st;
        const currentTests = st.testCases || [];
        const newCount = currentTests.length + 1;
        const totalPts = Math.max(0, Number(st.points) || 0);
        const distributed = distributePoints(totalPts, newCount);

        const updatedTests = [
          ...currentTests.map((tc, tcIdx) => ({
            ...tc,
            points: distributed[tcIdx] ?? 0,
          })),
          {
            id: Date.now(),
            input: "",
            expected: "",
            points: distributed[newCount - 1] ?? 0,
            isHidden: false,
          },
        ];
        return { ...st, testCases: updatedTests };
      })
    );
  };

  const handleRemoveTestCaseFromSubtask = (sIdx, tcIdx) => {
    setSubtasks((prev) =>
      prev.map((st, idx) => {
        if (idx !== sIdx) return st;
        if (st.testCases.length <= 1) {
          toast.warning("Mỗi Subtask phải có ít nhất 1 Test Case!", "Thông báo");
          return st;
        }
        const remaining = st.testCases.filter((_, tIdx) => tIdx !== tcIdx);
        const totalPts = Math.max(0, Number(st.points) || 0);
        const distributed = distributePoints(totalPts, remaining.length);
        const updatedTests = remaining.map((tc, rIdx) => ({
          ...tc,
          points: distributed[rIdx] ?? 0,
        }));
        return { ...st, testCases: updatedTests };
      })
    );
  };

  const handleTestCaseChangeInSubtask = (sIdx, tcIdx, field, value) => {
    setSubtasks((prev) =>
      prev.map((st, idx) => {
        if (idx !== sIdx) return st;
        const updatedTests = st.testCases.map((tc, tIdx) =>
          tIdx === tcIdx ? { ...tc, [field]: value } : tc
        );
        if (field === "points") {
          // Tính lại tổng điểm subtask theo thời gian thực khi sửa điểm từng test
          const sumTestPoints = updatedTests.reduce(
            (sum, tc) => sum + (Number(tc.points) || 0),
            0
          );
          return { ...st, points: sumTestPoints, testCases: updatedTests };
        }
        return { ...st, testCases: updatedTests };
      })
    );
  };

  // Nút hỗ trợ: Tự động chia đều điểm test trong 1 Subtask
  const handleAutoDistributeTestPoints = (sIdx) => {
    setSubtasks((prev) =>
      prev.map((st, idx) => {
        if (idx !== sIdx) return st;
        const count = st.testCases?.length || 0;
        if (count === 0) return st;
        const distributed = distributePoints(Number(st.points) || 0, count);
        const updatedTests = st.testCases.map((tc, tcIdx) => ({
          ...tc,
          points: distributed[tcIdx] ?? 0,
        }));
        return { ...st, testCases: updatedTests };
      })
    );
    toast.success("Đã tự động chia đều điểm cho các Test Cases trong Subtask!", "Chia điểm thành công");
  };

  // Nút hỗ trợ: Tự động chia đều điểm bài tập cho tất cả các Subtasks
  const handleAutoDistributeAllSubtasks = () => {
    const sCount = subtasks.length;
    if (sCount === 0) return;
    const maxPts = Number(formData.points) || 500;
    const distributedSubtaskPts = distributePoints(maxPts, sCount);

    setSubtasks((prev) =>
      prev.map((st, sIdx) => {
        const stPts = distributedSubtaskPts[sIdx] ?? 0;
        const tcCount = st.testCases?.length || 0;
        const distributedTc = distributePoints(stPts, tcCount);
        const updatedTests = st.testCases.map((tc, tcIdx) => ({
          ...tc,
          points: distributedTc[tcIdx] ?? 0,
        }));
        return { ...st, points: stPts, testCases: updatedTests };
      })
    );
    toast.success("Đã chia đều điểm bài tập cho toàn bộ các Subtasks!", "Chia điểm thành công");
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

    toast.info("Đã chuyển sang Bước 2: Cấu hình Subtasks & Test Cases", "Bước 1 hoàn tất");
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

    // Check condition: Total subtask points cannot exceed problem total points
    if (totalSubtaskPoints > maxProblemPoints) {
      toast.error(
        `Tổng điểm các Subtasks (${totalSubtaskPoints} pt) không được vượt quá tổng điểm bài tập (${maxProblemPoints} pt)! Vui lòng điều chỉnh lại điểm của các Subtask.`,
        "Vượt quá tổng điểm"
      );
      return;
    }

    // Validate subtasks & testcases
    for (let sIdx = 0; sIdx < subtasks.length; sIdx++) {
      const st = subtasks[sIdx];
      if (!st.name.trim()) {
        toast.warning(`Vui lòng nhập tên cho Subtask #${sIdx + 1}!`, "Thiếu thông tin Subtask");
        setActiveSubtaskIdx(sIdx);
        return;
      }
      for (let tIdx = 0; tIdx < st.testCases.length; tIdx++) {
        const tc = st.testCases[tIdx];
        if (!tc.input.trim() || !tc.expected.trim()) {
          toast.warning(
            `Vui lòng nhập đầy đủ Input và Kết quả kỳ vọng cho Test Case #${tIdx + 1} trong ${st.name}!`,
            "Thiếu thông tin Test Case"
          );
          setActiveSubtaskIdx(sIdx);
          return;
        }
      }
    }

    // Flatten all test cases for judge execution
    const flatTestCases = [];
    subtasks.forEach((st) => {
      st.testCases.forEach((tc) => {
        flatTestCases.push({
          id: flatTestCases.length + 1,
          label: `Case ${flatTestCases.length + 1} (${st.name})`,
          input: tc.input,
          expected: tc.expected,
          points: Number(tc.points) || 100,
          isHidden: !!tc.isHidden,
          subtaskName: st.name,
        });
      });
    });

    const formattedData = {
      ...formData,
      points: Number(formData.points) || 500,
      time_limit: parseFloat(formData.timeLimit) || 2.0,
      memory_limit: parseInt(formData.memoryLimit) || 256,
      timeLimit: `${formData.timeLimit || "2.0"}s`,
      memoryLimit: `${formData.memoryLimit || "256"}MB`,
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
      subtasks: subtasks.map((st, idx) => ({
        id: idx + 1,
        name: st.name,
        points: Number(st.points) || 0,
        constraints: st.constraints || "",
        testCases: st.testCases.map((tc, tIdx) => ({
          id: tIdx + 1,
          input: tc.input,
          expected: tc.expected,
          points: Number(tc.points) || 0,
          isHidden: !!tc.isHidden,
        })),
      })),
      testCases: flatTestCases,
    };

    if (!initialData) {
      try {
        localStorage.removeItem(DRAFT_STORAGE_KEY);
      } catch {
        // bỏ qua lỗi nếu có
      }
      setHasDraft(false);
    }

    toast.success(
      initialData ? "Đã lưu thay đổi bài tập & Subtasks thành công!" : "Tạo bài tập và cấu hình Subtasks thành công!",
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
                  Bước 2: Cấu hình Subtasks ({subtasks.length})
                </span>
              </div>
            </div>
          </div>
          <button type="button" className={styles.close_btn} onClick={onClose}>
            <Icon name="X" size={18} />
          </button>
        </div>

        {/* Auto-save Draft Bar (Chỉ hiển thị khi đang tạo bài mới) */}
        {!initialData && (
          <div className={styles.draft_bar}>
            <div className={styles.draft_info}>
              <Icon name="Save" size={14} />
              <span>
                {hasDraft
                  ? "Tự động lưu bản nháp: Dữ liệu vẫn được giữ nguyên khi bạn thoát ra ngoài"
                  : "Hệ thống tự động lưu bản nháp khi bạn điền form"}
              </span>
            </div>
            {hasDraft && (
              <button
                type="button"
                className={styles.draft_clear_btn}
                onClick={handleClearDraft}
                title="Xóa dữ liệu nháp và làm mới form"
              >
                <Icon name="Trash2" size={12} />
                <span>Xóa bản nháp</span>
              </button>
            )}
          </div>
        )}

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

            {/* Metadata Row 1: Difficulty, Topic, Points */}
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

            {/* Metadata Row 2: Status, Time Limit, Memory Limit */}
            <div className={styles.row_grid_3col}>
              <div className={styles.form_group}>
                <label className={styles.label}>Trạng thái (Status)</label>
                <DropdownMenu
                  options={FORM_STATUS_OPTIONS}
                  value={formData.status}
                  onChange={(val) => setFormData({ ...formData, status: val })}
                />
              </div>

              <div className={styles.form_group}>
                <label className={styles.label}>Thời gian (Time Limit - Giây)</label>
                <input
                  type="number"
                  step="0.1"
                  min="0.1"
                  className={styles.textarea}
                  style={{ height: 42, padding: "8px 12px" }}
                  placeholder="2.0"
                  value={formData.timeLimit}
                  onChange={(e) => setFormData({ ...formData, timeLimit: e.target.value })}
                />
              </div>

              <div className={styles.form_group}>
                <label className={styles.label}>Bộ nhớ (Memory Limit - MB)</label>
                <input
                  type="number"
                  min="16"
                  className={styles.textarea}
                  style={{ height: 42, padding: "8px 12px" }}
                  placeholder="256"
                  value={formData.memoryLimit}
                  onChange={(e) => setFormData({ ...formData, memoryLimit: e.target.value })}
                />
              </div>
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
                Tiếp tục: Cấu hình Subtasks
              </Button>
            </div>
          </form>
        )}

        {/* STEP 2: SUBTASKS & TEST CASES CONFIGURATION */}
        {currentStep === 2 && (
          <form onSubmit={handleFinalSubmit} className={styles.modal_body}>
            {/* Header with Title & Add Subtask Button */}
            <div className={styles.example_header_bar} style={{ marginTop: 0, paddingTop: 0, borderTop: "none" }}>
              <div className={styles.section_title_left}>
                <Icon name="Layers" size={18} style={{ color: "#0950c3" }} />
                <span className={styles.section_title_text}>
                  Cấu hình Subtasks ({subtasks.length})
                </span>
                <span
                  className={`${styles.subtask_total_badge} ${
                    isOverPoints
                      ? styles.subtask_total_badge_error
                      : isMatchPoints
                      ? styles.subtask_total_badge_success
                      : styles.subtask_total_badge_warn
                  }`}
                  title={
                    isOverPoints
                      ? `Vượt quá ${totalSubtaskPoints - maxProblemPoints} pt`
                      : isMatchPoints
                      ? "Điểm Subtasks khớp hoàn toàn với bài tập"
                      : `Còn ${maxProblemPoints - totalSubtaskPoints} pt chưa phân bổ`
                  }
                >
                  <Icon
                    name={isOverPoints ? "AlertCircle" : "Award"}
                    size={13}
                  />
                  Tổng: {totalSubtaskPoints} / {maxProblemPoints} pt
                </span>
              </div>
              <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                {subtasks.length > 1 && (
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    leftIcon="Sliders"
                    onClick={handleAutoDistributeAllSubtasks}
                    title="Tự động chia đều tổng điểm bài tập cho các Subtasks"
                  >
                    Chia đều điểm Subtasks
                  </Button>
                )}
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  leftIcon="Plus"
                  onClick={handleAddSubtask}
                >
                  Thêm Subtask Mới
                </Button>
              </div>
            </div>

            {/* Over Points Warning Banner */}
            {isOverPoints && (
              <div className={styles.points_warning_banner}>
                <Icon name="AlertTriangle" size={18} style={{ flexShrink: 0 }} />
                <span>
                  <strong>Cảnh báo:</strong> Tổng điểm các Subtask (<strong>{totalSubtaskPoints} pt</strong>) đang vượt quá tổng điểm bài tập (<strong>{maxProblemPoints} pt</strong>). Không thể lưu bài tập cho đến khi bạn điều chỉnh lại điểm Subtask!
                </span>
              </div>
            )}

            {/* Subtask Tabs Navigation */}
            <div className={styles.subtask_tabs_container}>
              {subtasks.map((st, sIdx) => (
                <button
                  key={st.id || sIdx}
                  type="button"
                  onClick={() => setActiveSubtaskIdx(sIdx)}
                  className={`${styles.subtask_tab_btn} ${activeSubtaskIdx === sIdx ? styles.subtask_tab_btn_active : ""}`}
                >
                  <Icon name="Layers" size={13} />
                  <span>{st.name || `Subtask ${sIdx + 1}`} ({st.points || 0} pt, {st.testCases?.length || 0} tests)</span>
                  {subtasks.length > 1 && (
                    <span
                      className={styles.subtask_tab_remove}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemoveSubtask(sIdx);
                      }}
                      title="Xóa Subtask này"
                    >
                      ×
                    </span>
                  )}
                </button>
              ))}
            </div>

            {/* Active Subtask Details Panel */}
            {subtasks[activeSubtaskIdx] && (
              <div className={styles.subtask_card_panel}>
                <div className={styles.row_grid_3col}>
                  <div className={styles.form_group}>
                    <label className={styles.label}>
                      Tên Subtask <span className={styles.required_mark}>*</span>
                    </label>
                    <input
                      type="text"
                      className={styles.textarea}
                      style={{ height: 40, padding: "6px 12px" }}
                      placeholder="Vd: Subtask 1, Subtask 2..."
                      value={subtasks[activeSubtaskIdx].name}
                      onChange={(e) => handleSubtaskFieldChange(activeSubtaskIdx, "name", e.target.value)}
                      required
                    />
                  </div>

                  <div className={styles.form_group}>
                    <label className={styles.label}>
                      Điểm Subtask (Points) <span className={styles.required_mark}>*</span>
                    </label>
                    <input
                      type="number"
                      className={styles.textarea}
                      style={{ height: 40, padding: "6px 12px" }}
                      placeholder="200"
                      value={subtasks[activeSubtaskIdx].points}
                      onChange={(e) => handleSubtaskFieldChange(activeSubtaskIdx, "points", Number(e.target.value))}
                      required
                    />
                  </div>

                  <div className={styles.form_group}>
                    <label className={styles.label}>Ràng buộc / Giới hạn</label>
                    <input
                      type="text"
                      className={styles.textarea}
                      style={{ height: 40, padding: "6px 12px" }}
                      placeholder="Vd: N <= 100 hoặc Thuật toán vét cạn..."
                      value={subtasks[activeSubtaskIdx].constraints}
                      onChange={(e) => handleSubtaskFieldChange(activeSubtaskIdx, "constraints", e.target.value)}
                    />
                  </div>
                </div>

                {/* Test Cases inside Active Subtask */}
                <div className={styles.example_header_bar} style={{ marginTop: 6, paddingTop: 10 }}>
                  <div className={styles.section_title_left}>
                    <Icon name="CheckCircle" size={16} style={{ color: "#10b981" }} />
                    <span className={styles.section_title_text}>
                      Test Cases ({subtasks[activeSubtaskIdx].testCases?.length || 0} tests)
                    </span>
                  </div>
                  <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                    {subtasks[activeSubtaskIdx].testCases?.length > 1 && (
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        leftIcon="RefreshCw"
                        onClick={() => handleAutoDistributeTestPoints(activeSubtaskIdx)}
                        title="Tự động chia đều điểm Subtask cho các test cases"
                      >
                        Chia đều điểm Test
                      </Button>
                    )}
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      leftIcon="Plus"
                      onClick={() => handleAddTestCaseToSubtask(activeSubtaskIdx)}
                    >
                      Thêm Test Case
                    </Button>
                  </div>
                </div>

                <div className={styles.examples_list}>
                  {subtasks[activeSubtaskIdx].testCases?.map((tc, tcIdx) => (
                    <div key={tc.id || tcIdx} className={styles.tc_card}>
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
                        {subtasks[activeSubtaskIdx].testCases.length > 1 && (
                          <button
                            type="button"
                            className={styles.remove_btn}
                            onClick={() => handleRemoveTestCaseFromSubtask(activeSubtaskIdx, tcIdx)}
                            title="Xóa Test Case này"
                          >
                            <Icon name="Trash2" size={14} />
                            <span>Xóa Test</span>
                          </button>
                        )}
                      </div>

                      <div className={styles.tc_body}>
                        <div className={styles.tc_code_grid}>
                          <div className={styles.tc_code_box}>
                            <label className={`${styles.tc_code_label} ${styles.tc_code_label_stdin}`}>
                              <Icon name="Terminal" size={13} />
                              INPUT (stdin) <span className={styles.required_mark}>*</span>
                            </label>
                            <textarea
                              className={styles.tc_textarea}
                              placeholder="Dữ liệu truyền vào stdin..."
                              value={tc.input}
                              onChange={(e) => handleTestCaseChangeInSubtask(activeSubtaskIdx, tcIdx, "input", e.target.value)}
                              rows={3}
                              required
                            />
                          </div>

                          <div className={styles.tc_code_box}>
                            <label className={`${styles.tc_code_label} ${styles.tc_code_label_stdout}`}>
                              <Icon name="Play" size={13} />
                              KẾT QUẢ KỲ VỌNG (Expected stdout) <span className={styles.required_mark}>*</span>
                            </label>
                            <textarea
                              className={styles.tc_textarea}
                              placeholder="Kết quả stdout mong đợi..."
                              value={tc.expected}
                              onChange={(e) => handleTestCaseChangeInSubtask(activeSubtaskIdx, tcIdx, "expected", e.target.value)}
                              rows={3}
                              required
                            />
                          </div>
                        </div>

                        <div className={styles.tc_footer_row}>
                          <div className={styles.tc_points_group}>
                            <span className={styles.tc_points_label}>Điểm test:</span>
                            <input
                              type="number"
                              className={styles.tc_points_input}
                              placeholder="100"
                              value={tc.points !== undefined && tc.points !== null ? tc.points : 0}
                              onChange={(e) => handleTestCaseChangeInSubtask(activeSubtaskIdx, tcIdx, "points", Number(e.target.value))}
                            />
                            <span className={styles.tc_points_label}>pt</span>
                          </div>

                          <div className={styles.checkbox_row} style={{ margin: 0 }}>
                            <label className={styles.checkbox_label}>
                              <input
                                type="checkbox"
                                checked={tc.isHidden}
                                onChange={(e) => handleTestCaseChangeInSubtask(activeSubtaskIdx, tcIdx, "isHidden", e.target.checked)}
                              />
                              <span>Đặt làm Test Case Ẩn (Hidden Case)</span>
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

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
                {initialData ? "Lưu Bài Tập & Subtasks" : "Hoàn Tất Tạo Bài Tập"}
              </Button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
