import UserSection from "./UserSection";
import Body from "./Body";
import CreateGroup from "./UserSection/CreateGroup";
import UpdateGroup from "./UserSection/UpdateGroup";
import UpdateProfile from "./UserSection/UpdateProfile";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";

import { useEffect, useRef } from "react";

import { modalAtom, profileAtom } from "../../recoil/atoms/profile";
import socket from "../../utils/socket";
import { isTypingAtom, socketInit } from "../../recoil/atoms/socket";
import typingSound from "../../assets/typing.mp3";
import VideoCalling from "./Body/VideoCalling";
import { userSelectedChatId } from "../../recoil/atoms/chat";

const Layout = () => {
  const audioRef = useRef(new Audio(typingSound));
  const [isModalOpen, setIsModalOpen] = useRecoilState(modalAtom);

  const profile = useRecoilValue(profileAtom);
  const [socketConnected, setSocketConnected] = useRecoilState(socketInit);
  const selectedChatId = useRecoilValue(userSelectedChatId);
  const { user } = profile || {};

  const setIsTyping = useSetRecoilState(isTypingAtom);

  // join user to room
  useEffect(() => {
    socket.emit("setup", user);
    socket.on("connected", () => {
      setSocketConnected(true);
    });

    socket.on("typing", () => {
      // play typing sound
      if (audioRef.current) {
        audioRef.current.play();
      }
      setIsTyping(true);
    });
    socket.on("stopTyping", () => {
      // stop typing sound
      if (audioRef.current) {
        audioRef.current.pause();
      }

      setIsTyping(false);
    });

    return () => {
      // Clean up the event listeners
      socket.off("typing");
      socket.off("stopTyping");
    };
  }, [user?._id]);

  return (
    <div className="grid  grid-cols-1 md:grid-cols-3  h-[100vh]">
      <div>
        <div className="md:hidden">
          {selectedChatId ? <Body /> : <UserSection />}
        </div>
        <div className="hidden md:block">
          <UserSection />
        </div>
      </div>
      <div className="hidden md:col-span-2 md:block ">
        <Body />
      </div>

      <CreateGroup />
      <UpdateGroup />
      <UpdateProfile />
      <VideoCalling />
    </div>
  );
};

export default Layout;
