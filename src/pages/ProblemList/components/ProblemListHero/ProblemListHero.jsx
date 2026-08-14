import { Link } from "react-router";
import styles from "./ProblemListHero.module.css";
import Icon from "~/components/Icon/Icon";
import heroUrl from "~/assets/images/Home/hero.webp";

function ProblemListHero({ heroData, searchQuery, setSearchQuery }) {
  return (
    <section className={`${styles.hero} reveal-card`}>
      <div className={styles.hero__content}>
        <Link to="/problem" className={styles["hero__back-btn"]}>
          <Icon name="ArrowLeft" size={16} />
          <span>Quay về trang bài tập</span>
        </Link>

        <h1 className={styles.hero__title}>{heroData.title}</h1>
        <p className={styles.hero__desc}>{heroData.description}</p>

        <div className={styles["hero__search-box"]}>
          <span className={styles["hero__search-icon"]}>
            <Icon name="Search" size={18} />
          </span>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Tìm kiếm bài tập..."
            className={styles["hero__search-input"]}
          />
        </div>
      </div>

      <div className={styles.hero__media}>
        <img src={heroUrl} alt="Hình minh họa thư viện bài tập thuật toán FySet" className={styles.hero__img} />
      </div>
    </section>
  );
}

export default ProblemListHero;
