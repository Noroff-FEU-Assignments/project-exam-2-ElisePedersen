import { React, useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import useAxios from "../../hooks/useAxios";
import styles from "./Post.module.css";
import Heading from "../layout/Heading.js";
import { Image } from "react-bootstrap";

export default function Post() {
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState([]);

  let { id } = useParams();

  const http = useAxios();

  useEffect(function () {
    async function getPost() {
      try {
        const response = await http.get(
          `social/posts/${id}?_author=true&_comments=true&_reactions=true`
        );
        console.log("response", response);
        setPosts(response.data);
        setComments(response.data.comments);
      } catch (error) {
        console.log(error.response.data.status);
      }
    }

    getPost();
    // eslint-disable-next-line
  }, []);

  return (
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
        <div>
          <Heading title={posts.title} />
          <div>
            <p>{posts.body}</p>
          </div>
        </div>
      </div>
      <div className={styles.specificCommentContainer}>
        {comments.map((comment) => {
          return (
            <div key={comment.id}>
              <Link
                to={`/profile/${comment.owner}`}
                className={styles.specificCommentLink}
              >
                <Image
                  src={comment.author.avatar}
                  className={styles.specificCommentAvatar}
                ></Image>{" "}
                {comment.owner}
              </Link>
              : {comment.body}
            </div>
          );
        })}
      </div>
      {/* <Tabs>
        <Tab eventKey="comment" title="Comment">
          <PostComment />
        </Tab>
      </Tabs> */}
    </div>
  );
}
