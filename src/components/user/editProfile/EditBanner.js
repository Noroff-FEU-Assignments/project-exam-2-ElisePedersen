import Heading from "../../layout/Heading";
import { React, useState, useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate, useParams } from "react-router-dom";
import FormError from "../../common/FormError";
import useAxios from "../../../hooks/useAxios";
import styles from "./EditBanner.module.css";

const schema = yup.object().shape({
  banner: yup.string(),
});

export default function EditBanner() {
  const [banner, setBanner] = useState(null);
  const [updated, setUpdated] = useState(false);
  const [fetchingBanner, setFetchingBanner] = useState(true);
  const [updatingBanner, setUpdatingBanner] = useState(false);
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
    async function getBanner() {
      try {
        const response = await http.get(url);
        console.log("response", response.data);

        document.title = `Edit banner - ${response.data.name}`;

        if (response.data.banner === null) {
          response.data.banner = "";
        }

        setBanner(response.data);
      } catch (error) {
        console.log(error.response.data.status);
        setFetchError(error.toString());
      } finally {
        setFetchingBanner(false);
      }
    }

    getBanner();
    // eslint-disable-next-line
  }, []);

  const bannerUrl = url + "/media";

  async function onSubmit(data) {
    setUpdatingBanner(true);
    setUpdateError(null);
    setUpdated(false);

    console.log(data);

    try {
      const response = await http.put(bannerUrl, data);
      console.log("response", response.data);
      setUpdated(true);
      history(`/user/${name}`);
    } catch (error) {
      console.log("error", error);
      setUpdateError(error.toString());
    } finally {
      setUpdatingBanner(false);
    }
  }

  if (fetchingBanner) return <div>Loading...</div>;

  if (fetchError) return <div>Error loading avatar</div>;
  return (
    <>
      <Heading title="Edit banner" />

      <div
        style={{
          backgroundImage: `url('${banner.banner}' )`,
          backgroundColor: "lightgray",
          height: 200,
        }}
      ></div>

      <Form onSubmit={handleSubmit(onSubmit)} className={styles.editBannerForm}>
        {updated && <div>The banner was updated</div>}
        {/* få in styles på diven over SUCCESS, og på alle andre success. eller redirect to user page */}

        {updateError && <FormError>{updateError}</FormError>}
        <fieldset disabled={updatingBanner}>
          <Form.Group className="mb-3" controlId="banner">
            <Form.Label>Banner url</Form.Label>
            <Form.Control
              name="banner"
              type="text"
              defaultValue={banner.banner}
              {...register("banner")}
            />
            {errors.banner && <FormError>{errors.banner.message}</FormError>}
          </Form.Group>

          <Button
            variant="primary"
            type="submit"
            className={styles.changeProfileButton}
          >
            {updatingBanner ? "Updating..." : "Update banner"}
          </Button>
        </fieldset>
      </Form>
    </>
  );
}
