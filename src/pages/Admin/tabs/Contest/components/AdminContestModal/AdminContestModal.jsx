import React, { useState } from "react";
import Icon from "~/components/Icon/Icon";
import { Button, FormField, DropdownMenu } from "~/components/ui";
import {
  FORM_CONTEST_STATUS_OPTIONS,
  FORM_VISIBILITY_OPTIONS,
  CONTEST_TYPE_OPTIONS,
} from "~/constants/mockAdminContest";
import styles from "./AdminContestModal.module.css";

export default function AdminContestModal({ isOpen, onClose, onSave, contest }) {
  const isEdit = Boolean(contest && contest.id);

  const [formData, setFormData] = useState({
    title: contest?.title || "",
    type: contest?.type || "Weekly",
    banner: contest?.banner || "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&auto=format&fit=crop&q=80",
    description: contest?.description || "",
    startTime: contest?.startTime || "25 Aug 2026 19:00",
    endTime: contest?.endTime || "25 Aug 2026 21:00",
    status: contest?.status || "Upcoming",
    visibility: contest?.visibility || "Public",
    rules: contest?.rules || "Quy định kỳ thi tiêu chuẩn.",
  });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  const typeOptions = CONTEST_TYPE_OPTIONS.filter((o) => o.value !== "all");

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <h3 className={styles.title}>
            {isEdit ? "Edit Contest" : "Create New Contest"}
          </h3>
          <button type="button" className={styles.close_btn} onClick={onClose}>
            <Icon name="X" size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className={styles.body}>
            <FormField
              label="Contest Title"
              placeholder="e.g. Summer Coding Cup 2026"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
            />

            <div className={styles.grid_2col}>
              <div className={styles.form_group}>
                <label className={styles.label}>Contest Type</label>
                <DropdownMenu
                  options={typeOptions}
                  value={formData.type}
                  onChange={(val) => setFormData({ ...formData, type: val })}
                />
              </div>

              <div className={styles.form_group}>
                <label className={styles.label}>Status</label>
                <DropdownMenu
                  options={FORM_CONTEST_STATUS_OPTIONS}
                  value={formData.status}
                  onChange={(val) => setFormData({ ...formData, status: val })}
                />
              </div>
            </div>

            <div className={styles.form_group}>
              <label className={styles.label}>Visibility</label>
              <DropdownMenu
                options={FORM_VISIBILITY_OPTIONS}
                value={formData.visibility}
                onChange={(val) => setFormData({ ...formData, visibility: val })}
              />
            </div>

            <FormField
              label="Banner Image URL"
              placeholder="https://..."
              value={formData.banner}
              onChange={(e) => setFormData({ ...formData, banner: e.target.value })}
            />

            <div className={styles.form_group}>
              <label className={styles.label}>Description</label>
              <textarea
                className={styles.textarea}
                rows={3}
                placeholder="Mô tả ngắn gọn về kỳ thi..."
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
            </div>

            <div className={styles.grid_2col}>
              <FormField
                label="Start Time"
                value={formData.startTime}
                onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
              />
              <FormField
                label="End Time"
                value={formData.endTime}
                onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
              />
            </div>
          </div>

          <div className={styles.footer}>
            <Button variant="outline" type="button" onClick={onClose}>
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              <Icon name="Check" size={16} />
              <span>{isEdit ? "Save Changes" : "Create Contest"}</span>
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
