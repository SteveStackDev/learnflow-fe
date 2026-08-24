import { useState, useMemo, useRef, useEffect } from "react";
import styles from "./ProblemList.module.css";
import { problemListData } from "~/constants";
import { useToast } from "~/context/ToastContext.jsx";
import useScrollReveal from "~/hooks/useScrollReveal";

// Subcomponents
import ProblemListHero from "./components/ProblemListHero/ProblemListHero";
import ProblemListToolbar from "./components/ProblemListToolbar/ProblemListToolbar";
import ProblemListTable from "./components/ProblemListTable/ProblemListTable";

function ProblemList() {
  const { toast } = useToast();
  useScrollReveal();

  const filters = problemListData?.filters || {};

  // Filter States
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] = useState(filters.difficulties?.[0] || { id: "all" });
  const [selectedTopic, setSelectedTopic] = useState(filters.topics?.[0] || { id: "all" });
  const [selectedLanguage, setSelectedLanguage] = useState(filters.languages?.[0] || { id: "all" });
  const [selectedStatus, setSelectedStatus] = useState(filters.statuses?.[0] || { id: "all" });

  // Dropdown open state: 'diff' | 'topic' | 'lang' | 'status' | null
  const [openDropdown, setOpenDropdown] = useState(null);
  const toolbarRef = useRef(null);

  // Close dropdowns on click outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (toolbarRef.current && !toolbarRef.current.contains(event.target)) {
        setOpenDropdown(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const resetFilters = () => {
    setSearchQuery("");
    setSelectedDifficulty(filters.difficulties?.[0] || { id: "all" });
    setSelectedTopic(filters.topics?.[0] || { id: "all" });
    setSelectedLanguage(filters.languages?.[0] || { id: "all" });
    setSelectedStatus(filters.statuses?.[0] || { id: "all" });
    setOpenDropdown(null);
    toast.info("Đã đặt lại tất cả bộ lọc tìm kiếm", "Bộ lọc bài tập");
  };

  // Filter items
  const filteredItems = useMemo(() => {
    const items = problemListData?.items || [];
    const query = searchQuery.trim().toLowerCase();

    return items.filter((item) => {
      // Search (Title or Tags)
      const matchesSearch =
        !query ||
        item.title?.toLowerCase().includes(query) ||
        item.tags?.some((t) => t.toLowerCase().includes(query));

      // Difficulty
      const matchesDiff =
        selectedDifficulty.id === "all" || item.level === selectedDifficulty.label;

      // Topic
      const matchesTopic =
        selectedTopic.id === "all" ||
        item.tags?.some((t) => t.toLowerCase().includes(selectedTopic.label?.toLowerCase()));

      // Language
      const matchesLanguage =
        selectedLanguage.id === "all" ||
        item.languages?.includes(selectedLanguage.id);

      // Status
      const matchesStatus =
        selectedStatus.id === "all" || item.status === selectedStatus.id;

      return matchesSearch && matchesDiff && matchesTopic && matchesLanguage && matchesStatus;
    });
  }, [searchQuery, selectedDifficulty, selectedTopic, selectedLanguage, selectedStatus]);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const totalPages = Math.max(1, Math.ceil(filteredItems.length / itemsPerPage));

  // Reset to page 1 whenever any filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedDifficulty, selectedTopic, selectedLanguage, selectedStatus]);

  const displayedItems = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredItems.slice(start, start + itemsPerPage);
  }, [filteredItems, currentPage]);

  return (
    <div className={styles.problem_subpage}>
      {/* 1. Hero Banner Component */}
      <ProblemListHero
        heroData={problemListData?.hero}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      {/* 2. Filter Toolbar Component */}
      <ProblemListToolbar
        filtersData={filters}
        selectedDifficulty={selectedDifficulty}
        setSelectedDifficulty={setSelectedDifficulty}
        selectedTopic={selectedTopic}
        setSelectedTopic={setSelectedTopic}
        selectedLanguage={selectedLanguage}
        setSelectedLanguage={setSelectedLanguage}
        selectedStatus={selectedStatus}
        setSelectedStatus={setSelectedStatus}
        openDropdown={openDropdown}
        setOpenDropdown={setOpenDropdown}
        toolbarRef={toolbarRef}
        onResetFilters={resetFilters}
      />

      {/* 3. Data Table & Pagination Component */}
      <ProblemListTable
        displayedItems={displayedItems}
        filteredCount={filteredItems.length}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPages={totalPages}
        itemsPerPage={itemsPerPage}
      />
    </div>
  );
}

export default ProblemList;