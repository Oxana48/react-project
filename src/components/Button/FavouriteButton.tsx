import { useFavourites } from "../../hooks/useFavourites";
import { selectIsUser } from "../../store/authSlice";
import { useAppSelector } from "../../store/hooks";
import { useState } from "react";
import AuthForm from "../AuthForm/AuthForm";
import HeartSvg from "../../assets/svg/heart.svg?react";
import FilledSvg from "../../assets/svg/heart-filled.svg?react";
import "./FavouriteButton.css";

interface FavouriteButtonProps {
  movieId: number;
}

const FavouriteButton = ({ movieId }: FavouriteButtonProps) => {
  const { isFavourite, toggleFavourite } = useFavourites();
  const isUser = useAppSelector(selectIsUser);
  const [showAuthModal, setShowAuthModal] = useState(false);

  const handleAddToFavourites = () => {
    if (movieId) {
      toggleFavourite(movieId);
    }
  };

  const handleShowAuthForm = () => {
    setShowAuthModal(true);
  };

  const handleCloseAuthForm = () => {
    setShowAuthModal(false);
  };

  const isFavouriteMovie = isFavourite(movieId);

  return (
    <>
      {isUser ? (
        <button
          className={`action__button favourite__button ${
            isFavouriteMovie ? "favourite__button--active" : ""
          }`}
          onClick={handleAddToFavourites}
          aria-label={
            isFavouriteMovie ? "Убрать из избранного" : "Добавить в избранное"
          }
        >
          <div className="favourite__icon" style={{ display: "flex" }}>
            {isFavouriteMovie ? (
              <FilledSvg width={24} height={24} />
            ) : (
              <HeartSvg width={24} height={24} />
            )}
          </div>
        </button>
      ) : (
        <button
          className="action__button favourite__button"
          onClick={handleShowAuthForm}
          aria-label="Войдите, чтобы добавить в избранное"
        >
          <div className="favourite__icon" style={{ display: "flex" }}>
            <HeartSvg width={24} height={24} />
          </div>
        </button>
      )}

      {showAuthModal && (
        <div className="favourite__modal">
          <AuthForm onClose={handleCloseAuthForm} />
        </div>
      )}
    </>
  );
};

export default FavouriteButton;
