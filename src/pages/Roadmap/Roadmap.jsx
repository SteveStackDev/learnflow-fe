import { useState, useEffect, useMemo } from "react";
// Data
import { roadmapData } from "~/constants/mockRoadMap";

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

const TABS = ["Phổ biến", "Mới nhất", "Nhiều học viên nhất"];

const LEVEL_OPTIONS = [
  { id: "all", label: "Tất cả trình độ" },
  { id: "beginner", label: "Người mới bắt đầu (Beginner)" },
  { id: "intermediate", label: "Trung cấp (Intermediate)" },
  { id: "advanced", label: "Nâng cao (Advanced)" },
];

const ITEMS_PER_PAGE = 4; // 1 clean row of 4 cards!

function Roadmap() {
  const [roadmapsList, setRoadmapsList] = useState(roadmapData.items || []);
  const [activeTab, setActiveTab] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLevel, setSelectedLevel] = useState(LEVEL_OPTIONS[0]);
  const [currentPage, setCurrentPage] = useState(1);

  useScrollReveal();

  const handleTabChange = (index) => {
    setActiveTab(index);
    setCurrentPage(1);
  };

  // Filter & Sort Logic for roadmap items
  const filteredAndSortedItems = useMemo(() => {
    const list = (roadmapsList || []).filter((item) => {
      const title = (item.title || "").toLowerCase();
      const desc = (item.description || "").toLowerCase();
      const query = (searchQuery || "").toLowerCase();

      // Check topics/tags matching
      const rawTags =
        Array.isArray(item.topics) && item.topics.length > 0
          ? item.topics
          : Array.isArray(item.tags) && item.tags.length > 0
            ? item.tags
            : [];
      const matchesTopic = rawTags.some((t) => {
        const tagStr = typeof t === "string" ? t : t.name || t.title || "";
        return tagStr.toLowerCase().includes(query);
      });

      const matchesSearch = title.includes(query) || desc.includes(query) || matchesTopic;

      let matchesLevel = true;
      if (selectedLevel.id !== "all") {
        const diff = (item.difficulty || "").toLowerCase();
        const lvl = (item.level || item.raw?.level || "").toLowerCase();

        if (selectedLevel.id === "beginner") {
          matchesLevel = diff.includes("mới") || lvl === "beginner";
        } else if (selectedLevel.id === "intermediate") {
          matchesLevel = diff.includes("trung") || lvl === "intermediate";
        } else if (selectedLevel.id === "advanced") {
          matchesLevel = diff.includes("nâng") || lvl === "advanced";
        }
      }

      return matchesSearch && matchesLevel;
    });

    return [...list].sort((a, b) => {
      if (activeTab === 1) {
        // Mới nhất: theo ngày tạo
        const dateA = new Date(a.raw?.createdAt || a.createdAt || 0).getTime();
        const dateB = new Date(b.raw?.createdAt || b.createdAt || 0).getTime();
        return dateB - dateA;
      }
      // Phổ biến & Nhiều học viên nhất: xếp theo enrolledCount / viewsNum
      const countA = a.enrolledCount ?? a.viewsNum ?? 0;
      const countB = b.enrolledCount ?? b.viewsNum ?? 0;
      return countB - countA;
    });
  }, [roadmapsList, searchQuery, activeTab, selectedLevel]);

  // Reset page when search or level changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedLevel]);

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
        tabs={TABS}
        activeTab={activeTab}
        handleTabChange={handleTabChange}
        LEVEL_OPTIONS={LEVEL_OPTIONS}
        selectedLevel={selectedLevel}
        setSelectedLevel={setSelectedLevel}
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
      <RoadmapSuggestions />

      {/* 5. FAQ Section */}
      <RoadmapFaq />
    </div>
  );
}

export default Roadmap;
