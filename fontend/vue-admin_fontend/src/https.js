import axios from "axios";
import store from "./store/index";

export default () => {
  return axios.create({
    baseURL: store.state.baseUrl,
    timeout: 9000,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${store.state.authentication.token}`
    }
  });
};
