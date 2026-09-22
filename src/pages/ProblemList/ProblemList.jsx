import { useState, useMemo, useRef, useEffect } from "react";
import styles from "./ProblemList.module.css";
import { problemService } from "~/services/problemService";
import { useToast } from "~/context/ToastContext.jsx";
import useScrollReveal from "~/hooks/useScrollReveal";

// Subcomponents
import ProblemListHero from "./components/ProblemListHero/ProblemListHero";
import ProblemListToolbar from "./components/ProblemListToolbar/ProblemListToolbar";
import ProblemListTable from "./components/ProblemListTable/ProblemListTable";

const BASE_FILTERS = {
  difficulties: [
    { id: "all", label: "Tất cả độ khó" },
    { id: "easy", label: "Dễ" },
    { id: "medium", label: "Trung bình" },
    { id: "hard", label: "Khó" },
  ],
  topics: [
    { id: "all", label: "Tất cả chủ đề" },
    { id: "Array & Hashing", label: "Array & Hashing" },
    { id: "String", label: "String" },
    { id: "Tree & Binary Search", label: "Tree & Binary Search" },
    { id: "Dynamic Programming", label: "Dynamic Programming" },
    { id: "Graph & BFS/DFS", label: "Graph & BFS/DFS" },
  ],
  languages: [
    { id: "all", label: "Tất cả ngôn ngữ" },
    { id: "cpp", label: "C++" },
    { id: "python", label: "Python 3" },
    { id: "java", label: "Java" },
    { id: "javascript", label: "JavaScript" },
  ],
  statuses: [
    { id: "all", label: "Tất cả trạng thái" },
    { id: "solved", label: "Đã giải" },
    { id: "attempted", label: "Đang làm" },
    { id: "unsolved", label: "Chưa giải" },
  ],
};

function ProblemList() {
  const { toast } = useToast();
  useScrollReveal();

  const [rawProblems, setRawProblems] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] = useState(BASE_FILTERS.difficulties[0]);
  const [selectedTopic, setSelectedTopic] = useState(BASE_FILTERS.topics[0]);
  const [selectedLanguage, setSelectedLanguage] = useState(BASE_FILTERS.languages[0]);
  const [selectedStatus, setSelectedStatus] = useState(BASE_FILTERS.statuses[0]);

  // Dropdown open state: 'diff' | 'topic' | 'lang' | 'status' | null
  const [openDropdown, setOpenDropdown] = useState(null);
  const toolbarRef = useRef(null);

  // Load danh sách bài tập trực tiếp từ SQLite Database (Backend Docker)
  useEffect(() => {
    let isMounted = true;
    problemService.getProblems().then((data) => {
      if (isMounted) {
        setRawProblems(Array.isArray(data) ? data : []);
      }
    });
    return () => {
      isMounted = false;
    };
  }, []);

  // Tự động tổng hợp danh sách topics thực tế có trong Database
  const dynamicFilters = useMemo(() => {
    const existingTopicIds = new Set(BASE_FILTERS.topics.map((t) => t.id));
    const extraTopics = [];

    rawProblems.forEach((p) => {
      if (p.topic && !existingTopicIds.has(p.topic)) {
        existingTopicIds.add(p.topic);
        extraTopics.push({ id: p.topic, label: p.topic });
      }
    });

    return {
      ...BASE_FILTERS,
      topics: [...BASE_FILTERS.topics, ...extraTopics],
    };
  }, [rawProblems]);

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
    setSelectedDifficulty(BASE_FILTERS.difficulties[0]);
    setSelectedTopic(BASE_FILTERS.topics[0]);
    setSelectedLanguage(BASE_FILTERS.languages[0]);
    setSelectedStatus(BASE_FILTERS.statuses[0]);
    setOpenDropdown(null);
    toast.info("Đã đặt lại tất cả bộ lọc tìm kiếm", "Bộ lọc bài tập");
  };

  // Filter items
  const filteredItems = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return (rawProblems || []).filter((item) => {
      // Search (Title or Tags)
      const matchesSearch =
        !query ||
        (item.title && item.title.toLowerCase().includes(query)) ||
        (item.topic && item.topic.toLowerCase().includes(query)) ||
        (item.tags && item.tags.some((t) => t.toLowerCase().includes(query)));

      // Difficulty
      const matchesDiff =
        selectedDifficulty.id === "all" ||
        item.level === selectedDifficulty.label ||
        item.difficultyLabel === selectedDifficulty.label ||
        item.difficulty?.toLowerCase() === selectedDifficulty.id;

      // Topic
      const matchesTopic =
        selectedTopic.id === "all" ||
        item.topic === selectedTopic.label ||
        item.topic === selectedTopic.id ||
        (item.tags && item.tags.some((t) => t.toLowerCase().includes(selectedTopic.label?.toLowerCase())));

      // Language
      const matchesLanguage =
        selectedLanguage.id === "all" ||
        (item.supportedLanguages && item.supportedLanguages.some((l) => l.toLowerCase().includes(selectedLanguage.id)));

      return matchesSearch && matchesDiff && matchesTopic && matchesLanguage;
    });
  }, [rawProblems, searchQuery, selectedDifficulty, selectedTopic, selectedLanguage]);

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

  const heroData = {
    title: "Kho Bài Tập Luyện Code Chuẩn Phỏng Vấn",
    description: "Hơn 300+ bài tập thuật toán từ cơ bản đến nâng cao được cập nhật và kiểm thử tự động trên hệ thống FySet Judge.",
  };

  return (
    <div className={styles.problem_subpage}>
      {/* 1. Hero Banner Component */}
      <ProblemListHero
        heroData={heroData}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      {/* 2. Filter Toolbar Component */}
      <ProblemListToolbar
        filtersData={dynamicFilters}
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