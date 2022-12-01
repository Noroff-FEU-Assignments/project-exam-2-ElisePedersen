import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { NavLink, useLocation } from "react-router-dom";
import logo from "../../images/logo.png";
import styles from "./Navigation.module.css";

export default function Navigation() {
  const user = JSON.parse(localStorage.getItem("auth"));
  const location = useLocation();

  return (
    <Navbar bg="#FFEBD9" expand="lg">
      <Nav className={styles.navigationContainer}>
        <NavLink to="/explore">
          <img src={logo} alt="Logo" className={styles.navigationLogo} />
        </NavLink>
        {location.pathname !== "/" ? (
          <NavLink
            to={`/user/${user.name}`}
            className={styles.navigationButton}
          >
            Profile
          </NavLink>
        ) : null}
      </Nav>
    </Navbar>
  );
}
