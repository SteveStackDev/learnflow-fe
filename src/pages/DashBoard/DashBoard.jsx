import { useState } from "react";
// Components
import DashboardCard from "./components/DashboardCard/DashboardCard";
import DashboardContent from "./components/DashboardContent/DashboardContent";

// Data
import { dashboardData } from "./data";
import styles from "./DashBoard.module.css";

// Helper function to get time-based greeting
function getTimeBasedGreeting() {
  const hour = new Date().getHours();
  if (hour >= 5 && hour < 12) return "Chào buổi sáng";
  if (hour >= 12 && hour < 18) return "Chào buổi chiều";
  return "Chào buổi tối";
}

function DashBoard() {
  const [currentUser] = useState(() => {
    try {
      const saved = localStorage.getItem("fySet_user");
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const greetingPrefix = getTimeBasedGreeting();
  const userName = currentUser?.name || dashboardData.student.name;

  // Merge current user info into student card data
  const studentInfo = {
    ...dashboardData.student,
    name: userName,
  };

  return (
    <div className={styles.dashboard_page}>
      <main className={styles.dashboard_container}>
        {/* Dynamic Time-based Greeting Header */}
        <div className={styles.greeting_header}>
          <h1 className={styles.greeting_title}>
            <span>
              {greetingPrefix}, {userName}
            </span>
            <span className={styles.greeting_wave}>👋</span>
          </h1>
          <p className={styles.greeting_subtitle}>Đây là tiến độ học tập của bạn hôm nay.</p>
        </div>

        {/* Wide & Shorter Student ID Card with Streak & Progress Bar */}
        <DashboardCard student={studentInfo} />

        {/* Main Content: Path, Recommended, Recent Activity & Sidebar with GitHub Matrix */}
        <DashboardContent
          learningPath={dashboardData.learningPath}
          recommended={dashboardData.recommended}
          recentActivities={dashboardData.recentActivities}
          upcomingEvents={dashboardData.upcomingEvents}
          badges={dashboardData.badges}
          attendanceMatrix={dashboardData.attendanceMatrix}
        />
      </main>
    </div>
  );
}

export default DashBoard;
