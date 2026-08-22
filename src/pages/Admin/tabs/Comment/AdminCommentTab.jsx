import React, { useState } from "react";
import AdminCommentList from "./components/AdminCommentList/AdminCommentList";
import AdminCommentDetail from "./components/AdminCommentDetail/AdminCommentDetail";
import AdminCommentModal from "./components/AdminCommentModal/AdminCommentModal";
import { INITIAL_COMMENTS } from "~/constants/mockAdminComment";
import { useToast } from "~/context/ToastContext.jsx";

export default function AdminCommentTab() {
  const { toast } = useToast();
  const [comments, setComments] = useState(INITIAL_COMMENTS);
  const [selectedComment, setSelectedComment] = useState(null); // null = List View, Object = Detail View
  const [modalComment, setModalComment] = useState(null);

  const handleSaveDetail = (updatedComment) => {
    setComments(comments.map((c) => (c.id === updatedComment.id ? updatedComment : c)));
    setSelectedComment(updatedComment);
  };

  const handleDeleteComment = (id) => {
    setComments(comments.filter((c) => c.id !== id));
    if (selectedComment && selectedComment.id === id) {
      setSelectedComment(null);
    }
  };

  const handleToggleHideComment = (id) => {
    setComments(
      comments.map((c) => {
        if (c.id === id) {
          const nextStatus = c.status === "Hidden" ? "Published" : "Hidden";
          toast.info(`Đã ${nextStatus === "Hidden" ? "ẩn" : "hiện"} bình luận`);
          return { ...c, status: nextStatus };
        }
        return c;
      })
    );
  };

  const handleConfirmModalAction = () => {
    if (modalComment) {
      handleToggleHideComment(modalComment.id);
      setModalComment(null);
    }
  };

  return (
    <>
      {selectedComment ? (
        <AdminCommentDetail
          comment={selectedComment}
          onBack={() => setSelectedComment(null)}
          onSave={handleSaveDetail}
          onDelete={handleDeleteComment}
        />
      ) : (
        <AdminCommentList
          comments={comments}
          onSelectComment={setSelectedComment}
          onDeleteComment={handleDeleteComment}
          onToggleHideComment={handleToggleHideComment}
        />
      )}

      <AdminCommentModal
        isOpen={Boolean(modalComment)}
        onClose={() => setModalComment(null)}
        onConfirm={handleConfirmModalAction}
        comment={modalComment}
      />
    </>
  );
}
