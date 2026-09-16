import React, { useState, useEffect } from "react";
import Icon from "~/components/Icon/Icon";
import { Button, FormField, Badge, ScrollArea } from "~/components/ui";
import { EmptyState } from "~/components/EmptyState/EmptyState";
import { dashboardData } from "~/constants/mockDashBoard";
import { useToast } from "~/context/ToastContext.jsx";
import styles from "./CreateChatModal.module.css";

const GROUP_AVATAR_PRESETS = [
  "https://api.dicebear.com/7.x/identicon/svg?seed=ReactPros",
  "https://api.dicebear.com/7.x/identicon/svg?seed=AlgorithmHub",
  "https://api.dicebear.com/7.x/identicon/svg?seed=FrontendMasters",
  "https://api.dicebear.com/7.x/identicon/svg?seed=DevOpsTeam",
  "https://api.dicebear.com/7.x/identicon/svg?seed=FullStackDevs",
];

export default function CreateChatModal({ isOpen, onClose, onCreateChat }) {
  const [chatType, setChatType] = useState("group"); // 'group' | 'direct'
  const [groupName, setGroupName] = useState("");
  const [selectedAvatar, setSelectedAvatar] = useState(GROUP_AVATAR_PRESETS[0]);
  const [searchMember, setSearchMember] = useState("");
  const [selectedMemberIds, setSelectedMemberIds] = useState([]);
  const [friendsList, setFriendsList] = useState([]);
  const [loadingFriends, setLoadingFriends] = useState(false);
  const { toast } = useToast();

  // Nạp danh sách bạn bè / thành viên
  useEffect(() => {
    if (isOpen) {
      setLoadingFriends(true);
      const friends = dashboardData.onlineFriends || [];
      setFriendsList(friends);
      setLoadingFriends(false);
    } else {
      // Reset form state khi đóng modal
      setGroupName("");
      setSelectedMemberIds([]);
      setSearchMember("");
      setChatType("group");
    }
  }, [isOpen]);

  // Đóng modal khi nhấn Escape
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Lọc bạn bè theo từ khóa tìm kiếm
  const filteredFriends = friendsList.filter((f) => {
    const name = (f.name || f.username || "").toLowerCase();
    const handle = (f.handle || "").toLowerCase();
    const query = searchMember.toLowerCase();
    return name.includes(query) || handle.includes(query);
  });

  const toggleSelectMember = (friendId) => {
    if (chatType === "direct") {
      setSelectedMemberIds([friendId]);
    } else {
      setSelectedMemberIds((prev) =>
        prev.includes(friendId) ? prev.filter((id) => id !== friendId) : [...prev, friendId]
      );
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (chatType === "group") {
      if (!groupName.trim()) {
        toast.warning("Vui lòng nhập tên nhóm học tập!", "Thiếu thông tin");
        return;
      }
      if (selectedMemberIds.length === 0) {
        toast.warning("Vui lòng chọn ít nhất 1 thành viên vào nhóm!", "Thiếu thành viên");
        return;
      }

      const selectedFriends = friendsList.filter((f) =>
        selectedMemberIds.includes(f.id || f._id)
      );

      const newConversation = {
        id: `group-${Date.now()}`,
        name: groupName.trim(),
        avatar: selectedAvatar,
        type: "group",
        isGroup: true,
        lastMessage: "Nhóm học tập vừa được khởi tạo.",
        lastTime: "Vừa xong",
        unreadCount: 0,
        status: "online",
        membersCount: selectedFriends.length + 1,
        members: selectedFriends,
        messages: [
          {
            id: `msg-${Date.now()}`,
            sender: "system",
            time: "Vừa xong",
            text: `Nhóm "${groupName.trim()}" đã được tạo với ${
              selectedFriends.length + 1
            } thành viên. Hãy bắt đầu thảo luận!`,
          },
        ],
      };

      onCreateChat(newConversation);
      toast.success(`Đã tạo nhóm "${groupName.trim()}" thành công!`, "Thành công");
      onClose();
    } else {
      // Tin nhắn trực tiếp (1-1)
      if (selectedMemberIds.length === 0) {
        toast.warning("Vui lòng chọn người bạn muốn gửi tin nhắn!", "Chưa chọn người nhận");
        return;
      }

      const targetFriend = friendsList.find((f) => (f.id || f._id) === selectedMemberIds[0]);
      if (!targetFriend) return;

      const newConversation = {
        id: `direct-${targetFriend.id || targetFriend._id || Date.now()}`,
        name: targetFriend.name || targetFriend.username,
        avatar: targetFriend.avatar,
        type: "direct",
        isGroup: false,
        lastMessage: "Cuộc trò chuyện mới đã bắt đầu.",
        lastTime: "Vừa xong",
        unreadCount: 0,
        status: targetFriend.status || "online",
        membersCount: 2,
        messages: [
          {
            id: `msg-${Date.now()}`,
            sender: "system",
            time: "Vừa xong",
            text: `Bạn và ${targetFriend.name || targetFriend.username} đã kết nối trò chuyện.`,
          },
        ],
      };

      onCreateChat(newConversation);
      toast.success(
        `Đã mở cuộc trò chuyện với ${targetFriend.name || targetFriend.username}!`,
        "Tin nhắn mới"
      );
      onClose();
    }
  };

  return (
    <div className={styles.modal_backdrop} onClick={onClose}>
      <div
        className={styles.modal_card}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        {/* Header */}
        <div className={styles.modal_header}>
          <div className={styles.header_title_wrap}>
            <div className={styles.header_icon}>
              <Icon name={chatType === "group" ? "Users" : "MessageSquare"} size={22} />
            </div>
            <div>
              <h3 id="modal-title" className={styles.modal_title}>
                {chatType === "group" ? "Tạo nhóm trò chuyện mới" : "Gửi tin nhắn trực tiếp"}
              </h3>
              <p className={styles.modal_subtitle}>
                {chatType === "group"
                  ? "Tạo nhóm học tập cùng bạn bè để trao đổi kiến thức và giải code"
                  : "Bắt đầu cuộc trò chuyện 1-1 với học viên khác"}
              </p>
            </div>
          </div>
          <button
            type="button"
            className={styles.close_btn}
            onClick={onClose}
            aria-label="Đóng cửa sổ"
          >
            <Icon name="X" size={18} />
          </button>
        </div>

        {/* Type Toggle Tabs */}
        <div className={styles.type_tabs}>
          <button
            type="button"
            className={`${styles.type_tab} ${chatType === "group" ? styles.type_tab_active : ""}`}
            onClick={() => setChatType("group")}
          >
            <Icon name="Users" size={16} />
            <span>Tạo nhóm học tập</span>
          </button>
          <button
            type="button"
            className={`${styles.type_tab} ${chatType === "direct" ? styles.type_tab_active : ""}`}
            onClick={() => {
              setChatType("direct");
              if (selectedMemberIds.length > 1) {
                setSelectedMemberIds([selectedMemberIds[0]]);
              }
            }}
          >
            <Icon name="MessageSquare" size={16} />
            <span>Nhắn tin 1-1</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className={styles.form_body}>
          {/* Group Specific Fields */}
          {chatType === "group" && (
            <>
              {/* Group Name using reusable FormField component */}
              <FormField
                label="Tên nhóm học tập"
                required
                placeholder="Ví dụ: Study Group ReactJS, Team Thuật Toán..."
                value={groupName}
                onChange={(e) => setGroupName(e.target.value)}
                leftIcon="Edit"
                maxLength={60}
                className={styles.group_name_field}
              />

              {/* Group Avatar Presets */}
              <div className={styles.avatar_preset_section}>
                <label className={styles.form_section_label}>Chọn ảnh đại diện nhóm</label>
                <div className={styles.avatar_presets}>
                  {GROUP_AVATAR_PRESETS.map((url, idx) => (
                    <button
                      key={idx}
                      type="button"
                      className={`${styles.avatar_preset_btn} ${
                        selectedAvatar === url ? styles.avatar_preset_selected : ""
                      }`}
                      onClick={() => setSelectedAvatar(url)}
                      title={`Preset ${idx + 1}`}
                    >
                      <img src={url} alt={`Preset ${idx + 1}`} />
                      {selectedAvatar === url && (
                        <span className={styles.preset_check}>
                          <Icon name="Check" size={12} strokeWidth={3} />
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* Members Selection Section */}
          <div className={styles.members_section}>
            <div className={styles.members_header_row}>
              <label className={styles.form_section_label}>
                {chatType === "group" ? "Thêm thành viên vào nhóm" : "Chọn người nhận tin nhắn"}
              </label>
              {chatType === "group" && selectedMemberIds.length > 0 && (
                <Badge variant="primary" size="sm" icon="Users">
                  Đã chọn {selectedMemberIds.length} người
                </Badge>
              )}
            </div>

            {/* Member Search using reusable FormField */}
            <FormField
              placeholder="Tìm bạn bè theo tên hoặc handle (@username)..."
              value={searchMember}
              onChange={(e) => setSearchMember(e.target.value)}
              leftIcon="Search"
              rightIcon={searchMember ? "X" : null}
              onRightIconClick={searchMember ? () => setSearchMember("") : undefined}
              className={styles.search_field}
            />

            {/* Friends Scrollable List with Reusable ScrollArea */}
            <div className={styles.friends_container}>
              <ScrollArea maxHeight="195px" className={styles.friends_scroll_area}>
                {loadingFriends ? (
                  <div className={styles.loading_state}>
                    <span className={styles.spinner} />
                    <span>Đang tải danh sách bạn bè...</span>
                  </div>
                ) : filteredFriends.length > 0 ? (
                  <div className={styles.friends_list}>
                    {filteredFriends.map((friend) => {
                      const friendId = friend.id || friend._id;
                      const isSelected = selectedMemberIds.includes(friendId);

                      return (
                        <div
                          key={friendId}
                          className={`${styles.friend_row} ${
                            isSelected ? styles.friend_row_selected : ""
                          }`}
                          onClick={() => toggleSelectMember(friendId)}
                          role="button"
                          tabIndex={0}
                        >
                          <div className={styles.friend_avatar_wrap}>
                            <img
                              src={friend.avatar}
                              alt={friend.name || friend.username}
                              className={styles.friend_avatar}
                            />
                            <span
                              className={`${styles.friend_status_dot} ${
                                friend.status === "online"
                                  ? styles.status_online
                                  : styles.status_offline
                              }`}
                            />
                          </div>

                          <div className={styles.friend_meta}>
                            <span className={styles.friend_name}>
                              {friend.name || friend.username}
                            </span>
                            <span className={styles.friend_handle}>
                              @{friend.handle || (friend.username || "student").toLowerCase()} •{" "}
                              {friend.currentActivity || "Học viên FySet"}
                            </span>
                          </div>

                          <div className={styles.checkbox_wrap}>
                            <div
                              className={`${styles.custom_checkbox} ${
                                isSelected ? styles.checkbox_checked : ""
                              }`}
                            >
                              {isSelected && <Icon name="Check" size={14} strokeWidth={3} />}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <EmptyState
                    iconName="UserX"
                    title="Không tìm thấy bạn bè"
                    description="Không có bạn bè nào khớp với từ khóa tìm kiếm."
                    actionLabel={searchMember ? "Xóa tìm kiếm" : undefined}
                    onAction={searchMember ? () => setSearchMember("") : undefined}
                    className={styles.compact_empty}
                  />
                )}
              </ScrollArea>
            </div>
          </div>

          {/* Modal Footer using reusable Button components */}
          <div className={styles.modal_footer}>
            <Button
              type="button"
              variant="outlined"
              onClick={onClose}
              className={styles.action_btn}
            >
              Hủy bỏ
            </Button>
            <Button
              type="submit"
              variant="contained"
              rightIcon={chatType === "group" ? "Users" : "Send"}
              className={styles.action_btn}
            >
              {chatType === "group" ? "Tạo nhóm ngay" : "Bắt đầu nhắn tin"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
