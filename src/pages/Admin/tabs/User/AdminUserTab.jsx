import React, { useState } from "react";
import AdminUserList from "./components/AdminUserList/AdminUserList";
import AdminUserDetail from "./components/AdminUserDetail/AdminUserDetail";
import AdminUserModal from "./components/AdminUserModal/AdminUserModal";
import { INITIAL_USERS } from "~/constants/mockAdminUser";
import { useToast } from "~/context/ToastContext.jsx";

export default function AdminUserTab() {
  const { toast } = useToast();
  const [users, setUsers] = useState(INITIAL_USERS);
  const [selectedUser, setSelectedUser] = useState(null); // null = List View, Object = Detail View
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddUser = () => {
    setIsModalOpen(true);
  };

  const handleSaveModal = (formData) => {
    const newUser = {
      id: `usr-${Date.now()}`,
      ...formData,
      joinedDate: "Hôm nay",
      lastLogin: "Vừa xong",
      ipAddress: "118.69.182.45 (VN)",
      subscription: `${formData.plan} Plan`,
      coursesEnrolled: [],
      solvedProblems: [],
      contestsParticipated: [],
      badgesEarned: [],
      transactions: [],
      commentsCount: 0,
      reportsCount: 0,
    };
    setUsers([newUser, ...users]);
    toast.success(`Đã tạo tài khoản mới "${formData.name}"`, "Thành công");
  };

  const handleSaveDetail = (updatedUser) => {
    setUsers(users.map((u) => (u.id === updatedUser.id ? updatedUser : u)));
    setSelectedUser(updatedUser);
  };

  const handleDeleteUser = (id) => {
    setUsers(users.filter((u) => u.id !== id));
    if (selectedUser && selectedUser.id === id) {
      setSelectedUser(null);
    }
  };

  return (
    <>
      {selectedUser ? (
        <AdminUserDetail
          user={selectedUser}
          onBack={() => setSelectedUser(null)}
          onSave={handleSaveDetail}
        />
      ) : (
        <AdminUserList
          users={users}
          onSelectUser={setSelectedUser}
          onAddUser={handleAddUser}
          onDeleteUser={handleDeleteUser}
        />
      )}

      <AdminUserModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveModal}
      />
    </>
  );
}
