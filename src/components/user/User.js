import React from "react";
import UserImages from "./UserImages.js";
import UserFollow from "./UserFollow";
import UserInformation from "./UserInformation";
// import { Button } from "react-bootstrap";
// import ChangeAvatar from "./ChangeAvatar.js";

export default function User() {
  // const [avatarModalShow, setAvatarModalShow] = useState(false);

  return (
    <div>
      {/* <Button variant="primary" onClick={() => setAvatarModalShow(true)}>
        Avatar
      </Button>
      <ChangeAvatar
        show={avatarModalShow}
        onHide={() => setAvatarModalShow(false)}
      /> */}
      <UserInformation />

      <UserImages />
      <UserFollow />
    </div>
  );
}
