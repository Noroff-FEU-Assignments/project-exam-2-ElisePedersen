import { React, useState } from "react";
import { useParams } from "react-router-dom";
import useAxios from "../../hooks/useAxios";

export default function PostComment() {
  const [comment, setComment] = useState([]);

  let { id } = useParams();

  const http = useAxios();

  async function getComment(data) {
    try {
      const response = await http.post(`social/posts/${id}/comment`);
      console.log("response", response);
      // setComment(response.data);
    } catch (error) {
      console.log(error.response.data.status);
    }
  }

  getComment();

  return <div></div>;
}
