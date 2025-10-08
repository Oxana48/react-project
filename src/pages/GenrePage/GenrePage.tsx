import { useQuery } from "@tanstack/react-query";
import { fetchMovieByGenre } from "../../api/Movie";
import { Link } from "react-router-dom";
import { capitalizedGenreName } from "../../utils/genreUtils";
import { genreImages, placeholder } from "../../utils/genreImages";
import "./GenrePage.css";

const GenrePage = () => {
  const queryGenre = useQuery({
    queryKey: ["genres"],
    queryFn: fetchMovieByGenre,
  });

  if (queryGenre.isLoading) return <div>Загрузка...</div>;
  if (queryGenre.error) return <div>Ошибка</div>;

  const capitalizedGenres =
    queryGenre.data?.map((genre) => ({
      ...genre,
      name: capitalizedGenreName(genre.name),
      image: genreImages[genre.name.toLowerCase()] || placeholder,
    })) || [];

  return (
    <div className="genres__container">
      <h1 className="genres__title">Жанры фильмов</h1>
      <div className="genres__list">
        {capitalizedGenres.map((genre) => (
          <div className="genres__item" key={genre.id}>
            <Link
              to={`/movie/genres/${genre.id}`}
              className="genres__item-link"
            >
              {" "}
              <img
                className="genres__poster"
                src={genre.image}
                alt={genre.name}
                onError={(e) => {
                  e.currentTarget.src = placeholder;
                }}
              />
              <div className="genres__overlay">
                <h3 className="genres__item-title">{genre.name}</h3>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GenrePage;
