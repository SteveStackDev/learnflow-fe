import React, { useState, useEffect, useMemo } from "react";
import Icon from "~/components/Icon/Icon";
import { Button, Badge, Pagination, DropdownMenu } from "~/components/ui";
import useScrollReveal from "~/hooks/useScrollReveal";
import styles from "../../../Course/components/AdminCourseList/AdminCourseList.module.css";

const LEVEL_OPTIONS = [
  { value: "all", label: "Trình độ: Tất cả" },
  { value: "beginner", label: "Beginner (Người mới)" },
  { value: "intermediate", label: "Intermediate (Trung cấp)" },
  { value: "advanced", label: "Advanced (Nâng cao)" },
];

const SORT_OPTIONS = [
  { value: "newest", label: "Sắp xếp: Mới nhất" },
  { value: "oldest", label: "Sắp xếp: Cũ nhất" },
  { value: "duration_desc", label: "Sắp xếp: Thời gian dài nhất" },
];

const ITEMS_PER_PAGE = 4;

export default function AdminRoadmapList({
  roadmaps = [],
  isLoading,
  onAddRoadmap,
  onEditRoadmap,
  onDeleteRoadmap,
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLevel, setSelectedLevel] = useState("all");
  const [selectedSort, setSelectedSort] = useState("newest");
  const [selectedIds, setSelectedIds] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  // Logic Tìm kiếm, Lọc & Sắp xếp chính xác
  const filteredAndSortedRoadmaps = useMemo(() => {
    return (roadmaps || [])
      .filter((rm) => {
        const query = (searchTerm || "").toLowerCase().trim();
        const title = (rm.title || "").toLowerCase();
        const description = (rm.description || "").toLowerCase();

        // Kiểm tra khớp từ khóa trong tags
        const rawTags = Array.isArray(rm.tags) ? rm.tags : [];
        const matchesTag = rawTags.some((t) =>
          (typeof t === "string" ? t : t.name || "").toLowerCase().includes(query)
        );

        const matchesSearch = !query || title.includes(query) || description.includes(query) || matchesTag;

        // Kiểm tra khớp Level
        let matchesLevel = true;
        if (selectedLevel !== "all") {
          const lvl = (rm.level || "").toLowerCase();
          matchesLevel = lvl === selectedLevel.toLowerCase();
        }

        return matchesSearch && matchesLevel;
      })
      .sort((a, b) => {
        if (selectedSort === "oldest") {
          return new Date(a.createdAt || 0) - new Date(b.createdAt || 0);
        }
        if (selectedSort === "duration_desc") {
          return (b.duration || 0) - (a.duration || 0);
        }
        // Mặc định: Mới nhất
        return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
      });
  }, [roadmaps, searchTerm, selectedLevel, selectedSort]);

  // Slicing Phân trang
  const totalPages = Math.max(1, Math.ceil(filteredAndSortedRoadmaps.length / ITEMS_PER_PAGE));
  const activePage = Math.min(currentPage, totalPages);
  const startIndex = (activePage - 1) * ITEMS_PER_PAGE;
  const paginatedRoadmaps = filteredAndSortedRoadmaps.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  useScrollReveal(".reveal-card", [activePage, searchTerm, selectedLevel, selectedSort]);

  // Reset về trang 1 khi thay đổi từ khóa search hoặc filter
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedLevel, selectedSort]);

  const toggleSelectAll = () => {
    if (selectedIds.length === filteredAndSortedRoadmaps.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filteredAndSortedRoadmaps.map((rm) => rm._id || rm.id));
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
    if (lvl === "beginner") return "success";
    if (lvl === "intermediate") return "warning";
    return "danger";
  };

  return (
    <div className={styles.container}>
      {/* Banner Header */}
      <div className={`${styles.header_banner} reveal-card`}>
        <div className={styles.banner_text}>
          <h2 className={styles.banner_title}>Roadmap Management</h2>
          <p className={styles.banner_subtitle}>Quản lý toàn bộ lộ trình học tập của FySet</p>
        </div>
        <Button variant="primary" onClick={onAddRoadmap} className={styles.add_btn}>
          <Icon name="Plus" size={18} />
          <span>Add Roadmap</span>
        </Button>
      </div>

      {/* Toolbar Search & Filters */}
      <div className={`${styles.toolbar} reveal-card`}>
        <div className={styles.search_wrapper}>
          <Icon name="Search" size={16} className={styles.search_icon} />
          <input
            type="text"
            placeholder="Search roadmap title, description or tags..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={styles.search_input}
          />
        </div>

        <div className={styles.filter_group}>
          <DropdownMenu
            options={LEVEL_OPTIONS}
            value={selectedLevel}
            onChange={setSelectedLevel}
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

      {/* Table Danh Sách Roadmap */}
      <div className={`${styles.table_wrapper} reveal-card`}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th style={{ width: "40px" }}>
                <input
                  type="checkbox"
                  checked={
                    filteredAndSortedRoadmaps.length > 0 &&
                    selectedIds.length === filteredAndSortedRoadmaps.length
                  }
                  onChange={toggleSelectAll}
                  className={styles.checkbox}
                />
              </th>
              <th>Roadmap Title</th>
              <th>Level</th>
              <th>Thời gian (Tháng)</th>
              <th>Số bước (Steps)</th>
              <th style={{ textAlign: "right" }}>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={6} className={styles.empty_td}>
                  Đang tải danh sách lộ trình...
                </td>
              </tr>
            ) : paginatedRoadmaps.length > 0 ? (
              paginatedRoadmaps.map((rm) => {
                const rmId = rm._id || rm.id;
                const isSelected = selectedIds.includes(rmId);
                const totalSteps = rm.totalSteps || (Array.isArray(rm.roadmap) ? rm.roadmap.length : 0);

                return (
                  <tr
                    key={rmId}
                    className={`${isSelected ? styles.row_selected : ""} reveal-card`}
                    style={{ cursor: "pointer" }}
                    onClick={(e) => {
                      if (e.target.closest("input") || e.target.closest("button")) return;
                      if (onEditRoadmap) onEditRoadmap(rm);
                    }}
                  >
                    <td>
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => toggleSelectOne(rmId)}
                        className={styles.checkbox}
                      />
                    </td>
                    <td>
                      <div
                        className={styles.course_meta}
                        onClick={() => onEditRoadmap && onEditRoadmap(rm)}
                        title="Bấm để chỉnh sửa lộ trình này"
                      >
                        <img
                          src={rm.thumbnail || "https://placehold.co/600x400/1a1d24/fff?text=Roadmap"}
                          alt={rm.title}
                          className={styles.thumbnail}
                        />
                        <div className={styles.title_box} style={{ maxWidth: "260px" }}>
                          <span className={styles.course_title}>{rm.title}</span>
                          <span
                            className={styles.course_desc_preview}
                            style={{
                              whiteSpace: "nowrap",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              display: "block",
                            }}
                          >
                            {rm.description}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td>
                      <Badge variant={getLevelBadgeVariant(rm.level)} size="sm">
                        {rm.level || "beginner"}
                      </Badge>
                    </td>
                    <td>
                      <span className={styles.num_text}>{rm.duration || 1} tháng</span>
                    </td>
                    <td>
                      <span className={styles.num_text}>{totalSteps} bước</span>
                    </td>
                    <td>
                      <div className={styles.action_row}>
                        <button
                          type="button"
                          className={styles.action_btn}
                          onClick={(e) => {
                            e.stopPropagation();
                            if (onEditRoadmap) onEditRoadmap(rm);
                          }}
                          title="Chỉnh sửa lộ trình"
                        >
                          <Icon name="Edit3" size={15} />
                        </button>
                        <button
                          type="button"
                          className={`${styles.action_btn} ${styles.action_danger}`}
                          onClick={(e) => {
                            e.stopPropagation();
                            onDeleteRoadmap(rmId);
                          }}
                          title="Xóa lộ trình"
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
                <td colSpan={6} className={styles.empty_td}>
                  Không tìm thấy lộ trình nào khớp với bộ lọc.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Bar */}
      <div className={`${styles.pagination_bar} reveal-card`}>
        <span className={styles.page_info}>
          {filteredAndSortedRoadmaps.length > 0
            ? `Hiển thị ${startIndex + 1} - ${Math.min(
                startIndex + ITEMS_PER_PAGE,
                filteredAndSortedRoadmaps.length
              )} trên tổng số ${filteredAndSortedRoadmaps.length} lộ trình`
            : "Hiển thị 0 lộ trình"}
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