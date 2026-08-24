import React from "react";
import Icon from "~/components/Icon/Icon";
import { FormField } from "~/components/ui";
import styles from "./AdminUserOverviewTab.module.css";

export default function AdminUserOverviewTab({ userState, setUserState }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      {/* Account Info */}
      <div className={styles.card}>
        <h3 className={styles.card_title}>
          <Icon name="User" size={18} /> Account Information
        </h3>

        <div className={styles.grid_2col}>
          <FormField
            label="Full Name"
            value={userState.name || ""}
            onChange={(e) => setUserState({ ...userState, name: e.target.value })}
          />
          <FormField
            label="Username"
            value={userState.username || ""}
            onChange={(e) => setUserState({ ...userState, username: e.target.value })}
          />
        </div>

        <div className={styles.grid_2col}>
          <FormField
            label="Email Address"
            value={userState.email || ""}
            onChange={(e) => setUserState({ ...userState, email: e.target.value })}
          />
          <FormField
            label="Phone Number"
            value={userState.phone || ""}
            onChange={(e) => setUserState({ ...userState, phone: e.target.value })}
          />
        </div>

        <div className={styles.form_group}>
          <label className={styles.label}>Personal Bio</label>
          <textarea
            className={styles.textarea}
            rows={3}
            value={userState.bio || ""}
            onChange={(e) => setUserState({ ...userState, bio: e.target.value })}
          />
        </div>
      </div>

      {/* Security & Login Info */}
      <div className={styles.card}>
        <h3 className={styles.card_title}>
          <Icon name="ShieldCheck" size={18} /> Registration & Security Logs
        </h3>

        <div className={styles.grid_3col}>
          <FormField label="Registration Date" value={userState.joinedDate || "15 Jan 2026"} readOnly />
          <FormField label="Last Login Time" value={userState.lastLogin || "22 Aug 2026 09:15"} readOnly />
          <FormField label="IP / Login Location" value={userState.ipAddress || "118.69.182.45 (VN)"} readOnly />
        </div>
      </div>

      {/* Subscription Info */}
      <div className={styles.card}>
        <h3 className={styles.card_title}>
          <Icon name="CreditCard" size={18} /> Subscription & Membership Plan
        </h3>

        <div className={styles.grid_2col}>
          <FormField label="Current Plan Tier" value={userState.plan || "Free"} readOnly />
          <FormField label="Subscription Details" value={userState.subscription || "Active Plan"} readOnly />
        </div>
      </div>
    </div>
  );
}
