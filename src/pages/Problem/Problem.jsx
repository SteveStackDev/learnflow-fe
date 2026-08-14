import { useState, useEffect, useRef, useMemo } from "react";
// Data
import { problemData, ALGORITHM_OPTIONS } from "../../constants/mockProblem";

// Import CSS Modules
import styles from "./Problem.module.css";

// Sub-components
import ProblemHero from "./components/ProblemHero/ProblemHero";
import ProblemDaily from "./components/ProblemDaily/ProblemDaily";
import ProblemFilter from "./components/ProblemFilter/ProblemFilter";
import ProblemList from "./components/ProblemList/ProblemList";
import ProblemGuide from "./components/ProblemGuide/ProblemGuide";

// Hooks
import useScrollReveal from "~/hooks/useScrollReveal";

const SORT_OPTIONS = [
  { id: "popular", label: "Phổ biến" },
  { id: "latest", label: "Mới nhất" },
  { id: "rate", label: "Tỷ lệ làm đúng" },
];

function Problem() {
  const [activeTab, setActiveTab] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSort, setSelectedSort] = useState(SORT_OPTIONS[0]);
  const [isSortDropdownOpen, setIsSortDropdownOpen] = useState(false);
  const [selectedAlgorithm, setSelectedAlgorithm] = useState(ALGORITHM_OPTIONS[0]);
  const [isAlgoDropdownOpen, setIsAlgoDropdownOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [isMobile, setIsMobile] = useState(
    () => typeof window !== "undefined" && window.innerWidth <= 768,
  );
  const sortDropdownRef = useRef(null);
  const algoDropdownRef = useRef(null);

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

  const itemsPerPage = isMobile ? 4 : 6;

  // Close dropdowns when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (sortDropdownRef.current && !sortDropdownRef.current.contains(event.target)) {
        setIsSortDropdownOpen(false);
      }
      if (algoDropdownRef.current && !algoDropdownRef.current.contains(event.target)) {
        setIsAlgoDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Filter & Sort Logic
  const filteredAndSortedItems = useMemo(() => {
    const tabs = problemData.tabs ||
      problemData.categories || ["Tất cả", "Dễ", "Trung bình", "Khó"];
    return (problemData.items || problemData.challenges || [])
      .filter((item) => {
        const matchesSearch =
          item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.description.toLowerCase().includes(searchQuery.toLowerCase());

        const selectedCategory = tabs[activeTab] || "Tất cả";
        const matchesCategory =
          activeTab === 0 ||
          selectedCategory === "Tất cả" ||
          selectedCategory === "Tất cả dạng bài" ||
          item.level === selectedCategory ||
          (item.tags && item.tags.includes(selectedCategory));

        const matchesAlgorithm =
          selectedAlgorithm.id === "all" ||
          item.algorithm === selectedAlgorithm.id ||
          item.algorithmLabel === selectedAlgorithm.label;

        return matchesSearch && matchesCategory && matchesAlgorithm;
      })
      .sort((a, b) => {
        if (selectedSort.id === "latest") {
          return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
        }
        if (selectedSort.id === "rate") {
          const rateA = parseFloat(a.successRate) || 0;
          const rateB = parseFloat(b.successRate) || 0;
          return rateB - rateA;
        }
        return (
          (b.submissionsCount || b.studentsNum || 0) - (a.submissionsCount || a.studentsNum || 0)
        );
      });
  }, [searchQuery, activeTab, selectedSort, selectedAlgorithm]);

  // Reset page when search, sort, or algorithm changes
  useEffect(() => {
    if (currentPage !== 1) {
      setCurrentPage(1);
    }
  }, [searchQuery, selectedSort, selectedAlgorithm, currentPage]);

  // Pagination calculation
  const totalPages = Math.max(1, Math.ceil(filteredAndSortedItems.length / itemsPerPage));
  const displayedItems = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredAndSortedItems.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredAndSortedItems, currentPage, itemsPerPage]);

  const categories = problemData.tabs ||
    problemData.categories || ["Tất cả", "Dễ", "Trung bình", "Khó"];

  return (
    <div className={styles.problempage}>
      {/* Ambient Background Glow Orbs */}
      <div className={styles["problempage__orb-1"]} />
      <div className={styles["problempage__orb-2"]} />
      <div className={styles["problempage__orb-3"]} />

      <ProblemHero />

      <ProblemDaily />

      <ProblemFilter
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedAlgorithm={selectedAlgorithm}
        setSelectedAlgorithm={setSelectedAlgorithm}
        isAlgoDropdownOpen={isAlgoDropdownOpen}
        setIsAlgoDropdownOpen={setIsAlgoDropdownOpen}
        algoDropdownRef={algoDropdownRef}
        ALGORITHM_OPTIONS={ALGORITHM_OPTIONS}
        selectedSort={selectedSort}
        setSelectedSort={setSelectedSort}
        isSortDropdownOpen={isSortDropdownOpen}
        setIsSortDropdownOpen={setIsSortDropdownOpen}
        sortDropdownRef={sortDropdownRef}
        SORT_OPTIONS={SORT_OPTIONS}
        stats={problemData.stats}
        categories={categories}
        activeTab={activeTab}
        handleTabChange={handleTabChange}
      />

      <ProblemList
        filteredAndSortedItems={filteredAndSortedItems}
        displayedItems={displayedItems}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPages={totalPages}
        setSearchQuery={setSearchQuery}
        setActiveTab={setActiveTab}
        setSelectedAlgorithm={setSelectedAlgorithm}
        setSelectedSort={setSelectedSort}
        ALGORITHM_OPTIONS={ALGORITHM_OPTIONS}
        SORT_OPTIONS={SORT_OPTIONS}
      />

      <ProblemGuide guides={problemData.guides} />
    </div>
  );
}

export default Problem;
