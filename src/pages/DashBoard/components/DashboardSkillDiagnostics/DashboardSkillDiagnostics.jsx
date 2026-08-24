import React from "react";
import Icon from "~/components/Icon/Icon";
import styles from "./DashboardSkillDiagnostics.module.css";

export default function DashboardSkillDiagnostics({ skillDiagnostics }) {
  if (!skillDiagnostics) return null;

  const { score, status, axes = [], strengths = [], weaknesses = [], aiRecommendation } = skillDiagnostics;

  // Pure SVG Radar Chart parameters
  const cx = 150;
  const cy = 130;
  const maxR = 90;
  const totalAxes = axes.length || 6;

  // Calculate polygon points for grid levels (20%, 40%, 60%, 80%, 100%)
  const levels = [0.2, 0.4, 0.6, 0.8, 1.0];

  const getCoordinates = (index, ratio) => {
    const angle = -Math.PI / 2 + (index * (2 * Math.PI)) / totalAxes;
    const r = maxR * ratio;
    const x = cx + r * Math.cos(angle);
    const y = cy + r * Math.sin(angle);
    return { x, y, angle };
  };

  // Generate data polygon points
  const dataPoints = axes.map((axis, i) => {
    const ratio = (axis.score || 0) / (axis.fullMark || 100);
    return getCoordinates(i, ratio);
  });

  const polygonPathString = dataPoints.map((pt) => `${pt.x},${pt.y}`).join(" ");

  return (
    <div className={`${styles.diagnostics_card} reveal-card`}>
      <div className={styles.card_header}>
        <div className={styles.header_title_block}>
          <div className={styles.icon_box}>
            <Icon name="Sparkles" size={18} />
          </div>
          <div>
            <h3 className={styles.title}>AI Skill Diagnostics & Radar</h3>
            <p className={styles.subtitle}>Phân tích & đo lường kỹ năng tự động từ AI</p>
          </div>
        </div>

        <div className={styles.overall_score_badge}>
          <span className={styles.score_val}>{score}</span>
          <span className={styles.score_status}>{status}</span>
        </div>
      </div>

      <div className={styles.grid_layout}>
        {/* Left: Pure SVG Radar Chart */}
        <div className={styles.radar_container}>
          <svg viewBox="0 0 300 270" className={styles.radar_svg}>
            {/* Grid Rings */}
            {levels.map((lvl, idx) => {
              const pts = Array.from({ length: totalAxes }, (_, i) => getCoordinates(i, lvl));
              const ptsString = pts.map((p) => `${p.x},${p.y}`).join(" ");
              return (
                <polygon
                  key={idx}
                  points={ptsString}
                  className={styles.grid_polygon}
                />
              );
            })}

            {/* Axis Lines */}
            {Array.from({ length: totalAxes }, (_, i) => {
              const outerPt = getCoordinates(i, 1.0);
              return (
                <line
                  key={i}
                  x1={cx}
                  y1={cy}
                  x2={outerPt.x}
                  y2={outerPt.y}
                  className={styles.axis_line}
                />
              );
            })}

            {/* Data Polygon Fill & Stroke */}
            <polygon points={polygonPathString} className={styles.data_polygon} />

            {/* Data Vertex Dots */}
            {dataPoints.map((pt, i) => (
              <circle
                key={i}
                cx={pt.x}
                cy={pt.y}
                r="4.5"
                className={styles.data_dot}
              />
            ))}

            {/* Axis Text Labels */}
            {axes.map((axis, i) => {
              const labelPt = getCoordinates(i, 1.22);
              let textAnchor = "middle";
              if (Math.abs(labelPt.x - cx) > 15) {
                textAnchor = labelPt.x > cx ? "start" : "end";
              }
              return (
                <text
                  key={i}
                  x={labelPt.x}
                  y={labelPt.y + 4}
                  textAnchor={textAnchor}
                  className={styles.axis_label}
                >
                  {axis.label} ({axis.score})
                </text>
              );
            })}
          </svg>
        </div>

        {/* Right: AI Insights (Strengths / Weaknesses / Recommendations) */}
        <div className={styles.insights_container}>
          {/* Strengths */}
          <div className={styles.insight_block}>
            <div className={styles.block_header_green}>
              <Icon name="CheckCircle" size={15} />
              <span>Điểm Mạnh (Strengths)</span>
            </div>
            <ul className={styles.insight_list}>
              {strengths.map((str, idx) => (
                <li key={idx}>{str}</li>
              ))}
            </ul>
          </div>

          {/* Weaknesses */}
          <div className={styles.insight_block}>
            <div className={styles.block_header_amber}>
              <Icon name="AlertTriangle" size={15} />
              <span>Cần Cải Thiện (Weaknesses)</span>
            </div>
            <ul className={styles.insight_list}>
              {weaknesses.map((wk, idx) => (
                <li key={idx}>{wk}</li>
              ))}
            </ul>
          </div>

          {/* AI Recommendation Pill */}
          {aiRecommendation && (
            <div className={styles.recommendation_pill}>
              <Icon name="Lightbulb" size={16} className={styles.lightbulb_icon} />
              <span>{aiRecommendation}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
