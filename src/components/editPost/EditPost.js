import React from "react";
import Heading from "../layout/Heading";
import EditPostForm from "./EditPostForm.js";

export default function EditPost() {
  return (
    <>
      <Heading title="Edit post" />
      <EditPostForm />
    </>
  );
}
