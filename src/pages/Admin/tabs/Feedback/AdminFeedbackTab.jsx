import React, { useState } from "react";
import AdminFeedbackList from "./components/AdminFeedbackList/AdminFeedbackList";
import AdminFeedbackDetail from "./components/AdminFeedbackDetail/AdminFeedbackDetail";
import AdminFeedbackModal from "./components/AdminFeedbackModal/AdminFeedbackModal";
import { INITIAL_FEEDBACKS } from "~/constants/mockAdminFeedback";

export default function AdminFeedbackTab() {
  const [feedbacks, setFeedbacks] = useState(INITIAL_FEEDBACKS);
  const [selectedFeedback, setSelectedFeedback] = useState(null); // null = List View, Object = Detail View
  const [modalFeedback, setModalFeedback] = useState(null);

  const handleSaveDetail = (updatedFeedback) => {
    setFeedbacks(feedbacks.map((f) => (f.id === updatedFeedback.id ? updatedFeedback : f)));
    setSelectedFeedback(updatedFeedback);
  };

  const handleConfirmModal = () => {
    if (modalFeedback) {
      setModalFeedback(null);
    }
  };

  return (
    <>
      {selectedFeedback ? (
        <AdminFeedbackDetail
          feedback={selectedFeedback}
          onBack={() => setSelectedFeedback(null)}
          onSave={handleSaveDetail}
        />
      ) : (
        <AdminFeedbackList
          feedbacks={feedbacks}
          onSelectFeedback={setSelectedFeedback}
        />
      )}

      <AdminFeedbackModal
        isOpen={Boolean(modalFeedback)}
        onClose={() => setModalFeedback(null)}
        onConfirm={handleConfirmModal}
        feedback={modalFeedback}
      />
    </>
  );
}
