import { Link, NavLink } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar";
import { useAppSelector } from "../../store/hooks";
import { selectUser, selectIsUser } from "../../store/authSlice";
import { useState } from "react";
import AuthForm from "../AuthForm/AuthForm";
import Logo from "../../assets/png/logo.png";
import LogoSmall from "../../assets/png/logo-small.png";
import GenresSvg from "../../assets/svg/genres.svg?react";
import SearchSvg from "../../assets/svg/search.svg?react";
import UserSvg from "../../assets/svg/user.svg?react";
import "./Header.css";

const Header = () => {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const isUser = useAppSelector(selectIsUser);
  const user = useAppSelector(selectUser);

  const handleShowAuthForm = () => {
    setShowAuthModal(true);
  };

  const handleCloseAuthForm = () => {
    setShowAuthModal(false);
  };

  const handleShowMobileSearch = () => {
    setShowMobileSearch(true);
  };

  const handleCloseMobileSearch = () => {
    setShowMobileSearch(false);
  };

  return (
    <>
      <div className="header__container">
        <Link to="/">
          <img
            className="header__logo header__desktop"
            src={Logo}
            alt="Маруся"
          />
        </Link>

        <div className="header__middle">
          <nav className="header__nav">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `header__main header__desktop ${
                  isActive ? "header__link--active" : ""
                }`
              }
            >
              Главная
            </NavLink>
            <NavLink
              to="/genres"
              className={({ isActive }) =>
                `header__genres header__desktop ${
                  isActive ? "header__link--active" : " "
                }`
              }
            >
              Жанры
            </NavLink>
          </nav>

          <div className="header__search header__desktop">
            <SearchBar />
          </div>
        </div>

        {isUser ? (
          <NavLink
            to="/profile"
            className={({ isActive }) =>
              `header__profile header__desktop ${
                isActive ? "header__link--active" : ""
              }`
            }
          >
            {({ isActive }) => (
              <span
                className={`header__profile-user header__desktop ${
                  isActive ? "header__link--active" : ""
                }`}
              >
                {user?.surname || user?.name || "Профиль"}
              </span>
            )}
          </NavLink>
        ) : (
          <button
            className="header__button header__desktop"
            onClick={handleShowAuthForm}
            aria-label="Войти в аккаунт"
          >
            Войти
          </button>
        )}
      </div>

      <div className="header__svg-container">
        <div className="header__mobile-left">
          <Link to="/">
            <img
              className="header__logo-small header__mobile"
              src={LogoSmall}
              alt="Маруся"
            />
          </Link>
        </div>
        <div className="header__mobile-right">
          <Link
            to="/genres"
            className="header__genres-link header__mobile"
            aria-label="Жанры"
          >
            <GenresSvg width={24} height={24} />
          </Link>

          {!showMobileSearch && (
            <button
              className="header__search-link header__mobile"
              aria-label="Поиск"
              onClick={handleShowMobileSearch}
            >
              <SearchSvg width={24} height={24} />
            </button>
          )}

          {isUser ? (
            <Link
              to="/profile"
              className="header__profile-link header__mobile"
              aria-label="Профиль"
            >
              <UserSvg width={24} height={24} />
            </Link>
          ) : (
            <button
              className="header__profile-link header__mobile"
              onClick={handleShowAuthForm}
              aria-label="Войти в аккаунт"
            >
              <UserSvg width={24} height={24} />
            </button>
          )}
        </div>
      </div>

      {showMobileSearch && (
        <div className="header__mobile-search-overlay">
          <SearchBar isMobile={true} onMobileClose={handleCloseMobileSearch} />
        </div>
      )}

      {showAuthModal && (
        <div className="header__modal">
          <AuthForm onClose={handleCloseAuthForm} />
        </div>
      )}
    </>
  );
};

export default Header;
