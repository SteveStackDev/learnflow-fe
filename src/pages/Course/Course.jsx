import { useState, useEffect, useRef, useMemo } from "react";
// Data
import { courseData } from "./data";

// Import CSS Modules
import styles from "./Course.module.css";

// Sub-components
import CourseHero from "./components/CourseHero/CourseHero";
import CourseFilter from "./components/CourseFilter/CourseFilter";
import CourseGrid from "./components/CourseGrid/CourseGrid";
import CourseReasons from "./components/CourseReasons/CourseReasons";
import CourseFaq from "./components/CourseFaq/CourseFaq";

// Hooks
import useScrollReveal from "~/hooks/useScrollReveal";

const SORT_OPTIONS = [
  { id: "popular", label: "Sắp xếp: Phổ biến nhất" },
  { id: "latest", label: "Sắp xếp: Mới nhất" },
  { id: "rating", label: "Sắp xếp: Đánh giá cao nhất" },
];

const ITEMS_PER_PAGE = 4; // 1 clean row of 4 cards!

function Course() {
  const [activeCategoryTab, setActiveCategoryTab] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSort, setSelectedSort] = useState(SORT_OPTIONS[0]);
  const [isSortDropdownOpen, setIsSortDropdownOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const sortDropdownRef = useRef(null);

  useScrollReveal();

  const handleCategoryChange = (index) => {
    setActiveCategoryTab(index);
    setCurrentPage(1);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (sortDropdownRef.current && !sortDropdownRef.current.contains(event.target)) {
        setIsSortDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Filter & Sort Logic
  const filteredAndSortedItems = useMemo(() => {
    const categories = courseData.categoryTabs || courseData.categories || ["Tất cả"];
    return (courseData.items || courseData.courses || [])
      .filter((item) => {
        const matchesSearch =
          item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.description.toLowerCase().includes(searchQuery.toLowerCase());
        const selectedTab = categories[activeCategoryTab] || "Tất cả";
        const matchesCategory =
          activeCategoryTab === 0 ||
          selectedTab === "Tất cả" ||
          selectedTab === "Tất cả khóa học" ||
          item.category === selectedTab ||
          item.level === selectedTab;
        return matchesSearch && matchesCategory;
      })
      .sort((a, b) => {
        if (selectedSort.id === "latest") {
          return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
        }
        if (selectedSort.id === "rating") {
          return (b.rating || 0) - (a.rating || 0);
        }
        return (b.studentsNum || 0) - (a.studentsNum || 0);
      });
  }, [searchQuery, activeCategoryTab, selectedSort]);

  // Reset page when search or sort changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedSort]);

  // Pagination calculation
  const totalPages = Math.max(1, Math.ceil(filteredAndSortedItems.length / ITEMS_PER_PAGE));
  const displayedItems = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredAndSortedItems.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredAndSortedItems, currentPage]);

  return (
    <div className={styles.coursepage}>
      {/* Ambient Background Glow Orbs */}
      <div className={styles["coursepage__orb-1"]} />
      <div className={styles["coursepage__orb-2"]} />
      <div className={styles["coursepage__orb-3"]} />
      <div className={styles["coursepage__orb-4"]} />

      <CourseHero />

      <CourseFilter
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedSort={selectedSort}
        setSelectedSort={setSelectedSort}
        isSortDropdownOpen={isSortDropdownOpen}
        setIsSortDropdownOpen={setIsSortDropdownOpen}
        sortDropdownRef={sortDropdownRef}
        SORT_OPTIONS={SORT_OPTIONS}
        filteredCount={filteredAndSortedItems.length}
        activeCategoryTab={activeCategoryTab}
        handleCategoryChange={handleCategoryChange}
        categories={courseData.categories}
      />

      <CourseGrid
        filteredAndSortedItems={filteredAndSortedItems}
        displayedItems={displayedItems}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPages={totalPages}
        setSearchQuery={setSearchQuery}
        setActiveCategoryTab={setActiveCategoryTab}
      />

      <CourseReasons benefits={courseData.benefits} />

      <CourseFaq faqs={courseData.faqs} />
    </div>
  );
}

export default Course;
