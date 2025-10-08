import { z } from "zod";

export const MovieSchema = z.object({
  id: z.number(),
  title: z.string(),
  originalTitle: z.string(),
  language: z.string(),
  releaseYear: z.number().nullable().optional(),
  genres: z.array(z.string()),
  plot: z.string(),
  runtime: z.number(),
  budget: z.string().nullable().optional(),
  revenue: z.string().nullable().optional(),
  homepage: z.string(),
  status: z.string(),
  posterUrl: z.string().nullable().optional(),
  backdropUrl: z.string().nullable().optional(),
  trailerUrl: z.string(),
  trailerYouTubeId: z.string(),
  tmdbRating: z.number(),
  searchL: z.string(),
  keywords: z.array(z.string()),
  countriesOfOrigin: z.array(z.string()),
  languages: z.array(z.string()),
  cast: z.array(z.string()),
  director: z.string().nullable().optional(),
  production: z.string().nullable().optional(),
  awardsSummary: z.string().nullable().optional(),
});

export type IMovie = z.infer<typeof MovieSchema>;

export const MoviesSchema = z.array(MovieSchema);
export type Movies = z.infer<typeof MoviesSchema>;


export const Top10MoviesSchema = z.array(MovieSchema);
export type Top10Movies = z.infer<typeof Top10MoviesSchema>;

export const GenresResponseSchema = z.array(z.string());
export type GenresResponse = z.infer<typeof GenresResponseSchema>;

export const GenreSchema = z.object({
  id: z.number(),
  name: z.string(),
});
export type Genre = z.infer<typeof GenreSchema>;

export const GenresArraySchema = z.array(GenreSchema);
export type GenresArray = z.infer<typeof GenresArraySchema>;

export const RandomMovieResponseSchema = MovieSchema;
export type RandomMovieResponse = z.infer<typeof RandomMovieResponseSchema>;

export const FavouritesResponseSchema = z.array(MovieSchema);

export type FavouritesResponse = z.infer<typeof FavouritesResponseSchema>;

export const UserSchema = z.object({
  email: z.string(),
  password: z.string(),
  name: z.string(),
  surname: z.string(),
});

export type User = z.infer<typeof UserSchema>;

export const UserProfileSchema = z.object({
  name: z.string(),
  surname: z.string(),
  email: z.string(),
  favorites: z.array(z.string()).default([]),
});

export type UserProfile = z.infer<typeof UserProfileSchema>;
