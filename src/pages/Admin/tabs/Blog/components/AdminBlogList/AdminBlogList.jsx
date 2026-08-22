import React, { useState } from "react";
import Icon from "~/components/Icon/Icon";
import { Button, Badge, Pagination, DropdownMenu } from "~/components/ui";
import { useToast } from "~/context/ToastContext.jsx";
import useScrollReveal from "~/hooks/useScrollReveal";
import {
  BLOG_CATEGORY_OPTIONS,
  BLOG_AUTHOR_OPTIONS,
  BLOG_STATUS_OPTIONS,
  BLOG_DATE_OPTIONS,
} from "~/constants/mockAdminBlog";
import styles from "./AdminBlogList.module.css";

export default function AdminBlogList({ blogs = [], onSelectBlog, onAddBlog, onDeleteBlog }) {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [authorFilter, setAuthorFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("all");
  const [selectedIds, setSelectedIds] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useScrollReveal(".reveal-card", [blogs, currentPage, categoryFilter, authorFilter, statusFilter, dateFilter]);

  // Filter logic
  const filteredBlogs = blogs.filter((blog) => {
    const matchesSearch =
      blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      blog.slug.toLowerCase().includes(searchTerm.toLowerCase()) ||
      blog.author.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory = categoryFilter === "all" || blog.category === categoryFilter;
    const matchesAuthor = authorFilter === "all" || blog.author === authorFilter;
    const matchesStatus = statusFilter === "all" || blog.status === statusFilter;

    return matchesSearch && matchesCategory && matchesAuthor && matchesStatus;
  });

  // Pagination calculation
  const totalPages = Math.ceil(filteredBlogs.length / itemsPerPage) || 1;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentBlogs = filteredBlogs.slice(startIndex, startIndex + itemsPerPage);

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedIds(currentBlogs.map((b) => b.id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleToggleSelect = (id) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter((item) => item !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  const handleDeleteItem = (e, blog) => {
    e.stopPropagation();
    if (onDeleteBlog) {
      onDeleteBlog(blog.id);
      toast.success(`Đã xóa bài viết "${blog.title}"`, "Thành công");
    }
  };

  const getStatusVariant = (status) => {
    if (status === "Published") return "success";
    if (status === "Draft") return "warning";
    return "secondary";
  };

  return (
    <div className={styles.container}>
      {/* 1. Header Banner */}
      <div className={`${styles.header_banner} reveal-card`}>
        <div className={styles.banner_text}>
          <h2 className={styles.banner_title}>Blog Management</h2>
          <p className={styles.banner_subtitle}>Soạn thảo, quản lý bài viết tin tức, hướng dẫn kỹ thuật và truyền thông FySet</p>
        </div>
        <Button variant="primary" onClick={onAddBlog} className={styles.add_btn}>
          <Icon name="Plus" size={18} />
          <span>Create Blog</span>
        </Button>
      </div>

      {/* 2. Toolbar */}
      <div className={`${styles.toolbar} reveal-card`}>
        <div className={styles.search_wrapper}>
          <Icon name="Search" size={16} className={styles.search_icon} />
          <input
            type="text"
            placeholder="Search blog..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={styles.search_input}
          />
        </div>

        <div className={styles.filter_group}>
          <DropdownMenu
            options={BLOG_CATEGORY_OPTIONS}
            value={categoryFilter}
            onChange={setCategoryFilter}
            size="sm"
          />
          <DropdownMenu
            options={BLOG_AUTHOR_OPTIONS}
            value={authorFilter}
            onChange={setAuthorFilter}
            size="sm"
          />
          <DropdownMenu
            options={BLOG_STATUS_OPTIONS}
            value={statusFilter}
            onChange={setStatusFilter}
            size="sm"
          />
          <DropdownMenu
            options={BLOG_DATE_OPTIONS}
            value={dateFilter}
            onChange={setDateFilter}
            size="sm"
          />
        </div>
      </div>

      {/* 3. Table */}
      <div className={`${styles.table_wrapper} reveal-card`}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th style={{ width: 40 }}>
                <input
                  type="checkbox"
                  className={styles.checkbox}
                  checked={currentBlogs.length > 0 && selectedIds.length === currentBlogs.length}
                  onChange={handleSelectAll}
                />
              </th>
              <th>Cover</th>
              <th>Title</th>
              <th>Author</th>
              <th>Category</th>
              <th>Views</th>
              <th>Status</th>
              <th style={{ textAlign: "right" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentBlogs.length === 0 ? (
              <tr>
                <td colSpan={8} className={styles.empty_td}>
                  Không tìm thấy bài viết nào phù hợp với bộ lọc.
                </td>
              </tr>
            ) : (
              currentBlogs.map((blog) => {
                const isSelected = selectedIds.includes(blog.id);
                return (
                  <tr
                    key={blog.id}
                    className={isSelected ? styles.row_selected : ""}
                    onClick={() => onSelectBlog(blog)}
                    style={{ cursor: "pointer" }}
                  >
                    <td onClick={(e) => e.stopPropagation()}>
                      <input
                        type="checkbox"
                        className={styles.checkbox}
                        checked={isSelected}
                        onChange={() => handleToggleSelect(blog.id)}
                      />
                    </td>
                    <td>
                      <img src={blog.cover} alt={blog.title} className={styles.cover_thumb} />
                    </td>
                    <td>
                      <div className={styles.title_box}>
                        <span className={styles.blog_title}>{blog.title}</span>
                        <span className={styles.slug_text}>/{blog.slug}</span>
                      </div>
                    </td>
                    <td><span style={{ fontWeight: 700 }}>{blog.author}</span></td>
                    <td>
                      <Badge variant="primary" size="sm">
                        {blog.category}
                      </Badge>
                    </td>
                    <td>
                      <span className={styles.views_count}>
                        <Icon name="Eye" size={14} />
                        {(blog.stats?.views || 0).toLocaleString()}
                      </span>
                    </td>
                    <td>
                      <Badge variant={getStatusVariant(blog.status)} size="sm">
                        {blog.status}
                      </Badge>
                    </td>
                    <td onClick={(e) => e.stopPropagation()}>
                      <div className={styles.action_row}>
                        <button
                          type="button"
                          className={styles.action_btn}
                          title="Soạn thảo / Chỉnh sửa"
                          onClick={() => onSelectBlog(blog)}
                        >
                          <Icon name="Edit3" size={15} />
                        </button>
                        <button
                          type="button"
                          className={`${styles.action_btn} ${styles.action_danger}`}
                          title="Xóa bài viết"
                          onClick={(e) => handleDeleteItem(e, blog)}
                        >
                          <Icon name="Trash2" size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* 4. Pagination Bar */}
      <div className={`${styles.pagination_bar} reveal-card`}>
        <span className={styles.page_info}>
          Showing {filteredBlogs.length > 0 ? startIndex + 1 : 0} to{" "}
          {Math.min(startIndex + itemsPerPage, filteredBlogs.length)} of {filteredBlogs.length} blogs
        </span>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
}
