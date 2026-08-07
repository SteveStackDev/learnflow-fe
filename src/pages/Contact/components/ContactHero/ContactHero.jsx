import Icon from "~/components/Icon/Icon";
import styles from "./ContactHero.module.css";

function ContactHero() {
  return (
    <section className={styles["contact-hero"]}>
      <div className={styles["contact-hero__container"]}>
        <div className={styles["contact-hero__content"]}>
          <span className={styles["contact-hero__badge"]}>
            <Icon name="Headphones" size={16} />
            Hỗ trợ 24/7
          </span>
          <h1 className={styles["contact-hero__title"]}>Liên hệ với LearnFlow</h1>
          <p className={styles["contact-hero__desc"]}>
            Đội ngũ LearnFlow luôn sẵn sàng lắng nghe và hỗ trợ bạn trên mọi lộ trình học tập, giải
            đáp thắc mắc kỹ thuật hoặc thảo luận về các cơ hội hợp tác mới.
          </p>
        </div>
      </div>
    </section>
  );
}

export default ContactHero;
