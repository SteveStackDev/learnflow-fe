import styles from "./AILearningSubmissionsList.module.css";
import AILearningSubmissionItem from "./AILearningSubmissionItem";

function AILearningSubmissionsList({ submissions = [], onViewCode }) {
  if (!submissions || submissions.length === 0) {
    return null;
  }

  return (
    <div className={styles.list_container}>
      {submissions.map((submission) => (
        <AILearningSubmissionItem
          key={submission.id}
          submission={submission}
          onViewCode={onViewCode}
        />
      ))}
    </div>
  );
}

export default AILearningSubmissionsList;
