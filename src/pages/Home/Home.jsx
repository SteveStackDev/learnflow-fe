import { useState } from "react";
// Styles
import styles from "./Home.module.css";

// Data
import { homeData } from "./data";

// Sub-components
import HomeHero from "./components/HomeHero/HomeHero";
import HomeMarquee from "./components/HomeMarquee/HomeMarquee";
import HomeAbout from "./components/HomeAbout/HomeAbout";
import HomeStats from "./components/HomeStats/HomeStats";
import HomeFeatures from "./components/HomeFeatures/HomeFeatures";
import HomeTeam from "./components/HomeTeam/HomeTeam";
import HomeFaq from "./components/HomeFaq/HomeFaq";
import HomeContact from "./components/HomeContact/HomeContact";

// Hooks
import useScrollReveal from "~/hooks/useScrollReveal";
import { useToast } from "~/context/ToastContext.jsx";

function Home() {
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactMessage, setContactMessage] = useState("");
  const [contactErrors, setContactErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  useScrollReveal();

  const handleContactSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!contactName.trim()) {
      newErrors.name = "Vui lòng nhập họ và tên!";
    }

    if (!contactEmail.trim()) {
      newErrors.email = "Vui lòng nhập địa chỉ Email!";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contactEmail.trim())) {
      newErrors.email = "Email không đúng định dạng (ví dụ: name@domain.com)";
    }

    if (!contactMessage.trim()) {
      newErrors.message = "Vui lòng nhập nội dung cần tư vấn!";
    } else if (contactMessage.trim().length < 5) {
      newErrors.message = "Nội dung tin nhắn phải có ít nhất 5 ký tự!";
    }

    setContactErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      const firstError = Object.values(newErrors)[0];
      toast.error(firstError, "Thông tin tư vấn chưa hợp lệ");
      return;
    }

    setIsSubmitting(true);
    // UI hoàn thành – chờ kết nối API/backend.
    setTimeout(() => {
      setIsSubmitting(false);
      toast.success(
        "Đã nhận thông tin tư vấn! (UI hoàn thành – chờ kết nối API/backend)",
        "Tư vấn giả lập",
      );
      setContactName("");
      setContactEmail("");
      setContactMessage("");
      setContactErrors({});
    }, 1000);
  };

  return (
    <div className={styles.homepage}>
      {/* Ambient Glow Orbs */}
      <div className={styles["homepage__orb-1"]} />
      <div className={styles["homepage__orb-2"]} />
      <div className={styles["homepage__orb-3"]} />
      <div className={styles["homepage__orb-4"]} />

      <HomeHero />

      <HomeMarquee />

      <HomeAbout highlights={homeData.highlights} />

      <HomeStats stats={homeData.stats} />

      <HomeFeatures features={homeData.features} />

      <HomeTeam team={homeData.team} />

      <HomeFaq faqs={homeData.faqs} />

      <HomeContact
        contactName={contactName}
        setContactName={setContactName}
        contactEmail={contactEmail}
        setContactEmail={setContactEmail}
        contactMessage={contactMessage}
        setContactMessage={setContactMessage}
        contactErrors={contactErrors}
        setContactErrors={setContactErrors}
        isSubmitting={isSubmitting}
        handleContactSubmit={handleContactSubmit}
      />
    </div>
  );
}

export default Home;
