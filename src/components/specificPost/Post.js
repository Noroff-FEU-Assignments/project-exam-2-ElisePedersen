import { React, useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import useAxios from "../../hooks/useAxios";
import styles from "./Post.module.css";
import Heading from "../layout/Heading.js";
import { Image } from "react-bootstrap";
import LoadingSpinner from "../common/LoadingSpinner";

export default function Post() {
  const [posts, setPosts] = useState([]);
  const [author, setAuthor] = useState("");
  const [comments, setComments] = useState([]);
  const [reactions, setReactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  let { id } = useParams();
  const http = useAxios();

  useEffect(function () {
    async function getPost() {
      try {
        const response = await http.get(
          `social/posts/${id}?_author=true&_comments=true&_reactions=true`
        );
        console.log("response", response);
        document.title = `${response.data.author.name} - ${response.data.title}`;

        setPosts(response.data);
        setAuthor(response.data.author);
        setComments(response.data.comments);
        setReactions(response.data.reactions);
      } catch (error) {
        setError(error.toString());
      } finally {
        setLoading(false);
      }
    }

    getPost();
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

  if (posts.media === null) {
    posts.media = "";
  }

  return (
    <>
      <div className={styles.specificPostContainer}>
        <div className={styles.specificPostContent}>
          <Image
            src={posts.media}
            alt={posts.title}
            className={styles.specificPostImage}
            onError={(event) => {
              event.target.src =
                "https://i.seadn.io/gae/OGpebYaykwlc8Tbk-oGxtxuv8HysLYKqw-FurtYql2UBd_q_-ENAwDY82PkbNB68aTkCINn6tOhpA8pF5SAewC2auZ_44Q77PcOo870?auto=format&w=1000";
              event.onerror = null;
            }}
          />
          <div className={styles.specificPostAuthor}>
            <p>Visit profile: </p>
            <Link
              to={`/profile/${author.name}`}
              className={styles.specificPostAuthorLink}
            >
              {author.name}
            </Link>
          </div>
          <Heading title={posts.title} />
          <p className={styles.specificPostBody}>{posts.body}</p>
        </div>
        <div className={styles.specificReactionContainer}>
          {reactions.map((reaction, index) => {
            return (
              <div key={index} className={styles.specificReactionContent}>
                {reaction.symbol}
                {reaction.count}
              </div>
            );
          })}
        </div>
        <div className={styles.specificCommentContainer}>
          <h4>Comments</h4>
          {comments.map((comment) => {
            if (comment.author.avatar === null) {
              comment.author.avatar = "";
            }

            return (
              <div key={comment.id}>
                <Link
                  to={`/profile/${comment.owner}`}
                  className={styles.specificCommentLink}
                >
                  <Image
                    roundedCircle
                    src={comment.author.avatar}
                    alt={comment.author.name}
                    className={styles.specificCommentAvatar}
                    onError={(event) => {
                      event.target.src =
                        "https://cdn.landesa.org/wp-content/uploads/default-user-image.png";
                      event.onerror = null;
                    }}
                  ></Image>{" "}
                  {comment.owner}
                </Link>
                : {comment.body}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
