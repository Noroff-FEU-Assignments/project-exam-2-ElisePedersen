import useAxios from "../../../hooks/useAxios";
import { useState } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import styles from "./DeletePost.module.css";

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
      } catch (error) {
        console.log(error.toString());
        setError(error);
      }
    }
  }

  return (
    <>
      <Button onClick={deletePost} className={styles.deletePostButton}>
        Delete post
      </Button>
    </>
  );
}
