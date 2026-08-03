# 🚀 LearnFlow Frontend (`learnflow-fe`)

> Nền tảng học lập trình tương tác & định hướng nghề nghiệp công nghệ hàng đầu dành cho lập trình viên.

![LearnFlow Banner](/src/assets/images/Home/hero.webp)

---

## 📖 Tổng quan dự án (Project Overview)

**LearnFlow** là ứng dụng Web học tập trực tuyến được xây dựng bằng **React 19**, **Vite**, **React Router 7** và **CSS Modules** theo phong cách thiết kế **Cyberpunk Dark Navy / Neon Glow**. Nền tảng hỗ trợ học viên tiếp thu kiến thức lập trình từ cơ bản đến nâng cao thông qua lộ trình cá nhân hóa, bài tập thực chiến, kỳ thi trực tuyến và hệ thống danh hiệu (Badges) tạo động lực.

---

## ✨ Tính năng chính (Core Features)

- 🏠 **Trang Chủ (Home)**: Banner tương tác, các mốc thống kê, tính năng nổi bật & đội ngũ phát triển.
- 📚 **Khóa Học (Courses)**: Danh sách khóa học phân loại theo cấp độ (Cơ bản, Trung cấp, Nâng cao), bộ lọc danh mục & tìm kiếm.
- 🗺️ **Lộ Trình Học (Roadmap)**: Lộ trình nghề nghiệp bài bản (Frontend, Backend, Fullstack, Data Science) với thiết kế thẻ tương tác.
- 💻 **Thử Thách Bài Tập (Problems)**: Hệ thống bài tập thuật toán phân loại theo độ khó (Dễ, Trung bình, Khó) & tỉ lệ hoàn thành.
- 🏆 **Cuộc Thi (Contests)**: Đấu trường lập trình trực tiếp, thời gian thực và đăng ký thi đấu.
- 🥇 **Bảng Xếp Hạng (Leaderboard)**: Top học viên xuất sắc nhất tuần, tháng, tất cả thời gian & xu hướng thăng hạng.
- 🎖️ **Hệ Thống Danh Hiệu (Badges)**: Bộ sưu tập chứng nhận kỹ năng, streak và huy hiệu thành tựu.
- 💎 **Bảng Giá (Pricing)**: So sánh chi tiết các gói tài khoản (Miễn phí, Pro, Doanh nghiệp).
- ℹ️ **Giới Thiệu (About)** & 📞 **Liên Hệ (Contact)**: Câu chuyện thương hiệu, sứ mệnh, carousel hình ảnh & các kênh hỗ trợ chuyên biệt.
- 🔐 **Xác Thực (Auth)**: Trang Đăng nhập (SignIn) & Đăng ký (SignUp) tối ưu trải nghiệm người dùng.
- 🌗 **Chủ Đề Linh Hoạt (Light / Dark Mode)**: Chuyển đổi giao diện sáng/tối mượt mà dựa trên bộ biến **Semantic HSL Design Tokens**.

---

## 🛠️ Công nghệ sử dụng (Tech Stack)

| Công nghệ | Phiên bản | Vai trò |
| :--- | :--- | :--- |
| **React** | `19.2.6` | Thư viện UI cốt lõi |
| **Vite** | `8.0.12` | Build Tool & Dev Server tốc độ cao |
| **React Router** | `8.0.1` | Điều hướng SPA client-side |
| **CSS Modules** | Standard | Kiểu dáng độc lậpscoped theo từng component |
| **Vitest** | Latest | Framework kiểm thử tự động tốc độ cao |
| **React Testing Library** | Latest | Thư viện test UI component & routes |
| **Prettier & ESLint** | Latest | Thống nhất quy chuẩn mã nguồn |

---

## 📁 Cấu trúc thư mục (Directory Structure)

```text
learnflow-fe/
├── src/
│   ├── assets/              # Hình ảnh, icon tĩnh và media webp
│   ├── components/          # Component tái sử dụng toàn ứng dụng
│   │   ├── Header/          # Thanh điều hướng chính & Dark Mode Toggle
│   │   ├── Footer/          # Chân trang & liên kết điều hướng
│   │   └── Icon/            # Icon Registry Component tập trung (Data-Driven UI)
│   ├── layouts/             # Khung bố cục chung (MainLayout)
│   ├── pages/               # Thư mục trang Modular
│   │   ├── Home/            # Home.jsx, Home.module.css, data.js
│   │   ├── Course/          # Course.jsx, Course.module.css, data.js
│   │   ├── Roadmap/         # Roadmap.jsx, Roadmap.module.css, data.js
│   │   ├── Problem/         # Problem.jsx, Problem.module.css, data.js
│   │   ├── Leaderboard/     # Leaderboard.jsx, Leaderboard.module.css, data.js
│   │   ├── Contest/         # Contest.jsx, Contest.module.css, data.js
│   │   ├── Badge/           # Badge.jsx, Badge.module.css, data.js
│   │   ├── Pricing/         # Pricing.jsx, Pricing.module.css, data.js
│   │   ├── About/           # About.jsx, About.module.css, data.js
│   │   ├── Contact/         # Contact.jsx, Contact.module.css, data.js
│   │   ├── SignIn/          # SignIn.jsx, SignIn.module.css, data.js
│   │   ├── SignUp/          # SignUp.jsx, SignUp.module.css, data.js
│   │   └── NotFound/        # NotFound.jsx, NotFound.module.css
│   ├── styles/              # Token thiết kế toàn hệ thống
│   │   ├── main.css         # Reset & global styles
│   │   └── variables.css    # HSL Design Tokens & Dark/Light mode theme
│   ├── __tests__/           # Bộ test tự động (Vitest Route Smoke Tests)
│   └── main.jsx             # Entry point ứng dụng
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
Sản phẩm đóng gói sẽ nằm trong thư mục `dist/`.

### 5. Kiểm tra định dạng code (Lint & Format)
```bash
npm run lint
npm run format
```

---

## 🎨 Quy ước mã nguồn & Kiến trúc (Code Guidelines)

1. **Modular Page Architecture**:
   - Mỗi trang bao gồm 3 file độc lập: `<Page>.jsx` (Giao diện & Logic), `<Page>.module.css` (Kiểu dáng scoped), và `data.js` (Dữ liệu tĩnh / Mock API).
2. **Data-Driven UI**:
   - Tất cả các danh sách render bằng `.map()` bắt buộc sử dụng định danh duy nhất `key={obj.id}`.
   - Icon được render bằng `<Icon name={obj.iconName} />` truy xuất từ Registry tập trung.
3. **Semantic CSS Tokens**:
   - Sử dụng biến `var(--theme-page-bg)`, `var(--theme-card-bg)`, `var(--theme-text-primary)` từ `src/styles/variables.css` thay vì gán cứng mã màu Hex.

---

## 📄 Giấy phép (License)

Dự án được phát triển bởi **LearnFlow Team**. Bảo lưu mọi bản quyền.
