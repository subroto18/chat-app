import React, { useEffect, useState } from "react";
import Container from "../../../Common/Container";
import Input from "../../../Common/Input";
import Search from "../../../Common/AutoComplete";
import { CloseSquareFilled } from "@ant-design/icons";
import { useRecoilState } from "recoil";
import { searchUserSelector } from "../../../../recoil/selectors/user";
import { GET_USERS_BY_SEARCH } from "../../../../service/user";
import { message } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { searchTextAtom } from "../../../../recoil/atoms/user";

const index = () => {
  const [searchText, setSearchText] = useState(searchTextAtom);

  const [userSearchData, setUserSearchData] =
    useRecoilState(searchUserSelector);
  const { users } = userSearchData;

  const onHandleText = (e) => {
    // update search
    setSearchText(e);
  };

  useEffect(() => {
    performUserSearchApi();
  }, [searchText]);

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
      value: item.name,
      label: (
        <>
          <div style={{ display: "flex", alignItems: "center" }}>
            <UserOutlined style={{ marginRight: 8 }} />
            {item.name}
          </div>
        </>
      ),
    };
    // return  { value: 'John Doe',
    //   label: (
    //     <div style={{ display: 'flex', alignItems: 'center' }}>
    //       <UserOutlined style={{ marginRight: 8 }} />
    //       John Doe
    //     </div>
    //   ),
    // },
  });

  console.log(searchText, "searchtext");

  return (
    <Container>
      <Search
        onChange={onHandleText}
        placeholder="Search"
        options={options}
        clearTextIcon={<CloseSquareFilled />}
        className=" bg-slate-200 border  border-gray-300 text-gray-900  rounded-lg focus:ring-blue-500 focus:outline-none block w-full  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:outline-none text-xs"
      />
      {/* <form>
        <Input className="bg-slate-200 border  border-gray-300 text-gray-900  rounded-lg focus:ring-blue-500 focus:outline-none block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:outline-none text-xs" />
      </form> */}
    </Container>
  );
};

export default index;
