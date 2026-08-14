import { useState, useEffect, useRef, useMemo } from "react";
// Data
import { roadmapData } from "./data";

// Styles
import styles from "./Roadmap.module.css";

// Sub-components
import RoadmapHero from "./components/RoadmapHero/RoadmapHero";
import RoadmapProgress from "./components/RoadmapProgress/RoadmapProgress";
import RoadmapFilter from "./components/RoadmapFilter/RoadmapFilter";
import RoadmapGrid from "./components/RoadmapGrid/RoadmapGrid";
import RoadmapSuggestions from "./components/RoadmapSuggestions/RoadmapSuggestions";
import RoadmapFaq from "./components/RoadmapFaq/RoadmapFaq";

// Hooks
import useScrollReveal from "~/hooks/useScrollReveal";

const LEVEL_OPTIONS = [
  { id: "all", label: "Tất cả trình độ" },
  { id: "beginner", label: "Mới bắt đầu (Beginner)" },
  { id: "intermediate", label: "Trung cấp (Intermediate)" },
  { id: "advanced", label: "Nâng cao (Advanced)" },
];

const ITEMS_PER_PAGE = 4; // 1 clean row of 4 cards!

function Roadmap() {
  const [activeTab, setActiveTab] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLevel, setSelectedLevel] = useState(LEVEL_OPTIONS[0]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const dropdownRef = useRef(null);

  useScrollReveal();

  const handleTabChange = (index) => {
    setActiveTab(index);
    setCurrentPage(1);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Filter & Sort Logic
  const filteredAndSortedItems = useMemo(() => {
    const list = (roadmapData.items || roadmapData.cards || []).filter((item) => {
      const matchesSearch =
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesLevel = selectedLevel.id === "all" || item.level === selectedLevel.id;
      return matchesSearch && matchesLevel;
    });

    return [...list].sort((a, b) => {
      if (activeTab === 1) {
        // Mới nhất: Thẻ MỚI lên trước, sau đó xếp theo ngày tạo từ MỚI NHẤT -> CŨ NHẤT
        const isAMoi = a.statusLabel === "MỚI";
        const isBMoi = b.statusLabel === "MỚI";
        if (isAMoi && !isBMoi) return -1;
        if (isBMoi && !isAMoi) return 1;
        return new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime();
      }
      if (activeTab === 2) {
        // Nhiều lượt xem nhất: Sắp xếp lượt xem từ CAO NHẤT -> THẤP NHẤT
        return (b.viewsNum || 0) - (a.viewsNum || 0);
      }
      // Phổ biến (activeTab === 0): Thẻ HOT lên trước, sau đó sắp xếp lượt xem từ CAO NHẤT -> THẤP NHẤT
      const isAHot = a.statusLabel === "HOT";
      const isBHot = b.statusLabel === "HOT";
      if (isAHot && !isBHot) return -1;
      if (isBHot && !isAHot) return 1;
      return (b.viewsNum || 0) - (a.viewsNum || 0);
    });
  }, [searchQuery, activeTab, selectedLevel]);

  // Reset page when search or level changes
  useEffect(() => {
    if (currentPage !== 1) {
      setCurrentPage(1);
    }
  }, [searchQuery, selectedLevel, currentPage]);

  // Pagination calculation
  const totalPages = Math.max(1, Math.ceil(filteredAndSortedItems.length / ITEMS_PER_PAGE));
  const displayedItems = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredAndSortedItems.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredAndSortedItems, currentPage]);

  return (
    <div className={styles.roadmappage}>
      {/* Ambient Background Glow Orbs */}
      <div className={styles["roadmappage__orb-1"]} />
      <div className={styles["roadmappage__orb-2"]} />
      <div className={styles["roadmappage__orb-3"]} />
      <div className={styles["roadmappage__orb-4"]} />

      {/* 1. Hero Section */}
      <RoadmapHero />

      {/* 1.5 Milestone Progress Tracker */}
      <RoadmapProgress />

      {/* 2. Search & Filter Section */}
      <RoadmapFilter
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        totalCount={filteredAndSortedItems.length}
        tabs={roadmapData.tabs}
        activeTab={activeTab}
        handleTabChange={handleTabChange}
        LEVEL_OPTIONS={LEVEL_OPTIONS}
        selectedLevel={selectedLevel}
        setSelectedLevel={setSelectedLevel}
        isDropdownOpen={isDropdownOpen}
        setIsDropdownOpen={setIsDropdownOpen}
        dropdownRef={dropdownRef}
      />

      {/* 4. Roadmap Cards Grid Section */}
      <RoadmapGrid
        filteredAndSortedItems={filteredAndSortedItems}
        displayedItems={displayedItems}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPages={totalPages}
        setSearchQuery={setSearchQuery}
        setActiveTab={setActiveTab}
        setSelectedLevel={setSelectedLevel}
        LEVEL_OPTIONS={LEVEL_OPTIONS}
      />

      {/* 4.5 Orientation Suggestion Section */}
      <RoadmapSuggestions suggestions={roadmapData.suggestions} />

      {/* 5. FAQ Section */}
      <RoadmapFaq faqs={roadmapData.faqs} />
    </div>
  );
}

export default Roadmap;
