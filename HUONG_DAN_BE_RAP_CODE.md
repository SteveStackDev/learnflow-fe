# 🔌 HƯỚNG DẪN DÀNH CHO BACKEND DEV: CÁCH RÁP CODE VÀO FRONTEND (FYSET)
> **Dành riêng cho team Backend**: Bạn **KHÔNG CẦN** mở hay sửa bất kỳ file `.jsx`, component hay CSS nào của Frontend. Tất cả mọi thứ đã được module hóa tại thư mục `src/services/`.

---

## ⚡ 1. Khởi Chạy Nhanh & Kiểm Tra Kết Nối (30 Giây)

1. **Khởi động Backend (`FySet-be`)**:
   ```bash
   cd FySet-be
   npm run start
   # Server lắng nghe tại http://localhost:3000
   ```
2. **Khởi động Frontend (`FySet-fe`)**:
   ```bash
   cd FySet-fe
   npm run dev
   # Vite chạy tại http://localhost:5173
   ```
3. **Cơ chế hoạt động**:
   - Frontend đã có sẵn **Vite Proxy** trong `vite.config.js`.
   - Khi Frontend gọi `/api/v1/...`, Vite tự động chuyển tiếp sang `http://localhost:3000/api/v1/...`.
   - Cookie phiên `FySet` (`HttpOnly`) được trình duyệt lưu và tự động đính kèm qua `withCredentials: true`. Bạn không phải lo lắng về lỗi chặn CORS.

---

## 📂 2. Bạn Chỉ Cần Làm Việc Tại Đâu?

👉 **DUY NHẤT 1 THƯ MỤC**: [`src/services/`](file:///d:/Project/learnflow-fe/src/services/)

```
src/services/
├── api.js             # Axios client tập trung (đã cấu hình baseURL & Cookie)
├── authService.js     # [ĐÃ HOÀN THÀNH 100%] Gọi API Đăng nhập, Đăng ký, Đăng xuất
├── courseService.js   # [Khu vực ráp API Khóa học]
├── problemService.js  # [Khu vực ráp API Bài tập / Luyện code]
├── contestService.js  # [Khu vực ráp API Cuộc thi & Bảng xếp hạng]
└── chatService.js     # [Khu vực ráp API Chat & Socket.IO]
```

---

## 🔑 3. Trạng Thái & Cách Ráp Từng Module

### A. Module Xác Thực (Auth)
File phụ trách: [`src/services/authService.js`](file:///d:/Project/learnflow-fe/src/services/authService.js)

Giao diện `SignIn.jsx` và `SignUp.jsx` đã được đấu nối sẵn vào các endpoint:
- **Đăng nhập**: `POST /api/v1/auth/sign-in`
  - Body gửi lên:
    ```json
    {
      "email": "user@example.com", // hoặc "username": "van_a"
      "password": "Password123!",
      "confirmPassword": "Password123!" // Đã truyền kèm dự phòng
    }
    ```
  - Response mong đợi (200 OK):
    ```json
    {
      "message": "Đăng nhập thành công",
      "data": {
        "_id": "...",
        "username": "van_a",
        "email": "user@example.com",
        "role": "student"
      }
    }
    ```
- **Đăng ký**: `POST /api/v1/auth/sign-up`
  - Body gửi lên:
    ```json
    {
      "username": "van_a_99",
      "email": "user@example.com",
      "password": "Password123!",
      "confirmPassword": "Password123!"
    }
    ```
- **Đăng xuất**: `POST /api/v1/auth/sign-out`
- **Kiểm tra phiên**: `GET /api/v1/auth/`

> 💡 **LƯU Ý QUAN TRỌNG CHO BE**: Trong `src/modules/auth/auth.route.js` của Backend, hãy tách `validateSignIn` (chỉ kiểm tra `identifier` + `password`) thay vì dùng chung `validateAuth` (bắt buộc cả `confirmPassword`) để code chuẩn RESTful nhất.

---

### B. Module Khóa Học (Courses) — Cách Ráp Khi Viết Xong API
File phụ trách: `src/services/courseService.js`

1. **Backend viết route**:
   - `GET /api/v1/courses` (Hỗ trợ query: `page`, `limit`, `category`, `level`, `search`)
   - `GET /api/v1/courses/:slug` (Chi tiết khóa học & bài học)

2. **Cách ráp vào Frontend**:
   Backend dev mở file `src/services/courseService.js` và chỉ cần **đổi cờ `USE_MOCK = false`**:
   ```javascript
   import api from "./api";
   import { courseData } from "~/constants/mockCourse";

   // 👉 BƯỚC 1: Đổi thành false khi API Backend đã sẵn sàng:
   const USE_MOCK = false; 

   // 👉 BƯỚC 2: Kiểm tra adapter để các trường khớp với MongoDB:
   const adaptCourse = (course) => ({
     id: course._id || course.id,
     title: course.title,
     description: course.description,
     category: course.category,
     imageUrl: course.thumbnail, // Backend dùng thumbnail -> Frontend hiển thị imageUrl
     lessonsCount: `${course.stats?.lessons || 0} bài`,
     studentsCount: `${course.stats?.learners || 0}`,
     rating: course.stats?.rating || 5.0,
     level: course.level === "beginner" ? "Cơ bản" : course.level === "intermediate" ? "Trung cấp" : "Nâng cao",
     price: course.price,
     salePrice: course.salePrice,
   });

   export const courseService = {
     getCourses: async (params) => {
       if (USE_MOCK) return courseData.items;
       const res = await api.get("/courses", { params });
       return Array.isArray(res) ? res.map(adaptCourse) : (res.items || []).map(adaptCourse);
     },

     getCourseDetail: async (slug) => {
       if (USE_MOCK) return courseData.items[0];
       const res = await api.get(`/courses/${slug}`);
       return adaptCourse(res);
     },
   };
   ```

---

### C. Module Bài Tập (Problems) — Cách Ráp Khi Viết Xong API
File phụ trách: `src/services/problemService.js`

1. **Backend viết route**:
   - `GET /api/v1/problems`
   - `GET /api/v1/problems/:id` (hoặc `:slug`)
   - `POST /api/v1/submissions` (Nộp code chấm điểm)

2. **Quy tắc ánh xạ (Adapter)**:
   - Backend enum độ khó: `"easy"`, `"medium"`, `"hard"`.
   - Frontend hiển thị: `"Dễ"`, `"Trung bình"`, `"Khó"`.
   - `codeStubs`: `[{ language: "cpp", stubCode: "..." }]` -> map sang templates trong editor.

---

### D. Module Chat & WebSocket
File phụ trách: `src/services/chatService.js` & `src/services/socket.js`

- **Endpoint REST**:
  - `GET /api/v1/chat/conversation`: Lấy danh sách hội thoại.
  - `POST /api/v1/chat/message`: Gửi tin nhắn kèm file (gửi `multipart/form-data` với các field: `conversationId`, `content`, `attachments`).
- **Socket.IO Namespace**:
  - Client tự động kết nối vào: `http://localhost:3000/chat` với `withCredentials: true`.
  - Backend emit các event theo đúng tài liệu: `changeOnlineFriendsList`, `welcomeMessage`, `sendMessage`.

---

### E. Module Thảo Luận & Bình Luận (Comment / Discussions)
File phụ trách: `src/services/commentService.js`

- **Endpoints REST (Đã mount sẵn tại `/api/v1/comment`)**:
  - `GET /api/v1/comment/message?targetType=Problem&targetId=:id`: Lấy danh sách bình luận thảo luận theo bài tập, khóa học hoặc blog.
  - `POST /api/v1/comment/message`: Gửi bình luận mới (`{ targetType, targetId, content, parentId }`).
- **Cách bật API thật**: Mở `src/services/commentService.js` gạt cờ `const USE_MOCK = false;`.

---

### F. Module Người Dùng, Bạn Bè & Avatar Cloudinary (User & Friendship)
File phụ trách: `src/services/userService.js`

- **Endpoints REST**:
  - `GET /api/v1/user/friend`: Lấy danh sách bạn bè kèm trạng thái và thông tin cá nhân.
  - `POST /api/v1/user/friend/add`: Gửi lời mời kết bạn (`{ receiverId }`).
  - `POST /api/v1/user/friend/accept`: Phản hồi kết bạn (`{ receiverId, status: "accepted" | "declined" }`).
  - `POST /api/v1/user/avatar`: Đổi ảnh đại diện (Tải lên Cloudinary qua `multipart/form-data` với trường `image`).
- **Cách bật API thật**: Mở `src/services/userService.js` gạt cờ `const USE_MOCK = false;`.

---

### G. Module Lộ Trình Học Tập (Roadmaps)
File phụ trách: `src/services/roadmapService.js`

- **Endpoints REST**:
  - `GET /api/v1/roadmaps`: Lấy danh sách lộ trình.
  - `GET /api/v1/roadmaps/:slug`: Lấy chi tiết lộ trình kèm danh sách mốc (topics/milestones).
- **Cách bật API thật**: Mở `src/services/roadmapService.js` gạt cờ `const USE_MOCK = false;`.

---

### H. Module Cuộc Thi & Bảng Xếp Hạng (Contests & Leaderboard)
File phụ trách: `src/services/contestService.js`

- **Endpoints REST**:
  - `GET /api/v1/contests`: Lấy danh sách cuộc thi.
  - `GET /api/v1/contests/:id`: Lấy chi tiết cuộc thi.
  - `GET /api/v1/contests/:id/leaderboard`: Bảng xếp hạng của cuộc thi.
  - `GET /api/v1/leaderboard`: Bảng xếp hạng toàn cầu.
- **Cách bật API thật**: Mở `src/services/contestService.js` gạt cờ `const USE_MOCK = false;`.

---

### I. Module Danh Hiệu (Badges)
File phụ trách: `src/services/badgeService.js`

- **Endpoints REST**:
  - `GET /api/v1/badges`: Lấy danh sách toàn bộ huy hiệu danh hiệu.
  - `GET /api/v1/badges/my-badges`: Lấy danh hiệu của tài khoản hiện tại.
- **Cách bật API thật**: Mở `src/services/badgeService.js` gạt cờ `const USE_MOCK = false;`.

---

### J. Module Bài Viết & Blog Cộng Đồng (Blogs)
File phụ trách: `src/services/blogService.js`

- **Endpoints REST**:
  - `GET /api/v1/blogs`: Lấy danh sách bài viết.
  - `GET /api/v1/blogs/:slug`: Lấy chi tiết bài viết blog.
  - `POST /api/v1/blogs`: Đăng bài viết mới.
- **Cách bật API thật**: Mở `src/services/blogService.js` gạt cờ `const USE_MOCK = false;`.

---

### K. Module Kế Hoạch Cá Nhân (Todos)
File phụ trách: `src/services/todoService.js`

- **Endpoints REST**:
  - `GET /api/v1/todos`: Lấy danh sách todo.
  - `POST /api/v1/todos`: Tạo todo mới.
  - `PUT /api/v1/todos/:id`: Cập nhật trạng thái/tiêu đề todo.
  - `DELETE /api/v1/todos/:id`: Xóa todo.
- **Cách bật API thật**: Mở `src/services/todoService.js` gạt cờ `const USE_MOCK = false;`.

---

### L. Module Xác Thực Email & Quên Mật Khẩu (Automated Mailing & OTP)
File phụ trách Frontend: `src/services/authService.js`  
File phụ trách Backend: `learnflow-be/src/modules/user/user.controller.js`

- **Endpoints REST**:
  - `POST /api/v1/user/forgot-password`: Nhận `{ email }` -> Gửi email kèm mã OTP 6 số (lưu Redis 3 phút) và trả về `{ success: true, token }`.
  - `POST /api/v1/user/verify-otp`: Nhận `{ email, otp }` -> Kiểm tra mã OTP và trả về `{ success: true }`.
  - `POST /api/v1/user/change-password`: Nhận `{ email, password }` -> Cập nhật mật khẩu mới đã băm bcrypt.
  - `POST /api/v1/user/verify-email` hoặc `GET /api/v1/user/verify-email?token=...`: Kích hoạt tài khoản người dùng sau khi bấm link email.
- **Cách bật API thật**: Đã đấu nối trực tiếp vào `authService.js`. Khi Backend có biến môi trường Gmail SMTP và Redis thì hệ thống sẽ gửi email thật 100%.

---

## 🛡️ 4. Quy Chuẩn Xử Lý Lỗi (Error Handling)

Khi Backend ném ra lỗi qua class `ApiError`:
```javascript
// Backend:
throw new ApiError(StatusCodes.BAD_REQUEST, "Email này đã được sử dụng!", {
  email: "Email đã tồn tại trong hệ thống"
});
```

Frontend `api.js` đã được viết sẵn Interceptor để:
1. Tự động lấy chuỗi `"Email này đã được sử dụng!"` hiển thị lên thông báo Popup (Toast đỏ).
2. Tự động lấy object `{ email: "..." }` gán thẳng vào dưới ô input bị lỗi tương ứng trên form.
3. Backend dev **không cần viết code bắt lỗi gì thêm ở Frontend!**

---

## 🚀 5. Tóm Tắt Quy Trình Ráp Code (3 Bước)

| Bước | Người làm | Thao tác |
| :--- | :--- | :--- |
| **1. Viết API** | Backend Dev | Tạo Route + Controller trong `FySet-be` theo chuẩn `{ message, data }`. |
| **2. Bật kết nối** | Backend Dev | Mở file `src/services/<tên-module>Service.js` trong Frontend, đổi `USE_MOCK = false`. |
| **3. Test giao diện** | Cả 2 | Mở trình duyệt tại `http://localhost:5173` để xem API thật hoạt động trực tiếp trên UI. |
