import React from "react";
import Icon from "~/components/Icon/Icon";
import styles from "./ProfileBadgesTab.module.css";

export default function ProfileBadgesTab({ badges = [], certificates = [] }) {
  return (
    <div className={`${styles.tab_card} reveal-card`}>
      <div className={styles.tab_header}>
        <h3 className={styles.tab_title}>Bộ Sưu Tập Huy Hiệu & Chứng Chỉ</h3>
        <span className={styles.tab_subtitle}>Tất cả huy hiệu thành tựu và bằng cấp đạt được từ các khóa học & Contest</span>
      </div>

      {/* 1. Badges Collection Section */}
      <div className={styles.section_block}>
        <h4 className={styles.section_title}>
          <Icon name="Award" size={16} className={styles.amber_icon} />
          <span>Huy Hiệu Thành Tựu ({badges.length})</span>
        </h4>

        <div className={styles.badges_grid}>
          {badges.map((badge) => (
            <div
              key={badge.id}
              className={`${styles.badge_card} ${
                !badge.isUnlocked ? styles.badge_card_locked : ""
              }`}
            >
              <div className={styles.badge_icon_box}>
                <Icon name={badge.icon || "Zap"} size={24} />
              </div>

              <div className={styles.badge_info}>
                <span className={styles.badge_category}>{badge.category}</span>
                <h5 className={styles.badge_name}>{badge.title}</h5>
                <span className={styles.badge_unlocked_date}>
                  {badge.isUnlocked ? `Đạt ngày ${badge.unlockedAt}` : "🔒 Chưa mở khóa"}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 2. Certificates Collection Section */}
      <div className={styles.section_block}>
        <h4 className={styles.section_title}>
          <Icon name="ShieldCheck" size={16} className={styles.green_icon} />
          <span>Chứng Chỉ Khóa Học & Contest ({certificates.length})</span>
        </h4>

        <div className={styles.certificates_grid}>
          {certificates.map((cert) => (
            <div key={cert.id} className={styles.cert_card}>
              <div className={styles.cert_icon_wrapper}>
                <Icon name="Award" size={28} />
              </div>

              <div className={styles.cert_details}>
                <h5 className={styles.cert_title}>{cert.title}</h5>
                <span className={styles.cert_issuer}>Đơn vị cấp: {cert.issuer}</span>
                <span className={styles.cert_meta}>Ngày cấp: {cert.issueDate} • ID: {cert.credentialId}</span>
              </div>

              <button
                type="button"
                className={styles.cert_verify_btn}
                onClick={() => alert(`Chứng chỉ hợp lệ!\nMã xác thực: ${cert.credentialId}`)}
              >
                <Icon name="CheckCircle" size={14} />
                <span>Xác thực</span>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
