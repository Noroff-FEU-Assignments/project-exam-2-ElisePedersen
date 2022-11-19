import { React, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import useAxios from "../../hooks/useAxios";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import styles from "./ProfilePosts.module.css";

export default function ProfilePosts() {
  const [posts, setPosts] = useState([]);

  let { name } = useParams();

  const http = useAxios();

  useEffect(function () {
    async function getProfilePosts() {
      try {
        const response = await http.get(`social/profiles/${name}/posts`);
        console.log("response", response);
        setPosts(response.data);
      } catch (error) {
        console.log(error.response.data.status);
      }
    }

    getProfilePosts();
  });

  return (
    <div>
      <h2>Posts</h2>
      <div className={styles.specificProfilePostContainer}>
        {posts.map((post) => {
          return (
            <div key={post.id}>
              <Link to={`/post/${post.id}`}>
                <Card>
                  <Card.Img
                    src={post.media}
                    alt={post.title}
                    className={styles.specificProfilePostImage}
                  />
                  <Card.Title>
                    <p>{post.title}</p>
                  </Card.Title>
                </Card>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}
