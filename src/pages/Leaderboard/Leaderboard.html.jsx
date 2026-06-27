// Data
import { leaderboardData } from "./data";
// Import CSS Modules
import styles from "./Leaderboard.module.css";

function Leaderboard() {
  return (
    <>
      <div className={styles.leaderboardpage}>
        {/* Hero Section */}
        <section className={styles["board-hero"]}>
          <div className={styles["board-hero__container"]}>
            <div className={styles["board-hero__content"]}>
              <h1 className={styles["board-hero__title"]}>
                Bảng Xếp Hạng Thành Tích
              </h1>
              <p className={styles["board-hero__desc"]}>
                Tôn vinh nỗ lực học tập không ngừng nghỉ. Nơi những nhà phát
                triển tài năng hội ngộ, thi đua và chinh phục những đỉnh cao
                công nghệ mới mỗi ngày.
              </p>
            </div>
          </div>
        </section>

        {/* Podium Section */}
        <section className={styles["board-podium"]}>
          <div className={styles["board-podium__container"]}>
            <div className={styles["board-podium__list"]}>
              {leaderboardData.podium.map((obj, index) => (
                <div
                  key={index}
                  className={`${styles["board-podium__item"]} ${styles[`board-podium__item--rank-${obj.rank}`]}`}
                >
                  <div className={styles["board-podium__rank"]}>
                    #{obj.rank}
                  </div>
                  <img
                    className={styles["board-podium__avatar"]}
                    src={obj.avatarUrl}
                    alt={obj.name}
                  />
                  <div className={styles["board-podium__name"]}>{obj.name}</div>
                  <div className={styles["board-podium__points"]}>
                    {obj.points}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Filter & Search Section */}
        <section className={styles["board-filters"]}>
          <div className={styles["board-filters__container"]}>
            <div className={styles["board-filters__row"]}>
              <div className={styles["board-filters__tab-group"]}>
                {leaderboardData.tabs.map((item, index) => (
                  <button
                    key={index}
                    type="button"
                    className={`${styles["board-filters__tab-btn"]} ${
                      index === 0
                        ? styles["board-filters__tab-btn--active"]
                        : ""
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>

              <div className={styles["board-filters__controls"]}>
                <div className={styles["board-filters__select-wrapper"]}>
                  <select
                    defaultValue="this-week"
                    className={styles["board-filters__select"]}
                  >
                    <option value="this-week">Tuần này</option>
                  </select>
                </div>
                <input
                  type="text"
                  placeholder="Tìm người dùng..."
                  className={styles["board-filters__search-input"]}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Ranking Table Section */}
        <section className={styles["board-ranking"]}>
          <div className={styles["board-ranking__container"]}>
            <div className={styles["board-ranking__table-wrapper"]}>
              <table className={styles["board-ranking__table"]}>
                <thead>
                  <tr
                    className={`${styles["board-ranking__table-row"]} ${styles["board-ranking__table-row--header"]}`}
                  >
                    <th
                      className={`${styles["board-ranking__table-cell"]} ${styles["board-ranking__table-cell--header"]}`}
                    >
                      HẠNG
                    </th>
                    <th
                      className={`${styles["board-ranking__table-cell"]} ${styles["board-ranking__table-cell--header"]}`}
                    >
                      NGƯỜI DÙNG
                    </th>
                    <th
                      className={`${styles["board-ranking__table-cell"]} ${styles["board-ranking__table-cell--header"]}`}
                    >
                      THÀNH TÍCH
                    </th>
                    <th
                      className={`${styles["board-ranking__table-cell"]} ${styles["board-ranking__table-cell--header"]}`}
                    >
                      XU HƯỚNG
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {leaderboardData.rankings.map((obj, index) => (
                    <tr
                      key={index}
                      className={`${styles["board-ranking__table-row"]} ${
                        obj.isCurrentUser
                          ? styles["board-ranking__table-row--current-user"]
                          : ""
                      }`}
                    >
                      <td
                        className={`${styles["board-ranking__table-cell"]} ${styles["board-ranking__table-cell--rank"]}`}
                      >
                        {obj.rank}
                      </td>
                      <td className={styles["board-ranking__table-cell"]}>
                        <div className={styles["board-ranking__user-info"]}>
                          <img
                            className={`${styles["board-ranking__avatar"]} ${styles["board-ranking__avatar--small"]}`}
                            src={obj.avatarUrl}
                            alt={obj.name}
                          />
                          <span className={styles["board-ranking__user-name"]}>
                            {obj.name}
                          </span>
                          {obj.isCurrentUser && (
                            <span className={styles["board-ranking__chip-tag"]}>
                              CURRENT
                            </span>
                          )}
                        </div>
                      </td>
                      <td
                        className={`${styles["board-ranking__table-cell"]} ${styles["board-ranking__table-cell--points"]}`}
                      >
                        {obj.points}
                      </td>
                      <td className={styles["board-ranking__table-cell"]}>
                        <span
                          className={`${styles["board-ranking__trend-label"]} ${styles[`board-ranking__trend-label--${obj.trend}`]}`}
                        >
                          {obj.trend === "up" && "▲"}
                          {obj.trend === "down" && "▼"}
                          {obj.trend === "same" && "—"}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className={styles["board-ranking__pagination-wrapper"]}>
              <nav className={styles["board-ranking__pagination"]}>
                <button
                  type="button"
                  className={styles["board-ranking__page-btn"]}
                  disabled
                >
                  «
                </button>
                <button
                  type="button"
                  className={`${styles["board-ranking__page-btn"]} ${styles["board-ranking__page-btn--active"]}`}
                >
                  1
                </button>
                <button
                  type="button"
                  className={styles["board-ranking__page-btn"]}
                >
                  2
                </button>
                <button
                  type="button"
                  className={styles["board-ranking__page-btn"]}
                >
                  3
                </button>
                <span className={styles["board-ranking__page-ellipsis"]}>
                  ...
                </span>
                <button
                  type="button"
                  className={styles["board-ranking__page-btn"]}
                >
                  15
                </button>
                <button
                  type="button"
                  className={styles["board-ranking__page-btn"]}
                >
                  »
                </button>
              </nav>
            </div>
          </div>
        </section>

        {/* Guide Section */}
        <section className={styles["board-guide"]}>
          <div className={styles["board-guide__container"]}>
            <h2 className={styles["board-guide__section-title"]}>
              Làm thế nào để leo hạng?
            </h2>
            <div className={styles["board-guide__list"]}>
              {leaderboardData.guides.map((obj, index) => (
                <div key={index} className={styles["board-guide__card"]}>
                  <div className={styles["board-guide__icon"]}>
                    {obj.iconName}
                  </div>
                  <h3 className={styles["board-guide__title"]}>{obj.title}</h3>
                  <p className={styles["board-guide__desc"]}>
                    {obj.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className={styles["board-faq"]}>
          <div className={styles["board-faq__container"]}>
            <h2 className={styles["board-faq__section-title"]}>
              Câu hỏi thường gặp
            </h2>
            <div className={styles["board-faq__accordion-group"]}>
              {leaderboardData.faqs.map((obj, index) => (
                <details
                  key={index}
                  open={index === 0}
                  className={styles["board-faq__accordion"]}
                >
                  <summary className={styles["board-faq__accordion-summary"]}>
                    <span className={styles["board-faq__accordion-title"]}>
                      {obj.question}
                    </span>
                  </summary>
                  <div className={styles["board-faq__accordion-details"]}>
                    <p>{obj.answer}</p>
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default Leaderboard;
