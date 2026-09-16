import Icon from "~/components/Icon/Icon";
import styles from "./BadgeGuide.module.css";

const DEFAULT_GUIDES = [
  {
    id: "badge-guide-1",
    title: "Học tập đều đặn",
    description:
      "Duy trì việc đăng nhập và hoàn thành bài học mỗi ngày để nhận các danh hiệu Streak và Chuyên cần.",
    iconName: "Clock",
  },
  {
    id: "badge-guide-2",
    title: "Thử thách & Contest",
    description:
      "Tham gia các kỳ thi tuần, tháng và vượt qua các bài Lab khó để khẳng định năng lực chuyên môn.",
    iconName: "Target",
  },
  {
    id: "badge-guide-3",
    title: "Xếp hạng & Cộng đồng",
    description:
      "Tích cực hỗ trợ các học viên khác, đóng góp tài liệu và leo hạng trên Leaderboard toàn cầu.",
    iconName: "Users",
  },
];

function BadgeGuide({ guides = DEFAULT_GUIDES }) {
  const list = guides && guides.length > 0 ? guides : DEFAULT_GUIDES;

  return (
    <section className={styles["badge-guide"]}>
      <div className={styles["badge-guide__container"]}>
        <div className={styles["badge-guide__header"]}>
          <h2 className={styles["badge-guide__section-title"]}>Làm thế nào để kiếm Badge?</h2>
        </div>
        <div className={styles["badge-guide__list"]}>
          {list.map((obj) => (
            <div key={obj.id} className={`${styles["badge-guide__card"]} reveal-card`}>
              <div className={styles["badge-guide__icon"]}>
                <Icon name={obj.iconName || "Award"} size={24} />
              </div>
              <h3 className={styles["badge-guide__title"]}>{obj.title}</h3>
              <p className={styles["badge-guide__desc"]}>{obj.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default BadgeGuide;
