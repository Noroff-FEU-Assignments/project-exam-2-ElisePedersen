import { React, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import useAxios from "../../hooks/useAxios";
import styles from "./UserInformation.module.css";
import ChangeBanner from "./ChangeBanner";
import ChangeAvatar from "./ChangeAvatar";

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

        if (user.banner === null) {
          //user.banner = "";
          //response.data.banner = "";
          //Do something
        }

        if (!user.avatar) {
          //Do something
        }
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
        className={styles.banner}
        style={{
          backgroundImage: `url('${user.banner}' )`,

          height: 200,
        }}
      ></div>
      <div className={styles.userContainer}>
        <img src={user.avatar} alt={user.name}></img>
        <div className={styles.userInfo}>
          <h1 className={styles.userHeading}>{user.name}</h1>
          <ChangeBanner />
          <ChangeAvatar />
        </div>
      </div>
    </div>
  );
}
