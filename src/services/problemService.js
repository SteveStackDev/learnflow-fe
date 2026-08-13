// src/services/problemService.js
import * as mockProblemsData from "~/constants";

// Lấy toàn bộ mock data liên quan tới Problem
export const getProblemData = async () => {
  await new Promise((resolve) => setTimeout(resolve, 200));
  return mockProblemsData;
};