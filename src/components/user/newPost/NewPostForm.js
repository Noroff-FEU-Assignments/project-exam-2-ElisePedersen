import { React, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import FormError from "../../common/FormError";

import useAxios from "../../../hooks/useAxios";
import { useNavigate } from "react-router-dom";

const schema = yup.object().shape({
  title: yup.string().required("Please insert a title"),
  image: yup.string().required("Please insert an image url"),
});

export default function NewPostForm() {
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
      media: data.image,
    };

    console.log(formData);

    try {
      const response = await http.post(`social/posts`, formData);
      console.log("response", response.data);
      //return alert ("Post is published")
      history(`/user/${user.name}`);
    } catch (error) {
      console.log("error", error);
      setPostError(error.response.data.status);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      <Form onSubmit={handleSubmit(createPost)}>
        {postError && <FormError>{postError}</FormError>}
        <fieldset disabled={submitting}>
          <Form.Group className="mb-3" controlId="title">
            <Form.Label>Title</Form.Label>
            <Form.Control name="title" type="text" {...register("title")} />
            {errors.title && <FormError>{errors.title.message}</FormError>}
          </Form.Group>

          <Form.Group className="mb-3" controlId="image">
            <Form.Label>Image url:</Form.Label>
            <Form.Control name="image" type="text" {...register("image")} />
            {errors.image && <FormError>{errors.image.message}</FormError>}
          </Form.Group>

          <Button variant="primary" type="submit">
            {submitting ? "Publishing..." : "Publish"}
          </Button>
        </fieldset>
      </Form>
    </>
  );
}
