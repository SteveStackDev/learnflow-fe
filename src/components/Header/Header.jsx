import { Link } from "react-router";
import styles from "./Header.module.css";

function Header() {
  return (
    <header className={styles.header}>
      <div
        className={`${styles.header__container} ${styles["header__container--fluid"]}`}
      >
        <div className={styles.header__row}>
          <div className={styles.header__brand}>
            <div className={styles.header__logo} />
            <div className={styles.header__titles}>
              <span className={styles.header__title}>LearnFlow</span>
              <span className={styles.header__subtitle}>EDTECH HUB</span>
            </div>
          </div>

          <nav className={styles.header__nav}>
            <Link to="/" className={styles.header__link}>
              Trang chủ
            </Link>
            <Link to="/about" className={styles.header__link}>
              Giới thiệu
            </Link>
            <Link to="/roadmap" className={styles.header__link}>
              Lộ trình
            </Link>
            <Link to="/course" className={styles.header__link}>
              Khóa học
            </Link>
            <Link to="/problem" className={styles.header__link}>
              Bài tập
            </Link>
            <Link to="/contest" className={styles.header__link}>
              Cuộc thi
            </Link>
            <Link to="/leaderboard" className={styles.header__link}>
              Bảng xếp hạng
            </Link>
            <Link to="/badge" className={styles.header__link}>
              Danh hiệu
            </Link>
            <Link to="/pricing" className={styles.header__link}>
              Bảng giá
            </Link>
            <Link to="/contact" className={styles.header__link}>
              Liên hệ
            </Link>
          </nav>

          <div className={styles.header__actions}>
            <button
              className={`${styles.header__btn} ${styles["header__btn--outlined"]}`}
            >
              Đăng nhập
            </button>
            <button
              className={`${styles.header__btn} ${styles["header__btn--contained"]}`}
            >
              Đăng ký
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
