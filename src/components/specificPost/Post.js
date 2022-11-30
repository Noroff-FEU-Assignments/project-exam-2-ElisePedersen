import { React, useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import useAxios from "../../hooks/useAxios";
import styles from "./Post.module.css";
import Heading from "../layout/Heading.js";
import { Image } from "react-bootstrap";

export default function Post() {
  const [author, setAuthor] = useState([]);
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState([]);
  const [reactions, setReactions] = useState([]);

  let { id } = useParams();

  const http = useAxios();

  useEffect(function () {
    async function getPost() {
      try {
        const response = await http.get(
          `social/posts/${id}?_author=true&_comments=true&_reactions=true`
        );
        console.log("response", response);

        setAuthor(response.data.author);
        console.log(response.data.author);
        setPosts(response.data);
        setComments(response.data.comments);
        setReactions(response.data.reactions);
      } catch (error) {
        console.log(error.response.data.status);
      }
    }

    getPost();
    // eslint-disable-next-line
  }, []);

  return (
    <div className={styles.specificPostContainer}>
      {/* <div className={styles.specificAuthorContainer}>
        {posts.values(author).map((name) => {
          return <div key={author.name}>{author.name}</div>;
        })}
      </div> */}

      {/* <div>
        {author.map((user) => {
          return <div key={user.name}>{user.name}</div>;
        })}
      </div> */}
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
          {/* <Link to={`/profile/${posts.author.name}`}>{posts.author.name}</Link> */}
          <div>
            <p>{posts.body}</p>
          </div>
        </div>
      </div>
      <div className={styles.specificReactionContainer}>
        {reactions.map((reaction) => {
          return (
            <div key={reaction.id} className={styles.specificReactionContent}>
              {reaction.symbol}
              {reaction.count}
            </div>
          );
        })}
        {/* reaction har ingen unique key jeg kan legge til. har bare count, symbol og postId. skal jeg bare slette hele key greien? */}
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
      {/* style emojiene fint */}
      {/* <Tabs>
        <Tab eventKey="comment" title="Comment">
          <PostComment />
        </Tab>
      </Tabs> */}
    </div>
  );
}
