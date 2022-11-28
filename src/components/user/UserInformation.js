import { React, useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import useAxios from "../../hooks/useAxios";
import styles from "./UserInformation.module.css";

export default function UserInformation() {
  const [user, setUser] = useState([]);

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
        console.log(error.response.data.status);
      }
    }

    getUser();
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <div
        style={{
          backgroundImage: `url('${user.banner}' )`,
          backgroundColor: "lightgray",
          height: 200,
        }}
      ></div>
      <div className={styles.userInfoContainer}>
        <img src={user.avatar} alt={user.name}></img>
        <div className={styles.userInfoContent}>
          <h1 className={styles.userInfoHeading}>{user.name}</h1>
          <div className={styles.userInfoLink}>
            <Link to={`/user/edit-banner/${user.name}`}>
              <Button className={styles.userInfoButton}>Change banner</Button>
            </Link>
            <Link to={`/user/edit-avatar/${user.name}`}>
              <Button className={styles.userInfoButton}>Change avatar</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
