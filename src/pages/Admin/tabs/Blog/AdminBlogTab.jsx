import React, { useState } from "react";
import AdminBlogList from "./components/AdminBlogList/AdminBlogList";
import AdminBlogDetail from "./components/AdminBlogDetail/AdminBlogDetail";
import AdminBlogModal from "./components/AdminBlogModal/AdminBlogModal";
import { INITIAL_BLOGS } from "~/constants/mockAdminBlog";
import { useToast } from "~/context/ToastContext.jsx";

export default function AdminBlogTab() {
  const { toast } = useToast();
  const [blogs, setBlogs] = useState(INITIAL_BLOGS);
  const [selectedBlog, setSelectedBlog] = useState(null); // null = List View, Object = Detail View
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddBlog = () => {
    setIsModalOpen(true);
  };

  const handleSaveModal = (formData) => {
    const newBlog = {
      id: `blog-${Date.now()}`,
      ...formData,
      date: "Hôm nay",
      stats: {
        views: 0,
        likes: 0,
        comments: 0,
        shares: 0,
        readingTime: "5 phút",
      },
    };
    setBlogs([newBlog, ...blogs]);
    toast.success(`Đã tạo bài viết mới "${formData.title}"`, "Thành công");
  };

  const handleSaveDetail = (updatedBlog) => {
    setBlogs(blogs.map((b) => (b.id === updatedBlog.id ? updatedBlog : b)));
    setSelectedBlog(updatedBlog);
  };

  const handleDeleteBlog = (id) => {
    setBlogs(blogs.filter((b) => b.id !== id));
    if (selectedBlog && selectedBlog.id === id) {
      setSelectedBlog(null);
    }
  };

  return (
    <>
      {selectedBlog ? (
        <AdminBlogDetail
          blog={selectedBlog}
          onBack={() => setSelectedBlog(null)}
          onSave={handleSaveDetail}
        />
      ) : (
        <AdminBlogList
          blogs={blogs}
          onSelectBlog={setSelectedBlog}
          onAddBlog={handleAddBlog}
          onDeleteBlog={handleDeleteBlog}
        />
      )}

      <AdminBlogModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveModal}
      />
    </>
  );
}
