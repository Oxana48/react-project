import { UserProfileSchema, type UserProfile } from "./types";
import { BASE_URL } from "./config";
import { validateResponse } from "./validateResponse";

export function registerUser(
  email: string,
  password: string,
  name: string,
  surname: string
): Promise<void> {
  return fetch(`${BASE_URL}/user`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
    },
    credentials: "include",
    body: JSON.stringify({ email, password, name, surname }),
  })
    .then(validateResponse)
    .then(() => undefined);
}

export function loginUser(email: string, password: string): Promise<void> {
  return fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
    },
    credentials: "include",
    body: JSON.stringify({ email, password }),
  })
    .then(validateResponse)
    .then(() => undefined);
}

export function fetchUserProfile(): Promise<UserProfile> {
  return fetch(`${BASE_URL}/profile`, {
    credentials: "include",
  })
    .then(validateResponse)
    .then((data) => UserProfileSchema.parse(data));
}

export function logoutUser(): Promise<void> {
  return fetch(`${BASE_URL}/auth/logout`, {
    credentials: "include",
  })
    .then(validateResponse)
    .then(() => undefined);
}
