import { React, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import useAxios from "../../hooks/useAxios";
import styles from "./Post.module.css";
import Heading from "../layout/Heading.js";

export default function Post() {
  const [posts, setPosts] = useState([]);

  let { id } = useParams();

  const http = useAxios();

  useEffect(function () {
    async function getPost() {
      try {
        const response = await http.get(`social/posts/${id}`);
        console.log("response", response);
        setPosts(response.data);
      } catch (error) {
        console.log(error.response.data.status);
      }
    }

    getPost();
  });

  return (
    <div>
      <img
        src={posts.media}
        alt={posts.title}
        className={styles.specificPostImage}
      ></img>

      <Heading title={posts.title} />
      <div>
        <p>{posts.body}</p>
      </div>
    </div>
  );
}
