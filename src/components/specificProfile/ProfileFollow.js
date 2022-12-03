import { Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import useAxios from "../../hooks/useAxios";
import styles from "./ProfileFollow.module.css";

export default function ProfileFollow({ setIsFollowing }) {
  let { name } = useParams();

  const http = useAxios();

  async function Follow() {
    try {
      const response = await http.put(`social/profiles/${name}/follow`);
      console.log(response);
      setIsFollowing(true);
    } catch (error) {
      console.log(error);
    }
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
