import React from "react";
import styles from "./AIMetricOverview.module.css";
import { Card } from "~/components/ui/Card/Card";
import { Badge } from "~/components/ui/Badge/Badge";
import Icon from "~/components/Icon/Icon";

export function AIMetricOverview({ summary }) {
  const cards = [
    {
      id: "solved",
      icon: "CheckCircle2",
      iconTone: "success",
      value: summary?.problemsSolved || 42,
      badgeText: summary?.solvedTrend || "↑ 14% tuần này",
      badgeVariant: "success",
      label: "Problems Solved",
    },
    {
      id: "wa",
      icon: "X",
      iconTone: "danger",
      value: summary?.wrongAnswers || 18,
      badgeText: summary?.waTag || "WA / TLE",
      badgeVariant: "error",
      label: "Wrong Answers",
    },
    {
      id: "review",
      icon: "Target",
      iconTone: "warning",
      value: summary?.algorithmsToReview || 2,
      badgeText: summary?.priorityTag || "Ưu tiên cao",
      badgeVariant: "warning",
      label: "Algorithms to Review",
    },
    {
      id: "confidence",
      icon: "Zap",
      iconTone: "info",
      value: summary?.confidenceIndex || "87.5%",
      badgeText: summary?.scanTag || "Deep Scan",
      badgeVariant: "info",
      label: "AI Confidence Index",
    },
  ];

  return (
    <div className={`${styles.metrics_grid} reveal-card`}>
      {cards.map((card) => (
        <Card key={card.id} hoverable className={styles.metric_card}>
          <Card.Body className={styles.card_body}>
            <div className={`${styles.icon_box} ${styles[`icon_box--${card.iconTone}`]}`}>
              <Icon name={card.icon} size={22} />
            </div>

            <div className={styles.content_box}>
              <div className={styles.value_row}>
                <span className={styles.stat_value}>{card.value}</span>
                <Badge variant={card.badgeVariant} size="sm" className={styles.stat_badge}>
                  {card.badgeText}
                </Badge>
              </div>
              <span className={styles.stat_label}>{card.label}</span>
            </div>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
}

export default AIMetricOverview;
