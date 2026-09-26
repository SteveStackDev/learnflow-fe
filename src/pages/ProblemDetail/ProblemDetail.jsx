import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router";
import styles from "./ProblemDetail.module.css";
import ProblemDetailDescription from "./components/ProblemDetailDescription/ProblemDetailDescription";
import ProblemDetailEditor from "./components/ProblemDetailEditor/ProblemDetailEditor";
import ProblemDetailConsole from "./components/ProblemDetailConsole/ProblemDetailConsole";
import UserProfileCardModal from "~/components/UserProfileCardModal/UserProfileCardModal";
import Icon from "~/components/Icon/Icon";
import { useToast } from "~/context/ToastContext.jsx";
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
    # Đọc dữ liệu từ sys.stdin và in ra stdout
    input_data = sys.stdin.read().split()
    if not input_data:
        return
    # Viết mã nguồn giải thuật của bạn tại đây
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
        
        // Viết mã nguồn giải thuật của bạn tại đây
        
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
    
    // Xử lý dữ liệu đầu vào và in ra kết quả
    
}

main();`,
  },
};

function ProblemDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [problem, setProblem] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const [selectedLanguage, setSelectedLanguage] = useState(DEFAULT_LANGUAGE_TEMPLATES.cpp);
  const [code, setCode] = useState(DEFAULT_LANGUAGE_TEMPLATES.cpp.template);
  const [userCodeByLang, setUserCodeByLang] = useState({});

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

  // Load chi tiết bài tập từ SQLite Backend qua ID hoặc Slug
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
    // Save current code to cache
    const currentLangId = selectedLanguage?.id || "cpp";
    const updatedCache = { ...userCodeByLang, [currentLangId]: code };
    setUserCodeByLang(updatedCache);

    setSelectedLanguage(lang);

    // If user already wrote code for this language, restore it; otherwise use default template
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

    // Step 1: Initiating Submission
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
      // Execute submission API call (with automatic smart fallback)
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

      // Step 2: Progressive animation for Compilation
      await new Promise((resolve) => setTimeout(resolve, 800));
      const step2Label = `[2/3] Đang biên dịch mã nguồn ${selectedLanguage?.label || "C++"}...`;
      setJudgingStep(step2Label);
      const compileCmdMap = {
        cpp: "g++ -O2 -std=c++17 solution.cpp -o solution",
        c: "gcc -O2 solution.c -o solution -lm",
        java: "javac Main.java",
        python: "python3 -m py_compile solution.py",
        javascript: "node --check solution.js",
      };
      const currentCompileCmd = compileCmdMap[selectedLanguage?.id] || "g++ -O2 -std=c++17 solution.cpp -o solution";

      setConsoleLogs((prev) => [
        ...prev,
        { type: "stdout", text: `[2/3] ${currentCompileCmd}` },
      ]);

      const result = await judgePromise;

      if (result.status === "CE") {
        setConsoleLogs((prev) => [
          ...prev,
          { type: "error", text: "❌ Biên dịch thất bại (Compilation Error)!" },
          ...(result.logs ? result.logs.map((l) => ({ type: "error", text: l })) : []),
        ]);
        toast.error("Mã nguồn bị lỗi biên dịch (CE)!", "Lỗi máy chấm");
      } else {
        setConsoleLogs((prev) => [
          ...prev,
          { type: "success", text: "✅ Biên dịch thành công! Không có cảnh báo (0 Warnings)." },
        ]);
      }

      // Step 3: Progressive animation for Test Execution
      await new Promise((resolve) => setTimeout(resolve, 800));
      const step3Label = "[3/3] Đang chạy kiểm thử các testcases...";
      setJudgingStep(step3Label);

      if (result.status === "CE") {
        // CE handled above
      } else if (result.status === "AC") {
        setConsoleLogs((prev) => [
          ...prev,
          ...(result.logs && result.logs.length > 0
            ? result.logs.map((l) => ({ type: "stdout", text: `[3/3] ${l}` }))
            : [
                { type: "stdout", text: `[3/3] Hoàn thành toàn bộ test cases (${result.passed_tests || result.total_tests || 1}/${result.total_tests || 1} Tests AC)` },
              ]),
          {
            type: "success",
            text: `🎉 Kết quả máy chấm: ACCEPTED (Đạt ${result.score != null ? result.score : 100}/${result.max_score != null ? result.max_score : 100} Điểm) - Tổng thời gian: ${result.execution_time ? result.execution_time + "s" : "0.02s"}`,
          },
        ]);
        toast.success("Chúc mừng! Bài làm đạt kết quả ACCEPTED!", "Máy chấm FySet");
      } else if (result.status === "WA") {
        setConsoleLogs((prev) => [
          ...prev,
          ...(result.logs && result.logs.length > 0
            ? result.logs.map((l) => ({ type: "error", text: `[3/3] ${l}` }))
            : []),
          {
            type: "error",
            text: `❌ Kết quả máy chấm: WRONG ANSWER (WA) - Đạt ${result.passed_tests || 0}/${result.total_tests || 1} testcases (${result.score || 0}/${result.max_score || 100} Điểm).`,
          },
        ]);
        toast.warning("Mã nguồn cho kết quả sai ở một số testcase (WA)!", "Kết quả bài nộp");
      } else if (result.status === "TLE") {
        setConsoleLogs((prev) => [
          ...prev,
          ...(result.logs && result.logs.length > 0
            ? result.logs.map((l) => ({ type: "error", text: `[3/3] ${l}` }))
            : []),
          { type: "error", text: "⏱️ Kết quả máy chấm: TIME LIMIT EXCEEDED (TLE) - Vượt quá thời gian cho phép!" },
        ]);
        toast.warning("Chương trình chạy vượt quá thời gian quy định (TLE)!", "Kết quả bài nộp");
      } else if (result.status === "RE") {
        setConsoleLogs((prev) => [
          ...prev,
          ...(result.logs && result.logs.length > 0
            ? result.logs.map((l) => ({ type: "error", text: `[3/3] ${l}` }))
            : []),
          { type: "error", text: "💥 Kết quả máy chấm: RUNTIME ERROR (RE) - Lỗi thực thi trong quá trình chạy!" },
        ]);
        toast.error("Mã nguồn gặp sự cố trong quá trình thực thi (RE)!", "Kết quả bài nộp");
      }

      // Navigate to Result page after short delay for user to see the completed verdict
      await new Promise((resolve) => setTimeout(resolve, 900));
      setIsSubmitting(false);
      setJudgingStep("");

      const pTitle = problem.code
        ? `#${problem.code}: ${problem.title}`
        : `${problem.id}. ${problem.title}`;
      const pDiffLabel = problem.difficultyLabel || problem.difficulty || "Dễ";

      navigate(`/problem/${problem.slug || problem.id || id}/result`, {
        state: {
          submissionResult: {
            id: result.submission_id,
            problemId: problem.id || id,
            problemTitle: pTitle,
            difficultyLabel: pDiffLabel,
            status: result.status,
            executionTime: result.execution_time,
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