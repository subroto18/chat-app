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

const CREATE_CHAT_OR_GET = async (payload: { userId: string }) => {
  const res = await api().post(`api/chat/`, payload);
  return res;
};

const CREATE_GROUP_CHAT = async (payload: any) => {
  const res = await api().post(`api/chat/create-group-chat`, payload);
  return res;
};

const RENAME_GROUP = async (payload: any) => {
  const res = await api().put(`api/chat/rename-group`, payload);
  return res;
};

export {
  GET_ALL_CHATS,
  GET_MESSAGES_BY_ID,
  SEND_MESSAGE,
  CREATE_CHAT_OR_GET,
  CREATE_GROUP_CHAT,
  RENAME_GROUP,
};
