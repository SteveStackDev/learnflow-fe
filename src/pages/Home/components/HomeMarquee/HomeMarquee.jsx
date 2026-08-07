import Icon from "~/components/Icon/Icon";
import styles from "./HomeMarquee.module.css";

function HomeMarquee() {
  return (
    <section className={styles["home-marquee"]}>
      <div className={styles["home-marquee__container"]}>
        <h2 className={styles["home-marquee__section-title"]}>
          CÔNG NGHỆ ĐÀO TẠO CỐT LÕI
        </h2>
        <div className={styles["home-marquee__wrap"]}>
          <div className={styles["home-marquee__tech-item"]}>
            <Icon name="ReactTech" size={22} />
            <span>React</span>
          </div>

          <div className={styles["home-marquee__tech-item"]}>
            <Icon name="PythonTech" size={22} />
            <span>Python</span>
          </div>

          <div className={styles["home-marquee__tech-item"]}>
            <Icon name="AwsTech" size={22} />
            <span>AWS</span>
          </div>

          <div className={styles["home-marquee__tech-item"]}>
            <Icon name="DockerTech" size={22} />
            <span>Docker</span>
          </div>

          <div className={styles["home-marquee__tech-item"]}>
            <Icon name="NodeTech" size={22} />
            <span>Node.js</span>
          </div>

          <div className={styles["home-marquee__tech-item"]}>
            <Icon name="MongoTech" size={22} />
            <span>MongoDB</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HomeMarquee;
