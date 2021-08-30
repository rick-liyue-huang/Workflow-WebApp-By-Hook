import { ApiUrl } from "screens/project-list";
import { User } from "./screens/project-list/search-panel";

//  can be replaced by firebase

const localStorageKey = `__auth_provider_token__`;

export const getToken = () => window.localStorage.getItem(localStorageKey);

export const handleUserResponse = ({ user }: { user: User }) => {
  window.localStorage.setItem(localStorageKey, user.token || "");
  return user;
};

export const login = (data: { username: string; password: string }) => {
  return fetch(`${ApiUrl}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then(async (response) => {
    if (response.ok) {
      return handleUserResponse(await response.json());
    } else {
      return Promise.reject(response.json());
    }
  });
};

export const register = (data: { username: string; password: string }) => {
  return fetch(`${ApiUrl}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then(async (response) => {
    if (response.ok) {
      return handleUserResponse(await response.json());
    } else {
      return Promise.reject(response.json());
    }
  });
};

export const logout = async () =>
  window.localStorage.removeItem(localStorageKey);
