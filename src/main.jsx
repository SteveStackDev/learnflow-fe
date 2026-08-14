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
const RoadmapDetailSubpage = lazy(
  () => import("~/pages/Roadmap/subpages/RoadmapDetail/RoadmapDetail"),
);
const Pricing = lazy(() => import("~/pages/Pricing/Pricing"));
const PricingCheckoutSubpage = lazy(
  () => import("~/pages/Pricing/subpages/PricingCheckout/PricingCheckout"),
);
const Badge = lazy(() => import("~/pages/Badge/Badge"));
const BadgeDetailSubpage = lazy(
  () => import("~/pages/Badge/subpages/BadgeDetail/BadgeDetail"),
);
const Leaderboard = lazy(() => import("~/pages/Leaderboard/Leaderboard"));
const Course = lazy(() => import("~/pages/Course/Course"));
const CourseDetailSubpage = lazy(
  () => import("~/pages/Course/subpages/CourseDetail/CourseDetail"),
);
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

// Background preloader for primary routes when browser is idle
if (typeof window !== "undefined") {
  const preloadPrimaryRoutes = () => {
    import("~/pages/Course/Course");
    import("~/pages/Problem/Problem");
    import("~/pages/Contest/Contest");
    import("~/pages/Badge/Badge");
    import("~/pages/Roadmap/Roadmap");
    import("~/pages/Leaderboard/Leaderboard");
    import("~/pages/Pricing/Pricing");
  };

  if ("requestIdleCallback" in window) {
    window.requestIdleCallback(preloadPrimaryRoutes, { timeout: 1500 });
  } else {
    setTimeout(preloadPrimaryRoutes, 1000);
  }
}

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
                <Route path="/roadmap/detail" element={<RoadmapDetailSubpage />} />
                <Route path="/roadmap/:id" element={<RoadmapDetailSubpage />} />
                <Route path="/pricing" element={<Pricing />} />
                <Route path="/pricing/checkout" element={<PricingCheckoutSubpage />} />
                <Route path="/checkout" element={<PricingCheckoutSubpage />} />
                <Route path="/badge" element={<Badge />} />
                <Route path="/badge/detail" element={<BadgeDetailSubpage />} />
                <Route path="/badge/:id" element={<BadgeDetailSubpage />} />
                <Route path="/leaderboard" element={<Leaderboard />} />
                <Route path="/course" element={<Course />} />

                {/* Problem Routes */}
                <Route path="/course/detail" element={<CourseDetailSubpage />} />
                <Route path="/course/:id" element={<CourseDetailSubpage />} />
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