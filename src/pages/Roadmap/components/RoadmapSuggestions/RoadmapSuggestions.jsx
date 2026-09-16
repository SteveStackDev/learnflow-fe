import React from "react";
import { useNavigate } from "react-router";
import Icon from "~/components/Icon/Icon";
import styles from "./RoadmapSuggestions.module.css";

const DEFAULT_SUGGESTIONS = [
  {
    id: "roadmap-sugg-1",
    title: "Giao diện & Trải nghiệm",
    description: "Yêu thích cái đẹp, sự tỉ mỉ và mong muốn tạo ra sản phẩm chạm đến người dùng.",
    iconName: "Eye",
  },
  {
    id: "roadmap-sugg-2",
    title: "Logic & Hệ thống",
    description:
      "Đam mê giải quyết các bài toán hóc búa, tối ưu hóa hiệu suất và xây dựng kiến trúc.",
    iconName: "Code",
  },
  {
    id: "roadmap-sugg-3",
    title: "Dữ liệu",
    description: "Tìm kiếm những sự thật ẩn giấu trong các con số và dự đoán tương lai bằng AI.",
    iconName: "Database",
  },
  {
    id: "roadmap-sugg-4",
    title: "Toàn diện",
    description: "Mong muốn làm chủ cả Frontend lẫn Backend để tự tay xây dựng sản phẩm từ A-Z.",
    iconName: "Layers",
  },
];

function RoadmapSuggestions({ suggestions = DEFAULT_SUGGESTIONS }) {
  const navigate = useNavigate();
  const list = suggestions && suggestions.length > 0 ? suggestions : DEFAULT_SUGGESTIONS;

  return (
    <section className={styles["roadmap-suggestions"]}>
      <div className={styles["roadmap-suggestions__container"]}>
        <div className={styles["roadmap-suggestions__header"]}>
          <h2 className={styles["roadmap-suggestions__section-title"]}>
            Không biết bắt đầu từ đâu?
          </h2>
          <p className={styles["roadmap-suggestions__section-subtitle"]}>
            Đừng lo lắng, hãy chọn lĩnh vực mà bạn cảm thấy hứng thú nhất. Chúng tôi sẽ gợi ý hướng
            đi phù hợp.
          </p>
        </div>

        <div className={styles["roadmap-suggestions__list"]}>
          {list.map((obj) => (
            <div
              key={obj.id}
              className={`${styles["roadmap-suggestions__card"]} reveal-card`}
              onClick={() => navigate(`/roadmap/${obj.id || "frontend"}`)}
              style={{ cursor: "pointer" }}
            >
              <div className={styles["roadmap-suggestions__icon-wrapper"]}>
                <Icon name={obj.iconName} size={24} />
              </div>
              <h3 className={styles["roadmap-suggestions__title"]}>{obj.title}</h3>
              <p className={styles["roadmap-suggestions__desc"]}>{obj.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default RoadmapSuggestions;
