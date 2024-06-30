import api from "../api/Http";

const GET_ALL_CHATS = async (userId: string) => {
  const res = await api().get(`api/chat/all-chat?userId=${userId}`);
  return res;
};

const GET_MESSAGES_BY_ID = async (chatId: string) => {
  const res = await api().get(`api/message/${chatId}`);
  return res;
};

const SEND_MESSAGE = async (payload: { chatId: string; content: string }) => {
  const res = await api().post(`api/message/send`, payload);
  return res;
};

export { GET_ALL_CHATS, GET_MESSAGES_BY_ID, SEND_MESSAGE };
