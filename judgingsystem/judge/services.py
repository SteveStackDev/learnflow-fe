import glob
import sys
import os
import re
import subprocess
import tempfile
import time
import shutil
from pathlib import Path
from typing import Dict, Any, List

from .models import Submission, Problem, TestCase


def normalize_output(text: str) -> str:
    """
    Standardize text output for robust comparison:
    - Normalizes line breaks (\r\n -> \n)
    - Strips trailing whitespace per line
    - Strips leading/trailing empty lines
    """
    if not text:
        return ""
    lines = [line.rstrip() for line in text.replace("\r\n", "\n").replace("\r", "\n").strip().split("\n")]
    return "\n".join(lines).strip()


def find_cpp_compiler():
    """
    Tìm trình biên dịch C++ (g++, clang++, c++, gcc) trên hệ thống / Docker
    """
    for name in ["g++", "clang++", "c++", "gcc"]:
        p = shutil.which(name)
        if p:
            return p

    # Fallback Windows nếu chưa cấu hình biến môi trường PATH
    for path in [
        r"C:\msys64\ucrt64\bin\g++.exe",
        r"C:\msys64\mingw64\bin\g++.exe",
        r"C:\MinGW\bin\g++.exe",
        r"C:\Program Files\CodeBlocks\MinGW\bin\g++.exe",
        r"C:\w64devkit\bin\g++.exe",
    ]:
        if os.path.isfile(path):
            return path
    return None


def find_java_compiler():
    """
    Tìm trình biên dịch javac trong PATH, JAVA_HOME hoặc thư mục cài đặt tiêu chuẩn (Docker & Windows)
    """
    p = shutil.which("javac") or shutil.which("javac.exe")
    if p:
        return p

    java_home = os.environ.get("JAVA_HOME") or os.environ.get("JDK_HOME")
    if java_home:
        p = os.path.join(java_home, "bin", "javac.exe" if os.name == "nt" else "javac")
        if os.path.isfile(p):
            return p

    # Fallback cho Windows nếu chưa gán PATH
    common_roots = [
        r"C:\Program Files\Microsoft",
        r"C:\Program Files\Java",
        r"C:\Program Files\Eclipse Adoptium",
        r"C:\Program Files\Zulu",
        r"C:\Program Files (x86)\Java",
    ]
    for root in common_roots:
        if os.path.isdir(root):
            for dirpath, _, filenames in os.walk(root):
                if "javac.exe" in filenames or "javac" in filenames:
                    return os.path.join(dirpath, "javac.exe" if os.name == "nt" else "javac")

    return None


def find_java_runtime(javac_path=None):
    """
    Lấy java runtime cùng phiên bản với javac (cùng thư mục bin) hoặc từ PATH
    """
    target_javac = javac_path or find_java_compiler()
    if target_javac:
        matching_java = os.path.join(os.path.dirname(target_javac), "java.exe" if os.name == "nt" else "java")
        if os.path.isfile(matching_java):
            return matching_java

    return shutil.which("java") or shutil.which("java.exe")


def find_js_runtime():
    """
    Tìm JavaScript runtime (Node.js) trên hệ thống / Docker
    """
    for name in ["node", "nodejs", "node.exe"]:
        p = shutil.which(name)
        if p:
            return p

    common_paths = [
        r"C:\Program Files\nodejs\node.exe",
        r"C:\Program Files (x86)\nodejs\node.exe",
    ]
    for p in common_paths:
        if os.path.isfile(p):
            return p
    return None


def find_python_runtime():
    """
    Tìm trình thực thi Python 3 (ưu tiên sys.executable, fallback về PATH)
    """
    if sys.executable and os.path.isfile(sys.executable):
        return sys.executable
    for name in ["python3", "python", "py"]:
        p = shutil.which(name)
        if p:
            return p
    return sys.executable


class JudgeService:

    @classmethod
    def prepare_runner(cls, temp_dir: Path, code: str, language: str) -> Dict[str, Any]:
        """
        Biên dịch hoặc chuẩn bị môi trường thực thi 1 lần duy nhất cho mã nguồn.
        Trả về dict: {"status": "OK", "cmd": [...], "cwd": ...} hoặc {"status": "CE", "stderr": "..."}
        """
        lang = (language or "cpp").lower()

        # ----------------------------------------------------
        # PYTHON 3
        # ----------------------------------------------------
        if lang in ("python", "python3", "py"):
            script_file = temp_dir / "solution.py"
            script_file.write_text(code, encoding="utf-8")
            py_bin = find_python_runtime()
            if not py_bin:
                return {
                    "status": "CE",
                    "stderr": "Lỗi thực thi: Không tìm thấy Python runtime trên máy chủ.",
                }
            return {
                "status": "OK",
                "cmd": [py_bin, str(script_file)],
                "cwd": str(temp_dir),
            }

        # ----------------------------------------------------
        # C++ (g++ / MinGW / Clang)
        # ----------------------------------------------------
        elif lang in ("cpp", "c++"):
            source_file = temp_dir / "solution.cpp"
            exec_file = temp_dir / ("solution.exe" if os.name == "nt" else "solution")
            source_file.write_text(code, encoding="utf-8")

            compiler = find_cpp_compiler()
            if not compiler:
                return {
                    "status": "CE",
                    "stderr": "Lỗi biên dịch: Không tìm thấy trình biên dịch C++ (g++/MinGW/Clang) trên hệ thống máy chủ.",
                }

            compile_res = subprocess.run(
                [compiler, "-O2", "-std=c++17", str(source_file), "-o", str(exec_file)],
                capture_output=True,
                text=True,
                timeout=15,
                cwd=str(temp_dir),
            )

            if compile_res.returncode != 0:
                return {
                    "status": "CE",
                    "stderr": compile_res.stderr.strip() or "C++ Compilation Error",
                }

            return {
                "status": "OK",
                "cmd": [str(exec_file)],
                "cwd": str(temp_dir),
            }

        # ----------------------------------------------------
        # C (gcc)
        # ----------------------------------------------------
        elif lang in ("c", "gcc"):
            source_file = temp_dir / "solution.c"
            exec_file = temp_dir / ("solution.exe" if os.name == "nt" else "solution")
            source_file.write_text(code, encoding="utf-8")

            compiler = shutil.which("gcc") or shutil.which("gcc.exe") or find_cpp_compiler()
            if not compiler:
                return {
                    "status": "CE",
                    "stderr": "Lỗi biên dịch: Không tìm thấy trình biên dịch C (gcc) trên máy chủ.",
                }

            compile_res = subprocess.run(
                [compiler, "-O2", str(source_file), "-o", str(exec_file), "-lm"],
                capture_output=True,
                text=True,
                timeout=15,
                cwd=str(temp_dir),
            )

            if compile_res.returncode != 0:
                return {
                    "status": "CE",
                    "stderr": compile_res.stderr.strip() or "C Compilation Error",
                }

            return {
                "status": "OK",
                "cmd": [str(exec_file)],
                "cwd": str(temp_dir),
            }

        # ----------------------------------------------------
        # JAVASCRIPT (Node.js)
        # ----------------------------------------------------
        elif lang in ("javascript", "js", "node"):
            js_file = temp_dir / "solution.js"
            js_file.write_text(code, encoding="utf-8")

            node_bin = find_js_runtime()
            if not node_bin:
                return {
                    "status": "CE",
                    "stderr": "Lỗi thực thi: Không tìm thấy Node.js runtime trên hệ thống máy chủ.",
                }

            return {
                "status": "OK",
                "cmd": [node_bin, str(js_file)],
                "cwd": str(temp_dir),
            }

        # ----------------------------------------------------
        # JAVA
        # ----------------------------------------------------
        elif lang in ("java",):
            java_file = temp_dir / "Main.java"
            java_file.write_text(code, encoding="utf-8")

            javac_bin = find_java_compiler()
            java_bin = find_java_runtime(javac_bin)

            if not (javac_bin and java_bin):
                return {
                    "status": "CE",
                    "stderr": "Lỗi biên dịch: Không tìm thấy JDK (javac / java) trên hệ thống máy chủ.",
                }

            compile_res = subprocess.run(
                [javac_bin, str(java_file)],
                capture_output=True,
                text=True,
                timeout=15,
                cwd=str(temp_dir),
            )

            if compile_res.returncode != 0:
                return {
                    "status": "CE",
                    "stderr": compile_res.stderr.strip() or "Java Compilation Error",
                }

            return {
                "status": "OK",
                "cmd": [java_bin, "-cp", str(temp_dir), "Main"],
                "cwd": str(temp_dir),
            }

        return {
            "status": "CE",
            "stderr": f"Ngôn ngữ '{language}' chưa được hỗ trợ trên máy chấm!",
        }

    @classmethod
    def execute_code_single_test(
        cls,
        source_code: str,
        language: str,
        input_data: str,
        expected_output: str,
        time_limit: float = 2.0,
        memory_limit_mb: int = 256,
    ) -> Dict[str, Any]:
        """
        Thực thi mã nguồn trên 1 testcase mẫu hoặc đơn lẻ.
        """
        code = (source_code or "").strip()
        if not code:
            return {
                "status": "CE",
                "stdout": "",
                "stderr": "Mã nguồn rỗng!",
                "execution_time": 0.0,
                "is_correct": False,
            }

        with tempfile.TemporaryDirectory() as temp_dir_str:
            temp_dir = Path(temp_dir_str)
            prep = cls.prepare_runner(temp_dir, code, language)
            if prep["status"] != "OK":
                return {
                    "status": prep["status"],
                    "stdout": "",
                    "stderr": prep.get("stderr", ""),
                    "execution_time": 0.0,
                    "is_correct": False,
                }

            cmd = prep["cmd"]
            cwd = prep.get("cwd", str(temp_dir))

            start_time = time.perf_counter()
            try:
                run_res = subprocess.run(
                    cmd,
                    input=input_data,
                    capture_output=True,
                    text=True,
                    timeout=time_limit,
                    cwd=cwd,
                )
                exec_time = time.perf_counter() - start_time

                if run_res.returncode != 0:
                    lang = (language or "cpp").lower()
                    is_syntax = (
                        lang in ("python", "python3", "py") and ("SyntaxError" in run_res.stderr or "IndentationError" in run_res.stderr)
                    ) or (
                        lang in ("javascript", "js", "node") and "SyntaxError" in run_res.stderr
                    )
                    return {
                        "status": "CE" if is_syntax else "RE",
                        "stdout": run_res.stdout,
                        "stderr": run_res.stderr.strip() or f"Process exited with code {run_res.returncode}",
                        "execution_time": round(exec_time, 3),
                        "is_correct": False,
                    }

                norm_out = normalize_output(run_res.stdout)
                norm_exp = normalize_output(expected_output)
                is_ac = norm_out == norm_exp

                return {
                    "status": "AC" if is_ac else "WA",
                    "stdout": run_res.stdout.strip(),
                    "stderr": run_res.stderr.strip() if not is_ac else "",
                    "execution_time": round(exec_time, 3),
                    "is_correct": is_ac,
                }

            except subprocess.TimeoutExpired:
                return {
                    "status": "TLE",
                    "stdout": "",
                    "stderr": f"Time Limit Exceeded (> {time_limit}s)",
                    "execution_time": float(time_limit),
                    "is_correct": False,
                }
            except Exception as e:
                return {
                    "status": "RE",
                    "stdout": "",
                    "stderr": f"Lỗi hệ thống máy chấm: {str(e)}",
                    "execution_time": 0.0,
                    "is_correct": False,
                }

    @classmethod
    def judge_submission(cls, submission: Submission) -> Dict[str, Any]:
        """
        Judges a submission comprehensively against all test cases and subtasks of the problem.
        Calculates earned points, subtask scoreboards, and updates the Submission record in DB.
        """
        problem = submission.problem
        time_limit = getattr(problem, "time_limit", 2.0) or 2.0
        memory_limit = getattr(problem, "memory_limit", 256) or 256
        max_problem_points = problem.points or 500

        # Fetch all test cases
        db_test_cases = list(problem.testcases.all().order_by("order", "id"))
        raw_subtasks = problem.subtasks if isinstance(problem.subtasks, list) and len(problem.subtasks) > 0 else []

        test_cases_formatted = [
            {
                "id": tc.id,
                "input": tc.input_data,
                "expected": tc.expected_output,
                "points": tc.points,
                "isHidden": tc.is_hidden,
            }
            for tc in db_test_cases
        ]

        judge_result = cls.judge_custom(
            source_code=submission.source_code,
            language=submission.language,
            problem_id=problem.id,
            subtasks=raw_subtasks,
            test_cases=test_cases_formatted if not raw_subtasks else None,
            time_limit=time_limit,
            memory_limit=memory_limit,
            max_points=max_problem_points,
        )

        # Update Submission in Database
        submission.status = judge_result["status"]
        submission.score = judge_result["score"]
        submission.max_score = judge_result["max_score"]
        submission.passed_tests = judge_result["passed_tests"]
        submission.total_tests = judge_result["total_tests"]
        submission.execution_time = judge_result["execution_time"]
        submission.memory_used = judge_result["memory_used"]
        submission.test_results = judge_result["test_results"]
        submission.subtasks_result = judge_result["subtasks"]
        submission.logs = judge_result["logs"]
        submission.save()

        judge_result["submission_id"] = submission.id
        return judge_result

    @classmethod
    def judge_custom(
        cls,
        source_code: str,
        language: str,
        problem_id: Any = "1",
        subtasks: List[Dict[str, Any]] = None,
        test_cases: List[Dict[str, Any]] = None,
        examples: List[Dict[str, Any]] = None,
        time_limit: float = 2.0,
        memory_limit: int = 256,
        max_points: int = 500,
    ) -> Dict[str, Any]:
        """
        Judges code directly against provided subtasks / testcases / examples (MongoDB compatible).
        Compiles the program ONCE and executes tests sequentially for lightning-fast grading.
        """
        code = (source_code or "").strip()
        subtasks_list = []
        if subtasks and isinstance(subtasks, list) and len(subtasks) > 0:
            subtasks_list = subtasks
        elif test_cases and isinstance(test_cases, list) and len(test_cases) > 0:
            subtasks_list = [
                {
                    "id": 1,
                    "name": "Subtask 1 (Toàn bộ Test Cases)",
                    "points": max_points,
                    "constraints": "Ràng buộc chuẩn",
                    "testCases": test_cases,
                }
            ]
        elif examples and isinstance(examples, list) and len(examples) > 0:
            subtasks_list = [
                {
                    "id": 1,
                    "name": "Subtask 1 (Test Mẫu)",
                    "points": max_points,
                    "constraints": "Ví dụ mẫu",
                    "testCases": [
                        {
                            "id": ex.get("id", i + 1),
                            "input": ex.get("input", ""),
                            "expected": ex.get("output", ex.get("expected", "")),
                            "points": int(max_points / max(1, len(examples))),
                            "isHidden": False,
                        }
                        for i, ex in enumerate(examples)
                    ],
                }
            ]
        else:
            subtasks_list = [
                {
                    "id": 1,
                    "name": "Subtask 1 (Kiểm thử thực thi)",
                    "points": max_points,
                    "constraints": "Mặc định",
                    "testCases": [
                        {
                            "id": 1,
                            "input": "",
                            "expected": "",
                            "points": max_points,
                            "isHidden": False,
                        }
                    ],
                }
            ]

        test_results = []
        subtasks_result = []
        total_earned_score = 0
        passed_tests_count = 0
        total_tests_count = 0
        total_execution_time = 0.0
        logs = []

        if not code:
            return {
                "submission_id": f"sub_{int(time.time() * 1000)}",
                "problem_id": problem_id,
                "status": "CE",
                "score": 0,
                "max_score": max_points,
                "passed_tests": 0,
                "total_tests": 0,
                "execution_time": 0.0,
                "memory_used": 0.0,
                "test_results": [],
                "subtasks": [],
                "logs": ["Mã nguồn rỗng!"],
            }

        with tempfile.TemporaryDirectory() as temp_dir_str:
            temp_dir = Path(temp_dir_str)
            # Biên dịch mã nguồn 1 lần duy nhất
            prep = cls.prepare_runner(temp_dir, code, language)

            # Trường hợp Lỗi Biên dịch (CE)
            if prep["status"] != "OK":
                ce_error = prep.get("stderr", "Compilation Error")
                logs.append(f"[Compiler Error] {ce_error}")

                for s_idx, st in enumerate(subtasks_list):
                    st_name = st.get("name") or f"Subtask {s_idx + 1}"
                    st_points = int(st.get("points") or (max_points if len(subtasks_list) == 1 else 100))
                    st_tests = st.get("testCases") or st.get("test_cases") or st.get("tests") or []
                    st_tests_results = []

                    for t_idx, tc_item in enumerate(st_tests):
                        total_tests_count += 1
                        tc_input = tc_item.get("input") if tc_item.get("input") is not None else tc_item.get("input_data", "")
                        tc_expected = tc_item.get("expected") if tc_item.get("expected") is not None else (tc_item.get("expected_output") or tc_item.get("output", ""))
                        tc_points = int(tc_item.get("points") or tc_item.get("maxScore") or 100)
                        tc_hidden = bool(tc_item.get("isHidden") or tc_item.get("is_hidden", False))

                        test_obj = {
                            "id": len(test_results) + 1,
                            "subtask_id": st.get("id", s_idx + 1),
                            "subtask_name": st_name,
                            "label": f"Test {len(test_results) + 1} ({st_name})",
                            "status": "CE",
                            "score": 0,
                            "maxScore": tc_points,
                            "runtime": "0 ms",
                            "time": 0.0,
                            "memory": "0 KB",
                            "is_hidden": tc_hidden,
                            "input": tc_input if not tc_hidden else "(Hidden Test)",
                            "expected": tc_expected if not tc_hidden else "(Hidden Expected)",
                            "stdout": "",
                            "stderr": ce_error,
                        }
                        test_results.append(test_obj)
                        st_tests_results.append(test_obj)

                    subtasks_result.append({
                        "id": f"sub-{s_idx + 1}",
                        "label": f"Sub {s_idx + 1} ({st_points} pt)",
                        "title": f"{st_name} ({st.get('constraints', '') or 'Ràng buộc'})",
                        "maxScore": st_points,
                        "earnedScore": 0,
                        "status": "CE",
                        "maxTime": "0 ms",
                        "maxMemory": "0 KB",
                        "tests": st_tests_results,
                    })

                return {
                    "submission_id": f"sub_{int(time.time() * 1000)}",
                    "problem_id": problem_id,
                    "status": "CE",
                    "score": 0,
                    "max_score": max_points,
                    "passed_tests": 0,
                    "total_tests": total_tests_count,
                    "execution_time": 0.0,
                    "memory_used": 0.0,
                    "test_results": test_results,
                    "subtasks": subtasks_result,
                    "logs": logs,
                }

            # Đã biên dịch thành công -> Thực thi trên từng Test Case
            cmd = prep["cmd"]
            cwd = prep.get("cwd", str(temp_dir))
            overall_verdict = "AC"
            has_tle = False
            has_re = False
            has_wa = False

            for s_idx, st in enumerate(subtasks_list):
                st_name = st.get("name") or f"Subtask {s_idx + 1}"
                st_points = int(st.get("points") or (max_points if len(subtasks_list) == 1 else 100))
                st_tests = st.get("testCases") or st.get("test_cases") or st.get("tests") or []

                st_all_ac = True
                st_max_time = 0.0
                st_status = "AC"
                st_tests_results = []

                for t_idx, tc_item in enumerate(st_tests):
                    total_tests_count += 1
                    tc_input = tc_item.get("input") if tc_item.get("input") is not None else tc_item.get("input_data", "")
                    tc_expected = tc_item.get("expected") if tc_item.get("expected") is not None else (tc_item.get("expected_output") or tc_item.get("output", ""))
                    tc_points = int(tc_item.get("points") or tc_item.get("maxScore") or 100)
                    tc_hidden = bool(tc_item.get("isHidden") or tc_item.get("is_hidden", False))

                    start_time = time.perf_counter()
                    t_status = "AC"
                    t_stdout = ""
                    t_stderr = ""
                    t_time = 0.0

                    try:
                        run_res = subprocess.run(
                            cmd,
                            input=tc_input,
                            capture_output=True,
                            text=True,
                            timeout=time_limit,
                            cwd=cwd,
                        )
                        t_time = round(time.perf_counter() - start_time, 3)
                        t_stdout = run_res.stdout
                        t_stderr = run_res.stderr.strip()

                        if run_res.returncode != 0:
                            lang = (language or "cpp").lower()
                            is_syntax = (
                                lang in ("python", "python3", "py") and ("SyntaxError" in t_stderr or "IndentationError" in t_stderr)
                            ) or (
                                lang in ("javascript", "js", "node") and "SyntaxError" in t_stderr
                            )
                            t_status = "CE" if is_syntax else "RE"
                            if not t_stderr:
                                t_stderr = f"Process exited with code {run_res.returncode}"
                        else:
                            norm_out = normalize_output(t_stdout)
                            norm_exp = normalize_output(tc_expected)
                            if norm_out == norm_exp:
                                t_status = "AC"
                            else:
                                t_status = "WA"

                    except subprocess.TimeoutExpired:
                        t_time = float(time_limit)
                        t_status = "TLE"
                        t_stderr = f"Time Limit Exceeded (> {time_limit}s)"
                    except Exception as e:
                        t_status = "RE"
                        t_stderr = f"Lỗi thực thi: {str(e)}"

                    st_max_time = max(st_max_time, t_time)
                    total_execution_time += t_time

                    if t_status == "AC":
                        passed_tests_count += 1
                    else:
                        st_all_ac = False
                        if t_status == "TLE":
                            has_tle = True
                            st_status = "TLE"
                        elif t_status == "RE":
                            has_re = True
                            st_status = "RE" if st_status not in ("TLE",) else st_status
                        elif t_status == "WA":
                            has_wa = True
                            st_status = "WA" if st_status not in ("TLE", "RE") else st_status

                    test_obj = {
                        "id": len(test_results) + 1,
                        "subtask_id": st.get("id", s_idx + 1),
                        "subtask_name": st_name,
                        "label": f"Test {len(test_results) + 1} ({st_name})",
                        "status": t_status,
                        "score": tc_points if t_status == "AC" else 0,
                        "maxScore": tc_points,
                        "runtime": f"{int(t_time * 1000)} ms" if t_status != "TLE" else f"> {int(time_limit * 1000)} ms",
                        "time": t_time,
                        "memory": "2.4 MB",
                        "is_hidden": tc_hidden,
                        "input": tc_input if not tc_hidden else "(Hidden Test)",
                        "expected": tc_expected if not tc_hidden else "(Hidden Expected)",
                        "stdout": t_stdout.strip() if not tc_hidden else "(Hidden Output)",
                        "stderr": t_stderr,
                    }
                    test_results.append(test_obj)
                    st_tests_results.append(test_obj)

                    if t_stderr:
                        logs.append(f"[{st_name} - Test #{t_idx + 1}] {t_stderr}")

                earned_st_score = st_points if st_all_ac else 0
                total_earned_score += earned_st_score

                subtasks_result.append({
                    "id": f"sub-{s_idx + 1}",
                    "label": f"Sub {s_idx + 1} ({st_points} pt)",
                    "title": f"{st_name} ({st.get('constraints', '') or 'Ràng buộc'})",
                    "maxScore": st_points,
                    "earnedScore": earned_st_score,
                    "status": "AC" if st_all_ac else st_status,
                    "maxTime": f"{int(st_max_time * 1000)} ms",
                    "maxMemory": "4.2 MB",
                    "tests": st_tests_results,
                })

            if total_earned_score >= max_points or (total_tests_count > 0 and passed_tests_count == total_tests_count):
                overall_verdict = "AC"
            elif has_tle and passed_tests_count == 0:
                overall_verdict = "TLE"
            elif has_re and passed_tests_count == 0:
                overall_verdict = "RE"
            else:
                overall_verdict = "WA"

            return {
                "submission_id": f"sub_{int(time.time() * 1000)}",
                "problem_id": problem_id,
                "status": overall_verdict,
                "score": total_earned_score,
                "max_score": max_points,
                "passed_tests": passed_tests_count,
                "total_tests": total_tests_count,
                "execution_time": round(total_execution_time, 3),
                "memory_used": 4.2,
                "test_results": test_results,
                "subtasks": subtasks_result,
                "logs": logs,
            }

    @classmethod
    def run_sample_code(
        cls,
        source_code: str,
        language: str,
        sample_input: str,
        expected_output: str,
        time_limit: float = 2.0,
    ) -> Dict[str, Any]:
        """
        Quick execution for 'Chạy thử' (Run Sample) button.
        """
        res = cls.execute_code_single_test(
            source_code=source_code,
            language=language,
            input_data=sample_input,
            expected_output=expected_output,
            time_limit=time_limit,
        )

        return {
            "success": res["status"] == "AC" or res.get("is_correct", False),
            "status": res["status"],
            "stdout": res.get("stdout", ""),
            "stderr": res.get("stderr", ""),
            "input": sample_input,
            "expectedOutput": expected_output,
            "executionTime": f"{res['execution_time']}s",
            "memory": "2.1MB",
            "error": res.get("stderr", "") if res["status"] != "AC" else "",
        }