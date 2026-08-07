import styles from "./LeaderboardPodium.module.css";

function LeaderboardPodium({ podium }) {
  return (
    <section className={styles["board-podium"]}>
      <div className={styles["board-podium__container"]}>
        <div className={styles["board-podium__list"]}>
          {podium.map((obj) => (
            <div
              key={obj.id || obj.slug || obj.name || obj.title || obj}
              className={`${styles["board-podium__item"]} ${
                styles[`board-podium__item--rank-${obj.rank}`]
              }`}
            >
              {/* Top Avatar Circle */}
              <div className={styles["board-podium__avatar-wrapper"]}>
                <img
                  className={styles["board-podium__avatar"]}
                  src={obj.avatarUrl}
                  alt={obj.name}
                  loading="lazy"
                  decoding="async"
                />
                <span className={styles["board-podium__rank-badge"]}>
                  #{obj.rank}
                </span>
              </div>

              {/* User Name & Points */}
              <div className={styles["board-podium__name"]}>{obj.name}</div>
              <div className={styles["board-podium__points"]}>
                {obj.points}
              </div>

              {/* Podium Stand Box with Medal */}
              <div className={styles["board-podium__stand"]}>
                <div className={styles["board-podium__medal-wrapper"]}>
                  {obj.rank === 1 && (
                    <div className={`${styles["board-podium__medal"]} ${styles["board-podium__medal--gold"]}`}>
                      <span className={styles["board-podium__medal-num"]}>1</span>
                    </div>
                  )}
                  {obj.rank === 2 && (
                    <div className={`${styles["board-podium__medal"]} ${styles["board-podium__medal--silver"]}`}>
                      <span className={styles["board-podium__medal-num"]}>2</span>
                    </div>
                  )}
                  {obj.rank === 3 && (
                    <div className={`${styles["board-podium__medal"]} ${styles["board-podium__medal--bronze"]}`}>
                      <span className={styles["board-podium__medal-num"]}>3</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default LeaderboardPodium;
