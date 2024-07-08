import UserSection from "./UserSection";
import Body from "./Body";
import CreateGroup from "./UserSection/CreateGroup";
import UpdateGroup from "./UserSection/UpdateGroup";
import UpdateProfile from "./UserSection/UpdateProfile";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";

import { useEffect, useRef } from "react";

import { profileAtom } from "../../recoil/atoms/profile";
import socket from "../../utils/socket";
import { isTypingAtom, socketInit } from "../../recoil/atoms/socket";
import typingSound from "../../assets/typing.mp3";
const Layout = () => {
  const audioRef = useRef(new Audio(typingSound));

  const profile = useRecoilValue(profileAtom);
  const [socketConnected, setSocketConnected] = useRecoilState(socketInit);
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
    <div className="grid  grid-cols-3  h-[100vh]">
      <div>
        <UserSection />
      </div>
      <div className="col-span-2 ">
        <Body />
      </div>

      <CreateGroup />
      <UpdateGroup />
      <UpdateProfile />
    </div>
  );
};

export default Layout;
