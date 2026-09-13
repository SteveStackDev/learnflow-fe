import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import styles from "./AIPracticeQueue.module.css";
import { Card } from "~/components/ui/Card/Card";
import { Badge } from "~/components/ui/Badge/Badge";
import { Button } from "~/components/ui/Button/Button";
import { useToast } from "~/context/ToastContext";

export function AIPracticeQueue({ items = [] }) {
  const [activeFilter, setActiveFilter] = useState("all");
  const { toast } = useToast();
  const navigate = useNavigate();

  const filteredItems = items.filter((item) => {
    if (activeFilter === "boundary") return item.tag === "boundary";
    return true;
  });

  const handlePractice = (item) => {
    toast.info(`Bắt đầu luyện tập bài toán: ${item.title}`, "Khởi Động Luyện Tập");
    navigate(`/problem/${item.id}`);
  };

  return (
    <section className={`${styles.queue_section} reveal-card`}>
      <div className={styles.section_header}>
        <div className={styles.header_left}>
          <div className={styles.title_row}>
            <h2 className={styles.section_title}>Hàng Đợi Luyện Tập Trọng Tâm</h2>
            <Badge variant="primary" size="sm" className={styles.ai_badge}>
              Đề xuất bởi AI
            </Badge>
          </div>
          <p className={styles.section_subtitle}>
            Các bài tập được chọn lọc để triệt tiêu trực tiếp các điểm yếu vừa phát hiện phía trên.
          </p>
        </div>

        <div className={styles.filter_tabs}>
          <button
            type="button"
            className={`${styles.tab_btn} ${activeFilter === "all" ? styles.tab_btn_active : ""}`}
            onClick={() => setActiveFilter("all")}
          >
            Tất cả ({items.length})
          </button>
          <button
            type="button"
            className={`${styles.tab_btn} ${
              activeFilter === "boundary" ? styles.tab_btn_active : ""
            }`}
            onClick={() => setActiveFilter("boundary")}
          >
            Ưu tiên Boundary Conditions
          </button>
        </div>
      </div>

      <Card variant="elevated" className={styles.table_card}>
        <div className={styles.table_wrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th className={styles.th}>BÀI TOÁN &amp; THỬ THÁCH</th>
                <th className={styles.th}>THUẬT TOÁN</th>
                <th className={styles.th}>ĐỘ KHÓ</th>
                <th className={styles.th}>MỤC TIÊU AI KHẮC PHỤC</th>
                <th className={styles.th}>KHẢ NĂNG THÀNH CÔNG</th>
                <th className={`${styles.th} ${styles.th_action}`}>HÀNH ĐỘNG</th>
              </tr>
            </thead>
            <tbody>
              {filteredItems.map((item, idx) => {
                const isMedium = item.difficulty === "Medium";
                const isFirst = idx === 0;

                return (
                  <tr key={item.id} className={styles.tr}>
                    {/* Problem Name */}
                    <td className={styles.td}>
                      <div className={styles.problem_cell}>
                        <span className={styles.dot_bullet} />
                        <div className={styles.problem_info}>
                          <Link to={`/problem/${item.id}`} className={styles.problem_title}>
                            {item.title}
                          </Link>
                          <span className={styles.problem_subtext}>{item.subtext}</span>
                        </div>
                      </div>
                    </td>

                    {/* Algorithm */}
                    <td className={styles.td}>
                      <span className={styles.algo_tag}>{item.algorithm}</span>
                    </td>

                    {/* Difficulty */}
                    <td className={styles.td}>
                      <Badge
                        variant={isMedium ? "warning" : "success"}
                        size="sm"
                        className={styles.diff_badge}
                      >
                        {item.difficulty}
                      </Badge>
                    </td>

                    {/* AI Objective */}
                    <td className={styles.td}>
                      <span className={styles.objective_text}>{item.aiObjective}</span>
                    </td>

                    {/* Success Rate */}
                    <td className={styles.td}>
                      <div className={styles.progress_cell}>
                        <div className={styles.progress_track}>
                          <div
                            className={`${styles.progress_bar} ${
                              item.successRate >= 90
                                ? styles.progress_high
                                : styles.progress_medium
                            }`}
                            style={{ width: `${item.successRate}%` }}
                          />
                        </div>
                        <span className={styles.progress_percent}>{item.successRate}%</span>
                      </div>
                    </td>

                    {/* Action */}
                    <td className={`${styles.td} ${styles.td_action}`}>
                      <Button
                        variant={isFirst ? "contained" : "outlined"}
                        size="sm"
                        onClick={() => handlePractice(item)}
                        className={isFirst ? styles.btn_practice_primary : styles.btn_practice}
                      >
                        Luyện Ngay
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className={styles.table_footer}>
          <span className={styles.footer_counter}>
            Hiển thị {filteredItems.length} / 8 bài toán do AI gợi ý hôm nay
          </span>
          <Link to="/problem/list" className={styles.footer_link}>
            <span>Xem toàn bộ lộ trình gợi ý</span>
            <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>
      </Card>
    </section>
  );
}

export default AIPracticeQueue;
