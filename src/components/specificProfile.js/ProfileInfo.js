import { React, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import useAxios from "../../hooks/useAxios";

import styles from "./ProfileInfo.module.css";
import Image from "react-bootstrap/Image";
import ProfileFollow from "./ProfileFollow";
import ProfileUnfollow from "./ProfileUnfollow";

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
        document.title = `${response.data.name}`;
      } catch (error) {
        console.log(error.response.data.status);
      }
    }

    getProfile();
    // eslint-disable-next-line
  }, []);

  if (profile.avatar === null) {
    profile.avatar = "";
  }
  return (
    <div>
      <Image
        className={styles.banner}
        style={{
          // backgroundColor: "linear-gradient(to left top, #d22f8c, #fc782e)",
          // backgroundImage: "linear-gradient(to left top, #d22f8c, #fc782e)",
          backgroundImage: `url('${profile.banner}' )`,

          height: 200,
        }}
        // onError={(event) => {
        //   event.target.src =
        //     "https://i.seadn.io/gae/OGpebYaykwlc8Tbk-oGxtxuv8HysLYKqw-FurtYql2UBd_q_-ENAwDY82PkbNB68aTkCINn6tOhpA8pF5SAewC2auZ_44Q77PcOo870?auto=format&w=1000";
        //   event.onerror = null;
        // }}
      />
      <div className={styles.profileContainer}>
        <Image
          src={profile.avatar}
          alt={profile.name}
          className={styles.avatar}
          onError={(event) => {
            event.target.src =
              "https://media.istockphoto.com/id/1214428300/vector/default-profile-picture-avatar-photo-placeholder-vector-illustration.jpg?b=1&s=612x612&w=0&k=20&c=IATS1wxpkvh5kuoXceZ40B1UZEDCyfvV93saUjU_mvE=";
            event.onerror = null;
          }}
        />
        <div className={styles.profileInfo}>
          <h1>{profile.name}</h1>
          <ProfileFollow />
          <ProfileUnfollow />
          {/* Bare vise en om gangen. i utgangspunktet må den jo være follow, også endre på useffect */}
          {/* {following ? <ProfileFollow/> : <ProfileUnfollow/>} */}
        </div>
      </div>
    </div>
  );
}
