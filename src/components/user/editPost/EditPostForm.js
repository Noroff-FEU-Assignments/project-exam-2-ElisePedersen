import { React, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DeletePost from "./DeletePost.js";
// import { useForm } from "react-hook-form";
// import * as yup from "yup";
// import { yupResolver } from "@hookform/resolvers/yup";
// import Form from "react-bootstrap/Form";
// import Button from "react-bootstrap/Button";
// import FormError from "../common/FormError";
import useAxios from "../../../hooks/useAxios";

// const schema = yup.object().shape({
//   title: yup.string().required("Please insert a title"),
//   image: yup.string().required("Please insert an image url"),
// });

export default function EditPostForm() {
  //   const [submitting, setSubmitting] = useState(false);
  // const [editError, setEditError] = useState(null);
  const [edit, setEdit] = useState([]);

  //   const {
  //     register,
  //     handleSubmit,
  //     formState: { errors },
  //   } = useForm({
  //     resolver: yupResolver(schema),
  //   });

  let { id } = useParams();
  const http = useAxios();

  useEffect(function () {
    async function editPost(data) {
      try {
        const response = await http.get(`social/posts/${id}`);
        console.log("response", response.data);
        if (response) {
          setEdit(response.data);
        }

        //return alert ("Post is updated")
      } catch (error) {
        console.log(error.response.data.status);
        // setEditError(error);
      } finally {
        //   setSubmitting(false);
      }
    }

    editPost();
  });

  return (
    <>
      <div>
        <h2>{edit.title}</h2>

        <img src={edit.media} alt={edit.title}></img>
      </div>
      <DeletePost id={edit.id} />
      {/* <Form onSubmit={handleSubmit(editPost)}>
        {editError && <FormError>{editError}</FormError>}
        <fieldset disabled={submitting}>
          <Form.Group className="mb-3" controlId="title">
            <Form.Label>Title</Form.Label>
            <Form.Control name="title" type="text" {...register("title")} />
            {errors.title && <FormError>{errors.title.message}</FormError>}
          </Form.Group>

          <Form.Group className="mb-3" controlId="image">
            <Form.Label>Image url:</Form.Label>
            <Form.Control name="image" {...register("image")} />
            {errors.image && <FormError>{errors.image.message}</FormError>}
          </Form.Group>

          <Button variant="primary" type="submit">
            {submitting ? "Publishing..." : "Publish"}
          </Button>
        </fieldset>
      </Form> */}
    </>
  );
}
