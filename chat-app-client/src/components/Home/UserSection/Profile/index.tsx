import { Button, message } from "antd";

import { useRecoilState } from "recoil";
import { DrawerAtom } from "../../../../recoil/atoms";
import { DRAWER } from "../../../../utils/drawer";
import { AVATAR } from "../../../../utils/helper";
import { MdGroupAdd } from "react-icons/md";
import { IoMdLogOut } from "react-icons/io";
import { useState } from "react";
import { LOGOUT } from "../../../../service/auth";
import { useNavigate } from "react-router-dom";
const index = () => {
  const [loadingBtn, setLoadingBtn] = useState(false);
  const navigate = useNavigate();
  const [drawerData, setDrawerData] = useRecoilState(DrawerAtom);
  const onHandleLogOut = async () => {
    try {
      setLoadingBtn(true);
      await LOGOUT(); // logout
      navigate("/login"); // revigate to login after logout
      setLoadingBtn(false);
      message.success("Logout successfully");
    } catch (error: any) {
      setLoadingBtn(false);
      message.error(
        error?.response?.data?.message || "Something went wrong while logout"
      );
    }
  };

  return (
    <div className="flex justify-between px-5 py-3 bg-slate-200 mb-3 border-r-2 border-slate-300">
      <div className="flex">
        <img src={AVATAR} className="w-[40px] h-[40px] rounded-full" />
      </div>
      <div className="flex mt-1">
        <MdGroupAdd
          className="mr-2 text-2xl text-slate-500 cursor-pointer"
          title="Create Group"
          onClick={() => {
            setDrawerData({
              ...drawerData,
              isDrawerActive: DRAWER[0],
            });
          }}
        />

        <IoMdLogOut
          onClick={onHandleLogOut}
          title="logout"
          className="text-2xl text-slate-500 cursor-pointer"
        />
      </div>
    </div>
  );
};

export default index;
