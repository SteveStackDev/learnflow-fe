import React from "react";
import styles from "./RoadmapOutcomes.module.css";

export function RoadmapOutcomes({ outcomes }) {
  return (
    <div className={styles.outcomes_card}>
      <h2 className={styles.section_title}>Kiến thức bạn sẽ đạt được</h2>

      <div className={styles.outcomes_grid}>
        {outcomes.map((item) => (
          <div key={item.id} className={styles.outcome_item}>
            <div
              className={styles.code_badge}
              style={{ backgroundColor: item.bgLight, color: item.color }}
            >
              {item.code}
            </div>

            <div className={styles.outcome_info}>
              <h3 className={styles.outcome_title}>{item.title}</h3>
              <p className={styles.outcome_desc}>{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RoadmapOutcomes;
