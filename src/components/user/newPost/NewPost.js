import React from "react";
import Heading from "../../layout/Heading";
import NewPostForm from "./NewPostForm";

export default function NewPost() {
  return (
    <>
      <Heading title="Create new post" />
      <NewPostForm />
    </>
  );
}
