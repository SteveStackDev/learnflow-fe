import { useState, useEffect, useMemo } from "react";

// Data
import { contestData } from "./data";

// Styles
import styles from "./Contest.module.css";

// Sub-components
import ContestHero from "./components/ContestHero/ContestHero";
import ContestStats from "./components/ContestStats/ContestStats";
import ContestFilter from "./components/ContestFilter/ContestFilter";
import ContestGrid from "./components/ContestGrid/ContestGrid";
import ContestWhy from "./components/ContestWhy/ContestWhy";
import ContestFaq from "./components/ContestFaq/ContestFaq";

// Hooks
import useScrollReveal from "~/hooks/useScrollReveal";

const ITEMS_PER_PAGE = 3; // 1 clean row of 3 cards!

function Contest() {
  const [activeTab, setActiveTab] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  useScrollReveal();

  const handleTabChange = (index) => {
    setActiveTab(index);
    setCurrentPage(1);
  };

  // Filter & Sort Logic
  const filteredAndSortedItems = useMemo(() => {
    return contestData.items.filter((item) => {
      const selectedTab = contestData.tabs[activeTab];
      const matchesSearch =
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.statusLabel.toLowerCase().includes(searchQuery.toLowerCase());
      
      if (activeTab === 0 || selectedTab === "Tất cả cuộc thi") return matchesSearch;
      if (selectedTab === "Đang diễn ra" || selectedTab === "Đang mở") {
        return matchesSearch && item.statusLabel.includes("ĐANG MỞ");
      }
      if (selectedTab === "Sắp diễn ra") {
        return matchesSearch && item.statusLabel.includes("SẮP DIỄN RA");
      }
      if (selectedTab === "Đã kết thúc") {
        return matchesSearch && item.statusLabel.includes("ĐÃ KẾT THÚC");
      }
      return matchesSearch;
    });
  }, [searchQuery, activeTab]);

  // Reset page when search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  // Pagination calculation
  const totalPages = Math.max(1, Math.ceil(filteredAndSortedItems.length / ITEMS_PER_PAGE));
  const displayedItems = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredAndSortedItems.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredAndSortedItems, currentPage]);

  return (
    <div className={styles.contestpage}>
      {/* Ambient Background Glow Orbs */}
      <div className={styles["contestpage__orb-1"]} />
      <div className={styles["contestpage__orb-2"]} />
      <div className={styles["contestpage__orb-3"]} />
      <div className={styles["contestpage__orb-4"]} />

      {/* 1. Hero Section */}
      <ContestHero />

      {/* 2. Overview Stats Section */}
      <ContestStats
        stats={contestData.stats}
        totalContests={filteredAndSortedItems.length}
      />

      {/* 3. Search & Filter Bar Section */}
      <ContestFilter
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        tabs={contestData.tabs}
        activeTab={activeTab}
        handleTabChange={handleTabChange}
      />

      {/* 4. Contests Cards Grid Section */}
      <ContestGrid
        filteredAndSortedItems={filteredAndSortedItems}
        displayedItems={displayedItems}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPages={totalPages}
        setSearchQuery={setSearchQuery}
        setActiveTab={setActiveTab}
      />

      {/* 5. Benefits Section */}
      <ContestWhy benefits={contestData.benefits} />

      {/* 6. FAQ Section */}
      <ContestFaq faqs={contestData.faqs} />
    </div>
  );
}

export default Contest;
