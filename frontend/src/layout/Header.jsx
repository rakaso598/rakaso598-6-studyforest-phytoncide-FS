import React, { useEffect, useState } from "react";
import styles from "./Header.module.css";
import logo1 from "/images/logo/logo_icon.svg";
import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const [isVisible, setIsVisible] = useState(false);
  const location = useLocation();

  // 현재 페이지 주소에따라 "스터디 만들기" 버튼 보여줄지 말지 결정
  useEffect(() => {
    if (location.pathname === "/" || location.pathname === "/study/create") {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  }, [location]);

  return (
    <>
      <header className={styles.container}>
        <div className={styles.logoWrapper}>
          <Link to="/" className={styles.logo}>
            <img src={logo1} alt="Study Forest Logo" />
          </Link>

          {isVisible && (
            <Link to="/studies/create" className={styles.createStudyButton}>
              <span className={styles.textBg}>스터디 만들기</span>
              <span className={styles.text}>스터디 만들기</span>
            </Link>
          )}
        </div>
      </header>
    </>
  );
};

export default Header;
