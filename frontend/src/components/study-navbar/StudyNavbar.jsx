import { Link } from "react-router-dom";
import styles from "./StudyNavbar.module.css";

const StudyNavbar = ({ id, link, pageName }) => {
  return (
    <nav className={styles.navBar}>
      <h1 className={styles.navTxt}>연우의 개발공장</h1>
      <div className={styles.navBtnContainer}>
        <Link to={link} className={styles.navBtn}>
          {pageName}
          <img src="/images/icon/ic_arrow_right.svg" alt="오른쪽 화살표" />
        </Link>
        <Link to="/" className={styles.navBtn}>
          <p>홈</p>
          <img src="/images/icon/ic_arrow_right.svg" alt="오른쪽 화살표" />
        </Link>
      </div>
    </nav>
  );
};

export default StudyNavbar;
