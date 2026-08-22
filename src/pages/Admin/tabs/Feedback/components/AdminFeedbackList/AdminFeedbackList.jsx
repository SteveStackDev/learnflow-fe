import React, { useState } from "react";
import Icon from "~/components/Icon/Icon";
import { Badge, Pagination, DropdownMenu } from "~/components/ui";
import useScrollReveal from "~/hooks/useScrollReveal";
import {
  FEEDBACK_TYPE_OPTIONS,
  FEEDBACK_STATUS_OPTIONS,
  FEEDBACK_PRIORITY_OPTIONS,
  FEEDBACK_DATE_OPTIONS,
} from "~/constants/mockAdminFeedback";
import styles from "./AdminFeedbackList.module.css";

export default function AdminFeedbackList({ feedbacks = [], onSelectFeedback }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useScrollReveal(".reveal-card", [feedbacks, currentPage, typeFilter, statusFilter, priorityFilter, dateFilter]);

  // Filter logic
  const filteredFeedbacks = feedbacks.filter((fb) => {
    const matchesSearch =
      fb.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      fb.user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      fb.user.email.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesType = typeFilter === "all" || fb.type === typeFilter;
    const matchesStatus = statusFilter === "all" || fb.status === statusFilter;
    const matchesPriority = priorityFilter === "all" || fb.priority === priorityFilter;

    return matchesSearch && matchesType && matchesStatus && matchesPriority;
  });

  const totalPages = Math.ceil(filteredFeedbacks.length / itemsPerPage) || 1;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentFeedbacks = filteredFeedbacks.slice(startIndex, startIndex + itemsPerPage);

  const getStatusVariant = (status) => {
    if (status === "New") return "primary";
    if (status === "Reviewing") return "warning";
    if (status === "Resolved") return "success";
    return "danger";
  };

  const getPriorityVariant = (prio) => {
    if (prio === "High") return "danger";
    if (prio === "Medium") return "warning";
    return "secondary";
  };

  return (
    <div className={styles.container}>
      {/* 1. Header Banner */}
      <div className={`${styles.header_banner} reveal-card`}>
        <div className={styles.banner_text}>
          <h2 className={styles.banner_title}>Feedback Management</h2>
          <p className={styles.banner_subtitle}>Tiếp nhận góp ý, báo lỗi hệ thống và ý tưởng phát triển từ người dùng FySet</p>
        </div>
      </div>

      {/* 2. Toolbar */}
      <div className={`${styles.toolbar} reveal-card`}>
        <div className={styles.search_wrapper}>
          <Icon name="Search" size={16} className={styles.search_icon} />
          <input
            type="text"
            placeholder="Search feedback..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={styles.search_input}
          />
        </div>

        <div className={styles.filter_group}>
          <DropdownMenu
            options={FEEDBACK_TYPE_OPTIONS}
            value={typeFilter}
            onChange={setTypeFilter}
            size="sm"
          />
          <DropdownMenu
            options={FEEDBACK_STATUS_OPTIONS}
            value={statusFilter}
            onChange={setStatusFilter}
            size="sm"
          />
          <DropdownMenu
            options={FEEDBACK_PRIORITY_OPTIONS}
            value={priorityFilter}
            onChange={setPriorityFilter}
            size="sm"
          />
          <DropdownMenu
            options={FEEDBACK_DATE_OPTIONS}
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
              <th>User</th>
              <th>Subject</th>
              <th>Type</th>
              <th>Priority</th>
              <th>Status</th>
              <th>Date</th>
              <th style={{ textAlign: "right" }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {currentFeedbacks.length === 0 ? (
              <tr>
                <td colSpan={7} className={styles.empty_td}>
                  Không tìm thấy phản hồi nào phù hợp với bộ lọc.
                </td>
              </tr>
            ) : (
              currentFeedbacks.map((fb) => (
                <tr
                  key={fb.id}
                  onClick={() => onSelectFeedback(fb)}
                  style={{ cursor: "pointer" }}
                >
                  <td>
                    <div className={styles.user_meta}>
                      <img src={fb.user.avatar} alt={fb.user.name} className={styles.avatar_thumb} />
                      <div>
                        <div style={{ fontWeight: 700 }}>{fb.user.name}</div>
                        <div style={{ fontSize: "0.775rem", opacity: 0.7 }}>{fb.user.email}</div>
                      </div>
                    </div>
                  </td>
                  <td><span className={styles.subject_text}>{fb.subject}</span></td>
                  <td>
                    <Badge variant="primary" size="sm">
                      {fb.type}
                    </Badge>
                  </td>
                  <td>
                    <Badge variant={getPriorityVariant(fb.priority)} size="sm">
                      {fb.priority}
                    </Badge>
                  </td>
                  <td>
                    <Badge variant={getStatusVariant(fb.status)} size="sm">
                      {fb.status}
                    </Badge>
                  </td>
                  <td><span style={{ fontSize: "0.85rem", opacity: 0.8 }}>{fb.date}</span></td>
                  <td onClick={(e) => e.stopPropagation()}>
                    <div style={{ display: "flex", justifyContent: "flex-end" }}>
                      <button
                        type="button"
                        className={styles.action_btn}
                        title="Xem chi tiết góp ý"
                        onClick={() => onSelectFeedback(fb)}
                      >
                        <Icon name="Eye" size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* 4. Pagination Bar */}
      <div className={`${styles.pagination_bar} reveal-card`}>
        <span className={styles.page_info}>
          Showing {filteredFeedbacks.length > 0 ? startIndex + 1 : 0} to{" "}
          {Math.min(startIndex + itemsPerPage, filteredFeedbacks.length)} of {filteredFeedbacks.length} feedbacks
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
