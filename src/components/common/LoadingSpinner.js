import Spinner from "react-bootstrap/Spinner";
import styles from "./LoadingSpinner.module.css";

export default function LoadingSpinner() {
  return (
    <Spinner animation="grow" role="status" className={styles.spinner}>
      <span className="visually-hidden">Loading...</span>
    </Spinner>
  );
}
