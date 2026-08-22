import React, { useState } from "react";
import Icon from "~/components/Icon/Icon";
import { Button, Badge } from "~/components/ui";
import { useToast } from "~/context/ToastContext.jsx";
import useScrollReveal from "~/hooks/useScrollReveal";
import styles from "./AdminUserDetail.module.css";

import AdminUserOverviewTab from "../AdminUserOverviewTab/AdminUserOverviewTab";
import AdminUserActivityTab from "../AdminUserActivityTab/AdminUserActivityTab";
import AdminUserCoursesTab from "../AdminUserCoursesTab/AdminUserCoursesTab";
import AdminUserProblemsTab from "../AdminUserProblemsTab/AdminUserProblemsTab";
import AdminUserContestsTab from "../AdminUserContestsTab/AdminUserContestsTab";
import AdminUserBadgesTab from "../AdminUserBadgesTab/AdminUserBadgesTab";
import AdminUserTransactionsTab from "../AdminUserTransactionsTab/AdminUserTransactionsTab";
import AdminUserCommentsTab from "../AdminUserCommentsTab/AdminUserCommentsTab";
import AdminUserReportsTab from "../AdminUserReportsTab/AdminUserReportsTab";

export default function AdminUserDetail({ user, onBack, onSave }) {
  const { toast } = useToast();
  const [subTab, setSubTab] = useState("overview");
  const [userState, setUserState] = useState(user || {});

  useScrollReveal(".reveal-card", [subTab]);

  if (!user) return null;

  const handleBlockUser = () => {
    const nextStatus = userState.status === "Blocked" ? "Active" : "Blocked";
    const updated = { ...userState, status: nextStatus };
    setUserState(updated);
    if (onSave) onSave(updated);
    toast.warning(`Đã ${nextStatus === "Blocked" ? "tạm khóa" : "mở khóa"} tài khoản "${userState.name}"`);
  };

  const handleBanUser = () => {
    const nextStatus = userState.status === "Banned" ? "Active" : "Banned";
    const updated = { ...userState, status: nextStatus };
    setUserState(updated);
    if (onSave) onSave(updated);
    toast.danger(`Đã ${nextStatus === "Banned" ? "CẤM vĩnh viễn" : "gỡ lệnh cấm"} tài khoản "${userState.name}"`);
  };

  const getStatusVariant = (status) => {
    if (status === "Active") return "success";
    if (status === "Blocked") return "warning";
    return "danger";
  };

  return (
    <div className={styles.container}>
      {/* 1. Profile Header Card */}
      <div className={`${styles.profile_card} reveal-card`}>
        <div className={styles.profile_main}>
          <img src={userState.avatar} alt={userState.name} className={styles.avatar_lg} />
          <div>
            <h2 className={styles.user_name_large}>{userState.name}</h2>
            <p className={styles.email_sub}>{userState.email} (@{userState.username})</p>
            <div className={styles.badges_row}>
              <Badge variant={userState.role === "Admin" ? "danger" : "secondary"} size="sm">
                Role: {userState.role}
              </Badge>
              <Badge variant={userState.plan === "Pro" ? "primary" : "secondary"} size="sm">
                Plan: {userState.plan}
              </Badge>
              <Badge variant={getStatusVariant(userState.status)} size="sm">
                Status: {userState.status}
              </Badge>
            </div>
          </div>
        </div>

        <div className={styles.header_actions}>
          <Button variant="outline" size="sm" onClick={onBack}>
            <Icon name="ArrowLeft" size={16} />
            <span>Back to Users</span>
          </Button>
          <Button variant="outline" size="sm" className={styles.block_btn} onClick={handleBlockUser}>
            <Icon name="Lock" size={16} />
            <span>{userState.status === "Blocked" ? "Unblock User" : "Block User"}</span>
          </Button>
          <Button variant="outline" size="sm" className={styles.ban_btn} onClick={handleBanUser}>
            <Icon name="Slash" size={16} />
            <span>{userState.status === "Banned" ? "Unban User" : "Ban User"}</span>
          </Button>
        </div>
      </div>

      {/* 2. Sub-Tabs Bar (9 Sub-Tabs) */}
      <div className={`${styles.tabs_bar} reveal-card`}>
        {[
          { id: "overview", label: "Overview", icon: "Info" },
          { id: "activity", label: "Activity Logs", icon: "Activity" },
          { id: "courses", label: `Courses (${(userState.coursesEnrolled || []).length})`, icon: "BookOpen" },
          { id: "problems", label: `Problems (${(userState.solvedProblems || []).length})`, icon: "Code" },
          { id: "contests", label: `Contests (${(userState.contestsParticipated || []).length})`, icon: "Trophy" },
          { id: "badges", label: `Badges (${(userState.badgesEarned || []).length})`, icon: "Award" },
          { id: "transactions", label: "Transactions", icon: "CreditCard" },
          { id: "comments", label: `Comments (${userState.commentsCount || 0})`, icon: "MessageSquare" },
          { id: "reports", label: `Reports (${userState.reportsCount || 0})`, icon: "ShieldAlert" },
        ].map((tab) => {
          const isActive = subTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              className={`${styles.tab_item} ${isActive ? styles.tab_active : ""}`}
              onClick={() => setSubTab(tab.id)}
            >
              <Icon name={tab.icon} size={15} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* 3. Sub-Tab Body */}
      <div className="reveal-card">
        {subTab === "overview" && <AdminUserOverviewTab userState={userState} setUserState={setUserState} />}
        {subTab === "activity" && <AdminUserActivityTab userState={userState} />}
        {subTab === "courses" && <AdminUserCoursesTab userState={userState} />}
        {subTab === "problems" && <AdminUserProblemsTab userState={userState} />}
        {subTab === "contests" && <AdminUserContestsTab userState={userState} />}
        {subTab === "badges" && <AdminUserBadgesTab userState={userState} />}
        {subTab === "transactions" && <AdminUserTransactionsTab userState={userState} />}
        {subTab === "comments" && <AdminUserCommentsTab userState={userState} />}
        {subTab === "reports" && <AdminUserReportsTab userState={userState} />}
      </div>
    </div>
  );
}
