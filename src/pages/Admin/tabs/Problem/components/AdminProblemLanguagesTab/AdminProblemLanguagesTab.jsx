import React from "react";
import Icon from "~/components/Icon/Icon";
import { ALL_LANGUAGES } from "~/constants/mockAdminProblem";
import styles from "./AdminProblemLanguagesTab.module.css";

export default function AdminProblemLanguagesTab({ supportedLanguages = [], toggleLanguage }) {
  return (
    <div className={styles.card}>
      <h3 className={styles.card_title}>
        <Icon name="Code" size={18} /> Supported Languages Configuration
      </h3>

      <div className={styles.lang_grid}>
        {ALL_LANGUAGES.map((lang) => {
          const isChecked = supportedLanguages.includes(lang.name.split(" ")[0]);
          return (
            <div
              key={lang.id}
              className={`${styles.lang_checkbox} ${isChecked ? styles.lang_active : ""}`}
              onClick={() => toggleLanguage(lang.name.split(" ")[0])}
            >
              <input type="checkbox" checked={isChecked} readOnly />
              <span>{lang.name}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
