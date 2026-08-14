import React, { useState, useRef, useEffect } from "react";
import { NavLink, Link, useLocation, useNavigate } from "react-router";
import styles from "./Header.module.css";
import Icon from "~/components/Icon/Icon";

// Navigation Constants
const NAV_LINKS = [
  { to: "/", label: "Trang chủ", end: true },
  { to: "/about", label: "Giới thiệu" },
  { to: "/leaderboard", label: "Bảng xếp hạng" },
  { to: "/badge", label: "Danh hiệu" },
  { to: "/pricing", label: "Bảng giá" },
  { to: "/contact", label: "Liên hệ" },
];

const LEARN_DROPDOWN_ITEMS = [
  { to: "/roadmap", title: "Lộ trình", desc: "Lộ trình nghề nghiệp bài bản", iconName: "Compass" },
  { to: "/course", title: "Khóa học", desc: "Hệ thống khóa học thực chiến", iconName: "Book" },
];

const PRACTICE_DROPDOWN_ITEMS = [
  { to: "/problem", title: "Bài tập", desc: "Kho thử thách coding chuẩn phỏng vấn", iconName: "Terminal" },
  { to: "/contest", title: "Cuộc thi", desc: "Đấu trường thuật toán & thử thách", iconName: "Trophy" },
];

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const saved = localStorage.getItem("fySet_user");
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const location = useLocation();
  const navigate = useNavigate();
  const timeoutRef = useRef(null);
  const userMenuRef = useRef(null);

  const isLearnActive = ["/roadmap", "/course"].includes(location.pathname);
  const isPracticeActive = ["/problem", "/contest"].includes(location.pathname);

  // Sync Auth State across Tabs and Custom Events
  useEffect(() => {
    const handleAuthChange = () => {
      try {
        const saved = localStorage.getItem("fySet_user");
        setCurrentUser(saved ? JSON.parse(saved) : null);
      } catch {
        setCurrentUser(null);
      }
    };

    window.addEventListener("fySet_auth_change", handleAuthChange);
    window.addEventListener("storage", handleAuthChange);

    return () => {
      window.removeEventListener("fySet_auth_change", handleAuthChange);
      window.removeEventListener("storage", handleAuthChange);
    };
  }, []);

  // Auto close menus on route change
  useEffect(() => {
    setActiveDropdown(null);
    setIsMenuOpen(false);
    setIsUserMenuOpen(false);
  }, [location.pathname]);

  // Handle click outside to close User Menu
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target)) {
        setIsUserMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleMouseEnter = (type) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setActiveDropdown(type);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 150);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
    setActiveDropdown(null);
    setIsUserMenuOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("fySet_user");
    setCurrentUser(null);
    setIsUserMenuOpen(false);
    window.dispatchEvent(new Event("fySet_auth_change"));
    navigate("/");
  };

  // Helper render NavLink
  const renderNavLink = ({ to, label, end = false, isMobile = false }) => (
    <NavLink
      key={to}
      to={to}
      end={end}
      onClick={closeMenu}
      className={({ isActive }) =>
        isMobile
          ? `${styles["header__mobile-link"]} ${isActive ? styles["header__mobile-link--active"] : ""}`
          : `${styles.header__link} ${isActive ? styles["header__link--active"] : ""}`
      }
    >
      {label}
    </NavLink>
  );

  // Helper render Dropdown Menu Items
  const renderDropdownMenu = (items) => (
    <div className={styles.header__dropdown_menu}>
      {items.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          onClick={closeMenu}
          className={({ isActive }) =>
            `${styles.header__dropdown_item} ${isActive ? styles["header__dropdown_item--active"] : ""}`
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
  );

  const userAvatar = currentUser?.avatar || "https://ui-avatars.com/api/?name=" + encodeURIComponent(currentUser?.name || "User");

  return (
    <header className={styles.header}>
      <div className={`${styles.header__container} ${styles["header__container--fluid"]}`}>
        <div className={styles.header__row}>
          {/* Brand Logo */}
          <Link to="/" className={styles.header__brand} onClick={closeMenu}>
            <div className={styles.header__logo}>
              <Icon name="LogoCap" size={22} style={{ color: "#ffffff" }} />
            </div>
            <div className={styles.header__titles}>
              <span className={styles.header__title}>FySet</span>
              <span className={styles.header__subtitle}>EDTECH HUB</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className={styles.header__nav}>
            {renderNavLink(NAV_LINKS[0])} {/* Trang chủ */}
            {renderNavLink(NAV_LINKS[1])} {/* Giới thiệu */}

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
              {activeDropdown === "learn" && renderDropdownMenu(LEARN_DROPDOWN_ITEMS)}
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
              {activeDropdown === "practice" && renderDropdownMenu(PRACTICE_DROPDOWN_ITEMS)}
            </div>

            {/* Các nav links còn lại */}
            {NAV_LINKS.slice(2).map((link) => renderNavLink(link))}
          </nav>

          {/* User Auth / Actions */}
          <div className={styles.header__actions}>
            {currentUser ? (
              <div className={styles.header__user_wrapper} ref={userMenuRef}>
                <button
                  type="button"
                  onClick={() => setIsUserMenuOpen((prev) => !prev)}
                  className={`${styles.header__user_btn} ${
                    isUserMenuOpen ? styles["header__user_btn--active"] : ""
                  }`}
                >
                  <img src={userAvatar} alt={currentUser.name} className={styles.header__user_avatar} />
                  <span className={styles.header__user_name}>{currentUser.name}</span>
                  <Icon
                    name="ChevronDown"
                    size={14}
                    className={`${styles.header__chevron} ${
                      isUserMenuOpen ? styles["header__chevron--open"] : ""
                    }`}
                  />
                </button>

                {isUserMenuOpen && (
                  <div className={styles.header__user_menu}>
                    <div className={styles.header__user_header}>
                      <img src={userAvatar} alt={currentUser.name} className={styles.header__user_avatar_large} />
                      <div className={styles.header__user_details}>
                        <span className={styles.header__user_fullname}>{currentUser.name}</span>
                        <span className={styles.header__user_email}>{currentUser.email}</span>
                      </div>
                    </div>

                    <hr className={styles.header__user_divider} />

                    <Link to="/dashboard" onClick={() => setIsUserMenuOpen(false)} className={styles.header__user_menu_item}>
                      <Icon name="LayoutDashboard" size={16} />
                      <span>Dashboard</span>
                    </Link>

                    <Link to="/setting" onClick={() => setIsUserMenuOpen(false)} className={styles.header__user_menu_item}>
                      <Icon name="Settings" size={16} />
                      <span>Cài đặt tài khoản</span>
                    </Link>

                    <button
                      type="button"
                      onClick={handleLogout}
                      className={`${styles.header__user_menu_item} ${styles["header__user_menu_item--danger"]}`}
                    >
                      <Icon name="LogOut" size={16} />
                      <span>Đăng xuất</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link to="/signin" className={`${styles.header__btn} ${styles["header__btn--outlined"]}`}>
                  Đăng nhập
                </Link>
                <Link to="/signup" className={`${styles.header__btn} ${styles["header__btn--contained"]}`}>
                  Đăng ký
                </Link>
              </>
            )}
          </div>

          {/* Mobile Toggle Button */}
          <button
            type="button"
            className={styles.header__toggle}
            onClick={() => setIsMenuOpen((prev) => !prev)}
            aria-label="Toggle Navigation Menu"
            aria-expanded={isMenuOpen}
          >
            <Icon name={isMenuOpen ? "X" : "Menu"} size={24} strokeWidth={2.5} />
          </button>
        </div>

        {/* Mobile Navigation Drawer */}
        {isMenuOpen && (
          <div id="mobile-navigation-menu" className={styles["header__mobile-dropdown"]}>
            <nav className={styles["header__mobile-nav"]}>
              {renderNavLink({ ...NAV_LINKS[0], isMobile: true })}
              {renderNavLink({ ...NAV_LINKS[1], isMobile: true })}

              {/* Mobile Learn Group */}
              <div className={styles["header__mobile-group"]}>
                <div className={styles["header__mobile-group-title"]}>
                  <Icon name="Compass" size={14} /> Learn
                </div>
                {LEARN_DROPDOWN_ITEMS.map((item) => (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    onClick={closeMenu}
                    className={({ isActive }) =>
                      `${styles["header__mobile-link"]} ${styles["header__mobile-link--sub"]} ${
                        isActive ? styles["header__mobile-link--active"] : ""
                      }`
                    }
                  >
                    {item.title}
                  </NavLink>
                ))}
              </div>

              {/* Mobile Practice Group */}
              <div className={styles["header__mobile-group"]}>
                <div className={styles["header__mobile-group-title"]}>
                  <Icon name="Terminal" size={14} /> Practice
                </div>
                {PRACTICE_DROPDOWN_ITEMS.map((item) => (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    onClick={closeMenu}
                    className={({ isActive }) =>
                      `${styles["header__mobile-link"]} ${styles["header__mobile-link--sub"]} ${
                        isActive ? styles["header__mobile-link--active"] : ""
                      }`
                    }
                  >
                    {item.title}
                  </NavLink>
                ))}
              </div>

              {NAV_LINKS.slice(2).map((link) => renderNavLink({ ...link, isMobile: true }))}
            </nav>

            {/* Mobile Actions */}
            <div className={styles["header__mobile-actions"]}>
              {currentUser ? (
                <div className={styles.header__mobile_user_box}>
                  <div className={styles.header__mobile_user_info}>
                    <img src={userAvatar} alt={currentUser.name} className={styles.header__user_avatar} />
                    <div>
                      <div className={styles.header__user_fullname}>{currentUser.name}</div>
                      <div className={styles.header__user_email}>{currentUser.email}</div>
                    </div>
                  </div>
                  <Link
                    to="/dashboard"
                    onClick={closeMenu}
                    className={`${styles.header__btn} ${styles["header__btn--contained"]} ${styles["header__btn--full"]}`}
                    style={{ marginBottom: "8px" }}
                  >
                    Dashboard
                  </Link>
                  <button
                    type="button"
                    onClick={() => {
                      closeMenu();
                      handleLogout();
                    }}
                    className={`${styles.header__btn} ${styles["header__btn--outlined"]} ${styles["header__btn--full"]}`}
                  >
                    Đăng xuất
                  </button>
                </div>
              ) : (
                <>
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
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;