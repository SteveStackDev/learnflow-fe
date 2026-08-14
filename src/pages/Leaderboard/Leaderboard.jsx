import { useState, useEffect, useRef, useMemo } from "react";

// Data
import { leaderboardData } from "./data";

// Styles
import styles from "./Leaderboard.module.css";

// Sub-components
import LeaderboardHero from "./components/LeaderboardHero/LeaderboardHero";
import LeaderboardPodium from "./components/LeaderboardPodium/LeaderboardPodium";
import LeaderboardFilter from "./components/LeaderboardFilter/LeaderboardFilter";
import LeaderboardTable from "./components/LeaderboardTable/LeaderboardTable";
import LeaderboardGuide from "./components/LeaderboardGuide/LeaderboardGuide";
import LeaderboardFaq from "./components/LeaderboardFaq/LeaderboardFaq";

// Hooks
import useScrollReveal from "~/hooks/useScrollReveal";

const TIME_OPTIONS = [
  { id: "this-week", label: "Tuần này" },
  { id: "this-month", label: "Tháng này" },
  { id: "all-time", label: "Tất cả thời gian" },
];

const ITEMS_PER_PAGE = 5;

function Leaderboard() {
  const [activeTab, setActiveTab] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTime, setSelectedTime] = useState(TIME_OPTIONS[0]);
  const [isTimeDropdownOpen, setIsTimeDropdownOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const timeDropdownRef = useRef(null);

  useScrollReveal();

  const handleTabChange = (index) => {
    setActiveTab(index);
    setCurrentPage(1);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (timeDropdownRef.current && !timeDropdownRef.current.contains(event.target)) {
        setIsTimeDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Filter & Sort Logic
  const filteredAndSortedItems = useMemo(() => {
    return leaderboardData.rankings
      .filter((item) => {
        const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
        const selectedCategory = leaderboardData.tabs[activeTab];
        const matchesCategory =
          activeTab === 0 ||
          selectedCategory === "Tổng xếp hạng" ||
          item.category === selectedCategory;
        const matchesTimeframe =
          selectedTime.id === "all-time" || item.timeframe === selectedTime.id || !item.timeframe;
        return matchesSearch && matchesCategory && matchesTimeframe;
      })
      .sort((a, b) => (b.exp || 0) - (a.exp || 0));
  }, [searchQuery, activeTab, selectedTime]);

  // Reset page when search or timeframe changes
  useEffect(() => {
    if (currentPage !== 1) {
      setCurrentPage(1);
    }
  }, [searchQuery, selectedTime, currentPage]);

  // Pagination calculation
  const totalPages = Math.max(1, Math.ceil(filteredAndSortedItems.length / ITEMS_PER_PAGE));
  const displayedItems = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredAndSortedItems.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredAndSortedItems, currentPage]);

  return (
    <div className={styles.leaderboardpage}>
      {/* Ambient Background Glow Orbs */}
      <div className={styles["leaderboardpage__orb-1"]} />
      <div className={styles["leaderboardpage__orb-2"]} />
      <div className={styles["leaderboardpage__orb-3"]} />
      <div className={styles["leaderboardpage__orb-4"]} />

      {/* 1. Hero Section */}
      <LeaderboardHero />

      {/* 2. Top 3 Podium Section */}
      <LeaderboardPodium podium={leaderboardData.podium} />

      {/* 3. Filter & Search Section */}
      <LeaderboardFilter
        tabs={leaderboardData.tabs}
        activeTab={activeTab}
        handleTabChange={handleTabChange}
        timeOptions={TIME_OPTIONS}
        selectedTime={selectedTime}
        setSelectedTime={setSelectedTime}
        isTimeDropdownOpen={isTimeDropdownOpen}
        setIsTimeDropdownOpen={setIsTimeDropdownOpen}
        timeDropdownRef={timeDropdownRef}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      {/* 4. Ranking Table Section */}
      <LeaderboardTable
        filteredAndSortedItems={filteredAndSortedItems}
        displayedItems={displayedItems}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPages={totalPages}
        setSearchQuery={setSearchQuery}
        setActiveTab={setActiveTab}
      />

      {/* 5. Guide Section */}
      <LeaderboardGuide guides={leaderboardData.guides} />

      {/* 6. FAQ Section */}
      <LeaderboardFaq faqs={leaderboardData.faqs} />
    </div>
  );
}

export default Leaderboard;
