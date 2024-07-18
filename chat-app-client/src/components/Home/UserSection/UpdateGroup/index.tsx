import React, { useCallback, useEffect, useState, memo, useMemo } from "react";
import { MdEdit } from "react-icons/md";
import Container from "../../../Common/Container";
import DrawerComponent from "../../../Common/Drawer";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { DrawerAtom } from "../../../../recoil/atoms";
import { DRAWER } from "../../../../utils/drawer";
import { selectedUserProfileSelector } from "../../../../recoil/selectors/profile";
import { AVATAR } from "../../../../utils/helper";
import Input from "../../../Common/Input";
import { IoMdCheckmark } from "react-icons/io";
import { UserOutlined } from "@ant-design/icons";
import { IoExitOutline } from "react-icons/io5";
import { IoMdArrowBack } from "react-icons/io";
import { FaCircleUser } from "react-icons/fa6";
import { RiArrowGoBackFill } from "react-icons/ri";
import { MdCancel } from "react-icons/md";
import { updateGroupNameSelector } from "../../../../recoil/selectors/chat";
import {
  addUserToGroupAtom,
  allChatsAtom,
  isAddUserGroupEnableAtom,
  isRenameGroupAtom,
  renameGroupAtom,
  selectedUsersAtom,
  userSelectedChatId,
} from "../../../../recoil/atoms/chat";
import { RENAME_GROUP } from "../../../../service/chats";
import { Button, message } from "antd";
import { searchUserSelector } from "../../../../recoil/selectors/user";
import {
  isSearchVisibleAtom,
  searchTextAtom,
} from "../../../../recoil/atoms/user";
import useDebounce from "../../../../useHook/useDebounce";
import { DEBOUNCE_DELAY_TIME } from "../../../../utils";
import useSearchApi from "../../../../useHook/useSearchApi";
import SelectInput from "../../../Common/Select";
import { ADD_USER, REMOVE_USER } from "../../../../utils/group";
const index: React.FC = memo(() => {
  const drawerData = useRecoilValue(DrawerAtom);
  const gropInfo = useRecoilValue(selectedUserProfileSelector);

  const [isAddUserToGroup, setIsAddUserToGroup] = useRecoilState(
    isAddUserGroupEnableAtom
  );

  const { name, groupMember } = gropInfo || {};

  const setUserToGroup = useSetRecoilState(addUserToGroupAtom);
  const selectedChatId = useRecoilValue(userSelectedChatId);
  const [isRenameGroup, setIsRenameGroup] = useRecoilState(isRenameGroupAtom);
  const [renameGroup, setRenameGroup] = useRecoilState(renameGroupAtom);
  const [UpdateGroupNameData, setUpdateGroupNameData] = useRecoilState(
    updateGroupNameSelector
  );
  const chatList = useRecoilValue(allChatsAtom);
  // const { loading, error } = UpdateGroupNameData || {};

  const selectedUsers = useRecoilValue(selectedUsersAtom);
  const [userSearchData, setUserSearchData] =
    useRecoilState(searchUserSelector);
  const { users, loading, error } = userSearchData;

  const [searchText, setSearchText] = useRecoilState(searchTextAtom);
  const debouncedInputValue = useDebounce(searchText, DEBOUNCE_DELAY_TIME);
  const performUserSearchApi = useSearchApi();
  const [isSearchVisible, setIsSearchVisible] =
    useRecoilState(isSearchVisibleAtom);
  useEffect(() => {
    if (debouncedInputValue && Boolean(searchText)) {
      performUserSearchApi();
    }
  }, [searchText, debouncedInputValue]);

  useEffect(() => {
    return () => {
      setIsSearchVisible(false); // show search result
    };
  }, []);

  // const onHandleChange = (e: any) => {
  //   setSearchText(e);
  //   setIsSearchVisible(true); // show search result
  // };

  const onGroupNameChange = (groupName) => {
    setRenameGroup(groupName);
  };

  const isGroupNameEditEnable = () => {
    setIsRenameGroup(!isRenameGroup);
    setRenameGroup(renameGroup ? renameGroup : name);
  };

  const onUpdateGroupName = () => {
    setIsRenameGroup(!isRenameGroup);
    performApi();
  };

  const performApi = async () => {
    // loading

    setUpdateGroupNameData({
      status: "loading",
    });

    try {
      const response = await RENAME_GROUP({
        chatId: selectedChatId,
        chatName: renameGroup,
      });

      setUpdateGroupNameData({
        status: "success",
        data: response?.data,
      });

      message.success("Group name has been updated!");
    } catch (error) {
      setUpdateGroupNameData({
        status: "error",
        data: error?.response?.data?.message,
      });
    }
  };

  const selectedUsersOption = selectedUsers?.map(
    (item: { _id: string; name: string }) => {
      return {
        value: item._id,
        label: (
          <>
            <div className="flex items-center  mb-2 ">
              <img
                className="w-[35px] rounded-full mr-2"
                src="https://media-del2-1.cdn.whatsapp.net/v/t61.24694-24/411159894_456245470495611_8630036977038336058_n.jpg?stp=dst-jpg_s96x96&ccb=11-4&oh=01_Q5AaICV7fI26g8lxtYixNliAWhGGaQDPNuq2WoqLvff1rzcg&oe=66A63551&_nc_sid=e6ed6c&_nc_cat=101"
              />
              {item.name}
            </div>
          </>
        ),
      };
    }
  );

  const options = users?.map((item: { _id: string; name: string }) => {
    return {
      value: item._id,
      label: (
        <>
          <div className="flex items-center  mb-2 ">
            <img
              className="w-[35px] rounded-full mr-2"
              src="https://media-del2-1.cdn.whatsapp.net/v/t61.24694-24/411159894_456245470495611_8630036977038336058_n.jpg?stp=dst-jpg_s96x96&ccb=11-4&oh=01_Q5AaICV7fI26g8lxtYixNliAWhGGaQDPNuq2WoqLvff1rzcg&oe=66A63551&_nc_sid=e6ed6c&_nc_cat=101"
            />
            {item.name}
          </div>
        </>
      ),
    };
  });

  const addUserToGroup = (userIDS) => {
    setUserToGroup(userIDS);
  };

  const onSearch = (value: any) => {
    if (Array.isArray(value)) {
      addUserToGroup(value);
    } else {
      setSearchText(value);
    }
  };

  console.log(isAddUserToGroup, "isAddUserToGroup");

  return drawerData.isDrawerActive === DRAWER[1] ? (
    <DrawerComponent placement="right" backButton={false} title="Group Info">
      <Container>
        <div className="shadow-md mb-2 text-center flex flex-col justify-center items-center">
          <div>
            <img src={AVATAR} />
          </div>

          <div className="my-5">
            {!isRenameGroup ? (
              <div className="flex justify-center">
                <h1 className="font-bold text-1xl">
                  {renameGroup ? renameGroup : name}
                </h1>
                <MdEdit
                  onClick={isGroupNameEditEnable}
                  className="ml-1 cursor-pointer"
                />
              </div>
            ) : (
              <div className="flex">
                <Input
                  onKeyDown={onUpdateGroupName}
                  value={renameGroup}
                  onChange={(text) => onGroupNameChange(text)}
                />
                <IoMdCheckmark
                  onClick={onUpdateGroupName}
                  className="text-2xl ml-1 mt-1 font-bold cursor-pointer"
                />
              </div>
            )}

            <p className="text-slate-400">
              Group . {selectedUsers?.length} members
            </p>
          </div>
        </div>

        {isAddUserToGroup ? (
          <div className="shadow-md  mb-2 p-3 max-h-[400px] overflow-y-auto">
            <IoMdArrowBack
              onClick={() => setIsAddUserToGroup(!isAddUserToGroup)}
              className="text-2xl cursor-pointer"
            />
            <SelectInput
              className="bg-slate-200 border  border-gray-300 text-gray-900  rounded-lg focus:ring-blue-500 focus:outline-none block w-full  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:outline-none text-xs mt-5"
              placeholder="Search user and hit enter"
              onSearch={onSearch}
              // value={createGroupData?.selectedUsers}
              // defaultValue={createGroupData?.selectedUsers}
              options={options}
              mode={"multiple"}
              onChange={onSearch}
            />
            <div className="mt-2 flex justify-end">
              <Button type="primary">Add To Group</Button>
            </div>
          </div>
        ) : (
          <>
            <div className="shadow-md mb-2 p-3 max-h-[400px] overflow-y-auto">
              <div className="">
                <div
                  onClick={() => setIsAddUserToGroup(!isAddUserToGroup)}
                  className="flex font-semibold rounded-sm shadow-sm p-3 cursor-pointer bg-slate-100 hover:bg-slate-100 mb-3"
                >
                  <FaCircleUser className="text-3xl text-green-600 mr-2" />
                  <span className="mt-1 text-1xl"> Add member</span>
                </div>

                {selectedUsersOption?.length > 0 ? (
                  <>
                    {selectedUsersOption.map((item, index) => {
                      return (
                        <div className="relative">
                          <p
                            // onClick={() => onSelect(item.value)}
                            key={index}
                            className="font-semibold rounded-sm shadow-sm p-3 bg-slate-100 hover:bg-slate-100 mb-3 w-full"
                          >
                            {item.label}
                          </p>
                          <MdCancel className="cursor-pointer text-red-500 absolute right-2 top-5 text-2xl" />
                        </div>
                      );
                    })}
                  </>
                ) : (
                  <div>No user found</div>
                )}
              </div>
            </div>

            <div className="shadow-md mb-2 p-3">
              <div className="flex cursor-pointer">
                <IoExitOutline className="text-red-500 text-2xl mr-2" />
                <p className="text-red-500 mt-[2px]">Exit group</p>
              </div>
            </div>
          </>
        )}
      </Container>
    </DrawerComponent>
  ) : null;
});

export default index;
