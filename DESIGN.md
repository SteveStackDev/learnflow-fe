---
name: FySet Design System
colors:
  light:
    primary: "#0950c3"
    secondary: "#a9b7cb"
    accent: "#f59f0a"
    background: "#d6def0"
    surface-page: "#f9fbff"
    surface-card: "#ffffff"
    surface-subtle: "#f8fafc"
    text-primary: "#191b22"
    text-secondary: "#434653"
    text-muted: "#64748b"
    border: "rgba(169, 183, 203, 0.4)"
  dark:
    primary: "#3c83f6"
    secondary: "#344256"
    accent: "#f59f0a"
    accent-cyan: "#38bdf8"
    background: "#0f1729"
    surface-page: "#0b1120"
    surface-card: "#131c31"
    surface-subtle: "#1e293b"
    text-primary: "#ffffff"
    text-secondary: "#cbd5e1"
    text-muted: "#94a3b8"
    border: "rgba(255, 255, 255, 0.15)"
  gradients:
    primary: "linear-gradient(135deg, #0950c3 0%, #003a95 100%)"
    primary-cyan: "linear-gradient(135deg, #0950c3 0%, #0ea5e9 100%)"
    amber-gold: "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)"
    emerald-green: "linear-gradient(135deg, #22c55e 0%, #15803d 100%)"
    purple-violet: "linear-gradient(135deg, #8b5cf6 0%, #6d28d9 100%)"
    rose-coral: "linear-gradient(135deg, #f43f5e 0%, #be123c 100%)"
typography:
  fontFamily:
    main: "Be Vietnam Pro, Inter, Noto Sans, sans-serif"
    code: "JetBrains Mono, Fira Code, monospace"
    display: "Playfair Display, serif"
  fontSize:
    xs: 0.75rem
    sm: 0.875rem
    base: 1rem
    lg: 1.125rem
    xl: 1.25rem
    2xl: 1.5rem
    3xl: 1.875rem
    4xl: 2.25rem
    5xl: 3rem
spacing:
  scale: 8pt grid (0.25rem - 6rem)
motion:
  easing: cubic-bezier(0.4, 0, 0.2, 1)
  durations: 0.1s - 0.4s
---

## 🎨 Thương hiệu & Phong cách (Brand Identity & Style)

Hệ thống thiết kế FySet kết hợp hài hòa hai phong cách kiến trúc giao diện hiện đại: **Corporate Modern (Light Mode)** và **Cyberpunk Dark Navy / Neon Glow (Dark Mode)**.

Mục tiêu cảm xúc & định hướng trải nghiệm:

- 🛡️ **Tin cậy & Chuyên nghiệp:** Cấu trúc bố cục dựa trên hệ lưới 8pt grid chuẩn xác, hiển thị sắc nét thông tin khóa học và lộ trình.
- ⚡ **Hiện đại & Động lực:** Màu Neon Blue (`#3c83f6`), Cyan (`#38bdf8`) và Amber (`#f59f0a`) mang lại năng lượng công nghệ, thúc đẩy chuỗi streak và thành tựu học tập.
- 🧘 **Tập trung & Thoải mái:** Khoảng trắng thoáng đãng, hiệu ứng kính mờ Glassmorphic kết hợp các dải ánh sáng Orb Ambient Glow nhẹ nhàng ở chế độ tối giúp học viên không bị mỏi mắt khi học lâu.

---

## 🌓 Hệ thống Chủ đề Dual Theme (Light & Dark Mode)

FySet sử dụng cơ chế **Semantic HSL & Hex Design Tokens** tự động điều chỉnh theo thuộc tính `data-theme="light"` hoặc `data-theme="dark"` tại thẻ root `<html>`.

### 1. Bảng màu Light Mode (Light Elegance)

- **Background (`--theme-page-bg`):** `#f9fbff` - Nền xám xanh sáng thanh lịch, dịu mắt.
- **Card/Container (`--theme-card-bg`):** `#ffffff` - Nền trắng tinh khiết tạo phân cấp nổi bật.
- **Primary Accent (`--color-primary`):** `#0950c3` - Xanh dương đậm chuẩn doanh nghiệp.
- **Text Primary (`--theme-text-primary`):** `#191b22` - Tương phản cao cho nội dung bài đọc.
- **Text Secondary (`--theme-text-secondary`):** `#434653` - Phụ đề & nhãn thông tin.

### 2. Bảng màu Dark Mode (Cyberpunk Dark Navy)

- **Background (`--theme-page-bg`):** `#0b1120` - Xanh Navy đậm chiều sâu vũ trụ.
- **Card/Container (`--theme-card-bg`):** `#131c31` - Thẻ viền mờ với ánh kim loại phẳng.
- **Primary Electric (`--color-primary`):** `#3c83f6` - Xanh Neon rực rỡ.
- **Cyan Highlight (`--theme-text-cyan`):** `#38bdf8` - Điểm nhấn kỹ thuật số.
- **Accent Amber (`--color-accent`):** `#f59f0a` - Ngọn lửa streak & điểm số.
- **Border (`--theme-border`):** `rgba(255, 255, 255, 0.15)` - Đường nét mỏng tinh tế.

### 3. Hệ thống dải màu Chuyển sắc (Curated Gradients)

- `--gradient-primary`: `linear-gradient(135deg, #0950c3 0%, #003a95 100%)`
- `--gradient-primary-cyan`: `linear-gradient(135deg, #0950c3 0%, #0ea5e9 100%)`
- `--gradient-amber-gold`: `linear-gradient(135deg, #f59e0b 0%, #d97706 100%)`
- `--gradient-emerald-green`: `linear-gradient(135deg, #22c55e 0%, #15803d 100%)`
- `--gradient-purple-violet`: `linear-gradient(135deg, #8b5cf6 0%, #6d28d9 100%)`
- `--gradient-rose-coral`: `linear-gradient(135deg, #f43f5e 0%, #be123c 100%)`

---

## 🌌 Hiệu ứng Ánh sáng Ambient Glow (Multi-Orb Glow Distribution)

Trong chế độ tối (`data-theme="dark"`), ứng dụng kích hoạt hệ thống dải sáng mềm đa vị trí (Multi-Orb Ambient Lighting) chạy animation `orbGlowPulse` tuần hoàn:

1. **Top-Left Hero Orb (`__orb-1`):** `radial-gradient(circle at center, rgba(56, 189, 248, 0.32), transparent 75%)` với `blur(85px)`.
2. **Catalog Upper-Right Orb (`__orb-2`):** Tone tím violet `rgba(168, 85, 247, 0.28)` kết hợp Cyan `blur(95px)`.
3. **Middle-Left Orb (`__orb-3`):** Tone xanh dương deep navy `rgba(9, 80, 195, 0.3)`.
4. **Bottom FAQ / Footer Orb (`__orb-4`):** Tone tím huyền ảo `rgba(139, 92, 246, 0.28)`.

---

## 🔤 Hệ thống Phông chữ (Typography System)

Sử dụng 3 họ phông chữ chuyên biệt truy xuất qua CSS Variables:

- **Main UI & Text (`--font-family-main`):** `Be Vietnam Pro`, `Inter`, `Noto Sans`. Tối ưu đọc tiếng Việt & tiếng Anh trên màn hình kỹ thuật số.
- **Code & Monospace (`--font-family-code`):** `JetBrains Mono`, `Fira Code`. Dành cho mã nguồn, bài tập lập trình & terminal.
- **Display & Heading (`--font-family-display`):** `Playfair Display`. Dùng cho tiêu đề trang nhã hoặc điểm nhấn nổi bật.

### Thang kích thước chữ (Font Scale)

- `xs` (12px) | `sm` (14px) | `base` (16px) | `lg` (18px) | `xl` (20px) | `2xl` (24px) | `3xl` (30px) | `4xl` (36px) | `5xl` (48px)

---

## 📐 Bố cục & Hệ lưới Spacing (8pt Grid System)

- Sử dụng các token khoảng cách từ `--spacing-0` (0px) đến `--spacing-24` (96px).
- **Responsive Layout:**
  - **Desktop (>=1024px):** Container tối đa `1280px`, padding lề `32px` - `40px`.
  - **Tablet (768px - 1023px):** Padding lề `24px`, tự động chuyển grid 2-3 cột.
  - **Mobile (<768px):** Padding lề `16px`, chuyển toàn bộ layout về dạng 1 cột stacked linh hoạt.

---

## ✨ Chuyển động & Tương tác (Motion & Scroll Reveal)

- **Transition System:** `--transition-base` (`all 0.2s cubic-bezier(0.4, 0, 0.2, 1)`), `--transition-bounce` (`all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)`).
- **Scroll Reveal Hook (`useScrollReveal`):** Tự động áp dụng hiệu ứng xuất hiện cuộn mượt (Fade In Up / Scale In) khi phần tử đi vào viewport.
- **Micro-Interactions:** Hover hiệu ứng lift-up card (`transform: translateY(-4px)`), glow shadow viền khi hover button & input field focus state.

---

## 🧩 Thư viện Component Cốt lõi (Core Component Architecture)

### 1. Reusable UI Components (`src/components/ui/`)

- **Button:** Các biến thể `primary`, `secondary`, `outline`, `ghost` tích hợp ripple & glow effect.
- **Card:** Nền `--theme-card-bg`, viền mờ `--theme-border`, shadow `--theme-shadow` tương thích dual theme.
- **Badge:** Thiết kế pill-shaped phân loại cấp độ (Cơ bản, Pro, Hot, Streak) và danh hiệu.
- **FormField:** Wrapper nhập liệu có hỗ trợ icon, label, error hint và focus ring.
- **SectionHeader:** Tiêu đề mục tiêu chuẩn có badge nhỏ, tiêu đề chính & mô tả.

### 2. Feedback & Global State Components

- **Toast System (`ToastProvider` & `ToastContainer`):** Hiển thị thông báo Toast góc màn hình (Success, Error, Warning, Info) qua hook `useToast()`.
- **ThemeToggle:** Nút công tắc chuyển đổi Light / Dark Mode mượt mà với icon Mặt Trời / Mặt Trăng.
- **PageLoader:** Màn hình chờ tải trang Suspense hiệu ứng spinner neon.
- **ErrorBoundary:** Màn hình khôi phục lỗi ứng dụng thân thiện người dùng.
- **Icon Registry (`src/components/Icon/Icon.jsx`):** Thành phần render SVG Icon tập trung theo tên (`name`), đảm bảo tính nhất quán của bộ biểu tượng toàn hệ thống.

---

## 📝 Quy chuẩn Mã Nguồn CSS & PR Checklist (Coding Convention)

1. **Ưu tiên CSS Variables (Design Tokens)**:
   - Ưu tiên sử dụng các biến CSS Variables đã khai báo sẵn trong `src/styles/variables.css` (như `var(--color-primary)`, `var(--theme-card-bg)`, `var(--theme-text-primary)`, v.v.) thay vì gán cứng (hardcode) giá trị màu mã hex trong file CSS.
