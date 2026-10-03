import React, { useState, useMemo, useEffect } from "react";
import { useParams, useLocation } from "react-router";
import SubmissionsHeader from "./components/SubmissionsHeader/SubmissionsHeader";
import SubmissionsStats from "./components/SubmissionsStats/SubmissionsStats";
import SubmissionsFilter from "./components/SubmissionsFilter/SubmissionsFilter";
import SubmissionsTable from "./components/SubmissionsTable/SubmissionsTable";
import SubmissionsPagination from "./components/SubmissionsPagination/SubmissionsPagination";
import { problemService } from "~/services/problemService";
import useScrollReveal from "~/hooks/useScrollReveal";
import styles from "./Submissions.module.css";

export function Submissions() {
  const { id } = useParams();
  const location = useLocation();
  useScrollReveal();

  const [submissionsList, setSubmissionsList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Detect route scope (Problem scope vs Contest scope vs General scope)
  let scopeType = null;
  let scopeId = null;
  let backUrl = null;
  let scopeTitle = null;

  if (location.pathname.includes("/problem/")) {
    scopeType = "problem";
    scopeId = id || "1";
    backUrl = `/problem/${scopeId}/result`;
    scopeTitle = `Bài tập #${scopeId}`;
  } else if (location.pathname.includes("/contest/")) {
    scopeType = "contest";
    scopeId = id || "A";
    backUrl = `/contest/${scopeId}/result`;
    scopeTitle = `Cuộc thi #${scopeId}`;
  }

  // Load submissions from API
  useEffect(() => {
    let isMounted = true;
    setIsLoading(true);

    problemService
      .getUserProblems()
      .then((data) => {
        if (!isMounted) return;
        const formatted = Array.isArray(data)
          ? data.map((item) => ({
              id: item.id || item._id,
              problemId: String(item.problemId?.id || item.problemId?._id || item.problemId || ""),
              problemTitle: item.problemId?.title || item.title || "Bài tập",
              language: item.language || "C++",
              status: item.status === "AC" || item.status === "SOLVED" ? "Accepted" : item.status || "Wrong Answer",
              statusCode: item.status || "WA",
              score: item.score ?? 0,
              maxScore: item.maxScore ?? 100,
              runtime: item.executionTime ? `${Math.round(item.executionTime * 1000)} ms` : "24 ms",
              memory: item.memoryUsed ? `${item.memoryUsed} MB` : "2.4 MB",
              submittedAt: item.createdAt ? new Date(item.createdAt).toLocaleString("vi-VN") : "Vừa xong",
            }))
          : [];
        setSubmissionsList(formatted);
      })
      .catch((err) => {
        console.error("Lỗi lấy lịch sử bài nộp:", err);
        if (isMounted) setSubmissionsList([]);
      })
      .finally(() => {
        if (isMounted) setIsLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [scopeId]);

  // Filter State
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("ALL");
  const [selectedLanguage, setSelectedLanguage] = useState("ALL");
  const [currentPage, setCurrentPage] = useState(1);

  // Scoped Submissions Data
  const scopedSubmissions = useMemo(() => {
    return submissionsList.filter((item) => {
      if (scopeType === "problem" && scopeId) {
        return item.problemId === String(scopeId) || item.problemId.toLowerCase() === String(scopeId).toLowerCase();
      }
      return true;
    });
  }, [submissionsList, scopeType, scopeId]);

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
          <SubmissionsTable
            submissions={filteredSubmissions}
            scopeType={scopeType}
            isLoading={isLoading}
          />
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
