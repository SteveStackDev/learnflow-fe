import { useEffect, useState } from "react";
// Data
import { aboutData } from "./data";
// Styles
import styles from "./About.module.css";
// Assets
import workspaceImg from "~/assets/images/About/about-workspace.webp";
import communityImg from "~/assets/images/About/about-community.webp";
import roadmapImg from "~/assets/images/About/about-roadmap.webp";
// Sub-components
import AboutHero from "./components/AboutHero/AboutHero";
import AboutStats from "./components/AboutStats/AboutStats";
import AboutFeatures from "./components/AboutFeatures/AboutFeatures";

// Hooks
import useScrollReveal from "~/hooks/useScrollReveal";

const CAROUSEL_SLIDES = [
  {
    id: 1,
    image: workspaceImg,
    badge: "Thực chiến 24/7",
    title: "Hệ thống luyện code tự động",
    desc: "Chấm bài tự động và phản hồi ngay lập tức trên trình duyệt."
  },
  {
    id: 2,
    image: communityImg,
    badge: "Cộng đồng 50.000+",
    title: "Cùng nhau phát triển & Học hỏi",
    desc: "Trao đổi kinh nghiệm với các chuyên gia và học viên khác."
  },
  {
    id: 3,
    image: roadmapImg,
    badge: "Lộ trình bài bản",
    title: "Chinh phục kỹ năng công nghệ",
    desc: "Định hướng rõ ràng từ cơ bản đến trình độ chuyên nghiệp."
  }
];

function About() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % CAROUSEL_SLIDES.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [currentSlide]);

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev === 0 ? CAROUSEL_SLIDES.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % CAROUSEL_SLIDES.length);
  };

  useScrollReveal();

  return (
    <div className={styles.aboutpage}>
      {/* Ambient Background Glow Orbs */}
      <div className={styles["aboutpage__orb-1"]} />
      <div className={styles["aboutpage__orb-2"]} />
      <div className={styles["aboutpage__orb-3"]} />
      <div className={styles["aboutpage__orb-4"]} />

      <AboutHero
        CAROUSEL_SLIDES={CAROUSEL_SLIDES}
        currentSlide={currentSlide}
        setCurrentSlide={setCurrentSlide}
        handlePrev={handlePrev}
        handleNext={handleNext}
      />

      <AboutStats />

      <AboutFeatures features={aboutData.features} />
    </div>
  );
}

export default About;
