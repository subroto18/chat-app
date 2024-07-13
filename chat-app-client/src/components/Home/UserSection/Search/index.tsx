import React, { useEffect, useState } from "react";
import Container from "../../../Common/Container";

import { CloseSquareFilled } from "@ant-design/icons";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { searchUserSelector } from "../../../../recoil/selectors/user";

import { UserOutlined } from "@ant-design/icons";

import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { createChatSelector } from "../../../../recoil/selectors/chat";
import { CREATE_CHAT_OR_GET } from "../../../../service/chats";
import { userSelectedChatId } from "../../../../recoil/atoms/chat";
import Input from "../../../Common/Input";
import {
  isSearchVisibleAtom,
  searchTextAtom,
} from "../../../../recoil/atoms/user";
import useSearchApi from "../../../../useHook/useSearchApi";
import useDebounce from "../../../../useHook/useDebounce";
import { DEBOUNCE_DELAY_TIME } from "../../../../utils";

const index = () => {
  const [searchText, setSearchText] = useRecoilState(searchTextAtom);

  const [isSearchVisible, setIsSearchVisible] =
    useRecoilState(isSearchVisibleAtom);

  const performUserSearchApi = useSearchApi();
  const debouncedInputValue = useDebounce(searchText, DEBOUNCE_DELAY_TIME);
  const setSelectedChatId = useSetRecoilState(userSelectedChatId);
  const [createChatData, setCreateChatData] =
    useRecoilState(createChatSelector);
  const [userSearchData, setUserSearchData] =
    useRecoilState(searchUserSelector);
  const { users, loading, error } = userSearchData;

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

  const onHandleChange = (e: any) => {
    setSearchText(e);
    setIsSearchVisible(true); // show search result
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

    setIsSearchVisible(false); // hide search result
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
      <Input
        placeholder="Search by name or email"
        options={options}
        onChange={(value: any) => onHandleChange(value)}
        onClick={onSelect}
        clearTextIcon={icon}
        className="w-[100%] m-auto bg-slate-50 border  border-gray-300 text-gray-900  rounded-lg focus:ring-blue-500 focus:outline-none block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:outline-none text-xs"
      />

      {searchText && isSearchVisible && (
        <div className="px-4 bg-white mt-[.2rem] shadow-lg w-full  py-6 absolute  max-h-[20rem] z-10 overflow-auto">
          {loading ? (
            <>
              <div role="status" className="max-w-sm animate-pulse">
                <div className="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-full mb-2.5"></div>
                <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700  w-full mb-2.5"></div>
                <div className="h-4 bg-gray-200 rounded-full dark:bg-gray-700  w-full"></div>
                <span className="sr-only">Loading...</span>
              </div>
            </>
          ) : error ? (
            <></>
          ) : (
            <div className="">
              {options?.length > 0 ? (
                <>
                  {options.map((item, index) => {
                    return (
                      <p
                        onClick={() => onSelect(item.value)}
                        key={index}
                        className="font-semibold rounded-sm shadow-sm p-1 cursor-pointer hover:bg-slate-100"
                      >
                        {item.label}
                      </p>
                    );
                  })}
                </>
              ) : (
                <div>No user found</div>
              )}
            </div>
          )}
        </div>
      )}
    </Container>
  );
};

export default index;
