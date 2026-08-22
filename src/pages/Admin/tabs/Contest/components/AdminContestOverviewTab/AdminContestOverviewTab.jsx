import React from "react";
import Icon from "~/components/Icon/Icon";
import { FormField, DropdownMenu } from "~/components/ui";
import {
  FORM_CONTEST_STATUS_OPTIONS,
  FORM_VISIBILITY_OPTIONS,
} from "~/constants/mockAdminContest";
import styles from "./AdminContestOverviewTab.module.css";

export default function AdminContestOverviewTab({ contestState, setContestState }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      {/* 1. Basic Info Card */}
      <div className={styles.card}>
        <h3 className={styles.card_title}>
          <Icon name="Info" size={18} /> General Information
        </h3>

        <div className={styles.grid_2col}>
          <FormField
            label="Contest Title"
            placeholder="e.g. Weekly Challenge #42"
            value={contestState.title || ""}
            onChange={(e) => setContestState({ ...contestState, title: e.target.value })}
          />
          <FormField
            label="Banner URL"
            placeholder="https://images.unsplash.com/..."
            value={contestState.banner || ""}
            onChange={(e) => setContestState({ ...contestState, banner: e.target.value })}
          />
        </div>

        {contestState.banner && (
          <img src={contestState.banner} alt="Contest Banner Preview" className={styles.banner_preview} />
        )}

        <div className={styles.form_group}>
          <label className={styles.label}>Description</label>
          <textarea
            className={styles.textarea}
            rows={3}
            value={contestState.description || ""}
            onChange={(e) => setContestState({ ...contestState, description: e.target.value })}
          />
        </div>
      </div>

      {/* 2. Schedule & Visibility Card */}
      <div className={styles.card}>
        <h3 className={styles.card_title}>
          <Icon name="Clock" size={18} /> Schedule & Visibility
        </h3>

        <div className={styles.grid_3col}>
          <FormField
            label="Start Time"
            placeholder="20 Aug 2026 19:00"
            value={contestState.startTime || ""}
            onChange={(e) => setContestState({ ...contestState, startTime: e.target.value })}
          />
          <FormField
            label="End Time"
            placeholder="20 Aug 2026 21:00"
            value={contestState.endTime || ""}
            onChange={(e) => setContestState({ ...contestState, endTime: e.target.value })}
          />
          <FormField
            label="Registration Time"
            placeholder="15 Aug - 20 Aug 2026"
            value={contestState.registrationTime || ""}
            onChange={(e) => setContestState({ ...contestState, registrationTime: e.target.value })}
          />
        </div>

        <div className={styles.grid_2col}>
          <div className={styles.form_group}>
            <label className={styles.label}>Status</label>
            <DropdownMenu
              options={FORM_CONTEST_STATUS_OPTIONS}
              value={contestState.status || "Live"}
              onChange={(val) => setContestState({ ...contestState, status: val })}
            />
          </div>

          <div className={styles.form_group}>
            <label className={styles.label}>Visibility</label>
            <DropdownMenu
              options={FORM_VISIBILITY_OPTIONS}
              value={contestState.visibility || "Public"}
              onChange={(val) => setContestState({ ...contestState, visibility: val })}
            />
          </div>
        </div>
      </div>

      {/* 3. Contest Rules Card */}
      <div className={styles.card}>
        <h3 className={styles.card_title}>
          <Icon name="Shield" size={18} /> Contest Rules & Policy
        </h3>

        <div className={styles.form_group}>
          <label className={styles.label}>Rules Definition</label>
          <textarea
            className={styles.textarea}
            rows={4}
            value={contestState.rules || ""}
            onChange={(e) => setContestState({ ...contestState, rules: e.target.value })}
          />
        </div>
      </div>
    </div>
  );
}
