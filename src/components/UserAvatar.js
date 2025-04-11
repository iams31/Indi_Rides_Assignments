import React from "react";

const UserAvatar = ({ username }) => {
  const initials = username
    .split(" ")
    .map((name) => name[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return <div className="user-avatar">{initials}</div>;
};

export default UserAvatar;
