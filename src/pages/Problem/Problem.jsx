import { useState, useEffect, useRef, useMemo } from "react";
// Data & Services
import { ALGORITHM_OPTIONS, problemData } from "../../constants/mockProblem";
import { problemService } from "~/services/problemService";

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

const CATEGORIES = ["Tất cả", "Dễ", "Trung bình", "Khó"];

function Problem() {
  const [problemsList, setProblemsList] = useState([]);
  const [problemStats, setProblemStats] = useState({ total: 0, topicsCount: 0, recentCount: 0 });
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

  // Nạp danh sách bài tập & thống kê thực tế từ SQLite Backend
  useEffect(() => {
    const fetchProblems = async () => {
      try {
        const [data, stats] = await Promise.all([
          problemService.getProblems(),
          problemService.getProblemStats(),
        ]);
        const list = Array.isArray(data) ? data : [];
        setProblemsList(list);

        // Tính toán các topics duy nhất nếu stats chưa có
        const uniqueTopics = new Set(list.map((p) => p.topic).filter(Boolean));
        setProblemStats({
          total: typeof stats?.total === "number" ? stats.total : list.length,
          topicsCount: typeof stats?.topicsCount === "number" ? stats.topicsCount : uniqueTopics.size,
          recentCount: typeof stats?.recentCount === "number" ? stats.recentCount : list.length,
        });
      } catch (err) {
        console.warn("Lỗi nạp bài tập từ Backend:", err.message);
        setProblemsList([]);
      }
    };

    fetchProblems();
  }, []);

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
    return (problemsList || [])
      .filter((item) => {
        const q = searchQuery.toLowerCase().trim();
        const matchesSearch =
          !q ||
          (item.title && item.title.toLowerCase().includes(q)) ||
          (item.statement && item.statement.toLowerCase().includes(q)) ||
          (item.topic && item.topic.toLowerCase().includes(q)) ||
          (item.tags && item.tags.some((t) => t.toLowerCase().includes(q)));

        const selectedCategory = CATEGORIES[activeTab] || "Tất cả";
        const matchesCategory =
          activeTab === 0 ||
          selectedCategory === "Tất cả" ||
          item.level === selectedCategory ||
          item.difficultyLabel === selectedCategory ||
          item.difficulty === selectedCategory;

        const matchesAlgorithm =
          selectedAlgorithm.id === "all" ||
          item.topic === selectedAlgorithm.label ||
          item.topic === selectedAlgorithm.id ||
          (item.tags && item.tags.includes(selectedAlgorithm.label));

        return matchesSearch && matchesCategory && matchesAlgorithm;
      })
      .sort((a, b) => {
        if (selectedSort.id === "latest") {
          return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
        }
        if (selectedSort.id === "rate") {
          const rateA = parseFloat(a.acceptanceRate || a.successRate) || 0;
          const rateB = parseFloat(b.acceptanceRate || b.successRate) || 0;
          return rateB - rateA;
        }
        return (b.solved || 0) - (a.solved || 0);
      });
  }, [problemsList, searchQuery, activeTab, selectedSort, selectedAlgorithm]);

  // Reset page when search, sort, or algorithm changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedSort, selectedAlgorithm]);

  // Pagination calculation
  const totalPages = Math.max(1, Math.ceil(filteredAndSortedItems.length / itemsPerPage));
  const displayedItems = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredAndSortedItems.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredAndSortedItems, currentPage, itemsPerPage]);

  // 3 Metric Cards động từ dữ liệu thật
  const dynamicStats = [
    {
      title: "Tổng số bài tập",
      value: String(problemStats.total ?? problemsList.length ?? 0),
      iconName: "Code",
    },
    {
      title: "Chủ đề đa dạng",
      value: String(problemStats.topicsCount ?? 0),
      iconName: "Grid",
    },
    {
      title: "Bài mới tuần này",
      value: String(problemStats.recentCount ?? 0),
      iconName: "Clock",
    },
  ];

  return (
    <div className={styles.problempage}>
      {/* Ambient Background Glow Orbs */}
      <div className={styles["problempage__orb-1"]} />
      <div className={styles["problempage__orb-2"]} />
      <div className={styles["problempage__orb-3"]} />

      <ProblemHero />

      {problemsList.length > 0 && <ProblemDaily problem={problemsList[0]} />}

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
        stats={dynamicStats}
        categories={CATEGORIES}
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
