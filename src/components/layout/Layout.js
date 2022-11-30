import React, { useEffect } from "react";
import { Container } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import Footer from "./Footer";
import styles from "./Layout.module.css";

export default function Layout({ children }) {
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/") {
      document.body.style =
        "background: linear-gradient(to left top, #d22f8c, #fc782e)";
    } else {
      document.body.style = "background: #FFFFFF";
    }
  }, [location]);
  return (
    <>
      <Container className={styles.layoutContentContainer}>
        {children}
      </Container>
      <Container className={styles.layoutFooterContainer}>
        {location.pathname !== "/" ? <Footer /> : null}
      </Container>
    </>
  );
}
