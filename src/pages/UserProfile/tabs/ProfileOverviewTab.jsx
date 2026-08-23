import React from "react";
import Icon from "~/components/Icon/Icon";
import DashboardContribution from "~/pages/Dashboard/components/DashboardContribution/DashboardContribution";
import styles from "./ProfileOverviewTab.module.css";

export default function ProfileOverviewTab({ user, onSelectUser }) {
  if (!user) return null;

  // Verified Skill Radar Parameters (Pure SVG)
  const cx = 130;
  const cy = 110;
  const maxR = 75;
  const axes = user.verifiedSkills?.axes || [
    { label: "React & FE", score: 95 },
    { label: "TypeScript", score: 90 },
    { label: "Algorithms", score: 85 },
    { label: "System Design", score: 80 },
    { label: "SQL & DB", score: 88 },
    { label: "CSS & UI/UX", score: 94 },
  ];
  const totalAxes = axes.length;
  const levels = [0.25, 0.5, 0.75, 1.0];

  const getCoordinates = (index, ratio) => {
    const angle = -Math.PI / 2 + (index * (2 * Math.PI)) / totalAxes;
    const r = maxR * ratio;
    const x = cx + r * Math.cos(angle);
    const y = cy + r * Math.sin(angle);
    return { x, y };
  };

  const dataPoints = axes.map((axis, i) => getCoordinates(i, axis.score / 100));
  const polygonPathString = dataPoints.map((pt) => `${pt.x},${pt.y}`).join(" ");

  return (
    <div className={styles.overview_grid}>
      {/* Main Content (Left 2/3) */}
      <div className={styles.main_col}>
        {/* 1. Detailed Bio Card */}
        <div className={`${styles.card_box} reveal-card`}>
          <div className={styles.card_header}>
            <Icon name="User" size={18} className={styles.card_icon} />
            <h3 className={styles.card_title}>Giới Thiệu Chi Tiết (Detailed Bio)</h3>
          </div>
          <p className={styles.bio_full_text}>{user.bio}</p>
        </div>

        {/* 2. Verified Skill Radar Chart */}
        <div className={`${styles.card_box} reveal-card`}>
          <div className={styles.card_header}>
            <Icon name="CheckCircle" size={18} className={styles.card_icon_green} />
            <div>
              <h3 className={styles.card_title}>Verified Skill Radar (Kỹ Năng Đã Xác Thực)</h3>
              <span className={styles.card_subtitle}>Điểm số đo lường qua các bài tập & contest thực tế</span>
            </div>
          </div>

          <div className={styles.radar_wrapper}>
            <svg viewBox="0 0 260 230" className={styles.radar_svg}>
              {levels.map((lvl, idx) => {
                const pts = Array.from({ length: totalAxes }, (_, i) => getCoordinates(i, lvl));
                return (
                  <polygon
                    key={idx}
                    points={pts.map((p) => `${p.x},${p.y}`).join(" ")}
                    className={styles.grid_polygon}
                  />
                );
              })}

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

              <polygon points={polygonPathString} className={styles.data_polygon} />

              {dataPoints.map((pt, i) => (
                <circle key={i} cx={pt.x} cy={pt.y} r="4" className={styles.data_dot} />
              ))}

              {axes.map((axis, i) => {
                const labelPt = getCoordinates(i, 1.25);
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
        </div>

        {/* 3. Featured Capstone Projects */}
        <div className={`${styles.card_box} reveal-card`}>
          <div className={styles.card_header}>
            <Icon name="Folder" size={18} className={styles.card_icon} />
            <h3 className={styles.card_title}>Capstone Projects Nổi Bật</h3>
          </div>

          <div className={styles.featured_projects_list}>
            {user.featuredProjects?.map((prj) => (
              <div key={prj.id} className={styles.project_item}>
                <div className={styles.project_top}>
                  <h4 className={styles.project_title}>{prj.title}</h4>
                  <div className={styles.project_links}>
                    {prj.githubLink && (
                      <a href={prj.githubLink} target="_blank" rel="noreferrer" title="GitHub Repo">
                        <Icon name="Code" size={15} />
                      </a>
                    )}
                    {prj.demoLink && (
                      <a href={prj.demoLink} target="_blank" rel="noreferrer" title="Live Demo">
                        <Icon name="ExternalLink" size={15} />
                      </a>
                    )}
                  </div>
                </div>

                <p className={styles.project_desc}>{prj.description}</p>

                <div className={styles.project_tags}>
                  {prj.tags?.map((t, idx) => (
                    <span key={idx} className={styles.project_tag}>
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 4. Contribution Heatmap */}
        <div className={`${styles.card_box} reveal-card`}>
          <DashboardContribution attendanceMatrix={user.attendanceMatrix || []} />
        </div>
      </div>

      {/* Side Column (Right 1/3) */}
      <div className={styles.side_col}>
        {/* Badges Collection */}
        <div className={`${styles.card_box} reveal-card`}>
          <div className={styles.card_header}>
            <Icon name="Award" size={18} className={styles.card_icon_amber} />
            <h3 className={styles.card_title}>Huy Hiệu (Badges)</h3>
          </div>

          <div className={styles.badges_mini_grid}>
            {user.badgesCollection?.map((b) => (
              <div
                key={b.id}
                className={`${styles.badge_item} ${!b.isUnlocked ? styles.badge_locked : ""}`}
                title={b.isUnlocked ? `${b.title} - Đạt ngày ${b.unlockedAt}` : `${b.title} - Chưa mở khóa`}
              >
                <div className={styles.badge_icon_circle}>
                  <Icon name={b.icon || "Zap"} size={16} />
                </div>
                <span className={styles.badge_name}>{b.title}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Certificates Collection */}
        <div className={`${styles.card_box} reveal-card`}>
          <div className={styles.card_header}>
            <Icon name="FileText" size={18} className={styles.card_icon} />
            <h3 className={styles.card_title}>Chứng Chỉ (Certificates)</h3>
          </div>

          <div className={styles.certificates_list}>
            {user.certificates?.map((cert) => (
              <div key={cert.id} className={styles.cert_item}>
                <Icon name="ShieldCheck" size={18} className={styles.cert_icon} />
                <div className={styles.cert_meta}>
                  <h5 className={styles.cert_title}>{cert.title}</h5>
                  <span className={styles.cert_sub}>{cert.issuer} • {cert.issueDate}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mutual Friends */}
        <div className={`${styles.card_box} reveal-card`}>
          <div className={styles.card_header}>
            <Icon name="Users" size={18} className={styles.card_icon} />
            <h3 className={styles.card_title}>Bạn Bè Chung ({user.mutualFriends?.length || 0})</h3>
          </div>

          <div className={styles.friends_list}>
            {user.mutualFriends?.map((f) => (
              <div
                key={f.id}
                className={styles.friend_item}
                onClick={() => onSelectUser?.(f)}
                title="Click để xem Profile"
              >
                <img src={f.avatar} alt={f.name} className={styles.friend_avatar} />
                <div className={styles.friend_meta}>
                  <span className={styles.friend_name}>{f.name}</span>
                  <span className={styles.friend_handle}>@{f.handle}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
