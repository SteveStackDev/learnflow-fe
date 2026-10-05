import React, { useState, useEffect, useMemo } from "react";
import Icon from "~/components/Icon/Icon";
import { Button, Badge, Pagination, DropdownMenu } from "~/components/ui";
import useScrollReveal from "~/hooks/useScrollReveal";
import styles from "./AdminCourseList.module.css";

// Đồng bộ danh mục và các option Sort giống trang Course Client
const CATEGORY_OPTIONS = [
  { value: "Tất cả", label: "Category: Tất cả" },
  { value: "Frontend", label: "Frontend" },
  { value: "Backend", label: "Backend" },
  { value: "Competitive Programming", label: "Competitive Programming" },
];

const SORT_OPTIONS = [
  { value: "popular", label: "Sắp xếp: Phổ biến nhất" },
  { value: "latest", label: "Sắp xếp: Mới nhất" },
  { value: "rating", label: "Sắp xếp: Đánh giá cao nhất" },
];

const ITEMS_PER_PAGE = 4;

export default function AdminCourseList({
  courses = [],
  isLoading,
  onAddCourse,
  onEditCourse,
  onDeleteCourse,
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Tất cả");
  const [selectedSort, setSelectedSort] = useState("popular");
  const [selectedIds, setSelectedIds] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  // Logic Lọc & Sắp Xếp giống hệt trang Client Course
  const filteredAndSortedCourses = useMemo(() => {
    return (courses || [])
      .filter((item) => {
        const title = (item.title || "").toLowerCase();
        const description = (item.description || "").toLowerCase();
        const query = (searchTerm || "").toLowerCase();
        const matchesSearch = title.includes(query) || description.includes(query);

        let matchesCategory = true;
        if (selectedCategory === "Frontend") {
          matchesCategory = item.category?.toLowerCase() === "frontend";
        } else if (selectedCategory === "Backend") {
          matchesCategory = item.category?.toLowerCase() === "backend";
        } else if (selectedCategory === "Competitive Programming") {
          matchesCategory = item.category?.toLowerCase() === "competitive programming";
        }

        return matchesSearch && matchesCategory;
      })
      .sort((a, b) => {
        if (selectedSort === "latest") {
          return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
        }
        if (selectedSort === "rating") {
          const ratingA = a.rating ?? a.stats?.rating ?? 0;
          const ratingB = b.rating ?? b.stats?.rating ?? 0;
          return ratingB - ratingA;
        }
        // Mặc định: Phổ biến nhất (xếp theo số lượng học viên)
        const studentsA = a.studentsCount ?? a.studentsNum ?? a.stats?.learners ?? 0;
        const studentsB = b.studentsCount ?? b.studentsNum ?? b.stats?.learners ?? 0;
        return studentsB - studentsA;
      });
  }, [courses, searchTerm, selectedCategory, selectedSort]);

  // Slicing cho Phân trang
  const totalPages = Math.max(1, Math.ceil(filteredAndSortedCourses.length / ITEMS_PER_PAGE));
  const activePage = Math.min(currentPage, totalPages);
  const startIndex = (activePage - 1) * ITEMS_PER_PAGE;
  const paginatedCourses = filteredAndSortedCourses.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  // ScrollReveal hiệu ứng mượt mà
  useScrollReveal(".reveal-card", [activePage, searchTerm, selectedCategory, selectedSort]);

  // Reset trang về 1 khi search/filter thay đổi
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedCategory, selectedSort]);

  const toggleSelectAll = () => {
    if (selectedIds.length === filteredAndSortedCourses.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filteredAndSortedCourses.map((c) => c._id || c.id));
    }
  };

  const toggleSelectOne = (id) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter((item) => item !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  const getLevelBadgeVariant = (level) => {
    const lvl = String(level || "").toLowerCase();
    if (lvl === "beginner" || lvl === "cơ bản") return "success";
    if (lvl === "intermediate" || lvl === "trung cấp") return "warning";
    return "danger";
  };

  return (
    <div className={styles.container}>
      {/* Banner Header */}
      <div className={`${styles.header_banner} reveal-card`}>
        <div className={styles.banner_text}>
          <h2 className={styles.banner_title}>Course Management</h2>
          <p className={styles.banner_subtitle}>Quản lý toàn bộ khóa học của FySet</p>
        </div>
        <Button variant="primary" onClick={onAddCourse} className={styles.add_btn}>
          <Icon name="Plus" size={18} />
          <span>Add Course</span>
        </Button>
      </div>

      {/* Toolbar Search & Filter (Category + Sort) */}
      <div className={`${styles.toolbar} reveal-card`}>
        <div className={styles.search_wrapper}>
          <Icon name="Search" size={16} className={styles.search_icon} />
          <input
            type="text"
            placeholder="Search course title or description..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={styles.search_input}
          />
        </div>

        <div className={styles.filter_group}>
          <DropdownMenu
            options={CATEGORY_OPTIONS}
            value={selectedCategory}
            onChange={setSelectedCategory}
            size="sm"
          />
          <DropdownMenu
            options={SORT_OPTIONS}
            value={selectedSort}
            onChange={setSelectedSort}
            size="sm"
          />
        </div>
      </div>

      {/* Table danh sách Course */}
      <div className={`${styles.table_wrapper} reveal-card`}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th style={{ width: "40px" }}>
                <input
                  type="checkbox"
                  checked={
                    filteredAndSortedCourses.length > 0 &&
                    selectedIds.length === filteredAndSortedCourses.length
                  }
                  onChange={toggleSelectAll}
                  className={styles.checkbox}
                />
              </th>
              <th>Course Title</th>
              <th>Category</th>
              <th>Level</th>
              <th>Tổng bài (Lessons)</th>
              <th>Học viên (Students)</th>
              <th style={{ textAlign: "right" }}>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={7} className={styles.empty_td}>
                  Đang tải danh sách khóa học...
                </td>
              </tr>
            ) : paginatedCourses.length > 0 ? (
              paginatedCourses.map((course) => {
                const courseId = course._id || course.id;
                const isSelected = selectedIds.includes(courseId);
                const lessonsCount = course.lessonsCount ?? course.stats?.lessons ?? 0;
                const studentsCount = course.studentsCount ?? course.studentsNum ?? course.stats?.learners ?? 0;

                return (
                  <tr
                    key={courseId}
                    className={`${isSelected ? styles.row_selected : ""} reveal-card`}
                    style={{ cursor: "pointer" }}
                    onClick={(e) => {
                      if (e.target.closest("input") || e.target.closest("button")) return;
                      if (onEditCourse) onEditCourse(course);
                    }}
                  >
                    <td>
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => toggleSelectOne(courseId)}
                        className={styles.checkbox}
                      />
                    </td>
                    <td>
                      <div
                        className={styles.course_meta}
                        onClick={() => onEditCourse && onEditCourse(course)}
                        title="Bấm để chỉnh sửa khóa học này"
                      >
                        <img
                          src={course.thumbnail || course.imageUrl || "https://placehold.co/600x400/1a1d24/fff?text=Course"}
                          alt={course.title}
                          className={styles.thumbnail}
                        />
                        <div className={styles.title_box} style={{ maxWidth: "260px" }}>
                          <span className={styles.course_title}>{course.title}</span>
                          <span
                            className={styles.course_desc_preview}
                            style={{
                              whiteSpace: "nowrap",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              display: "block",
                            }}
                          >
                            {course.description}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td>
                      <Badge variant="primary" size="sm">
                        {course.category || "General"}
                      </Badge>
                    </td>
                    <td>
                      <Badge variant={getLevelBadgeVariant(course.level)} size="sm">
                        {course.level || "Beginner"}
                      </Badge>
                    </td>
                    <td>
                      <span className={styles.num_text}>{lessonsCount} bài</span>
                    </td>
                    <td>
                      <span className={styles.num_text}>{studentsCount}</span>
                    </td>
                    <td>
                      <div className={styles.action_row}>
                        <button
                          type="button"
                          className={styles.action_btn}
                          onClick={(e) => {
                            e.stopPropagation();
                            if (onEditCourse) onEditCourse(course);
                          }}
                          title="Chỉnh sửa khóa học"
                        >
                          <Icon name="Edit3" size={15} />
                        </button>
                        <button
                          type="button"
                          className={`${styles.action_btn} ${styles.action_danger}`}
                          onClick={(e) => {
                            e.stopPropagation();
                            onDeleteCourse(courseId);
                          }}
                          title="Xóa khóa học"
                        >
                          <Icon name="Trash2" size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={7} className={styles.empty_td}>
                  Không tìm thấy khóa học nào khớp với bộ lọc.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      <div className={`${styles.pagination_bar} reveal-card`}>
        <span className={styles.page_info}>
          {filteredAndSortedCourses.length > 0
            ? `Hiển thị ${startIndex + 1} - ${Math.min(
                startIndex + ITEMS_PER_PAGE,
                filteredAndSortedCourses.length
              )} trên tổng số ${filteredAndSortedCourses.length} khóa học`
            : "Hiển thị 0 khóa học"}
        </span>
        <Pagination
          currentPage={activePage}
          totalPages={totalPages}
          onPageChange={(p) => setCurrentPage(p)}
        />
      </div>
    </div>
  );
}