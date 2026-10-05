import React, { useState, useEffect, useCallback } from "react";
import roadmapService from "~/services/roadmapService";
import { useToast } from "~/context/ToastContext.jsx";
import AdminRoadmapList from "./components/AdminRoadmapList/AdminRoadmapList";
import AdminRoadmapModal from "./components/AdminRoadmapModal/AdminRoadmapModal";

export default function AdminRoadmapTab() {
  const { toast } = useToast();
  const [roadmaps, setRoadmaps] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingRoadmap, setEditingRoadmap] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const loadRoadmaps = useCallback(async () => {
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
  }, [toast]);

  useEffect(() => {
    loadRoadmaps();
  }, [loadRoadmaps]);

  const handleOpenAddModal = () => {
    setEditingRoadmap(null);
    setIsModalOpen(true);
  };

  const handleEditRoadmap = (rm) => {
    setEditingRoadmap(rm);
    setIsModalOpen(true);
  };

  const handleSaveModal = async (formData) => {
    try {
      if (editingRoadmap) {
        const id = editingRoadmap._id || editingRoadmap.id || editingRoadmap.slug;
        await roadmapService.updateRoadmap(id, formData);
        toast.success(`Đã cập nhật lộ trình "${formData.title}" thành công!`, "Thành công");
      } else {
        await roadmapService.createRoadmap(formData);
        toast.success(`Đã tạo mới lộ trình "${formData.title}"!`, "Thành công");
      }
      setIsModalOpen(false);
      setEditingRoadmap(null);
      await loadRoadmaps();
    } catch (err) {
      toast?.error(err.response?.data?.message || err.message || "Có lỗi xảy ra khi lưu lộ trình", "Lỗi");
    }
  };

  const handleDeleteRoadmap = async (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa lộ trình này không?")) {
      try {
        await roadmapService.deleteRoadmap(id);
        toast.success("Đã xóa lộ trình thành công!", "Xóa lộ trình");
        await loadRoadmaps();
      } catch (err) {
        toast.error(`Lỗi xóa lộ trình: ${err.message || err}`, "Lỗi");
      }
    }
  };

  return (
    <div>
      <AdminRoadmapList
        roadmaps={roadmaps}
        isLoading={isLoading}
        onAddRoadmap={handleOpenAddModal}
        onEditRoadmap={handleEditRoadmap}
        onDeleteRoadmap={handleDeleteRoadmap}
      />

      <AdminRoadmapModal
        isOpen={isModalOpen}
        initialData={editingRoadmap}
        onClose={() => {
          setIsModalOpen(false);
          setEditingRoadmap(null);
        }}
        onSave={handleSaveModal}
      />
    </div>
  );
}