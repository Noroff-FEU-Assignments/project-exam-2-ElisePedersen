import { React, useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import useAxios from "../../hooks/useAxios";
import styles from "./ListOfPosts.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment } from "@fortawesome/free-regular-svg-icons";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";

export default function ListOfPosts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
        setError(error.toString());
      } finally {
        setLoading(false);
      }
    }

    getPosts();
    // eslint-disable-next-line
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Ops, something went wrong</div>;
  }

  return (
    <div className={styles.listOfPostsContainer}>
      {posts.map((post) => {
        if (post.media === null) {
          post.media = "";
        }
        return (
          <div key={post.id} className={styles.listOfPostsContent}>
            <Card>
              <Link to={`/post/${post.id}`} className={styles.listOfPostsLink}>
                <Card.Img
                  variant="top"
                  src={post.media}
                  alt={post.title}
                  onError={(event) => {
                    event.target.src =
                      "https://i.seadn.io/gae/OGpebYaykwlc8Tbk-oGxtxuv8HysLYKqw-FurtYql2UBd_q_-ENAwDY82PkbNB68aTkCINn6tOhpA8pF5SAewC2auZ_44Q77PcOo870?auto=format&w=1000";
                    event.onerror = null;
                  }}
                ></Card.Img>
              </Link>
              <Card.Body className={styles.listOfPostsBody}>
                <Link
                  to={`/profile/${post.author.name}`}
                  className={styles.listOfPostsLink}
                >
                  <Card.Title className={styles.postListTitle}>
                    <p>{post.author.name}</p>

                    <div className={styles.postListIcons}>
                      <FontAwesomeIcon icon={faComment} />
                      <FontAwesomeIcon icon={faUserPlus} />
                    </div>
                  </Card.Title>
                </Link>
              </Card.Body>
            </Card>
          </div>
        );
      })}
    </div>
  );
}
