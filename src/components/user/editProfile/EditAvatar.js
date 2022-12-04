import Heading from "../../layout/Heading";
import { React, useState, useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate, useParams } from "react-router-dom";
import FormError from "../../common/FormError";
import useAxios from "../../../hooks/useAxios";
import styles from "./EditAvatar.module.css";
import LoadingSpinner from "../../common/LoadingSpinner";

const schema = yup.object().shape({
  avatar: yup.string(),
});

export default function EditAvatar() {
  const [avatar, setAvatar] = useState();
  const [updated, setUpdated] = useState(false);
  const [fetchingAvatar, setFetchingAvatar] = useState(true);
  const [updatingAvatar, setUpdatingAvatar] = useState(false);
  const [fetchError, setFetchError] = useState(null);
  const [updateError, setUpdateError] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  let { name } = useParams();

  const http = useAxios();

  const history = useNavigate();

  const url = `social/profiles/${name}`;

  useEffect(function () {
    async function getAvatar() {
      try {
        const response = await http.get(url);
        console.log("response", response.data);

        if (response.data.avatar === null || response.data.avatar === "") {
          response.data.avatar =
            "https://cdn.landesa.org/wp-content/uploads/default-user-image.png";
        }
        setAvatar(response.data);
      } catch (error) {
        console.log(error.response.data.status);
        setFetchError(error.toString());
      } finally {
        setFetchingAvatar(false);
      }
    }

    getAvatar();
    // eslint-disable-next-line
  }, []);

  const avatarUrl = url + "/media";

  async function onSubmit(data) {
    setUpdatingAvatar(true);
    setUpdateError(null);
    setUpdated(false);

    try {
      const response = await http.put(avatarUrl, data);
      console.log("response", response.data);
      setUpdated(true);
      history(`/user/${name}`);
    } catch (error) {
      console.log("error", error);
      setUpdateError(error.toString());
    } finally {
      setUpdatingAvatar(false);
    }
  }

  if (fetchingAvatar) {
    return (
      <div>
        <LoadingSpinner />
      </div>
    );
  }

  if (fetchError) return <div>Error loading avatar</div>;

  return (
    <>
      <Heading title="Edit avatar" />
      <div className={styles.editAvatarContainer}>
        <div
          className={styles.editAvatarImage}
          style={{
            backgroundImage: `url('${avatar.avatar}' )`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPositionY: "center",
          }}
        ></div>
        <Form
          onSubmit={handleSubmit(onSubmit)}
          className={styles.editAvatarForm}
        >
          {updated}
          {updateError && (
            <FormError>Avatar must be a valid URL link</FormError>
          )}
          <fieldset disabled={updatingAvatar}>
            <Form.Group className="mb-3" controlId="avatar">
              <Form.Label>Avatar url</Form.Label>
              <Form.Control
                name="avatar"
                type="text"
                defaultValue={avatar.avatar}
                {...register("avatar")}
              />
              {errors.avatar && <FormError>{errors.avatar.message}</FormError>}
            </Form.Group>

            <Button
              variant="primary"
              type="submit"
              className={styles.editAvatarButton}
            >
              {updatingAvatar ? "Updating..." : "Update avatar"}
            </Button>
          </fieldset>
        </Form>
      </div>
    </>
  );
}
