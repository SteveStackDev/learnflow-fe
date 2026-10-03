import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router";
import styles from "./ProblemDetail.module.css";
import ProblemDetailDescription from "./components/ProblemDetailDescription/ProblemDetailDescription";
import ProblemDetailEditor from "./components/ProblemDetailEditor/ProblemDetailEditor";
import ProblemDetailConsole from "./components/ProblemDetailConsole/ProblemDetailConsole";
import UserProfileCardModal from "~/components/UserProfileCardModal/UserProfileCardModal";
import Icon from "~/components/Icon/Icon";
import { useToast } from "~/context/ToastContext.jsx";
import { useAuth } from "~/context/AuthContext.jsx";
import { problemService } from "~/services/problemService";
import { submitCode, runCodeSample } from "~/services/judgeService";

const DEFAULT_LANGUAGE_TEMPLATES = {
  cpp: {
    id: "cpp",
    label: "C++ (g++)",
    template: `#include <iostream>
using namespace std;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    
    // Viết mã nguồn giải thuật của bạn tại đây
    
    return 0;
}`,
  },
  c: {
    id: "c",
    label: "C (gcc)",
    template: `#include <stdio.h>

int main() {
    // Viết mã nguồn giải thuật của bạn tại đây
    
    return 0;
}`,
  },
  python: {
    id: "python",
    label: "Python 3",
    template: `import sys

def solve():
    input_data = sys.stdin.read().split()
    if not input_data:
        return
    pass

if __name__ == "__main__":
    solve()`,
  },
  java: {
    id: "java",
    label: "Java (OpenJDK 17)",
    template: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
    }
}`,
  },
  javascript: {
    id: "javascript",
    label: "JavaScript (Node.js)",
    template: `const fs = require("fs");

function main() {
    const input = fs.readFileSync(0, "utf-8").trim();
    if (!input) return;
}

main();`,
  },
};

function ProblemDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { isAuthenticated, user } = useAuth();

  useEffect(() => {
    if (!isAuthenticated) {
      toast.warning("Vui lòng đăng nhập để xem chi tiết bài tập!", "Yêu cầu đăng nhập");
      navigate("/signin");
    }
  }, [isAuthenticated, navigate, toast]);

  const [problem, setProblem] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const [selectedLanguage, setSelectedLanguage] = useState(DEFAULT_LANGUAGE_TEMPLATES.cpp);
  const [code, setCode] = useState(DEFAULT_LANGUAGE_TEMPLATES.cpp.template);
  const [userCodeByLang, setUserCodeByLang] = useState({});

  const [consoleLogs, setConsoleLogs] = useState([]);
  const [isConsoleExpanded, setIsConsoleExpanded] = useState(true);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isExecuting, setIsExecuting] = useState(false);
  const [judgingStep, setJudgingStep] = useState("");

  const [selectedUserForModal, setSelectedUserForModal] = useState(null);

  const [activeMobileTab, setActiveMobileTab] = useState("problem");
  const [isMobileViewport, setIsMobileViewport] = useState(
    typeof window !== "undefined" ? window.innerWidth <= 1024 : false
  );

  useEffect(() => {
    let isMounted = true;
    setIsLoading(true);

    problemService
      .getProblemById(id)
      .then((data) => {
        if (!isMounted) return;
        if (data) {
          setProblem(data);
          const langList = data.languages && data.languages.length > 0
            ? data.languages
            : Object.values(DEFAULT_LANGUAGE_TEMPLATES);

          const defaultLang = langList[0] || DEFAULT_LANGUAGE_TEMPLATES.cpp;
          setSelectedLanguage(defaultLang);
          const initCode = defaultLang.template || DEFAULT_LANGUAGE_TEMPLATES[defaultLang.id]?.template || "";
          setCode(initCode);
          setUserCodeByLang({ [defaultLang.id]: initCode });
        } else {
          setProblem(null);
        }
      })
      .catch((err) => {
        if (!isMounted) return;
        console.warn("Lỗi tải chi tiết bài tập:", err.message);
        setProblem(null);
      })
      .finally(() => {
        if (isMounted) setIsLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [id]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobileViewport(window.innerWidth <= 1024);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleLanguageChange = (lang) => {
    const currentLangId = selectedLanguage?.id || "cpp";
    const updatedCache = { ...userCodeByLang, [currentLangId]: code };
    setUserCodeByLang(updatedCache);

    setSelectedLanguage(lang);

    if (updatedCache[lang.id]) {
      setCode(updatedCache[lang.id]);
    } else {
      const template = lang.template || DEFAULT_LANGUAGE_TEMPLATES[lang.id]?.template || "";
      setCode(template);
      setUserCodeByLang((prev) => ({ ...prev, [lang.id]: template }));
    }
    toast.info(`Đã chuyển sang ${lang.label || lang.name || "ngôn ngữ mới"}`, "Trình soạn thảo");
  };

  const handleResetCode = () => {
    const langId = selectedLanguage?.id || "cpp";
    const template = selectedLanguage?.template || DEFAULT_LANGUAGE_TEMPLATES[langId]?.template || "";
    setCode(template);
    setUserCodeByLang((prev) => ({ ...prev, [langId]: template }));
    toast.info("Đã đặt lại mã nguồn mẫu ban đầu!", "Mã nguồn");
  };

  const handleFileUpload = (fileContent, detectedLangId, fileName) => {
    setCode(fileContent);
    const allLangs = problem?.languages && problem.languages.length > 0
      ? problem.languages
      : Object.values(DEFAULT_LANGUAGE_TEMPLATES);

    if (detectedLangId) {
      const targetLang = allLangs.find((l) => l.id === detectedLangId) || DEFAULT_LANGUAGE_TEMPLATES[detectedLangId];
      if (targetLang) {
        setSelectedLanguage(targetLang);
        setUserCodeByLang((prev) => ({ ...prev, [targetLang.id]: fileContent }));
      }
    } else {
      const currentLangId = selectedLanguage?.id || "cpp";
      setUserCodeByLang((prev) => ({ ...prev, [currentLangId]: fileContent }));
    }
    toast.success(`Đã nạp tệp "${fileName || "mã nguồn"}" vào trình soạn thảo!`, "Tải file lên");
  };

  const handleRunCode = async () => {
    if (isSubmitting || isExecuting || !problem) return;

    setIsExecuting(true);
    setIsConsoleExpanded(true);
    const timeStr = new Date().toLocaleTimeString();

    setConsoleLogs([
      {
        type: "info",
        text: `[${timeStr}] ⚙️ Đang thực thi mã nguồn ${selectedLanguage?.label || "C++"} cho bài tập #${problem.code || problem.id}...`,
      },
    ]);

    try {
      const sampleInput =
        problem.examples?.[0]?.input ||
        problem.testCases?.[0]?.input ||
        "1 2";
      const expectedOutput =
        problem.examples?.[0]?.output ||
        problem.testCases?.[0]?.expected ||
        "3";

      const res = await runCodeSample({
        problemId: problem.id || id || 1,
        sourceCode: code,
        language: selectedLanguage?.id || "cpp",
        sampleInput,
        expectedOutput,
      });

      if (res.success) {
        setConsoleLogs((prev) => [
          ...prev,
          { type: "stdout", text: `--- Input (Sample 1) ---\n${res.input}` },
          { type: "stdout", text: `--- Your Output ---\n${res.stdout}` },
          { type: "stdout", text: `--- Expected Output ---\n${res.expectedOutput}` },
          {
            type: "success",
            text: `✅ Chạy thử thành công! Thời gian: ${res.executionTime}, Bộ nhớ: ${res.memory}`,
          },
        ]);
        toast.success("Chạy thử mã nguồn thành công!", "Kết quả chạy thử");
      } else {
        setConsoleLogs((prev) => [
          ...prev,
          { type: "error", text: `❌ Lỗi: ${res.error}` },
        ]);
        toast.error(res.error || "Chạy thử thất bại!", "Lỗi chạy thử");
      }
    } catch (err) {
      setConsoleLogs((prev) => [
        ...prev,
        { type: "error", text: `❌ Lỗi hệ thống: ${err.message}` },
      ]);
      toast.error(err.message || "Lỗi thực thi", "Lỗi chạy thử");
    } finally {
      setIsExecuting(false);
    }
  };

  const handleSubmitCode = async () => {
    if (isSubmitting || isExecuting || !problem) return;

    setIsSubmitting(true);
    setIsConsoleExpanded(true);
    const timeStr = new Date().toLocaleTimeString();

    const step1Label = "[1/3] Đang gửi mã nguồn tới FySet Judge Engine...";
    setJudgingStep(step1Label);
    setConsoleLogs([
      {
        type: "info",
        text: `[${timeStr}] 🚀 Bắt đầu quá trình nộp và chấm bài (Bài #${problem.code || problem.id}: ${problem.title})...`,
      },
      {
        type: "info",
        text: `[1/3] Ngôn ngữ: ${selectedLanguage?.label || "C++"} (${code.split("\n").length} dòng) - Giới hạn: ${problem.timeLimit || "2.0s"}, ${problem.memoryLimit || "256MB"}`,
      },
    ]);
    toast.info("Đang chấm bài trên hệ thống máy chấm FySet...", "Đã gửi mã nguồn");

    try {
      const judgePromise = submitCode({
        problemId: problem._id || problem.id || id || "1",
        sourceCode: code,
        language: selectedLanguage?.id || "cpp",
        subtasks: problem.subtasks || [],
        testCases: problem.testCases || [],
        examples: problem.examples || [],
        timeLimit: problem.timeLimit || 2.0,
        memoryLimit: problem.memoryLimit || 256,
      });

      await new Promise((resolve) => setTimeout(resolve, 800));
      const step2Label = `[2/3] Đang biên dịch mã nguồn ${selectedLanguage?.label || "C++"}...`;
      setJudgingStep(step2Label);

      const result = await judgePromise;

      // ===== THỰC HIỆN LƯU VÀO DATABASE QUA API POST /problem/save =====
      try {
        // Format testResults có thuộc tính 'order'
        const rawTestResults = Array.isArray(result.test_results) ? result.test_results : [];
        const formattedTestResults = rawTestResults.map((t, idx) => ({
          order: Number(t.order ?? t.id ?? idx + 1),
          label: t.label || `Test #${idx + 1}`,
          status: t.status || "WA",
          score: Number(t.score ?? 0),
          maxScore: Number(t.max_score ?? t.maxScore ?? 10),
          time: Number(t.execution_time ?? t.time ?? 0),
          runtime: `${t.execution_time || 0}ms`,
          memory: t.memory || "0KB",
          input: t.input || "",
          stdout: t.stdout || "",
          stderr: t.stderr || "",
          expected: t.expected || "",
          is_hidden: Boolean(t.is_hidden),
          subtask_id: Number(t.subtask_id || 1),
          subtask_name: t.subtask_name || "Subtask 1",
        }));

        // Format subtasksResult có thuộc tính 'order'
        const rawSubtasks = Array.isArray(result.subtasks) ? result.subtasks : [];
        const formattedSubtasksResult = rawSubtasks.map((st, idx) => ({
          order: String(st.order ?? st.id ?? idx + 1),
          title: st.title || st.name || `Subtask ${idx + 1}`,
          label: st.label || `Subtask #${idx + 1}`,
          status: st.status || "WA",
          earnedScore: Number(st.earnedScore ?? st.score ?? 0),
          maxScore: Number(st.max_score ?? st.maxScore ?? 100),
          maxTime: st.maxTime || "0ms",
          maxMemory: st.maxMemory || "0KB",
          tests: Array.isArray(st.tests)
            ? st.tests.map((t, tIdx) => ({
              order: Number(t.order ?? t.id ?? tIdx + 1),
              label: t.label || `Test #${tIdx + 1}`,
              status: t.status || "WA",
              score: Number(t.score ?? 0),
              maxScore: Number(t.max_score ?? t.maxScore ?? 10),
              time: Number(t.execution_time ?? t.time ?? 0),
              runtime: `${t.execution_time || 0}ms`,
              memory: t.memory || "0KB",
              input: t.input || "",
              stdout: t.stdout || "",
              stderr: t.stderr || "",
              expected: t.expected || "",
              is_hidden: Boolean(t.is_hidden),
              subtask_id: Number(t.subtask_id || idx + 1),
              subtask_name: t.subtask_name || `Subtask ${idx + 1}`,
            }))
            : [],
        }));

        const finalScore = result.score != null ? result.score : (result.status === "AC" ? (problem.points || 500) : 0);
        const finalMaxScore = result.max_score || (result.score != null ? Math.max(Number(result.score), Number(problem.points || 100)) : (problem.points || 500));

        const payloadToSave = {
          userId: user?._id || user?.id,
          problemId: problem._id || problem.id || id,
          sourceCode: code,
          language: selectedLanguage?.id || "cpp",
          status: result.status || "WA",
          executionTime: parseFloat(result.execution_time) || 0,
          memoryUsed: parseFloat(result.memory) || 0,
          createdAt: new Date(),
          score: finalScore,
          maxScore: finalMaxScore,
          passedTests: result.passed_tests || 0,
          totalTests: result.total_tests || 1,
          testResults: formattedTestResults,
          subtasksResult: formattedSubtasksResult,
          logs: result.logs || [],
        };

        await problemService.saveProblem(payloadToSave);

        // Lưu vào localStorage cache để Dashboard cập nhật tức thì 100%
        try {
          const existingSolved = JSON.parse(localStorage.getItem("fyset_solved_problems") || "[]");
          const isAC = result.status === "AC" || result.status === "ACCEPTED" || finalScore === finalMaxScore;
          const userStatus = isAC ? "solved" : "attempted";
          const newRecord = {
            id: result.submission_id || `sub_${Date.now()}`,
            _id: result.submission_id || `sub_${Date.now()}`,
            problemId: {
              _id: problem._id || problem.id || id,
              id: problem.id || id,
              title: problem.title || "Bài tập thuật toán",
              code: problem.code || "01",
              difficulty: problem.difficulty || problem.difficultyLabel || "easy",
              topic: problem.topic || "Thuật toán",
              acceptanceRate: problem.acceptanceRate || 0,
              acceptance: problem.acceptance || `${problem.acceptanceRate || 0}%`,
            },
            code: problem.code || "01",
            title: problem.title || "Bài tập thuật toán",
            difficulty: problem.difficulty || "easy",
            topic: problem.topic || "Thuật toán",
            acceptanceRate: problem.acceptanceRate || 0,
            userStatus,
            status: result.status || "AC",
            score: finalScore,
            maxScore: finalMaxScore,
            executionTime: result.execution_time,
            memoryUsed: parseFloat(result.memory) || 0,
            createdAt: new Date().toISOString(),
          };

          const filtered = existingSolved.filter(
            (s) => String(s.problemId?._id || s.problemId?.id || s.id) !== String(newRecord.problemId._id)
          );
          filtered.unshift(newRecord);
          localStorage.setItem("fyset_solved_problems", JSON.stringify(filtered));
        } catch (storageErr) {
          console.warn("Lỗi lưu local storage solved problem:", storageErr);
        }
      } catch (saveErr) {
        console.error("Lỗi lưu kết quả vào CSDL:", saveErr);
      }
      // =================================================================

      await new Promise((resolve) => setTimeout(resolve, 600));
      setIsSubmitting(false);
      setJudgingStep("");

      const pTitle = problem.code
        ? `#${problem.code}: ${problem.title}`
        : `#${String(problem.id || 1).padStart(2, "0")}: ${problem.title}`;
      const pDiffLabel = problem.difficultyLabel || problem.difficulty || "Dễ";

      const finalScore = result.score != null ? result.score : (result.status === "AC" ? (problem.points || 500) : 0);
      const finalMaxScore = result.max_score || (result.score != null ? Math.max(Number(result.score), Number(problem.points || 100)) : (problem.points || 500));

      navigate(`/problem/${problem.slug || problem.id || id}/result`, {
        state: {
          submissionResult: {
            id: result.submission_id,
            problemId: problem.id || id,
            problemTitle: pTitle,
            difficultyLabel: pDiffLabel,
            status: result.status,
            score: finalScore,
            max_score: finalMaxScore,
            executionTime: result.execution_time,
            memory: `${parseFloat(result.memory) || (result.memory_used ? parseFloat(result.memory_used) : 2.4)} MB`,
            memoryUsed: parseFloat(result.memory) || (result.memory_used ? parseFloat(result.memory_used) : 2.4),
            submittedCode: code,
            language: selectedLanguage?.label || "C++",
            passedTests: result.passed_tests,
            totalTests: result.total_tests,
            testResults: result.test_results,
            subtasks: result.subtasks,
            logs: result.logs,
            isFallback: result.isFallback,
          },
        },
      });
    } catch (err) {
      setConsoleLogs((prev) => [
        ...prev,
        { type: "error", text: `❌ Lỗi khi nộp bài: ${err.message}` },
      ]);
      toast.error(err.message || "Không thể hoàn thành chấm bài!", "Lỗi nộp bài");
      setIsSubmitting(false);
      setJudgingStep("");
    }
  };

  if (isLoading) {
    return (
      <div className={styles.detail_page} style={{ padding: "80px 20px", textAlign: "center" }}>
        <p style={{ color: "#94a3b8", fontSize: "1.1rem" }}>Đang tải thông tin bài tập từ máy chủ...</p>
      </div>
    );
  }

  if (!problem) {
    return (
      <div className={styles.detail_page} style={{ padding: "80px 20px", textAlign: "center" }}>
        <h2 style={{ color: "#f8fafc", marginBottom: 12 }}>Không tìm thấy bài tập!</h2>
        <p style={{ color: "#94a3b8", marginBottom: 24 }}>
          Bài tập này có thể chưa được tạo hoặc đang ở trạng thái Bản nháp (Draft).
        </p>
        <Link to="/problem/list" className={styles.back_btn} style={{ display: "inline-flex" }}>
          <Icon name="ArrowLeft" size={16} />
          <span>Quay về danh sách bài tập</span>
        </Link>
      </div>
    );
  }

  return (
    <div className={styles.detail_page}>
      <div className={styles.top_bar}>
        <Link to="/problem/list" className={styles.back_btn}>
          <Icon name="ArrowLeft" size={16} />
          <span>Quay về danh sách bài tập</span>
        </Link>
      </div>

      <div className={styles.mobile_tab_bar}>
        <button
          type="button"
          onClick={() => setActiveMobileTab("problem")}
          className={`${styles.mobile_tab_btn} ${activeMobileTab === "problem" ? styles["mobile_tab_btn--active"] : ""
            }`}
        >
          <Icon name="FileText" size={16} />
          <span>Đề bài & Mô tả</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveMobileTab("editor")}
          className={`${styles.mobile_tab_btn} ${activeMobileTab === "editor" ? styles["mobile_tab_btn--active"] : ""
            }`}
        >
          <Icon name="Code" size={16} />
          <span>Trình soạn thảo</span>
        </button>
      </div>

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
                  languages={problem?.languages || Object.values(DEFAULT_LANGUAGE_TEMPLATES)}
                  selectedLanguage={selectedLanguage}
                  onLanguageChange={handleLanguageChange}
                  setSelectedLanguage={handleLanguageChange}
                  code={code}
                  setCode={setCode}
                  onResetCode={handleResetCode}
                  onRunCode={handleRunCode}
                  onSubmitCode={handleSubmitCode}
                  isSubmitting={isSubmitting}
                  isExecuting={isExecuting}
                  onFileUpload={handleFileUpload}
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
                languages={problem?.languages || Object.values(DEFAULT_LANGUAGE_TEMPLATES)}
                selectedLanguage={selectedLanguage}
                onLanguageChange={handleLanguageChange}
                setSelectedLanguage={handleLanguageChange}
                code={code}
                setCode={setCode}
                onResetCode={handleResetCode}
                onRunCode={handleRunCode}
                onSubmitCode={handleSubmitCode}
                isSubmitting={isSubmitting}
                isExecuting={isExecuting}
                onFileUpload={handleFileUpload}
              />
            </div>
          </>
        )}
      </div>

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