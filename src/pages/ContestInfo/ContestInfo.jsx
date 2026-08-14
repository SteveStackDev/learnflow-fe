import React, { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { Button } from "~/components/ui";
import { useToast } from "~/context/ToastContext.jsx";
import useScrollReveal from "~/hooks/useScrollReveal";
import ContestInfoSidebar from "./components/ContestInfoSidebar/ContestInfoSidebar";
import ContestInfoProblemsTable from "./components/ContestInfoProblemsTable/ContestInfoProblemsTable";
import ContestInfoAnnouncements from "./components/ContestInfoAnnouncements/ContestInfoAnnouncements";
import ContestInfoSubmissions from "./components/ContestInfoSubmissions/ContestInfoSubmissions";
import ContestInfoStandings from "./components/ContestInfoStandings/ContestInfoStandings";
import ContestInfoRightSidebar from "./components/ContestInfoRightSidebar/ContestInfoRightSidebar";
import styles from "./ContestInfo.module.css";

export default function ContestInfo() {
  useScrollReveal();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { id } = useParams();

  // State: contest status ('upcoming' | 'running' | 'finished')
  const [contestStatus, setContestStatus] = useState("upcoming");
  const [isRegistered, setIsRegistered] = useState(false);
  const [activeTab, setActiveTab] = useState("standings");

  const mockContest = {
    id: id || "global-round-24",
    title: "Vòng Thi Toàn Cầu #24",
    division: "Hạng 1 + Hạng 2",
    status: contestStatus, // 'upcoming' | 'running' | 'finished'
    problems: [
      {
        id: "prob-a",
        code: "A",
        title: "Hot Potatoes at the Fairy Warehouse",
        constraints: "2s, 256 MB",
        solves: "1,129",
      },
      {
        id: "prob-b",
        code: "B",
        title: "A Ribbon for Tomorrow",
        constraints: "2s, 256 MB",
        solves: "974",
      },
      {
        id: "prob-c",
        code: "C",
        title: "Even If the World Turns",
        constraints: "2s, 256 MB",
        solves: "607",
      },
    ],
  };

  const handleRegisterToggle = () => {
    if (contestStatus === "upcoming") {
      setIsRegistered(!isRegistered);
      if (!isRegistered) {
        toast.success("Đăng ký tham gia kỳ thi thành công!", "Kỳ thi");
      } else {
        toast.info("Đã hủy đăng ký kỳ thi", "Kỳ thi");
      }
    } else {
      toast.info("Đang chuyển hướng tới phòng thi...", "Kỳ thi");
      navigate(`/contest/${mockContest.id}`);
    }
  };

  const handleSelectProblem = (prob) => {
    if (contestStatus === "upcoming") {
      toast.warning(
        "Kỳ thi chưa bắt đầu! Vui lòng đợi đến giờ thi để xem bài tập.",
        "Thông báo"
      );
      return;
    }
    toast.success(`Đang mở bài tập: ${prob.code}. ${prob.title}`, "Làm bài");
    navigate(`/contest/${mockContest.id}`);
  };

  const handleTabChange = (tabId) => {
    if (contestStatus === "upcoming") {
      toast.warning(
        "Kỳ thi chưa bắt đầu! Vui lòng đợi đến giờ thi để truy cập tính năng này.",
        "Thông báo"
      );
      return;
    }
    setActiveTab(tabId);
  };

  return (
    <div className={styles.page_wrapper}>
      {/* Demo Status Control Switch Bar */}
      <div className={styles.demo_status_bar}>
        <span>💡 **Chế độ xem Demo Trạng Thái Kỳ Thi:**</span>
        <div className={styles.status_switch_group}>
          <Button
            size="sm"
            variant={contestStatus === "upcoming" ? "contained" : "outlined"}
            onClick={() => setContestStatus("upcoming")}
          >
            🔒 Chưa diễn ra (Upcoming)
          </Button>
          <Button
            size="sm"
            variant={contestStatus === "running" ? "contained" : "outlined"}
            onClick={() => setContestStatus("running")}
          >
            🔥 Đang diễn ra (Running)
          </Button>
          <Button
            size="sm"
            variant={contestStatus === "finished" ? "contained" : "outlined"}
            onClick={() => setContestStatus("finished")}
          >
            ✅ Đã kết thúc (Finished)
          </Button>
        </div>
      </div>

      {/* Main 3-Column Layout */}
      <div className={styles.grid_layout}>
        {/* Left Sidebar */}
        <ContestInfoSidebar
          contest={mockContest}
          isRegistered={isRegistered}
          onRegisterToggle={handleRegisterToggle}
          activeTab={activeTab}
          onTabChange={handleTabChange}
        />

        {/* Middle Main Content */}
        <main className={styles.main_content}>
          <ContestInfoProblemsTable
            problems={mockContest.problems}
            isUpcoming={contestStatus === "upcoming"}
            onSelectProblem={handleSelectProblem}
          />

          {/* Render active tab content only when contest has started or finished */}
          {contestStatus !== "upcoming" && (
            <>
              {activeTab === "standings" && <ContestInfoStandings />}
              {activeTab === "submissions" && <ContestInfoSubmissions />}
              {activeTab === "announcements" && <ContestInfoAnnouncements />}
            </>
          )}
        </main>

        {/* Right Sidebar */}
        <div className={styles.right_col}>
          <ContestInfoRightSidebar
            contest={mockContest}
            onActionClick={handleRegisterToggle}
          />
        </div>
      </div>
    </div>
  );
}
