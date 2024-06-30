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

  const data = [
    { name: "Me", message: "Hey, how are you doing?" },
    { name: "Friend", message: "I'm good, thanks! How about you?" },
    {
      name: "Me",
      message:
        "I'm doing well, just busy with work. Any plans for the weekend?",
    },
    {
      name: "Friend",
      message:
        "Not much, just thinking about relaxing and maybe watching a movie. You?",
    },
    {
      name: "Me",
      message: "Sounds nice! I'm planning to go hiking if the weather is good.",
    },
    {
      name: "Friend",
      message: "That sounds fun! Where do you usually go hiking?",
    },
    {
      name: "Me",
      message:
        "There's a nice trail about an hour away from the city. It's a great spot with beautiful views.",
    },
    {
      name: "Friend",
      message: "That sounds awesome. I might join you next time!",
    },
    {
      name: "Me",
      message:
        "You're welcome to join anytime! It would be great to have some company.",
    },
    { name: "Friend", message: "Thanks! I'll definitely keep that in mind." },
  ];

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
