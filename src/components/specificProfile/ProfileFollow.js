import { useState } from "react";
import { Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import useAxios from "../../hooks/useAxios";
import styles from "./ProfileFollow.module.css";

export default function ProfileFollow({ setIsFollowing }) {
  const [error, setError] = useState(null);

  let { name } = useParams();
  const http = useAxios();

  async function Follow() {
    try {
      const response = await http.put(`social/profiles/${name}/follow`);
      console.log(response);
      setIsFollowing(true);
    } catch (error) {
      setError(error.toString());
    }
  }

  if (error) {
    return <div>Could not follow profile</div>;
  }

  return (
    <Button
      variant="primary"
      type="submit"
      onClick={Follow}
      className={styles.profileFollowButton}
    >
      Follow profile
    </Button>
  );
}
