import React, { useState, useEffect, useCallback } from "react";
import AdminCourseList from "./components/AdminCourseList/AdminCourseList";
import AdminCourseModal from "./components/AdminCourseModal/AdminCourseModal";
import { useToast } from "~/context/ToastContext.jsx";
import courseService from "~/services/courseService";

export default function AdminCourseTab() {
  const { toast } = useToast();
  const [courses, setCourses] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const loadCourses = useCallback(async () => {
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
  }, [toast]);

  useEffect(() => {
    loadCourses();
  }, [loadCourses]);

  const handleOpenAddModal = () => {
    setEditingCourse(null);
    setIsModalOpen(true);
  };

  const handleEditCourse = async (course) => {
    try {
      const courseId = course._id || course.id;
      const curriculum = await courseService.getCurriculum(courseId);
      const fullCourseData = {
        ...course,
        chapters: Array.isArray(curriculum)
          ? curriculum.map((ch, cIdx) => ({
              id: ch.chapterId || ch._id || cIdx + 1,
              title: ch.title || `Chương ${cIdx + 1}`,
              order: ch.order || cIdx + 1,
              lessons: Array.isArray(ch.lessons)
                ? ch.lessons.map((ls, lIdx) => ({
                    id: ls.lessonId || ls._id || lIdx + 1,
                    title: ls.title || `Bài học ${lIdx + 1}`,
                    videoUrl: ls.videoUrl || "",
                    duration: ls.duration || 10,
                    description: ls.description || "",
                    isPreview: Boolean(ls.isPreview),
                  }))
                : [],
            }))
          : [],
      };
      setEditingCourse(fullCourseData);
    } catch (err) {
      console.warn("Lỗi tải curriculum khi edit khóa học:", err);
      setEditingCourse(course);
    } finally {
      setIsModalOpen(true);
    }
  };

  const handleSaveCourse = async (formData) => {
    try {
      if (editingCourse) {
        const id = editingCourse._id || editingCourse.id;
        await courseService.updateCourse(id, formData);
        toast?.success(`Đã cập nhật khóa học "${formData.title}" thành công!`, "Thành công");
      } else {
        await courseService.createCourse(formData);
        toast?.success(`Đã tạo khóa học mới "${formData.title}" thành công!`, "Thành công");
      }
      setIsModalOpen(false);
      setEditingCourse(null);
      await loadCourses();
    } catch (err) {
      toast?.error(err.response?.data?.message || err.message || "Có lỗi xảy ra khi lưu khóa học", "Lỗi");
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
        onEditCourse={handleEditCourse}
        onDeleteCourse={handleDeleteCourse}
      />

      <AdminCourseModal
        isOpen={isModalOpen}
        initialData={editingCourse}
        onClose={() => {
          setIsModalOpen(false);
          setEditingCourse(null);
        }}
        onSave={handleSaveCourse}
      />
    </div>
  );
}