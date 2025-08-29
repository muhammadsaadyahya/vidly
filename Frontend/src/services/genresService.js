import https from "./http";
import config from "../components/common/config.json";

export const getGenres = () => {
  return https.get(config.apiUrl + "/genres");
};
