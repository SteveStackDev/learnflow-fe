import { useState, useEffect, useMemo } from "react";

// Services
import { badgeService } from "~/services/badgeService";

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

const TABS = ["Tất cả huy hiệu", "Đã đạt được", "Chưa đạt được"];

function Badge() {
  const [badgesList, setBadgesList] = useState([]);
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

  // Nạp danh sách danh hiệu từ badgeService
  useEffect(() => {
    badgeService.getAllBadges().then((data) => {
      if (Array.isArray(data) && data.length > 0) {
        setBadgesList(data);
      } else if (Array.isArray(data?.items)) {
        setBadgesList(data.items);
      }
    });
  }, []);

  const handleTabChange = (index) => {
    setActiveTab(index);
    setCurrentPage(1);
  };

  const itemsPerPage = isMobile ? 4 : 8;

  // Filter Logic
  const filteredAndSortedItems = useMemo(() => {
    return (badgesList || []).filter((item) => {
      if (!item) return false;
      const name = (item.name || item.title || "").toLowerCase();
      const description = (item.description || "").toLowerCase();
      const q = (searchQuery || "").toLowerCase();
      const matchesSearch = name.includes(q) || description.includes(q);

      const isEarned =
        item.status === "received" || item.status === "unlocked" || Boolean(item.isEarned);

      let matchesTab = true;
      if (activeTab === 1) {
        matchesTab = isEarned;
      } else if (activeTab === 2) {
        matchesTab = !isEarned;
      }

      return matchesSearch && matchesTab;
    });
  }, [badgesList, searchQuery, activeTab]);

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

  const totalCount = badgesList.length;
  const receivedCount = badgesList.filter(
    (i) => i.status === "received" || i.status === "unlocked" || Boolean(i.isEarned),
  ).length;
  const progressPercent =
    totalCount > 0 ? ((receivedCount / totalCount) * 100).toFixed(1) : "0.0";

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
        totalCount={totalCount}
        receivedCount={receivedCount}
        progressPercent={progressPercent}
      />

      {/* 3. Search & Filter Section */}
      <BadgeFilter
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        tabs={TABS}
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
      <BadgeGuide />

      {/* 6. FAQ Section */}
      <BadgeFaq />
    </div>
  );
}

export default Badge;
