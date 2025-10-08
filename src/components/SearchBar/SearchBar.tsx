import { useState, useMemo } from "react";
import { fetchMovies } from "../../api/Movie";
import { useQuery } from "@tanstack/react-query";
import type { IMovie } from "../../api/types";
import { Link } from "react-router-dom";
import MoviePoster from "../MoviePoster/MoviePoster";
import { useDuration } from "../../hooks/useDuration";
import { RatingBadge } from "../Rating/Rating";
import CrossSvg from "../../assets/svg/cross.svg?react";
import SearchIcon from "../../assets/svg/search-small.svg?react";
import "./SearchBar.css";

interface SearchBarProps {
  isMobile?: boolean;
  onMobileClose?: () => void;
}

const SearchBar = ({ isMobile = false, onMobileClose }: SearchBarProps) => {
  const [searchQuery, setSearchQuery] = useState("");

  const { formatDuration } = useDuration();

  const queryMovies = useQuery({
    queryKey: ["movies"],
    queryFn: fetchMovies,
  });

  const clearSearch = () => {
    setSearchQuery("");
    if (isMobile && onMobileClose) {
      onMobileClose();
    }
  };

  const searchResults = useMemo(() => {
    if (!searchQuery || !queryMovies.data) return [];

    return queryMovies?.data.filter(
      (movie: IMovie) =>
        movie.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        movie.searchL.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery, queryMovies.data]);

  return (
    <div className="search">
      <SearchIcon className="search__icon" width={24} height={24} />

      <input
        type="text"
        name="search"
        placeholder="Поиск"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="search__input"
        autoFocus={isMobile}
        autoComplete="off"
      />

      {(searchQuery || isMobile) && (
        <button
          className="search__clear"
          onClick={clearSearch}
          aria-label="Очистить поиск"
        >
          <CrossSvg className="search__clear-icon" />
        </button>
      )}

      {searchQuery.length > 0 && queryMovies.data && (
        <div className="search__results">
          {searchResults.length > 0 ? (
            <div className="search__list">
              {searchResults.slice(0, 5).map((movie: IMovie) => (
                <Link
                  key={movie.id}
                  to={`/movie/${movie.id}`}
                  className="search__item"
                  onClick={clearSearch}
                >
                  <div key={movie.id} className="search__info-wrapper">
                    <MoviePoster
                      posterUrl={movie.posterUrl}
                      title={movie.title}
                      size="search"
                    />

                    <div className="search__info">
                      <div className="search__meta">
                        {movie.tmdbRating && (
                          <RatingBadge
                            rating={movie.tmdbRating}
                            className="search__rating"
                          />
                        )}
                        {movie.releaseYear && (
                          <span className="search__year">
                            {movie.releaseYear}
                          </span>
                        )}
                        {movie.genres && movie.genres.length > 0
                          ? movie.genres[0]
                          : "Жанр не указан"}
                        {movie.runtime && (
                          <span className="search__duration">
                            {formatDuration(movie.runtime)}
                          </span>
                        )}
                      </div>
                      <h4 className="search__title">{movie.title}</h4>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="search__empty">
              {queryMovies.isLoading ? "Поиск..." : "Ничего не найдено"}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
