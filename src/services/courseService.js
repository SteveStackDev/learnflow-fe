import api from "./api";

export const adaptCourse = (course) => {
  if (!course) return null;
  const stats = course.stats || {};
  return {
    ...course,
    id: course._id?.toString() || course.id,
    slug: course.slug,
    title: course.title,
    description: course.description,
    category: course.category,
    imageUrl: course.thumbnail,
    lessonsCount: stats.lessons || 0,
    studentsCount: stats.learners || 0,
    rating: stats.rating || 0,
    price: course.price,
    salePrice: course.salePrice,
    level:
      course.level === "beginner"
        ? "Cơ bản"
        : course.level === "intermediate"
          ? "Trung cấp"
          : "Nâng cao",
    instructor: course.instructorId?.name || "FySet Mentor",
  };
};

export const adaptUserCourse = (item) => {
  if (!item) return null;
  const courseDetail = item.courseId ? adaptCourse(item.courseId) : {};

  return {
    id: item._id?.toString() || item.id,
    progression: item.progression || 0,
    lastAccessedLessonId: item.lastAccessedLessonId,
    completedAt: item.completedAt,
    courseId: {
      ...courseDetail,
      _id: courseDetail.id || item.courseId?._id,
    },
    instructor: courseDetail.instructor || "FySet Mentor",
    lessonsCount: courseDetail.lessonsCount || 0,
  };
};

export const courseService = {
  getAllCourses: async () => {
    try {
      const response = await api.get("/course/all");
      const rawData = response?.data || response;
      const list = Array.isArray(rawData) ? rawData : (rawData?.data || []);
      return list.map(adaptCourse);
    } catch (error) {
      console.error("Lỗi khi tải danh sách khóa học:", error);
      return [];
    }
  },

  getUserCourses: async () => {
    try {
      const response = await api.get("/course/user");
      const rawData = response?.data || response;
      const list = Array.isArray(rawData) ? rawData : (rawData?.data || []);
      return list.map(adaptUserCourse);
    } catch (error) {
      console.error("Lỗi khi tải khóa học người dùng:", error);
      return [];
    }
  },

  getCourse: async (id) => {
    try {
      const response = await api.get(`/course/${id}`);
      const rawData = response?.data || response;
      const data = rawData?.data || rawData;
      return adaptCourse(data);
    } catch (error) {
      console.error(`Lỗi khi tải khóa học #${id}:`, error);
      return null;
    }
  },

  getCurriculum: async (courseId) => {
    try {
      const response = await api.get(`/course/curriculum/${courseId}`);
      const rawData = response?.data || response;
      return rawData?.data || rawData || [];
    } catch (error) {
      console.error(`Lỗi khi tải curriculum #${courseId}:`, error);
      return [];
    }
  },

  getUserProgression: async (courseId) => {
    try {
      const response = await api.get("/user/course/progression/" + courseId);
      const rawData = response?.data || response;
      return rawData?.data || rawData || { progression: 0, curriculum: [], lastAccessedLessonId: null };
    } catch (error) {
      console.error("Lỗi khi getUserProgression:", error);
      return { progression: 0, curriculum: [], lastAccessedLessonId: null };
    }
  },

  saveCourse: async (courseId) => {
    const response = await api.post("/user/course/save", { courseId });
    return response?.data || response;
  },

  updateProgression: async (lessonId) => {
    const response = await api.post("/user/course/update-progression", { lessonId });
    return response?.data || response;
  },

  saveCourseNote: async ({ courseId, lessonId, note }) => {
    const response = await api.post("/user/course/note/save", { courseId, lessonId, note });
    return response?.data || response;
  },

  deleteCourseNote: async ({ courseId, lessonId, note }) => {
    const response = await api.post("/user/course/note/delete", { courseId, lessonId, note });
    return response?.data || response;
  },

  createCourse: async (data) => {
    try {
      const response = await api.post("/course", data);
      return response?.data || response;
    } catch (error) {
      console.error("Lỗi khi tạo khóa học:", error);
      throw error;
    }
  },

  deleteCourse: async (id) => {
    try {
      const response = await api.delete(`/course/${id}`);
      return response?.data || response;
    } catch (error) {
      console.error(`Lỗi khi xóa khóa học #${id}:`, error);
      throw error;
    }
  },
};

export default courseService;