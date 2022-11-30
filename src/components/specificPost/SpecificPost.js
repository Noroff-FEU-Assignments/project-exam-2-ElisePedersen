import React from "react";

import Post from "./Post";
import PostComment from "./PostComment";
import PostReaction from "./PostReaction";

export default function SpecificPost() {
  return (
    <>
      <Post />
      <div>
        <PostReaction />
        <PostComment />
      </div>
    </>
  );
}
