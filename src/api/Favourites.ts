import { BASE_URL } from "./config";
import {
  FavouritesResponseSchema,
  type Movies,
  type UserProfile,
} from "./types";
import { fetchUserProfile } from "./User";
import { validateResponse } from "./validateResponse";

export function addToFavourites(movieId: number): Promise<UserProfile> {
  return fetch(`${BASE_URL}/favorites`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
    },
    credentials: "include",
    body: JSON.stringify({ id: movieId.toString() }),
  })
    .then(validateResponse)
    .then(() => fetchUserProfile());
}

export function removeFromFavourites(movieId: number): Promise<UserProfile> {
  return fetch(`${BASE_URL}/favorites/${movieId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
    },
    credentials: "include",

  })
    .then(validateResponse)
    .then(() => fetchUserProfile());
}

export function fetchFavourites(): Promise<Movies> {
  return fetch(`${BASE_URL}/favorites`, {
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
    },
    credentials: "include",
  })
    .then(validateResponse)
    .then((data) => FavouritesResponseSchema.parse(data));
}
