import { useState, useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchMovieByGenre, fetchMovies } from "../../api/Movie";
import type { IMovie } from "../../api/types";
import { capitalizedGenreName } from "../../utils/genreUtils";
import BackSvg from "../../assets/svg/back.svg?react";
import MoviePoster from "../../components/MoviePoster/MoviePoster";
import "./GenreMoviesPage.css";

const GenreMoviesPage = () => {
  const { genreId } = useParams<{ genreId: string }>();
  const [visibleCount, setVisibleCount] = useState(10);

  const queryGenre = useQuery({
    queryKey: ["genres"],
    queryFn: fetchMovieByGenre,
  });

  const queryMovies = useQuery({
    queryKey: ["movies"],
    queryFn: fetchMovies,
  });

  const genre = useMemo(
    () => queryGenre.data?.find((g) => g.id === parseInt(genreId || "")),
    [queryGenre.data, genreId]
  );

  const filteredMovies = useMemo(() => {
    if (!queryMovies.data || !genre) return [];

    return queryMovies.data.filter(
      (movie: IMovie) =>
        movie.genres.includes(genre.name) ||
        movie.genres.some(
          (movieGenre) => movieGenre.toLowerCase() === genre.name.toLowerCase()
        )
    );
  }, [queryMovies.data, genre]);

  const sortedMovies = useMemo(() => {
    return [...filteredMovies].sort((a, b) => b.tmdbRating - a.tmdbRating);
  }, [filteredMovies]);

  const visibleMovies = sortedMovies.slice(0, visibleCount);

  const loadMore = () => {
    setVisibleCount((prev) => prev + 10);
  };

  if (queryGenre.isLoading || queryMovies.isLoading)
    return <div>Загрузка...</div>;
  if (queryMovies.error) return <div>Ошибка</div>;
  if (queryGenre.error) return <div>Ошибка</div>;
  if (!queryGenre.data) return <div>Данные не найдены</div>;
  if (!queryMovies.data) return <div>Данные не найдены</div>;

  return (
    <div className="movies__container">
      <Link to="/genres" className="movies__back-link">
        <BackSvg className="movies__back-icon" width={40} height={40} />

        <h1 className="movies__title">
          {capitalizedGenreName(genre?.name || "Фильмы")}
        </h1>
      </Link>

      {filteredMovies.length === 0 ? (
        <div>Нет фильмов в этом жанре</div>
      ) : (
        <>
          <div className="movies__list">
            {visibleMovies.map((movie) => (
              <Link key={movie.id} to={`/movie/${movie.id}`}>
                <div className="movies__item">
                  <MoviePoster
                    posterUrl={movie.posterUrl}
                    title={movie.title}
                    size="medium"
                  />
                </div>
              </Link>
            ))}
          </div>

          {visibleCount < filteredMovies.length && (
            <div className="movies__button-container">
              <button className="movies__more-btn" onClick={loadMore}>
                Показать еще
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default GenreMoviesPage;
