import Icon from "~/components/Icon/Icon";
import styles from "./ProblemHero.module.css";

function ProblemHero() {
  return (
    <section className={styles["prob-hero"]}>
      <div className={styles["prob-hero__container"]}>
        <div className={styles["prob-hero__content"]}>
          <div className={styles["prob-hero__left"]}>
            <div className={styles["prob-hero__badge-wrap"]}>
              <span className={styles["prob-hero__tag"]}>
                <Icon name="Terminal" size={16} />
                Luyện tập tư duy thuật toán
              </span>
            </div>
            <h1 className={styles["prob-hero__title"]}>
              Thử thách kho bài tập phong phú, chuẩn phỏng vấn
            </h1>
            <p className={styles["prob-hero__desc"]}>
              Hơn 300+ bài tập lập trình được phân loại theo cấu trúc dữ liệu và
              thuật toán, kèm lời giải chi tiết và cộng đồng thảo luận sôi nổi.
            </p>
            <div className={styles["prob-hero__btn-group"]}>
              <button
                type="button"
                className={`${styles["prob-hero__btn"]} ${styles["prob-hero__btn--contained"]}`}
              >
                Tạo thử thách ngẫu nhiên
              </button>
              <button
                type="button"
                className={`${styles["prob-hero__btn"]} ${styles["prob-hero__btn--outlined"]}`}
              >
                Xem bảng xếp hạng
              </button>
            </div>
          </div>

          <div className={styles["prob-hero__media"]}>
            <div className={styles["prob-hero__code-window"]}>
              <div className={styles["prob-hero__code-header"]}>
                <div className={styles["prob-hero__code-dots"]}>
                  <span className={styles["prob-hero__code-dot--red"]} />
                  <span className={styles["prob-hero__code-dot--yellow"]} />
                  <span className={styles["prob-hero__code-dot--green"]} />
                </div>
                <span className={styles["prob-hero__code-filename"]}>
                  dijkstra_shortest_path.cpp
                </span>
              </div>
              <div className={styles["prob-hero__code-body"]}>
                <div className={styles["prob-hero__code-line"]}>
                  <code>
                    <span className={styles["prob-hero__code-keyword"]}>int</span>{" "}
                    <span className={styles["prob-hero__code-func"]}>dijkstra</span>(
                    <span className={styles["prob-hero__code-keyword"]}>int</span> src,{" "}
                    <span className={styles["prob-hero__code-keyword"]}>int</span> target) &#123;
                  </code>
                </div>
                <div className={styles["prob-hero__code-line"]}>
                  <code>
                    &nbsp;&nbsp;<span className={styles["prob-hero__code-type"]}>priority_queue</span>&lt;pair&lt;int,int&gt;&gt; pq;
                  </code>
                </div>
                <div className={styles["prob-hero__code-line"]}>
                  <code>
                    &nbsp;&nbsp;pq.<span className={styles["prob-hero__code-method"]}>push</span>(&#123;<span className={styles["prob-hero__code-num"]}>0</span>, src&#125;);
                  </code>
                </div>
                <div className={styles["prob-hero__code-line"]}>
                  <code>
                    &nbsp;&nbsp;<span className={styles["prob-hero__code-var"]}>dist</span>[src] = <span className={styles["prob-hero__code-num"]}>0</span>;
                  </code>
                </div>
                <div className={styles["prob-hero__code-line"]}>
                  <code>
                    &nbsp;&nbsp;<span className={styles["prob-hero__code-keyword"]}>while</span>(!pq.<span className={styles["prob-hero__code-method"]}>empty</span>()) &#123; <span className={styles["prob-hero__code-comment"]}>// ...</span> &#125;
                  </code>
                </div>
                <div className={styles["prob-hero__code-line"]}>
                  <code>
                    &nbsp;&nbsp;<span className={styles["prob-hero__code-keyword"]}>return</span> <span className={styles["prob-hero__code-var"]}>dist</span>[target];
                  </code>
                </div>
                <div className={styles["prob-hero__code-line"]}>
                  <code>&#125;</code>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProblemHero;
