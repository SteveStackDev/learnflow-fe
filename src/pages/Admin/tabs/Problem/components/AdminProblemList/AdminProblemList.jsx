import React, { useState, useEffect } from "react";
import Icon from "~/components/Icon/Icon";
import { Button, Badge, Pagination, DropdownMenu } from "~/components/ui";
import useScrollReveal from "~/hooks/useScrollReveal";
import {
  DIFFICULTY_OPTIONS,
  TOPIC_OPTIONS,
  LANGUAGE_OPTIONS,
  STATUS_OPTIONS,
} from "~/constants/mockAdminProblem";
import styles from "./AdminProblemList.module.css";

const ITEMS_PER_PAGE = 4;

export default function AdminProblemList({
  problems = [],
  onAddProblem,
  onViewProblem,
  onEditProblem,
  onDuplicateProblem,
  onToggleStatus,
  onDeleteProblem,
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [difficultyFilter, setDifficultyFilter] = useState("all");
  const [topicFilter, setTopicFilter] = useState("all");
  const [languageFilter, setLanguageFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedIds, setSelectedIds] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  // Filter Logic
  const filteredProblems = problems.filter((p) => {
    const matchSearch = p.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchDiff = difficultyFilter === "all" || p.difficulty === difficultyFilter;
    const matchTopic = topicFilter === "all" || p.topic === topicFilter;
    const matchLang =
      languageFilter === "all" ||
      (p.supportedLanguages && p.supportedLanguages.includes(languageFilter));
    const matchStatus = statusFilter === "all" || p.status === statusFilter;

    return matchSearch && matchDiff && matchTopic && matchLang && matchStatus;
  });

  // Calculate Pagination Slicing
  const totalPages = Math.max(Math.ceil(filteredProblems.length / ITEMS_PER_PAGE), 1);
  const activePage = Math.min(currentPage, totalPages);
  const startIndex = (activePage - 1) * ITEMS_PER_PAGE;
  const paginatedProblems = filteredProblems.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  // Trigger ScrollReveal hook on page/filter change
  useScrollReveal(".reveal-card", [activePage, searchTerm, difficultyFilter, topicFilter, statusFilter]);

  // Reset to page 1 whenever search or filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, difficultyFilter, topicFilter, languageFilter, statusFilter]);

  const toggleSelectAll = () => {
    if (selectedIds.length === filteredProblems.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filteredProblems.map((p) => p.id));
    }
  };

  const toggleSelectOne = (id) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter((item) => item !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  const getDiffBadgeVariant = (diff) => {
    if (diff === "Easy") return "success";
    if (diff === "Medium") return "warning";
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
          <h2 className={styles.banner_title}>Problem Management</h2>
          <p className={styles.banner_subtitle}>
            Quản lý toàn bộ ngân hàng bài tập thuật toán và chấm điểm tự động của FySet
          </p>
        </div>
        <Button variant="primary" onClick={onAddProblem} className={styles.add_btn}>
          <Icon name="Plus" size={18} />
          <span>Add Problem</span>
        </Button>
      </div>

      {/* 2. Search & Filters Toolbar */}
      <div className={`${styles.toolbar} reveal-card`}>
        <div className={styles.search_wrapper}>
          <Icon name="Search" size={16} className={styles.search_icon} />
          <input
            type="text"
            placeholder="Search problem..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={styles.search_input}
          />
        </div>

        <div className={styles.filter_group}>
          <DropdownMenu
            options={DIFFICULTY_OPTIONS}
            value={difficultyFilter}
            onChange={setDifficultyFilter}
            size="sm"
          />
          <DropdownMenu
            options={TOPIC_OPTIONS}
            value={topicFilter}
            onChange={setTopicFilter}
            size="sm"
          />
          <DropdownMenu
            options={LANGUAGE_OPTIONS}
            value={languageFilter}
            onChange={setLanguageFilter}
            size="sm"
          />
          <DropdownMenu
            options={STATUS_OPTIONS}
            value={statusFilter}
            onChange={setStatusFilter}
            size="sm"
          />
        </div>
      </div>

      {/* 3. Data Table */}
      <div className={`${styles.table_wrapper} reveal-card`}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th style={{ width: "40px" }}>
                <input
                  type="checkbox"
                  checked={
                    filteredProblems.length > 0 &&
                    selectedIds.length === filteredProblems.length
                  }
                  onChange={toggleSelectAll}
                  className={styles.checkbox}
                />
              </th>
              <th style={{ width: "70px" }}>ID</th>
              <th>Title</th>
              <th>Difficulty</th>
              <th>Points</th>
              <th>Solved</th>
              <th>Acceptance Rate</th>
              <th>Status</th>
              <th style={{ textAlign: "right" }}>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {paginatedProblems.length > 0 ? (
              paginatedProblems.map((prob) => {
                const isSelected = selectedIds.includes(prob.id);
                return (
                  <tr key={prob.id} className={`${isSelected ? styles.row_selected : ""} reveal-card`}>
                    <td>
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => toggleSelectOne(prob.id)}
                        className={styles.checkbox}
                      />
                    </td>
                    <td>
                      <span className={styles.prob_id}>#{prob.code || prob.id}</span>
                    </td>
                    <td>
                      <div
                        className={styles.prob_meta}
                        onClick={() => onViewProblem(prob.id)}
                        role="button"
                        tabIndex={0}
                      >
                        <span className={styles.prob_title}>{prob.title}</span>
                        <span className={styles.topic_tag}>
                          <Icon name="Tag" size={12} />
                          {prob.topic}
                        </span>
                      </div>
                    </td>
                    <td>
                      <Badge variant={getDiffBadgeVariant(prob.difficulty)} size="sm">
                        {prob.difficulty}
                      </Badge>
                    </td>
                    <td>
                      <span className={styles.points_badge}>
                        <Icon name="Award" size={13} />
                        {prob.points ? `${prob.points} pt` : "500 pt"}
                      </span>
                    </td>
                    <td>
                      <span className={styles.num_text}>
                        {typeof prob.solved === "number"
                          ? prob.solved.toLocaleString()
                          : prob.solved || "0"}
                      </span>
                    </td>
                    <td>
                      <div className={styles.rate_box}>
                        <div className={styles.rate_bar}>
                          <div
                            className={styles.rate_fill}
                            style={{ width: `${prob.acceptanceRate || 50}%` }}
                          />
                        </div>
                        <span className={styles.num_text}>{prob.acceptanceRate || 50}%</span>
                      </div>
                    </td>
                    <td>
                      <Badge variant={getStatusBadgeVariant(prob.status)} size="sm">
                        {prob.status}
                      </Badge>
                    </td>
                    <td>
                      <div className={styles.action_row}>
                        <button
                          type="button"
                          className={styles.action_btn}
                          onClick={() => onViewProblem(prob.id)}
                          title="Open Problem Editor"
                        >
                          <Icon name="Eye" size={16} />
                        </button>
                        <button
                          type="button"
                          className={styles.action_btn}
                          onClick={() => onEditProblem(prob)}
                          title="Quick Edit"
                        >
                          <Icon name="Edit" size={16} />
                        </button>
                        <button
                          type="button"
                          className={styles.action_btn}
                          onClick={() => onDuplicateProblem(prob)}
                          title="Duplicate Problem"
                        >
                          <Icon name="Share" size={16} />
                        </button>
                        <button
                          type="button"
                          className={`${styles.action_btn} ${styles.action_toggle}`}
                          onClick={() => onToggleStatus(prob.id)}
                          title={prob.status === "Active" ? "Unpublish" : "Publish"}
                        >
                          <Icon
                            name={prob.status === "Active" ? "EyeOff" : "CheckCircle2"}
                            size={16}
                          />
                        </button>
                        <button
                          type="button"
                          className={`${styles.action_btn} ${styles.action_danger}`}
                          onClick={() => onDeleteProblem(prob.id)}
                          title="Delete Problem"
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
                  Không tìm thấy bài tập nào khớp với bộ lọc.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* 4. Pagination Bar */}
      <div className={`${styles.pagination_bar} reveal-card`}>
        <span className={styles.page_info}>
          {filteredProblems.length > 0
            ? `Hiển thị ${startIndex + 1} - ${Math.min(
                startIndex + ITEMS_PER_PAGE,
                filteredProblems.length
              )} trên tổng số ${filteredProblems.length} bài tập`
            : "Hiển thị 0 bài tập"}
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
