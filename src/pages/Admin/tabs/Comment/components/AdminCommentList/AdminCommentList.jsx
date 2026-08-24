import React, { useState } from "react";
import Icon from "~/components/Icon/Icon";
import { Badge, Pagination, DropdownMenu } from "~/components/ui";
import { useToast } from "~/context/ToastContext.jsx";
import useScrollReveal from "~/hooks/useScrollReveal";
import {
  COMMENT_CONTENT_TYPE_OPTIONS,
  COMMENT_STATUS_OPTIONS,
  COMMENT_REPORTED_OPTIONS,
  COMMENT_DATE_OPTIONS,
} from "~/constants/mockAdminComment";
import styles from "./AdminCommentList.module.css";

export default function AdminCommentList({ comments = [], onSelectComment, onDeleteComment, onToggleHideComment }) {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [contentTypeFilter, setContentTypeFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [reportedFilter, setReportedFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("all");
  const [selectedIds, setSelectedIds] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useScrollReveal(".reveal-card", [comments, currentPage, contentTypeFilter, statusFilter, reportedFilter, dateFilter]);

  // Filter comments logic
  const filteredComments = comments.filter((cmt) => {
    const matchesSearch =
      cmt.text.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cmt.user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cmt.user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (cmt.relatedContent && cmt.relatedContent.title.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesContentType = contentTypeFilter === "all" || cmt.contentType === contentTypeFilter;
    const matchesStatus = statusFilter === "all" || cmt.status === statusFilter;

    let matchesReported = true;
    if (reportedFilter === "reported_only") matchesReported = cmt.reportsCount > 0;
    if (reportedFilter === "clean") matchesReported = cmt.reportsCount === 0;

    return matchesSearch && matchesContentType && matchesStatus && matchesReported;
  });

  // Pagination calculation
  const totalPages = Math.ceil(filteredComments.length / itemsPerPage) || 1;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentComments = filteredComments.slice(startIndex, startIndex + itemsPerPage);

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedIds(currentComments.map((c) => c.id));
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

  const handleDeleteItem = (e, comment) => {
    e.stopPropagation();
    if (onDeleteComment) {
      onDeleteComment(comment.id);
      toast.success("Đã xóa bình luận khỏi hệ thống", "Thành công");
    }
  };

  const handleToggleHide = (e, comment) => {
    e.stopPropagation();
    if (onToggleHideComment) {
      onToggleHideComment(comment.id);
    }
  };

  const getStatusVariant = (status) => {
    if (status === "Published") return "success";
    if (status === "Hidden") return "warning";
    return "danger";
  };

  return (
    <div className={styles.container}>
      {/* 1. Header Banner */}
      <div className={`${styles.header_banner} reveal-card`}>
        <div className={styles.banner_text}>
          <h2 className={styles.banner_title}>Comment Management</h2>
          <p className={styles.banner_subtitle}>Kiểm duyệt thảo luận, xử lý báo cáo vi phạm và giữ môi trường văn minh cho FySet</p>
        </div>
      </div>

      {/* 2. Content Type Selection Bar */}
      <div className={`${styles.content_type_bar} reveal-card`}>
        {COMMENT_CONTENT_TYPE_OPTIONS.map((opt) => {
          const isActive = contentTypeFilter === opt.value;
          return (
            <button
              key={opt.value}
              type="button"
              className={`${styles.type_pill} ${isActive ? styles.pill_active : ""}`}
              onClick={() => setContentTypeFilter(opt.value)}
            >
              <span>{opt.label}</span>
            </button>
          );
        })}
      </div>

      {/* 3. Toolbar */}
      <div className={`${styles.toolbar} reveal-card`}>
        <div className={styles.search_wrapper}>
          <Icon name="Search" size={16} className={styles.search_icon} />
          <input
            type="text"
            placeholder="Search comments..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={styles.search_input}
          />
        </div>

        <div className={styles.filter_group}>
          <DropdownMenu
            options={COMMENT_STATUS_OPTIONS}
            value={statusFilter}
            onChange={setStatusFilter}
            size="sm"
          />
          <DropdownMenu
            options={COMMENT_REPORTED_OPTIONS}
            value={reportedFilter}
            onChange={setReportedFilter}
            size="sm"
          />
          <DropdownMenu
            options={COMMENT_DATE_OPTIONS}
            value={dateFilter}
            onChange={setDateFilter}
            size="sm"
          />
        </div>
      </div>

      {/* 4. Table */}
      <div className={`${styles.table_wrapper} reveal-card`}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th style={{ width: 40 }}>
                <input
                  type="checkbox"
                  className={styles.checkbox}
                  checked={currentComments.length > 0 && selectedIds.length === currentComments.length}
                  onChange={handleSelectAll}
                />
              </th>
              <th>User</th>
              <th>Comment Content</th>
              <th>Content Context</th>
              <th>Reports</th>
              <th>Status</th>
              <th>Date</th>
              <th style={{ textAlign: "right" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentComments.length === 0 ? (
              <tr>
                <td colSpan={8} className={styles.empty_td}>
                  Không tìm thấy bình luận nào phù hợp với bộ lọc.
                </td>
              </tr>
            ) : (
              currentComments.map((cmt) => {
                const isSelected = selectedIds.includes(cmt.id);
                return (
                  <tr
                    key={cmt.id}
                    className={isSelected ? styles.row_selected : ""}
                    onClick={() => onSelectComment(cmt)}
                    style={{ cursor: "pointer" }}
                  >
                    <td onClick={(e) => e.stopPropagation()}>
                      <input
                        type="checkbox"
                        className={styles.checkbox}
                        checked={isSelected}
                        onChange={() => handleToggleSelect(cmt.id)}
                      />
                    </td>
                    <td>
                      <div className={styles.user_meta}>
                        <img src={cmt.user.avatar} alt={cmt.user.name} className={styles.avatar_thumb} />
                        <div className={styles.title_box}>
                          <span className={styles.user_name}>{cmt.user.name}</span>
                          <span className={styles.username}>@{cmt.user.username}</span>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span className={styles.comment_text}>{cmt.text}</span>
                    </td>
                    <td>
                      <div className={styles.title_box}>
                        <span className={styles.content_badge}>[{cmt.contentType}]</span>
                        <span style={{ fontSize: "0.85rem", fontWeight: 700 }}>
                          {cmt.relatedContent ? cmt.relatedContent.title : "N/A"}
                        </span>
                      </div>
                    </td>
                    <td>
                      <span
                        className={`${styles.reports_badge} ${
                          cmt.reportsCount > 0 ? styles.reports_danger : styles.reports_clean
                        }`}
                      >
                        <Icon name="ShieldAlert" size={14} />
                        {cmt.reportsCount} report(s)
                      </span>
                    </td>
                    <td>
                      <Badge variant={getStatusVariant(cmt.status)} size="sm">
                        {cmt.status}
                      </Badge>
                    </td>
                    <td><span className={styles.date_text}>{cmt.date}</span></td>
                    <td onClick={(e) => e.stopPropagation()}>
                      <div className={styles.action_row}>
                        <button
                          type="button"
                          className={styles.action_btn}
                          title="Xem chi tiết bình luận"
                          onClick={() => onSelectComment(cmt)}
                        >
                          <Icon name="Eye" size={15} />
                        </button>
                        <button
                          type="button"
                          className={styles.action_btn}
                          title={cmt.status === "Hidden" ? "Hiện bình luận" : "Ẩn bình luận"}
                          onClick={(e) => handleToggleHide(e, cmt)}
                        >
                          <Icon name={cmt.status === "Hidden" ? "Eye" : "EyeOff"} size={15} />
                        </button>
                        <button
                          type="button"
                          className={`${styles.action_btn} ${styles.action_danger}`}
                          title="Xóa bình luận"
                          onClick={(e) => handleDeleteItem(e, cmt)}
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

      {/* 5. Pagination Bar */}
      <div className={`${styles.pagination_bar} reveal-card`}>
        <span className={styles.page_info}>
          Showing {filteredComments.length > 0 ? startIndex + 1 : 0} to{" "}
          {Math.min(startIndex + itemsPerPage, filteredComments.length)} of {filteredComments.length} comments
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
