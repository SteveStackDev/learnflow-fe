import React, { useState } from "react";
import Icon from "~/components/Icon/Icon";
import { Button, FormField, DropdownMenu } from "~/components/ui";
import {
  FORM_USER_ROLE_OPTIONS,
  FORM_USER_PLAN_OPTIONS,
  FORM_USER_STATUS_OPTIONS,
} from "~/constants/mockAdminUser";
import styles from "./AdminUserModal.module.css";

export default function AdminUserModal({ isOpen, onClose, onSave, user }) {
  const isEdit = Boolean(user && user.id);

  const [formData, setFormData] = useState({
    name: user?.name || "",
    username: user?.username || "",
    email: user?.email || "",
    avatar: user?.avatar || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80",
    role: user?.role || "User",
    plan: user?.plan || "Pro",
    status: user?.status || "Active",
    phone: user?.phone || "",
    bio: user?.bio || "",
  });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <h3 className={styles.title}>
            {isEdit ? "Edit User Account" : "Create New User Account"}
          </h3>
          <button type="button" className={styles.close_btn} onClick={onClose}>
            <Icon name="X" size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className={styles.body}>
            <div className={styles.grid_2col}>
              <FormField
                label="Full Name"
                placeholder="e.g. Michael Steve"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
              <FormField
                label="Username"
                placeholder="e.g. steve_dev"
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                required
              />
            </div>

            <div className={styles.grid_2col}>
              <FormField
                label="Email Address"
                placeholder="email@example.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
              <FormField
                label="Phone Number"
                placeholder="+84..."
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />
            </div>

            <FormField
              label="Avatar Image URL"
              placeholder="https://..."
              value={formData.avatar}
              onChange={(e) => setFormData({ ...formData, avatar: e.target.value })}
            />

            <div className={styles.grid_2col}>
              <div className={styles.form_group}>
                <label className={styles.label}>Role</label>
                <DropdownMenu
                  options={FORM_USER_ROLE_OPTIONS}
                  value={formData.role}
                  onChange={(val) => setFormData({ ...formData, role: val })}
                />
              </div>

              <div className={styles.form_group}>
                <label className={styles.label}>Plan Tier</label>
                <DropdownMenu
                  options={FORM_USER_PLAN_OPTIONS}
                  value={formData.plan}
                  onChange={(val) => setFormData({ ...formData, plan: val })}
                />
              </div>
            </div>

            <div className={styles.form_group}>
              <label className={styles.label}>Account Status</label>
              <DropdownMenu
                options={FORM_USER_STATUS_OPTIONS}
                value={formData.status}
                onChange={(val) => setFormData({ ...formData, status: val })}
              />
            </div>
          </div>

          <div className={styles.footer}>
            <Button variant="outline" type="button" onClick={onClose}>
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              <Icon name="Check" size={16} />
              <span>{isEdit ? "Save Changes" : "Create Account"}</span>
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
