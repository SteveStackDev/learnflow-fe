import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router";
import styles from "./ProblemDetail.module.css";
import ProblemDetailDescription from "./components/ProblemDetailDescription/ProblemDetailDescription";
import ProblemDetailEditor from "./components/ProblemDetailEditor/ProblemDetailEditor";
import ProblemDetailConsole from "./components/ProblemDetailConsole/ProblemDetailConsole";
import UserProfileCardModal from "~/components/UserProfileCardModal/UserProfileCardModal";
import Icon from "~/components/Icon/Icon";
import { problemDetailData } from "~/constants/mockProblemDetail";
import { mockRunCodeLogs, mockJudgingSequence } from "~/constants/mockJudgingLogs";
import { useToast } from "~/context/ToastContext.jsx";

function ProblemDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const problem = problemDetailData;

  const [selectedLanguage, setSelectedLanguage] = useState(
    problem.languages?.[0] || { id: "cpp", label: "C++", template: "" }
  );

  const [code, setCode] = useState(
    selectedLanguage?.template || problem.languages?.[0]?.template || ""
  );

  // Bottom Console Log State
  const [consoleLogs, setConsoleLogs] = useState([]);
  const [isConsoleExpanded, setIsConsoleExpanded] = useState(true);

  // Loading States
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isExecuting, setIsExecuting] = useState(false);
  const [judgingStep, setJudgingStep] = useState("");

  // Modal State cho thông tin người dùng
  const [selectedUserForModal, setSelectedUserForModal] = useState(null);

  // Responsive Mobile Tab State ('problem' | 'editor')
  const [activeMobileTab, setActiveMobileTab] = useState("problem");
  const [isMobileViewport, setIsMobileViewport] = useState(
    typeof window !== "undefined" ? window.innerWidth <= 1024 : false
  );

  useEffect(() => {
    const handleResize = () => {
      setIsMobileViewport(window.innerWidth <= 1024);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleLanguageChange = (lang) => {
    setSelectedLanguage(lang);
    if (lang.template) {
      setCode(lang.template);
    }
  };

  const handleResetCode = () => {
    if (selectedLanguage?.template) {
      setCode(selectedLanguage.template);
      toast.info("Đã đặt lại mã nguồn mẫu ban đầu!", "Mã nguồn");
    }
  };

  const handleRunCode = () => {
    if (isSubmitting || isExecuting) return;

    setIsExecuting(true);
    setIsConsoleExpanded(true);
    setConsoleLogs(mockRunCodeLogs(problem.title || "Bài tập"));

    setTimeout(() => {
      setIsExecuting(false);
      toast.success("Chạy thử mã nguồn thành công!", "Biên dịch C++");
    }, 800);
  };

  const handleSubmitCode = () => {
    if (isSubmitting || isExecuting) return;

    const s1 = mockJudgingSequence.step1(id || "1");
    const s2 = mockJudgingSequence.step2;
    const s3 = mockJudgingSequence.step3;

    setIsSubmitting(true);
    setIsConsoleExpanded(true);
    setJudgingStep(s1.stepLabel);
    toast.info("Đang chấm bài trên hệ thống tự động (Timeout 60s)...", "Nộp bài thành công");

    setConsoleLogs(s1.logs);

    setTimeout(() => {
      setJudgingStep(s2.stepLabel);
      setConsoleLogs((prev) => [...prev, ...s2.logs]);
    }, 1100);

    setTimeout(() => {
      setJudgingStep(s3.stepLabel);
      setConsoleLogs((prev) => [...prev, ...s3.logs]);
    }, 2200);

    setTimeout(() => {
      setIsSubmitting(false);
      setJudgingStep("");
      navigate(`/problem/${id || 1}/result`, {
        state: {
          submissionResult: {
            status: "Accepted",
            statusLabel: "Chấp nhận (Accepted)",
            submittedCode: code,
            language: selectedLanguage?.label || "C++20",
          },
        },
      });
    }, 3000);
  };

  if (!problem) {
    return <div className={styles.detail_page}>Không tìm thấy bài tập!</div>;
  }

  return (
    <div className={styles.detail_page}>
      {/* Top Action Navigation Bar */}
      <div className={styles.top_bar}>
        <Link to="/problem/list" className={styles.back_btn}>
          <Icon name="ArrowLeft" size={16} />
          <span>Quay về danh sách bài tập</span>
        </Link>
      </div>

      {/* Segmented View Switcher (Visible on Tablet & Mobile <= 1024px) */}
      <div className={styles.mobile_tab_bar}>
        <button
          type="button"
          onClick={() => setActiveMobileTab("problem")}
          className={`${styles.mobile_tab_btn} ${
            activeMobileTab === "problem" ? styles["mobile_tab_btn--active"] : ""
          }`}
        >
          <Icon name="FileText" size={16} />
          <span>Đề bài & Mô tả</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveMobileTab("editor")}
          className={`${styles.mobile_tab_btn} ${
            activeMobileTab === "editor" ? styles["mobile_tab_btn--active"] : ""
          }`}
        >
          <Icon name="Code" size={16} />
          <span>Trình soạn thảo</span>
        </button>
      </div>

      {/* Main Grid: Description (Left) & Code Editor (Right) */}
      <div className={styles.grid_container}>
        {isMobileViewport ? (
          <>
            {activeMobileTab === "problem" && (
              <div className={styles.left_col}>
                <ProblemDetailDescription
                  problem={problem}
                  onSelectUser={(u) => setSelectedUserForModal(u)}
                />
              </div>
            )}

            {activeMobileTab === "editor" && (
              <div className={styles.right_col}>
                <ProblemDetailEditor
                  languages={problem.languages}
                  selectedLanguage={selectedLanguage}
                  setSelectedLanguage={handleLanguageChange}
                  code={code}
                  setCode={setCode}
                  onResetCode={handleResetCode}
                  onRunCode={handleRunCode}
                  onSubmitCode={handleSubmitCode}
                  isSubmitting={isSubmitting}
                  isExecuting={isExecuting}
                  onFileUpload={(fileContent) => setCode(fileContent)}
                />
              </div>
            )}
          </>
        ) : (
          <>
            <div className={styles.left_col}>
              <ProblemDetailDescription
                problem={problem}
                onSelectUser={(u) => setSelectedUserForModal(u)}
              />
            </div>

            <div className={styles.right_col}>
              <ProblemDetailEditor
                languages={problem.languages}
                selectedLanguage={selectedLanguage}
                setSelectedLanguage={handleLanguageChange}
                code={code}
                setCode={setCode}
                onResetCode={handleResetCode}
                onRunCode={handleRunCode}
                onSubmitCode={handleSubmitCode}
                isSubmitting={isSubmitting}
                isExecuting={isExecuting}
                onFileUpload={(fileContent) => setCode(fileContent)}
              />
            </div>
          </>
        )}
      </div>

      {/* Console Log Panel */}
      <div className={styles.console_wrapper}>
        <ProblemDetailConsole
          consoleLogs={consoleLogs}
          isExpanded={isConsoleExpanded}
          setIsExpanded={setIsConsoleExpanded}
          onClearLogs={() => setConsoleLogs([])}
          isSubmitting={isSubmitting}
          isExecuting={isExecuting}
          judgingStep={judgingStep}
        />
      </div>

      {/* User Profile Card Modal */}
      {selectedUserForModal && (
        <UserProfileCardModal
          user={selectedUserForModal}
          isOpen={Boolean(selectedUserForModal)}
          onClose={() => setSelectedUserForModal(null)}
        />
      )}
    </div>
  );
}

export default ProblemDetail;