import React from "react";
import Login from "./LogIn";
import { Button } from "react-bootstrap";
import styles from "./LandingPage.module.css";
import logo from "../../images/Share-ish.png";
import Signup from "./Signup";
import { useLocation } from "react-router-dom";

export default function LandingPage() {
  const [signupModalShow, setSignupModalShow] = React.useState(false);

  const location = useLocation();
  console.log(location);
  if (location.pathname === "/") {
    document.body.style =
      "background: linear-gradient(to left top, #d22f8c, #fc782e)";
  } else {
    document.body.style = "background: #000000";
  }
  //må fikse sånn at denne bare er på landingpage
  //må fjerne footer og profile button på landing page
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
