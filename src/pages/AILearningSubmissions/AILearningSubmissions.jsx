import { useState } from "react";
import { useParams, Link } from "react-router";
import styles from "./AILearningSubmissions.module.css";
import useScrollReveal from "~/hooks/useScrollReveal";
import { EmptyState } from "~/components/EmptyState/EmptyState";
import {
  submissionsByProblem,
  problemSubmissionMeta,
} from "~/constants/mockAILearning";

import AILearningSubmissionsHeader from "./components/AILearningSubmissionsHeader/AILearningSubmissionsHeader";
import AILearningSubmissionsStats from "./components/AILearningSubmissionsStats/AILearningSubmissionsStats";
import AILearningSubmissionsList from "./components/AILearningSubmissionsList/AILearningSubmissionsList";
import AILearningSubmissionsAIMentorCard from "./components/AILearningSubmissionsAIMentorCard/AILearningSubmissionsAIMentorCard";
import AILearningSubmissionsCodeModal from "./components/AILearningSubmissionsCodeModal/AILearningSubmissionsCodeModal";

function AILearningSubmissions() {
  const { problemId } = useParams();
  useScrollReveal();

  const [selectedSubmissionForModal, setSelectedSubmissionForModal] = useState(null);

  const activeProblemKey = problemId || "binary-search-on-answer";
  const submissions = submissionsByProblem[activeProblemKey] || submissionsByProblem["binary-search-on-answer"] || [];
  const meta = problemSubmissionMeta[activeProblemKey] || {
    problemId: activeProblemKey,
    title: activeProblemKey.replace(/-/g, " "),
    code: "#BS-102",
    difficultyLabel: "Trung bình (Medium)",
    algorithmName: "Binary Search",
    algorithmSlug: "binary-search",
    subtitle: "Lịch sử các lần nộp bài (Your Submission History) & phân tích thông minh từ AI Mentor",
    stats: {
      totalAttempts: `${submissions.length} lần thử`,
      totalAttemptsCount: submissions.length,
      totalAttemptsBadge: `#${submissions.length}`,
      latestResult: submissions[0]?.status === "AC" ? "AC - Đã chấp nhận" : "WA - Chưa đạt",
      commonError: "3x WA (Sai biên tìm kiếm)",
    },
    aiMentorDiagnosis: {
      title: "Chẩn đoán tiến trình từ AI Mentor",
      tag: "Tự động tóm tắt",
      updatedAt: "Cập nhật 5 phút trước",
      textBefore1: "AI đã phát hiện bạn gặp lỗi lặp vô hạn ở các lần nộp trước vì tính toán ",
      codeChip1: "mid = (l + r) / 2",
      textBefore2: " khi điều kiện thu hẹp cận dưới ",
      codeChip2: "l = mid",
      textBefore3: ". Ở lần nộp đạt chuẩn, bạn đã chuẩn hóa thành công công thức làm tròn lên ",
      codeChip3: "mid = l + (r - l + 1) / 2",
      textAfter: ".",
      reinforcedKnowledge: "Lựa chọn cận làm tròn trong Tìm kiếm nhị phân",
      deepDiagnosticSubmissionId: submissions.find((s) => s.status === "WA")?.id || "12345",
    },
  };

  if (submissions.length === 0) {
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
            title="Không tìm thấy bài nộp"
            description="Chưa có lịch sử nộp bài nào cho bài toán này."
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
        {/* 1. Header & Navigation Component */}
        <AILearningSubmissionsHeader
          problemTitle={meta.title}
          problemCode={meta.code}
          difficultyLabel={meta.difficultyLabel}
          subtitle={meta.subtitle}
        />

        {/* 2. Top 3 Stats Metrics Grid */}
        <AILearningSubmissionsStats stats={meta.stats} />

        {/* 3. Submissions History Cards List */}
        <AILearningSubmissionsList
          submissions={submissions}
          onViewCode={(submission) => setSelectedSubmissionForModal(submission)}
        />

        {/* 4. AI Mentor Progress Diagnosis Card */}
        {meta.aiMentorDiagnosis && (
          <AILearningSubmissionsAIMentorCard diagnosis={meta.aiMentorDiagnosis} />
        )}
      </div>

      {/* 5. Source Code Viewer Modal */}
      {selectedSubmissionForModal && (
        <AILearningSubmissionsCodeModal
          submission={selectedSubmissionForModal}
          isOpen={Boolean(selectedSubmissionForModal)}
          onClose={() => setSelectedSubmissionForModal(null)}
        />
      )}
    </div>
  );
}

export default AILearningSubmissions;
