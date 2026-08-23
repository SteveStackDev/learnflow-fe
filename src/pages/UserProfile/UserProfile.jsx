import React, { useState } from "react";
import { useParams } from "react-router";
import useScrollReveal from "~/hooks/useScrollReveal";
import Icon from "~/components/Icon/Icon";
import ProfileCoverHeader from "./components/ProfileCoverHeader/ProfileCoverHeader";

// 5 System Navigation Tabs
import ProfileOverviewTab from "./tabs/ProfileOverviewTab";
import ProfileBlogTab from "./tabs/ProfileBlogTab";
import ProfileProjectsTab from "./tabs/ProfileProjectsTab";
import ProfileBadgesTab from "./tabs/ProfileBadgesTab";
import ProfileNetworkTab from "./tabs/ProfileNetworkTab";

import UserProfileCardModal from "~/components/UserProfileCardModal/UserProfileCardModal";
import { mockUsersMap, mockUserProfileData } from "~/constants/mockUserProfile";
import styles from "./UserProfile.module.css";

export default function UserProfile() {
  useScrollReveal();
  const { id } = useParams();

  const [activeTab, setActiveTab] = useState("overview"); // 'overview' | 'blog' | 'projects' | 'badges' | 'network'
  const [selectedUserForModal, setSelectedUserForModal] = useState(null);

  // Dynamic user lookup from URL params or default to mock profile
  const isSelf = !id || id === "user-01";
  const currentUserData = (id && mockUsersMap[id]) ? mockUsersMap[id] : mockUserProfileData;
  const user = {
    ...currentUserData,
    isSelf: isSelf,
  };

  const handleOpenUserModal = (targetUser) => {
    setSelectedUserForModal(targetUser || mockUsersMap["user-02"]);
  };

  const articlesCount = user.articles?.length || 0;
  const projectsCount = user.projects?.length || 0;
  const badgesCount = user.badgesCollection?.length || 0;
  const networkCount = (user.network?.friends?.length || 0) + (user.network?.followers?.length || 0);

  return (
    <div className={styles.profile_page}>
      <div className={styles.profile_container}>
        {/* Khối 1: Header Section (Cover Banner + Avatar + Badges + Info + Context Actions) */}
        <ProfileCoverHeader user={user} />

        {/* Khối 2: System Navigation Tabs Bar */}
        <div className={`${styles.tabs_navigation_bar} reveal-card`}>
          <button
            type="button"
            className={`${styles.tab_button} ${activeTab === "overview" ? styles.tab_active : ""}`}
            onClick={() => setActiveTab("overview")}
          >
            <Icon name="Layout" size={16} />
            <span>1. Overview (Tổng quan)</span>
          </button>

          <button
            type="button"
            className={`${styles.tab_button} ${activeTab === "blog" ? styles.tab_active : ""}`}
            onClick={() => setActiveTab("blog")}
          >
            <Icon name="FileText" size={16} />
            <span>2. Blog / Articles ({articlesCount})</span>
          </button>

          <button
            type="button"
            className={`${styles.tab_button} ${activeTab === "projects" ? styles.tab_active : ""}`}
            onClick={() => setActiveTab("projects")}
          >
            <Icon name="Code" size={16} />
            <span>3. Code Showcase ({projectsCount})</span>
          </button>

          <button
            type="button"
            className={`${styles.tab_button} ${activeTab === "badges" ? styles.tab_active : ""}`}
            onClick={() => setActiveTab("badges")}
          >
            <Icon name="Award" size={16} />
            <span>4. Badges & Achievements ({badgesCount})</span>
          </button>

          <button
            type="button"
            className={`${styles.tab_button} ${activeTab === "network" ? styles.tab_active : ""}`}
            onClick={() => setActiveTab("network")}
          >
            <Icon name="Users" size={16} />
            <span>5. Network & Activity ({networkCount})</span>
          </button>
        </div>

        {/* Khối 3: Tab Content Dynamic View */}
        <div className={styles.tab_content_wrapper}>
          {activeTab === "overview" && (
            <ProfileOverviewTab user={user} onSelectUser={handleOpenUserModal} />
          )}

          {activeTab === "blog" && (
            <ProfileBlogTab articles={user.articles} />
          )}

          {activeTab === "projects" && (
            <ProfileProjectsTab projects={user.projects} />
          )}

          {activeTab === "badges" && (
            <ProfileBadgesTab
              badges={user.badgesCollection}
              certificates={user.certificates}
            />
          )}

          {activeTab === "network" && (
            <ProfileNetworkTab
              network={user.network}
              activities={user.activities}
              onSelectUser={handleOpenUserModal}
            />
          )}
        </div>
      </div>

      {/* Quick Profile Popover Card Modal (Image 2) */}
      <UserProfileCardModal
        isOpen={!!selectedUserForModal}
        onClose={() => setSelectedUserForModal(null)}
        user={selectedUserForModal}
      />
    </div>
  );
}
