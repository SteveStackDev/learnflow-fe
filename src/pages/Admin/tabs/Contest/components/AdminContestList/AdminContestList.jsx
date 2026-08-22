import React, { useState } from "react";
import Icon from "~/components/Icon/Icon";
import { Button, Badge, Pagination, DropdownMenu } from "~/components/ui";
import { useToast } from "~/context/ToastContext.jsx";
import useScrollReveal from "~/hooks/useScrollReveal";
import {
  CONTEST_STATUS_OPTIONS,
  CONTEST_TYPE_OPTIONS,
  CONTEST_DATE_OPTIONS,
} from "~/constants/mockAdminContest";
import styles from "./AdminContestList.module.css";

export default function AdminContestList({ contests = [], onSelectContest, onAddContest, onDeleteContest }) {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("all");
  const [selectedIds, setSelectedIds] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useScrollReveal(".reveal-card", [contests, currentPage, statusFilter, typeFilter, dateFilter]);

  // Filter Contests logic
  const filteredContests = contests.filter((cnt) => {
    const matchesSearch =
      cnt.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (cnt.description && cnt.description.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesStatus = statusFilter === "all" || cnt.status === statusFilter;
    const matchesType = typeFilter === "all" || cnt.type === typeFilter;

    return matchesSearch && matchesStatus && matchesType;
  });

  // Pagination calculation
  const totalPages = Math.ceil(filteredContests.length / itemsPerPage) || 1;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentContests = filteredContests.slice(startIndex, startIndex + itemsPerPage);

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedIds(currentContests.map((c) => c.id));
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

  const handleDeleteItem = (e, contest) => {
    e.stopPropagation();
    if (onDeleteContest) {
      onDeleteContest(contest.id);
      toast.success(`Đã xóa kỳ thi "${contest.title}"`, "Thành công");
    }
  };

  const getStatusVariant = (status) => {
    if (status === "Live") return "success";
    if (status === "Upcoming") return "primary";
    return "secondary";
  };

  return (
    <div className={styles.container}>
      {/* 1. Header Banner */}
      <div className={`${styles.header_banner} reveal-card`}>
        <div className={styles.banner_text}>
          <h2 className={styles.banner_title}>Contest Management</h2>
          <p className={styles.banner_subtitle}>Quản lý và tổ chức các cuộc thi lập trình thuật toán FySet</p>
        </div>
        <Button variant="primary" onClick={onAddContest} className={styles.add_btn}>
          <Icon name="Plus" size={18} />
          <span>Create Contest</span>
        </Button>
      </div>

      {/* 2. Toolbar (Search & Dropdown Filters) */}
      <div className={`${styles.toolbar} reveal-card`}>
        <div className={styles.search_wrapper}>
          <Icon name="Search" size={16} className={styles.search_icon} />
          <input
            type="text"
            placeholder="Search contest title..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={styles.search_input}
          />
        </div>

        <div className={styles.filter_group}>
          <DropdownMenu
            options={CONTEST_STATUS_OPTIONS}
            value={statusFilter}
            onChange={setStatusFilter}
            size="sm"
          />
          <DropdownMenu
            options={CONTEST_TYPE_OPTIONS}
            value={typeFilter}
            onChange={setTypeFilter}
            size="sm"
          />
          <DropdownMenu
            options={CONTEST_DATE_OPTIONS}
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
                  checked={currentContests.length > 0 && selectedIds.length === currentContests.length}
                  onChange={handleSelectAll}
                />
              </th>
              <th>Contest</th>
              <th>Start Time</th>
              <th>End Time</th>
              <th>Participants</th>
              <th>Status</th>
              <th style={{ textAlign: "right" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentContests.length === 0 ? (
              <tr>
                <td colSpan={7} className={styles.empty_td}>
                  Không tìm thấy kỳ thi nào phù hợp với bộ lọc.
                </td>
              </tr>
            ) : (
              currentContests.map((cnt) => {
                const isSelected = selectedIds.includes(cnt.id);
                return (
                  <tr
                    key={cnt.id}
                    className={isSelected ? styles.row_selected : ""}
                    onClick={() => onSelectContest(cnt)}
                    style={{ cursor: "pointer" }}
                  >
                    <td onClick={(e) => e.stopPropagation()}>
                      <input
                        type="checkbox"
                        className={styles.checkbox}
                        checked={isSelected}
                        onChange={() => handleToggleSelect(cnt.id)}
                      />
                    </td>
                    <td>
                      <div className={styles.contest_meta}>
                        <img src={cnt.banner} alt={cnt.title} className={styles.banner_thumb} />
                        <div className={styles.title_box}>
                          <span className={styles.contest_title}>{cnt.title}</span>
                          <span className={styles.contest_desc}>{cnt.description}</span>
                        </div>
                      </div>
                    </td>
                    <td><span className={styles.time_text}>{cnt.startTime}</span></td>
                    <td><span className={styles.time_text}>{cnt.endTime}</span></td>
                    <td><span className={styles.num_text}>{cnt.participantsCount.toLocaleString()}</span></td>
                    <td>
                      <Badge variant={getStatusVariant(cnt.status)} size="sm">
                        {cnt.status}
                      </Badge>
                    </td>
                    <td onClick={(e) => e.stopPropagation()}>
                      <div className={styles.action_row}>
                        <button
                          type="button"
                          className={styles.action_btn}
                          title="Chỉnh sửa kỳ thi"
                          onClick={() => onSelectContest(cnt)}
                        >
                          <Icon name="Edit" size={15} />
                        </button>
                        <button
                          type="button"
                          className={`${styles.action_btn} ${styles.action_danger}`}
                          title="Xóa kỳ thi"
                          onClick={(e) => handleDeleteItem(e, cnt)}
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
          Showing {filteredContests.length > 0 ? startIndex + 1 : 0} to{" "}
          {Math.min(startIndex + itemsPerPage, filteredContests.length)} of {filteredContests.length} contests
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
