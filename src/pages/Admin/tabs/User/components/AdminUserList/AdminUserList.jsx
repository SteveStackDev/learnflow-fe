import React, { useState } from "react";
import Icon from "~/components/Icon/Icon";
import { Button, Badge, Pagination, DropdownMenu } from "~/components/ui";
import { useToast } from "~/context/ToastContext.jsx";
import useScrollReveal from "~/hooks/useScrollReveal";
import {
  USER_ROLE_OPTIONS,
  USER_PLAN_OPTIONS,
  USER_STATUS_OPTIONS,
  USER_JOINED_OPTIONS,
} from "~/constants/mockAdminUser";
import styles from "./AdminUserList.module.css";

export default function AdminUserList({ users = [], onSelectUser, onAddUser, onDeleteUser }) {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [planFilter, setPlanFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [joinedFilter, setJoinedFilter] = useState("all");
  const [selectedIds, setSelectedIds] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useScrollReveal(".reveal-card", [users, currentPage, roleFilter, planFilter, statusFilter, joinedFilter]);

  // Filter logic
  const filteredUsers = users.filter((usr) => {
    const matchesSearch =
      usr.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      usr.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      usr.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      usr.username.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesRole = roleFilter === "all" || usr.role === roleFilter;
    const matchesPlan = planFilter === "all" || usr.plan === planFilter;
    const matchesStatus = statusFilter === "all" || usr.status === statusFilter;

    return matchesSearch && matchesRole && matchesPlan && matchesStatus;
  });

  // Pagination calculation
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage) || 1;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentUsers = filteredUsers.slice(startIndex, startIndex + itemsPerPage);

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedIds(currentUsers.map((u) => u.id));
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

  const handleDeleteItem = (e, user) => {
    e.stopPropagation();
    if (onDeleteUser) {
      onDeleteUser(user.id);
      toast.success(`Đã xóa tài khoản "${user.name}"`, "Thành công");
    }
  };

  const getStatusVariant = (status) => {
    if (status === "Active") return "success";
    if (status === "Blocked") return "warning";
    return "danger";
  };

  const getRoleVariant = (role) => {
    if (role === "Admin") return "danger";
    if (role === "Moderator") return "warning";
    return "secondary";
  };

  const getPlanVariant = (plan) => {
    if (plan === "Enterprise") return "danger";
    if (plan === "Pro") return "primary";
    return "secondary";
  };

  return (
    <div className={styles.container}>
      {/* 1. Header Banner */}
      <div className={`${styles.header_banner} reveal-card`}>
        <div className={styles.banner_text}>
          <h2 className={styles.banner_title}>User Management</h2>
          <p className={styles.banner_subtitle}>Quản lý tài khoản, phân quyền và lịch sử hoạt động người dùng FySet</p>
        </div>
        <Button variant="primary" onClick={onAddUser} className={styles.add_btn}>
          <Icon name="Plus" size={18} />
          <span>Create User</span>
        </Button>
      </div>

      {/* 2. Toolbar */}
      <div className={`${styles.toolbar} reveal-card`}>
        <div className={styles.search_wrapper}>
          <Icon name="Search" size={16} className={styles.search_icon} />
          <input
            type="text"
            placeholder="Search name / email / ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={styles.search_input}
          />
        </div>

        <div className={styles.filter_group}>
          <DropdownMenu
            options={USER_ROLE_OPTIONS}
            value={roleFilter}
            onChange={setRoleFilter}
            size="sm"
          />
          <DropdownMenu
            options={USER_PLAN_OPTIONS}
            value={planFilter}
            onChange={setPlanFilter}
            size="sm"
          />
          <DropdownMenu
            options={USER_STATUS_OPTIONS}
            value={statusFilter}
            onChange={setStatusFilter}
            size="sm"
          />
          <DropdownMenu
            options={USER_JOINED_OPTIONS}
            value={joinedFilter}
            onChange={setJoinedFilter}
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
                  checked={currentUsers.length > 0 && selectedIds.length === currentUsers.length}
                  onChange={handleSelectAll}
                />
              </th>
              <th>User</th>
              <th>Email</th>
              <th>Role</th>
              <th>Plan</th>
              <th>Status</th>
              <th>Joined Date</th>
              <th style={{ textAlign: "right" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentUsers.length === 0 ? (
              <tr>
                <td colSpan={8} className={styles.empty_td}>
                  Không tìm thấy người dùng nào phù hợp với bộ lọc.
                </td>
              </tr>
            ) : (
              currentUsers.map((usr) => {
                const isSelected = selectedIds.includes(usr.id);
                return (
                  <tr
                    key={usr.id}
                    className={isSelected ? styles.row_selected : ""}
                    onClick={() => onSelectUser(usr)}
                    style={{ cursor: "pointer" }}
                  >
                    <td onClick={(e) => e.stopPropagation()}>
                      <input
                        type="checkbox"
                        className={styles.checkbox}
                        checked={isSelected}
                        onChange={() => handleToggleSelect(usr.id)}
                      />
                    </td>
                    <td>
                      <div className={styles.user_meta}>
                        <img src={usr.avatar} alt={usr.name} className={styles.avatar_thumb} />
                        <div className={styles.title_box}>
                          <span className={styles.user_name}>{usr.name}</span>
                          <span className={styles.username}>@{usr.username}</span>
                        </div>
                      </div>
                    </td>
                    <td><span className={styles.email_text}>{usr.email}</span></td>
                    <td>
                      <Badge variant={getRoleVariant(usr.role)} size="sm">
                        {usr.role}
                      </Badge>
                    </td>
                    <td>
                      <Badge variant={getPlanVariant(usr.plan)} size="sm">
                        {usr.plan}
                      </Badge>
                    </td>
                    <td>
                      <Badge variant={getStatusVariant(usr.status)} size="sm">
                        {usr.status}
                      </Badge>
                    </td>
                    <td><span className={styles.date_text}>{usr.joinedDate}</span></td>
                    <td onClick={(e) => e.stopPropagation()}>
                      <div className={styles.action_row}>
                        <button
                          type="button"
                          className={styles.action_btn}
                          title="Xem hồ sơ chi tiết"
                          onClick={() => onSelectUser(usr)}
                        >
                          <Icon name="Eye" size={15} />
                        </button>
                        <button
                          type="button"
                          className={`${styles.action_btn} ${styles.action_danger}`}
                          title="Xóa tài khoản"
                          onClick={(e) => handleDeleteItem(e, usr)}
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
          Showing {filteredUsers.length > 0 ? startIndex + 1 : 0} to{" "}
          {Math.min(startIndex + itemsPerPage, filteredUsers.length)} of {filteredUsers.length} users
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
