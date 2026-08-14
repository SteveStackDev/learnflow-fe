import React from "react";
import { useNavigate, useParams } from "react-router";
import { Button } from "~/components/ui";
import { mockRoadmapDetailData } from "./data";
import RoadmapHeroHeader from "./components/RoadmapHeroHeader/RoadmapHeroHeader";
import RoadmapOutcomes from "./components/RoadmapOutcomes/RoadmapOutcomes";
import RoadmapTimelinePath from "./components/RoadmapTimelinePath/RoadmapTimelinePath";
import RoadmapSidebar from "./components/RoadmapSidebar/RoadmapSidebar";
import styles from "./RoadmapDetail.module.css";

export function RoadmapDetail() {
  const navigate = useNavigate();
  useParams();
  const roadmapData = mockRoadmapDetailData;

  return (
    <div className={styles.page_container}>
      {/* Back to Roadmaps Navigation Button */}
      <div className={styles.header_nav}>
        <Button
          variant="outlined"
          leftIcon="ChevronLeft"
          onClick={() => navigate("/roadmap")}
        >
          Quay lại lộ trình
        </Button>
      </div>

      {/* Hero Header Showcase Banner */}
      <RoadmapHeroHeader roadmapData={roadmapData} />

      {/* Workspace 2-Column Grid */}
      <div className={styles.workspace_grid}>
        {/* Left Main Column: Outcomes & Timeline Path */}
        <div className={styles.left_column}>
          <RoadmapOutcomes outcomes={roadmapData.outcomes} />
          <RoadmapTimelinePath timelinePath={roadmapData.timelinePath} />
        </div>

        {/* Right Sidebar Column: Tech, Recommended Courses & Problems */}
        <div className={styles.right_column}>
          <RoadmapSidebar
            technologies={roadmapData.technologies}
            recommendedCourses={roadmapData.recommendedCourses}
            practiceProblems={roadmapData.practiceProblems}
          />
        </div>
      </div>
    </div>
  );
}

export default RoadmapDetail;
