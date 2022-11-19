import { React, useState, useEffect } from "react";
import { ListGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import useAxios from "../../hooks/useAxios";
import styles from "./ListOfPosts.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment } from "@fortawesome/free-regular-svg-icons";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";

export default function ListOfPosts() {
  const [posts, setPosts] = useState([]);

  const http = useAxios();

  useEffect(function () {
    async function getPosts() {
      try {
        const response = await http.get(
          "social/posts?_author=true&_comments=true&_reactions=true"
        );
        console.log("response", response);
        setPosts(response.data);
      } catch (error) {
        console.log(error.response.data.status);
      }
    }

    getPosts();
  });

  return (
    <div className={styles.listOfPostsContainer}>
      {posts.map((post) => {
        return (
          <div key={post.id}>
            <Link to={`/post/${post.id}`} className={styles.listOfPostsLink}>
              <ListGroup className={styles.postListGroup}>
                <ListGroup.Item className={styles.postListMedia}>
                  <img src={post.media} alt={post.title} />
                </ListGroup.Item>
              </ListGroup>
            </Link>
            <ListGroup>
              <Link to={`/profile/${post.author.name}`}>
                <ListGroup.Item className={styles.postListTitle}>
                  <p>{post.author.name}</p>
                  <div className={styles.postListIcons}>
                    <FontAwesomeIcon icon={faComment} />
                    <FontAwesomeIcon icon={faUserPlus} />
                  </div>
                </ListGroup.Item>
              </Link>
            </ListGroup>
          </div>
        );
      })}
    </div>
  );
}
