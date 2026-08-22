import React, { useState } from "react";
import Icon from "~/components/Icon/Icon";
import { Button, Badge } from "~/components/ui";
import { useToast } from "~/context/ToastContext.jsx";
import useScrollReveal from "~/hooks/useScrollReveal";
import styles from "./AdminContestDetail.module.css";

import AdminContestOverviewTab from "../AdminContestOverviewTab/AdminContestOverviewTab";
import AdminContestProblemsTab from "../AdminContestProblemsTab/AdminContestProblemsTab";
import AdminContestParticipantsTab from "../AdminContestParticipantsTab/AdminContestParticipantsTab";
import AdminContestRankingsTab from "../AdminContestRankingsTab/AdminContestRankingsTab";
import AdminContestStatisticsTab from "../AdminContestStatisticsTab/AdminContestStatisticsTab";

export default function AdminContestDetail({ contest, onBack, onSave }) {
  const { toast } = useToast();
  const [subTab, setSubTab] = useState("overview"); // overview | problems | participants | rankings | statistics
  const [contestState, setContestState] = useState(contest || {});

  useScrollReveal(".reveal-card", [subTab]);

  if (!contest) return null;

  const handleSaveAll = () => {
    if (onSave) onSave(contestState);
    toast.success(`Đã lưu toàn bộ thay đổi cho kỳ thi "${contestState.title}"`, "Thành công");
  };

  const getStatusVariant = (status) => {
    if (status === "Live") return "success";
    if (status === "Upcoming") return "primary";
    return "secondary";
  };

  return (
    <div className={styles.container}>
      {/* 1. Header Navigation Bar */}
      <div className={`${styles.header_bar} reveal-card`}>
        <div className={styles.left_wrap}>
          <button type="button" className={styles.back_btn} onClick={onBack}>
            <Icon name="ArrowLeft" size={18} />
            <span>Back to Contests</span>
          </button>
          <h2 className={styles.detail_title}>CONTEST: {contestState.title}</h2>
          <Badge variant={getStatusVariant(contestState.status)} size="sm">
            {contestState.status}
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
          { id: "overview", label: "Overview", icon: "Info" },
          { id: "problems", label: `Problems (${(contestState.problems || []).length})`, icon: "Layers" },
          { id: "participants", label: "Participants", icon: "Users" },
          { id: "rankings", label: "Rankings", icon: "Trophy" },
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
        {subTab === "overview" && (
          <AdminContestOverviewTab contestState={contestState} setContestState={setContestState} />
        )}
        {subTab === "problems" && (
          <AdminContestProblemsTab contestState={contestState} setContestState={setContestState} />
        )}
        {subTab === "participants" && <AdminContestParticipantsTab />}
        {subTab === "rankings" && <AdminContestRankingsTab />}
        {subTab === "statistics" && <AdminContestStatisticsTab contestState={contestState} />}
      </div>
    </div>
  );
}
