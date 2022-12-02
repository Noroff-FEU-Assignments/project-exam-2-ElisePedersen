import { React, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import useAxios from "../../hooks/useAxios";
import styles from "./ProfileInfo.module.css";
import Image from "react-bootstrap/Image";
import ProfileFollow from "./ProfileFollow";
import ProfileUnfollow from "./ProfileUnfollow";
import LoadingSpinner from "../common/LoadingSpinner";
import { useForm } from "react-hook-form";

export default function ProfileInfo() {
  const [profile, setProfile] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [followProfile, setFollowProfile] = useState([]);

  const { handleSubmit } = useForm();

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

  async function onSubmit(data) {
    try {
      const response = await http.put(`social/profiles/${name}/unfollow`);
      console.log("response", response.data);
      setFollowProfile(<ProfileUnfollow />);
    } catch (error) {
      setError(error.toString());
      return alert("User already exists");
    }
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
          <div onSubmit={handleSubmit(onSubmit)}>
            {followProfile ? <ProfileUnfollow /> : <ProfileFollow />}
          </div>

          {/* <ProfileFollow />
          <ProfileUnfollow /> */}
          {/* Bare vise en om gangen. i utgangspunktet må den jo være follow, også endre på useffect */}
          {/* {following ? <ProfileFollow /> : <ProfileUnfollow />} */}
        </div>
      </div>
    </div>
  );
}
