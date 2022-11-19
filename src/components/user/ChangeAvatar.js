import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import styles from "./ChangeButton.module.css";

export default function ChangeAvatar() {
  const [avatar, setAvatar] = useState(false);

  const closeAvatar = () => setAvatar(false);
  const showAvatar = () => setAvatar(true);

  return (
    <>
      <Button
        className={styles.userInfoButton}
        variant="primary"
        onClick={showAvatar}
      >
        Change avatar
      </Button>

      <Modal show={avatar} onHide={closeAvatar}>
        <Modal.Header closeButton>
          <Modal.Title>Change avatar</Modal.Title>
        </Modal.Header>
        <Modal.Body>hihi, inn med nokke her</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={closeAvatar}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
