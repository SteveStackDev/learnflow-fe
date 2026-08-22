import React, { useState } from "react";
import { useParams } from "react-router";
import ProfileCoverHeader from "./components/ProfileCoverHeader/ProfileCoverHeader";
import ProfileBioCard from "./components/ProfileBioCard/ProfileBioCard";
import ProfileLearningCard from "./components/ProfileLearningCard/ProfileLearningCard";
import ProfileStatsGrid from "./components/ProfileStatsGrid/ProfileStatsGrid";
import ProfileSidebar from "./components/ProfileSidebar/ProfileSidebar";
import UserProfileCardModal from "~/components/UserProfileCardModal/UserProfileCardModal";
import { mockUsersMap, mockUserProfileData } from "~/constants/mockUserProfile";
import styles from "./UserProfile.module.css";

export default function UserProfile() {
  const { id } = useParams();
  const [selectedUserForModal, setSelectedUserForModal] = useState(null);

  // Get user profile from params or default to mock user
  const currentUser = (id && mockUsersMap[id]) ? mockUsersMap[id] : mockUserProfileData;

  const handleOpenUserModal = (user) => {
    setSelectedUserForModal(user || mockUsersMap["user-02"]);
  };

  const handleCloseModal = () => {
    setSelectedUserForModal(null);
  };

  return (
    <div className={styles.page_wrapper}>
      <div className={styles.container}>
        {/* Cover & Main Header */}
        <ProfileCoverHeader user={currentUser} />

        {/* 2 Column Layout (Main content 2/3, Sidebar 1/3) */}
        <div className={styles.grid_layout}>
          {/* Main Left Column */}
          <div className={styles.main_content}>
            <ProfileBioCard bio={currentUser.bio} />
            <ProfileLearningCard learning={currentUser.learning} />
            <ProfileStatsGrid stats={currentUser.stats} />
          </div>

          {/* Right Sidebar */}
          <div className={styles.sidebar_content}>
            <ProfileSidebar user={currentUser} onSelectUser={handleOpenUserModal} />
          </div>
        </div>
      </div>

      {/* Quick Profile Popover Card Modal (Image 2) */}
      <UserProfileCardModal
        isOpen={!!selectedUserForModal}
        onClose={handleCloseModal}
        user={selectedUserForModal}
      />
    </div>
  );
}
