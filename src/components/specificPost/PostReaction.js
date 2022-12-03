import { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate, useParams } from "react-router-dom";
import useAxios from "../../hooks/useAxios";
import { Button, Form } from "react-bootstrap";
import styles from "./PostReaction.module.css";
import FormError from "../common/FormError";

const schema = yup.object().shape({
  symbol: yup.string().required("Please select an emoji"),
});

export default function PostReaction() {
  const [reaction, setReaction] = useState();
  const [submitting, setSubmitting] = useState(false);
  const [reactionError, setReactionError] = useState(null);
  const [symbol, setSymbol] = useState();

  let { id } = useParams();
  const http = useAxios();
  const history = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  async function Reaction() {
    setSubmitting(true);
    setReactionError(null);
    try {
      const response = await http.put(`social/posts/${id}/react/${symbol}`);
      setReaction(response.data);
      history(0);
    } catch (error) {
      setReactionError(error.toString());
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Form
      onSubmit={handleSubmit(Reaction)}
      className={styles.postReactionContainer}
    >
      {reaction && <div>Your emoji was successful</div>}
      {reactionError && <FormError>Could not post emoji</FormError>}
      <fieldset disabled={submitting}>
        <Form.Group className="mb-3" controlId="symbol">
          <Form.Select
            aria-label="Default select example"
            value={symbol}
            {...register("symbol")}
            onChange={(e) => setSymbol(e.target.value)}
          >
            <option value="">Select an emoji</option>
            <option>🤩</option>
            <option>😃</option>
            <option>👏</option>
            <option>👋</option>
            <option>🧡</option>
          </Form.Select>
        </Form.Group>
        {errors.symbol && <FormError>{errors.symbol.message}</FormError>}
        <Button
          variant="primary"
          type="submit"
          className={styles.postReactionButton}
        >
          {submitting ? "Posting emoji..." : "Post emoji"}
        </Button>
      </fieldset>
    </Form>
  );
}
