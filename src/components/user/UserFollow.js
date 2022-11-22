import { React, useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import useAxios from "../../hooks/useAxios";
import { Card } from "react-bootstrap";
import styles from "./UserFollow.module.css";

export default function UserFollowing() {
  const [following, setFollowing] = useState([]);
  // const [count, setCount] = useState(null);

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
        // setCount(response.data._count.following.toString());
        // console.log(response.data._count.following);
      } catch (error) {
        console.log(error.response.data.status);
      }
    }

    getUserFollowing();
    // eslint-disable-next-line
  }, []);
  // console.log(count._count.following);

  return (
    <div>
      <h2 className={styles.userFollowHeading}>Profiles you follow</h2>
      {/* {count._count} */}

      <div className={styles.userFollowContainer}>
        {following.map((follow) => {
          if (follow.avatar === null) {
            follow.avatar = "";
          }
          return (
            <div key={follow.name} className={styles.userFollowContent}>
              <Card className={styles.userFollowCard}>
                <Link
                  to={`/profile/${follow.name}`}
                  className={styles.userFollowLink}
                >
                  <Card.Img
                    variant="top"
                    src={follow.avatar}
                    alt={follow.name}
                    className={styles.userFollowImg}
                    onError={(event) => {
                      event.target.src =
                        "https://media.istockphoto.com/id/1214428300/vector/default-profile-picture-avatar-photo-placeholder-vector-illustration.jpg?b=1&s=612x612&w=0&k=20&c=IATS1wxpkvh5kuoXceZ40B1UZEDCyfvV93saUjU_mvE=";
                      event.onerror = null;
                    }}
                  ></Card.Img>
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
