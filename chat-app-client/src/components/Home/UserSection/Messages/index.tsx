import { useRecoilState, useRecoilValue } from "recoil";
import { useRef } from "react";
import Container from "../../../Common/Container";
import {
  allChatsAtom,
  createChatAtom,
  userSelectedChatId,
} from "../../../../recoil/atoms/chat";
import { useEffect, useState } from "react";
import { profileAtom } from "../../../../recoil/atoms/profile";
import { GET_ALL_CHATS, GET_MESSAGES_BY_ID } from "../../../../service/chats";
import Shimmer from "../../../Common/Shimmer";
import { userMessagesSelector } from "../../../../recoil/selectors/chat";
import { CHAT_DATE_TIME_CALCULATION } from "../../../../utils/date";
import socket from "../../../../utils/socket";
import { AVATAR } from "../../../../utils/helper";
const index = () => {
  const [chatList, setChatList] = useRecoilState(allChatsAtom);
  const createChatData = useRecoilValue(createChatAtom);
  const [messageData, setMessageData] = useRecoilState(userMessagesSelector);
  const [selectedChatId, setSelectedChatId] =
    useRecoilState(userSelectedChatId);

  const { chats, loading } = chatList;

  const loggedInUserData = useRecoilValue(profileAtom);

  const loggedInUserId = loggedInUserData?.user?._id;

  // Add a state to store refs

  useEffect(() => {
    performChatListApi();
  }, [loggedInUserId]);

  // fetch messages when id changes
  useEffect(() => {
    performUserMessageApi();
  }, [selectedChatId]);

  // go to specific user

  useEffect(() => {
    scrollToChat();
  }, [createChatData]);

  const scrollToChat = () => {
    const chatElement = document.getElementById(`chat-${selectedChatId}`);
    if (chatElement) {
      chatElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  const performChatListApi = async () => {
    // loading api

    setChatList({
      ...chatList,
      loading: true,
      error: "",
      chats: [],
    });

    try {
      let response = await GET_ALL_CHATS(loggedInUserId);
      setChatList({
        ...chatList,
        loading: false,
        chats: response?.data,
        error: "",
      });
    } catch (error: any) {
      setChatList({
        ...chatList,
        loading: false,
        error:
          error?.response?.data?.message ||
          "Something went wrong while fetching chat list",
      });
    }
  };

  const performUserMessageApi = async () => {
    // loading
    setMessageData({
      ...messageData,
      loading: true,
      error: "",
      messages: [],
    });

    try {
      let response = await GET_MESSAGES_BY_ID(selectedChatId);

      setMessageData({
        ...messageData,
        messages: response?.data,
        loading: false,
        error: "",
      });
    } catch (error: any) {
      setMessageData({
        ...messageData,
        loading: false,
        error:
          error?.response?.data?.message ||
          "Something went wrong while fetching messages",
      });
    }
  };

  // set chat id to fetch messages based on that
  const onHandleSelectdChatId = (chatId: string) => {
    setSelectedChatId(chatId);

    // join chat room for real time data

    if (socket !== null) {
      socket.emit("joinChat", chatId);
    }
  };

  return (
    <div className=" w-full  bg-slate-50 ">
      {loading ? (
        <>
          {[...Array(10)]?.map((item) => {
            return (
              <div key={item}>
                <Container>
                  <div className="flex py-2 ">
                    <Shimmer />
                  </div>
                </Container>
              </div>
            );
          })}
        </>
      ) : (
        <>
          {chats?.map((item, index) => {
            const { chatName, isGroupChat, latestMessage, _id, users } =
              item || {};

            let name =
              users?.filter((item) => item._id !== loggedInUserId)?.[0]?.name ||
              "unknow";

            const { content, createdAt } = latestMessage || {};
            const chatTitle = isGroupChat ? chatName : name;

            const date = Boolean(createdAt)
              ? CHAT_DATE_TIME_CALCULATION(createdAt)
              : null;

            return (
              <div
                id={`chat-${_id}`} // Assign a unique ID
                key={index}
                className={` ${selectedChatId === _id ? "bg-slate-300" : ""}
          hover:bg-slate-300 hover:cursor-pointer border-b-2 overflow-y-auto `}
              >
                <Container>
                  <div
                    onClick={() => onHandleSelectdChatId(_id)}
                    className="flex py-2 "
                  >
                    <div className="flex items-center w-[12%]">
                      <img className="h-[50px] rounded-full" src={AVATAR} />
                    </div>
                    <div className="ml-2 flex justify-between w-[90%]">
                      <div className="">
                        <h1 className={`font-semibold ${!content && "mt-3"} `}>
                          {chatTitle}
                        </h1>
                        {content && (
                          <p className="text-sm text-slate-600">
                            {isGroupChat ? `${name}:${content}` : content}
                          </p>
                        )}
                      </div>
                      <div className="">
                        <p className="text-sm text-slate-600 mt-1">{date}</p>
                      </div>
                    </div>
                  </div>
                </Container>
              </div>
            );
          })}
        </>
      )}
    </div>
  );
};

export default index;
