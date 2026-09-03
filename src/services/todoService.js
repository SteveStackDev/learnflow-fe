import api from "./api";

const USE_MOCK = true;

const initialMockTodos = [
  {
    id: "todo-1",
    taskName: "Hoàn thành 3 bài tập Quy hoạch động",
    description: "Luyện bài Knapsack và Longest Increasing Subsequence",
    priority: "high",
    isCompleted: false,
    dueDate: new Date(Date.now() + 86400000).toISOString(),
  },
  {
    id: "todo-2",
    taskName: "Xem hết Module 4 Khóa học ReactJS",
    description: "Học kỹ về React Hooks và Custom Hooks",
    priority: "medium",
    isCompleted: true,
    dueDate: new Date().toISOString(),
  },
];

export const todoService = {
  /**
   * Lấy danh sách việc cần làm cá nhân
   */
  getTodos: async () => {
    if (USE_MOCK) {
      return initialMockTodos;
    }

    try {
      const data = await api.get("/todos");
      return data;
    } catch (error) {
      console.warn("⚠️ [todoService] Dùng mock todos dự phòng:", error.message);
      return initialMockTodos;
    }
  },

  /**
   * Tạo việc cần làm mới (POST /api/v1/todos)
   */
  createTodo: async ({ taskName, description = "", priority = "medium", dueDate }) => {
    if (USE_MOCK) {
      return {
        id: `todo-${Date.now()}`,
        taskName,
        description,
        priority,
        isCompleted: false,
        dueDate: dueDate || new Date().toISOString(),
      };
    }

    return await api.post("/todos", {
      taskName,
      description,
      priority,
      dueDate,
    });
  },

  /**
   * Cập nhật trạng thái hoặc nội dung todo (PUT /api/v1/todos/:id)
   */
  updateTodo: async (id, updateData) => {
    if (USE_MOCK) {
      return { id, ...updateData };
    }

    return await api.put(`/todos/${id}`, updateData);
  },

  /**
   * Xóa một todo (DELETE /api/v1/todos/:id)
   */
  deleteTodo: async (id) => {
    if (USE_MOCK) {
      return { success: true, id };
    }

    return await api.delete(`/todos/${id}`);
  },
};

export default todoService;
