import React from "react";

import Post from "./Post";
import PostComment from "./PostComment";
import PostReaction from "./PostReaction";
import styles from "./SpecificPost.module.css";

export default function SpecificPost() {
  return (
    <>
      <Post />
      <div className={styles.specificPostSelectContainers}>
        <PostComment />
        <PostReaction />
      </div>
    </>
  );
}
