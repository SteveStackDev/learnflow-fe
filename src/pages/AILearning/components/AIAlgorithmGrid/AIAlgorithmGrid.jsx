import React from "react";
import { Link } from "react-router";
import styles from "./AIAlgorithmGrid.module.css";
import { Card } from "~/components/ui/Card/Card";
import { Badge } from "~/components/ui/Badge/Badge";
import Icon from "~/components/Icon/Icon";

export function AIAlgorithmGrid({ algorithms = [] }) {
  return (
    <section className={`${styles.algorithms_section} reveal-card`}>
      <div className={styles.section_header}>
        <h2 className={styles.section_title}>Algorithms</h2>
        <p className={styles.section_subtitle}>
          Based on your submission history. Ratings are a starting point, not a verdict — review them
          together with the problems themselves.
        </p>
      </div>

      <div className={styles.algo_grid}>
        {algorithms.map((algo) => {
          const isGood = algo.status === "good";
          return (
            <Card key={algo.slug} hoverable className={styles.algo_card}>
              <Card.Header className={styles.card_header}>
                <h3 className={styles.algo_name}>{algo.name}</h3>
                <Badge
                  variant={isGood ? "success" : "warning"}
                  size="sm"
                  icon={isGood ? "CheckCircle2" : "AlertCircle"}
                  className={styles.status_badge}
                >
                  {algo.statusLabel || (isGood ? "Good" : "Needs Review")}
                </Badge>
              </Card.Header>

              <Card.Body className={styles.card_body}>
                <div className={styles.stats_row}>
                  <div className={styles.stat_item}>
                    <span className={styles.stat_num}>{algo.solvedCount}</span>
                    <span className={styles.stat_label}>Solved</span>
                  </div>

                  <div className={styles.stat_item}>
                    <span className={`${styles.stat_num} ${styles.stat_num_danger}`}>
                      {algo.waCount}
                    </span>
                    <span className={styles.stat_label}>Wrong Answers</span>
                  </div>
                </div>

                <div
                  className={`${styles.callout_box} ${
                    isGood ? styles.callout_box_good : styles.callout_box_review
                  }`}
                >
                  <Icon
                    name={isGood ? "CheckCircle2" : "Target"}
                    size={16}
                    className={isGood ? styles.callout_icon_good : styles.callout_icon_review}
                  />
                  <span className={styles.callout_text}>
                    {isGood
                      ? algo.strengthHighlight || "Mastered: 1D DP & Memoization, ready for 2D Grid."
                      : `Possible weakness: ${algo.possibleWeakness || "Boundary Conditions"}`}
                  </span>
                </div>
              </Card.Body>

              <Card.Footer className={styles.card_footer}>
                <Link
                  to={`/ai-learning/${algo.slug}`}
                  className={styles.view_btn}
                >
                  <span>View Problems</span>
                  <Icon name="ArrowRight" size={16} />
                </Link>
              </Card.Footer>
            </Card>
          );
        })}
      </div>
    </section>
  );
}

export default AIAlgorithmGrid;
