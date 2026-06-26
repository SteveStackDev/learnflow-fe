// Data
import { aboutData } from "./data";
// Import CSS Modules
import styles from "./About.module.css";

function About() {
  return (
    <>
      <div className={styles.aboutpage}>
        {/* Hero Section */}
        <section className={styles["about-hero"]}>
          <div className={styles["about-hero__container"]}>
            <div className={styles["about-hero__content"]}>
              <span className={styles["about-hero__badge"]}>Về chúng tôi</span>
              <h1 className={styles["about-hero__title"]}>
                Kiến tạo tương lai cho lập trình viên Việt
              </h1>
              <p className={styles["about-hero__desc"]}>
                LearnFlow không chỉ là một nền tảng học tập, mà là bệ phóng cho
                sự nghiệp công nghệ của bạn. Chúng tôi mang đến phương pháp học
                tập cá nhân hóa, giúp bạn vượt qua rào cản và làm chủ mã nguồn
                một cách tự tin nhất.
              </p>
              <div className={styles["about-hero__actions"]}>
                <button
                  type="button"
                  className={`${styles["about-hero__btn"]} ${styles["about-hero__btn--contained"]}`}
                >
                  Khám phá lộ trình
                </button>
                <button
                  type="button"
                  className={`${styles["about-hero__btn"]} ${styles["about-hero__btn--outlined"]}`}
                >
                  Xem video
                </button>
              </div>
            </div>

            <div className={styles["about-hero__media"]}>
              <img
                className={styles["about-hero__img"]}
                src="/src/assets/images/Home/hero.webp"
                alt="Hero Image"
              />
            </div>
          </div>
        </section>

        {/* Feature Section */}
        <section className={styles["about-features"]}>
          <div className={styles["about-features__container"]}>
            <div className={styles["about-features__content"]}>
              <h2 className={styles["about-features__title"]}>
                LearnFlow là gì? Hệ sinh thái học tập có định hướng
              </h2>

              <div className={styles["about-features__list"]}>
                {aboutData.features.map((obj, index) => {
                  return (
                    <div key={index} className={styles["about-features__item"]}>
                      <span className={styles["about-features__icon"]}>
                        {obj.iconName}
                      </span>
                      <div className={styles["about-features__info"]}>
                        <h3 className={styles["about-features__item-title"]}>
                          {obj.title}
                        </h3>
                        <p className={styles["about-features__desc"]}>
                          {obj.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className={styles["about-features__media"]}>
              <img
                className={styles["about-features__img"]}
                src=""
                alt="Feature Illustration"
              />
            </div>
          </div>
        </section>

        {/* About/Story Section */}
        <section className={styles["about-story"]}>
          <div className={styles["about-story__container"]}>
            <div className={styles["about-story__content"]}>
              <h2 className={styles["about-story__title"]}>
                Hành trình giải quyết nỗi đau của "Người mới"
              </h2>
              <p className={styles["about-story__text"]}>
                Bạn đã bao giờ dành hàng giờ trên YouTube để xem các video hướng
                dẫn, nhưng khi mở trình soạn thảo mã nguồn lên lại không biết
                bắt đầu từ đâu? Bạn cảm thấy lạc lối giữa hàng nghìn công nghệ
                mới ra đời mỗi ngày?
              </p>
              <p className={styles["about-story__text"]}>
                Đó chính là câu chuyện của đội ngũ sáng lập LearnFlow. Chúng tôi
                nhận ra rằng: **Vấn đề không phải là thiếu tài liệu, mà là thiếu
                một lộ trình đúng đắn và động lực duy trì.** LearnFlow ra đời để
                biến việc học code từ một "cơn ác mộng" thành một hành trình
                khám phá đầy thú vị và có hệ thống.
              </p>
              <hr className={styles["about-story__divider"]} />
            </div>
          </div>
        </section>

        {/* Future Section (Mission, Vision, Values) */}
        <section className={styles["about-future"]}>
          <div className={styles["about-future__container"]}>
            <div className={styles["about-future__list"]}>
              {aboutData.companyValues.map((obj, index) => {
                return (
                  <div key={index} className={styles["about-future__card"]}>
                    <span className={styles["about-future__icon"]}>
                      {obj.iconName}
                    </span>
                    <h3 className={styles["about-future__title"]}>
                      {obj.title}
                    </h3>

                    <div className={styles["about-future__desc"]}>
                      {typeof obj.description === "string" ? (
                        <p>{obj.description}</p>
                      ) : (
                        <ul className={styles["about-future__sublist"]}>
                          {obj.description.map((item, subIndex) => {
                            return <li key={subIndex}>{item}</li>;
                          })}
                        </ul>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Comparison Section */}
        <section className={styles["about-comparison"]}>
          <div className={styles["about-comparison__container"]}>
            <h2 className={styles["about-comparison__title"]}>
              Sự khác biệt tại LearnFlow
            </h2>
            <p className={styles["about-comparison__subtitle"]}>
              Chúng tôi không chỉ dạy bạn viết code, chúng tôi dạy bạn cách tư
              duy của một kỹ sư phần mềm thực thụ.
            </p>

            <div className={styles["about-comparison__group"]}>
              <div
                className={`${styles["about-comparison__box"]} ${styles["about-comparison__box--disagree"]}`}
              >
                {aboutData.comparison.cons.map((item, index) => {
                  return (
                    <p key={index} className={styles["about-comparison__item"]}>
                      {item}
                    </p>
                  );
                })}
              </div>

              <div
                className={`${styles["about-comparison__box"]} ${styles["about-comparison__box--agree"]}`}
              >
                {aboutData.comparison.pros.map((item, index) => {
                  return (
                    <p key={index} className={styles["about-comparison__item"]}>
                      {item}
                    </p>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className={styles["about-team"]}>
          <div className={styles["about-team__container"]}>
            <h2 className={styles["about-team__title"]}>Đội ngũ sáng lập</h2>
            <p className={styles["about-team__subtitle"]}>
              Những người đứng sau sứ mệnh nâng tầm lập trình viên Việt
            </p>

            <div className={styles["about-team__list"]}>
              {aboutData.team.map((obj, index) => {
                return (
                  <div key={index} className={styles["about-team__card"]}>
                    <img
                      className={styles["about-team__card-media"]}
                      alt={obj.name}
                      src={obj.imageUrl}
                    />
                    <div className={styles["about-team__card-content"]}>
                      <h3 className={styles["about-team__card-title"]}>
                        {obj.title}
                      </h3>
                      <h4 className={styles["about-team__card-role"]}>
                        {obj.role}
                      </h4>
                      <p className={styles["about-team__card-desc"]}>
                        {obj.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default About;
