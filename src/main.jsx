import { StrictMode, lazy, Suspense } from "react";
import { createRoot } from "react-dom/client";
// 🎯 CHỈ ĐỔI TỪ "react-router" THÀNH "react-router-dom" Ở DÒNG NÀY:
import { BrowserRouter, Routes, Route } from "react-router"; 

// Context & Toast
import { ToastProvider } from "~/context/ToastContext.jsx";
import { ThemeProvider } from "~/context/ThemeContext.jsx";
import ToastContainer from "~/components/Toast/ToastContainer.jsx";

// Styles
import "~/styles/variables.css";
import "~/styles/main.css";

// Layouts & Loaders
import MainLayout from "~/layouts/MainLayout";
import PageLoader from "~/components/PageLoader/PageLoader";

// Lazy Loaded Page Components (Flat Architecture)
const Home = lazy(() => import("~/pages/Home/Home"));
const About = lazy(() => import("~/pages/About/About"));
const Contact = lazy(() => import("~/pages/Contact/Contact"));
const Roadmap = lazy(() => import("~/pages/Roadmap/Roadmap"));
const Pricing = lazy(() => import("~/pages/Pricing/Pricing"));
const Badge = lazy(() => import("~/pages/Badge/Badge"));
const Leaderboard = lazy(() => import("~/pages/Leaderboard/Leaderboard"));
const Course = lazy(() => import("~/pages/Course/Course"));

// Problem Pages
const Problem = lazy(() => import("~/pages/Problem/Problem"));
const ProblemList = lazy(() => import("~/pages/ProblemList/ProblemList"));
const ProblemDetail = lazy(() => import("~/pages/ProblemDetail/ProblemDetail"));
const ProblemResult = lazy(() => import("~/pages/ProblemResult/ProblemResult"));

// Contest Pages
const Contest = lazy(() => import("~/pages/Contest/Contest"));
const ContestList = lazy(() => import("~/pages/ContestList/ContestList"));
const ContestDetail = lazy(() => import("~/pages/ContestDetail/ContestDetail"));
const ContestResult = lazy(() => import("~/pages/ContestResult/ContestResult"));

// General Pages
const Setting = lazy(() => import("~/pages/Setting/Setting"));
const DashBoard = lazy(() => import("~/pages/DashBoard/DashBoard"));
const SignIn = lazy(() => import("~/pages/SignIn/SignIn"));
const SignUp = lazy(() => import("~/pages/SignUp/SignUp"));
const NotFound = lazy(() => import("~/pages/NotFound/NotFound"));

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider>
      <ToastProvider>
        <BrowserRouter>
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route element={<MainLayout />}>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/roadmap" element={<Roadmap />} />
                <Route path="/pricing" element={<Pricing />} />
                <Route path="/badge" element={<Badge />} />
                <Route path="/leaderboard" element={<Leaderboard />} />
                <Route path="/course" element={<Course />} />

                {/* Problem Routes */}
                <Route path="/problem" element={<Problem />} />
                <Route path="/problem/list" element={<ProblemList />} />
                <Route path="/problem/:id" element={<ProblemDetail />} />
                <Route path="/problem/:id/result" element={<ProblemResult />} />
                <Route path="/problem/result" element={<ProblemResult />} />

                {/* Contest Routes */}
                <Route path="/contest" element={<Contest />} />
                <Route path="/contest/list" element={<ContestList />} />
                <Route path="/contest/detail" element={<ContestDetail />} />
                <Route path="/contest/result" element={<ContestResult />} />
                <Route path="/contest/:id/result" element={<ContestResult />} />
                <Route path="/contest/:id" element={<ContestDetail />} />

                <Route path="/setting" element={<Setting />} />
                <Route path="/dashboard" element={<DashBoard />} />
                <Route path="*" element={<NotFound />} />
              </Route>
              <Route path="/signin" element={<SignIn />} />
              <Route path="/signup" element={<SignUp />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
        <ToastContainer />
      </ToastProvider>
    </ThemeProvider>
  </StrictMode>
);