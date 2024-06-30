import React from "react";
import Input from "../../Common/Input";
import { RiSendPlane2Fill } from "react-icons/ri";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  userSelectedChatId,
  userSendMessage,
  userTextMessage,
} from "../../../recoil/atoms/chat";
import { SEND_MESSAGE } from "../../../service/chats";
const Footer = () => {
  const [text, setText] = useRecoilState(userTextMessage);
  const [sendMessageData, setSendMessageData] = useRecoilState(userSendMessage);
  const selectedChatId = useRecoilValue(userSelectedChatId);
  const onHandleChange = (text: string) => {
    setText(text);
  };
  const sendMessage = async () => {
    // loading

    setSendMessageData({
      ...sendMessageData,
      loading: true,
      error: "",
      message: {},
    });

    try {
      let response = await SEND_MESSAGE({
        chatId: selectedChatId,
        content: text,
      });
      setSendMessageData({
        ...sendMessageData,
        loading: true,
        error: "",
        message: response.data,
      });
      // after send message, clear messgae from chat
      setText("");
    } catch (error: any) {
      setSendMessageData({
        ...sendMessageData,
        loading: false,
        error:
          error?.response?.data?.message ||
          "Something went wrong while sending message",
        message: {},
      });
    }

    // success
    // failed
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
