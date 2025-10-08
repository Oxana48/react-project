import { Link } from "react-router-dom";
import MoviePoster from "../MoviePoster/MoviePoster";
import { useDuration } from "../../hooks/useDuration";
import type { IMovie } from "../../api/types";
import FavouriteButton from "../Button/FavouriteButton";
import { RatingBadge } from "../Rating/Rating";
import ArrowsSvg from "../../assets/svg/arrows.svg?react";
import "./MovieTop.css";

interface MovieTopProps {
  movie: IMovie;
  showMovieButton?: boolean;
  showGenerateButton?: boolean;
  onTrailerClick: () => void;
  onGenerateClick: () => void;
}

function MovieTop({
  movie,
  showMovieButton,
  showGenerateButton,
  onTrailerClick,
  onGenerateClick,
}: MovieTopProps) {
  const { formatDuration } = useDuration();

  const buttonCount =
    1 + (showMovieButton ? 1 : 0) + (showGenerateButton ? 1 : 0) + 1;

  return (
    <>
      <div className="movie__desktop-container">
        <div className="movie__info">
          <div className="movie__infoTop">
            <div className="movie__rating">
              {movie.tmdbRating.toFixed(1) && (
                <RatingBadge
                  rating={movie.tmdbRating}
                  className="search__rating"
                />
              )}
            </div>
            <p className="movie__year">{movie.releaseYear}</p>
            <p className="movie__genre">{movie.genres?.[0]}</p>
            <p className="movie__duration">{formatDuration(movie.runtime)}</p>
          </div>
          <div className="movie__infoMiddle">
            <p className="movie__title">{movie.title}</p>
            <p className="movie__description">{movie.plot}</p>
          </div>

          <div className="movie__infoBottom">
            <button
              className="action__button trailer__button"
              onClick={onTrailerClick}
              disabled={!movie.trailerUrl}
              aria-label="Посмотреть трейлер"
            >
              Трейлер
            </button>

            {showMovieButton && (
              <Link
                to={`/movie/${movie.id}`}
                className="action__button details__button"
              >
                Офильме
              </Link>
            )}

            <FavouriteButton movieId={movie.id} />

            {showGenerateButton && (
              <button
                className="action__button generate__button"
                onClick={onGenerateClick}
                aria-label="Выбрать другой фильм"
              >
                <ArrowsSvg width={24} height={24} />
              </button>
            )}
          </div>
        </div>

        <MoviePoster
          posterUrl={movie.posterUrl}
          title={movie.title}
          size="large"
        />
      </div>

      <div className="movie__mobile-container">
        <MoviePoster
          posterUrl={movie.posterUrl}
          title={movie.title}
          size="mobile"
        />

        <div className="movie__info">
          <div className="movie__infoTop">
            <div className="movie__rating">
              {movie.tmdbRating.toFixed(1) && (
                <RatingBadge
                  rating={movie.tmdbRating}
                  className="search__rating"
                />
              )}
            </div>
            <p className="movie__year">{movie.releaseYear}</p>
            <p className="movie__genre">{movie.genres?.[0]}</p>
            <p className="movie__duration">{formatDuration(movie.runtime)}</p>
          </div>
          <div className="movie__infoMiddle">
            <p className="movie__title">{movie.title}</p>
            <p className="movie__description">{movie.plot}</p>
          </div>

          {buttonCount > 2 ? (
            <>
              <button
                className="action__button trailer__button"
                onClick={onTrailerClick}
                disabled={!movie.trailerUrl}
                aria-label="Посмотреть трейлер"
              >
                Трейлер
              </button>

              <div className="movie__infoBottom movie__infoBottom--four">
                {showMovieButton && (
                  <Link
                    to={`/movie/${movie.id}`}
                    className="action__button details__button"
                  >
                    Офильме
                  </Link>
                )}

                <FavouriteButton movieId={movie.id} />

                {showGenerateButton && (
                  <button
                    className="action__button generate__button"
                    onClick={onGenerateClick}
                    aria-label="Выбрать другой фильм"
                  >
                    <ArrowsSvg width={24} height={24} />
                  </button>
                )}
              </div>
            </>
          ) : (
            <div className="movie__infoBottom movie__infoBottom--two">
              <button
                className="action__button trailer__button"
                onClick={onTrailerClick}
                disabled={!movie.trailerUrl}
                aria-label="Посмотреть трейлер"
              >
                Трейлер
              </button>

              <FavouriteButton movieId={movie.id} />
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default MovieTop;
