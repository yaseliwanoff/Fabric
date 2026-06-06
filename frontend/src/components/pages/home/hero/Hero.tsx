import { NoiseWrapper } from "@components/common/noise-wrapper";

import styles from "./Hero.module.scss";

function Hero() {
  return (
    <section className={styles.hero} data-hero>
      <div className={styles.hero__blocks}>
        <div className={styles["hero__blocks--top"]}>
          <div className={styles.hero__logo}>
            <div className={styles["hero__logo--top"]}>
              <div className={styles["hero__logo--test"]}>
                <p className={styles["hero__logo--name"]}>fabrica</p>
                <p className={styles["hero__logo--studio"]}>Studio</p>
              </div>
              <p className={styles["hero__logo--apo"]}>®</p>
            </div>
          </div>
          <div className={styles.hero__tags}>
            <p className={styles["hero__tags--name"]}>Branding and Identity</p>
            <p className={styles["hero__tags--name"]}>Social Media Marketing</p>
            <p className={styles["hero__tags--name"]}>
              Web Design and Development
            </p>
            <p className={styles["hero__tags--name"]}>SEO Optimization</p>
          </div>
        </div>
        <div className={styles["hero__blocks--bottom"]}>
          <div className={styles["hero__bottom--text"]}>
            <h1 className={styles.first__line}>
              <span>
                <p className={styles.font__center}>
                  No&nbsp;generic websites. No&nbsp;empty
                </p>{" "}
                marketing promises.
                <span className={styles.color}>
                  {" "}
                  Just tools and strategies that help your business grow and
                  your brand shine.
                </span>
              </span>
            </h1>
          </div>
          <div className={styles["hero__bottom--another"]}>
            <p className={styles.description}>© 2025 fabrica® Studio</p>
            <div className={styles.info__block}>
              <div className={styles["info__block--image"]}>
                <img src="" alt="..." />
              </div>
              <div className={styles["info__block--text"]}></div>
            </div>
          </div>
        </div>
      </div>
      <NoiseWrapper
        className={styles.hero__noise}
        contentClassName={styles.hero__content}
        visibility={1.78}
        motion={2.18}
      >
        <video
          className={styles.hero__video}
          muted
          autoPlay
          loop
          playsInline
          src="/videos/hero__video.mp4"
        />
      </NoiseWrapper>
    </section>
  );
}

export default Hero;
