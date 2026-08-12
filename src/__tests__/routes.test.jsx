import React from "react";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router";
import { describe, it, expect } from "vitest";

// Import Pages
import Home from "../pages/Home/Home";
import Course from "../pages/Course/Course";
import Roadmap from "../pages/Roadmap/Roadmap";
import Problem from "../pages/Problem/Problem";
import ProblemListSubpage from "../pages/Problem/subpages/ProblemList/ProblemList";
import ProblemDetailSubpage from "../pages/Problem/subpages/ProblemDetail/ProblemDetail";
import ProblemResultSubpage from "../pages/Problem/subpages/ProblemResult/ProblemResult";
import Leaderboard from "../pages/Leaderboard/Leaderboard";
import Contest from "../pages/Contest/Contest";
import Badge from "../pages/Badge/Badge";
import Pricing from "../pages/Pricing/Pricing";
import About from "../pages/About/About";
import Contact from "../pages/Contact/Contact";
import Setting from "../pages/Setting/Setting";
import SignIn from "../pages/SignIn/SignIn";
import SignUp from "../pages/SignUp/SignUp";
import NotFound from "../pages/NotFound/NotFound";

// Helper wrapper for routing context
const renderWithRouter = (ui) => {
  return render(<BrowserRouter>{ui}</BrowserRouter>);
};

describe("FySet Page Routes Smoke Tests", () => {
  it("renders Home page without crashing", () => {
    renderWithRouter(<Home />);
    expect(screen.getAllByText(/FySet/i).length).toBeGreaterThan(0);
  });

  it("renders Course page without crashing", () => {
    renderWithRouter(<Course />);
    expect(screen.getAllByText(/Tất cả/i).length).toBeGreaterThan(0);
  });

  it("renders Roadmap page without crashing", () => {
    renderWithRouter(<Roadmap />);
    expect(screen.getAllByText(/Giao diện & Trải nghiệm/i).length).toBeGreaterThan(0);
  });

  it("renders Problem page without crashing", () => {
    renderWithRouter(<Problem />);
    expect(screen.getAllByText(/Bài tập/i).length).toBeGreaterThan(0);
  });

  it("renders ProblemList subpage without crashing", () => {
    renderWithRouter(<ProblemListSubpage />);
    expect(screen.getAllByText(/Thư viện Bài tập/i).length).toBeGreaterThan(0);
  });

  it("renders ProblemDetail subpage without crashing", () => {
    renderWithRouter(<ProblemDetailSubpage />);
    expect(screen.getAllByText(/Hai số tổng/i).length).toBeGreaterThan(0);
  });

  it("renders ProblemResult subpage without crashing", () => {
    renderWithRouter(<ProblemResultSubpage />);
    expect(screen.getAllByText(/Chấp nhận/i).length).toBeGreaterThan(0);
  });

  it("renders Leaderboard page without crashing", () => {
    renderWithRouter(<Leaderboard />);
    expect(screen.getAllByText(/Top/i).length).toBeGreaterThan(0);
  });

  it("renders Contest page without crashing", () => {
    renderWithRouter(<Contest />);
    expect(screen.getAllByText(/Contest/i).length).toBeGreaterThan(0);
  });

  it("renders Badge page without crashing", () => {
    renderWithRouter(<Badge />);
    expect(screen.getAllByText(/Danh Hiệu/i).length).toBeGreaterThan(0);
  });

  it("renders Pricing page without crashing", () => {
    renderWithRouter(<Pricing />);
    expect(screen.getAllByText(/Pro/i).length).toBeGreaterThan(0);
  });

  it("renders About page without crashing", () => {
    renderWithRouter(<About />);
    expect(screen.getAllByText(/FySet là gì/i).length).toBeGreaterThan(0);
  });

  it("renders Contact page without crashing", () => {
    renderWithRouter(<Contact />);
    expect(screen.getAllByText(/Email/i).length).toBeGreaterThan(0);
  });

  it("renders SignIn page without crashing", () => {
    renderWithRouter(<SignIn />);
    expect(screen.getAllByText(/Roadmap/i).length).toBeGreaterThan(0);
  });

  it("renders SignUp page without crashing", () => {
    renderWithRouter(<SignUp />);
    expect(screen.getAllByText(/Bắt đầu hành trình/i).length).toBeGreaterThan(0);
  });

  it("renders Setting page without crashing", () => {
    renderWithRouter(<Setting />);
    expect(screen.getAllByText(/Cài đặt/i).length).toBeGreaterThan(0);
  });

  it("renders NotFound page without crashing", () => {
    renderWithRouter(<NotFound />);
    expect(screen.getAllByText(/404/i).length).toBeGreaterThan(0);
  });
});
