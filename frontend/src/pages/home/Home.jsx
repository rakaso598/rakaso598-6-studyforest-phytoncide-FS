import styles from "./Home.module.css";
import AllStudiesSection from "./AllStudiesSection";
import RecentlyVeiwedSection from "./RecentlyViewedSection";

const Home = () => {
  return (
    <section className={styles.home}>
      <RecentlyVeiwedSection />
      <AllStudiesSection />
    </section>
  );
};

export default Home;
