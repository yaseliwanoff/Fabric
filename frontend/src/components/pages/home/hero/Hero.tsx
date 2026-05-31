import { NoiseWrapper } from "@components/common/noise-wrapper";

import styles from "./Hero.module.scss";

function Hero() {
  return (
    <section className={styles.hero} data-hero>
      <NoiseWrapper
        className={styles.hero__noise}
        contentClassName={styles.hero__content}
        visibility={1.78}
        motion={1.18}
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
