import styles from "./AIDiagnosisPanel.module.css";
import Icon from "~/components/Icon/Icon";
import { Card } from "~/components/ui";

function ConceptsReviewCard({ concepts = [] }) {
  if (!concepts || concepts.length === 0) return null;

  return (
    <Card hoverable className={styles.concepts_card}>
      <h3 className={styles.card_title}>Concepts to Review</h3>
      <div className={styles.concepts_stack}>
        {concepts.map((concept, index) => (
          <div key={index} className={styles.concept_item}>
            <Icon name="BookOpen" size={15} className={styles.concept_icon} />
            <span className={styles.concept_label}>{concept}</span>
          </div>
        ))}
      </div>
    </Card>
  );
}

export default ConceptsReviewCard;
