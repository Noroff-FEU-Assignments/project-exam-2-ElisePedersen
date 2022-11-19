import useAxios from "../../../hooks/useAxios";
import { useState } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function DeletePost({ id }) {
  const [, setError] = useState(null);
  const user = JSON.parse(localStorage.getItem("auth"));

  const http = useAxios();
  const history = useNavigate();

  async function deletePost() {
    const confirmDelete = window.confirm("Delete this post?");

    if (confirmDelete) {
      try {
        const response = await http.delete(`/social/posts/${id}`);
        console.log("response", response);
        history(`/user/${user.name}`);
        //Working sometimes, sometimes not. why?
      } catch (error) {
        console.log(error.toString());
        setError(error);
      }
    }
  }

  return (
    <>
      <Button onClick={deletePost}>Delete post</Button>
    </>
  );
}
