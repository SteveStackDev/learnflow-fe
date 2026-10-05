import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import useScrollReveal from "~/hooks/useScrollReveal";
import { useAuth } from "~/context/AuthContext.jsx";
import { useToast } from "~/context/ToastContext.jsx";
import { courseService } from "~/services/courseService";

// Sub-Components (currently hidden)
import DashboardCard from "./components/DashboardCard/DashboardCard";

// New Active Widgets
import DashboardFollowedRoadmaps from "./components/DashboardFollowedRoadmaps/DashboardFollowedRoadmaps";
import DashboardEnrolledCourses from "./components/DashboardEnrolledCourses/DashboardEnrolledCourses";
import DashboardSolvedProblems from "./components/DashboardSolvedProblems/DashboardSolvedProblems";

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
  const navigate = useNavigate();
  const { user: currentUser, isAuthenticated } = useAuth();
  const { toast } = useToast();

  const [selectedUserForModal, setSelectedUserForModal] = useState(null);
  const [coursesSummary, setCoursesSummary] = useState({
    overallProgress: 0,
    completedLessonsCount: "",
  });

  // Auth guard: chỉ cho phép user đã đăng nhập xem Dashboard
  useEffect(() => {
    if (!isAuthenticated) {
      toast.warning("Vui lòng đăng nhập để xem Dashboard cá nhân!", "Yêu cầu đăng nhập");
      navigate("/signin");
    }
  }, [isAuthenticated, navigate, toast]);

  // Tải dữ liệu các khóa học thực tế của học viên để tính tổng thể khóa học
  useEffect(() => {
    let isMounted = true;
    courseService
      .getUserCourses()
      .then((userCourses) => {
        if (!isMounted || !Array.isArray(userCourses)) return;

        let totalLessonsCount = 0;
        let totalCompletedLessons = 0;
        let sumProgression = 0;

        userCourses.forEach((uc) => {
          const lessons = uc.lessonsCount || 0;
          const prog = uc.progression || 0;
          sumProgression += prog;

          if (lessons > 0) {
            totalLessonsCount += lessons;
            const completed = Math.round((prog / 100) * lessons);
            totalCompletedLessons += completed;
          }
        });

        const overallProgress =
          totalLessonsCount > 0
            ? Math.round((totalCompletedLessons / totalLessonsCount) * 100)
            : userCourses.length > 0
              ? Math.round(sumProgression / userCourses.length)
              : 0;

        const completedLessonsCount =
          totalLessonsCount > 0
            ? `${totalCompletedLessons}/${totalLessonsCount} bài`
            : userCourses.length > 0
              ? `${userCourses.length} khóa học`
              : "0/0 bài";

        setCoursesSummary({
          overallProgress,
          completedLessonsCount,
        });
      })
      .catch((err) => {
        console.error("Lỗi khi tải tổng thể khóa học:", err);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const greetingPrefix = getTimeBasedGreeting();
  const userName =
    currentUser?.name ||
    currentUser?.username ||
    "Học viên";

  const studentId = currentUser?._id
    ? `FYSET-${String(currentUser._id).slice(-5).toUpperCase()}`
    : currentUser?.id
      ? `FYSET-${String(currentUser.id).slice(-5).toUpperCase()}`
      : "FYSET-MEMBER";

  const joinDate = currentUser?.createdAt
    ? new Date(currentUser.createdAt).toLocaleDateString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    })
    : "01/01/2026";

  const streakDays = currentUser?.dailyStreak || 1;

  const studentInfo = {
    badgeLevel: "THẺ HỌC VIÊN CAO CẤP",
    name: userName,
    id: studentId,
    joinDate: joinDate,
    streakDays: streakDays,
    overallProgress: coursesSummary.overallProgress,
    completedLessonsCount: coursesSummary.completedLessonsCount,
    badgeIcons: [
      { name: "Award", label: "Chứng nhận Thành tựu" },
      { name: "Trophy", label: "Top 10% Contest" },
      { name: "CheckCircle", label: "Học viên Xác thực" },
      { name: "Zap", label: `Streak ${streakDays} ngày` },
    ],
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

        {/* === MAIN DASHBOARD CONTENT === */}
        <div className={styles.widgets_grid}>
          {/* Widget 1: Roadmap đã follow */}
          <DashboardFollowedRoadmaps />

          {/* Widget 2: Khoá học đang học + progress bar */}
          <DashboardEnrolledCourses />

          {/* Widget 3: Bài tập đã làm (table dạng ProblemList) */}
          <DashboardSolvedProblems />
        </div>

        {/*
          === CÁC WIDGET TẠM THỜI ẨN ===
          (sẽ bật lại khi cần)

          import { WidgetBlurWrapper } from "~/components/ui";
          import DashboardHeroBanner from "./components/DashboardHeroBanner/DashboardHeroBanner";
          import DashboardSkillDiagnostics from "./components/DashboardSkillDiagnostics/DashboardSkillDiagnostics";
          import DashboardLearningRoadmap from "./components/DashboardLearningRoadmap/DashboardLearningRoadmap";
          import DashboardCommunityDigest from "./components/DashboardCommunityDigest/DashboardCommunityDigest";
          import DashboardContributionGoal from "./components/DashboardContributionGoal/DashboardContributionGoal";
          import DashboardAiTutorWidget from "./components/DashboardAiTutorWidget/DashboardAiTutorWidget";
          import DashboardUpcomingEvents from "./components/DashboardUpcomingEvents/DashboardUpcomingEvents";
          import DashboardOnlineFriends from "./components/DashboardOnlineFriends/DashboardOnlineFriends";
          import DashboardMiniLeaderboard from "./components/DashboardMiniLeaderboard/DashboardMiniLeaderboard";

          <DashboardHeroBanner heroBanner={dashboardData.heroBanner} />
          <WidgetBlurWrapper badge="SẮP RA MẮT" icon="Sparkles" tagColor="blue" title="AI Skill Diagnostics & Radar" description="...">
            <DashboardSkillDiagnostics skillDiagnostics={dashboardData.skillDiagnostics} />
          </WidgetBlurWrapper>
          <DashboardLearningRoadmap enrolledCourses={dashboardData.enrolledCourses} capstoneProject={dashboardData.capstoneProject} />
          <WidgetBlurWrapper badge="SẮP RA MẮT" icon="MessageSquare" tagColor="purple" title="Community Digest & Diễn Đàn" description="...">
            <DashboardCommunityDigest blogHighlights={dashboardData.blogHighlights} hotDiscussions={dashboardData.hotDiscussions} onSelectUser={(u) => setSelectedUserForModal(u)} />
          </WidgetBlurWrapper>
          <DashboardContributionGoal attendanceMatrix={dashboardData.attendanceMatrix} weeklyGoal={dashboardData.weeklyGoal} />
          <DashboardAiTutorWidget presets={dashboardData.aiTutorPresets} />
          <DashboardUpcomingEvents upcomingEvents={dashboardData.upcomingEvents} />
          <WidgetBlurWrapper badge="SẮP RA MẮT" icon="Users" tagColor="green" title="Bạn Bè Trực Tuyến & Nhắn Tin" description="...">
            <DashboardOnlineFriends onlineFriends={onlineFriends} onSelectUser={(u) => setSelectedUserForModal(u)} />
          </WidgetBlurWrapper>
          <WidgetBlurWrapper badge="SẮP RA MẮT" icon="Trophy" tagColor="amber" title="Top XP Bứt Phá Tuần" description="...">
            <DashboardMiniLeaderboard leaderboard={dashboardData.miniLeaderboard} onSelectUser={(u) => setSelectedUserForModal(u)} />
          </WidgetBlurWrapper>
        */}
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
