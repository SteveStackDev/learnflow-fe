import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { Button } from "~/components/ui";
import RoadmapHeroHeader from "./components/RoadmapHeroHeader/RoadmapHeroHeader";
import RoadmapOutcomes from "./components/RoadmapOutcomes/RoadmapOutcomes";
import RoadmapTimelinePath from "./components/RoadmapTimelinePath/RoadmapTimelinePath";
import RoadmapSidebar from "./components/RoadmapSidebar/RoadmapSidebar";
import styles from "./RoadmapDetail.module.css";
import roadmapService from "~/services/roadmapService";

export function RoadmapDetail() {
  const navigate = useNavigate();
  const params = useParams();
  const [roadmapData, setRoadmapData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const data = await roadmapService.getRoadmap(params.id);
      if (data) {
        setRoadmapData(data);
        setLoading(false);
      }
    }

    fetchData();
  }, [params.id]);

  {
    return loading ? (
      "Loading..."
    ) : (
      <div className={styles.page_container}>
        {/* Back to Roadmaps Navigation Button */}
        <div className={styles.header_nav}>
          <Button variant="outlined" leftIcon="ChevronLeft" onClick={() => navigate("/roadmap")}>
            Quay lại lộ trình
          </Button>
        </div>
        {/* Hero Header Showcase Banner */}
        <RoadmapHeroHeader roadmapData={roadmapData} />
        {/* Workspace 2-Column Grid */}
        <div className={styles.workspace_grid}>
          {/* Left Main Column: Outcomes & Timeline Path */}
          <div className={styles.left_column}>
            <RoadmapOutcomes benefits={roadmapData.benefits} />
            <RoadmapTimelinePath roadmap={roadmapData.roadmap} />
          </div>

          {/* Right Sidebar Column: Tech, Recommended Courses & Problems */}
          <div className={styles.right_column}>
            <RoadmapSidebar
              technologies={roadmapData.technologies}
              recommendedCourses={roadmapData.recommendedCourses}
              recommendedProblems={roadmapData.recommendedProblems}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default RoadmapDetail;
