import { selector } from "recoil";

import { profileAtom, selectedUserProfileAtom } from "../atoms/profile";
import { LOGIN } from "../../service/auth";
import { allChatsAtom, userSelectedChatId } from "../atoms/chat";

interface credentialsType {
  email: string;
  password: string;
}

// api.js
export const loginAPI = async (crediential: credentialsType) => {
  try {
    const response = await LOGIN(crediential);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const profileSelector = selector<any>({
  key: "profileState",
  get: async ({ get }: any) => {
    return get(profileAtom);
  },
  set: ({ set }, updatedValue) => {
    set(profileAtom, updatedValue);
  },
});

// when click on any chat fetch selected user
export const selectedUserProfileSelector = selector({
  key: "selectedUserProfileState",
  get: async ({ get }: any) => {
    // select user profile when click

    let chatListObject = get(allChatsAtom);
    const { chats } = chatListObject || [];

    const selectedChatId = get(userSelectedChatId);
    const loggedInUser = get(profileAtom);
    const loggedInUserId = loggedInUser?.user?._id;
    const selectedChat = chats?.filter((item) => item._id == selectedChatId);

    // if group chat

    if (selectedChat?.[0]?.isGroupChat) {
      return {
        name: selectedChat?.[0]?.chatName,
        groupChat: true,
        groupMember: selectedChat?.[0]?.users?.length - 1 || 0,
      };
    } else {
      const userInfo = selectedChat
        .flatMap((chat) => chat.users)
        .find((user) => user._id !== loggedInUserId);
      return { ...userInfo, groupChat: false };
    }
  },
});
