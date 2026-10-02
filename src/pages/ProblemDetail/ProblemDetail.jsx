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

    // ===== LƯU VÀO DATABASE QUA SERVICE =====
    try {
      const payloadToSave = {
        problemId: problem._id || problem.id || id,
        sourceCode: code,
        language: selectedLanguage?.id || "cpp",
        status: result.status || "WA",
        executionTime: parseFloat(result.execution_time) || 0,
        memoryUsed: parseFloat(result.memory) || 0,
        createdAt: new Date(),
        score: result.score != null ? result.score : (result.status === "AC" ? 100 : 0),
        maxScore: result.max_score || 100,
        passedTests: result.passed_tests || 0,
        totalTests: result.total_tests || 1,
        testResults: result.test_results || [],
        subtasksResult: result.subtasks || [],
        logs: result.logs || [],
      };

      await problemService.saveProblem(payloadToSave);
    } catch (saveErr) {
      console.error("Không thể lưu kết quả nộp bài vào CSDL:", saveErr);
    }
    // =========================================

    await new Promise((resolve) => setTimeout(resolve, 600));
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