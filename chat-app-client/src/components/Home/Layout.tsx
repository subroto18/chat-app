import UserSection from "./UserSection";
import Body from "./Body";
import CreateGroup from "./UserSection/CreateGroup";
import UpdateGroup from "./UserSection/UpdateGroup";
import UpdateProfile from "./UserSection/UpdateProfile";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { socketInit } from "../../recoil/atoms/socket";
import { useEffect } from "react";
import io from "socket.io-client";
import { SERVER_URL } from "../../utils/server";
const Layout = () => {
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
