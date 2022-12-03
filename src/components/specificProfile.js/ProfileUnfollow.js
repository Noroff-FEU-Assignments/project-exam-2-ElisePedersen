import { Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import useAxios from "../../hooks/useAxios";

export default function ProfileUnfollow() {
  let { name } = useParams();

  const http = useAxios();

  async function Unfollow() {
    try {
      const response = await http.put(`social/profiles/${name}/unfollow`);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <Button variant="primary" type="submit" onClick={Unfollow}>
      Unfollow profile
    </Button>
  );
}
