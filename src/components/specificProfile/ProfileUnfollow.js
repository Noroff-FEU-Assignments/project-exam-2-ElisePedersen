import { useState } from "react";
import { Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import useAxios from "../../hooks/useAxios";
import styles from "./ProfileUnfollow.module.css";

export default function ProfileUnfollow({ setIsFollowing }) {
  const [error, setError] = useState(null);

  let { name } = useParams();
  const http = useAxios();

  async function Unfollow() {
    try {
      const response = await http.put(`social/profiles/${name}/unfollow`);
      console.log(response);
      setIsFollowing(false);
    } catch (error) {
      setError(error.toString());
    }
  }

  if (error) {
    return <div>Could not unfollow profile</div>;
  }

  return (
    <Button
      variant="primary"
      type="submit"
      onClick={Unfollow}
      className={styles.profileUnfollowButton}
    >
      Unfollow profile
    </Button>
  );
}
