import React from "react";
import { Link } from "react-router-dom";
import styles from "./Footer.module.css";

function Footer() {
  return (
    <div className={styles.footer}>
      <Link to={`/explore`} className={styles.footerLink}>
        Terms & Conditions
      </Link>
      <Link to={`/explore`} className={styles.footerLink}>
        Privacy Policy
      </Link>
      <Link to={`/explore`} className={styles.footerLink}>
        Contact
      </Link>
      <Link to={`/explore`} className={styles.footerLink}>
        About
      </Link>
    </div>
  );
}

export default Footer;
