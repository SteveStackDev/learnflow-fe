import React from "react";
import styles from "./AIHeroBanner.module.css";
import { Badge } from "~/components/ui/Badge/Badge";
import { Button } from "~/components/ui/Button/Button";
import { useToast } from "~/context/ToastContext";

export function AIHeroBanner({ onFullScan, onWeeklyReport }) {
  const { toast } = useToast();

  const handleWeeklyReport = () => {
    if (onWeeklyReport) {
      onWeeklyReport();
    } else {
      toast.info(
        "Báo cáo tuần: Bạn đã giải 42 bài toán, cải thiện 14% tỷ lệ đúng ở chủ đề Dynamic Programming!",
        "Báo Cáo Tuần Qua",
      );
    }
  };

  const handleFullScan = () => {
    if (onFullScan) {
      onFullScan();
    } else {
      toast.success(
        "Đang kích hoạt hệ thống AI Deep Scan trên 60 bài nộp gần nhất...",
        "Chẩn Đoán Toàn Diện",
      );
    }
  };

  return (
    <section className={`${styles.hero_banner} reveal-card`}>
      <div className={styles.hero_left}>
        <div className={styles.badge_wrapper}>
          <Badge variant="info" size="md" icon="Sparkles" className={styles.hero_badge}>
            AI Learning & Diagnostic Lab
          </Badge>
        </div>

        <h1 className={styles.hero_title}>AI Learning</h1>

        <p className={styles.hero_desc}>
          Understand your mistakes and improve your problem-solving skills. Hệ thống tự động phân tích
          nhật ký nộp bài, định vị chuẩn xác điểm nghẽn logic và tạo lộ trình cải thiện cá nhân hoá theo
          năng lực thực tế.
        </p>
      </div>

      <div className={styles.hero_actions}>
        <Button
          variant="outlined"
          size="md"
          leftIcon="FileText"
          onClick={handleWeeklyReport}
          className={styles.report_btn}
        >
          Báo Cáo Tuần Qua
        </Button>

        <Button
          variant="contained"
          size="md"
          leftIcon="Sparkles"
          onClick={handleFullScan}
          className={styles.diagnose_btn}
        >
          Chẩn Đoán Toàn Diện
        </Button>
      </div>
    </section>
  );
}

export default AIHeroBanner;
