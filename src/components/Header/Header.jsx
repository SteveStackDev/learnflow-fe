import React, { useState, useRef, useEffect } from "react";
import { NavLink, Link, useLocation, useNavigate } from "react-router";
import styles from "./Header.module.css";
import Icon from "~/components/Icon/Icon";

// Navigation Constants
const NAV_LINKS = [
  { to: "/", label: "Trang chủ", end: true },
  { to: "/about", label: "Giới thiệu" },
];

const LEARN_DROPDOWN_ITEMS = [
  { to: "/roadmap", title: "Lộ trình", desc: "Lộ trình nghề nghiệp bài bản", iconName: "Compass" },
  { to: "/course", title: "Khóa học", desc: "Hệ thống khóa học thực chiến", iconName: "Book" },
];

const PRACTICE_DROPDOWN_ITEMS = [
  { to: "/problem", title: "Bài tập", desc: "Kho thử thách coding chuẩn phỏng vấn", iconName: "Terminal" },
  { to: "/contest", title: "Cuộc thi", desc: "Đấu trường thuật toán & thử thách", iconName: "Trophy" },
];

const ACHIEVEMENT_DROPDOWN_ITEMS = [
  { to: "/leaderboard", title: "Bảng xếp hạng", desc: "Top học viên & bảng vinh danh", iconName: "Trophy" },
  { to: "/badge", title: "Danh hiệu", desc: "Hệ thống huy hiệu & thành tích", iconName: "Award" },
];

const OTHER_DROPDOWN_ITEMS = [
  { to: "/pricing", title: "Bảng giá", desc: "Các gói dịch vụ & ưu đãi", iconName: "Tag" },
  { to: "/contact", title: "Liên hệ", desc: "Hỗ trợ & giải đáp thắc mắc", iconName: "Mail" },
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
  const isAchievementActive = ["/leaderboard", "/badge", "/achievement"].includes(location.pathname);
  const isOtherActive = ["/pricing", "/contact", "/pricing/checkout", "/checkout"].includes(location.pathname);

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

  // Close User Menu on Outside Click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setIsUserMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleMouseEnter = (name) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setActiveDropdown(name);
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
    window.dispatchEvent(new Event("fySet_auth_change"));
    closeMenu();
    navigate("/signin");
  };

  // Helper render Top Nav Link
  const renderNavLink = ({ to, label, end, isMobile = false }) => (
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

            {/* Achievement Dropdown */}
            <div
              className={styles.header__dropdown_wrapper}
              onMouseEnter={() => handleMouseEnter("achievement")}
              onMouseLeave={handleMouseLeave}
            >
              <button
                type="button"
                onClick={() => setActiveDropdown(activeDropdown === "achievement" ? null : "achievement")}
                className={`${styles.header__link} ${styles.header__dropdown_trigger} ${
                  isAchievementActive ? styles["header__link--active"] : ""
                }`}
              >
                <span>Achievement</span>
                <Icon
                  name="ChevronDown"
                  size={14}
                  className={`${styles.header__chevron} ${
                    activeDropdown === "achievement" ? styles["header__chevron--open"] : ""
                  }`}
                />
              </button>
              {activeDropdown === "achievement" && renderDropdownMenu(ACHIEVEMENT_DROPDOWN_ITEMS)}
            </div>

            {/* Other Dropdown */}
            <div
              className={styles.header__dropdown_wrapper}
              onMouseEnter={() => handleMouseEnter("other")}
              onMouseLeave={handleMouseLeave}
            >
              <button
                type="button"
                onClick={() => setActiveDropdown(activeDropdown === "other" ? null : "other")}
                className={`${styles.header__link} ${styles.header__dropdown_trigger} ${
                  isOtherActive ? styles["header__link--active"] : ""
                }`}
              >
                <span>Other</span>
                <Icon
                  name="ChevronDown"
                  size={14}
                  className={`${styles.header__chevron} ${
                    activeDropdown === "other" ? styles["header__chevron--open"] : ""
                  }`}
                />
              </button>
              {activeDropdown === "other" && renderDropdownMenu(OTHER_DROPDOWN_ITEMS)}
            </div>
          </nav>

          {/* Desktop Right Actions: Auth buttons OR User Menu */}
          <div className={styles.header__actions}>
            {currentUser ? (
              <div className={styles.header__user_menu_wrapper} ref={userMenuRef}>
                <button
                  type="button"
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className={styles.header__user_btn}
                  aria-label="User Menu"
                >
                  <img src={userAvatar} alt={currentUser.name} className={styles.header__user_avatar} />
                  <span className={styles.header__user_name}>{currentUser.name}</span>
                  <Icon name="ChevronDown" size={14} />
                </button>

                {isUserMenuOpen && (
                  <div className={styles.header__user_dropdown}>
                    <div className={styles.header__user_header}>
                      <div className={styles.header__user_fullname}>{currentUser.name}</div>
                      <div className={styles.header__user_email}>{currentUser.email}</div>
                    </div>

                    <div className={styles.header__user_divider} />

                    <Link to="/dashboard" onClick={closeMenu} className={styles.header__user_item}>
                      <Icon name="LayoutDashboard" size={16} />
                      <span>Trang cá nhân (Dashboard)</span>
                    </Link>

                    <Link to="/setting" onClick={closeMenu} className={styles.header__user_item}>
                      <Icon name="Settings" size={16} />
                      <span>Cài đặt tài khoản</span>
                    </Link>

                    <div className={styles.header__user_divider} />

                    <button type="button" onClick={handleLogout} className={`${styles.header__user_item} ${styles["header__user_item--danger"]}`}>
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
                  Đăng ký ngay
                </Link>
              </>
            )}
          </div>

          {/* Mobile Hamburger Menu Toggle Button */}
          <button
            type="button"
            className={styles.header__toggle}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "Đóng menu" : "Mở menu"}
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

              {/* Mobile Achievement Group */}
              <div className={styles["header__mobile-group"]}>
                <div className={styles["header__mobile-group-title"]}>
                  <Icon name="Award" size={14} /> Achievement
                </div>
                {ACHIEVEMENT_DROPDOWN_ITEMS.map((item) => (
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

              {/* Mobile Other Group */}
              <div className={styles["header__mobile-group"]}>
                <div className={styles["header__mobile-group-title"]}>
                  <Icon name="Grid" size={14} /> Other
                </div>
                {OTHER_DROPDOWN_ITEMS.map((item) => (
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
                    Đăng ký ngay
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