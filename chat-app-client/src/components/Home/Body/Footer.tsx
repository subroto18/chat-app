import React, { useEffect } from "react";
import Input from "../../Common/Input";
import { RiSendPlane2Fill } from "react-icons/ri";
import { useRecoilState, useRecoilValue } from "recoil";
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

const Footer = () => {
  const [sendMessageData, setSendMessageData] =
    useRecoilState(sendMessageSelector);

  const [messageData, setMessageData] = useRecoilState(userMessagesAtom);
  const { messages } = messageData || {};
  const [text, setText] = useRecoilState(userTextMessage);

  const selectedChatId = useRecoilValue(userSelectedChatId);
  const onHandleChange = (text: string) => {
    setText(text);
  };

  useEffect(() => {
    // Listen for messages from the server
    socket.on("message", (message) => {
      setMessageData({
        ...messageData,
        messages: [...messages, message],
      });
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
    </div>
  );
};

export default Footer;
