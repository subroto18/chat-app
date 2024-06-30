import api from "../api/Http";

const USER = async () => {
  const res = await api().get("/api/user/logged-in-user");
  return res;
};

const LOGOUT = async () => {
  const res = await api().post("/api/user/logout");
  return res;
};

const GET_ALL_USERS = async () => {
  const res = await api().get(`/api/user/all-users`);
  return res;
};

const GET_USERS_BY_SEARCH = async (searchText: string) => {
  const res = await api().get(`api/user/search?q=${searchText}`);
  return res;
};

export { USER, LOGOUT, GET_ALL_USERS, GET_USERS_BY_SEARCH };
