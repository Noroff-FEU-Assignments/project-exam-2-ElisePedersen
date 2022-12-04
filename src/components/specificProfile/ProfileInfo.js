import { React, useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import useAxios from "../../hooks/useAxios";
import styles from "./ProfileInfo.module.css";
import ProfileFollow from "./ProfileFollow";
import ProfileUnfollow from "./ProfileUnfollow";
import LoadingSpinner from "../common/LoadingSpinner";
import AuthContext from "../../context/AuthContext";
import Heading from "../layout/Heading";

export default function ProfileInfo() {
  const [profile, setProfile] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [, setFollowProfile] = useState([]);
  const [isFollowing, setIsFollowing] = useState([]);

  const [auth] = useContext(AuthContext);

  let { name } = useParams();
  const http = useAxios();

  useEffect(function () {
    async function getProfile() {
      try {
        const response = await http.get(
          `social/profiles/${name}?_following=true&_followers=true`
        );
        console.log("response", response);
        setProfile(response.data);
        setFollowProfile(response.data.followers);
        checkIfFollowing(response.data.followers);
      } catch (error) {
        setError(error.toString());
      } finally {
        setLoading(false);
      }
    }

    getProfile();
    // eslint-disable-next-line
  }, []);

  function checkIfFollowing(followers) {
    if (followers.some((profile) => profile.name === auth.name)) {
      setIsFollowing(true);
    } else {
      setIsFollowing(false);
    }
  }

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

  if (profile.avatar === null || profile.avatar === "") {
    profile.avatar =
      "https://cdn.landesa.org/wp-content/uploads/default-user-image.png";
  }

  return (
    <div>
      <div
        className={styles.profileBanner}
        style={{
          backgroundImage: `url('${profile.banner}' )`,
          backgroundColor: "lightgray",
          height: 150,
          backgroundSize: "cover",
          backgroundPositionY: "center",
        }}
      ></div>

      <div className={styles.profileContainer}>
        <div
          className={styles.profileAvatar}
          style={{
            backgroundImage: `url('${profile.avatar}' )`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPositionY: "center",
          }}
        ></div>
        <div className={styles.profileInfo}>
          <Heading title={profile.name} />
          {isFollowing ? (
            <ProfileUnfollow setIsFollowing={setIsFollowing} />
          ) : (
            <ProfileFollow setIsFollowing={setIsFollowing} />
          )}
        </div>
      </div>
    </div>
  );
}
