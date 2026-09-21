from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.db import transaction, connection
from django.utils.text import slugify
from django.utils import timezone
from datetime import timedelta
import json
import sys
import os

from .models import Problem, TestCase, Submission
from .services import JudgeService, find_cpp_compiler, find_java_compiler, find_java_runtime, find_js_runtime


def ensure_sqlite_columns():
    """
    Tự động kiểm tra và thêm các cột còn thiếu vào SQLite nếu chưa chạy migrate
    """
    try:
        with connection.cursor() as cursor:
            # 1. Bảng judge_problem
            cursor.execute("PRAGMA table_info(judge_problem);")
            problem_cols = [row[1] for row in cursor.fetchall()]

            if problem_cols:
                if "subtasks" not in problem_cols:
                    cursor.execute("ALTER TABLE judge_problem ADD COLUMN subtasks JSON DEFAULT '[]';")
                if "image_description" not in problem_cols:
                    cursor.execute("ALTER TABLE judge_problem ADD COLUMN image_description TEXT DEFAULT '';")
                if "hints" not in problem_cols:
                    cursor.execute("ALTER TABLE judge_problem ADD COLUMN hints TEXT DEFAULT '';")
                if "author_name" not in problem_cols:
                    cursor.execute("ALTER TABLE judge_problem ADD COLUMN author_name VARCHAR(255) DEFAULT 'FySet Team';")
                if "time_limit" not in problem_cols:
                    cursor.execute("ALTER TABLE judge_problem ADD COLUMN time_limit REAL DEFAULT 2.0;")
                if "memory_limit" not in problem_cols:
                    cursor.execute("ALTER TABLE judge_problem ADD COLUMN memory_limit INTEGER DEFAULT 256;")

            # 2. Bảng judge_submission
            cursor.execute("PRAGMA table_info(judge_submission);")
            sub_cols = [row[1] for row in cursor.fetchall()]

            if sub_cols:
                if "score" not in sub_cols:
                    cursor.execute("ALTER TABLE judge_submission ADD COLUMN score INTEGER DEFAULT 0;")
                if "max_score" not in sub_cols:
                    cursor.execute("ALTER TABLE judge_submission ADD COLUMN max_score INTEGER DEFAULT 500;")
                if "passed_tests" not in sub_cols:
                    cursor.execute("ALTER TABLE judge_submission ADD COLUMN passed_tests INTEGER DEFAULT 0;")
                if "total_tests" not in sub_cols:
                    cursor.execute("ALTER TABLE judge_submission ADD COLUMN total_tests INTEGER DEFAULT 0;")
                if "test_results" not in sub_cols:
                    cursor.execute("ALTER TABLE judge_submission ADD COLUMN test_results JSON DEFAULT '[]';")
                if "subtasks_result" not in sub_cols:
                    cursor.execute("ALTER TABLE judge_submission ADD COLUMN subtasks_result JSON DEFAULT '[]';")
                if "logs" not in sub_cols:
                    cursor.execute("ALTER TABLE judge_submission ADD COLUMN logs JSON DEFAULT '[]';")

    except Exception as e:
        print("[FySet Auto-Migrate Notice]:", e)


# Tự động thực thi khi module được load
ensure_sqlite_columns()


def format_problem_response(problem, include_testcases=True):
    """
    Chuẩn hóa dữ liệu bài tập sang format JSON cho Frontend
    """
    level_map = {
        "easy": "Dễ",
        "medium": "Trung bình",
        "hard": "Khó",
        "Easy": "Dễ",
        "Medium": "Trung bình",
        "Hard": "Khó",
    }

    # Format đầu vào / đầu ra / ràng buộc dạng list
    input_fmt = problem.input_description.split("\n") if problem.input_description else []
    output_fmt = problem.output_description.split("\n") if problem.output_description else []
    constraints_list = [c.strip() for c in problem.constraints.split("\n") if c.strip()] if problem.constraints else []

    # Danh sách ví dụ mẫu
    examples_list = problem.examples if isinstance(problem.examples, list) and len(problem.examples) > 0 else []

    # Danh sách Test cases
    test_cases_data = []
    if include_testcases:
        for tc in problem.testcases.all().order_by("order", "id"):
            test_cases_data.append({
                "id": tc.id,
                "input": tc.input_data,
                "expected": tc.expected_output,
                "points": tc.points,
                "isHidden": tc.is_hidden,
                "isSample": tc.is_sample,
            })

    # Starter code templates theo ngôn ngữ
    templates = [
        {
            "id": "cpp",
            "label": "C++",
            "template": (
                '#include <iostream>\n'
                'using namespace std;\n\n'
                'int main() {\n'
                '    // Viết mã nguồn giải thuật của bạn tại đây\n'
                '    return 0;\n'
                '}'
            ),
        },
        {
            "id": "python",
            "label": "Python 3",
            "template": (
                'import sys\n\n'
                'def solve():\n'
                '    # Đọc dữ liệu từ sys.stdin và in ra kết quả\n'
                '    pass\n\n'
                'if __name__ == "__main__":\n'
                '    solve()'
            ),
        },
        {
            "id": "java",
            "label": "Java",
            "template": (
                'import java.util.Scanner;\n\n'
                'public class Main {\n'
                '    public static void main(String[] args) {\n'
                '        Scanner sc = new Scanner(System.in);\n'
                '        // Viết mã nguồn của bạn tại đây\n'
                '    }\n'
                '}'
            ),
        },
        {
            "id": "javascript",
            "label": "JavaScript",
            "template": (
                'const fs = require("fs");\n\n'
                'function main() {\n'
                '    const input = fs.readFileSync(0, "utf-8").trim();\n'
                '    // Xử lý dữ liệu đầu vào và in kết quả\n'
                '}\n\n'
                'main();'
            ),
        },
    ]

    total_submissions = problem.submissions.count()
    ac_submissions = problem.submissions.filter(status="AC").count()
    acceptance_rate = round((ac_submissions / total_submissions * 100), 1) if total_submissions > 0 else 0

    return {
        "id": problem.id,
        "title": problem.title,
        "statement": problem.statement,
        "description": problem.statement,
        "imageDescription": getattr(problem, "image_description", "") or "",
        "image_description": getattr(problem, "image_description", "") or "",
        "inputFormat": input_fmt,
        "outputFormat": output_fmt,
        "input_description": problem.input_description,
        "output_description": problem.output_description,
        "constraints": constraints_list,
        "topic": problem.topic,
        "tags": [problem.topic, level_map.get(problem.difficulty, "Dễ")],
        "points": problem.points,
        "difficulty": problem.difficulty.capitalize(),
        "difficultyLabel": level_map.get(problem.difficulty, "Dễ"),
        "status": problem.status,
        "timeLimit": f"{problem.time_limit}s",
        "memoryLimit": f"{problem.memory_limit}MB",
        "time_limit": problem.time_limit,
        "memory_limit": problem.memory_limit,
        "upvotes": 0,
        "downvotes": 0,
        "author": {
            "name": problem.author_name or "FySet Team",
            "role": "Author",
        },
        "solved": ac_submissions,
        "submissionsCount": total_submissions,
        "acceptanceRate": acceptance_rate,
        "successRate": f"{acceptance_rate}%",
        "acceptance": f"{acceptance_rate}%",
        "passRateNum": acceptance_rate,
        "examples": examples_list,
        "subtasks": problem.subtasks if isinstance(problem.subtasks, list) else [],
        "testCases": test_cases_data,
        "languages": templates,
        "supportedLanguages": ["C++", "Java", "Python", "JavaScript"],
        "createdAt": problem.created_at.strftime("%Y-%m-%d"),
    }


@csrf_exempt
def problem_list_create(request):
    """
    GET: Lấy danh sách bài tập (có hỗ trợ filter)
    POST: Tạo bài tập mới kèm subtasks (chứa embedded testCases)
    """
    if request.method == "GET":
        all_problems = request.GET.get("all", "false").lower() == "true"
        search = request.GET.get("search", "").strip().lower()
        difficulty = request.GET.get("difficulty", "all")
        topic = request.GET.get("topic", "all")

        queryset = Problem.objects.all().order_by("-id")
        if not all_problems:
            queryset = queryset.filter(status="Active")

        if difficulty and difficulty != "all":
            queryset = queryset.filter(difficulty__iexact=difficulty)

        if topic and topic != "all":
            queryset = queryset.filter(topic__icontains=topic)

        if search:
            queryset = queryset.filter(title__icontains=search)

        data = [format_problem_response(p, include_testcases=False) for p in queryset]
        return JsonResponse(data, safe=False)

    elif request.method == "DELETE":
        count, _ = Problem.objects.all().delete()
        return JsonResponse({"message": f"Đã xóa toàn bộ {count} bài tập khỏi cơ sở dữ liệu!", "deletedCount": count})

    elif request.method == "POST":
        try:
            data = json.loads(request.body)
            title = data.get("title", "").strip()
            if not title:
                return JsonResponse({"error": "Tiêu đề bài tập không được để trống!"}, status=400)

            difficulty = data.get("difficulty", "easy").lower()
            topic = data.get("topic", "Array & Hashing")
            points = int(data.get("points", 500))
            status = data.get("status", "Active")
            statement = data.get("statement") or data.get("description") or ""

            # Time limit & Memory limit parsing
            raw_time_limit = data.get("time_limit") if data.get("time_limit") is not None else data.get("timeLimit", 2.0)
            if isinstance(raw_time_limit, str):
                raw_time_limit = raw_time_limit.replace("s", "").strip()
            try:
                time_limit = float(raw_time_limit)
            except (ValueError, TypeError):
                time_limit = 2.0

            raw_mem_limit = data.get("memory_limit") if data.get("memory_limit") is not None else data.get("memoryLimit", 256)
            if isinstance(raw_mem_limit, str):
                raw_mem_limit = raw_mem_limit.replace("MB", "").replace("mb", "").strip()
            try:
                memory_limit = int(raw_mem_limit)
            except (ValueError, TypeError):
                memory_limit = 256

            # Formats
            input_format = data.get("inputFormat", "")
            if isinstance(input_format, list):
                input_format = "\n".join(input_format)

            output_format = data.get("outputFormat", "")
            if isinstance(output_format, list):
                output_format = "\n".join(output_format)

            constraints = data.get("constraints", "")
            if isinstance(constraints, list):
                constraints = "\n".join(constraints)

            examples = data.get("examples", [])
            subtasks = data.get("subtasks", [])
            test_cases = data.get("testCases", [])

            # Nếu có subtasks và không truyền testCases dạng phẳng thì gom testCases từ subtasks
            if not test_cases and isinstance(subtasks, list):
                for st in subtasks:
                    st_tests = st.get("testCases", [])
                    if isinstance(st_tests, list):
                        test_cases.extend(st_tests)

            image_description = data.get("imageDescription") or data.get("image_description") or ""

            with transaction.atomic():
                problem = Problem.objects.create(
                    title=title,
                    statement=statement,
                    image_description=image_description,
                    input_description=input_format,
                    output_description=output_format,
                    constraints=constraints,
                    topic=topic,
                    points=points,
                    difficulty=difficulty,
                    status=status,
                    examples=examples,
                    subtasks=subtasks if isinstance(subtasks, list) else [],
                    author_name=data.get("author_name", "FySet Team"),
                    time_limit=time_limit,
                    memory_limit=memory_limit,
                )

                # Create testcases nếu có
                for index, tc in enumerate(test_cases):
                    input_data = tc.get("input", "")
                    expected_output = tc.get("expected", "")
                    if input_data.strip() and expected_output.strip():
                        TestCase.objects.create(
                            problem=problem,
                            input_data=input_data,
                            expected_output=expected_output,
                            points=int(tc.get("points", 100)),
                            is_hidden=bool(tc.get("isHidden", False)),
                            is_sample=(index == 0),
                            order=index + 1,
                        )

            return JsonResponse(format_problem_response(problem, include_testcases=True), status=201)

        except json.JSONDecodeError:
            return JsonResponse({"error": "Dữ liệu JSON không hợp lệ!"}, status=400)
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)

    return JsonResponse({"error": "Phương thức không được hỗ trợ!"}, status=405)


@csrf_exempt
def problem_detail_update_delete(request, id_or_slug):
    """
    GET: Lấy chi tiết bài tập theo ID
    PUT/PATCH: Cập nhật bài tập
    DELETE: Xóa bài tập
    """
    try:
        problem = None
        if str(id_or_slug).isdigit():
            problem = Problem.objects.filter(id=int(id_or_slug)).first()

        if not problem:
            return JsonResponse({"error": "Không tìm thấy bài tập!"}, status=404)

        if request.method == "GET":
            return JsonResponse(format_problem_response(problem, include_testcases=True))

        elif request.method in ["PUT", "PATCH"]:
            data = json.loads(request.body)
            if "title" in data and data["title"].strip():
                problem.title = data["title"].strip()
            if "difficulty" in data:
                problem.difficulty = data["difficulty"].lower()
            if "topic" in data:
                problem.topic = data["topic"]
            if "points" in data:
                problem.points = int(data["points"])
            if "status" in data:
                problem.status = data["status"]
            if "statement" in data:
                problem.statement = data["statement"]
            if "description" in data and not data.get("statement"):
                problem.statement = data["description"]
            if "imageDescription" in data:
                problem.image_description = data["imageDescription"]
            elif "image_description" in data:
                problem.image_description = data["image_description"]
            if "time_limit" in data or "timeLimit" in data:
                raw_time_limit = data.get("time_limit") if data.get("time_limit") is not None else data.get("timeLimit")
                if isinstance(raw_time_limit, str):
                    raw_time_limit = raw_time_limit.replace("s", "").strip()
                try:
                    problem.time_limit = float(raw_time_limit)
                except (ValueError, TypeError):
                    pass
            if "memory_limit" in data or "memoryLimit" in data:
                raw_mem_limit = data.get("memory_limit") if data.get("memory_limit") is not None else data.get("memoryLimit")
                if isinstance(raw_mem_limit, str):
                    raw_mem_limit = raw_mem_limit.replace("MB", "").replace("mb", "").strip()
                try:
                    problem.memory_limit = int(raw_mem_limit)
                except (ValueError, TypeError):
                    pass
            if "inputFormat" in data:
                problem.input_description = (
                    "\n".join(data["inputFormat"]) if isinstance(data["inputFormat"], list) else data["inputFormat"]
                )
            if "outputFormat" in data:
                problem.output_description = (
                    "\n".join(data["outputFormat"]) if isinstance(data["outputFormat"], list) else data["outputFormat"]
                )
            if "constraints" in data:
                problem.constraints = (
                    "\n".join(data["constraints"]) if isinstance(data["constraints"], list) else data["constraints"]
                )
            if "examples" in data:
                problem.examples = data["examples"]
            if "subtasks" in data:
                problem.subtasks = data["subtasks"] if isinstance(data["subtasks"], list) else []

            problem.save()

            # Cập nhật Testcases nếu có truyền lên
            test_cases = data.get("testCases")
            if test_cases is None and "subtasks" in data and isinstance(data["subtasks"], list):
                test_cases = []
                for st in data["subtasks"]:
                    st_tests = st.get("testCases", [])
                    if isinstance(st_tests, list):
                        test_cases.extend(st_tests)

            if test_cases is not None and isinstance(test_cases, list):
                with transaction.atomic():
                    problem.testcases.all().delete()
                    for index, tc in enumerate(test_cases):
                        input_data = tc.get("input", "")
                        expected_output = tc.get("expected", "")
                        if input_data.strip() and expected_output.strip():
                            TestCase.objects.create(
                                problem=problem,
                                input_data=input_data,
                                expected_output=expected_output,
                                points=int(tc.get("points", 100)),
                                is_hidden=bool(tc.get("isHidden", False)),
                                is_sample=(index == 0),
                                order=index + 1,
                            )

            return JsonResponse(format_problem_response(problem, include_testcases=True))

        elif request.method == "DELETE":
            problem_id = problem.id
            problem.delete()
            return JsonResponse({"message": f"Đã xóa thành công bài tập #{problem_id}!"})

        return JsonResponse({"error": "Phương thức không được hỗ trợ!"}, status=405)

    except Problem.DoesNotExist:
        return JsonResponse({"error": "Không tìm thấy bài tập!"}, status=404)
    except Exception as e:
        return JsonResponse({"error": str(e)}, status=500)


@csrf_exempt
def problem_toggle_status(request, problem_id):
    """
    POST: Đổi trạng thái bài tập Active <-> Draft
    """
    if request.method != "POST":
        return JsonResponse({"error": "Chỉ chấp nhận phương thức POST!"}, status=405)

    try:
        problem = Problem.objects.get(id=problem_id)
        problem.status = "Draft" if problem.status == "Active" else "Active"
        problem.save(update_fields=["status"])
        return JsonResponse({
            "id": problem.id,
            "status": problem.status,
            "message": f"Đã chuyển trạng thái bài tập sang {problem.status}",
        })
    except Problem.DoesNotExist:
        return JsonResponse({"error": "Không tìm thấy bài tập!"}, status=404)


def problem_stats(request):
    """
    GET: Thống kê số lượng bài tập thực tế
    """
    if request.method != "GET":
        return JsonResponse({"error": "Chỉ chấp nhận phương thức GET!"}, status=405)

    active_problems = Problem.objects.filter(status="Active")
    total_count = active_problems.count()

    if total_count == 0:
        return JsonResponse({
            "total": 0,
            "topicsCount": 0,
            "recentCount": 0,
        })

    topics = set(active_problems.values_list("topic", flat=True))
    topics_count = len([t for t in topics if t])

    week_ago = timezone.now() - timedelta(days=7)
    recent_count = active_problems.filter(created_at__gte=week_ago).count()
    if recent_count == 0 and total_count > 0:
        recent_count = total_count

    return JsonResponse({
        "total": total_count,
        "topicsCount": topics_count,
        "recentCount": recent_count,
    })


@csrf_exempt
def submit_code(request):
    """
    POST: Nộp bài và chấm tự động theo Subtasks & Test Cases cho C++, Python, Java, JS
    """
    if request.method != "POST":
        return JsonResponse(
            {"error": "Chỉ chấp nhận phương thức POST!"},
            status=405,
        )

    try:
        data = json.loads(request.body)

        problem_id = data.get("problem_id")
        source_code = data.get("source_code")
        language = data.get("language", "cpp")

        if not problem_id or not source_code:
            return JsonResponse(
                {"error": "Thiếu problem_id hoặc source_code!"},
                status=400,
            )

        problem = Problem.objects.get(id=problem_id)

        submission = Submission.objects.create(
            problem=problem,
            source_code=source_code,
            language=language,
            status="RUNNING",
        )

        # Chạy máy chấm tự động
        judge_result = JudgeService.judge_submission(submission)

        return JsonResponse(judge_result)

    except Problem.DoesNotExist:
        return JsonResponse(
            {"error": "Không tìm thấy bài tập!"},
            status=404,
        )

    except json.JSONDecodeError:
        return JsonResponse(
            {"error": "Định dạng JSON không hợp lệ!"},
            status=400,
        )

    except Exception as e:
        return JsonResponse(
            {"error": str(e)},
            status=500,
        )


@csrf_exempt
def run_sample(request):
    """
    POST: Chạy thử mã nguồn trên 1 testcase mẫu
    """
    if request.method != "POST":
        return JsonResponse(
            {"error": "Chỉ chấp nhận phương thức POST!"},
            status=405,
        )

    try:
        data = json.loads(request.body)

        source_code = data.get("source_code", "")
        language = data.get("language", "cpp")
        sample_input = data.get("sample_input", "")
        expected_output = data.get("expected_output", "")

        if not source_code:
            return JsonResponse(
                {"error": "Mã nguồn không được để trống!"},
                status=400,
            )

        res = JudgeService.run_sample_code(
            source_code=source_code,
            language=language,
            sample_input=sample_input,
            expected_output=expected_output,
            time_limit=2.0,
        )

        return JsonResponse(res)

    except json.JSONDecodeError:
        return JsonResponse(
            {"error": "Định dạng JSON không hợp lệ!"},
            status=400,
        )

    except Exception as e:
        return JsonResponse(
            {"error": str(e)},
            status=500,
        )


def submission_detail(request, submission_id):
    if request.method != "GET":
        return JsonResponse(
            {"error": "Chỉ chấp nhận phương thức GET!"},
            status=405,
        )

    try:
        submission = Submission.objects.get(id=submission_id)

        return JsonResponse({
            "id": submission.id,
            "problem_id": submission.problem.id,
            "language": submission.language,
            "status": submission.status,
            "score": submission.score,
            "max_score": submission.max_score,
            "passed_tests": submission.passed_tests,
            "total_tests": submission.total_tests,
            "execution_time": submission.execution_time,
            "memory_used": submission.memory_used,
            "test_results": submission.test_results,
            "subtasks": submission.subtasks_result,
            "logs": submission.logs,
            "created_at": submission.created_at,
        })

    except Submission.DoesNotExist:
        return JsonResponse(
            {"error": "Không tìm thấy bài nộp!"},
            status=404,
        )


def submission_list(request):
    if request.method != "GET":
        return JsonResponse(
            {"error": "Chỉ chấp nhận phương thức GET!"},
            status=405,
        )

    submissions = Submission.objects.all().order_by("-created_at")[:100]

    data = []

    for submission in submissions:
        data.append({
            "id": submission.id,
            "problem_id": submission.problem.id,
            "problem_title": submission.problem.title,
            "language": submission.language,
            "status": submission.status,
            "score": submission.score,
            "max_score": submission.max_score,
            "passed_tests": submission.passed_tests,
            "total_tests": submission.total_tests,
            "execution_time": submission.execution_time,
            "created_at": submission.created_at,
        })

    return JsonResponse(data, safe=False)


def judge_system_status(request):
    """
    GET: Kiểm tra các compiler/runtime hiện có trên máy chủ chấm bài (Real-time Status)
    """
    from .services import find_cpp_compiler, find_java_compiler, find_java_runtime, find_js_runtime, find_python_runtime

    cpp_path = find_cpp_compiler()
    javac_path = find_java_compiler()
    java_path = find_java_runtime(javac_path)
    node_path = find_js_runtime()
    python_path = find_python_runtime()

    return JsonResponse({
        "python": {
            "name": "Python 3",
            "available": bool(python_path),
            "path": python_path,
            "version": sys.version.split()[0],
        },
        "javascript": {
            "name": "JavaScript (Node.js)",
            "available": bool(node_path),
            "path": node_path,
        },
        "cpp": {
            "name": "C++ (g++ / MinGW)",
            "available": bool(cpp_path),
            "path": cpp_path,
        },
        "java": {
            "name": "Java (JDK javac / java)",
            "available": bool(javac_path and java_path),
            "javac_path": javac_path,
            "java_path": java_path,
        },
    })