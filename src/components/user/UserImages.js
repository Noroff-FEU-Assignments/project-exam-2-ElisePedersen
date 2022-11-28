import { React, useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import useAxios from "../../hooks/useAxios";
import { Button, Card } from "react-bootstrap";
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
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <div className={styles.userPostHeading}>
        <h2>Your images</h2>
        {/* {count._count.posts} */}
        <Link to={`/user/new-post`}>
          <Button className={styles.userPostButton}>Create new post</Button>
        </Link>
      </div>
      <div className={styles.userPostContainer}>
        {posts.map((post) => {
          return (
            <div key={post.id} className={styles.userPostContent}>
              <Card>
                <Link to={`/post/${post.id}`} className={styles.userPostLink}>
                  <Card.Img
                    varian="top"
                    src={post.media}
                    alt={post.title}
                    onError={(event) => {
                      event.target.src =
                        "https://i.seadn.io/gae/OGpebYaykwlc8Tbk-oGxtxuv8HysLYKqw-FurtYql2UBd_q_-ENAwDY82PkbNB68aTkCINn6tOhpA8pF5SAewC2auZ_44Q77PcOo870?auto=format&w=1000";
                      event.onerror = null;
                    }}
                  ></Card.Img>
                </Link>
                <Card.Body className={styles.userPostBody}>
                  <Card.Title className={styles.userPostTitle}>
                    <p>{post.title}</p>
                  </Card.Title>
                  <Link to={`/user/edit-post/${post.id}`}>
                    <Button className={styles.userPostButton}>Edit post</Button>
                  </Link>
                </Card.Body>
              </Card>
            </div>
          );
        })}
      </div>
    </div>
  );
}
