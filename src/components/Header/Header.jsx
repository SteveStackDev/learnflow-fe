import { useState, useRef, useEffect } from "react";
import { NavLink, Link, useLocation } from "react-router";
import styles from "./Header.module.css";
// Components
import Icon from "~/components/Icon/Icon";

const LEARN_DROPDOWN_ITEMS = [
  {
    to: "/roadmap",
    title: "Lộ trình",
    desc: "Lộ trình nghề nghiệp bài bản",
    iconName: "Compass",
  },
  {
    to: "/course",
    title: "Khóa học",
    desc: "Hệ thống khóa học thực chiến",
    iconName: "Book",
  },
];

const PRACTICE_DROPDOWN_ITEMS = [
  {
    to: "/problem",
    title: "Bài tập",
    desc: "Kho thử thách coding chuẩn phỏng vấn",
    iconName: "Terminal",
  },
  {
    to: "/contest",
    title: "Cuộc thi",
    desc: "Đấu trường thuật toán & thử thách",
    iconName: "Trophy",
  },
];

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const location = useLocation();
  const timeoutRef = useRef(null);

  const isLearnActive = location.pathname === "/roadmap" || location.pathname === "/course";
  const isPracticeActive = location.pathname === "/problem" || location.pathname === "/contest";

  useEffect(() => {
    setActiveDropdown(null);
    setIsMenuOpen(false);
  }, [location.pathname]);

  const handleMouseEnter = (type) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setActiveDropdown(type);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 150);
  };

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
    setActiveDropdown(null);
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
              <span className={styles.header__title}>FySet</span>
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

            {/* Learn Dropdown */}
            <div
              className={styles.header__dropdown_wrapper}
              onMouseEnter={() => handleMouseEnter("learn")}
              onMouseLeave={handleMouseLeave}
            >
              <button
                type="button"
                onClick={() => setActiveDropdown(activeDropdown === "learn" ? null : "learn")}
                className={`${styles.header__link} ${styles.header__dropdown_trigger} ${
                  isLearnActive ? styles["header__link--active"] : ""
                }`}
              >
                <span>Learn</span>
                <Icon
                  name="ChevronDown"
                  size={14}
                  className={`${styles.header__chevron} ${
                    activeDropdown === "learn" ? styles["header__chevron--open"] : ""
                  }`}
                />
              </button>

              {activeDropdown === "learn" && (
                <div className={styles.header__dropdown_menu}>
                  {LEARN_DROPDOWN_ITEMS.map((item) => (
                    <NavLink
                      key={item.to}
                      to={item.to}
                      onClick={closeMenu}
                      className={({ isActive }) =>
                        `${styles.header__dropdown_item} ${
                          isActive ? styles["header__dropdown_item--active"] : ""
                        }`
                      }
                    >
                      <div className={styles.header__dropdown_icon}>
                        <Icon name={item.iconName} size={18} />
                      </div>
                      <div className={styles.header__dropdown_info}>
                        <span className={styles.header__dropdown_title}>{item.title}</span>
                        <span className={styles.header__dropdown_desc}>{item.desc}</span>
                      </div>
                    </NavLink>
                  ))}
                </div>
              )}
            </div>

            {/* Practice Dropdown */}
            <div
              className={styles.header__dropdown_wrapper}
              onMouseEnter={() => handleMouseEnter("practice")}
              onMouseLeave={handleMouseLeave}
            >
              <button
                type="button"
                onClick={() => setActiveDropdown(activeDropdown === "practice" ? null : "practice")}
                className={`${styles.header__link} ${styles.header__dropdown_trigger} ${
                  isPracticeActive ? styles["header__link--active"] : ""
                }`}
              >
                <span>Practice</span>
                <Icon
                  name="ChevronDown"
                  size={14}
                  className={`${styles.header__chevron} ${
                    activeDropdown === "practice" ? styles["header__chevron--open"] : ""
                  }`}
                />
              </button>

              {activeDropdown === "practice" && (
                <div className={styles.header__dropdown_menu}>
                  {PRACTICE_DROPDOWN_ITEMS.map((item) => (
                    <NavLink
                      key={item.to}
                      to={item.to}
                      onClick={closeMenu}
                      className={({ isActive }) =>
                        `${styles.header__dropdown_item} ${
                          isActive ? styles["header__dropdown_item--active"] : ""
                        }`
                      }
                    >
                      <div className={styles.header__dropdown_icon}>
                        <Icon name={item.iconName} size={18} />
                      </div>
                      <div className={styles.header__dropdown_info}>
                        <span className={styles.header__dropdown_title}>{item.title}</span>
                        <span className={styles.header__dropdown_desc}>{item.desc}</span>
                      </div>
                    </NavLink>
                  ))}
                </div>
              )}
            </div>

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

            <NavLink
              to="/setting"
              className={({ isActive }) =>
                `${styles.header__link} ${isActive ? styles["header__link--active"] : ""}`
              }
            >
              Cài đặt
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

              {/* Learn Group */}
              <div className={styles["header__mobile-group"]}>
                <div className={styles["header__mobile-group-title"]}>
                  <Icon name="Compass" size={14} /> Learn
                </div>
                <NavLink
                  to="/roadmap"
                  onClick={closeMenu}
                  className={({ isActive }) =>
                    `${styles["header__mobile-link"]} ${styles["header__mobile-link--sub"]} ${
                      isActive ? styles["header__mobile-link--active"] : ""
                    }`
                  }
                >
                  Lộ trình
                </NavLink>
                <NavLink
                  to="/course"
                  onClick={closeMenu}
                  className={({ isActive }) =>
                    `${styles["header__mobile-link"]} ${styles["header__mobile-link--sub"]} ${
                      isActive ? styles["header__mobile-link--active"] : ""
                    }`
                  }
                >
                  Khóa học
                </NavLink>
              </div>

              {/* Practice Group */}
              <div className={styles["header__mobile-group"]}>
                <div className={styles["header__mobile-group-title"]}>
                  <Icon name="Terminal" size={14} /> Practice
                </div>
                <NavLink
                  to="/problem"
                  onClick={closeMenu}
                  className={({ isActive }) =>
                    `${styles["header__mobile-link"]} ${styles["header__mobile-link--sub"]} ${
                      isActive ? styles["header__mobile-link--active"] : ""
                    }`
                  }
                >
                  Bài tập
                </NavLink>
                <NavLink
                  to="/contest"
                  onClick={closeMenu}
                  className={({ isActive }) =>
                    `${styles["header__mobile-link"]} ${styles["header__mobile-link--sub"]} ${
                      isActive ? styles["header__mobile-link--active"] : ""
                    }`
                  }
                >
                  Cuộc thi
                </NavLink>
              </div>

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

              <NavLink
                to="/setting"
                onClick={closeMenu}
                className={({ isActive }) =>
                  `${styles["header__mobile-link"]} ${isActive ? styles["header__mobile-link--active"] : ""}`
                }
              >
                Cài đặt
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
