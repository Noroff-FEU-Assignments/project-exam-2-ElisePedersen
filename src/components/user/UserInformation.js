import { React, useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import useAxios from "../../hooks/useAxios";
import styles from "./UserInformation.module.css";
import Logout from "./Logout";
import LoadingSpinner from "../common/LoadingSpinner";
import Heading from "../layout/Heading";

export default function UserInformation() {
  const [user, setUser] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  let { name } = useParams();

  const http = useAxios();

  useEffect(function () {
    async function getUser() {
      try {
        const response = await http.get(`social/profiles/${name}`);
        console.log("response", response.data);
        setUser(response.data);
        document.title = `${response.data.name}`;

        if (response.data.avatar === null || response.data.avatar === "") {
          response.data.avatar =
            "https://cdn.landesa.org/wp-content/uploads/default-user-image.png";
        }

        // if (response.data.banner === null || response.data.banner === "") {
        //   response.data.banner =
        //     "https://cdn.pixabay.com/photo/2016/10/04/17/12/banner-1714905__340.jpg";
        // }
      } catch (error) {
        setError(error.toString());
      } finally {
        setLoading(false);
      }
    }

    getUser();
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
      <div
        className={styles.userInfoBanner}
        style={{
          backgroundImage: `url('${user.banner}' )`,
          backgroundColor: "lightgray",
          height: 150,
          backgroundSize: "cover",
          backgroundPositionY: "center",
        }}
      ></div>
      <div className={styles.userInfoContainer}>
        <div
          className={styles.userInfoAvatar}
          style={{
            backgroundImage: `url('${user.avatar}' )`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPositionY: "center",
          }}
        ></div>
        <div className={styles.userInfoContent}>
          <Heading title={user.name} />
          <div className={styles.userInfoLink}>
            <Link to={`/user/edit-banner/${user.name}`}>
              <Button className={styles.userInfoButton}>Change banner</Button>
            </Link>
            <Link to={`/user/edit-avatar/${user.name}`}>
              <Button className={styles.userInfoButton}>Change avatar</Button>
            </Link>
            <Logout />
          </div>
        </div>
      </div>
    </div>
  );
}
