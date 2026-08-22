import React, { useState } from "react";
import AdminSidebar from "./components/AdminSidebar/AdminSidebar";
import AdminHeader from "./components/AdminHeader/AdminHeader";
import AdminStatsCards from "./components/AdminStatsCards/AdminStatsCards";
import AdminEmptyState from "./components/AdminEmptyState/AdminEmptyState";
import AdminCourseTab from "./tabs/Course/AdminCourseTab";
import AdminProblemTab from "./tabs/Problem/AdminProblemTab";
import AdminContestTab from "./tabs/Contest/AdminContestTab";
import AdminUserTab from "./tabs/User/AdminUserTab";
import AdminCommentTab from "./tabs/Comment/AdminCommentTab";
import AdminBlogTab from "./tabs/Blog/AdminBlogTab";
import AdminMessageTab from "./tabs/Message/AdminMessageTab";
import AdminFeedbackTab from "./tabs/Feedback/AdminFeedbackTab";
import { Card, ScrollArea } from "~/components/ui";
import styles from "./Admin.module.css";

export default function Admin() {
  const [activeTab, setActiveTab] = useState(null);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  const renderTabContent = () => {
    if (activeTab === null) {
      return <AdminEmptyState />;
    }

    if (activeTab === "course") {
      return <AdminCourseTab />;
    }

    if (activeTab === "problem") {
      return <AdminProblemTab />;
    }

    if (activeTab === "contest") {
      return <AdminContestTab />;
    }

    if (activeTab === "user") {
      return <AdminUserTab />;
    }

    if (activeTab === "comment") {
      return <AdminCommentTab />;
    }

    if (activeTab === "blog") {
      return <AdminBlogTab />;
    }

    if (activeTab === "message") {
      return <AdminMessageTab />;
    }

    if (activeTab === "feedback") {
      return <AdminFeedbackTab />;
    }

    return (
      <div className={styles.tab_content_container}>
        <Card className={styles.placeholder_card}>
          <h3 className={styles.placeholder_title}>
            Tab [{activeTab.toUpperCase()}] đang được chuẩn bị
          </h3>
          <p className={styles.placeholder_text}>
            Nội dung chi tiết của danh mục quản lý này sẽ được tích hợp tiếp theo. Hãy bấm chọn tab khác hoặc quay lại trạng thái ban đầu.
          </p>
          <button
            type="button"
            className={styles.reset_btn}
            onClick={() => setActiveTab(null)}
          >
            Quay lại màn hình chờ (Scuba Cat)
          </button>
        </Card>
      </div>
    );
  };

  return (
    <div className={styles.admin_layout}>
      {/* 1. Sidebar Navigation */}
      <AdminSidebar
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        isMobileOpen={isMobileSidebarOpen}
        onCloseMobile={() => setIsMobileSidebarOpen(false)}
      />

      {/* 2. Main Content Container */}
      <div className={styles.main_content}>
        {/* Top Header */}
        <AdminHeader
          onToggleMobileSidebar={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
        />

        {/* Scrollable Workspace View */}
        <ScrollArea className={styles.scroll_workspace}>
          <div className={styles.workspace_inner}>
            {/* Standard Metrics Cards */}
            <div className={styles.stats_section}>
              <AdminStatsCards />
            </div>

            {/* Dynamic Active Tab Render */}
            <div className={styles.tab_render_area}>
              {renderTabContent()}
            </div>
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}
