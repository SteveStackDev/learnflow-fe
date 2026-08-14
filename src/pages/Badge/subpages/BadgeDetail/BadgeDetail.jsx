import React from "react";
import { useNavigate, useParams } from "react-router";
import { Button, Badge as UIBadge, Card } from "~/components/ui";
import Icon from "~/components/Icon/Icon";
import { useToast } from "~/context/ToastContext.jsx";
import useScrollReveal from "~/hooks/useScrollReveal";
import { getBadgeDetailById } from "./data";
import styles from "./BadgeDetail.module.css";

export function BadgeDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { toast } = useToast();
  useScrollReveal();

  const badge = getBadgeDetailById(id);

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
    }
    toast.success("Đã sao chép liên kết chia sẻ thành tích!", "Chia sẻ huy hiệu");
  };

  const progressPercent = Math.min(
    100,
    Math.round((badge.progressCurrent / badge.progressTotal) * 100),
  );

  return (
    <div className={styles.page_container}>
      {/* 1. Back Navigation Button */}
      <div className={styles.header_nav}>
        <Button
          variant="outlined"
          leftIcon="ChevronLeft"
          onClick={() => navigate("/badge")}
        >
          Quay về danh hiệu
        </Button>
      </div>

      {/* 2. Main 2-Column Detail Grid */}
      <div className={styles.detail_grid}>
        {/* Left Column: Badge Graphic Card & Share Action */}
        <Card className={`${styles.left_column} reveal-card`}>
          <div className={styles.badge_graphic_card}>
            <div className={styles.badge_ambient_glow} />

            <div className={styles.badge_emblem_frame}>
              <div className={styles.badge_outer_hex} />
              <div className={styles.badge_inner_hex}>
                <div className={styles.badge_icon_center}>
                  <Icon name={badge.iconName || "Flame"} size={52} />
                </div>
              </div>
            </div>

            <div className={styles.badge_banner_label}>{badge.title}</div>
          </div>

          <Button variant="outlined" leftIcon="Share2" onClick={handleShare}>
            Chia sẻ thành tích
          </Button>
        </Card>

        {/* Right Column: Information, Progress & Stats */}
        <div className={styles.right_column}>
          {/* Card 1: Overview Header */}
          <Card className={`${styles.card_overview} reveal-card`}>
            <div className={styles.tags_row}>
              <UIBadge variant="purple" size="sm">
                ✪ {badge.tierTag || "Huyền thoại"}
              </UIBadge>
              <UIBadge variant="primary" size="sm">
                {badge.categoryTag || "Kỷ luật"}
              </UIBadge>
            </div>

            <h1 className={styles.title}>{badge.title}</h1>
            <p className={styles.description}>{badge.description}</p>
          </Card>

          {/* Card 2: Requirements & Progress */}
          <Card className={`${styles.card_progress} reveal-card`}>
            <h2 className={styles.card_subtitle}>Yêu cầu</h2>

            <div className={styles.requirement_item}>
              <span className={styles.check_icon}>
                <Icon name="CheckCircle" size={20} />
              </span>
              <span>{badge.requirementText}</span>
            </div>

            <div className={styles.progress_stats_row}>
              <span className={styles.progress_label}>Tiến độ hoàn thành</span>
              <span className={styles.progress_value}>
                {badge.progressCurrent}/{badge.progressTotal} {badge.progressUnit}
              </span>
            </div>

            <div className={styles.progress_track}>
              <div className={styles.progress_fill} style={{ width: `${progressPercent}%` }} />
            </div>
          </Card>

          {/* Card 3: Stats Grid (2 Columns) */}
          <div className={styles.stats_grid}>
            <Card className={`${styles.stat_card} reveal-card`}>
              <div className={`${styles.stat_icon_box} ${styles["stat_icon_box--date"]}`}>
                <Icon name="Trophy" size={24} />
              </div>
              <div className={styles.stat_info}>
                <span className={styles.stat_label}>Ngày đạt được</span>
                <span className={styles.stat_value}>{badge.earnedDate}</span>
              </div>
            </Card>

            <Card className={`${styles.stat_card} reveal-card`}>
              <div className={`${styles.stat_icon_box} ${styles["stat_icon_box--owners"]}`}>
                <Icon name="Users" size={24} />
              </div>
              <div className={styles.stat_info}>
                <span className={styles.stat_label}>Số người sở hữu</span>
                <span className={styles.stat_value}>{badge.totalOwners}</span>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BadgeDetail;
