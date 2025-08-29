import http from "./http";
import config from "../components/common/config.json";

export const getMovies = () => {
  return http.get(config.apiUrl + "/movies");
};

const movieUrl = (id) => {
  return `${config.apiUrl}/movies/${id}`;
};

export const getMovie = async (movieId) => {
  return http.get(movieUrl(movieId));
};

export const saveMovie = async (movie) => {
  if (movie._id) {
    const movieCopy = { ...movie };
    delete movieCopy._id;

    return http.put(movieUrl(movie._id), movieCopy);
  }
  movie.numberInStock = Number(movie.numberInStock);
  movie.dailyRentalRate = Number(movie.dailyRentalRate);
  console.log(movie);
  return http.post(config.apiUrl + "/movies", movie);
};

export const deleteMovie = async (id) => {
  return http.delete(movieUrl(id));
};
