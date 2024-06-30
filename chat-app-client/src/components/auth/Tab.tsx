import { Tabs } from "antd";
import Login from "./login";
import Signup from "./registration";
import { useRecoilValue } from "recoil";
import { Atom } from "../../recoil/atoms";
const Tab = () => {
  const { activeAuthTab } = useRecoilValue(Atom);
  return (
    <Tabs
      defaultActiveKey={activeAuthTab}
      centered
      items={[
        {
          label: "Login",
          key: "1",
          children: <Login />,
        },
        {
          label: "Sign Up",
          key: "2",
          children: <Signup />,
        },
      ]}
    />
  );
};

export default Tab;
