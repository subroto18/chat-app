import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { profileAtom } from "./recoil/atoms/profile";
import { USER } from "./service/auth";
import Loading from "./components/Common/Loading";
const Layout = () => {
  const [user, setUser] = useRecoilState(profileAtom);
  const navigate = useNavigate();

  const isPageLoading = user?.isAuthenticated == null;

  useEffect(() => {
    // fetch user after refresh page

    if (isPageLoading) {
      performAuthApi();
    }
  }, []);

  const performAuthApi = async () => {
    // loading api

    setUser({
      ...user,
    });

    try {
      //   api success
      let response = await USER();
      //   update state after api success
      setUser({
        ...user,
        loading: false,
        user: response?.data?.user,
        isAuthenticated: true,
      });

      // navigate("/");
    } catch (error: any) {
      // api failed
      //   update state after api failed

      setUser({
        ...user,
        error: error?.response?.data?.message,
        isAuthenticated: false,
      });

      navigate("/login");
    }
  };

  return isPageLoading ? <Loading /> : <Outlet />;
};

export default Layout;
