import {
  allChatsAtom,
  removeUserFromGroupAtom,
  selectedUsersAtom,
  userSelectedChatId,
} from "./../atoms/chat/index";
import { selector } from "recoil";
import {
  allChatsAtom,
  createChatAtom,
  createGroupChat,
  updateGroupNameAtom,
  userMessagesAtom,
  userSendMessage,
} from "../atoms/chat";
import { message } from "antd";
import { profileAtom } from "../atoms/profile";

export const searchUserSelector = selector({
  key: "allChatsState",
  get: async ({ get }: any) => {
    return get(allChatsAtom);
  },
  set: ({ set }, updatedValue) => {
    set(allChatsAtom, updatedValue);
  },
});

export const userMessagesSelector = selector({
  key: "messagesState",
  get: async ({ get }: any) => {
    return get(userMessagesAtom);
  },
  set: ({ set }, updatedValue) => {
    set(userMessagesAtom, updatedValue);
  },
});

export const sendMessageSelector = selector({
  key: "sendMessagesState",
  get: async ({ get }: any) => {
    return get(userSendMessage);
  },
  set: ({ get, set }, updatedValue) => {
    // get all the user and push latest message

    set(userSendMessage, updatedValue);
  },
});

export const createChatSelector = selector({
  key: "createChatState",
  get: async ({ get }: any) => {
    return get(createChatAtom);
  },
  set: ({ set }, updatedValue) => {
    set(createChatAtom, updatedValue);
  },
});

export const createGroupChatSelector = selector({
  key: "createGroupChatState",
  get: async ({ get }: any) => {
    return get(createGroupChat);
  },
  set: ({ set }, updatedValue) => {
    set(createGroupChat, updatedValue);
  },
});

export const updateGroupNameSelector = selector({
  key: "updateGroupNameState",
  get: async ({ get }: any) => {
    return get(updateGroupNameAtom);
  },
  set: ({ get, set }, payload) => {
    if (payload.status === "logading") {
      set(updateGroupNameAtom, {
        loading: true,
        error: "",
        groupNameData: {},
      });
    } else if (payload.status === "success") {
      // update chatlist

      let chatListData = get(allChatsAtom);

      let chatList = chatListData?.chats?.map((item: any) => {
        if (item._id == payload.data?._id) {
          return payload.data;
        } else {
          return item;
        }
      });

      set(allChatsAtom, { ...chatListData, chats: chatList });

      set(updateGroupNameAtom, {
        loading: false,
        error: "",
        groupNameData: payload.data,
      });
    } else {
      set(updateGroupNameAtom, {
        loading: false,
        error: payload.error,
        groupNameData: {},
      });
    }
  },
});

export const removeMemberFromGroupSelector = selector({
  key: "removeMemberFromGroup",

  get: async ({ get }: any) => {
    return get(removeUserFromGroupAtom);
  },
  set: ({ get, set }, payload) => {
    let removeUserData = get(removeUserFromGroupAtom);
    if (payload.status === "loading") {
      set(removeUserFromGroupAtom, { ...removeUserData, ...payload.data });
    } else if (payload.status == "success") {
      let chatListData = get(allChatsAtom);
      const { chats } = chatListData || {};
      let selectedUserChatId = get(userSelectedChatId);
      let selectedUsers = get(selectedUsersAtom);

      // if user remove from group, remove selectedUsersAtom

      const updatedUsers = selectedUsers?.filter(
        (item) => item?._id !== payload?.id
      );
      set(selectedUsersAtom, updatedUsers);

      // remove from group, remove allChatsAtom

      const updatedChatList = chats?.map((item) => {
        if (item._id === selectedUserChatId) {
          let users = item?.users?.filter((user) => user._id !== payload?.id);
          return {
            ...item,
            users: users,
          };
        } else {
          return item;
        }
      });

      set(selectedUsersAtom, {
        ...allChatsAtom,
        chats: updatedChatList,
      });

      message.success("User has been successfully removed!");
    } else {
      set(removeUserFromGroupAtom, { ...removeUserData, ...payload.data });
    }
  },
});

export const isLoggedInUserGroupAdminSelector = selector({
  key: "isLoggedInUserGroupAdmin",
  get: async ({ get }: any) => {
    const selectedUserId = get(userSelectedChatId);
    const loggedInUser = get(profileAtom);
    const chatDataList = get(allChatsAtom);

    const loggedInUserId = loggedInUser?.user?._id;

    const groupAdminId = chatDataList?.chats?.filter(
      (item) => item._id === selectedUserId
    )?.[0]?.groupAdmin?._id;

    return loggedInUserId === groupAdminId;
  },
});
