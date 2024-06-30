import axios from "axios";

const api = () => {
  const instance = axios.create({
    baseURL: "http://localhost:3000/",
    withCredentials: true, // Include credentials with every request
  });
  return instance;
};

export default api;
