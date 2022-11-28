import { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate, useParams } from "react-router-dom";
import useAxios from "../../hooks/useAxios";
import FormError from "../common/FormError";
import { Button, Form } from "react-bootstrap";
import styles from "./PostComment.module.css";

const schema = yup.object().shape({
  message: yup.string().required("Please enter your message"),
  replyToId: yup.number(),
});

export default function PostComment() {
  const [comment, setComment] = useState();
  const [submitting, setSubmitting] = useState(false);
  const [commentError, setCommentError] = useState(null);

  let { id } = useParams();
  const http = useAxios();

  const history = useNavigate();

  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  async function Comment(data) {
    setSubmitting(true);
    setCommentError(null);
    //??

    const formData = {
      body: data.message,
      replyToId: data.replyToId,
    };

    try {
      const response = await http.post(
        `social/posts/${id}/comment`,
        JSON.stringify(formData)
      );

      setComment(response.data);
      history(0);
    } catch (error) {
      console.log("error", error);
      setCommentError(error.toString());
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Form onSubmit={handleSubmit(Comment)}>
      {comment && <div>Your comment was successful</div>}
      {commentError && <FormError>{commentError}</FormError>}
      <fieldset disabled={submitting}>
        <Form.Group className="mb-3" controlId="message">
          <Form.Label>Message</Form.Label>
          <Form.Control
            as="textarea"
            name="message"
            rows={3}
            {...register("message")}
          />
        </Form.Group>
        {errors.message && <FormError>{errors.message.message}</FormError>}

        <Button
          variant="primary"
          type="submit"
          className={styles.postCommentButton}
        >
          {submitting ? "Commenting..." : "Comment"}
        </Button>
      </fieldset>
    </Form>
  );
}
