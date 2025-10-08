import { type FC } from "react";
import "./UserAvatar.css";

interface UserAvatarProps {
  name: string;
  surname: string;
  size?: number;
}

export const UserAvatar: FC<UserAvatarProps> = ({
  name,
  surname,
  size = 40,
}) => {
  const getInitials = () => {
    const first = name?.charAt(0) || "";
    const second = surname?.charAt(0) || "";
    if (!first && !second) return "U";
    return `${first}${second}`.toUpperCase();
  };

  return (
    <div
      className="user-avatar"
      style={{
        width: size,
        height: size,
        fontSize: size * 0.4,
      }}
    >
      {getInitials() || "U"}
    </div>
  );
};
