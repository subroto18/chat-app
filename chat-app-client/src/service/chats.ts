import api from "../api/Http";

const GET_ALL_CHATS = async () => {
  try {
    const res = await api().get("/api/chats");
    return res.data;
  } catch (error) {
    return error;
  }
};

export { GET_ALL_CHATS };
