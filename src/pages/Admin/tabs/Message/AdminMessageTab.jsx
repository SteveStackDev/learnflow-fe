import React, { useState } from "react";
import AdminMessageOverview from "./components/AdminMessageOverview/AdminMessageOverview";
import AdminMessageList from "./components/AdminMessageList/AdminMessageList";
import AdminMessageDetail from "./components/AdminMessageDetail/AdminMessageDetail";
import AdminMessageModal from "./components/AdminMessageModal/AdminMessageModal";
import { INITIAL_MESSAGE_OVERVIEW, INITIAL_CONVERSATIONS } from "~/constants/mockAdminMessage";

export default function AdminMessageTab() {
  const [conversations, setConversations] = useState(INITIAL_CONVERSATIONS);
  const [selectedConv, setSelectedConv] = useState(null); // null = List/Overview View, Object = Detail View
  const [modalConv, setModalConv] = useState(null);

  const handleDeleteConv = (id) => {
    setConversations(conversations.filter((c) => c.id !== id));
    if (selectedConv && selectedConv.id === id) {
      setSelectedConv(null);
    }
  };

  const handleConfirmModal = () => {
    if (modalConv) {
      handleDeleteConv(modalConv.id);
      setModalConv(null);
    }
  };

  return (
    <div style={{ padding: 32, display: "flex", flexDirection: "column", gap: 32, boxSizing: "border-box" }}>
      {selectedConv ? (
        <AdminMessageDetail
          conversation={selectedConv}
          onBack={() => setSelectedConv(null)}
          onDelete={handleDeleteConv}
        />
      ) : (
        <>
          {/* 1. Message Overview & Statistics */}
          <AdminMessageOverview overviewData={INITIAL_MESSAGE_OVERVIEW} />

          {/* 2. Conversation Monitoring Table */}
          <AdminMessageList
            conversations={conversations}
            onSelectConversation={setSelectedConv}
          />
        </>
      )}

      <AdminMessageModal
        isOpen={Boolean(modalConv)}
        onClose={() => setModalConv(null)}
        onConfirm={handleConfirmModal}
        conversation={modalConv}
      />
    </div>
  );
}
