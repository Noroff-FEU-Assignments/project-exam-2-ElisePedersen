import { React, useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import useAxios from "../../hooks/useAxios";
import { Card } from "react-bootstrap";
import styles from "./UserFollow.module.css";
import LoadingSpinner from "../common/LoadingSpinner";

export default function UserFollowing() {
  const [following, setFollowing] = useState([]);
  const [count, setCount] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
        setCount(response.data._count.following.toString());
      } catch (error) {
        setError(error.toString());
      } finally {
        setLoading(false);
      }
    }

    getUserFollowing();
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
      <h2 className={styles.userFollowHeading}>
        Profiles you follow - {count}
      </h2>

      <div className={styles.userFollowContainer}>
        {following.map((follow) => {
          if (follow.avatar === null || follow.avatar === "") {
            follow.avatar =
              "https://cdn.landesa.org/wp-content/uploads/default-user-image.png";
          }
          return (
            <div key={follow.name} className={styles.userFollowContent}>
              <Card className={styles.userFollowCard}>
                <Link
                  to={`/profile/${follow.name}`}
                  className={styles.userFollowLink}
                >
                  <div
                    className={styles.userFollowImg}
                    style={{
                      backgroundImage: `url('${follow.avatar}' )`,
                      backgroundSize: "cover",
                      backgroundRepeat: "no-repeat",
                      backgroundPositionY: "center",
                    }}
                  ></div>
                </Link>
                <Card.Body className={styles.userFollowBody}>
                  <Card.Title className={styles.userFollowTitle}>
                    <p>{follow.name}</p>
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
