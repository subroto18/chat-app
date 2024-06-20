import { Tabs } from "antd";
import Login from "./login";
import Signup from "./registration/";
const Tab = () => {
  return (
    <Tabs
      defaultActiveKey="1"
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
