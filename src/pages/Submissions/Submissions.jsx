import React, { useState, useMemo } from "react";
import { useParams, useLocation } from "react-router";
import SubmissionsHeader from "./components/SubmissionsHeader/SubmissionsHeader";
import SubmissionsStats from "./components/SubmissionsStats/SubmissionsStats";
import SubmissionsFilter from "./components/SubmissionsFilter/SubmissionsFilter";
import SubmissionsTable from "./components/SubmissionsTable/SubmissionsTable";
import SubmissionsPagination from "./components/SubmissionsPagination/SubmissionsPagination";
import { mockSubmissionsData } from "~/constants/mockSubmissions";
import useScrollReveal from "~/hooks/useScrollReveal";
import styles from "./Submissions.module.css";

export function Submissions() {
  const { id } = useParams();
  const location = useLocation();
  useScrollReveal();

  // Detect route scope (Problem scope vs Contest scope vs General scope)
  let scopeType = null;
  let scopeId = null;
  let backUrl = null;
  let scopeTitle = null;

  if (location.pathname.includes("/problem/")) {
    scopeType = "problem";
    scopeId = id || "1";
    backUrl = `/problem/${scopeId}/result`;
    scopeTitle = `Two Sum (Hai số tổng)`;
  } else if (location.pathname.includes("/contest/")) {
    scopeType = "contest";
    scopeId = id || "A";
    backUrl = `/contest/${scopeId}/result`;
    scopeTitle = `Weekly Coding Challenge #45`;
  }

  // Filter State
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("ALL");
  const [selectedLanguage, setSelectedLanguage] = useState("ALL");
  const [currentPage, setCurrentPage] = useState(1);

  // Scoped Submissions Data
  const scopedSubmissions = useMemo(() => {
    return mockSubmissionsData.filter((item) => {
      if (scopeType === "problem") {
        return item.problemId === String(scopeId);
      }
      if (scopeType === "contest") {
        return item.contestId === String(scopeId);
      }
      return true;
    });
  }, [scopeType, scopeId]);

  // Filter Logic (Search, Status, Language)
  const filteredSubmissions = useMemo(() => {
    return scopedSubmissions.filter((item) => {
      // Search Query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchTitle = item.problemTitle.toLowerCase().includes(query);
        const matchId = item.id.toLowerCase().includes(query);
        if (!matchTitle && !matchId) return false;
      }

      // Status Filter
      if (selectedStatus !== "ALL" && item.statusCode !== selectedStatus) {
        return false;
      }

      // Language Filter
      if (selectedLanguage !== "ALL" && item.language !== selectedLanguage) {
        return false;
      }

      return true;
    });
  }, [scopedSubmissions, searchQuery, selectedStatus, selectedLanguage]);

  // Stats calculation
  const acCount = useMemo(() => {
    return scopedSubmissions.filter(
      (item) => item.statusCode === "AC" || item.status === "Accepted"
    ).length;
  }, [scopedSubmissions]);

  return (
    <div className={styles.submissions_page}>
      <div className={styles.container}>
        {/* Header */}
        <div className="reveal-card">
          <SubmissionsHeader
            scopeType={scopeType}
            scopeId={scopeId}
            scopeTitle={scopeTitle}
            backUrl={backUrl}
          />
        </div>

        {/* 2 Stat Cards: Total Submissions & Total AC */}
        <div className="reveal-card">
          <SubmissionsStats
            submissionsCount={scopedSubmissions.length}
            acCount={acCount}
            scopeType={scopeType}
          />
        </div>

        {/* Filter Bar */}
        <div className="reveal-card">
          <SubmissionsFilter
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            selectedStatus={selectedStatus}
            onStatusChange={setSelectedStatus}
            selectedLanguage={selectedLanguage}
            onLanguageChange={setSelectedLanguage}
          />
        </div>

        {/* Data Table */}
        <div className="reveal-card">
          <SubmissionsTable submissions={filteredSubmissions} scopeType={scopeType} />
        </div>

        {/* Pagination Bar */}
        <div className="reveal-card">
          <SubmissionsPagination
            currentPage={currentPage}
            totalPages={1}
            totalItems={filteredSubmissions.length}
            pageSize={5}
            onPageChange={setCurrentPage}
          />
        </div>
      </div>
    </div>
  );
}

export default Submissions;
