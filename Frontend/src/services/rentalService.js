import http from "./http";
import config from "../components/common/config.json";

const apiEndpoint = config.apiUrl + "/rentals";

export const getRentals = () => {
  return http.get(apiEndpoint);
};

const rentalsUrl = (id) => {
  return `${apiEndpoint}/${id}`;
};

export const getRental = async (rentalId) => {
  return http.get(rentalsUrl(rentalId));
};

export const saveRentals = async (rental) => {
  return http.post(apiEndpoint, rental);
};

export const deleteRentals = async (id) => {
  return http.delete(rentalsUrl(id));
};
