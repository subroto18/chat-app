import React, { useEffect, useState } from "react";
import DrawerComponent from "../../../Common/Drawer";
import Container from "../../../Common/Container";
import { FaCircleArrowRight } from "react-icons/fa6";
import { HiCheckCircle } from "react-icons/hi";

import { CloseSquareFilled } from "@ant-design/icons";
import { useRecoilState } from "recoil";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { searchUserSelector } from "../../../../recoil/selectors/user";

import SelectInput from "../../../Common/Select";
import useSearchApi from "../../../../useHook/useSearchApi";
import useDebounce from "../../../../useHook/useDebounce";
import { searchTextAtom } from "../../../../recoil/atoms/user";
import { DEBOUNCE_DELAY_TIME } from "../../../../utils";
import Search from "../../../Common/AutoComplete";
import { Input } from "antd";
import { createGroup } from "../../../../recoil/atoms/chat";

const SecondPart: React.FC = () => {
  const [createGroupData, setCreateGroupData] = useRecoilState(createGroup);

  const handleBackClick = () => {
    setCreateGroupData({
      ...createGroupData,
      step: 1,
    });
  };

  return (
    <DrawerComponent
      handleBackClick={handleBackClick}
      title="New Group"
      backButton={true}
    >
      <Container>
        <Input placeholder="Enter group name" />
      </Container>
      <div className="bg-slate-200 absolute bottom-0 py-10 w-full left-0 right-0 text-center flex justify-center cursor-pointer">
        <HiCheckCircle className="text-5xl" />
      </div>
    </DrawerComponent>
  );
};

export default SecondPart;
