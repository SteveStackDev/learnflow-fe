import React from "react";
import Icon from "~/components/Icon/Icon";
import styles from "./ProfileProjectsTab.module.css";

export default function ProfileProjectsTab({ projects = [] }) {
  if (!projects || projects.length === 0) {
    return (
      <div className={`${styles.empty_box} reveal-card`}>
        <Icon name="Folder" size={32} className={styles.empty_icon} />
        <p>Tác giả chưa cập nhật dự án Code Showcase nào.</p>
      </div>
    );
  }

  return (
    <div className={`${styles.tab_card} reveal-card`}>
      <div className={styles.tab_header}>
        <h3 className={styles.tab_title}>Code Showcase & Projects ({projects.length})</h3>
        <span className={styles.tab_subtitle}>Các bài tập lớn, sản phẩm thực tế kèm Demo & GitHub Repo</span>
      </div>

      <div className={styles.projects_grid}>
        {projects.map((prj) => (
          <div key={prj.id} className={styles.project_card}>
            <div className={styles.project_top}>
              <div className={styles.title_group}>
                <Icon name="Code" size={18} className={styles.code_icon} />
                <h4 className={styles.project_title}>{prj.title}</h4>
              </div>

              <div className={styles.meta_badges}>
                <span className={styles.star_badge}>
                  <Icon name="Star" size={12} />
                  <span>{prj.stars || 0}</span>
                </span>

                <span className={styles.fork_badge}>
                  <Icon name="GitFork" size={12} />
                  <span>{prj.forks || 0}</span>
                </span>
              </div>
            </div>

            <p className={styles.project_desc}>{prj.description}</p>

            <div className={styles.tags_row}>
              {prj.tags?.map((tag, idx) => (
                <span key={idx} className={styles.tech_tag}>
                  {tag}
                </span>
              ))}
            </div>

            <div className={styles.project_actions}>
              {prj.githubLink && (
                <a
                  href={prj.githubLink}
                  target="_blank"
                  rel="noreferrer"
                  className={styles.action_btn}
                >
                  <Icon name="Code" size={14} />
                  <span>GitHub Repo</span>
                </a>
              )}

              {prj.demoLink && (
                <a
                  href={prj.demoLink}
                  target="_blank"
                  rel="noreferrer"
                  className={styles.primary_action_btn}
                >
                  <Icon name="ExternalLink" size={14} />
                  <span>Live Demo</span>
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
