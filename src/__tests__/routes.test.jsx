import React from "react";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router";
import { describe, it, expect } from "vitest";

// Import All 25 Pages & Subpages (Matching main.jsx routes)
import Home from "../pages/Home/Home";
import About from "../pages/About/About";
import Contact from "../pages/Contact/Contact";

import Roadmap from "../pages/Roadmap/Roadmap";
import RoadmapDetailSubpage from "../pages/Roadmap/subpages/RoadmapDetail/RoadmapDetail";

import Pricing from "../pages/Pricing/Pricing";
import PricingCheckoutSubpage from "../pages/Pricing/subpages/PricingCheckout/PricingCheckout";

import Badge from "../pages/Badge/Badge";
import BadgeDetailSubpage from "../pages/Badge/subpages/BadgeDetail/BadgeDetail";

import Leaderboard from "../pages/Leaderboard/Leaderboard";

import Course from "../pages/Course/Course";
import CourseDetailSubpage from "../pages/Course/subpages/CourseDetail/CourseDetail";

import Problem from "../pages/Problem/Problem";
import ProblemList from "../pages/ProblemList/ProblemList";
import ProblemDetail from "../pages/ProblemDetail/ProblemDetail";
import ProblemResult from "../pages/ProblemResult/ProblemResult";

import Contest from "../pages/Contest/Contest";
import ContestList from "../pages/ContestList/ContestList";
import ContestDetail from "../pages/ContestDetail/ContestDetail";
import ContestResult from "../pages/ContestResult/ContestResult";

import Setting from "../pages/Setting/Setting";
import DashBoard from "../pages/DashBoard/DashBoard";
import SignIn from "../pages/SignIn/SignIn";
import SignUp from "../pages/SignUp/SignUp";
import NotFound from "../pages/NotFound/NotFound";

// Helper wrapper for routing context
const renderWithRouter = (ui) => {
  return render(<BrowserRouter>{ui}</BrowserRouter>);
};

describe("FySet Full Page Routes Smoke Tests", () => {
  it("renders Home page without crashing", () => {
    renderWithRouter(<Home />);
    expect(screen.getAllByText(/FySet/i).length).toBeGreaterThan(0);
  });

  it("renders About page without crashing", () => {
    renderWithRouter(<About />);
    expect(screen.getAllByText(/FySet/i).length).toBeGreaterThan(0);
  });

  it("renders Contact page without crashing", () => {
    renderWithRouter(<Contact />);
    expect(screen.getAllByText(/Email/i).length).toBeGreaterThan(0);
  });

  it("renders Roadmap page without crashing", () => {
    renderWithRouter(<Roadmap />);
    expect(screen.getAllByText(/Giao diện/i).length).toBeGreaterThan(0);
  });

  it("renders RoadmapDetail subpage without crashing", () => {
    renderWithRouter(<RoadmapDetailSubpage />);
    expect(screen.getAllByText(/Lộ trình/i).length).toBeGreaterThan(0);
  });

  it("renders Pricing page without crashing", () => {
    renderWithRouter(<Pricing />);
    expect(screen.getAllByText(/Pro/i).length).toBeGreaterThan(0);
  });

  it("renders PricingCheckout subpage without crashing", () => {
    renderWithRouter(<PricingCheckoutSubpage />);
    expect(screen.getAllByText(/Thanh toán/i).length).toBeGreaterThan(0);
  });

  it("renders Badge page without crashing", () => {
    renderWithRouter(<Badge />);
    expect(screen.getAllByText(/Danh Hiệu/i).length).toBeGreaterThan(0);
  });

  it("renders BadgeDetail subpage without crashing", () => {
    renderWithRouter(<BadgeDetailSubpage />);
    expect(screen.getAllByText(/Streak/i).length).toBeGreaterThan(0);
  });

  it("renders Leaderboard page without crashing", () => {
    renderWithRouter(<Leaderboard />);
    expect(screen.getAllByText(/Top/i).length).toBeGreaterThan(0);
  });

  it("renders Course page without crashing", () => {
    renderWithRouter(<Course />);
    expect(screen.getAllByText(/Tất cả/i).length).toBeGreaterThan(0);
  });

  it("renders CourseDetail subpage without crashing", () => {
    renderWithRouter(<CourseDetailSubpage />);
    expect(screen.getAllByText(/Quay lại khóa học/i).length).toBeGreaterThan(0);
  });

  it("renders Problem page without crashing", () => {
    renderWithRouter(<Problem />);
    expect(screen.getAllByText(/Bài tập/i).length).toBeGreaterThan(0);
  });

  it("renders ProblemList subpage without crashing", () => {
    renderWithRouter(<ProblemList />);
    expect(screen.getAllByText(/Bài tập/i).length).toBeGreaterThan(0);
  });

  it("renders ProblemDetail subpage without crashing", () => {
    renderWithRouter(<ProblemDetail />);
    expect(screen.getAllByText(/Hai số tổng/i).length).toBeGreaterThan(0);
  });

  it("renders ProblemResult subpage without crashing", () => {
    renderWithRouter(<ProblemResult />);
    expect(screen.getAllByText(/Chấp nhận/i).length).toBeGreaterThan(0);
  });

  it("renders Contest page without crashing", () => {
    renderWithRouter(<Contest />);
    expect(screen.getAllByText(/Contest/i).length).toBeGreaterThan(0);
  });

  it("renders ContestList subpage without crashing", () => {
    renderWithRouter(<ContestList />);
    expect(screen.getAllByText(/Contest/i).length).toBeGreaterThan(0);
  });

  it("renders ContestDetail subpage without crashing", () => {
    renderWithRouter(<ContestDetail />);
    expect(screen.getAllByText(/Contest/i).length).toBeGreaterThan(0);
  });

  it("renders ContestResult subpage without crashing", () => {
    renderWithRouter(<ContestResult />);
    expect(screen.getAllByText(/Contest/i).length).toBeGreaterThan(0);
  });

  it("renders Setting page without crashing", () => {
    renderWithRouter(<Setting />);
    expect(screen.getAllByText(/Cài đặt/i).length).toBeGreaterThan(0);
  });

  it("renders DashBoard page without crashing", () => {
    renderWithRouter(<DashBoard />);
    expect(screen.getAllByText(/FySet/i).length).toBeGreaterThan(0);
  });

  it("renders SignIn page without crashing", () => {
    renderWithRouter(<SignIn />);
    expect(screen.getAllByText(/Roadmap/i).length).toBeGreaterThan(0);
  });

  it("renders SignUp page without crashing", () => {
    renderWithRouter(<SignUp />);
    expect(screen.getAllByText(/Bắt đầu hành trình/i).length).toBeGreaterThan(0);
  });

  it("renders NotFound page without crashing", () => {
    renderWithRouter(<NotFound />);
    expect(screen.getAllByText(/404/i).length).toBeGreaterThan(0);
  });
});
