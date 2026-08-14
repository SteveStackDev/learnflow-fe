import { useState } from "react";
import Icon from "~/components/Icon/Icon";
import { SETTING_TABS, mockUserData } from "../../constants/mockSetting";
import styles from "./Setting.module.css";

// Modular Tab Components
import SettingAccount from "./components/SettingAccount/SettingAccount";
import SettingSecurity from "./components/SettingSecurity/SettingSecurity";
import SettingPrivacy from "./components/SettingPrivacy/SettingPrivacy";
import SettingNotifications from "./components/SettingNotifications/SettingNotifications";
import SettingBilling from "./components/SettingBilling/SettingBilling";
import SettingAppearance from "./components/SettingAppearance/SettingAppearance";
import SettingIntegrations from "./components/SettingIntegrations/SettingIntegrations";
import SettingData from "./components/SettingData/SettingData";

function Setting() {
  const [activeTab, setActiveTab] = useState("account");

  const renderTabContent = () => {
    switch (activeTab) {
      case "account":
        return <SettingAccount userData={mockUserData} />;
      case "security":
        return <SettingSecurity userData={mockUserData} />;
      case "privacy":
        return <SettingPrivacy userData={mockUserData} />;
      case "notifications":
        return <SettingNotifications userData={mockUserData} />;
      case "billing":
        return <SettingBilling userData={mockUserData} />;
      case "appearance":
        return <SettingAppearance />;
      case "integrations":
        return <SettingIntegrations />;
      case "data":
        return <SettingData />;
      default:
        return <SettingAccount userData={mockUserData} />;
    }
  };

  return (
    <div className={styles.setting_page}>
      <div className={styles.container}>
        {/* Page Header */}
        <header className={styles.header}>
          <h1 className={styles.page_title}>Cài đặt</h1>
          <p className={styles.page_subtitle}>Quản lý tài khoản và tùy chọn FySet của bạn.</p>
        </header>

        {/* Setting Layout: Sidebar + Main Panel */}
        <div className={styles.layout}>
          {/* Left Sidebar */}
          <aside className={styles.sidebar}>
            <nav className={styles.nav_list}>
              {SETTING_TABS.map((tab) => {
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveTab(tab.id)}
                    className={`${styles.nav_item} ${isActive ? styles["nav_item--active"] : ""}`}
                  >
                    <span className={styles.nav_icon}>
                      <Icon name={tab.iconName} size={18} />
                    </span>
                    <span className={styles.nav_label}>{tab.label}</span>
                  </button>
                );
              })}
            </nav>
          </aside>

          {/* Right Main Content */}
          <main className={styles.main_panel}>{renderTabContent()}</main>
        </div>
      </div>
    </div>
  );
}

export default Setting;
