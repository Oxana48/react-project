import type { UserProfile } from "../../api/types";
import { UserAvatar } from "../UserAvatar/UserAvatar";
import EmailSvg from "../../assets/svg/email.svg?react";
import "./AccountSettings.css";

interface AccountSettingsProps {
  user?: UserProfile;
  onLogout: () => void;
}

export const AccountSettings = ({ user, onLogout }: AccountSettingsProps) => {
  return (
    <div className="settings">
      <div className="settings__list">
        <div className="settings__item">
          <UserAvatar
            name={user?.name || ""}
            surname={user?.surname || ""}
            size={60}
          />

          <div className="settings__item-wrapper">
            <label className="settings__item-lable">Имя Фамилия</label>
            <span className="settings__item-info">
              {user?.name} {user?.surname}
            </span>
          </div>
        </div>

        <div className="settings__item">
          <EmailSvg className="settings__icon" width={24} height={24} />
          <div className="settings__item-wrapper">
            <label className="settings__item-label">Электронная почта</label>
            <span className="settings__item-info">{user?.email}</span>
          </div>
        </div>
      </div>

      <button className="settings__button" onClick={onLogout}>
        Выйти из аккаунта
      </button>
    </div>
  );
};
