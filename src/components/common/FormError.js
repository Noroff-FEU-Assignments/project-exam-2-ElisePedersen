import PropTypes from "prop-types";
import styles from "./FormError.module.css";

export default function ValidationError({ children }) {
  return <div className={styles.error}>{children}</div>;
}

ValidationError.proptTypes = {
  children: PropTypes.node.isRequired,
};
