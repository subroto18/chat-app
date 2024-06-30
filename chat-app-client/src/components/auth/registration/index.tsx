import { useRecoilState, useSetRecoilState } from "recoil";
import { registerAtom } from "../../../recoil/atoms/auth/register";
import { profileAtom } from "../../../recoil/atoms/profile";
import { REGISTER } from "../../../service/auth";
import { Button, message } from "antd";
import { constants } from "zlib";
import { Atom } from "../../../recoil/atoms";

const index = () => {
  const [registerData, setRegisterData] = useRecoilState(registerAtom);
  const [atom, setAtom] = useRecoilState(Atom);
  const [user, setUser] = useRecoilState(profileAtom);

  const { name, email, password, confirmPassword } = registerData;

  const isPasswordMatch = () => {
    if (!confirmPassword) {
      return true;
    } else {
      return password === confirmPassword;
    }
  };

  const isFormValid =
    Boolean(name) &&
    Boolean(email) &&
    Boolean(password) &&
    Boolean(confirmPassword) &&
    isPasswordMatch();

  const onSubmitRegister = async (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();

    if (isPasswordMatch()) {
      performRegisterApi();
    }
  };

  const performRegisterApi = async () => {
    //  api loading
    setUser({
      ...user,
      loading: true,
    });

    try {
      // api success
      await REGISTER({
        name: name,
        email: email,
        password: password,
      });
      // update state after api success
      setUser({
        ...user,
        loading: false,
      });

      // after successfull registration , remove register form data

      setRegisterData({
        ...registerData,
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
      });

      // set active tab to login
      setAtom({
        ...atom,
        activeAuthTab: "1",
      });

      // show notification

      message.success("Register successfully");

      // redirect to home page
    } catch (error: any) {
      // api failed
      // update state after api failed

      setUser({
        ...user,
        loading: false,
      });
      // show notification
      message.error(
        error?.response?.data?.message || "Something went wrong while login"
      );
    }
  };

  return (
    <form onSubmit={(e: any) => onSubmitRegister(e)} className="p-10">
      <div className="mb-6 ">
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Name
          </label>
          <input
            type="text"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Enter your name"
            value={name}
            onChange={(e) =>
              setRegisterData({
                ...registerData,
                name: e.target.value,
              })
            }
            required
          />
        </div>
      </div>
      <div className="mb-6">
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Email
        </label>
        <input
          type="email"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Enter your email"
          required
          value={email}
          onChange={(e) =>
            setRegisterData({
              ...registerData,
              email: e.target.value,
            })
          }
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
          value={password}
          onChange={(e) =>
            setRegisterData({
              ...registerData,
              password: e.target.value,
            })
          }
        />
      </div>
      <div className="mb-6">
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Confirm password
        </label>
        <input
          type="password"
          id="confirm_password"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="•••••••••"
          required
          value={confirmPassword}
          onChange={(e) =>
            setRegisterData({
              ...registerData,
              confirmPassword: e.target.value,
            })
          }
        />
      </div>

      {!isPasswordMatch() && (
        <p className="bg-red-300 p-2 rounded-sm mb-2">Password do not match </p>
      )}

      <Button
        onClick={(e: any) => onSubmitRegister(e)}
        type="primary"
        loading={user.loading}
        disabled={!isFormValid}
      >
        Register
      </Button>
    </form>
  );
};

export default index;
