import Hero from "@/components/pages/home/hero/Hero";

import styles from "./Home.module.scss";

function Home() {
  return (
    <div className={styles.home}>
      <Hero />
    </div>
  );
}

export default Home;
