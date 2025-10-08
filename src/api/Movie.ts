import { BASE_URL } from "./config";
import {
  GenresResponseSchema,
  GenresArraySchema,
  MovieSchema,
  MoviesSchema,
  RandomMovieResponseSchema,
  Top10MoviesSchema,
  type IMovie,
  type Movies,
  type GenresArray,
} from "./types";
import { validateResponse } from "./validateResponse";

export function fetchMovie(movieId: number): Promise<IMovie> {
  return fetch(`${BASE_URL}/movie/${movieId}`)
    .then(validateResponse)
    .then((data) => MovieSchema.parse(data));
}

export function fetchRandomMovie(): Promise<IMovie> {
  return fetch(`${BASE_URL}/movie/random`)
    .then(validateResponse)
    .then((data) => RandomMovieResponseSchema.parse(data));
}

export function fetchMovies(): Promise<Movies> {
  return fetch(`${BASE_URL}/movie`)
    .then(validateResponse)
    .then((data) => MoviesSchema.parse(data));
}

export function fetchTopMovies(): Promise<Movies> {
  return fetch(`${BASE_URL}/movie/top10`)
    .then(validateResponse)
    .then((data) => {
      return Top10MoviesSchema.parse(data);
    });
}

export function fetchMoviesGenre(): Promise<string[]> {
  return fetch(`${BASE_URL}/movie/genres`)
    .then(validateResponse)
    .then((data) => GenresResponseSchema.parse(data));
}

export function fetchMovieByGenre(): Promise<GenresArray> {
  return fetchMoviesGenre().then((genreNames) => {
    const genres = genreNames.map((name, index) => ({
      id: index + 1,
      name: name,
    }));

    return GenresArraySchema.parse(genres);
  });
}
