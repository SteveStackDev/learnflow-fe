import React, { useState } from "react";
import Icon from "~/components/Icon/Icon";
import { Button, Badge } from "~/components/ui";
import { useToast } from "~/context/ToastContext.jsx";
import useScrollReveal from "~/hooks/useScrollReveal";
import styles from "./AdminProblemDetail.module.css";
import AdminProblemEditorTab from "../AdminProblemEditorTab/AdminProblemEditorTab";
import AdminProblemTestCasesTab from "../AdminProblemTestCasesTab/AdminProblemTestCasesTab";
import AdminProblemLanguagesTab from "../AdminProblemLanguagesTab/AdminProblemLanguagesTab";
import AdminProblemStatisticsTab from "../AdminProblemStatisticsTab/AdminProblemStatisticsTab";

export default function AdminProblemDetail({ problem, onBack, onSave }) {
  const { toast } = useToast();
  const [subTab, setSubTab] = useState("editor"); // editor | testcases | languages | statistics
  const [problemState, setProblemState] = useState(problem || {});

  useScrollReveal(".reveal-card", [subTab]);

  if (!problem) return null;

  const handleSaveAll = () => {
    if (onSave) onSave(problemState);
    toast.success(`Đã lưu toàn bộ thay đổi cho bài tập "${problemState.title}"`, "Thành công");
  };

  const toggleLanguage = (langName) => {
    const currentLangs = problemState.supportedLanguages || [];
    const updated = currentLangs.includes(langName)
      ? currentLangs.filter((l) => l !== langName)
      : [...currentLangs, langName];
    setProblemState({ ...problemState, supportedLanguages: updated });
    toast.info(`Đã cập nhật danh sách ngôn ngữ cho bài tập`, "Cấu hình ngôn ngữ");
  };

  const getDiffVariant = (diff) => {
    if (diff === "Easy") return "success";
    if (diff === "Medium") return "warning";
    return "danger";
  };

  return (
    <div className={styles.container}>
      {/* 1. Header Navigation Bar */}
      <div className={`${styles.header_bar} reveal-card`}>
        <div className={styles.left_wrap}>
          <button type="button" className={styles.back_btn} onClick={onBack}>
            <Icon name="ArrowLeft" size={18} />
            <span>Back to Problems</span>
          </button>
          <h2 className={styles.detail_title}>PROBLEM: {problemState.title}</h2>
          <Badge variant={getDiffVariant(problemState.difficulty)} size="sm">
            {problemState.difficulty}
          </Badge>
          <Badge variant={problemState.status === "Active" ? "success" : "secondary"} size="sm">
            {problemState.status}
          </Badge>
        </div>

        <div className={styles.header_actions}>
          <Button variant="outline" size="sm" onClick={onBack}>
            Cancel
          </Button>
          <Button variant="primary" size="sm" onClick={handleSaveAll}>
            <Icon name="Save" size={16} />
            <span>Save Changes</span>
          </Button>
        </div>
      </div>

      {/* 2. Sub-Tabs Bar */}
      <div className={`${styles.tabs_bar} reveal-card`}>
        {[
          { id: "editor", label: "Basic Info & Description", icon: "FileText" },
          { id: "testcases", label: `Test Cases (${(problemState.testCases || []).length})`, icon: "CheckSquare" },
          { id: "languages", label: `Supported Languages (${(problemState.supportedLanguages || []).length})`, icon: "Code" },
          { id: "statistics", label: "Statistics", icon: "BarChart2" },
        ].map((tab) => {
          const isActive = subTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              className={`${styles.tab_item} ${isActive ? styles.tab_active : ""}`}
              onClick={() => setSubTab(tab.id)}
            >
              <Icon name={tab.icon} size={16} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* 3. Sub-Tab Body */}
      <div className="reveal-card">
        {subTab === "editor" && (
          <AdminProblemEditorTab problemState={problemState} setProblemState={setProblemState} />
        )}
        {subTab === "testcases" && <AdminProblemTestCasesTab problemState={problemState} />}
        {subTab === "languages" && (
          <AdminProblemLanguagesTab
            supportedLanguages={problemState.supportedLanguages || []}
            toggleLanguage={toggleLanguage}
          />
        )}
        {subTab === "statistics" && <AdminProblemStatisticsTab problemState={problemState} />}
      </div>
    </div>
  );
}
