import React, { useEffect, useState } from "react";
import DrawerComponent from "../../../Common/Drawer";
import Container from "../../../Common/Container";
import { HiCheckCircle } from "react-icons/hi";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";

import { Input, message } from "antd";
import { createGroup } from "../../../../recoil/atoms/chat";
import { createGroupChatSelector } from "../../../../recoil/selectors/chat";
import { CREATE_GROUP_CHAT } from "../../../../service/chats";

import { drawerSelector } from "../../../../recoil/selectors";

const SecondPart: React.FC = () => {
  const [createGroupData, setCreateGroupData] = useRecoilState(createGroup);
  const [drawerData, setDrawerData] = useRecoilState(drawerSelector);
  const { groupName, selectedUsers } = createGroupData || {};

  const [createGroupApiData, setCreateGroupApiData] = useRecoilState(
    createGroupChatSelector
  );

  const handleBackClick = () => {
    setCreateGroupData({
      ...createGroupData,
      step: 1,
    });
  };

  const createGroupChat = async () => {
    // loading

    setCreateGroupApiData({
      ...createGroupApiData,
      loading: true,
      data: {},
      error: "",
    });

    try {
      let payload = {
        groupName: groupName,
        users: selectedUsers?.map((item) => item?.value),
        isGroupChat: true,
      };
      // api success
      const response = await CREATE_GROUP_CHAT(payload);

      setCreateGroupApiData({
        ...createGroupApiData,
        loading: true,
        data: response?.data,
        error: "",
      });

      message.success("Group chat has been created!");

      // after group create clear createGroupData

      setCreateGroupData({
        ...createGroupData,
        selectedUsers: [],
        groupName: "",
      });

      // close the drawer

      setDrawerData({
        ...drawerData,
        isDrawerActive: "",
      });
    } catch (error: any) {
      // api faluire

      const errorMessage =
        error?.response?.data?.message ||
        "something went wrong while creating group chat";

      setCreateGroupApiData({
        ...createGroupApiData,
        loading: true,
        data: {},

        error: errorMessage,
      });

      message.error(errorMessage);
    }
  };

  return (
    <DrawerComponent
      handleBackClick={handleBackClick}
      title="New Group"
      backButton={true}
    >
      <Container>
        <Input
          onChange={(e) =>
            setCreateGroupData({
              ...createGroupData,
              groupName: e.target.value,
            })
          }
          placeholder="Enter group name"
        />
      </Container>
      <div className="bg-slate-200 absolute bottom-0 py-10 w-full left-0 right-0 text-center flex justify-center cursor-pointer">
        <HiCheckCircle onClick={createGroupChat} className="text-5xl" />
      </div>
    </DrawerComponent>
  );
};

export default SecondPart;
