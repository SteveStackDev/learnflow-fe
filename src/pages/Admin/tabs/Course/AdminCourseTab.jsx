import React, { useState } from "react";
import AdminCourseList from "./components/AdminCourseList/AdminCourseList";
import AdminCourseDetail from "./components/AdminCourseDetail/AdminCourseDetail";
import AdminCourseModal from "./components/AdminCourseModal/AdminCourseModal";
import { useToast } from "~/context/ToastContext.jsx";

const INITIAL_COURSES = [
  {
    id: "course-1",
    title: "React Fundamentals",
    description: "Khóa học nền tảng ReactJS từ cơ bản đến nâng cao cho người mới bắt đầu.",
    category: "Lập trình Web",
    level: "Basic",
    lessons: 24,
    students: 2421,
    status: "Active",
    thumbnail: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=300&auto=format&fit=crop&q=80",
  },
  {
    id: "course-2",
    title: "Node.js Backend & API Design",
    description: "Xây dựng RESTful API chuyên nghiệp với Node.js, Express và MongoDB.",
    category: "Backend Development",
    level: "Medium",
    lessons: 32,
    students: 1820,
    status: "Draft",
    thumbnail: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=300&auto=format&fit=crop&q=80",
  },
  {
    id: "course-3",
    title: "Python Data Science & AI",
    description: "Phân tích dữ liệu và học máy cơ bản với Python, Pandas và Scikit-Learn.",
    category: "Data Science & AI",
    level: "Advanced",
    lessons: 41,
    students: 1203,
    status: "Active",
    thumbnail: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=300&auto=format&fit=crop&q=80",
  },
];

export default function AdminCourseTab() {
  const { toast } = useToast();
  const [courses, setCourses] = useState(INITIAL_COURSES);
  const [selectedCourseId, setSelectedCourseId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);

  const selectedCourse = courses.find((c) => c.id === selectedCourseId);

  // Handlers
  const handleOpenAddModal = () => {
    setEditingCourse(null);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (course) => {
    setEditingCourse(course);
    setIsModalOpen(true);
  };

  const handleSaveCourse = (formData) => {
    if (editingCourse) {
      setCourses((prev) =>
        prev.map((c) => (c.id === editingCourse.id ? { ...c, ...formData } : c))
      );
      toast.success(`Đã cập nhật thông tin khóa học "${formData.title}"!`, "Thành công");
    } else {
      const newCourse = {
        id: `course-${Date.now()}`,
        lessons: 12,
        students: 0,
        ...formData,
      };
      setCourses([newCourse, ...courses]);
      toast.success(`Đã tạo khóa học mới "${formData.title}" thành công!`, "Thành công");
    }
    setIsModalOpen(false);
  };

  const handleDuplicateCourse = (course) => {
    const duplicated = {
      ...course,
      id: `course-${Date.now()}`,
      title: `${course.title} (Bản sao)`,
      status: "Draft",
      students: 0,
    };
    setCourses([duplicated, ...courses]);
    toast.info(`Đã nhân bản khóa học thành "${duplicated.title}"`, "Nhân bản thành công");
  };

  const handleToggleStatus = (courseId) => {
    setCourses((prev) =>
      prev.map((c) => {
        if (c.id === courseId) {
          const nextStatus = c.status === "Active" ? "Draft" : "Active";
          toast.success(
            `Đã chuyển trạng thái khóa học sang "${nextStatus}"`,
            "Cập nhật trạng thái"
          );
          return { ...c, status: nextStatus };
        }
        return c;
      })
    );
  };

  const handleDeleteCourse = (courseId) => {
    const target = courses.find((c) => c.id === courseId);
    setCourses((prev) => prev.filter((c) => c.id !== courseId));
    toast.error(`Đã xóa khóa học "${target?.title || courseId}"`, "Xóa khóa học");
    if (selectedCourseId === courseId) {
      setSelectedCourseId(null);
    }
  };

  return (
    <div>
      {selectedCourseId ? (
        <AdminCourseDetail
          course={selectedCourse}
          onBack={() => setSelectedCourseId(null)}
        />
      ) : (
        <AdminCourseList
          courses={courses}
          onAddCourse={handleOpenAddModal}
          onViewCourse={(id) => setSelectedCourseId(id)}
          onEditCourse={handleOpenEditModal}
          onDuplicateCourse={handleDuplicateCourse}
          onToggleStatus={handleToggleStatus}
          onDeleteCourse={handleDeleteCourse}
        />
      )}

      {/* Add / Edit Course Modal */}
      <AdminCourseModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveCourse}
        initialData={editingCourse}
      />
    </div>
  );
}
