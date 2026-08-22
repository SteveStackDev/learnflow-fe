import React from "react";
import styles from "./ProfileBioCard.module.css";

export function ProfileBioCard({ bio }) {
  return (
    <div className={styles.card}>
      <h3 className={styles.title}>Giới thiệu</h3>
      <p className={styles.bio_text}>{bio}</p>
    </div>
  );
}

export default ProfileBioCard;
