import React, { useState } from "react";
import AdminContestList from "./components/AdminContestList/AdminContestList";
import AdminContestDetail from "./components/AdminContestDetail/AdminContestDetail";
import AdminContestModal from "./components/AdminContestModal/AdminContestModal";
import { INITIAL_CONTESTS } from "~/constants/mockAdminContest";
import { useToast } from "~/context/ToastContext.jsx";

export default function AdminContestTab() {
  const { toast } = useToast();
  const [contests, setContests] = useState(INITIAL_CONTESTS);
  const [selectedContest, setSelectedContest] = useState(null); // null = List View, Object = Detail View
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddContest = () => {
    setIsModalOpen(true);
  };

  const handleSaveModal = (formData) => {
    const newContest = {
      id: `cnt-${Date.now()}`,
      ...formData,
      participantsCount: 0,
      activeParticipants: 0,
      registrationTime: "Đang mở",
      problems: [],
    };
    setContests([newContest, ...contests]);
    toast.success(`Đã tạo kỳ thi mới "${formData.title}"`, "Thành công");
  };

  const handleSaveDetail = (updatedContest) => {
    setContests(contests.map((c) => (c.id === updatedContest.id ? updatedContest : c)));
    setSelectedContest(updatedContest);
  };

  const handleDeleteContest = (id) => {
    setContests(contests.filter((c) => c.id !== id));
    if (selectedContest && selectedContest.id === id) {
      setSelectedContest(null);
    }
  };

  return (
    <>
      {selectedContest ? (
        <AdminContestDetail
          contest={selectedContest}
          onBack={() => setSelectedContest(null)}
          onSave={handleSaveDetail}
        />
      ) : (
        <AdminContestList
          contests={contests}
          onSelectContest={setSelectedContest}
          onAddContest={handleAddContest}
          onDeleteContest={handleDeleteContest}
        />
      )}

      <AdminContestModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveModal}
      />
    </>
  );
}
