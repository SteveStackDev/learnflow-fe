import { useRef } from "react";
import { useParams, Link } from "react-router";
import styles from "./AILearningAlgorithm.module.css";
import useScrollReveal from "~/hooks/useScrollReveal";
import { EmptyState } from "~/components/EmptyState/EmptyState";
import {
  algorithmBySlug,
  problemsByAlgorithm,
  algorithms,
} from "~/constants/mockAILearning";

import AILearningAlgorithmHeader from "./components/AILearningAlgorithmHeader/AILearningAlgorithmHeader";
import AILearningAlgorithmStats from "./components/AILearningAlgorithmStats/AILearningAlgorithmStats";
import AILearningAlgorithmProblemList from "./components/AILearningAlgorithmProblemList/AILearningAlgorithmProblemList";
import AILearningAlgorithmSidebar from "./components/AILearningAlgorithmSidebar/AILearningAlgorithmSidebar";

function AILearningAlgorithm() {
  const { algorithmSlug } = useParams();
  useScrollReveal();
  const guideRef = useRef(null);

  const activeSlug = algorithmSlug || "binary-search";
  const algorithm = algorithmBySlug[activeSlug] || algorithms[0];
  const problems = problemsByAlgorithm[activeSlug] || problemsByAlgorithm["binary-search"] || [];

  const handleScrollToGuide = () => {
    if (guideRef.current) {
      guideRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  if (!algorithm) {
    return (
      <div className={styles.page}>
        <div className={styles.container}>
          <div className={styles.top_bar}>
            <Link to="/ai-learning" className={styles.back_btn}>
              <span>← Quay lại AI Learning</span>
            </Link>
          </div>
          <EmptyState
            iconName="Search"
            title="Không tìm thấy thuật toán"
            description="Thuật toán bạn đang tìm kiếm hiện chưa có dữ liệu phân tích."
            actionLabel="Quay về AI Learning"
            onAction={() => (window.location.href = "/ai-learning")}
          />
        </div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        {/* 1. Header & Navigation */}
        <AILearningAlgorithmHeader
          name={algorithm.name}
          statusLabel={algorithm.statusLabel}
          subtitle={algorithm.subtitle}
          aiAnalysisUpdated={algorithm.aiAnalysisUpdated}
        />

        {/* 2. Top 4 Stats Summary Grid */}
        <AILearningAlgorithmStats
          problemsCount={algorithm.problemsCount || problems.length}
          waTotalCount={algorithm.waTotalCount || 11}
          mainWeakness={algorithm.mainWeakness || "Boundary & Off-by-one"}
          guideRecommendation={algorithm.guideRecommendation || "Đọc Mini-Guide bên dưới"}
          onScrollToGuide={handleScrollToGuide}
        />

        {/* 3. Main 2-Column Content: Left Problems List + Right AI Sidebar */}
        <div className={styles.main_grid}>
          {/* Left: Problem Cards List with Sort Control */}
          <div className={styles.content_left}>
            <AILearningAlgorithmProblemList problems={problems} />
          </div>

          {/* Right: AI Pattern Diagnosis & Quick Action Sidebar */}
          <div className={styles.content_right}>
            <AILearningAlgorithmSidebar
              diagnosis={algorithm.aiPatternDiagnosis}
              quickPractice={algorithm.quickPractice}
              algorithmName={algorithm.name}
              guideRef={guideRef}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AILearningAlgorithm;
