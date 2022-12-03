import { Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import useAxios from "../../hooks/useAxios";
import styles from "./ProfileUnfollow.module.css";

export default function ProfileUnfollow({ setIsFollowing }) {
  let { name } = useParams();

  const http = useAxios();

  async function Unfollow() {
    try {
      const response = await http.put(`social/profiles/${name}/unfollow`);
      console.log(response);
      setIsFollowing(false);
    } catch (error) {
      console.log(error);
    }
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
