import Icon from "~/components/Icon/Icon";
import styles from "./RoadmapSuggestions.module.css";

function RoadmapSuggestions({ suggestions }) {
  return (
    <section className={styles["roadmap-suggestions"]}>
      <div className={styles["roadmap-suggestions__container"]}>
        <div className={styles["roadmap-suggestions__header"]}>
          <h2 className={styles["roadmap-suggestions__section-title"]}>
            Không biết bắt đầu từ đâu?
          </h2>
          <p className={styles["roadmap-suggestions__section-subtitle"]}>
            Đừng lo lắng, hãy chọn lĩnh vực mà bạn cảm thấy hứng thú nhất.
            Chúng tôi sẽ gợi ý hướng đi phù hợp.
          </p>
        </div>

        <div className={styles["roadmap-suggestions__list"]}>
          {suggestions.map((obj) => (
            <div
              key={obj.id}
              className={`${styles["roadmap-suggestions__card"]} reveal-card`}
            >
              <div className={styles["roadmap-suggestions__icon-wrapper"]}>
                <Icon name={obj.iconName} size={24} />
              </div>
              <h3 className={styles["roadmap-suggestions__title"]}>
                {obj.title}
              </h3>
              <p className={styles["roadmap-suggestions__desc"]}>
                {obj.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default RoadmapSuggestions;
