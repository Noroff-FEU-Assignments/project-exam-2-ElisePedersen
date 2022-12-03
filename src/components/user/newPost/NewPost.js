import Heading from "../../layout/Heading";
import { React, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import FormError from "../../common/FormError";
import useAxios from "../../../hooks/useAxios";
import { useNavigate } from "react-router-dom";
import styles from "./NewPost.module.css";

const schema = yup.object().shape({
  title: yup.string().required("Please insert a title"),
  body: yup.string(),
  tags: yup.string(),
  image: yup.string(),
});

export default function NewPost() {
  const [submitting, setSubmitting] = useState(false);
  const [postError, setPostError] = useState(null);
  const user = JSON.parse(localStorage.getItem("auth"));

  const history = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const http = useAxios();

  async function createPost(data) {
    setSubmitting(true);
    setPostError(null);
    console.log(data);

    const formData = {
      title: data.title,
      body: data.body,
      tags: data.tags.split(" "),
      media: data.image,
    };

    console.log(formData);

    try {
      const response = await http.post(`social/posts`, formData);
      console.log("response", response.data);
      //return alert ("Post is published")
      document.title = `${response.data.name}`;

      history(`/user/${user.name}`);
    } catch (error) {
      setPostError(error.toString());
    } finally {
      setSubmitting(false);
    }
  }
  return (
    <div className={styles.newPostContainer}>
      <Heading title="Create new post" />
      <Form onSubmit={handleSubmit(createPost)} className={styles.newPostForm}>
        {postError && <FormError>{postError}</FormError>}
        <fieldset disabled={submitting}>
          <Form.Group className="mb-3" controlId="image">
            <Form.Label>Image url:</Form.Label>
            <Form.Control name="image" type="text" {...register("image")} />
            {errors.image && <FormError>{errors.image.message}</FormError>}
          </Form.Group>

          <Form.Group className="mb-3" controlId="title">
            <Form.Label>Title</Form.Label>
            <Form.Control name="title" type="text" {...register("title")} />
            {errors.title && <FormError>{errors.title.message}</FormError>}
          </Form.Group>

          <Form.Group className="mb-3" controlId="body">
            <Form.Label>Body</Form.Label>
            <Form.Control
              as="textarea"
              rows={2}
              name="body"
              {...register("body")}
            />
            {errors.body && <FormError>{errors.body.message}</FormError>}
          </Form.Group>

          <Form.Group className="mb-3" controlId="tags">
            <Form.Label>Tags</Form.Label>
            <Form.Control name="tags" type="text" {...register("tags")} />
            {errors.tags && <FormError>{errors.tags.message}</FormError>}
          </Form.Group>

          <Button
            variant="primary"
            type="submit"
            className={styles.newPostButton}
          >
            {submitting ? "Publishing..." : "Publish"}
          </Button>
        </fieldset>
      </Form>
    </div>
  );
}
