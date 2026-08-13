import { StrictMode, lazy, Suspense } from "react";
import { createRoot } from "react-dom/client";
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

// Lazy Loaded Page Components (Code-Splitting)
const Home = lazy(() => import("~/pages/Home/Home"));
const About = lazy(() => import("~/pages/About/About"));
const Contact = lazy(() => import("~/pages/Contact/Contact"));
const Roadmap = lazy(() => import("~/pages/Roadmap/Roadmap"));
const Pricing = lazy(() => import("~/pages/Pricing/Pricing"));
const Badge = lazy(() => import("~/pages/Badge/Badge"));
const Leaderboard = lazy(() => import("~/pages/Leaderboard/Leaderboard"));
const Course = lazy(() => import("~/pages/Course/Course"));
const Problem = lazy(() => import("~/pages/Problem/Problem"));
const ProblemListSubpage = lazy(() => import("~/pages/Problem/subpages/ProblemList/ProblemList"));
const ProblemDetailSubpage = lazy(
  () => import("~/pages/Problem/subpages/ProblemDetail/ProblemDetail"),
);
const ProblemResultSubpage = lazy(
  () => import("~/pages/Problem/subpages/ProblemResult/ProblemResult"),
);
const Setting = lazy(() => import("~/pages/Setting/Setting"));
const DashBoard = lazy(() => import("~/pages/DashBoard/DashBoard"));
const Contest = lazy(() => import("~/pages/Contest/Contest"));
const ContestListSubpage = lazy(
  () => import("~/pages/Contest/subpages/ContestList/ContestList"),
);
const ContestDetailSubpage = lazy(
  () => import("~/pages/Contest/subpages/ContestDetail/ContestDetail"),
);
const ContestResultSubpage = lazy(
  () => import("~/pages/Contest/subpages/ContestResult/ContestResult"),
);
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
                <Route path="/problem" element={<Problem />} />
                <Route path="/problem/list" element={<ProblemListSubpage />} />
                <Route path="/problem/:id" element={<ProblemDetailSubpage />} />
                <Route path="/problem/:id/result" element={<ProblemResultSubpage />} />
                <Route path="/problem/result" element={<ProblemResultSubpage />} />
                <Route path="/contest" element={<Contest />} />
                <Route path="/contest/list" element={<ContestListSubpage />} />
                <Route path="/contest/detail" element={<ContestDetailSubpage />} />
                <Route path="/contest/result" element={<ContestResultSubpage />} />
                <Route path="/contest/:id/result" element={<ContestResultSubpage />} />
                <Route path="/contest/:id" element={<ContestDetailSubpage />} />
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
  </StrictMode>,
);
