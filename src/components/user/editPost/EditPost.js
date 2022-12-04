import Heading from "../../layout/Heading";
import { React, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import DeletePost from "./DeletePost.js";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import FormError from "../../common/FormError";
import useAxios from "../../../hooks/useAxios";
import { Button, Form, Image } from "react-bootstrap";
import styles from "./EditPost.module.css";
import LoadingSpinner from "../../common/LoadingSpinner";

const schema = yup.object().shape({
  title: yup.string().required("Please insert a title"),
  body: yup.string(),
  tags: yup.string(),
  image: yup.string().required("Please insert an image url"),
});

export default function EditPost() {
  const [edit, setEdit] = useState(null);
  const [updated, setUpdated] = useState(false);
  const [fetchingPost, setFetchingPost] = useState(true);
  const [updatingPost, setUpdatingPost] = useState(false);
  const [fetchError, setFetchError] = useState(null);
  const [updateError, setUpdateError] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  let { id } = useParams();
  const http = useAxios();
  const history = useNavigate();

  useEffect(function () {
    async function editPost(data) {
      try {
        const response = await http.get(`social/posts/${id}`);
        console.log("response", response.data);
        setEdit(response.data);
      } catch (error) {
        console.log(error.response.data.status);
        setFetchError(error);
      } finally {
        setFetchingPost(false);
      }
    }

    editPost();
    // eslint-disable-next-line
  }, []);

  if (fetchingPost) {
    return (
      <div>
        <LoadingSpinner />
      </div>
    );
  }

  if (fetchError) {
    return <div>Ops, something went wrong</div>;
  }

  async function onSubmit(data) {
    setUpdatingPost(true);
    setUpdateError(null);
    setUpdated(false);

    const formData = {
      title: data.title,
      body: data.body,
      tags: data.tags.split(" "),
      media: data.image,
    };

    try {
      const response = await http.put(`social/posts/${id}`, formData);
      console.log("response", response.data);
      setUpdated(true);
      history(`/post/${id}`);
    } catch (error) {
      console.log(error);
      setUpdateError(error.toString());
    } finally {
      setUpdatingPost(false);
    }
  }

  return (
    <>
      <Heading title="Edit post" />
      <div className={styles.editPostContainer}>
        <div className={styles.editPostContent}>
          <Image src={edit.media} alt={edit.title}></Image>
          <h2>{edit.title}</h2>
          <p>{edit.body}</p>
        </div>

        <Form onSubmit={handleSubmit(onSubmit)} className={styles.editPostForm}>
          {updated && <div>The post was updated</div>}
          {updateError && <FormError>Could not update post</FormError>}
          <fieldset disabled={updatingPost}>
            <Form.Group className="mb-3" controlId="image">
              <Form.Label>Image url:</Form.Label>
              <Form.Control
                // as="textarea"
                // rows={3}
                name="image"
                type="text"
                defaultValue={edit.media}
                {...register("image")}
              />
              {errors.image && <FormError>{errors.image.message}</FormError>}
            </Form.Group>

            <Form.Group className="mb-3" controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control
                name="title"
                type="text"
                defaultValue={edit.title}
                {...register("title")}
              />
              {errors.title && <FormError>{errors.title.message}</FormError>}
            </Form.Group>

            <Form.Group className="mb-3" controlId="body">
              <Form.Label>Body</Form.Label>
              <Form.Control
                as="textarea"
                name="body"
                rows={3}
                defaultValue={edit.body}
                {...register("body")}
              />
              {errors.body && <FormError>{errors.body.message}</FormError>}
            </Form.Group>

            <Form.Group className="mb-3" controlId="tags">
              <Form.Label>Tags</Form.Label>
              <Form.Control
                name="tags"
                type="text"
                defaultValue={edit.tags}
                {...register("tags")}
              />
              {errors.tags && <FormError>{errors.tags.message}</FormError>}
            </Form.Group>

            <Button
              variant="primary"
              type="submit"
              className={styles.editPostButton}
            >
              {updatingPost ? "Updating..." : "Edit post"}
            </Button>
          </fieldset>
          <DeletePost id={edit.id} />
        </Form>
      </div>
    </>
  );
}
