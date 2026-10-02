import React, { useState, useEffect } from "react";
import roadmapService from "~/services/roadmapService";
import { useToast } from "~/context/ToastContext.jsx";
import AdminRoadmapList from "./components/AdminRoadmapList/AdminRoadmapList";
import AdminRoadmapModal from "./components/AdminRoadmapModal/AdminRoadmapModal";

export default function AdminRoadmapTab() {
  const { toast } = useToast();
  const [roadmaps, setRoadmaps] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const loadRoadmaps = async () => {
    try {
      setIsLoading(true);
      const data = await roadmapService.getAllRoadmaps();
      setRoadmaps(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Lỗi tải danh sách lộ trình Admin:", err);
      toast.error("Không thể tải danh sách lộ trình!", "Lỗi");
      setRoadmaps([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadRoadmaps();
  }, []);

  const handleOpenAddModal = () => {
    setIsModalOpen(true);
  };

  const handleSaveModal = async (formData) => {
    try {
      await roadmapService.createRoadmap(formData);
      toast.success(`Đã tạo mới lộ trình "${formData.title}"!`, "Thành công");
      setIsModalOpen(false);
      await loadRoadmaps();
    } catch (err) {
      toast.error(`Lỗi lưu lộ trình: ${err.message}`, "Lỗi");
    }
  };

  const handleDeleteRoadmap = async (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa lộ trình này không?")) {
      try {
        await roadmapService.deleteRoadmap(id);
        toast.success("Đã xóa lộ trình thành công!", "Xóa lộ trình");
        await loadRoadmaps();
      } catch (err) {
        toast.error(`Lỗi xóa lộ trình: ${err.message}`, "Lỗi");
      }
    }
  };

  return (
    <div>
      <AdminRoadmapList
        roadmaps={roadmaps}
        isLoading={isLoading}
        onAddRoadmap={handleOpenAddModal}
        onDeleteRoadmap={handleDeleteRoadmap}
      />

      <AdminRoadmapModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveModal}
      />
    </div>
  );
}