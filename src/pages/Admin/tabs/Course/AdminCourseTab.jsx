import React, { useState, useEffect } from "react";
import AdminCourseList from "./components/AdminCourseList/AdminCourseList";
import AdminCourseModal from "./components/AdminCourseModal/AdminCourseModal";
import { useToast } from "~/context/ToastContext.jsx";
import courseService from "~/services/courseService";

export default function AdminCourseTab() {
  const { toast } = useToast();
  const [courses, setCourses] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const loadCourses = async () => {
    try {
      setIsLoading(true);
      const res = await courseService.getAllCourses();
      setCourses(Array.isArray(res) ? res : []);
    } catch (err) {
      console.error("Lỗi tải khóa học", err);
      toast?.error("Không thể tải danh sách khóa học!", "Lỗi");
      setCourses([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadCourses();
  }, []);

  const handleOpenAddModal = () => {
    setIsModalOpen(true);
  };

  const handleSaveCourse = async (formData) => {
    try {
      await courseService.createCourse(formData);
      toast?.success(`Đã tạo khóa học mới "${formData.title}" thành công!`, "Thành công");
      setIsModalOpen(false);
      await loadCourses();
    } catch (err) {
      toast?.error(`Có lỗi xảy ra: ${err.message || err}`, "Lỗi");
    }
  };

  const handleDeleteCourse = async (courseId) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa khóa học này không?")) {
      try {
        await courseService.deleteCourse(courseId);
        toast?.success("Đã xóa khóa học thành công!", "Xóa khóa học");
        await loadCourses();
      } catch (err) {
        toast?.error(`Lỗi xóa khóa học: ${err.message || err}`, "Lỗi");
      }
    }
  };

  return (
    <div>
      <AdminCourseList
        courses={courses}
        isLoading={isLoading}
        onAddCourse={handleOpenAddModal}
        onDeleteCourse={handleDeleteCourse}
      />

      <AdminCourseModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveCourse}
      />
    </div>
  );
}