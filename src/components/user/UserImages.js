import { React, useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import useAxios from "../../hooks/useAxios";
import { Button, ListGroup } from "react-bootstrap";
import styles from "./UserImages.module.css";

export default function UserImages() {
  const [posts, setImages] = useState([]);
  // const [count, setCount] = useState([]);

  let { name } = useParams();

  const http = useAxios();

  useEffect(function () {
    async function getUserImages() {
      try {
        const response = await http.get(
          `social/profiles/${name}?_posts=true&_following=true&_followers=true`
        );
        console.log("response", response.data);
        setImages(response.data.posts);
        // setCount(response.data);
      } catch (error) {
        console.log(error.response.data.status);
      }
    }

    getUserImages();
  });

  return (
    <div>
      <div className={styles.imageHeading}>
        <h2>Your images</h2>
        {/* {count._count.posts} */}
        <Link to={`/new-post`}>
          <Button className={styles.userButton}>Create new post</Button>
        </Link>
      </div>
      <div className={styles.userPostContainer}>
        {posts.map((post) => {
          return (
            <div key={post.id} className={styles.userPost}>
              <ListGroup>
                <ListGroup.Item className={styles.userPostContent}>
                  <img src={post.media} alt={post.title} />
                  <Link
                    to={`/edit-post/${post.id}`}
                    className={styles.userPostLink}
                  >
                    <Button className={styles.userButton}>Edit post</Button>
                  </Link>
                </ListGroup.Item>
              </ListGroup>
            </div>
          );
        })}
      </div>
    </div>
  );
}
