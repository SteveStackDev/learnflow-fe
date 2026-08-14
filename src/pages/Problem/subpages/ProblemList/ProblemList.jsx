import { useState, useMemo, useRef, useEffect } from "react";
import styles from "./ProblemList.module.css";
import { problemListData } from "./data";
import { useToast } from "~/context/ToastContext.jsx";
import useScrollReveal from "~/hooks/useScrollReveal";

// Subcomponents
import ProblemListHero from "./components/ProblemListHero/ProblemListHero";
import ProblemListToolbar from "./components/ProblemListToolbar/ProblemListToolbar";
import ProblemListTable from "./components/ProblemListTable/ProblemListTable";

function ProblemList() {
  const { toast } = useToast();
  useScrollReveal();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] = useState(
    problemListData.filters.difficulties[0],
  );
  const [selectedTopic, setSelectedTopic] = useState(problemListData.filters.topics[0]);
  const [selectedLanguage, setSelectedLanguage] = useState(problemListData.filters.languages[0]);
  const [selectedStatus, setSelectedStatus] = useState(problemListData.filters.statuses[0]);

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
    setSelectedDifficulty(problemListData.filters.difficulties[0]);
    setSelectedTopic(problemListData.filters.topics[0]);
    setSelectedLanguage(problemListData.filters.languages[0]);
    setSelectedStatus(problemListData.filters.statuses[0]);
    setOpenDropdown(null);
    toast.info("Đã đặt lại tất cả bộ lọc tìm kiếm", "Bộ lọc bài tập");
  };

  // Filter items
  const filteredItems = useMemo(() => {
    return problemListData.items.filter((item) => {
      // Search
      const matchesSearch =
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

      // Difficulty
      const matchesDiff =
        selectedDifficulty.id === "all" || item.level === selectedDifficulty.label;

      // Topic
      const matchesTopic =
        selectedTopic.id === "all" ||
        item.tags.some((t) => t.toLowerCase().includes(selectedTopic.label.toLowerCase()));

      // Status
      const matchesStatus = selectedStatus.id === "all" || item.status === selectedStatus.id;

      return matchesSearch && matchesDiff && matchesTopic && matchesStatus;
    });
  }, [searchQuery, selectedDifficulty, selectedTopic, selectedStatus]);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const totalPages = Math.max(1, Math.ceil(filteredItems.length / itemsPerPage));

  useEffect(() => {
    if (currentPage !== 1) {
      setCurrentPage(1);
    }
  }, [searchQuery, selectedDifficulty, selectedTopic, selectedLanguage, selectedStatus, currentPage]);

  const displayedItems = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredItems.slice(start, start + itemsPerPage);
  }, [filteredItems, currentPage]);

  return (
    <div className={styles.problem_subpage}>
      {/* 1. Hero Banner Component */}
      <ProblemListHero
        heroData={problemListData.hero}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      {/* 2. Filter Toolbar Component (Z-index layer fixed above table) */}
      <ProblemListToolbar
        filtersData={problemListData.filters}
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
