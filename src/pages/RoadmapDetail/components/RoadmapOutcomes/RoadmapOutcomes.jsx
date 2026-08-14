import React from "react";
import { Card } from "~/components/ui";
import styles from "./RoadmapOutcomes.module.css";

export function RoadmapOutcomes({ outcomes }) {
  return (
    <Card className={styles.outcomes_card}>
      <h2 className={styles.section_title}>Kiến thức bạn sẽ đạt được</h2>

      <div className={styles.outcomes_grid}>
        {outcomes.map((item) => (
          <Card key={item.id} hoverable className={styles.outcome_item}>
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
          </Card>
        ))}
      </div>
    </Card>
  );
}

export default RoadmapOutcomes;
