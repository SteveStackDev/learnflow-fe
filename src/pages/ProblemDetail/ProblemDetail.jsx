import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router";
import styles from "./ProblemDetail.module.css";
import { problemDetailData } from "~/constants";
import { useToast } from "~/context/ToastContext.jsx";
import useScrollReveal from "~/hooks/useScrollReveal";
import Icon from "~/components/Icon/Icon";

import ProblemDetailDescription from "./components/ProblemDetailDescription/ProblemDetailDescription";
import ProblemDetailEditor from "./components/ProblemDetailEditor/ProblemDetailEditor";
import ProblemDetailConsole from "./components/ProblemDetailConsole/ProblemDetailConsole";

function ProblemDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  useScrollReveal();

  // 1. Mock fetch bài tập theo id (dễ thay bằng API sau này)
  const problem = problemDetailData;

  const [selectedLanguage, setSelectedLanguage] = useState(problem?.languages?.[0] || null);
  const [code, setCode] = useState(problem?.languages?.[0]?.template || "");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Bottom Console Log State
  const [consoleLogs, setConsoleLogs] = useState([]);
  const [isConsoleExpanded, setIsConsoleExpanded] = useState(true);

  // Đồng bộ lại ngôn ngữ & code mẫu khi đổi bài tập
  useEffect(() => {
    if (problem?.languages?.length) {
      setSelectedLanguage(problem.languages[0]);
      setCode(problem.languages[0].template);
    }
  }, [problem]);

  const handleLanguageChange = (lang) => {
    setSelectedLanguage(lang);
    setCode(lang.template);
    toast.info(`Đã chuyển sang môi trường mã nguồn ${lang.label}`, "Ngôn ngữ");
  };

  const handleResetCode = () => {
    if (selectedLanguage) {
      setCode(selectedLanguage.template);
      toast.info("Đã khôi phục mã mẫu ban đầu", "Đặt lại code");
    }
  };

  const handleRunCode = () => {
    toast.info("Đã nhận yêu cầu chạy thử thành công!", "Chạy thử code");
    // Thêm log mẫu vào Console để minh họa
    setConsoleLogs((prev) => [
      ...prev,
      { type: "info", text: `[${new Date().toLocaleTimeString()}] Running test cases...` },
      { type: "success", text: "Testcase 1: Passed (2ms)" },
    ]);
  };

  const handleSubmitCode = () => {
    setIsSubmitting(true);
    toast.info("Đang chấm bài và chuyển hướng tới kết quả...", "Nộp bài thành công");
    setTimeout(() => {
      setIsSubmitting(false);
      navigate(`/problem/${id || 1}/result`);
    }, 600);
  };

  if (!problem) {
    return <div className={styles.detail_page}>Không tìm thấy bài tập!</div>;
  }

  return (
    <div className={styles.detail_page}>
      {/* Outer Back Button */}
      <div className={styles.top_bar}>
        <Link to="/problem/list" className={styles.back_btn}>
          <Icon name="ArrowLeft" size={16} />
          <span>Quay về danh sách bài tập</span>
        </Link>
      </div>

      {/* Main Grid: Description (Left) & Code Editor (Right) */}
      <div className={styles.grid_container}>
        <div className={`${styles.left_col} reveal-card`}>
          <ProblemDetailDescription problem={problem} />
        </div>

        <div className={`${styles.right_col} reveal-card`}>
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
            onFileUpload={(fileContent) => setCode(fileContent)}
          />
        </div>
      </div>

      {/* Console Log Panel */}
      <div className={`${styles.console_wrapper} reveal-card`}>
        <ProblemDetailConsole
          consoleLogs={consoleLogs}
          isExpanded={isConsoleExpanded}
          setIsExpanded={setIsConsoleExpanded}
          onClearLogs={() => setConsoleLogs([])}
        />
      </div>
    </div>
  );
}

export default ProblemDetail;