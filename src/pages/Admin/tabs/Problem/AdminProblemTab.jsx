import React, { useState } from "react";
import { INITIAL_PROBLEMS } from "~/constants/mockAdminProblem";
import AdminProblemList from "./components/AdminProblemList/AdminProblemList";
import AdminProblemDetail from "./components/AdminProblemDetail/AdminProblemDetail";
import AdminProblemModal from "./components/AdminProblemModal/AdminProblemModal";

export default function AdminProblemTab() {
  const [problems, setProblems] = useState(INITIAL_PROBLEMS);
  const [selectedProblemId, setSelectedProblemId] = useState(null); // null = List view, id = Detail view
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProblem, setEditingProblem] = useState(null);

  // View Problem Detail Editor
  const handleViewProblem = (id) => {
    setSelectedProblemId(id);
  };

  // Back to Problem List
  const handleBackToList = () => {
    setSelectedProblemId(null);
  };

  // Quick Modal Add / Edit
  const handleOpenAddModal = () => {
    setEditingProblem(null);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (problem) => {
    setEditingProblem(problem);
    setIsModalOpen(true);
  };

  const handleSaveModal = (formData) => {
    if (editingProblem) {
      setProblems(
        problems.map((p) =>
          p.id === editingProblem.id ? { ...p, ...formData } : p
        )
      );
    } else {
      const nextNum = problems.length + 1;
      const codeStr = nextNum < 10 ? `0${nextNum}` : `${nextNum}`;
      const newProblem = {
        id: `prob-${Date.now()}`,
        code: codeStr,
        title: formData.title,
        slug: formData.title.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
        difficulty: formData.difficulty || "Easy",
        topic: formData.topic || "Array & Hashing",
        solved: 0,
        acceptanceRate: 0,
        status: formData.status || "Active",
        description: formData.description || "",
        supportedLanguages: ["C++", "Java", "Python", "JavaScript"],
        examples: [],
        testCases: [],
      };
      setProblems([newProblem, ...problems]);
    }
    setIsModalOpen(false);
  };

  // Save Detail Editor
  const handleSaveDetail = (updatedProblem) => {
    setProblems(
      problems.map((p) => (p.id === updatedProblem.id ? updatedProblem : p))
    );
    setSelectedProblemId(null);
  };

  // Duplicate Problem
  const handleDuplicateProblem = (prob) => {
    const copy = {
      ...prob,
      id: `prob-${Date.now()}`,
      code: `${prob.code || "0"}-COPY`,
      title: `${prob.title} (Copy)`,
      slug: `${prob.slug}-copy`,
      solved: 0,
      status: "Draft",
    };
    setProblems([copy, ...problems]);
  };

  // Toggle Status (Publish / Draft)
  const handleToggleStatus = (id) => {
    setProblems(
      problems.map((p) => {
        if (p.id === id) {
          const nextStatus = p.status === "Active" ? "Draft" : "Active";
          return { ...p, status: nextStatus };
        }
        return p;
      })
    );
  };

  // Delete Problem
  const handleDeleteProblem = (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa bài tập thuật toán này không?")) {
      setProblems(problems.filter((p) => p.id !== id));
      if (selectedProblemId === id) {
        setSelectedProblemId(null);
      }
    }
  };

  const currentSelectedProblem = problems.find((p) => p.id === selectedProblemId);

  return (
    <div>
      {selectedProblemId !== null && currentSelectedProblem ? (
        <AdminProblemDetail
          problem={currentSelectedProblem}
          onBack={handleBackToList}
          onSave={handleSaveDetail}
        />
      ) : (
        <AdminProblemList
          problems={problems}
          onAddProblem={handleOpenAddModal}
          onViewProblem={handleViewProblem}
          onEditProblem={handleOpenEditModal}
          onDuplicateProblem={handleDuplicateProblem}
          onToggleStatus={handleToggleStatus}
          onDeleteProblem={handleDeleteProblem}
        />
      )}

      {/* Quick Modal */}
      <AdminProblemModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveModal}
        initialData={editingProblem}
      />
    </div>
  );
}
