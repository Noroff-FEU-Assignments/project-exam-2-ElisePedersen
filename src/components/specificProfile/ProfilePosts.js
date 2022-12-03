import { React, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import useAxios from "../../hooks/useAxios";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import styles from "./ProfilePosts.module.css";
import LoadingSpinner from "../common/LoadingSpinner";

export default function ProfilePosts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  let { name } = useParams();
  const http = useAxios();

  useEffect(function () {
    async function getProfilePosts() {
      try {
        const response = await http.get(`social/profiles/${name}/posts`);
        console.log("response", response);
        setPosts(response.data);
      } catch (error) {
        setError(error.toString());
      } finally {
        setLoading(false);
      }
    }

    getProfilePosts();
    // eslint-disable-next-line
  }, []);

  if (loading) {
    return (
      <div>
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return <div>Ops, something went wrong</div>;
  }

  return (
    <div>
      <h2 className={styles.specificProfilePostsHeading}>Posts</h2>
      <div className={styles.specificProfilePostsContainer}>
        {posts.map((post) => {
          if (post.media === null) {
            post.media = "";
          }
          return (
            <div key={post.id} className={styles.specificProfilePostsContent}>
              <Card>
                <Link
                  to={`/post/${post.id}`}
                  className={styles.specificProfilePostsLink}
                >
                  <Card.Img
                    variant="top"
                    src={post.media}
                    alt={post.title}
                    className={styles.specificProfilePostsImg}
                    onError={(event) => {
                      event.target.src =
                        "https://i.seadn.io/gae/OGpebYaykwlc8Tbk-oGxtxuv8HysLYKqw-FurtYql2UBd_q_-ENAwDY82PkbNB68aTkCINn6tOhpA8pF5SAewC2auZ_44Q77PcOo870?auto=format&w=1000";
                      event.onerror = null;
                    }}
                  ></Card.Img>
                </Link>
                <Card.Body className={styles.specificProfilePostsBody}>
                  <Card.Title className={styles.specificProfilePostsTitle}>
                    <p>{post.title}</p>
                  </Card.Title>
                </Card.Body>
              </Card>
            </div>
          );
        })}
      </div>
    </div>
  );
}
