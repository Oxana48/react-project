import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { fetchRandomMovie, fetchTopMovies } from "../../api/Movie";
import MoviePoster from "../../components/MoviePoster/MoviePoster";
import MovieTop from "../../components/MovieTop/MovieTop";
import TrailerOverlay from "../../components/TrailerOverlay/TrailerOverlay";
import "./MainPage.css";

const MainPage = () => {
  const [isTrailerOpen, setIsTrailerOpen] = useState(false);

  const queryRandomMovie = useQuery({
    queryKey: ["random-movie"],
    queryFn: fetchRandomMovie,
  });

  const queryTopMovies = useQuery({
    queryKey: ["top-movies"],
    queryFn: fetchTopMovies,
  });

  const handleTrailerClick = () => {
    if (queryRandomMovie.data?.trailerUrl) {
      setIsTrailerOpen(true);
    }
  };

  const closeTrailer = () => {
    setIsTrailerOpen(false);
  };

  const handleGenerateClick = () => {
    queryRandomMovie.refetch();
  };

  if (queryRandomMovie.isLoading && queryTopMovies.isLoading) {
    return <div>Загрузка...</div>;
  }
  if (queryRandomMovie.error) return <div>Ошибка</div>;
  if (queryTopMovies.error) return <div>Ошибка</div>;
  if (!queryRandomMovie.data) return <div>Данные не найдены</div>;
  if (!queryTopMovies.data) return <div>Данные не найдены</div>;

  return (
    <>
      <div className="main">
        {queryRandomMovie.data && (
          <MovieTop
            movie={queryRandomMovie.data}
            showMovieButton={true}
            showGenerateButton={true}
            onTrailerClick={handleTrailerClick}
            onGenerateClick={handleGenerateClick}
          />
        )}

        <div className="top__movies">
          <h2 className="top__title">Топ 10 фильмов</h2>
          <div className="top__list">
            {queryTopMovies.data?.slice(0, 10).map((movie, index) => (
              <Link
                key={movie.id}
                to={`/movie/${movie.id}`}
                className="top__item-link"
              >
                <div className="top__item">
                  <span className="rank">{index + 1}</span>

                  <MoviePoster
                    posterUrl={movie.posterUrl}
                    title={movie.title}
                    size="medium"
                  />
                </div>
              </Link>
            ))}
          </div>
        </div>

        <TrailerOverlay
          trailerUrl={queryRandomMovie.data?.trailerUrl || null}
          title={queryRandomMovie.data?.title || "Неизвестный фильм"}
          isOpen={isTrailerOpen}
          onClose={closeTrailer}
        />
      </div>
    </>
  );
};

export default MainPage;
