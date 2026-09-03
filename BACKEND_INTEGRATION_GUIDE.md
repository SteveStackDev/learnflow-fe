# 📘 HƯỚNG DẪN KẾT NỐI FRONTEND (`FySet-fe`) & BACKEND (`FySet-be`)
> **Mục tiêu**: Giúp đội ngũ phát triển (Frontend & Backend) tích hợp API và WebSocket một cách nhanh chóng, chuẩn hóa, "ráp code theo dạng plug-and-play" mà không làm vỡ giao diện UI hiện có.

---

## 📌 I. TỔNG QUAN KIẾN TRÚC KẾT NỐI

```
+-----------------------------------+              +-----------------------------------+
|      FySet Frontend (Vite)        |              |       FySet Backend (Express 5)   |
|      http://localhost:5173        |              |       http://localhost:3000       |
|                                   |              |                                   |
|  - UI Pages & Components          |              |  - RESTful APIs (/api/v1/*)       |
|  - Service Layer (Adapter)        |  HTTP Proxy  |  - Session Cookie (Redis Store)   |
|  - AuthContext & WebSocket Client | <=========>  |  - Socket.IO Server (/chat)       |
+-----------------------------------+  credentials |  - MongoDB (Mongoose Models)      |
                                        include    +-----------------------------------+
```

### 3 Nguyên Tắc Bắt Buộc:
1. **Xác thực Cookie Session**: Backend sử dụng `express-session` lưu cookie tên là `FySet` (`httpOnly: true`). Mọi request từ Frontend **BẮT BUỘC** phải có `withCredentials: true`.
2. **Chuẩn Dữ Liệu Phản Hồi**:
   - Thành công: `{ message: "...", data: { ... } }` (dữ liệu chính luôn nằm trong trường `data`).
   - Lỗi: `{ message: "...", errors: { field: "chi tiết lỗi" } }`.
3. **WebSocket Namespace**: Socket.IO phục vụ chat và thông báo kết nối tại namespace: `http://localhost:3000/chat`.

---

## ⚠️ II. CÁC ĐIỂM CẦN BỔ SUNG & ĐIỀU CHỈNH Ở PHÍA BACKEND (`FySet-be`)

### 1. Sửa Lỗi Logic Validate Ở Route Đăng Nhập (`POST /api/v1/auth/sign-in`)
- **Vấn đề**: Trong `src/modules/auth/auth.route.js`, route `POST /sign-in` đang gắn `validateAuth`. Middleware này bắt buộc phải gửi cả `username`, `email`, `password`, `confirmPassword`. Khi người dùng đăng nhập chỉ có `email` và `password` sẽ bị lỗi `400 Bad Request`.
- **Giải pháp**: Tách thành 2 middleware trong `auth.middleware.js`:
  - `validateSignIn`: Chỉ kiểm tra `identifier` (email hoặc username) và `password`.
  - `validateSignUp`: Giữ nguyên kiểm tra đầy đủ cả 4 trường.

### 2. Viết Tiếp Các Route & Controller Cho Các Module Nghiệp Vụ Chính
Backend đã có sẵn Model Mongoose trong `src/models/`, cần viết thêm Route & Controller cho:
- **`modules/course/`**:
  - `GET /api/v1/courses`: Lấy danh sách (phân trang, lọc theo `category`, `level`, `search`).
  - `GET /api/v1/courses/:slug`: Lấy chi tiết khóa học và danh sách bài học (`Lesson`).
- **`modules/problem/`**:
  - `GET /api/v1/problems`: Lấy danh sách bài tập (lọc theo `difficulty`, `topics`, tìm kiếm).
  - `GET /api/v1/problems/:id` (hoặc `:slug`): Lấy chi tiết đề bài, sample testcases, code stubs mẫu.
- **`modules/contest/`**:
  - `GET /api/v1/contests`: Danh sách cuộc thi đang diễn ra / sắp tới.
  - `GET /api/v1/contests/:id`: Chi tiết cuộc thi, bài tập và bảng xếp hạng live (`ContestLeaderboard`).
- **`modules/submission/`**:
  - `POST /api/v1/submissions`: Nhận bài làm của thí sinh, gửi sang máy chấm code và trả về kết quả.
  - `GET /api/v1/submissions`: Lấy lịch sử nộp bài của người dùng.

---

## 🛠️ III. CÁC BƯỚC TỐI ƯU & RÁP CODE Ở PHÍA FRONTEND (`FySet-fe`)

Để phía Backend dev khi ráp API vào Frontend chỉ cần **copy-paste endpoint vào file service mà không cần đụng tới code JSX**, chúng ta triển khai 5 bước sau:

### Bước 1: Cấu hình Vite Proxy (`vite.config.js`)
Tránh 100% vấn đề chặn CORS và tự động gửi cookie phiên:
```javascript
// vite.config.js
export default defineConfig({
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        secure: false,
      },
      '/socket.io': {
        target: 'http://localhost:3000',
        ws: true,
      },
    },
  },
  // ...
});
```

---

### Bước 2: Tạo Axios Client Tập Trung (`src/services/api.js`)
Tự động gửi Cookie và tự unwrap `response.data.data` sạch cho Frontend:
```javascript
// src/services/api.js
import axios from "axios";

export const api = axios.create({
  baseURL: "/api/v1", // Đi qua Vite Proxy
  withCredentials: true, // Tự động gửi Cookie Session
  headers: {
    "Content-Type": "application/json",
  },
});

// Response Interceptor: unwrap dữ liệu và chuẩn hóa lỗi
api.interceptors.response.use(
  (response) => {
    // Trả về data payload từ backend ({ message, data } -> data)
    return response.data?.data !== undefined ? response.data.data : response.data;
  },
  (error) => {
    const errorResponse = error.response?.data;
    const message = errorResponse?.message || "Đã xảy ra lỗi, vui lòng thử lại!";
    return Promise.reject({
      message,
      errors: errorResponse?.errors || null,
      status: error.response?.status,
    });
  }
);

export default api;
```

---

### Bước 3: Thiết Lập Service Layer & Adapter Pattern Có Cờ `USE_MOCK`
Tạo các file trong `src/services/` (ví dụ `authService.js`, `courseService.js`, `problemService.js`, `chatService.js`).

**Mẫu Service Adapter Chuẩn (`src/services/courseService.js`)**:
```javascript
import api from "./api";
import { courseData } from "~/constants/mockCourse";

// CỜ CHUYỂN ĐỔI: Đổi thành false khi Backend hoàn thành API
const USE_MOCK = true;

// Bộ chuyển đổi dữ liệu (Adapter): Map trường MongoDB sang UI
const adaptCourse = (course) => {
  if (!course) return null;
  return {
    id: course._id || course.id,
    title: course.title,
    description: course.description,
    category: course.category,
    imageUrl: course.thumbnail || course.imageUrl,
    lessonsCount: course.stats?.lessons ? `${course.stats.lessons} bài` : course.lessonsCount,
    studentsCount: course.stats?.learners ? `${course.stats.learners}` : course.studentsCount,
    rating: course.stats?.rating || course.rating || 5.0,
    level: course.level === "beginner" ? "Cơ bản" : course.level === "intermediate" ? "Trung cấp" : "Nâng cao",
    price: course.price,
    salePrice: course.salePrice,
  };
};

export const courseService = {
  // Lấy danh sách khóa học
  getCourses: async (params = {}) => {
    if (USE_MOCK) {
      return courseData.items;
    }
    const data = await api.get("/courses", { params });
    return Array.isArray(data) ? data.map(adaptCourse) : (data?.items || []).map(adaptCourse);
  },

  // Lấy chi tiết khóa học
  getCourseDetail: async (slugOrId) => {
    if (USE_MOCK) {
      return courseData.items.find((c) => c.id === slugOrId) || courseData.items[0];
    }
    const data = await api.get(`/courses/${slugOrId}`);
    return adaptCourse(data);
  },
};
```

---

### Bước 4: Đồng Bộ Quản Lý Đăng Nhập Với `AuthContext.jsx`
Tạo Context để đồng bộ phiên đăng nhập giữa Cookie của Backend và giao diện Frontend:
```javascript
// src/context/AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from "react";
import { api } from "~/services/api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Kiểm tra phiên đăng nhập hiện tại khi mở web
  const checkAuth = async () => {
    try {
      const userData = await api.get("/auth/");
      setUser(userData);
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const login = async (credentials) => {
    const data = await api.post("/auth/sign-in", credentials);
    setUser(data);
    return data;
  };

  const logout = async () => {
    await api.post("/auth/sign-out");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: Boolean(user), loading, login, logout, checkAuth }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
```

---

### Bước 5: Cấu Hình WebSocket Cho Chat (`src/services/socket.js`)
```javascript
// src/services/socket.js
import { io } from "socket.io-client";

let socket = null;

export const getSocket = () => {
  if (!socket) {
    socket = io("/chat", {
      withCredentials: true,
      transports: ["websocket", "polling"],
    });

    socket.on("connect", () => {
      console.log("⚡ Kết nối WebSocket FySet thành công:", socket.id);
    });

    socket.on("connect_error", (err) => {
      console.warn("⚠️ WebSocket kết nối thất bại (chưa đăng nhập):", err.message);
    });
  }
  return socket;
};

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};
```

---

## 📊 IV. BẢN ĐỒ ÁNH XẠ DỮ LIỆU (DATA MAPPING TABLE)

| Đối tượng | Trường MongoDB (`Backend`) | Trường Hiển Thị (`Frontend`) | Xử lý Adapter |
| :--- | :--- | :--- | :--- |
| **Định danh chung** | `_id` (ObjectId) | `id` (String) | `id: item._id?.toString() \|\| item.id` |
| **Khóa học (Course)** | `thumbnail` | `imageUrl` | `imageUrl: course.thumbnail` |
| | `level`: `"beginner" \| "intermediate" \| "advanced"` | `level`: `"Cơ bản" \| "Trung cấp" \| "Nâng cao"` | Convert enum tiếng Anh -> tiếng Việt |
| | `stats.learners`, `stats.lessons` | `studentsCount`, `lessonsCount` | Định dạng `"2.5k"`, `"12 bài"` |
| **Bài tập (Problem)** | `difficulty`: `"easy" \| "medium" \| "hard"` | `level`: `"Dễ" \| "Trung bình" \| "Khó"` | Convert enum tiếng Anh -> tiếng Việt |
| | `codeStubs`: `[{ language, stubCode }]` | `languages`: `[{ id, label, template }]` | Map `stubCode` -> `template` |
| | `sampleTestcases`: `[{ input, output }]` | `testCases`: `[{ input, output }]` | Giữ nguyên cấu trúc mảng |
| **Người dùng (User)** | `avatar.url` | `avatar` | Lấy `user.avatar?.url \|\| defaultAvatar` |
| | `dailyStreak`, `experiencePoints` | `dailyStreak`, `points` | Đồng bộ hiển thị huy hiệu & rank |
| **Tin nhắn (Message)** | `senderId` (ObjectId) | `sender`: `"me" \| "other"` | So sánh `senderId === currentUser._id` |

---

## 🚀 V. LỘ TRÌNH RÁP CODE (INTEGRATION ROADMAP)

- [ ] **Giai đoạn 1**: Cấu hình `vite.config.js` Proxy + Khởi tạo `src/services/api.js`.
- [ ] **Giai đoạn 2**: Đấu nối Module **Xác thực (Auth)** (`SignIn`, `SignUp`, `AuthContext`) vì Backend đã hoàn chỉnh 100%.
- [ ] **Giai đoạn 3**: Đấu nối Module **Trò chuyện (Chat)** với Socket.IO namespace `/chat`.
- [ ] **Giai đoạn 4**: Tạo sẵn các Service Adapter (`courseService.js`, `problemService.js`, `contestService.js`) với cờ `USE_MOCK = true`.
- [ ] **Giai đoạn 5**: Khi Backend hoàn thành các API còn thiếu (`courses`, `problems`, `contests`), Backend dev chỉ cần vào file Service tương ứng gạt cờ `USE_MOCK = false` là hệ thống chạy hoàn chỉnh.
