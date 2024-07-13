import React, { useState } from "react";
import Container from "../../Common/Container";
import { Button, message, Dropdown } from "antd";
import { LOGOUT } from "../../../service/auth";
import type { MenuProps } from "antd";
import { MdOutlineKeyboardBackspace } from "react-icons/md";

import { useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { modalAtom } from "../../../recoil/atoms/profile";
import { selectedUserProfileSelector } from "../../../recoil/selectors/profile";
import { DrawerAtom } from "../../../recoil/atoms";
import { DRAWER } from "../../../utils/drawer";
import NotificationBadge from "./NotificationBadge";
import { AVATAR } from "../../../utils/helper";
import VideoIcon from "./VideoIcon";
import { userSelectedChatId } from "../../../recoil/atoms/chat";
const Header = () => {
  const [modalData, setModalData] = useRecoilState(modalAtom);
  const [drawerData, setDrawerData] = useRecoilState(DrawerAtom);
  const setSelectedChatId = useSetRecoilState(userSelectedChatId);
  const selectedUserProfile = useRecoilValue(selectedUserProfileSelector);

  const { name, groupChat } = selectedUserProfile || {};

  const updateProfile = () => {
    if (groupChat) {
      setDrawerData({
        ...drawerData,
        isDrawerActive: DRAWER[1],
      });
    } else {
      setModalData({
        ...modalData,
        profile: true,
      });
    }
  };

  const items: MenuProps["items"] = [
    {
      label: <button>Create Group</button>,
      key: "0",
    },
    {
      label: "Logout",
      key: "1",
    },
  ];

  const goBackToChatList = () => {
    setSelectedChatId("");
  };

  return (
    <div className="bg-slate-200 dark:bg-customDark w-full">
      <Container>
        <div className="flex justify-between">
          <div className="py-3 flex">
            <div className="flex">
              <MdOutlineKeyboardBackspace
                onClick={goBackToChatList}
                className=" md:hidden cursor-pointer mt-1 text-3xl mr-3"
              />
              <div className=" h-[40px] w-[45px] rounded-full">
                <img
                  onClick={updateProfile}
                  className="w-full h-full rounded-full  cursor-pointer"
                  src={AVATAR}
                />
              </div>
            </div>

            <h1 className="ml-3 mt-2">{name}</h1>
          </div>
          <div>
            <div className="flex">
              {/* <VideoIcon className="mt-5 text-3xl mr-3 text-slate-50 disabled" /> */}
              <NotificationBadge />
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Header;
