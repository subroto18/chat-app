import React from "react";

import type { MenuProps } from "antd";
import { Dropdown } from "antd";
import { HiDotsVertical } from "react-icons/hi";
import CreateGroup from "../CreateGroup/CreateGroup";
import { useRecoilState } from "recoil";
import { DrawerAtom } from "../../../../recoil/atoms";

const DropDown: React.FC = () => {
  const [drawerData, setDrawerData] = useRecoilState(DrawerAtom);

  const items: MenuProps["items"] = [
    {
      label: (
        <button
          onClick={() =>
            setDrawerData({
              ...drawerData,
              isDrawerActive: true,
            })
          }
        >
          Create Group
        </button>
      ),
      key: "0",
    },
    {
      label: "Logout",
      key: "1",
    },
  ];

  return (
    <Dropdown
      className="mt-2 cursor-pointer z-10"
      menu={{ items }}
      trigger={["click"]}
    >
      <a>
        <CreateGroup />
        <HiDotsVertical />
      </a>
    </Dropdown>
  );
};

export default DropDown;
