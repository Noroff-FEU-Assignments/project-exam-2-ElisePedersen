import Heading from "../../layout/Heading";
import { React, useState, useEffect } from "react";
import { Button, Form, Image } from "react-bootstrap";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate, useParams } from "react-router-dom";
import FormError from "../../common/FormError";
import useAxios from "../../../hooks/useAxios";
import styles from "./EditAvatar.module.css";

const schema = yup.object().shape({
  avatar: yup.string(),
});

export default function EditAvatar() {
  const [avatar, setAvatar] = useState(null);
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

        document.title = `Edit avatar - ${response.data.name}`;

        if (response.data.avatar === null) {
          response.data.avatar = "";
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

    console.log(data);

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

  if (fetchingAvatar) return <div>Loading...</div>;

  if (fetchError) return <div>Error loading avatar</div>;

  return (
    <>
      <Heading title="Edit avatar" />
      <div className={styles.editAvatarContainer}>
        <Image
          src={avatar.avatar}
          alt={avatar.avatar}
          className={styles.editAvatarImage}
        ></Image>
        <Form
          onSubmit={handleSubmit(onSubmit)}
          className={styles.editAvatarForm}
        >
          {updated && <div>The avatar was updated</div>}
          {/* få in styles på diven over SUCCESS, og på alle andre success. eller redirect to user page */}

          {updateError && <FormError>{updateError}</FormError>}
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
              className={styles.changeProfileButton}
            >
              {updatingAvatar ? "Updating..." : "Update avatar"}
            </Button>
          </fieldset>
        </Form>
      </div>
    </>
  );
}
