import { useState } from "react";
import useScrollReveal from "~/hooks/useScrollReveal";
import { dashboardData } from "~/constants/mockDashBoard";

// Sub-Components
import DashboardCard from "./components/DashboardCard/DashboardCard";
import DashboardHeroBanner from "./components/DashboardHeroBanner/DashboardHeroBanner";
import DashboardSkillDiagnostics from "./components/DashboardSkillDiagnostics/DashboardSkillDiagnostics";
import DashboardLearningRoadmap from "./components/DashboardLearningRoadmap/DashboardLearningRoadmap";
import DashboardCommunityDigest from "./components/DashboardCommunityDigest/DashboardCommunityDigest";
import DashboardContributionGoal from "./components/DashboardContributionGoal/DashboardContributionGoal";

import DashboardAiTutorWidget from "./components/DashboardAiTutorWidget/DashboardAiTutorWidget";
import DashboardUpcomingEvents from "./components/DashboardUpcomingEvents/DashboardUpcomingEvents";
import DashboardOnlineFriends from "./components/DashboardOnlineFriends/DashboardOnlineFriends";
import DashboardMiniLeaderboard from "./components/DashboardMiniLeaderboard/DashboardMiniLeaderboard";

import UserProfileCardModal from "~/components/UserProfileCardModal/UserProfileCardModal";

import styles from "./DashBoard.module.css";

function getTimeBasedGreeting() {
  const hour = new Date().getHours();
  if (hour >= 5 && hour < 12) return "Chào buổi sáng";
  if (hour >= 12 && hour < 18) return "Chào buổi chiều";
  return "Chào buổi tối";
}

export default function DashBoard() {
  useScrollReveal();

  const [currentUser] = useState(() => {
    try {
      const saved = localStorage.getItem("fySet_user");
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [selectedUserForModal, setSelectedUserForModal] = useState(null);

  const greetingPrefix = getTimeBasedGreeting();
  const userName = currentUser?.name || dashboardData?.student?.name || "Học viên";

  const studentInfo = {
    ...(dashboardData?.student || {}),
    name: userName,
  };

  return (
    <div className={styles.dashboard_page}>
      <div className={styles.dashboard_container}>
        {/* Dynamic Time-based Greeting Header */}
        <div className={`${styles.greeting_header} reveal-card`}>
          <h1 className={styles.greeting_title}>
            <span>
              {greetingPrefix}, {userName}
            </span>
            <span className={styles.greeting_wave}>👋</span>
          </h1>
          <p className={styles.greeting_subtitle}>
            Chào mừng đến với Trung tâm điều khiển cá nhân (Private Control Center).
          </p>
        </div>

        {/* Top Student Overview Summary Card */}
        <DashboardCard student={studentInfo} />

        {/* 3-Column Grid Layout: Column 2 (Main Content) & Column 3 (Interactive Right Panel) */}
        <div className={styles.three_column_layout}>
          {/* Main Content (Column 2 - Scrollable) */}
          <main className={styles.main_content_col}>
            {/* 1. Hero Action Banner (AI Powered) */}
            <DashboardHeroBanner heroBanner={dashboardData.heroBanner} />

            {/* 2. AI Skill Diagnostics & Radar */}
            <DashboardSkillDiagnostics skillDiagnostics={dashboardData.skillDiagnostics} />

            {/* 3. Learning Roadmap & Capstone Progress */}
            <DashboardLearningRoadmap
              enrolledCourses={dashboardData.enrolledCourses}
              capstoneProject={dashboardData.capstoneProject}
            />

            {/* 4. Community Digest & Blog Highlights */}
            <DashboardCommunityDigest
              blogHighlights={dashboardData.blogHighlights}
              hotDiscussions={dashboardData.hotDiscussions}
              onSelectUser={(u) => setSelectedUserForModal(u)}
            />
          </main>

          {/* Interactive Right Panel (Column 3 - Sticky) */}
          <aside className={styles.right_panel_col}>
            {/* 1. Contribution Heatmap & Weekly Goal */}
            <DashboardContributionGoal
              attendanceMatrix={dashboardData.attendanceMatrix}
              weeklyGoal={dashboardData.weeklyGoal}
            />

            {/* 2. AI Tutor Quick Assistant Widget */}
            <DashboardAiTutorWidget presets={dashboardData.aiTutorPresets} />

            {/* 3. Upcoming Events & Deadlines Countdown */}
            <DashboardUpcomingEvents upcomingEvents={dashboardData.upcomingEvents} />

            {/* 4. Online Friends & Direct Messaging */}
            <DashboardOnlineFriends
              onlineFriends={dashboardData.onlineFriends}
              onSelectUser={(u) => setSelectedUserForModal(u)}
            />

            {/* 5. Leaderboard Mini XP Weekly */}
            <DashboardMiniLeaderboard
              leaderboard={dashboardData.miniLeaderboard}
              onSelectUser={(u) => setSelectedUserForModal(u)}
            />
          </aside>
        </div>
      </div>

      {/* User Profile Quick Card Modal */}
      <UserProfileCardModal
        isOpen={!!selectedUserForModal}
        onClose={() => setSelectedUserForModal(null)}
        user={selectedUserForModal}
      />
    </div>
  );
}