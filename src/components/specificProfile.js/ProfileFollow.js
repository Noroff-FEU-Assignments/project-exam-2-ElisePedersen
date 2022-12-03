import { Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import useAxios from "../../hooks/useAxios";

export default function ProfileFollow() {
  let { name } = useParams();

  const http = useAxios();

  async function Follow() {
    try {
      const response = await http.put(`social/profiles/${name}/follow`);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <Button variant="primary" type="submit" onClick={Follow}>
      Follow profile
    </Button>
  );
}
