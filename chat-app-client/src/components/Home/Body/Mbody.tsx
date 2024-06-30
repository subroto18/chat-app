import React from "react";
import Container from "../../Common/Container";
import { useRecoilValue } from "recoil";
import { userMessagesAtom } from "../../../recoil/atoms/chat";
import { profileAtom } from "../../../recoil/atoms/profile";

const Mbody = () => {
  const messageData = useRecoilValue(userMessagesAtom);
  const { error, loading, messages } = messageData || {};
  const userData = useRecoilValue(profileAtom);
  const loggedInUserId = userData?.user?._id;

  return (
    <div className="h-[82vh] overflow-auto">
      <Container>
        <div className="py-10">
          {loading ? (
            <>
              <div className="flex items-center justify-center min-h-screen">
                <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-blue-500"></div>
              </div>
            </>
          ) : error ? (
            <>
              <div className="flex items-center justify-center min-h-screen">
                <div className="text-red-500 bg-red-100 border border-red-400 rounded p-4">
                  <p className="text-center font-semibold">{error}</p>
                </div>
              </div>
            </>
          ) : (
            <>
              {messages.map((item, index) => {
                const { content, sender } = item || {};

                const { _id } = sender || {};

                const isMe = _id == loggedInUserId;

                return (
                  <div key={index}>
                    <div
                      className={`my-6 flex ${
                        isMe ? "justify-end" : "justify-start"
                      }`}
                    >
                      <span
                        className={` ${
                          isMe ? "bg-[#D9FDD2]" : "bg-white"
                        }  rounded-md shadow-md p-3`}
                      >
                        {content}
                      </span>
                    </div>
                  </div>
                );
              })}
            </>
          )}
        </div>
      </Container>
    </div>
  );
};

export default Mbody;
