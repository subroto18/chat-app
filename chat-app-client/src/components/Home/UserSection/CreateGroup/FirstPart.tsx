import React, { useEffect, useState } from "react";
import DrawerComponent from "../../../Common/Drawer";
import Container from "../../../Common/Container";
import { FaCircleArrowRight } from "react-icons/fa6";

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
import { createGroup } from "../../../../recoil/atoms/chat";
import { ADD_USER, REMOVE_USER } from "../../../../utils/group";
const FirstPart: React.FC = () => {
  const [searchText, setSearchText] = useRecoilState(searchTextAtom);
  const [createGroupData, setCreateGroupData] = useRecoilState(createGroup);
  const performUserSearchApi = useSearchApi();
  const debouncedInputValue = useDebounce(searchText, DEBOUNCE_DELAY_TIME);

  const [userSearchData, setUserSearchData] =
    useRecoilState(searchUserSelector);
  const { users } = userSearchData;

  useEffect(() => {
    if (debouncedInputValue && Boolean(searchText)) {
      performUserSearchApi();
    }
  }, [searchText, debouncedInputValue]);

  const options = users?.map((item: { _id: string; name: string }) => {
    return {
      value: item._id,
      label: item.name,
    };
  });

  const addUserToGroup = (userIDS) => {
    let selectedUsers = [];

    let storedUser = createGroupData?.selectedUsers; // all store users

    if (storedUser?.length > userIDS?.length) {
      // remove users
      selectedUsers = REMOVE_USER(userIDS, storedUser);
    } else {
      // add users

      selectedUsers = ADD_USER(userIDS, storedUser, options);
    }

    setCreateGroupData({
      ...createGroupData,
      selectedUsers: selectedUsers,
    });
  };

  const onSearch = (value: any) => {
    if (Array.isArray(value)) {
      addUserToGroup(value);
    } else {
      setSearchText(value);
    }
  };

  return (
    <DrawerComponent backButton={false} title="Add Group Member">
      <Container>
        <div>
          <SelectInput
            className="bg-slate-200 border  border-gray-300 text-gray-900  rounded-lg focus:ring-blue-500 focus:outline-none block w-full  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:outline-none text-xs"
            placeholder="Search user and hit enter"
            onSearch={onSearch}
            value={createGroupData?.selectedUsers}
            defaultValue={createGroupData?.selectedUsers}
            options={options}
            mode={"multiple"}
            onChange={onSearch}
          />
        </div>
      </Container>

      {createGroupData?.selectedUsers?.length > 0 && (
        <div className="bg-slate-200 absolute bottom-0 py-10 w-full left-0 right-0 text-center flex justify-center cursor-pointer">
          <FaCircleArrowRight
            onClick={() =>
              setCreateGroupData({
                ...createGroupData,
                step: 2,
              })
            }
            className="text-4xl"
          />
        </div>
      )}
    </DrawerComponent>
  );
};

export default FirstPart;
