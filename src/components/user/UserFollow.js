import { React, useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import useAxios from "../../hooks/useAxios";
import { ListGroup } from "react-bootstrap";
import styles from "./UserFollow.module.css";

export default function UserFollowing() {
  const [following, setFollowing] = useState([]);
  // const [count, setCount] = useState([]);

  let { name } = useParams();

  const http = useAxios();

  useEffect(function () {
    async function getUserFollowing() {
      try {
        const response = await http.get(
          `social/profiles/${name}?_posts=true&_following=true&_followers=true`
        );
        console.log("response", response.data);
        setFollowing(response.data.following);
        // setCount(response.data);
      } catch (error) {
        console.log(error.response.data.status);
      }
    }

    getUserFollowing();
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <h2 className={styles.followingHeading}>Profiles you follow</h2>
      {/* {count._count.posts} */}
      <div className={styles.userPostContainer}>
        {following.map((follow) => {
          return (
            <div key={follow.id} className={styles.userPost}>
              <Link
                to={`/profiles/${follow.id}`}
                className={styles.userPostLink}
              >
                <ListGroup>
                  <ListGroup.Item className={styles.userPostContent}>
                    <img src={follow.media} alt={follow.title} />
                    <p>{follow.title}</p>
                  </ListGroup.Item>
                </ListGroup>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}
