import React from "react";
import UserImages from "./UserImages.js";
import UserFollow from "./UserFollow";
import UserInformation from "./UserInformation";

export default function User() {
  return (
    <div>
      <UserInformation />

      <UserImages />
      <UserFollow />
    </div>
  );
}
