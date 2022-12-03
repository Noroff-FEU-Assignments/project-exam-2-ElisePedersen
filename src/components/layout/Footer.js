import React, { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import styles from "./Footer.module.css";

function Footer() {
  const user = JSON.parse(localStorage.getItem("auth"));
  const [, setAuth] = useContext(AuthContext);

  function logoutProfile() {
    const confirmDelete = window.confirm("Are you sure you want to logout?");

    if (confirmDelete) {
      setAuth(null);
    }
  }

  return (
    <div className={styles.footer}>
      <Link to={`/user/{}`} className={styles.footerLink}>
        Terms & Conditions
      </Link>
      <Link to={`/explore`} className={styles.footerLink}>
        Privacy Policy
      </Link>
      <Link to={`/user/${user.name}`} className={styles.footerLink}>
        Profile
      </Link>
      <Link to={`/`} onClick={logoutProfile} className={styles.footerLink}>
        Logout
      </Link>
    </div>
  );
}

export default Footer;
