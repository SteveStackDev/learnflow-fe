import api from "./api";
import { courseData } from "~/constants/mockCourse";

const USE_MOCK = false;

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
    lessonsCount: stats.lessons,
    studentsCount: stats.learners,
    rating: stats.rating,
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

export const courseService = {
  getAllCourses: async () => {
    if (USE_MOCK) {
      return courseData?.items || [];
    }

    try {
      const data = await api.get("/course/all");

      return data.map(adaptCourse);
    } catch (error) {
      console.warn("⚠️ [courseService] Dùng mock courses dự phòng:", error.message);
      return courseData?.items || [];
    }
  },

  getCourse: async (id) => {
    if (USE_MOCK) {
      return courseData?.items || [];
    }

    try {
      const data = await api.get(`/course/${id}`);

      return adaptCourse(data);
    } catch (error) {
      console.warn("⚠️ [courseService] Dùng mock courses dự phòng:", error.message);
      return courseData?.items || [];
    }
  },

  getCurriculum: async (courseId) => {
    if (USE_MOCK) {
      return courseData?.items || [];
    }

    try {
      const data = await api.get(`/course/curriculum/${courseId}`);

      return data;
    } catch (error) {
      console.warn("⚠️ [courseService] Dùng mock courses dự phòng:", error.message);
      return courseData?.items || [];
    }
  },
};

export default courseService;
