/**
 * FySet Problem Result Mock Data
 */

export const defaultSubtasksData = [
  {
    id: "sub-1",
    label: "Sub 1 (30 Điểm)",
    title: "Subtask 1: Ràng buộc nhỏ (N ≤ 1,000)",
    maxScore: 30,
    earnedScore: 30,
    status: "AC",
    maxTime: "14 ms",
    maxMemory: "1.8 MB",
    tests: [
      { id: "1", label: "Test 1", status: "AC", score: 10, maxScore: 10, runtime: "4 ms", memory: "1.2 MB" },
      { id: "2", label: "Test 2", status: "AC", score: 10, maxScore: 10, runtime: "6 ms", memory: "1.5 MB" },
      { id: "3", label: "Test 3", status: "AC", score: 10, maxScore: 10, runtime: "14 ms", memory: "1.8 MB" },
    ],
  },
  {
    id: "sub-2",
    label: "Sub 2 (30 Điểm)",
    title: "Subtask 2: Ràng buộc vừa (N ≤ 50,000)",
    maxScore: 30,
    earnedScore: 30,
    status: "AC",
    maxTime: "28 ms",
    maxMemory: "6.2 MB",
    tests: [
      { id: "4", label: "Test 4", status: "AC", score: 10, maxScore: 10, runtime: "18 ms", memory: "4.1 MB" },
      { id: "5", label: "Test 5", status: "AC", score: 10, maxScore: 10, runtime: "22 ms", memory: "5.3 MB" },
      { id: "6", label: "Test 6", status: "AC", score: 10, maxScore: 10, runtime: "28 ms", memory: "6.2 MB" },
    ],
  },
  {
    id: "sub-3",
    label: "Sub 3 (40 Điểm)",
    title: "Subtask 3: Ràng buộc tối đa (N ≤ 10^6)",
    maxScore: 40,
    earnedScore: 40,
    status: "AC",
    maxTime: "36 ms",
    maxMemory: "16.4 MB",
    tests: [
      { id: "7", label: "Test 7", status: "AC", score: 10, maxScore: 10, runtime: "30 ms", memory: "12.1 MB" },
      { id: "8", label: "Test 8", status: "AC", score: 15, maxScore: 15, runtime: "34 ms", memory: "14.8 MB" },
      { id: "9", label: "Test 9", status: "AC", score: 15, maxScore: 15, runtime: "36 ms", memory: "16.4 MB" },
    ],
  },
];

export const problemResultData = {
  id: "1",
  problemTitle: "1. Two Sum (Hai số tổng)",
  difficulty: "Easy",
  difficultyLabel: "Dễ",
  language: "C++20 (GCC 13.2)",
  submittedAt: "12:35 PM - Hôm nay",
  submittedCode: `#include <iostream>
#include <vector>
#include <unordered_map>

using namespace std;

class Solution {
public:
    vector<int> twoSum(vector<int>& nums, int target) {
        unordered_map<int, int> num_map;
        for (int i = 0; i < nums.size(); ++i) {
            int complement = target - nums[i];
            if (num_map.find(complement) != num_map.end()) {
                return {num_map[complement], i};
            }
            num_map[nums[i]] = i;
        }
        return {};
    }
};`,
  status: "Accepted",
  statusCode: "AC",
  totalScore: 100,
  maxPossibleScore: 100,
  runtime: "36 ms",
  runtimePercentile: "Nhanh hơn 94.2% bài nộp C++20",
  memory: "16.4 MB",
  memoryPercentile: "Tiết kiệm bộ nhớ hơn 88.5% C++20",
  passedTestCases: 9,
  totalTestCases: 9,
  subtasks: defaultSubtasksData,
};
