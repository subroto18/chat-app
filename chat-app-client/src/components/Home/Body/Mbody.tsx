import React, { useRef, useEffect } from "react";
import moment from "moment";
import Container from "../../Common/Container";
import { useRecoilValue } from "recoil";
import {
  userMessagesAtom,
  userSelectedChatId,
} from "../../../recoil/atoms/chat";
import { profileAtom } from "../../../recoil/atoms/profile";
import { isTypingAtom, typingAtom } from "../../../recoil/atoms/socket";
import TypingIndicator from "../../Common/TypingIndicator";
import { CHAT_DATE_TIME_CALCULATION } from "../../../utils/date";

const Mbody = () => {
  const messagesEndRef = useRef(null);

  const messageData = useRecoilValue(userMessagesAtom);
  const { error, loading, messages } = messageData || {};

  const messageList = Array.isArray(messages) ? messages : [];

  const userData = useRecoilValue(profileAtom);
  const loggedInUserId = userData?.user?._id;
  const isTyping = useRecoilValue(isTypingAtom);
  const chatContainerRef = useRef(null);

  const selectedChatId = useRecoilValue(userSelectedChatId);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Scroll to bottom on component mount or update
  useEffect(() => {
    scrollToBottom();
  }, [selectedChatId]);

  return (
    <div
      ref={chatContainerRef}
      className="h-[82vh] overflow-hidden no-scrollbar"
    >
      <Container>
        <div className="py-10">
          {loading ? (
            <>
              <div className="flex items-center justify-center min-h-screen no-scrollbar">
                <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-blue-500"></div>
              </div>
            </>
          ) : error ? (
            <>
              <div className="flex items-center justify-center min-h-screen no-scrollbar">
                <div className="text-red-500 bg-red-100 border border-red-400 rounded p-4">
                  <p className="text-center font-semibold">{error}</p>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="flex flex-col-reverse h-[80vh] pt-10  overflow-y-auto no-scrollbar ">
                <div ref={messagesEndRef} />
                <div className="no-scrollbar">
                  {messageList?.map((item, index) => {
                    const { content, sender, createdAt } = item || {};

                    const { _id } = sender || {};

                    const isMe = _id == loggedInUserId;

                    return (
                      <div key={index}>
                        <div
                          className={`mb-1 flex ${
                            isMe ? "justify-end" : "justify-start"
                          }`}
                        >
                          <span
                            className={` ${
                              isMe ? "bg-[#D9FDD2]" : "bg-white"
                            }  rounded-md shadow-md px-3 py-2 `}
                          >
                            <span className="mr-2">{content}</span>
                            <span className="text-xs text-slate-500 mt-3">
                              {CHAT_DATE_TIME_CALCULATION(createdAt)}
                            </span>
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
              {isTyping ? (
                <div className="mb-10">
                  <TypingIndicator />
                </div>
              ) : null}
            </>
          )}
        </div>
      </Container>
    </div>
  );
};

export default Mbody;
