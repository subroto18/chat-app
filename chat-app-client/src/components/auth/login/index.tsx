import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import React, { FormEvent } from "react";
import { profileSelector } from "../../../recoil/selectors/profile";
import { loginSelector } from "../../../recoil/selectors/auth/login";

import { LOGIN } from "../../../service/auth";
import { Button, message } from "antd";

import { useNavigate } from "react-router-dom";

const index = () => {
  const [loginData, setLoginData] = useRecoilState(loginSelector);
  const [user, setUser] = useRecoilState(profileSelector);
  const navigate = useNavigate();
  const onSubmitLogin = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    performLoginApi();
  };

  const performLoginApi = async () => {
    //  api loading
    setUser({
      ...user,
      loading: true,
    });

    try {
      // api success
      const response = await LOGIN({
        email: loginData.email,
        password: loginData.password,
      });
      // update state after api success
      setUser({
        ...user,
        loading: false,
        user: response?.data?.user,
        isAuthenticated: true,
      });

      // show notification

      message.success("Login successfull");

      // redirect to home page

      navigate("/");
    } catch (error: any) {
      // api failed
      // update state after api failed

      setUser({
        ...user,
        loading: false,
        isAuthenticated: false,
        error: true,
      });
      // show notification
      message.error(
        error?.response?.data?.message || "Something went wrong while login"
      );
    }
  };

  const isValid = Boolean(loginData.email) && Boolean(loginData.password);

  return (
    <form className="p-10">
      <div className="mb-6">
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Email
        </label>
        <input
          type="email"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Enter your email"
          required
          onChange={(e: any) =>
            setLoginData({
              ...loginData,
              email: e.target.value,
            })
          }
          value={loginData.email}
        />
      </div>
      <div className="mb-6">
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Password
        </label>
        <input
          type="password"
          id="password"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="•••••••••"
          required
          value={loginData.password}
          onChange={(e: any) =>
            setLoginData({
              ...loginData,
              password: e.target.value,
            })
          }
        />
      </div>

      <div className="flex items-start mb-6">
        <div className="flex items-center h-5">
          <input
            id="remember"
            type="checkbox"
            onChange={(e) => {
              setLoginData({
                ...loginData,
                rememberPassword: e.target.checked,
              });
            }}
            checked={loginData.rememberPassword}
            className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800"
          />
        </div>
        <label className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
          Remember password{" "}
        </label>
      </div>

      <Button
        onClick={(e: any) => onSubmitLogin(e)}
        type="primary"
        loading={user.loading}
        disabled={!isValid}
      >
        Login
      </Button>
    </form>
  );
};

export default index;
