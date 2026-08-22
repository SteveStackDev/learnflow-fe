import React, { useState } from "react";
import Icon from "~/components/Icon/Icon";
import { Badge, Pagination } from "~/components/ui";
import useScrollReveal from "~/hooks/useScrollReveal";
import styles from "./AdminMessageList.module.css";

export default function AdminMessageList({ conversations = [], onSelectConversation }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useScrollReveal(".reveal-card", [conversations, currentPage, searchTerm]);

  // Filter conversations
  const filteredConvs = conversations.filter((c) => {
    const matchesSearch =
      c.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.userA.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.userB.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  const totalPages = Math.ceil(filteredConvs.length / itemsPerPage) || 1;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentConvs = filteredConvs.slice(startIndex, startIndex + itemsPerPage);

  const getStatusVariant = (status) => {
    if (status === "Active") return "success";
    if (status === "Reported") return "danger";
    return "secondary";
  };

  return (
    <div className={`${styles.card} reveal-card`}>
      <div className={styles.card_header}>
        <h3 className={styles.card_title}>
          <Icon name="MessageSquare" size={18} /> Conversation Monitoring
        </h3>

        <div className={styles.search_wrapper}>
          <Icon name="Search" size={16} className={styles.search_icon} />
          <input
            type="text"
            placeholder="Search conversation..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={styles.search_input}
          />
        </div>
      </div>

      <div className={styles.table_wrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Conversation ID</th>
              <th>Participants</th>
              <th>Messages</th>
              <th>Last Active</th>
              <th>Reports</th>
              <th>Status</th>
              <th style={{ textAlign: "right" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentConvs.length === 0 ? (
              <tr>
                <td colSpan={7} style={{ textAlign: "center", padding: 30, opacity: 0.7 }}>
                  Không tìm thấy cuộc trò chuyện nào.
                </td>
              </tr>
            ) : (
              currentConvs.map((conv) => (
                <tr
                  key={conv.id}
                  onClick={() => onSelectConversation(conv)}
                  style={{ cursor: "pointer" }}
                >
                  <td><span style={{ fontFamily: "monospace", fontWeight: 700 }}>{conv.id}</span></td>
                  <td>
                    <div className={styles.participants_wrap}>
                      <div className={styles.avatar_stack}>
                        <img src={conv.userA.avatar} alt={conv.userA.name} className={styles.avatar_stacked} />
                        <img src={conv.userB.avatar} alt={conv.userB.name} className={styles.avatar_stacked} />
                      </div>
                      <span style={{ fontWeight: 700, fontSize: "0.85rem" }}>
                        {conv.userA.name} & {conv.userB.name}
                      </span>
                    </div>
                  </td>
                  <td><span style={{ fontWeight: 700 }}>{conv.messagesCount}</span></td>
                  <td><span style={{ fontSize: "0.825rem", opacity: 0.8 }}>{conv.lastActive}</span></td>
                  <td>
                    <Badge variant={conv.reportsCount > 0 ? "danger" : "secondary"} size="sm">
                      {conv.reportsCount} report(s)
                    </Badge>
                  </td>
                  <td>
                    <Badge variant={getStatusVariant(conv.status)} size="sm">
                      {conv.status}
                    </Badge>
                  </td>
                  <td onClick={(e) => e.stopPropagation()}>
                    <div style={{ display: "flex", justifyContent: "flex-end" }}>
                      <button
                        type="button"
                        className={styles.action_btn}
                        title="Xem giám sát hội thoại"
                        onClick={() => onSelectConversation(conv)}
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

      <div className={styles.pagination_bar}>
        <span className={styles.page_info}>
          Showing {filteredConvs.length > 0 ? startIndex + 1 : 0} to{" "}
          {Math.min(startIndex + itemsPerPage, filteredConvs.length)} of {filteredConvs.length} conversations
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
