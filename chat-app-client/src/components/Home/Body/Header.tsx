import React, { useState } from "react";
import Container from "../../Common/Container";
import { Button, message } from "antd";
import { LOGOUT } from "../../../service/auth";

import { useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { modalAtom } from "../../../recoil/atoms/profile";
import { selectedUserProfileSelector } from "../../../recoil/selectors/profile";
import { DrawerAtom } from "../../../recoil/atoms";
import { DRAWER } from "../../../utils/drawer";

const Header = () => {
  const [loadingBtn, setLoadingBtn] = useState(false);
  const [isModalOpen, setIsModalOpen] = useRecoilState(modalAtom);
  const [drawerData, setDrawerData] = useRecoilState(DrawerAtom);
  const navigate = useNavigate();

  const selectedUserProfile = useRecoilValue(selectedUserProfileSelector);

  const { name, groupChat } = selectedUserProfile || {};

  const onHandleLogOut = async () => {
    try {
      setLoadingBtn(true);
      await LOGOUT(); // logout
      navigate("/login"); // revigate to login after logout
      setLoadingBtn(false);
      message.success("Logout successfully");
    } catch (error: any) {
      setLoadingBtn(false);
      message.error(
        error?.response?.data?.message || "Something went wrong while logout"
      );
    }
  };

  const updateProfile = () => {
    console.log(selectedUserProfile);
    if (groupChat) {
      setDrawerData({
        ...drawerData,
        isDrawerActive: DRAWER[1],
      });
    } else {
      setIsModalOpen(true);
    }
  };

  return (
    <div className="bg-slate-200 dark:bg-customDark w-full">
      <Container>
        <div className="flex justify-between">
          <div className="py-3 flex">
            <div className="h-[40px] w-[45px] rounded-full">
              <img
                onClick={updateProfile}
                className="w-full h-full rounded-full  cursor-pointer"
                src={
                  "https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes.png"
                }
              />
            </div>

            <h1 className="ml-3 mt-2">{name}</h1>
          </div>
          <div>
            <Button
              onClick={onHandleLogOut}
              loading={loadingBtn}
              className="mt-4"
            >
              Login
            </Button>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Header;
