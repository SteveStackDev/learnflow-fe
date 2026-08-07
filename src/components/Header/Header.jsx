import { useState } from "react";
import { NavLink, Link } from "react-router";
import styles from "./Header.module.css";
// Components
import Icon from "~/components/Icon/Icon";

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className={styles.header}>
      <div className={`${styles.header__container} ${styles["header__container--fluid"]}`}>
        <div className={styles.header__row}>
          {/* Logo & Brand Title */}
          <Link to="/" className={styles.header__brand} onClick={closeMenu}>
            <div className={styles.header__logo}>
              <Icon name="LogoCap" size={22} style={{ color: "#ffffff" }} />
            </div>
            <div className={styles.header__titles}>
              <span className={styles.header__title}>LearnFlow</span>
              <span className={styles.header__subtitle}>EDTECH HUB</span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
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

          {/* Desktop Right Action Buttons */}
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

          {/* Mobile Hamburger / Close Toggle Button */}
          <button
            type="button"
            className={styles.header__toggle}
            onClick={toggleMenu}
            aria-label="Toggle Navigation Menu"
            aria-expanded={isMenuOpen}
            aria-controls="mobile-navigation-menu"
          >
            <Icon name={isMenuOpen ? "X" : "Menu"} size={24} strokeWidth={2.5} />
          </button>
        </div>

        {/* Mobile Dropdown Navigation Drawer */}
        {isMenuOpen && (
          <div id="mobile-navigation-menu" className={styles["header__mobile-dropdown"]}>
            <nav className={styles["header__mobile-nav"]}>
              <NavLink
                to="/"
                end
                onClick={closeMenu}
                className={({ isActive }) =>
                  `${styles["header__mobile-link"]} ${isActive ? styles["header__mobile-link--active"] : ""}`
                }
              >
                Trang chủ
              </NavLink>
              <NavLink
                to="/about"
                onClick={closeMenu}
                className={({ isActive }) =>
                  `${styles["header__mobile-link"]} ${isActive ? styles["header__mobile-link--active"] : ""}`
                }
              >
                Giới thiệu
              </NavLink>
              <NavLink
                to="/roadmap"
                onClick={closeMenu}
                className={({ isActive }) =>
                  `${styles["header__mobile-link"]} ${isActive ? styles["header__mobile-link--active"] : ""}`
                }
              >
                Lộ trình
              </NavLink>
              <NavLink
                to="/course"
                onClick={closeMenu}
                className={({ isActive }) =>
                  `${styles["header__mobile-link"]} ${isActive ? styles["header__mobile-link--active"] : ""}`
                }
              >
                Khóa học
              </NavLink>
              <NavLink
                to="/problem"
                onClick={closeMenu}
                className={({ isActive }) =>
                  `${styles["header__mobile-link"]} ${isActive ? styles["header__mobile-link--active"] : ""}`
                }
              >
                Bài tập
              </NavLink>
              <NavLink
                to="/contest"
                onClick={closeMenu}
                className={({ isActive }) =>
                  `${styles["header__mobile-link"]} ${isActive ? styles["header__mobile-link--active"] : ""}`
                }
              >
                Cuộc thi
              </NavLink>
              <NavLink
                to="/leaderboard"
                onClick={closeMenu}
                className={({ isActive }) =>
                  `${styles["header__mobile-link"]} ${isActive ? styles["header__mobile-link--active"] : ""}`
                }
              >
                Bảng xếp hạng
              </NavLink>
              <NavLink
                to="/badge"
                onClick={closeMenu}
                className={({ isActive }) =>
                  `${styles["header__mobile-link"]} ${isActive ? styles["header__mobile-link--active"] : ""}`
                }
              >
                Danh hiệu
              </NavLink>
              <NavLink
                to="/pricing"
                onClick={closeMenu}
                className={({ isActive }) =>
                  `${styles["header__mobile-link"]} ${isActive ? styles["header__mobile-link--active"] : ""}`
                }
              >
                Bảng giá
              </NavLink>
              <NavLink
                to="/contact"
                onClick={closeMenu}
                className={({ isActive }) =>
                  `${styles["header__mobile-link"]} ${isActive ? styles["header__mobile-link--active"] : ""}`
                }
              >
                Liên hệ
              </NavLink>
            </nav>

            <div className={styles["header__mobile-actions"]}>
              <Link
                to="/signin"
                onClick={closeMenu}
                className={`${styles.header__btn} ${styles["header__btn--outlined"]} ${styles["header__btn--full"]}`}
              >
                Đăng nhập
              </Link>
              <Link
                to="/signup"
                onClick={closeMenu}
                className={`${styles.header__btn} ${styles["header__btn--contained"]} ${styles["header__btn--full"]}`}
              >
                Đăng ký
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
