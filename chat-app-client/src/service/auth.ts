import api from "../api/Http";

const LOGIN = async (payload: { email: string; password: string }) => {
  const res = await api().post("/api/user/login", payload);
  return res;
};

const REGISTER = async (payload: {
  name: string;
  email: string;
  password: string;
}) => {
  const res = await api().post("/api/user/register", payload);
  return res;
};

const USER = async () => {
  const res = await api().get("/api/user/logged-in-user");
  return res;
};

const LOGOUT = async () => {
  const res = await api().post("/api/user/logout");
  return res;
};

export { LOGIN, REGISTER, USER, LOGOUT };
