import React, { useState, useEffect } from "react";
import { problemService } from "~/services/problemService";
import { useToast } from "~/context/ToastContext.jsx";
import AdminProblemList from "./components/AdminProblemList/AdminProblemList";
import AdminProblemDetail from "./components/AdminProblemDetail/AdminProblemDetail";
import AdminProblemModal from "./components/AdminProblemModal/AdminProblemModal";

export default function AdminProblemTab() {
  const { toast } = useToast();
  const [problems, setProblems] = useState([]);
  const [selectedProblemId, setSelectedProblemId] = useState(null); // null = List view, id = Detail view
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProblem, setEditingProblem] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load danh sách bài tập từ SQLite Backend
  const loadProblems = async () => {
    try {
      setIsLoading(true);
      const data = await problemService.getAdminProblems();
      setProblems(Array.isArray(data) ? data : []);
    } catch (err) {
      console.warn("Lỗi tải danh sách bài tập Admin:", err.message);
      setProblems([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadProblems();
  }, []);

  // View Problem Detail Editor
  const handleViewProblem = (id) => {
    setSelectedProblemId(id);
  };

  // Back to Problem List
  const handleBackToList = () => {
    setSelectedProblemId(null);
  };

  // Quick Modal Add / Edit
  const handleOpenAddModal = () => {
    setEditingProblem(null);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (problem) => {
    setEditingProblem(problem);
    setIsModalOpen(true);
  };

  const handleSaveModal = async (formData) => {
    try {
      if (editingProblem) {
        await problemService.updateProblem(editingProblem.id, formData);
        toast.success(`Đã cập nhật bài tập "${formData.title}" thành công!`, "Thành công");
      } else {
        await problemService.createProblem(formData);
        toast.success(`Đã tạo mới bài tập "${formData.title}" vào cơ sở dữ liệu!`, "Thành công");
      }
      setIsModalOpen(false);
      await loadProblems();
    } catch (err) {
      toast.error(`Lỗi lưu bài tập: ${err.message}`, "Lỗi lưu dữ liệu");
    }
  };

  // Save Detail Editor
  const handleSaveDetail = async (updatedProblem) => {
    try {
      await problemService.updateProblem(updatedProblem.id, updatedProblem);
      toast.success(`Đã lưu thay đổi cho bài tập "${updatedProblem.title}"`, "Thành công");
      setSelectedProblemId(null);
      await loadProblems();
    } catch (err) {
      toast.error(`Lỗi cập nhật: ${err.message}`, "Lỗi lưu dữ liệu");
    }
  };

  // Duplicate Problem
  const handleDuplicateProblem = async (prob) => {
    try {
      const copyPayload = {
        ...prob,
        title: `${prob.title} (Bản sao)`,
        status: "Draft",
        points: prob.points || 500,
        statement: prob.statement || prob.description || "",
        inputFormat: prob.inputFormat || [],
        outputFormat: prob.outputFormat || [],
        constraints: prob.constraints || [],
        examples: prob.examples || [],
        subtasks: prob.subtasks || [],
        testCases: (prob.testCases || []).map((tc) => ({
          input: tc.input,
          expected: tc.expected,
          points: tc.points || 100,
          isHidden: tc.isHidden || false,
        })),
      };
      await problemService.createProblem(copyPayload);
      toast.success(`Đã nhân bản bài tập "${prob.title}" thành bản nháp mới!`, "Nhân bản");
      await loadProblems();
    } catch (err) {
      toast.error(`Lỗi nhân bản: ${err.message}`, "Lỗi");
    }
  };

  // Toggle Status (Publish / Draft)
  const handleToggleStatus = async (id) => {
    try {
      const res = await problemService.toggleStatus(id);
      toast.info(res.message || "Đã cập nhật trạng thái bài tập", "Trạng thái bài tập");
      await loadProblems();
    } catch (err) {
      toast.error(`Lỗi đổi trạng thái: ${err.message}`, "Lỗi");
    }
  };

  // Delete Problem
  const handleDeleteProblem = async (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa bài tập thuật toán này khỏi cơ sở dữ liệu không?")) {
      try {
        await problemService.deleteProblem(id);
        toast.success("Đã xóa bài tập thành công!", "Xóa bài tập");
        if (selectedProblemId === id) {
          setSelectedProblemId(null);
        }
        await loadProblems();
      } catch (err) {
        toast.error(`Lỗi xóa bài tập: ${err.message}`, "Lỗi");
      }
    }
  };

  // Clear All Problems (Reset DB)
  const handleClearAll = async () => {
    if (window.confirm("Bạn có chắc chắn muốn xóa TOÀN BỘ bài tập khỏi cơ sở dữ liệu để làm sạch dữ liệu không?")) {
      try {
        await problemService.clearAllProblems();
        toast.success("Đã xóa toàn bộ bài tập trong cơ sở dữ liệu!", "Reset Database");
        setSelectedProblemId(null);
        await loadProblems();
      } catch (err) {
        toast.error(`Lỗi làm sạch cơ sở dữ liệu: ${err.message}`, "Lỗi");
      }
    }
  };

  const currentSelectedProblem = problems.find((p) => String(p.id) === String(selectedProblemId));

  return (
    <div>
      {selectedProblemId !== null && currentSelectedProblem ? (
        <AdminProblemDetail
          problem={currentSelectedProblem}
          onBack={handleBackToList}
          onSave={handleSaveDetail}
        />
      ) : (
        <AdminProblemList
          problems={problems}
          isLoading={isLoading}
          onAddProblem={handleOpenAddModal}
          onViewProblem={handleViewProblem}
          onEditProblem={handleOpenEditModal}
          onDuplicateProblem={handleDuplicateProblem}
          onToggleStatus={handleToggleStatus}
          onDeleteProblem={handleDeleteProblem}
          onClearAll={handleClearAll}
        />
      )}

      {/* Quick Modal */}
      <AdminProblemModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveModal}
        initialData={editingProblem}
      />
    </div>
  );
}
