import { NavLink, Link } from "react-router";
import styles from "./Header.module.css";

function Header() {
  return (
    <header className={styles.header}>
      <div
        className={`${styles.header__container} ${styles["header__container--fluid"]}`}
      >
        <div className={styles.header__row}>
          <Link to="/" className={styles.header__brand}>
            <div className={styles.header__logo}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <path d="M12 3L1 9l11 6 9-4.91V17h2V9L12 3z" fill="#ffffff" />
                <path d="M5 13.18v4L12 21l7-3.82v-4L12 17 5 13.18z" fill="#ffffff" opacity="0.85" />
              </svg>
            </div>
            <div className={styles.header__titles}>
              <span className={styles.header__title}>LearnFlow</span>
              <span className={styles.header__subtitle}>EDTECH HUB</span>
            </div>
          </Link>

          <nav className={styles.header__nav}>
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                `${styles.header__link} ${isActive ? styles["header__link--active"] : ""}`
              }
            >
              Trang chủ
            </NavLink>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                `${styles.header__link} ${isActive ? styles["header__link--active"] : ""}`
              }
            >
              Giới thiệu
            </NavLink>
            <NavLink
              to="/roadmap"
              className={({ isActive }) =>
                `${styles.header__link} ${isActive ? styles["header__link--active"] : ""}`
              }
            >
              Lộ trình
            </NavLink>
            <NavLink
              to="/course"
              className={({ isActive }) =>
                `${styles.header__link} ${isActive ? styles["header__link--active"] : ""}`
              }
            >
              Khóa học
            </NavLink>
            <NavLink
              to="/problem"
              className={({ isActive }) =>
                `${styles.header__link} ${isActive ? styles["header__link--active"] : ""}`
              }
            >
              Bài tập
            </NavLink>
            <NavLink
              to="/contest"
              className={({ isActive }) =>
                `${styles.header__link} ${isActive ? styles["header__link--active"] : ""}`
              }
            >
              Cuộc thi
            </NavLink>
            <NavLink
              to="/leaderboard"
              className={({ isActive }) =>
                `${styles.header__link} ${isActive ? styles["header__link--active"] : ""}`
              }
            >
              Bảng xếp hạng
            </NavLink>
            <NavLink
              to="/badge"
              className={({ isActive }) =>
                `${styles.header__link} ${isActive ? styles["header__link--active"] : ""}`
              }
            >
              Danh hiệu
            </NavLink>
            <NavLink
              to="/pricing"
              className={({ isActive }) =>
                `${styles.header__link} ${isActive ? styles["header__link--active"] : ""}`
              }
            >
              Bảng giá
            </NavLink>
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                `${styles.header__link} ${isActive ? styles["header__link--active"] : ""}`
              }
            >
              Liên hệ
            </NavLink>
          </nav>

          <div className={styles.header__actions}>
            <Link
              to="/signin"
              className={`${styles.header__btn} ${styles["header__btn--outlined"]}`}
            >
              Đăng nhập
            </Link>
            <Link
              to="/signup"
              className={`${styles.header__btn} ${styles["header__btn--contained"]}`}
            >
              Đăng ký
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
