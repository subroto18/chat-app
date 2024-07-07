import axios from "axios";
import { SERVER_URL } from "../utils/server";

const api = () => {
  const instance = axios.create({
    baseURL: SERVER_URL,
    withCredentials: true, // Include credentials with every request
  });
  return instance;
};

export default api;
