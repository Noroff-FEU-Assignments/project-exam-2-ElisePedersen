import { React, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import useAxios from "../../hooks/useAxios";
import styles from "./ProfileInfo.module.css";
import Image from "react-bootstrap/Image";
import ProfileFollow from "./ProfileFollow";
import ProfileUnfollow from "./ProfileUnfollow";
import LoadingSpinner from "../common/LoadingSpinner";

export default function ProfileInfo() {
  const [profile, setProfile] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [followProfile, setFollowProfile] = useState([]);

  let { name } = useParams();
  const http = useAxios();

  useEffect(function () {
    async function getProfile() {
      try {
        const response = await http.get(`social/profiles/${name}`);
        console.log("response", response);
        setProfile(response.data);
        document.title = `${response.data.name}`;
        setFollowProfile(<ProfileFollow />);
      } catch (error) {
        setError(error.toString());
      } finally {
        setLoading(false);
      }
    }

    getProfile();
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

  if (profile.avatar === null) {
    profile.avatar = "";
  }
  // const isFollowing = followers.map((follow) => {
  //   return follow.name;
  // });

  // const iFollow = isFollowing.includes(auth.name);

  return (
    <div>
      <div
        style={{
          backgroundImage: `url('${profile.banner}' )`,
          backgroundColor: "lightgray",
          height: 200,
          backgroundSize: "cover",
          backgroundPositionY: "center",
        }}
      ></div>
      <div className={styles.profileContainer}>
        <Image
          roundedCircle
          src={profile.avatar}
          alt={profile.name}
          onError={(event) => {
            event.target.src =
              "https://cdn.landesa.org/wp-content/uploads/default-user-image.png";
            event.onerror = null;
          }}
        />
        <div className={styles.profileInfo}>
          <h1>{profile.name}</h1>
          {followProfile ? <ProfileFollow /> : <ProfileUnfollow />}
          {/* <ProfileFollow />
          <ProfileUnfollow /> */}
          {/* Bare vise en om gangen. i utgangspunktet må den jo være follow, også endre på useffect */}
          {/* {following ? <ProfileFollow /> : <ProfileUnfollow />} */}
        </div>
      </div>
    </div>
  );
}
