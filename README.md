# 🚀 LearnFlow Frontend (`learnflow-fe`)

> Nền tảng học lập trình tương tác & định hướng nghề nghiệp công nghệ hàng đầu dành cho lập trình viên.

![LearnFlow Banner](/src/assets/images/Home/hero.webp)

---

## 📖 Tổng quan dự án (Project Overview)

**LearnFlow** là ứng dụng Web học tập trực tuyến được xây dựng bằng **React 19**, **Vite 8**, **React Router 8** và **CSS Modules** theo phong cách thiết kế **Corporate Modern (Light Mode)** và **Cyberpunk Dark Navy / Neon Glow (Dark Mode)**.

Dự án ứng dụng các công nghệ tiên tiến như **React Compiler** (`babel-plugin-react-compiler`), **Code-Splitting** với `React.lazy` & `Suspense`, hệ thống **Global Toast Context** và bộ biến giao diện linh hoạt **Semantic HSL & Hex Design Tokens**. Nền tảng hỗ trợ học viên tiếp thu kiến thức lập trình từ cơ bản đến nâng cao thông qua lộ trình cá nhân hóa, bài tập thực chiến, kỳ thi trực tuyến và hệ thống danh hiệu (Badges) tạo động lực.

---

## ✨ Tính năng chính (Core Features)

- 🏠 **Trang Chủ (Home)**: Banner tương tác, các mốc thống kê ấn tượng, tính năng nổi bật & đội ngũ phát triển.
- 📚 **Khóa Học (Courses)**: Danh sách khóa học phân loại theo cấp độ (Cơ bản, Trung cấp, Nâng cao), bộ lọc danh mục & tìm kiếm bài học.
- 🗺️ **Lộ Trình Học (Roadmap)**: Lộ trình nghề nghiệp bài bản (Frontend, Backend, Fullstack, Data Science) với thiết kế thẻ tương tác.
- 💻 **Thử Thách Bài Tập (Problems)**: Hệ thống bài tập thuật toán phân loại theo độ khó (Dễ, Trung bình, Khó) & tỉ lệ hoàn thành.
- 🏆 **Cuộc Thi (Contests)**: Đấu trường lập trình trực tiếp, thời gian thực và đăng ký thi đấu.
- 🥇 **Bảng Xếp Hạng (Leaderboard)**: Top học viên xuất sắc nhất tuần, tháng, tất cả thời gian & xu hướng thăng hạng.
- 🎖️ **Hệ Thống Danh Hiệu (Badges)**: Bộ sưu tập chứng nhận kỹ năng, streak và huy hiệu thành tựu.
- 💎 **Bảng Giá (Pricing)**: So sánh chi tiết các gói tài khoản (Miễn phí, Pro, Doanh nghiệp).
- ℹ️ **Giới Thiệu (About)** & 📞 **Liên Hệ (Contact)**: Câu chuyện thương hiệu, sứ mệnh, carousel hình ảnh & các kênh hỗ trợ chuyên biệt.
- 🔐 **Xác Thực (Auth)**: Trang Đăng nhập (SignIn) & Đăng ký (SignUp) thiết kế tối ưu trải nghiệm người dùng.
- 🌗 **Chủ Đề Dual Theme (Light / Dark Mode)**: Chuyển đổi giao diện sáng/tối mượt mà dựa trên bộ biến **Semantic Design Tokens** & hiệu ứng dải sáng **Multi-Orb Ambient Glow**.
- 🔔 **Hệ Thống Thông Báo Global Toast**: Cung cấp phản hồi tương tác tức thì (Success, Error, Warning, Info) toàn ứng dụng qua React Context.
- ✨ **Hiệu Ứng Cuộn Trang (Scroll Reveal)**: Tự động kích hoạt animation Fade In/Up khi người dùng cuộn đến các phần tử.

---

## 🛠️ Công nghệ sử dụng (Tech Stack)

| Công nghệ                 | Phiên bản | Vai trò                                   |
| :------------------------ | :-------- | :---------------------------------------- |
| **React**                 | `^19.2.6` | Thư viện UI cốt lõi & React Compiler      |
| **Vite**                  | `^8.0.12` | Build Tool & Dev Server tốc độ cao        |
| **React Router**          | `^8.0.1`  | Điều hướng SPA client-side                |
| **CSS Modules**           | Standard  | Style độc lập, scoped theo từng component |
| **Vitest**                | `^3.0.7`  | Framework kiểm thử tự động                |
| **React Testing Library** | `^16.3.0` | Thư viện test UI component & routes       |
| **Babel React Compiler**  | `^1.0.0`  | Tự động memoize component & tối ưu render |
| **Prettier & ESLint**     | Latest    | Thống nhất quy chuẩn mã nguồn & định dạng |

---

## 📁 Cấu trúc thư mục (Directory Structure)

```text
learnflow-fe/
├── src/
│   ├── assets/              # Hình ảnh, icon tĩnh và media webp
│   ├── components/          # Component tái sử dụng toàn ứng dụng
│   │   ├── Alert/           # Thông báo Banner Alert
│   │   ├── EmptyState/      # Giao diện hiển thị trạng thái rỗng
│   │   ├── ErrorBoundary/   # Màn hình bắt lỗi ứng dụng
│   │   ├── Footer/          # Chân trang & liên kết điều hướng
│   │   ├── Header/          # Thanh điều hướng chính & Dark Mode Toggle
│   │   ├── Icon/            # Icon Registry Component tập trung (Data-Driven UI)
│   │   ├── PageLoader/      # Spinner hiệu ứng tải trang Suspense
│   │   ├── ThemeToggle/     # Nút công tắc Light/Dark mode
│   │   ├── Toast/           # Toast Notification Container & Item UI
│   │   └── ui/              # Bộ thư viện UI Atomic (Button, Card, Badge, FormField, SectionHeader)
│   ├── context/             # React Context toàn cục (ToastContext.jsx)
│   ├── hooks/               # Custom React Hooks (useScrollReveal.js)
│   ├── layouts/             # Khung bố cục chung (MainLayout.jsx)
│   ├── pages/               # Thư mục các trang Modular (JSX, CSS Module, Data)
│   │   ├── About/           # Trang Giới thiệu
│   │   ├── Badge/           # Trang Danh hiệu & Thành tựu
│   │   ├── Contact/         # Trang Liên hệ
│   │   ├── Contest/         # Trang Cuộc thi lập trình
│   │   ├── Course/          # Trang Danh sách & Chi tiết khóa học
│   │   ├── Home/            # Trang Chủ
│   │   ├── Leaderboard/     # Trang Bảng xếp hạng
│   │   ├── NotFound/        # Trang Lỗi 404
│   │   ├── Pricing/         # Trang Bảng giá gói dịch vụ
│   │   ├── Problem/         # Trang Thử thách bài tập
│   │   ├── Roadmap/         # Trang Lộ trình nghề nghiệp
│   │   ├── SignIn/          # Trang Đăng nhập
│   │   └── SignUp/          # Trang Đăng ký
│   ├── styles/              # Token thiết kế toàn hệ thống
│   │   ├── main.css         # Reset & global styles
│   │   └── variables.css    # HSL Design Tokens, Multi-Orb Ambient Glow & Themes
│   ├── __tests__/           # Bộ test tự động (Vitest Route Smoke Tests & Setup)
│   └── main.jsx             # Entry point ứng dụng (Lazy Loading & Context Providers)
├── DESIGN.md                # Hệ thống thiết kế & Quy chuẩn UI/UX
├── package.json
├── vite.config.js
└── README.md
```

---

## 🚀 Hướng dẫn chạy dự án (Getting Started)

### Yêu cầu môi trường

- **Node.js**: `>= 18.0.0`
- **npm**: `>= 9.0.0`

### 1. Cài đặt dependency

```bash
npm install
```

### 2. Chạy môi trường phát triển (Development Server)

```bash
npm run dev
```

Ứng dụng sẽ chạy tại địa chỉ: `http://localhost:5173`

### 3. Chạy kiểm thử tự động (Automated Testing)

```bash
# Chạy toàn bộ test suite một lần
npm run test

# Chạy test ở chế độ theo dõi (Watch Mode)
npm run test:watch
```

### 4. Đóng gói ứng dụng (Production Build)

```bash
npm run build
```

Sản phẩm đóng gói sẽ nằm trong thư mục `dist/`. Xem thử bản build bằng command:

```bash
npm run preview
```

### 5. Kiểm tra định dạng code (Lint & Format)

```bash
npm run lint
npm run format
```

---

## 🎨 Quy ước mã nguồn & Kiến trúc (Code Guidelines)

1. **Modular Page Architecture**:
   - Mỗi trang bao gồm các file độc lập: `<Page>.jsx` (Giao diện & Logic), `<Page>.module.css` (Kiểu dáng scoped), và `data.js` (Dữ liệu tĩnh / Mock API).
2. **Path Alias (`~`)**:
   - Sử dụng tiền tố `~` đại diện cho thư mục `src/` (ví dụ: `import Button from "~/components/ui/Button/Button"`).
3. **Data-Driven UI**:
   - Tất cả các danh sách render bằng `.map()` bắt buộc sử dụng định danh duy nhất `key={obj.id}`.
   - Icon được render bằng `<Icon name={obj.iconName} />` truy xuất từ Registry tập trung.
4. **Semantic CSS Tokens**:
   - Sử dụng biến `var(--theme-page-bg)`, `var(--theme-card-bg)`, `var(--theme-text-primary)` từ `src/styles/variables.css` thay vì gán cứng mã màu Hex.
5. **Lazy Loading & Code-Splitting**:
   - Trang được tải lười (Lazy Load) qua `React.lazy()` và `Suspense` kết hợp `PageLoader` để tối ưu thời gian tải trang ban đầu.

---

## 📄 Giấy phép (License)

Dự án được phát triển bởi **LearnFlow Team**. Bảo lưu mọi bản quyền.
