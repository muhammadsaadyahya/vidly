import http from "./http";
import config from "../components/common/config.json";
import { jwtDecode } from "jwt-decode";

const apiEndpoint = config.apiUrl + "/auth";
const tokenKey = "token";
http.setJwt(getJwt());

export const login = async (email, password) => {
  const { data: jwt } = await http.post(apiEndpoint, { email, password });
  console.log(jwt);
  localStorage.setItem(tokenKey, jwt);
};

export function loginWithJwt(jwt) {
  localStorage.setItem(tokenKey, jwt);
}

export function logout() {
  localStorage.removeItem(tokenKey);
}

export function getCurrentUser() {
  try {
    const jwt = localStorage.getItem(tokenKey);
    return jwtDecode(jwt);
  } catch (ex) {
    return null;
  }
}
export function getJwt() {
  return localStorage.getItem(tokenKey);
}

export default {
  getJwt,
  login,
  loginWithJwt,
  logout,
  getCurrentUser,
};
