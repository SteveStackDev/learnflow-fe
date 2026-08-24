import React, { useState, useEffect } from "react";
import Icon from "~/components/Icon/Icon";
import { Button, Badge, Pagination, DropdownMenu } from "~/components/ui";
import useScrollReveal from "~/hooks/useScrollReveal";
import styles from "./AdminCourseList.module.css";

const CATEGORY_OPTIONS = [
  { value: "all", label: "Category: Tất cả" },
  { value: "Lập trình Web", label: "Lập trình Web" },
  { value: "Backend Development", label: "Backend Development" },
  { value: "Data Science & AI", label: "Data Science & AI" },
  { value: "Lập trình Mobile", label: "Lập trình Mobile" },
];

const LEVEL_OPTIONS = [
  { value: "all", label: "Level: Tất cả" },
  { value: "Basic", label: "Basic (Cơ bản)" },
  { value: "Medium", label: "Medium (Trung cấp)" },
  { value: "Advanced", label: "Advanced (Nâng cao)" },
];

const STATUS_OPTIONS = [
  { value: "all", label: "Status: Tất cả" },
  { value: "Active", label: "Active" },
  { value: "Draft", label: "Draft" },
  { value: "Archived", label: "Archived" },
];

const SORT_OPTIONS = [
  { value: "newest", label: "Sort: Mới nhất" },
  { value: "students", label: "Sort: Nhiều học viên" },
  { value: "lessons", label: "Sort: Nhiều bài học" },
];

const ITEMS_PER_PAGE = 4;

export default function AdminCourseList({
  courses = [],
  onAddCourse,
  onViewCourse,
  onEditCourse,
  onDuplicateCourse,
  onToggleStatus,
  onDeleteCourse,
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [levelFilter, setLevelFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortOrder, setSortOrder] = useState("newest");
  const [selectedIds, setSelectedIds] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  // Filter & Search Logic
  const filteredCourses = courses
    .filter((c) => {
      const matchSearch = c.title.toLowerCase().includes(searchTerm.toLowerCase());
      const matchCategory = categoryFilter === "all" || c.category === categoryFilter;
      const matchLevel = levelFilter === "all" || c.level === levelFilter;
      const matchStatus = statusFilter === "all" || c.status === statusFilter;
      return matchSearch && matchCategory && matchLevel && matchStatus;
    })
    .sort((a, b) => {
      if (sortOrder === "students") return (b.students || 0) - (a.students || 0);
      if (sortOrder === "lessons") return (b.lessons || 0) - (a.lessons || 0);
      return b.id.localeCompare(a.id);
    });

  // Calculate Pagination Slicing
  const totalPages = Math.max(Math.ceil(filteredCourses.length / ITEMS_PER_PAGE), 1);
  const activePage = Math.min(currentPage, totalPages);
  const startIndex = (activePage - 1) * ITEMS_PER_PAGE;
  const paginatedCourses = filteredCourses.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  // Trigger ScrollReveal hook on page/filter change
  useScrollReveal(".reveal-card", [activePage, searchTerm, categoryFilter, levelFilter, statusFilter, sortOrder]);

  // Reset to page 1 whenever search or filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, categoryFilter, levelFilter, statusFilter, sortOrder]);

  const toggleSelectAll = () => {
    if (selectedIds.length === filteredCourses.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filteredCourses.map((c) => c.id));
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
    if (level === "Basic") return "success";
    if (level === "Medium") return "warning";
    return "danger";
  };

  const getStatusBadgeVariant = (status) => {
    if (status === "Active") return "success";
    if (status === "Draft") return "warning";
    return "secondary";
  };

  return (
    <div className={styles.container}>
      {/* 1. Header Banner */}
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

      {/* 2. Toolbar */}
      <div className={`${styles.toolbar} reveal-card`}>
        <div className={styles.search_wrapper}>
          <Icon name="Search" size={16} className={styles.search_icon} />
          <input
            type="text"
            placeholder="Search course title..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={styles.search_input}
          />
        </div>

        <div className={styles.filter_group}>
          <DropdownMenu
            options={CATEGORY_OPTIONS}
            value={categoryFilter}
            onChange={setCategoryFilter}
            size="sm"
          />
          <DropdownMenu
            options={LEVEL_OPTIONS}
            value={levelFilter}
            onChange={setLevelFilter}
            size="sm"
          />
          <DropdownMenu
            options={STATUS_OPTIONS}
            value={statusFilter}
            onChange={setStatusFilter}
            size="sm"
          />
          <DropdownMenu
            options={SORT_OPTIONS}
            value={sortOrder}
            onChange={setSortOrder}
            size="sm"
          />
        </div>
      </div>

      {/* 3. Table Wrapper */}
      <div className={`${styles.table_wrapper} reveal-card`}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th style={{ width: "40px" }}>
                <input
                  type="checkbox"
                  checked={
                    filteredCourses.length > 0 &&
                    selectedIds.length === filteredCourses.length
                  }
                  onChange={toggleSelectAll}
                  className={styles.checkbox}
                />
              </th>
              <th>Course Title</th>
              <th>Category</th>
              <th>Level</th>
              <th>Lessons</th>
              <th>Students</th>
              <th>Status</th>
              <th style={{ textAlign: "right" }}>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {paginatedCourses.length > 0 ? (
              paginatedCourses.map((course) => {
                const isSelected = selectedIds.includes(course.id);
                return (
                  <tr key={course.id} className={`${isSelected ? styles.row_selected : ""} reveal-card`}>
                    <td>
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => toggleSelectOne(course.id)}
                        className={styles.checkbox}
                      />
                    </td>
                    <td>
                      <div
                        className={styles.course_meta}
                        onClick={() => onViewCourse(course.id)}
                        role="button"
                        tabIndex={0}
                      >
                        <img
                          src={course.thumbnail}
                          alt={course.title}
                          className={styles.thumbnail}
                        />
                        <div className={styles.title_box}>
                          <span className={styles.course_title}>{course.title}</span>
                          <span className={styles.course_desc_preview}>{course.description}</span>
                        </div>
                      </div>
                    </td>
                    <td>
                      <Badge variant="primary" size="sm">
                        {course.category}
                      </Badge>
                    </td>
                    <td>
                      <Badge variant={getLevelBadgeVariant(course.level)} size="sm">
                        {course.level}
                      </Badge>
                    </td>
                    <td>
                      <span className={styles.num_text}>{course.lessons} bài</span>
                    </td>
                    <td>
                      <span className={styles.num_text}>
                        {typeof course.students === "number"
                          ? course.students.toLocaleString()
                          : course.students}
                      </span>
                    </td>
                    <td>
                      <Badge variant={getStatusBadgeVariant(course.status)} size="sm">
                        {course.status}
                      </Badge>
                    </td>
                    <td>
                      <div className={styles.action_row}>
                        <button
                          type="button"
                          className={styles.action_btn}
                          onClick={() => onViewCourse(course.id)}
                          title="View Course Details"
                        >
                          <Icon name="Eye" size={16} />
                        </button>
                        <button
                          type="button"
                          className={styles.action_btn}
                          onClick={() => onEditCourse(course)}
                          title="Edit Course"
                        >
                          <Icon name="Edit" size={16} />
                        </button>
                        <button
                          type="button"
                          className={styles.action_btn}
                          onClick={() => onDuplicateCourse(course)}
                          title="Duplicate Course"
                        >
                          <Icon name="Share" size={16} />
                        </button>
                        <button
                          type="button"
                          className={`${styles.action_btn} ${styles.action_toggle}`}
                          onClick={() => onToggleStatus(course.id)}
                          title={course.status === "Active" ? "Unpublish" : "Publish"}
                        >
                          <Icon
                            name={course.status === "Active" ? "EyeOff" : "CheckCircle2"}
                            size={16}
                          />
                        </button>
                        <button
                          type="button"
                          className={`${styles.action_btn} ${styles.action_danger}`}
                          onClick={() => onDeleteCourse(course.id)}
                          title="Delete Course"
                        >
                          <Icon name="Trash2" size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={8} className={styles.empty_td}>
                  Không tìm thấy khóa học nào khớp với bộ lọc.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* 4. Pagination */}
      <div className={`${styles.pagination_bar} reveal-card`}>
        <span className={styles.page_info}>
          {filteredCourses.length > 0
            ? `Hiển thị ${startIndex + 1} - ${Math.min(
                startIndex + ITEMS_PER_PAGE,
                filteredCourses.length
              )} trên tổng số ${filteredCourses.length} khóa học`
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
