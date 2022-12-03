import { React, useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import useAxios from "../../hooks/useAxios";
import styles from "./ProfileInfo.module.css";
import Image from "react-bootstrap/Image";
import ProfileFollow from "./ProfileFollow";
import ProfileUnfollow from "./ProfileUnfollow";
import LoadingSpinner from "../common/LoadingSpinner";
import { useForm } from "react-hook-form";
import { Button, Form } from "react-bootstrap";
import AuthContext from "../../context/AuthContext";

export default function ProfileInfo() {
  const [profile, setProfile] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [followProfile, setFollowProfile] = useState([]);

  const [auth] = useContext(AuthContext);
  // const { handleSubmit } = useForm();

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
        document.title = `${response.data.name}`;
        setFollowProfile(response.data.followers);
        console.log(response.data.followers);
      } catch (error) {
        setError(error.toString());
      } finally {
        setLoading(false);
      }
    }

    getProfile();
    // eslint-disable-next-line
  }, []);

  async function FollowingToggle() {
    followProfile.map((follow) => {
      if (follow.name === auth.name) {
        <ProfileUnfollow />;
      } else {
        <ProfileFollow />;
      }
      return <></>;
    });
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

  if (profile.avatar === null) {
    profile.avatar = "";
  }

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
          <ProfileFollow onClick={FollowingToggle} />

          {/* <ProfileFollow />
          <ProfileUnfollow /> */}
          {/* Bare vise en om gangen. i utgangspunktet må den jo være follow, også endre på useffect */}
          {/* {following ? <ProfileFollow /> : <ProfileUnfollow />} */}
        </div>
      </div>
    </div>
  );
}
