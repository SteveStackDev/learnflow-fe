import api from "./api";
import { courseData } from "~/constants/mockCourse";
import { mockCourseDetailData as courseDetailData } from "~/constants/mockCourseDetail";

const USE_MOCK = true;

// Adapter chuẩn hóa dữ liệu khóa học từ MongoDB sang UI
export const adaptCourse = (course) => {
  if (!course) return null;

  const stats = course.stats || {};
  return {
    id: course._id?.toString() || course.id,
    slug: course.slug,
    title: course.title,
    description: course.description,
    category: course.category,
    imageUrl:
      course.thumbnail ||
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&auto=format&fit=crop&q=80",
    lessonsCount: `${stats.lessons || 12} bài`,
    studentsCount: `${stats.learners || 150}`,
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
    raw: course,
  };
};

export const courseService = {
  /**
   * Lấy danh sách khóa học
   */
  getCourses: async (params = {}) => {
    if (USE_MOCK) {
      return courseData?.items || [];
    }

    try {
      const data = await api.get("/courses", { params });
      if (Array.isArray(data)) {
        return data.map(adaptCourse);
      }
      if (Array.isArray(data?.items)) {
        return data.items.map(adaptCourse);
      }
      return courseData?.items || [];
    } catch (error) {
      console.warn("⚠️ [courseService] Dùng mock courses dự phòng:", error.message);
      return courseData?.items || [];
    }
  },

  /**
   * Lấy chi tiết một khóa học theo slug hoặc id
   */
  getCourseBySlug: async (slug) => {
    if (USE_MOCK) {
      return courseDetailData;
    }

    try {
      const data = await api.get(`/courses/${slug}`);
      return adaptCourse(data) || courseDetailData;
    } catch (error) {
      console.warn("⚠️ [courseService] Dùng mock chi tiết khóa học:", error.message);
      return courseDetailData;
    }
  },
};

export default courseService;
