import React, { useState, useEffect, useMemo, useCallback } from "react";
import { useNavigate, useParams } from "react-router";
import { Button } from "~/components/ui";
import CourseVideoPlayer from "./components/CourseVideoPlayer/CourseVideoPlayer";
import CourseTabContent from "./components/CourseTabContent/CourseTabContent";
import CourseActionBar from "./components/CourseActionBar/CourseActionBar";
import CourseSyllabusSidebar from "./components/CourseSyllabusSidebar/CourseSyllabusSidebar";
import styles from "./CourseDetail.module.css";
import { courseService } from "~/services";

export function CourseDetail() {
  const navigate = useNavigate();
  const params = useParams();
  const courseId = params.id;

  const [course, setCourse] = useState({});
  const [curriculum, setCurriculum] = useState([]);
  const [userProgressPercent, setUserProgressPercent] = useState(0);
  const [loading, setLoading] = useState(true);
  const [activeLessonId, setActiveLessonId] = useState(null);

  // State theo dõi trạng thái xem xong video hiện tại
  const [isVideoEnded, setIsVideoEnded] = useState(false);

  // Hàm load & đồng bộ dữ liệu giữa Course gốc và Progression trong DB
  const fetchCourseData = useCallback(
    async (isInitial = false) => {
      try {
        if (isInitial) setLoading(true);

        // Gọi đồng thời các API
        const [courseRes, defaultCurriculumRes, userProgressionRes] = await Promise.all([
          courseService.getCourse(courseId),
          courseService.getCurriculum(courseId),
          courseService.getUserProgression(courseId),
        ]);

        if (courseRes) setCourse(courseRes);

        // Lấy % progression từ document usercourses trong DB
        if (userProgressionRes) {
          setUserProgressPercent(userProgressionRes.progression ?? 0);
        }

        // Merge trạng thái status, isCompleted và mảng NOTES từ UserProgression vào Curriculum gốc
        if (defaultCurriculumRes) {
          const userCurriculum = userProgressionRes?.curriculum || [];

          // Map nhanh thông tin lesson từ DB
          const userLessonInfoMap = new Map();
          userCurriculum.forEach((ch) => {
            ch.lessons?.forEach((les) => {
              const id = les.lessonId || les._id || les.id;
              userLessonInfoMap.set(id?.toString(), {
                status: les.status,
                notes: les.notes || [],
              });
            });
          });

          // Gán thông tin status & notes cho từng lesson
          const mergedCurriculum = defaultCurriculumRes.map((chapter) => ({
            ...chapter,
            lessons: (chapter.lessons || []).map((les) => {
              const id = (les.lessonId || les._id || les.id)?.toString();
              const userLessonData = userLessonInfoMap.get(id);

              const status = userLessonData?.status || "incompleted";
              const notes = userLessonData?.notes || les.notes || [];

              return {
                ...les,
                status: status,
                isCompleted: status === "completed",
                notes: notes, // Đảm bảo giữ nguyên mảng notes khi Refresh trang
              };
            }),
          }));

          setCurriculum(mergedCurriculum);

          // Chọn bài học gần nhất hoặc bài học đầu tiên
          if (isInitial) {
            const allLes = mergedCurriculum.flatMap((ch) => ch.lessons || []);
            const lastId = userProgressionRes?.lastAccessedLessonId;

            const defaultLesson =
              allLes.find(
                (les) => (les.lessonId || les._id || les.id)?.toString() === lastId?.toString(),
              ) || allLes[0];

            if (defaultLesson) {
              setActiveLessonId(defaultLesson.lessonId || defaultLesson._id || defaultLesson.id);
            }
          }
        }
      } catch (error) {
        console.error("❌ Lỗi load dữ liệu course detail:", error);
      } finally {
        if (isInitial) setLoading(false);
      }
    },
    [courseId],
  );

  useEffect(() => {
    if (courseId) {
      fetchCourseData(true);
    }
  }, [courseId, fetchCourseData]);

  const handleSelectLesson = (lessonId) => {
    setActiveLessonId(lessonId);
    setIsVideoEnded(false);
  };

  const allLessons = useMemo(() => {
    return curriculum.flatMap((ch) => ch.lessons || []);
  }, [curriculum]);

  // Bài học hiện tại cùng đầy đủ thông tin (Status, Video, Notes...)
  const activeLessonDetail = useMemo(() => {
    return allLessons.find((les) => (les.lessonId || les._id || les.id) === activeLessonId);
  }, [allLessons, activeLessonId]);

  const currentLessonIndex = useMemo(() => {
    return allLessons.findIndex((les) => (les.lessonId || les._id || les.id) === activeLessonId);
  }, [allLessons, activeLessonId]);

  const handlePrevLesson = () => {
    if (currentLessonIndex > 0) {
      const prevLesson = allLessons[currentLessonIndex - 1];
      handleSelectLesson(prevLesson.lessonId || prevLesson._id || prevLesson.id);
    }
  };

  const handleNextLesson = () => {
    if (currentLessonIndex >= 0 && currentLessonIndex < allLessons.length - 1) {
      const nextLesson = allLessons[currentLessonIndex + 1];
      handleSelectLesson(nextLesson.lessonId || nextLesson._id || nextLesson.id);
    }
  };

  // Callback gọi lại khi thêm Note mới hoặc Bấm "Đánh dấu hoàn thành"
  const handleDataUpdated = async () => {
    await fetchCourseData(false);
  };

  return loading ? (
    <div className={styles.loading_state}>Đang tải bài học...</div>
  ) : (
    <div className={styles.page_container}>
      <div className={styles.header_nav}>
        <Button variant="outlined" leftIcon="ChevronLeft" onClick={() => navigate("/course")}>
          Quay lại khóa học
        </Button>
      </div>

      <div className={styles.workspace_grid}>
        <div className={styles.left_column}>
          <CourseVideoPlayer
            lesson={activeLessonDetail}
            onVideoEnded={() => setIsVideoEnded(true)}
          />

          <CourseTabContent
            lesson={activeLessonDetail}
            course={course}
            onNoteAdded={handleDataUpdated}
          />

          <CourseActionBar
            onPrevLesson={handlePrevLesson}
            onNextLesson={handleNextLesson}
            hasPrev={currentLessonIndex > 0}
            hasNext={currentLessonIndex < allLessons.length - 1}
            lesson={activeLessonDetail}
            canComplete={isVideoEnded}
            onProgressionUpdated={handleDataUpdated}
          />
        </div>

        <div className={styles.right_column}>
          <CourseSyllabusSidebar
            course={course}
            progression={userProgressPercent}
            curriculum={curriculum}
            activeLessonId={activeLessonId}
            onSelectLesson={handleSelectLesson}
          />
        </div>
      </div>
    </div>
  );
}

export default CourseDetail;
