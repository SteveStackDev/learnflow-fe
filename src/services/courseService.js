import api from "./api";
import { courseData } from "~/constants/mockCourse";

const USE_MOCK = false;

// Adapter dành riêng cho Course đơn thuần
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
    rating: stats.rating || 5.0,
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

// Adapter dành riêng cho UserCourse (khóa học của người dùng)
export const adaptUserCourse = (item) => {
  if (!item) return null;
  
  // Nếu BE populate courseId
  const courseDetail = item.courseId ? adaptCourse(item.courseId) : {};

  return {
    id: item._id?.toString() || item.id,
    progression: item.progression || 0,
    lastAccessedLessonId: item.lastAccessedLessonId,
    completedAt: item.completedAt,
    // Giữ nguyên object courseId đã adapter chuẩn hóa để UI dùng
    courseId: {
      ...courseDetail,
      _id: courseDetail.id || item.courseId?._id,
    },
    // Map thêm shortcut properties nếu UI gọi trực tiếp
    instructor: courseDetail.instructor || "FySet Mentor",
    lessonsCount: courseDetail.lessonsCount || 0,
  };
};

export const courseService = {
  getAllCourses: async () => {
    if (USE_MOCK) return courseData?.items || [];

    try {
      const response = await api.get("/course/all");
      const data = response?.data || response;
      const list = Array.isArray(data) ? data : data?.data || [];
      return list.map(adaptCourse);
    } catch (error) {
      console.warn("⚠️ [courseService] Dùng mock courses dự phòng:", error.message);
      return courseData?.items || [];
    }
  },

  getUserCourses: async () => {
    if (USE_MOCK) return courseData?.items || [];

    try {
      const response = await api.get("/course/user");
      // Bóc tách data linh hoạt cho Axios instance
      const rawData = response?.data || response;
      const list = Array.isArray(rawData) ? rawData : rawData?.data || [];
      
      return list.map(adaptUserCourse);
    } catch (error) {
      console.warn("⚠️ [courseService] Dùng mock user courses dự phòng:", error.message);
      return courseData?.items || [];
    }
  },

  getCourse: async (id) => {
    if (USE_MOCK) return courseData?.items || [];

    try {
      const response = await api.get(`/course/${id}`);
      const data = response?.data?.data || response?.data || response;
      return adaptCourse(data);
    } catch (error) {
      console.warn("⚠️ [courseService] Dùng mock course dự phòng:", error.message);
      return courseData?.items || [];
    }
  },

  getCurriculum: async (courseId) => {
    if (USE_MOCK) return courseData?.items || [];

    try {
      const response = await api.get(`/course/curriculum/${courseId}`);
      return response?.data?.data || response?.data || response;
    } catch (error) {
      console.warn("⚠️ [courseService] Dùng mock curriculum dự phòng:", error.message);
      return courseData?.items || [];
    }
  },

  getUserProgression: async (courseId) => {
    try {
      const response = await api.get("/user/course/progression/" + courseId);
      return response?.data?.data || response?.data || response;
    } catch (error) {
      console.error("Lỗi khi getUserProgression:", error);
      return { progression: 0, curriculum: [], lastAccessedLessonId: null };
    }
  },

  saveCourse: async (courseId) => {
    try {
      const response = await api.post("/user/course/save", { courseId });
      return response?.data || response;
    } catch (error) {
      console.error("Lỗi khi saveCourse:", error);
      throw error;
    }
  },

  updateProgression: async (lessonId) => {
    try {
      const response = await api.post("/user/course/update-progression", { lessonId });
      return response?.data || response;
    } catch (error) {
      console.error("Lỗi khi updateProgression:", error);
      throw error;
    }
  },

  saveCourseNote: async ({ courseId, lessonId, note }) => {
    const response = await api.post("/user/course/note/save", { courseId, lessonId, note });
    return response?.data || response;
  },

  deleteCourseNote: async ({ courseId, lessonId, note }) => {
    const response = await api.post("/user/course/note/delete", { courseId, lessonId, note });
    return response?.data || response;
  },
};

export default courseService;