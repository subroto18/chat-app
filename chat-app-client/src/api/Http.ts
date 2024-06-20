import axios from "axios";

const api = () => {
  const instance = axios.create({
    baseURL: "http://localhost:3000/",
  });
  return instance;
};

export default api;
