import { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useParams } from "react-router-dom";
import useAxios from "../../hooks/useAxios";

const schema = yup.object().shape({
  symbol: yup.string().required("Please select an emoji"),
});

export default function PostReaction() {
  const [reaction, setReaction] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [reactionError, setReactionError] = useState(null);
  const [emoji, setEmoji] = useState();

  let { id } = useParams();
  const http = useAxios();
  let symbol = emoji;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  async function Reaction() {
    reset();
    try {
      const response = await http.put(`social/posts/${id}/react/${symbol}`);
      setReaction(response.data);
    } catch (error) {
      setReactionError(error.toString());
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit(Reaction)}>
      {reaction && <div>Your emoji was successful</div>}
      {reactionError}
      <select
        value={emoji}
        {...register("symbol")}
        onChange={(e) => setEmoji(e.target.value)}
      >
        <option value="">Select an emoji</option>
        <option>😍</option>
        <option>😱</option>
        <option>👌</option>
        <option>👋</option>
        <option>🙏</option>
        {/* sett inn andre emojier og endre alt til bootstrap */}
      </select>
      <button>Post emoji</button>
    </form>
  );
}
