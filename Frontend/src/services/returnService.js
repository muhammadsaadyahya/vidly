import http from "./http";
import config from "../components/common/config.json";

const apiEndpoint = config.apiUrl + "/returns";

export const getRentals = () => {
  return http.get(apiEndpoint);
};

export const processReturn = async (customerId, movieId) => {
  return http.post(apiEndpoint, { customerId, movieId });
};
