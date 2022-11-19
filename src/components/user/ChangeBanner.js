import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import styles from "./ChangeButton.module.css";

export default function ChangeBanner() {
  const [banner, setBanner] = useState(false);

  const closeBanner = () => setBanner(false);
  const showBanner = () => setBanner(true);

  return (
    <>
      <Button
        className={styles.userInfoButton}
        variant="primary"
        onClick={showBanner}
      >
        Change banner
      </Button>

      <Modal show={banner} onHide={closeBanner}>
        <Modal.Header closeButton>
          <Modal.Title>Change banner</Modal.Title>
        </Modal.Header>
        <Modal.Body>hihi, inn med nokke her</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={closeBanner}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
