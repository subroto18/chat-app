import React, { useEffect, useRef } from "react";
import Input from "../../Common/Input";
import { RiSendPlane2Fill } from "react-icons/ri";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import typingSound from "../../../assets/typing.mp3";
import {
  userMessagesAtom,
  userSelectedChatId,
  userTextMessage,
} from "../../../recoil/atoms/chat";

import { SEND_MESSAGE } from "../../../service/chats";
import {
  sendMessageSelector,
  userMessagesSelector,
} from "../../../recoil/selectors/chat";
import socket from "../../../utils/socket";
import {
  isTypingAtom,
  socketInit,
  typingAtom,
} from "../../../recoil/atoms/socket";
import { notificationAtom } from "../../../recoil/atoms/notification";
import { notificationSelector } from "../../../recoil/selectors/notification";
import notificationSound from "../../../assets/notification.mp3";
const Footer = () => {
  const typingSoundRef = useRef(null);
  const [sendMessageData, setSendMessageData] =
    useRecoilState(sendMessageSelector);
  const [typing, setTyping] = useRecoilState(typingAtom);
  const [messageData, setMessageData] = useRecoilState(userMessagesAtom);
  const { messages } = messageData || {};
  const [text, setText] = useRecoilState(userTextMessage);
  const selectedChatId = useRecoilValue(userSelectedChatId);
  const socketConnected = useRecoilValue(socketInit);
  const audioRef = useRef(new Audio(notificationSound));
  const setNotificationData = useSetRecoilState(notificationSelector);

  const onHandleChange = (text: string) => {
    setText(text);
    let typingTimer;
    if (!socketConnected) return;

    if (!typing) {
      setTyping(true);
      socket.emit("typing", selectedChatId); // send typing signal

      // play message sound

      clearTimeout(typingTimer); // Clear the timeout
      typingTimer = setTimeout(() => {
        setTyping(false);
        socket.emit("stopTyping", selectedChatId);
      }, 1000); // Set typing state to false after 3 seconds
    }

    // Cleanup the effect
    return () => {
      socket.off("message");
      clearTimeout(typingTimer);
    };
  };

  useEffect(() => {
    // Listen for messages from the server

    socket.on("message", (message) => {
      if (message?.chat?._id == selectedChatId) {
        setMessageData({
          ...messageData,
          messages: [...messages, message],
        });
      } else {
        // add notification
        setNotificationData({
          message: message,
          type: "add",
        });

        if (audioRef.current) {
          audioRef.current.play();
        }
      }
    });

    // Cleanup the effect
    return () => {
      socket.off("message");
    };
  }, [messageData]);

  const sendMessage = async () => {
    // loading

    setSendMessageData({
      ...sendMessageData,
      loading: true,
      error: "",
      message: {},
    });

    try {
      // stop typing

      socket.emit("stopTyping", selectedChatId);

      // success
      let response = await SEND_MESSAGE({
        chatId: selectedChatId,
        content: text,
      });
      setSendMessageData({
        ...sendMessageData,
        loading: false,
        error: "",
        message: response.data,
      });

      // after getting message add it into all messages

      setMessageData({
        ...messageData,
        messages: [...messages, response.data],
      });

      // after send message, clear messgae from chat
      setText("");
      socket.emit("newMessage", response.data);
    } catch (error: any) {
      // failed
      setSendMessageData({
        ...sendMessageData,
        loading: false,
        error:
          error?.response?.data?.message ||
          "Something went wrong while sending message",
        message: {},
      });
    }
  };

  return (
    <div className="bg-slate-200 absolute bottom-0 left-0 right-0 w-full py-3">
      <div className="flex justify-center">
        <div className="w-[90%] mr-2">
          <Input
            onKeyDown={sendMessage}
            onChange={onHandleChange}
            value={text}
            className="w-[100%] m-auto bg-slate-50 border  border-gray-300 text-gray-900  rounded-lg focus:ring-blue-500 focus:outline-none block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:outline-none text-xs"
          />
        </div>

        {text && (
          <RiSendPlane2Fill
            onClick={sendMessage}
            className={`mt-[10px] cursor-pointer ${
              sendMessageData?.loading && "text-slate-400"
            } `}
          />
        )}
      </div>
      <audio ref={typingSoundRef} src={typingSound} preload="auto" />
    </div>
  );
};

export default Footer;
