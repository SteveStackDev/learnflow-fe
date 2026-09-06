import React, { useState } from "react";
import styles from "./AIMentorInsight.module.css";
import { Card } from "~/components/ui/Card/Card";
import { Badge } from "~/components/ui/Badge/Badge";
import { Button } from "~/components/ui/Button/Button";
import Icon from "~/components/Icon/Icon";
import { useToast } from "~/context/ToastContext";

export function AIMentorInsight({ insight, onScanRecentSubmissions }) {
  const [isScanning, setIsScanning] = useState(false);
  const { toast } = useToast();

  const handleScan = async () => {
    if (isScanning) return;
    setIsScanning(true);

    if (onScanRecentSubmissions) {
      await onScanRecentSubmissions();
    } else {
      await new Promise((resolve) => setTimeout(resolve, 1200));
      toast.success(
        "Đã hoàn tất quét 15 bài nộp mới nhất! Nhận định chuyên sâu của AI Mentor đã được làm mới.",
        "Phân Tích Hoàn Tất",
      );
    }
    setIsScanning(false);
  };

  return (
    <Card variant="glass" className={`${styles.mentor_card} reveal-card`}>
      <Card.Body className={styles.mentor_body}>
        <div className={styles.icon_bulb}>
          <Icon name="Lightbulb" size={24} />
        </div>

        <div className={styles.content_col}>
          <div className={styles.header_row}>
            <h3 className={styles.mentor_title}>
              Nhận định chuyên sâu từ AI Mentor hôm nay
            </h3>
            <Badge variant="success" size="sm" className={styles.realtime_badge}>
              {insight?.badge || "Thời gian thực"}
            </Badge>
          </div>

          <p className={styles.quote_text}>
            &ldquo;Bạn nắm vững công thức biến đổi trạng thái trong{" "}
            <span className={styles.highlight_dp}>Dynamic Programming</span>, tuy nhiên 68% số lần sai
            ở <span className={styles.highlight_bs}>Binary Search</span> xuất phát từ việc dùng nhầm{" "}
            <code className={styles.code_snippet}>l &lt; r</code> thay vì{" "}
            <code className={styles.code_snippet}>l &lt;= r</code> và quên xử lý khi mảng xoay có phần
            tử trùng lặp.&rdquo;
          </p>
        </div>

        <div className={styles.action_col}>
          <Button
            variant="outlined"
            size="sm"
            leftIcon={isScanning ? "Loader2" : "RefreshCw"}
            isLoading={isScanning}
            onClick={handleScan}
            className={styles.scan_btn}
          >
            {isScanning ? "Đang quét mã..." : "Quét mã nộp bài gần nhất"}
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
}

export default AIMentorInsight;
