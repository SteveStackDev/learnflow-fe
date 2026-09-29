import { useState } from "react";
import useScrollReveal from "~/hooks/useScrollReveal";
import { useAuth } from "~/context/AuthContext.jsx";
import { dashboardData } from "~/constants/mockDashBoard";
import { WidgetBlurWrapper } from "~/components/ui";

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
  const { user: currentUser } = useAuth();

  const [onlineFriends] = useState(dashboardData.onlineFriends || []);
  const [selectedUserForModal, setSelectedUserForModal] = useState(null);

  const greetingPrefix = getTimeBasedGreeting();
  const userName =
    currentUser?.name ||
    currentUser?.username ||
    dashboardData?.student?.name ||
    "Học viên";

  const stats = {
    dailyStreak: currentUser?.dailyStreak || 5,
    pomodoroStreak: currentUser?.pomodoroStreak || 3,
    focusHours: currentUser?.focusHours || "42.5h",
    xp: currentUser?.experiencePoints || currentUser?.xp || 1250,
    rating: currentUser?.rating || 1520,
  };
  const studentInfo = {
    ...(dashboardData?.student || {}),
    name: userName,
    streakDays: stats.dailyStreak,
    xp: stats.xp,
    rating: stats.rating,
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

            {/* 2. AI Skill Diagnostics & Radar (With Blur Effect) */}
            <WidgetBlurWrapper
              badge="SẮP RA MẮT"
              icon="Sparkles"
              tagColor="blue"
              title="AI Skill Diagnostics & Radar"
              description="Hệ thống AI chuẩn đoán kỹ năng & đề xuất bài tập tự động đang được hoàn thiện và sẽ sớm khả dụng!"
            >
              <DashboardSkillDiagnostics skillDiagnostics={dashboardData.skillDiagnostics} />
            </WidgetBlurWrapper>

            {/* 3. Learning Roadmap & Capstone Progress */}
            <DashboardLearningRoadmap
              enrolledCourses={dashboardData.enrolledCourses}
              capstoneProject={dashboardData.capstoneProject}
            />

            {/* 4. Community Digest & Blog Highlights (With Blur Effect) */}
            <WidgetBlurWrapper
              badge="SẮP RA MẮT"
              icon="MessageSquare"
              tagColor="purple"
              title="Community Digest & Diễn Đàn"
              description="Khu vực kết nối cộng đồng, chia sẻ kinh nghiệm và thảo luận kỹ thuật sẽ sớm mở cửa cho toàn bộ học viên!"
            >
              <DashboardCommunityDigest
                blogHighlights={dashboardData.blogHighlights}
                hotDiscussions={dashboardData.hotDiscussions}
                onSelectUser={(u) => setSelectedUserForModal(u)}
              />
            </WidgetBlurWrapper>
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

            {/* 4. Online Friends & Direct Messaging (With Blur Effect) */}
            <WidgetBlurWrapper
              badge="SẮP RA MẮT"
              icon="Users"
              tagColor="green"
              title="Bạn Bè Trực Tuyến & Nhắn Tin"
              description="Tính năng học nhóm cùng bạn bè và trò chuyện trực tiếp (Direct Messaging) đang được phát triển!"
            >
              <DashboardOnlineFriends
                onlineFriends={onlineFriends}
                onSelectUser={(u) => setSelectedUserForModal(u)}
              />
            </WidgetBlurWrapper>

            {/* 5. Leaderboard Mini XP Weekly (With Blur Effect) */}
            <WidgetBlurWrapper
              badge="SẮP RA MẮT"
              icon="Trophy"
              tagColor="amber"
              title="Top XP Bứt Phá Tuần"
              description="Bảng xếp hạng học viên xuất sắc và vinh danh thành tích tuần đang được cập nhật!"
            >
              <DashboardMiniLeaderboard
                leaderboard={dashboardData.miniLeaderboard}
                onSelectUser={(u) => setSelectedUserForModal(u)}
              />
            </WidgetBlurWrapper>
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