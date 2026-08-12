import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router";
import styles from "./ProblemDetail.module.css";
import { problemDetailData } from "./data";
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

  const problem = problemDetailData;

  const [selectedLanguage, setSelectedLanguage] = useState(problem.languages[0]);
  const [code, setCode] = useState(problem.languages[0].template);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Dedicated Full-Width Bottom Console Log State Management
  const [consoleLogs, setConsoleLogs] = useState([]);
  const [isConsoleExpanded, setIsConsoleExpanded] = useState(true);

  const handleLanguageChange = (lang) => {
    setSelectedLanguage(lang);
    setCode(lang.template);
    toast.info(`Đã chuyển sang môi trường mã nguồn ${lang.label}`, "Ngôn ngữ");
  };

  const handleResetCode = () => {
    setCode(selectedLanguage.template);
    toast.info("Đã khôi phục mã mẫu ban đầu", "Đặt lại code");
  };

  const handleRunCode = () => {
    toast.info("Đã nhận yêu cầu chạy thử thành công!", "Chạy thử code");
  };

  const handleSubmitCode = () => {
    setIsSubmitting(true);
    toast.info("Đang chấm bài và chuyển hướng tới kết quả...", "Nộp bài thành công");
    setTimeout(() => {
      setIsSubmitting(false);
      navigate(`/problem/${id || 1}/result`);
    }, 600);
  };

  return (
    <div className={styles.detail_page}>
      {/* Outer Back Button to Problem List */}
      <div className={styles.top_bar}>
        <Link to="/problem/list" className={styles.back_btn}>
          <Icon name="ArrowLeft" size={16} />
          <span>Quay về danh sách bài tập</span>
        </Link>
      </div>

      {/* Main 2-Column Grid: Description (Left) & Code Editor (Right) */}
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

      {/* Full-Width Console Log Panel Below Both Cards */}
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
