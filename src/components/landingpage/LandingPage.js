import React, { useState } from "react";
import Login from "./LogIn";
import { Button } from "react-bootstrap";
import styles from "./LandingPage.module.css";
import logo from "../../images/Share-ish.png";
import Signup from "./Signup";

export default function LandingPage() {
  const [signupModalShow, setSignupModalShow] = useState(false);
  document.title = "Share-ish";
  return (
    <div className={styles.landingpageContainer}>
      <img src={logo} alt="Logo" />
      <div className={styles.loginContent}>
        <p>Log in to Share-ish</p>
        <Login />
        <div className={styles.signupContainer}>
          <p>Not in the Share-ish family?</p>
          <Button
            variant="primary"
            onClick={() => setSignupModalShow(true)}
            className={styles.signupButton}
          >
            Sign up
          </Button>
          <Signup
            show={signupModalShow}
            onHide={() => setSignupModalShow(false)}
          />
        </div>
      </div>
      <div className={styles.landingpageParagraph}>
        <p>Become a part of a community that share-ish photosharing.</p>
        <p>
          Follow profiles that you like and get inspiration from the whole
          world.
        </p>
      </div>
    </div>
  );
}
