import React, { useState, useEffect } from "react";
import { problemService } from "~/services/problemService";
import { useToast } from "~/context/ToastContext.jsx";
import AdminProblemList from "./components/AdminProblemList/AdminProblemList";
import AdminProblemModal from "./components/AdminProblemModal/AdminProblemModal";

export default function AdminProblemTab() {
  const { toast } = useToast();
  const [problems, setProblems] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
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

  // Quick Modal Add / Edit
  const handleOpenAddModal = () => {
    setIsModalOpen(true);
  };

  const handleSaveModal = async (formData) => {
    try {
      await problemService.createProblem(formData);
      toast.success(`Đã tạo mới bài tập "${formData.title}" vào cơ sở dữ liệu!`, "Thành công");
      setIsModalOpen(false);
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
        onAddProblem={handleOpenAddModal}
        onDeleteProblem={handleDeleteProblem}
      />

      {/* Quick Modal */}
      <AdminProblemModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveModal}
      />
    </div>
  );
}
