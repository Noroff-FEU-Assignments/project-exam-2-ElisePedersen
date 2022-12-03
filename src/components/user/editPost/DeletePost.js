import useAxios from "../../../hooks/useAxios";
import { useState } from "react";
import { Button } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./DeletePost.module.css";

export default function DeletePost() {
  const [, setError] = useState(null);

  const user = JSON.parse(localStorage.getItem("auth"));
  const { id } = useParams();
  const http = useAxios();
  const history = useNavigate();

  async function deletePost() {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this post?"
    );

    if (confirmDelete) {
      try {
        const response = await http.delete(`/social/posts/${id}`);
        console.log("response", response);
        history(`/user/${user.name}`);
      } catch (error) {
        setError(error.toString());
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
