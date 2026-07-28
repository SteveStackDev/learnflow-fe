import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

// Pages
import Home from "~/pages/Home/Home.html";
import About from "~/pages/About/About.html";
import Contact from "~/pages/Contact/Contact.html";
import Roadmap from "~/pages/Roadmap/Roadmap.html";
import Pricing from "~/pages/Pricing/Pricing.html";
import Badge from "~/pages/Badge/Badge.html";
import Leaderboard from "~/pages/Leaderboard/Leaderboard.html";
import Course from "~/pages/Course/Course.html";
import Problem from "~/pages/Problem/Problem.html";
import Contest from "~/pages/Contest/Contest.html";
import SignIn from "~/pages/SignIn/SignIn.html";
import SignUp from "~/pages/SignUp/SignUp.html";
import NotFound from "~/pages/NotFound/NotFound.html";

// Styles
import "~/styles/main.css";

// React Router
import { BrowserRouter, Routes, Route } from "react-router";

// Layouts
import MainLayout from "~/layouts/MainLayout";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
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
    </BrowserRouter>
  </StrictMode>,
);
