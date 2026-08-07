import { StrictMode, lazy, Suspense } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";

// Context & Toast
import { ToastProvider } from "~/context/ToastContext.jsx";
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
const Contest = lazy(() => import("~/pages/Contest/Contest"));
const SignIn = lazy(() => import("~/pages/SignIn/SignIn"));
const SignUp = lazy(() => import("~/pages/SignUp/SignUp"));
const NotFound = lazy(() => import("~/pages/NotFound/NotFound"));

createRoot(document.getElementById("root")).render(
  <StrictMode>
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
              <Route path="/contest" element={<Contest />} />
              <Route path="*" element={<NotFound />} />
            </Route>
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
      <ToastContainer />
    </ToastProvider>
  </StrictMode>,
);
