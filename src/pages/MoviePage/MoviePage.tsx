import { useParams } from "react-router-dom";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchMovie } from "../../api/Movie";
import MovieTop from "../../components/MovieTop/MovieTop";
import TrailerOverlay from "../../components/TrailerOverlay/TrailerOverlay";
import "./MoviePage.css";

const MoviePage = () => {
  const { id } = useParams<{ id: string }>();
  const movieId = id ? parseInt(id) : undefined;
  const [isTrailerOpen, setIsTrailerOpen] = useState(false);

  const queryMovie = useQuery({
    queryKey: ["movie", movieId],
    queryFn: () => fetchMovie(movieId!),
  });

  const handleTrailerClick = () => {
    if (queryMovie.data?.trailerUrl) {
      setIsTrailerOpen(true);
    }
  };

  const closeTrailer = () => {
    setIsTrailerOpen(false);
  };

  const handleGenerateClick = () => {
    queryMovie.refetch();
  };

  if (queryMovie.isLoading) return <div>Загрузка...</div>;
  if (queryMovie.error) return <div>Ошибка</div>;
  if (!queryMovie.data) return <div>Данные не найдены</div>;

  return (
    <>
      <div className="movie__container">
        {queryMovie.data && (
          <MovieTop
            movie={queryMovie.data}
            showMovieButton={false}
            showGenerateButton={false}
            onTrailerClick={handleTrailerClick}
            onGenerateClick={handleGenerateClick}
          />
        )}

        <div className="movie-details">
          <h2 className="movie-details__title">О фильме</h2>
          <div className="movie-details__wrapper">
            <div className="movie-details__item">
              <span className="movie-details__label">Язык оригинала</span>
              <span className="movie-detail__value">
                {queryMovie.data.language}
              </span>
            </div>

            <div className="movie-details__item">
              <span className="movie-details__label">Бюджет</span>
              <span className="movie-detail__value">
                {queryMovie.data?.budget
                  ? `${Number(queryMovie.data.budget || 0).toLocaleString(
                      "ru-RU"
                    )} руб`
                  : "Не указано"}
              </span>
            </div>

            <div className="movie-details__item">
              <span className="movie-details__label">Выручка</span>
              <span className="movie-detail__value">
                {queryMovie.data?.revenue
                  ? `${Number(
                      queryMovie.data.revenue || 0
                    ).toLocaleString()} руб`
                  : "Не указано"}
              </span>
            </div>

            <div className="movie-details__item">
              <span className="movie-details__label">Режиссер</span>
              <span className="movie-detail__value">
                {queryMovie.data?.director || "Не указано"}
              </span>
            </div>

            <div className="movie-details__item">
              <span className="movie-details__label">Продакшен</span>
              <span className="movie-detail__value">
                {queryMovie.data?.production || "Не указано"}
              </span>
            </div>

            <div className="movie-details__item">
              <span className="movie-details__label">Награды</span>
              <span className="movie-detail__value">
                {queryMovie.data?.awardsSummary || "Не указано"}
              </span>
            </div>
          </div>
        </div>

        <TrailerOverlay
          trailerUrl={queryMovie.data?.trailerUrl || null}
          title={queryMovie.data?.title || "Неизвестный фильм"}
          isOpen={isTrailerOpen}
          onClose={closeTrailer}
        />
      </div>
    </>
  );
};

export default MoviePage;
