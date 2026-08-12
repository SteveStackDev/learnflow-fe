import styles from "./AboutTeam.module.css";

function AboutTeam({ team }) {
  if (!team || team.length === 0) return null;

  return (
    <section className={styles["about-team"]}>
      <div className={styles["about-team__container"]}>
        <div className={styles["about-team__header"]}>
          <span className={styles["about-team__tag"]}>Team</span>
          <h2 className={styles["about-team__title"]}>Đội ngũ sáng lập & phát triển</h2>
          <p className={styles["about-team__subtitle"]}>
            Những con người tâm huyết đứng sau sự phát triển không ngừng của FySet.
          </p>
        </div>

        <div className={styles["about-team__grid"]}>
          {team.map((member) => (
            <div key={member.id} className={`${styles["about-team__card"]} reveal-card`}>
              <div className={styles["about-team__avatar-wrap"]}>
                <div className={styles["about-team__avatar-placeholder"]}>
                  {member.name.charAt(0)}
                </div>
              </div>
              <h3 className={styles["about-team__name"]}>{member.name}</h3>
              <span className={styles["about-team__role"]}>{member.role}</span>
              <p className={styles["about-team__desc"]}>{member.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default AboutTeam;
