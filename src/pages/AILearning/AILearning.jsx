import React from "react";
import styles from "./AILearning.module.css";
import useScrollReveal from "~/hooks/useScrollReveal";
import {
  aiLearningSummary,
  mentorInsight,
  algorithms,
  codeSpotlightData,
  practiceQueueData,
} from "~/constants/mockAILearning";

import AIHeroBanner from "./components/AIHeroBanner/AIHeroBanner";
import AIMetricOverview from "./components/AIMetricOverview/AIMetricOverview";
import AIMentorInsight from "./components/AIMentorInsight/AIMentorInsight";
import AIAlgorithmGrid from "./components/AIAlgorithmGrid/AIAlgorithmGrid";
import AICodeSpotlight from "./components/AICodeSpotlight/AICodeSpotlight";
import AIPracticeQueue from "./components/AIPracticeQueue/AIPracticeQueue";

export function AILearning() {
  useScrollReveal();

  return (
    <div className={styles.ai_learning_page}>
      <div className={styles.container}>
        {/* 1. Hero Header Banner */}
        <AIHeroBanner />

        {/* 2. Metric Overview 4-card Grid */}
        <AIMetricOverview summary={aiLearningSummary} />

        {/* 3. AI Mentor Realtime Deep Insight */}
        <AIMentorInsight insight={mentorInsight} />

        {/* 4. Algorithms 3-card Performance Grid */}
        <AIAlgorithmGrid algorithms={algorithms} />

        {/* 5. Code Diagnostic Spotlight (Bug vs Optimal Fix) */}
        <AICodeSpotlight data={codeSpotlightData} />

        {/* 6. Focused Practice Queue Table */}
        <AIPracticeQueue items={practiceQueueData} />
      </div>
    </div>
  );
}

export default AILearning;
