import { useAppDispatch } from "../../store/hooks";
import { fetchUserProfile, logoutUser } from "../../api/User";
import { useState } from "react";
import { useAppSelector } from "../../store/hooks";
import { useQuery } from "@tanstack/react-query";
import { selectIsUser, logout } from "../../store/authSlice";
import { AccountSettings } from "../../components/AccountSettings/AccountSettings";
import { FavouriteMovies } from "../../components/FavouriteMovies/FavouriteMovies";
import HeartSvg from "../../assets/svg/heart.svg?react";
import UserSvg from "../../assets/svg/user.svg?react";
import { useNavigate } from "react-router-dom";
import "./ProfilePage.css";


const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState<"favourites" | "settings">(
    "favourites"
  );
  const isUser = useAppSelector(selectIsUser);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const queryProfile = useQuery({
    queryKey: ["profile"],
    queryFn: fetchUserProfile,
  });

  const handleLogout = () => {
    logoutUser();
    dispatch(logout());
    navigate("/");
  };

  if (!isUser) return null;
  if (queryProfile.isLoading) return <div>Загрузка...</div>;

  return (
    <div className="profile__container">
      <h1 className="profile__title">Мой аккаунт</h1>
      <div className="profile__header">
        <button
          className={`profile__tab ${
            activeTab === "favourites" ? "profile__tab--active" : ""
          }`}
          onClick={() => setActiveTab("favourites")}
        >
          <HeartSvg width={24} height={24} />
          <span className="profile__tab-title profile__tab-title--desktop">Избранные фильмы</span>
          <span className="profile__tab-title profile__tab-title--mobile">
            Избранное
          </span>
        </button>
        <button
          className={`profile__tab ${
            activeTab === "settings" ? "profile__tab--active" : ""
          }`}
          onClick={() => setActiveTab("settings")}
        >
          <UserSvg width={24} height={24} />
          <span className="profile__tab-title profile__tab-title--desktop">Настройки аккаунта</span>
          <span className="profile__tab-title profile__tab-title--mobile">
            Настройки
          </span>
        </button>
      </div>

      <div className="profile__content">
        {activeTab === "favourites" ? (
          <FavouriteMovies />
        ) : (
          <AccountSettings user={queryProfile.data} onLogout={handleLogout} />
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
