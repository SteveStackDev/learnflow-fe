import heroUrl from "~/assets/images/Home/hero.webp";
import styles from "./HomeTeam.module.css";

function HomeTeam({ team }) {
  return (
    <section className={styles["home-team"]}>
      <div className={styles["home-team__container"]}>
        <div className={styles["home-team__header"]}>
          <h2 className={styles["home-team__section-title"]}>Đội ngũ phát triển</h2>
          <p className={styles["home-team__section-subtitle"]}>
            Những người đứng sau sự thành công của các lập trình viên chất lượng cao.
          </p>
        </div>

        <div className={styles["home-team__list"]}>
          {team.map((obj, index) => (
            <div
              key={obj.id || obj.slug || obj.name || obj.title || obj}
              className={`${styles["home-team__card"]} reveal-card`}
              style={{ transitionDelay: `${index * 130}ms` }}
            >
              <img
                className={styles["home-team__card-avatar"]}
                alt={`Chân dung thành viên ${obj.name}`}
                src={heroUrl}
                loading="lazy"
                decoding="async"
              />
              <div className={styles["home-team__card-content"]}>
                <h3 className={styles["home-team__card-name"]}>{obj.name}</h3>
                <p className={styles["home-team__card-role"]}>{obj.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default HomeTeam;
