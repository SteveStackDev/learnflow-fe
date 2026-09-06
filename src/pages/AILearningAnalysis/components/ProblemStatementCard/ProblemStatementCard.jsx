import { useState } from "react";
import styles from "./ProblemStatementCard.module.css";
import Icon from "~/components/Icon/Icon";
import { Card } from "~/components/ui";

function ProblemStatementCard({ problemStatement }) {
  const [isOpen, setIsOpen] = useState(true);

  if (!problemStatement) return null;

  return (
    <Card hoverable className={styles.statement_card}>
      <button
        type="button"
        className={styles.header_toggle}
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
      >
        <div className={styles.header_left}>
          <Icon name="FileText" size={17} className={styles.file_icon} />
          <h3 className={styles.title}>Problem Statement</h3>
        </div>
        <Icon
          name={isOpen ? "ChevronUp" : "ChevronDown"}
          size={17}
          className={styles.chevron_icon}
        />
      </button>

      {isOpen && (
        <div className={styles.body}>
          <pre className={styles.statement_content}>{problemStatement}</pre>
        </div>
      )}
    </Card>
  );
}

export default ProblemStatementCard;
