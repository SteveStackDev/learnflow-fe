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
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] = useState(BASE_FILTERS.difficulties[0]);
  const [selectedTopic, setSelectedTopic] = useState(BASE_FILTERS.topics[0]);
  const [selectedLanguage, setSelectedLanguage] = useState(BASE_FILTERS.languages[0]);
  const [selectedStatus, setSelectedStatus] = useState(BASE_FILTERS.statuses[0]);

  // Dropdown open state: 'diff' | 'topic' | 'lang' | 'status' | null
  const [openDropdown, setOpenDropdown] = useState(null);
  const toolbarRef = useRef(null);

  // Load danh sách bài tập trực tiếp từ MongoDB Backend kèm trạng thái bài làm của người dùng
  useEffect(() => {
    let isMounted = true;
    setIsLoading(true);

    Promise.all([
      problemService.getProblems(),
      problemService.getUserProblems(),
    ])
      .then(([problemsData, userProblemsData]) => {
        if (!isMounted) return;

        const userStatusMap = new Map();

        const applyStatus = (key, status) => {
          if (key === undefined || key === null || key === "") return;
          const k = String(key).trim().toLowerCase();
          const existing = userStatusMap.get(k);
          if (existing === "solved") return; // "solved" luôn có ưu tiên cao nhất
          userStatusMap.set(k, status);
        };

        const registerUserProblem = (up) => {
          if (!up) return;
          const rawStatus = String(up.status || "").toUpperCase();
          const isAC =
            rawStatus === "AC" ||
            rawStatus === "ACCEPTED" ||
            rawStatus === "SOLVED" ||
            up.userStatus === "solved" ||
            (up.score != null && up.maxScore != null && Number(up.score) >= Number(up.maxScore) && Number(up.maxScore) > 0);

          const status = isAC ? "solved" : up.userStatus === "attempted" || rawStatus ? "attempted" : "unsolved";

          const pObj = up.problemId && typeof up.problemId === "object" ? up.problemId : {};
          const candidateKeys = [
            up._id,
            up.id,
            up.problemId?._id,
            up.problemId?.id,
            typeof up.problemId === "string" ? up.problemId : null,
            pObj._id,
            pObj.id,
            pObj.slug,
            up.slug,
            pObj.title,
            up.title,
            pObj.code,
            up.code,
            up.order,
            pObj.order,
          ].filter(Boolean);

          candidateKeys.forEach((keyVal) => {
            applyStatus(keyVal, status);
            const strVal = String(keyVal).trim();
            if (/^\d+$/.test(strVal)) {
              const num = Number(strVal);
              applyStatus(num, status);
              applyStatus(String(num).padStart(2, "0"), status);
            }
          });
        };

        if (Array.isArray(userProblemsData)) {
          userProblemsData.forEach(registerUserProblem);
        }

        // Đọc thêm từ localStorage để đảm bảo dữ liệu vừa nộp hiển thị ngay lập tức
        try {
          const cachedSolved = JSON.parse(localStorage.getItem("fyset_solved_problems") || "[]");
          if (Array.isArray(cachedSolved)) {
            cachedSolved.forEach(registerUserProblem);
          }
        } catch (storageErr) {
          console.debug("Lỗi đọc cache fyset_solved_problems:", storageErr);
        }

        const mergedProblems = (Array.isArray(problemsData) ? problemsData : []).map((p, idx) => {
          const checkKeys = [
            p._id,
            p.id,
            p.slug,
            p.title,
            p.code,
            p.order,
            idx + 1,
            String(idx + 1).padStart(2, "0"),
          ].filter(Boolean);

          let resolvedStatus = p.userStatus || p.status || "unsolved";
          for (const key of checkKeys) {
            const k = String(key).trim().toLowerCase();
            if (userStatusMap.has(k)) {
              const s = userStatusMap.get(k);
              if (s === "solved") {
                resolvedStatus = "solved";
                break;
              } else if (resolvedStatus !== "solved") {
                resolvedStatus = s;
              }
            }
          }

          return {
            ...p,
            status: resolvedStatus,
            userStatus: resolvedStatus,
          };
        });

        setRawProblems(mergedProblems);
      })
      .catch((err) => {
        console.warn("Lỗi tải danh sách bài tập & trạng thái:", err);
      })
      .finally(() => {
        if (isMounted) {
          setIsLoading(false);
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

      // Status
      const itemStatus = String(item.userStatus || item.status || "unsolved").toLowerCase();
      const matchesStatus =
        selectedStatus.id === "all" ||
        itemStatus === selectedStatus.id.toLowerCase() ||
        (selectedStatus.id === "solved" && (itemStatus === "ac" || itemStatus === "accepted"));

      return matchesSearch && matchesDiff && matchesTopic && matchesLanguage && matchesStatus;
    });
  }, [rawProblems, searchQuery, selectedDifficulty, selectedTopic, selectedLanguage, selectedStatus]);

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
        isLoading={isLoading}
      />
    </div>
  );
}

export default ProblemList;