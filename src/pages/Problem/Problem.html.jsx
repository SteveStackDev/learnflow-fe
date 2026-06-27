// Data
import { problemData } from "./data";
// Import CSS Modules
import styles from "./Problem.module.css";

function Problem() {
  return (
    <>
      <div className={styles.problempage}>
        {/* Hero Section */}
        <section className={styles["prob-hero"]}>
          <div className={styles["prob-hero__container"]}>
            <div className={styles["prob-hero__content"]}>
              <div className={styles["prob-hero__left"]}>
                <h1 className={styles["prob-hero__title"]}>
                  Luyện tập bài tập lập trình để biến kiến thức thành kỹ năng
                  thật
                </h1>
                <p className={styles["prob-hero__desc"]}>
                  Rèn luyện tư duy logic, cấu trúc dữ liệu và giải thuật thông
                  qua hệ thống bài tập thực tiễn từ cơ bản đến nâng cao. Mỗi thử
                  thách là một bước tiến gần hơn tới sự nghiệp lập trình chuyên
                  nghiệp.
                </p>
                <div className={styles["prob-hero__btn-group"]}>
                  <button
                    type="button"
                    className={`${styles["prob-hero__btn"]} ${styles["prob-hero__btn--contained"]}`}
                  >
                    Bắt đầu ngay
                  </button>
                  <button
                    type="button"
                    className={`${styles["prob-hero__btn"]} ${styles["prob-hero__btn--outlined"]}`}
                  >
                    Xem hướng dẫn
                  </button>
                </div>
              </div>

              <div className={styles["prob-hero__right"]}>
                <div className={styles["prob-hero__code-mockup"]}>
                  <pre className={styles["prob-hero__code-pre"]}>
                    <code className={styles["prob-hero__code-text"]}>
                      {`// Tìm đường đi ngắn nhất\nint dijkstra(vector<vector<pair<int, int>>>& adj) {\n  priority_queue<pair<int, int>> pq;\n  while(!pq.empty()) {\n    // ...\n  }\n}`}
                    </code>
                  </pre>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Search & Stats Section */}
        <section className={styles["prob-filter"]}>
          <div className={styles["prob-filter__container"]}>
            <div className={styles["prob-filter__row"]}>
              <input
                type="text"
                placeholder="Tìm kiếm bài tập theo tên hoặc chủ đề..."
                className={styles["prob-filter__search-input"]}
              />
              <div className={styles["prob-filter__select-wrapper"]}>
                <select
                  defaultValue="popular"
                  className={styles["prob-filter__select"]}
                >
                  <option value="popular">Phổ biến</option>
                </select>
              </div>
            </div>

            <div className={styles["prob-filter__stat-list"]}>
              {problemData.stats.map((obj, index) => (
                <div key={index} className={styles["prob-filter__stat-card"]}>
                  <span className={styles["prob-filter__stat-label"]}>
                    {obj.title}
                  </span>
                  <span className={styles["prob-filter__stat-value"]}>
                    {obj.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Challenges Section */}
        <section className={styles["prob-challenges"]}>
          <div className={styles["prob-challenges__container"]}>
            <h2 className={styles["prob-challenges__section-title"]}>
              Danh sách thử thách
            </h2>

            <div className={styles["prob-challenges__list"]}>
              {problemData.items.map((obj, index) => (
                <div key={index} className={styles["prob-challenges__card"]}>
                  <div className={styles["prob-challenges__card-header"]}>
                    <div className={styles["prob-challenges__card-icon"]}>
                      {obj.iconName}
                    </div>
                    <span
                      className={`${styles["prob-challenges__level-badge"]} ${styles[`prob-challenges__level-badge--${obj.level}`]}`}
                    >
                      {obj.level}
                    </span>
                  </div>
                  <div className={styles["prob-challenges__card-body"]}>
                    <h3 className={styles["prob-challenges__card-title"]}>
                      {obj.title}
                    </h3>
                    <p className={styles["prob-challenges__card-desc"]}>
                      {obj.description}
                    </p>
                    <div className={styles["prob-challenges__tag-group"]}>
                      {obj.tags.map((item, tIdx) => (
                        <span
                          key={tIdx}
                          className={styles["prob-challenges__tag-item"]}
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className={styles["prob-challenges__card-actions"]}>
                    <span className={styles["prob-challenges__rate-text"]}>
                      {obj.successRate}
                    </span>
                    <button
                      type="button"
                      className={styles["prob-challenges__action-btn"]}
                    >
                      Giải bài
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div className={styles["prob-challenges__pagination-wrapper"]}>
              <nav className={styles["prob-challenges__pagination"]}>
                <button
                  type="button"
                  className={styles["prob-challenges__page-btn"]}
                  disabled
                >
                  «
                </button>
                <button
                  type="button"
                  className={`${styles["prob-challenges__page-btn"]} ${styles["prob-challenges__page-btn--active"]}`}
                >
                  1
                </button>
                <button
                  type="button"
                  className={styles["prob-challenges__page-btn"]}
                >
                  2
                </button>
                <button
                  type="button"
                  className={styles["prob-challenges__page-btn"]}
                >
                  3
                </button>
                <span className={styles["prob-challenges__page-ellipsis"]}>
                  ...
                </span>
                <button
                  type="button"
                  className={styles["prob-challenges__page-btn"]}
                >
                  15
                </button>
                <button
                  type="button"
                  className={styles["prob-challenges__page-btn"]}
                >
                  »
                </button>
              </nav>
            </div>
          </div>
        </section>

        {/* Guide Section */}
        <section className={styles["prob-guide"]}>
          <div className={styles["prob-guide__container"]}>
            <h2 className={styles["prob-guide__section-title"]}>
              Cách luyện tập hiệu quả trên LearnFlow
            </h2>
            <p className={styles["prob-guide__section-subtitle"]}>
              Phương pháp tiếp cận khoa học giúp bạn nắm vững kiến thức nhanh
              hơn.
            </p>
            <div className={styles["prob-guide__list"]}>
              {problemData.guides.map((obj, index) => (
                <div key={index} className={styles["prob-guide__card"]}>
                  <div className={styles["prob-guide__icon"]}>
                    {obj.iconName}
                  </div>
                  <h3 className={styles["prob-guide__title"]}>{obj.title}</h3>
                  <p className={styles["prob-guide__desc"]}>
                    {obj.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className={styles["prob-faq"]}>
          <div className={styles["prob-faq__container"]}>
            <h2 className={styles["prob-faq__section-title"]}>
              Câu hỏi thường gặp
            </h2>
            <div className={styles["prob-faq__accordion-group"]}>
              {problemData.faqs.map((obj, index) => (
                <details
                  key={index}
                  open={index === 0}
                  className={styles["prob-faq__accordion"]}
                >
                  <summary className={styles["prob-faq__accordion-summary"]}>
                    <span className={styles["prob-faq__accordion-title"]}>
                      {obj.question}
                    </span>
                  </summary>
                  <div className={styles["prob-faq__accordion-details"]}>
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

export default Problem;
