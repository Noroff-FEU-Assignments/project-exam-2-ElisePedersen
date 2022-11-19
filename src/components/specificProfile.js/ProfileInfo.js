import { React, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import useAxios from "../../hooks/useAxios";
import { Button } from "react-bootstrap";
import styles from "./ProfileInfo.module.css";

export default function ProfileInfo() {
  const [profile, setProfile] = useState([]);

  let { name } = useParams();

  const http = useAxios();

  useEffect(function () {
    async function getProfile() {
      try {
        const response = await http.get(`social/profiles/${name}`);
        console.log("response", response);
        setProfile(response.data);
      } catch (error) {
        console.log(error.response.data.status);
      }
    }

    getProfile();
  });

  return (
    <div>
      <div
        className={styles.banner}
        style={{
          backgroundImage: `url('${profile.banner}' )`,

          height: 200,
        }}
      ></div>
      {/* <img
        src={profile.banner}
        alt={profile.name}
        className={styles.banner}
      ></img> */}
      <div className={styles.profileContainer}>
        <img
          src={profile.avatar}
          alt={profile.name}
          className={styles.avatar}
        ></img>
        <div className={styles.profileInfo}>
          <h1>{profile.name}</h1>
          <Button className={styles.followButton}>Follow user</Button>
        </div>
      </div>
    </div>
  );
}
