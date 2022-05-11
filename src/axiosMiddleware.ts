import axios from "axios";
import history from "./historyObject";

export function axiosMiddleware() {
  axios.interceptors.response.use(
    function (response) {
      return response;
    },
    function (error) {
      if (
        error.response.status === 401 &&
        history.location.pathname !== "/login"
      ) {
        history.replace("/unauthorized");
      }

      if (error.response.status === 404) {
        history.replace("/404");
      }

      return Promise.reject(error);
    }
  );
}
