import { useState, useEffect, useMemo } from "react";

// Data
import { badgeData } from "./data";

// Page Container CSS Module
import styles from "./Badge.module.css";

// Sub-components
import BadgeHero from "./components/BadgeHero/BadgeHero";
import BadgeStats from "./components/BadgeStats/BadgeStats";
import BadgeFilter from "./components/BadgeFilter/BadgeFilter";
import BadgeGrid from "./components/BadgeGrid/BadgeGrid";
import BadgeGuide from "./components/BadgeGuide/BadgeGuide";
import BadgeFaq from "./components/BadgeFaq/BadgeFaq";

// Hooks
import useScrollReveal from "~/hooks/useScrollReveal";

function Badge() {
  const [activeTab, setActiveTab] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isMobile, setIsMobile] = useState(
    () => typeof window !== "undefined" && window.innerWidth <= 768,
  );

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useScrollReveal();

  const handleTabChange = (index) => {
    setActiveTab(index);
    setCurrentPage(1);
  };

  const itemsPerPage = isMobile ? 4 : 8;

  // Filter Logic
  const filteredAndSortedItems = useMemo(() => {
    return badgeData.items.filter((item) => {
      const matchesSearch =
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase());
      const selectedTab = badgeData.tabs[activeTab];
      const matchesTab =
        activeTab === 0 ||
        selectedTab === "Tất cả" ||
        selectedTab === "Tất cả huy hiệu" ||
        ((selectedTab === "Đã đạt được" || selectedTab === "Đã nhận") &&
          item.status === "received") ||
        ((selectedTab === "Chưa đạt được" || selectedTab === "Chưa nhận") &&
          item.status === "locked");
      return matchesSearch && matchesTab;
    });
  }, [searchQuery, activeTab]);

  // Reset page when search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  // Pagination calculation
  const totalPages = Math.max(1, Math.ceil(filteredAndSortedItems.length / itemsPerPage));
  const displayedItems = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredAndSortedItems.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredAndSortedItems, currentPage, itemsPerPage]);

  const receivedCount = badgeData.items.filter((i) => i.status === "received").length;
  const progressPercent = ((receivedCount / badgeData.items.length) * 100).toFixed(1);

  const handleResetSearch = () => {
    setSearchQuery("");
    setActiveTab(0);
  };

  return (
    <div className={styles.badgepage}>
      {/* Ambient Background Glow Orbs */}
      <div className={styles["badgepage__orb-1"]} />
      <div className={styles["badgepage__orb-2"]} />
      <div className={styles["badgepage__orb-3"]} />
      <div className={styles["badgepage__orb-4"]} />

      {/* 1. Hero Section */}
      <BadgeHero />

      {/* 2. Overview Stats Section */}
      <BadgeStats
        totalCount={badgeData.items.length}
        receivedCount={receivedCount}
        progressPercent={progressPercent}
      />

      {/* 3. Search & Filter Section */}
      <BadgeFilter
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        tabs={badgeData.tabs}
        activeTab={activeTab}
        onTabChange={handleTabChange}
      />

      {/* 4. Badges Cards Grid Section */}
      <BadgeGrid
        filteredAndSortedItems={filteredAndSortedItems}
        displayedItems={displayedItems}
        currentPage={currentPage}
        totalPages={totalPages}
        setCurrentPage={setCurrentPage}
        onResetSearch={handleResetSearch}
      />

      {/* 5. Guide Section */}
      <BadgeGuide guides={badgeData.guides} />

      {/* 6. FAQ Section */}
      <BadgeFaq faqs={badgeData.faqs} />
    </div>
  );
}

export default Badge;
