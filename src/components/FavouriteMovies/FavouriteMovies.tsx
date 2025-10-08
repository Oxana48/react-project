import { useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchFavourites } from "../../api/Favourites";
import { useFavourites } from "../../hooks/useFavourites";
import CrossAuthSvg from "../../assets/svg/auth-cross.svg?react";
import MoviePoster from "../../components/MoviePoster/MoviePoster";
import { Link } from "react-router-dom";
import "./FavouriteMovies.css";

export const FavouriteMovies = () => {
  const { removeMutation } = useFavourites();
  const queryClient = useQueryClient();

  const queryFavourites = useQuery({
    queryKey: ["favourites"],
    queryFn: fetchFavourites,
  });

  const handleRemoveFavourites = (movieId: number) => {
    const previousFavourites = queryFavourites.data;

    if (previousFavourites) {
      queryClient.setQueryData(
        ["favourites"],
        previousFavourites.filter((movie) => movie.id !== movieId)
      );
    }
    removeMutation.mutate(movieId, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["favourites"] });
      },
    });
  };

  if (queryFavourites.isLoading) {
    return <div>Загрузка...</div>;
  }

  if (queryFavourites.error) {
    return <div>Ошибка загрузки ..</div>;
  }

  if (!queryFavourites.data || queryFavourites.data?.length === 0) {
    return (
      <div className="favourite">
        <div className="favourite__error">У вас нет избранных фильмов</div>
      </div>
    );
  }

  return (
    <div className="favourite__wrapper">
      <div className="favourite__list">
        {queryFavourites.data?.map((movie) => (
          <div className="favourite__item" key={movie.id} >
            <Link to={`/movie/${movie.id}`}>
              <MoviePoster
                posterUrl={movie.posterUrl}
                title={movie.title}
                size="medium"
              />
            </Link>
            <button
              className="favourite__close"
              title="Удалить из избранных"
              disabled={removeMutation.isPending}
              onClick={() => handleRemoveFavourites(movie.id)}
            >
              <CrossAuthSvg width={24} height={24} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
