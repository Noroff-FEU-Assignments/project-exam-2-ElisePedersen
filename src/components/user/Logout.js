import { Button } from "react-bootstrap";
import AuthContext from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { React, useContext } from "react";
import styles from "./Logout.module.css";

export default function Logout() {
  const [, setAuth] = useContext(AuthContext);

  const history = useNavigate();

  function logoutProfile() {
    const confirmDelete = window.confirm("Are you sure you want to logout?");

    if (confirmDelete) {
      setAuth(null);
      history("/");
    }
  }

  return (
    <div>
      <Button
        variant="primary"
        type="submit"
        onClick={logoutProfile}
        className={styles.logoutButton}
      >
        Logout
      </Button>
    </div>
  );
}
