import React, { useState, useEffect } from "react";
import { problemService } from "~/services/problemService";
import { useToast } from "~/context/ToastContext.jsx";
import AdminProblemList from "./components/AdminProblemList/AdminProblemList";
import AdminProblemModal from "./components/AdminProblemModal/AdminProblemModal";

export default function AdminProblemTab() {
  const { toast } = useToast();
  const [problems, setProblems] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProblem, setEditingProblem] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isFetchingDetail, setIsFetchingDetail] = useState(false);

  // Load danh sách bài tập từ Backend
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

  // Quick Modal: Thêm mới bài tập
  const handleOpenAddModal = () => {
    setEditingProblem(null);
    setIsModalOpen(true);
  };

  // Quick Modal: Chỉnh sửa bài tập hiện có
  const handleEditProblem = async (problem) => {
    if (!problem) return;
    try {
      setIsFetchingDetail(true);
      const targetId = problem._id || problem.id;
      // Tải chi tiết bài tập đầy đủ (bao gồm subtasks, examples, và test cases từ ProblemTestCase)
      const fullDetail = await problemService.getProblemById(targetId);
      setEditingProblem(fullDetail || problem);
      setIsModalOpen(true);
    } catch (err) {
      console.warn("Lỗi tải chi tiết bài tập để sửa:", err);
      setEditingProblem(problem);
      setIsModalOpen(true);
    } finally {
      setIsFetchingDetail(false);
    }
  };

  const handleSaveModal = async (formData) => {
    try {
      if (editingProblem) {
        const targetId = editingProblem._id || editingProblem.id;
        await problemService.updateProblem(targetId, formData);
        toast.success(`Đã cập nhật bài tập "${formData.title}" thành công!`, "Thành công");
      } else {
        await problemService.createProblem(formData);
        toast.success(`Đã tạo mới bài tập "${formData.title}" vào cơ sở dữ liệu!`, "Thành công");
      }
      setIsModalOpen(false);
      setEditingProblem(null);
      await loadProblems();
    } catch (err) {
      toast.error(`Lỗi lưu bài tập: ${err.message}`, "Lỗi lưu dữ liệu");
    }
  };

  // Delete Problem
  const handleDeleteProblem = async (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa bài tập thuật toán này khỏi cơ sở dữ liệu không?")) {
      try {
        await problemService.deleteProblem(id);
        toast.success("Đã xóa bài tập thành công!", "Xóa bài tập");
        await loadProblems();
      } catch (err) {
        toast.error(`Lỗi xóa bài tập: ${err.message}`, "Lỗi");
      }
    }
  };

  return (
    <div>
      <AdminProblemList
        problems={problems}
        isLoading={isLoading}
        isFetchingDetail={isFetchingDetail}
        onAddProblem={handleOpenAddModal}
        onEditProblem={handleEditProblem}
        onDeleteProblem={handleDeleteProblem}
      />

      {/* Quick Modal: Add / Edit Problem */}
      <AdminProblemModal
        isOpen={isModalOpen}
        initialData={editingProblem}
        onClose={() => {
          setIsModalOpen(false);
          setEditingProblem(null);
        }}
        onSave={handleSaveModal}
      />
    </div>
  );
}
