import styles from "./ProblemListHero.module.css";
import Icon from "~/components/Icon/Icon";

function ProblemListHero({ heroData, searchQuery, setSearchQuery }) {
  return (
    <section className={`${styles.hero} reveal-card`}>
      <div className={styles.hero__content}>
        <div className={styles["hero__badge-wrap"]}>
          <span className={styles.hero__tag}>
            <Icon name="Terminal" size={16} />
            Luyện tập tư duy thuật toán
          </span>
        </div>

        <h1 className={styles.hero__title}>
          Kho Bài Tập Luyện Code{" "}
          <span className={styles["hero__title--highlight"]}>
            Chuẩn&nbsp;Phỏng&nbsp;Vấn
          </span>
        </h1>
        <p className={styles.hero__desc}>
          {heroData?.description ||
            "Hơn 300+ bài tập lập trình được phân loại theo cấu trúc dữ liệu và thuật toán, kèm hệ thống chấm bài tự động."}
        </p>

        <div className={styles["hero__search-box"]}>
          <span className={styles["hero__search-icon"]}>
            <Icon name="Search" size={18} />
          </span>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Tìm kiếm theo tên bài, chủ đề, thẻ tag..."
            className={styles["hero__search-input"]}
          />
        </div>
      </div>

      <div className={styles.hero__media}>
        <div className={styles["hero__code-window"]}>
          <div className={styles["hero__code-header"]}>
            <div className={styles["hero__code-dots"]}>
              <span className={styles["hero__code-dot--red"]} />
              <span className={styles["hero__code-dot--yellow"]} />
              <span className={styles["hero__code-dot--green"]} />
            </div>
            <span className={styles["hero__code-filename"]}>
              dijkstra_shortest_path.cpp
            </span>
          </div>
          <div className={styles["hero__code-body"]}>
            <div className={styles["hero__code-line"]}>
              <code>
                <span className={styles["hero__code-keyword"]}>int</span>{" "}
                <span className={styles["hero__code-func"]}>dijkstra</span>(
                <span className={styles["hero__code-keyword"]}>int</span> src,{" "}
                <span className={styles["hero__code-keyword"]}>int</span> target) &#123;
              </code>
            </div>
            <div className={styles["hero__code-line"]}>
              <code>
                &nbsp;&nbsp;
                <span className={styles["hero__code-type"]}>priority_queue</span>
                &lt;pair&lt;int,int&gt;&gt; pq;
              </code>
            </div>
            <div className={styles["hero__code-line"]}>
              <code>
                &nbsp;&nbsp;pq.<span className={styles["hero__code-method"]}>push</span>
                (&#123;<span className={styles["hero__code-num"]}>0</span>, src&#125;);
              </code>
            </div>
            <div className={styles["hero__code-line"]}>
              <code>
                &nbsp;&nbsp;<span className={styles["hero__code-var"]}>dist</span>[src] ={" "}
                <span className={styles["hero__code-num"]}>0</span>;
              </code>
            </div>
            <div className={styles["hero__code-line"]}>
              <code>
                &nbsp;&nbsp;<span className={styles["hero__code-keyword"]}>while</span>
                (!pq.<span className={styles["hero__code-method"]}>empty</span>()) &#123;{" "}
                <span className={styles["hero__code-comment"]}>// ...</span> &#125;
              </code>
            </div>
            <div className={styles["hero__code-line"]}>
              <code>
                &nbsp;&nbsp;<span className={styles["hero__code-keyword"]}>return</span>{" "}
                <span className={styles["hero__code-var"]}>dist</span>[target];
              </code>
            </div>
            <div className={styles["hero__code-line"]}>
              <code>&#125;</code>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProblemListHero;
