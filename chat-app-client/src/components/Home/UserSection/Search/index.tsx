import React, { useEffect, useState } from "react";
import Container from "../../../Common/Container";
import Input from "../../../Common/Input";
import Search from "../../../Common/AutoComplete";
import { CloseSquareFilled } from "@ant-design/icons";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { searchUserSelector } from "../../../../recoil/selectors/user";
import { GET_USERS_BY_SEARCH } from "../../../../service/user";
import { message } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { searchTextAtom } from "../../../../recoil/atoms/user";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { createChatSelector } from "../../../../recoil/selectors/chat";
import { CREATE_CHAT_OR_GET } from "../../../../service/chats";
import { userSelectedChatId } from "../../../../recoil/atoms/chat";
import useDebounce from "../../../../useHook/useDebounce";
import { DEBOUNCE_DELAY_TIME } from "../../../../utils";

const index = () => {
  const [searchText, setSearchText] = useRecoilState(searchTextAtom);

  const debouncedInputValue = useDebounce(searchText, DEBOUNCE_DELAY_TIME);

  const setSelectedChatId = useSetRecoilState(userSelectedChatId);
  const [createChatData, setCreateChatData] =
    useRecoilState(createChatSelector);
  const [userSearchData, setUserSearchData] =
    useRecoilState(searchUserSelector);
  const { users } = userSearchData;

  const onHandleSearchText = (e) => {
    // update search
    setSearchText(e);
  };

  useEffect(() => {
    if (debouncedInputValue && Boolean(searchText)) {
      performUserSearchApi();
    }
  }, [searchText, debouncedInputValue]);

  const performUserSearchApi = async () => {
    // loading api

    setUserSearchData({
      ...userSearchData,
      loading: true,
    });

    // success api

    try {
      const response = await GET_USERS_BY_SEARCH(searchText);
      setUserSearchData({
        ...userSearchData,
        loading: false,
        users: response.data,
      });
    } catch (error: any) {
      message.error(
        error?.response?.data?.message || "Something went wrong while searching"
      );
      setUserSearchData({
        ...userSearchData,
        loading: false,
      });
    }

    // failed api
  };

  const options = users?.map((item: { _id: string; name: string }) => {
    return {
      value: item._id,
      label: (
        <>
          <div style={{ display: "flex", alignItems: "center" }}>
            <UserOutlined style={{ marginRight: 8 }} />
            {item.name}
          </div>
        </>
      ),
    };
  });

  const icon = userSearchData?.loading ? (
    <AiOutlineLoading3Quarters />
  ) : (
    <CloseSquareFilled />
  );

  const onSelect = (userId: string) => {
    performCreateChatApi(userId);
  };

  const performCreateChatApi = async (userId: string) => {
    // loading

    setCreateChatData({
      ...createChatData,
      loading: true,
      chat: {},
      error: "",
    });

    try {
      const response = await CREATE_CHAT_OR_GET({
        userId: userId,
      });
      setCreateChatData({
        ...createChatData,
        loading: false,
        chat: response?.data,
        error: "",
      });

      // after response , select that chat and show message page
      setSelectedChatId(response?.data?._id);
    } catch (error: any) {
      setCreateChatData({
        ...createChatData,
        loading: false,
        chat: {},
        error:
          error?.response?.data?.message ||
          "Something went wrong while creating  or fetching chat",
      });
    }
  };

  return (
    <Container>
      <Search
        onChange={(e: any) => onHandleSearchText(e)}
        value={searchText}
        placeholder="Search by name or email"
        options={options}
        onClick={onSelect}
        clearTextIcon={icon}
        className=" bg-slate-200 border  border-gray-300 text-gray-900  rounded-lg focus:ring-blue-500 focus:outline-none block w-full  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:outline-none text-xs"
      />
    </Container>
  );
};

export default index;
