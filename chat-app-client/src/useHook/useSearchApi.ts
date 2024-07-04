import { searchUserSelector } from "../recoil/selectors/user";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { GET_USERS_BY_SEARCH } from "../service/user";
import { message } from "antd";
import { searchTextAtom } from "../recoil/atoms/user";

const useSearchApi = () => {
  const searchText = useRecoilValue(searchTextAtom);
  const setSearch = useSetRecoilState(searchTextAtom);
  const [userSearchData, setUserSearchData] =
    useRecoilState(searchUserSelector);

  const performUserSearchApi = async () => {
    // loading api

    // setUserSearchData({
    //   ...userSearchData,
    //   loading: true,
    // });

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

  return performUserSearchApi;
};

export default useSearchApi;
