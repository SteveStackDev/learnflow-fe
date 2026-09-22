# 🍃 HƯỚNG DẪN TÍCH HỢP HỆ THỐNG CHẤM BÀI FYSET VỚI MONGODB (BACKEND GUIDE)

Tài liệu này dành cho **Đội ngũ Backend (BE)** để tích hợp hệ thống chấm bài **FySet Judge Engine** vào hệ sinh thái quản lý dữ liệu tập trung bằng **MongoDB**.

---

## 🏗️ 1. Mô Hình Kiến Trúc Khuyên Dùng (Microservice Architecture)

Trong các hệ thống thực tế (LeetCode, Codeforces, VNOI), hệ thống chấm bài luôn được tách thành một **Judge Worker / Service độc lập** chạy trong Docker để đảm bảo an toàn (Sandbox) và hiệu năng cao.

```mermaid
graph TD
    Client["⚛️ Frontend (React Vite)"] -->|1. Nộp code / Xem bài tập| MainBE["🚀 Main Backend (Node.js / Express / NestJS / Django)"]
    MainBE <-->|2. Lưu trữ dữ liệu tập trung| MongoDB[("🍃 MongoDB Database<br>(Atlas / Cloud / Local)")]
    MainBE -->|3. Gửi mã nguồn sang chấm| JudgeService["⚙️ FySet Judge Service (Docker)<br>http://localhost:8000"]
    JudgeService -->|4. Thực thi code trong Sandbox| Compilers["📦 C++17 | Java 17 | Python 3 | Node.js"]
    Compilers -->|5. Trả kết quả chấm (AC, WA, TLE...)| JudgeService
    JudgeService -->|6. Trả điểm số & chi tiết từng Test| MainBE
    MainBE -->|7. Lưu Submission vào MongoDB & trả về FE| Client
```

---

## 📊 2. Thiết Kế Schema MongoDB (Collections Design)

Dưới đây là cấu trúc các Collection chuẩn để lưu trữ bài tập, test case và lịch sử nộp bài trong MongoDB:

### 📁 Collection 1: `problems` (Tích hợp trọn gói Subtasks & Test Cases - Chuẩn Phương Án A)
```json
{
  "_id": "01",
  "title": "A + B Problem",
  "statement": "Cho hai số nguyên A và B. Hãy tính tổng của chúng.",
  "imageDescription": "",
  "inputDescription": "Một dòng duy nhất chứa hai số nguyên A và B cách nhau bởi dấu cách.",
  "outputDescription": "In ra một số nguyên duy nhất là tổng A + B.",
  "constraints": ["1 <= A, B <= 1000", "Thời gian chạy: <= 1.0s", "Bộ nhớ: <= 256MB"],
  "topic": "Basic Math / Array",
  "difficulty": "Easy",
  "points": 500,
  "status": "Active",
  "timeLimit": 1.0,
  "memoryLimit": 256,
  "examples": [
    {
      "id": 1,
      "title": "Ví dụ 1",
      "input": "2 3",
      "output": "5",
      "explanation": "2 + 3 = 5"
    }
  ],
  "subtasks": [
    {
      "id": 1,
      "name": "Subtask 1 (Nhỏ)",
      "points": 200,
      "constraints": "1 <= A, B <= 100",
      "testCases": [
        {
          "id": 1,
          "input": "2 3\n",
          "expected": "5\n",
          "points": 100,
          "isHidden": false
        },
        {
          "id": 2,
          "input": "10 20\n",
          "expected": "30\n",
          "points": 100,
          "isHidden": true
        }
      ]
    },
    {
      "id": 2,
      "name": "Subtask 2 (Lớn)",
      "points": 300,
      "constraints": "1 <= A, B <= 1000",
      "testCases": [
        {
          "id": 3,
          "input": "500 500\n",
          "expected": "1000\n",
          "points": 150,
          "isHidden": true
        },
        {
          "id": 4,
          "input": "999 1\n",
          "expected": "1000\n",
          "points": 150,
          "isHidden": true
        }
      ]
    }
  ],
  "createdAt": { "$date": "2026-09-06T10:00:00Z" },
  "updatedAt": { "$date": "2026-09-06T10:00:00Z" }
}
```

> **Ưu điểm của mô hình Phương Án A (Embedded Test Cases):**
> 1. **Bỏ hoàn toàn `slug` và `code`**: Sử dụng trực tiếp `_id: "01"` làm mã định danh duy nhất.
> 2. **Có trường `imageDescription`**: Đường dẫn URL hoặc chuỗi base64 ảnh minh họa cho các bài toán hình học / đồ thị.
> 3. **Nhúng trực tiếp `testCases` vào `subtasks`**: Khi truy vấn lấy bài tập để chấm, chỉ cần 1 query duy nhất là có đủ cả đề bài, luật subtask và test cases. Không cần tạo thêm bảng/collection `testcases` riêng!

---

### 📁 Collection 2: `submissions` (Lịch sử nộp bài & Kết quả chấm)
```json
{
  "_id": { "$oid": "66da91e102f9a12bc8000099" },
  "userId": { "$oid": "66da91e102f9a12bc8000055" },
  "problemId": "01",
  "sourceCode": "#include <iostream>\nusing namespace std;\nint main() { long long a, b; if (cin >> a >> b) cout << a + b; return 0; }",
  "language": "cpp",
  "status": "AC",
  "score": 500,
  "executionTime": 0.015,
  "memoryUsed": 18.4,
  "errorMessage": "",
  "subtaskResults": [
    {
      "subtaskId": 1,
      "name": "Subtask 1 (Nhỏ)",
      "pointsEarned": 200,
      "status": "AC",
      "testResults": [
        { "testId": 1, "status": "AC", "time": 0.012, "memory": 18.2 },
        { "testId": 2, "status": "AC", "time": 0.015, "memory": 18.4 }
      ]
    },
    {
      "subtaskId": 2,
      "name": "Subtask 2 (Lớn)",
      "pointsEarned": 300,
      "status": "AC",
      "testResults": [
        { "testId": 3, "status": "AC", "time": 0.014, "memory": 18.3 },
        { "testId": 4, "status": "AC", "time": 0.015, "memory": 18.4 }
      ]
    }
  ],
  "createdAt": { "$date": "2026-09-06T12:00:00Z" }
}
```

---

## 🔌 3. Cách Main Backend Gọi Sang Máy Chủ Chấm (Judge API)

Khi người dùng nhấn **"Nộp bài"**, Main Backend nhận request từ Frontend, lấy testcase từ MongoDB, sau đó bắn API sang máy chủ chấm bài `fy_judge_server`:

### 📥 Endpoint Nộp Bài:
* **URL:** `POST http://localhost:8000/api/judge/submit/`
* **Headers:** `Content-Type: application/json`

### 📤 Payload Gửi Đi (Body):
```json
{
  "problem_id": 1,
  "language": "cpp",
  "source_code": "#include <iostream>\nusing namespace std;\nint main() {\n    long long a, b;\n    if (cin >> a >> b) cout << (a + b) << \"\\n\";\n    return 0;\n}"
}
```

*(Hỗ trợ 4 mã ngôn ngữ: `"cpp"`, `"java"`, `"python"`, `"javascript"`)*.

### 📥 Phản Hồi Từ Judge Server (Response):
```json
{
  "id": 105,
  "problem_id": 1,
  "language": "cpp",
  "status": "AC",
  "score": 500,
  "execution_time": 0.015,
  "memory_used": 18.5,
  "error_message": "",
  "subtasks": [
    {
      "id": 1,
      "name": "Subtask 1",
      "earned_score": 500,
      "max_points": 500,
      "status": "AC",
      "test_cases": [
        { "test_id": 1, "status": "AC", "time": 0.012, "memory": 18.2 },
        { "test_id": 2, "status": "AC", "time": 0.015, "memory": 18.5 }
      ]
    }
  ]
}
```

---

## 🛠️ 4. Cách Kết Nối Trực Tiếp MongoDB Vào Django (Nếu muốn)

Nếu BE muốn chính máy chủ Django này đọc/ghi trực tiếp vào MongoDB (thay vì SQLite), thực hiện các bước sau:

### Bước 4.1: Cài đặt thư viện MongoDB trong `judgingsystem/requirements.txt`
```text
Django>=4.2,<5.0
djangorestframework>=3.14.0
django-cors-headers>=4.0.0
pymongo>=4.6.0
mongoengine>=0.28.2
python-dotenv>=1.0.0
```

### Bước 4.2: Thêm cấu hình kết nối trong `judgingsystem/config/settings.py`
```python
import os
import mongoengine

# Kết nối trực tiếp MongoDB Atlas / Local
MONGODB_URI = os.getenv(
    "MONGODB_URI", 
    "mongodb+srv://<username>:<password>@cluster0.mongodb.net/fyset_judge?retryWrites=true&w=majority"
)

mongoengine.connect(host=MONGODB_URI)
```

---

## 📋 5. Tóm Tắt Checklist Cho Đội Ngũ BE

| Mục | Chi tiết | Trạng thái |
| :--- | :--- | :---: |
| **Frontend** | Gọi qua API JSON, không phụ thuộc vào loại DB | ✅ Sẵn sàng |
| **Judge Engine** | Đã đóng gói trong Docker, có đủ C++, Java, Python, Node.js | ✅ Sẵn sàng |
| **MongoDB Schema** | 2 Collections: `problems` (nhúng trọn gói subtasks & testcases), `submissions` | 📝 Đã chuẩn hóa |
| **API Chấm bài** | `POST /api/judge/submit/` | ✅ Chạy 100% |
| **API Trạng thái** | `GET /api/judge/system-status/` | ✅ Chạy 100% |

---
*Tài liệu được khởi tạo và đồng bộ cho hệ thống FySet Online Judge.*
