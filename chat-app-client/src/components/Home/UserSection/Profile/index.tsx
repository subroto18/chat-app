import { Button } from "antd";
import DropDown from "./Dropdown";
import { useRecoilState } from "recoil";
import { DrawerAtom } from "../../../../recoil/atoms";
import { DRAWER } from "../../../../utils/drawer";
import { AVATAR } from "../../../../utils/helper";

const index = () => {
  const [drawerData, setDrawerData] = useRecoilState(DrawerAtom);

  return (
    <div className="flex justify-between px-5 py-3 bg-slate-200 mb-3 border-r-2 border-slate-300">
      <div>
        <img src={AVATAR} className="w-[40px] h-[40px] rounded-full" />
      </div>

      <Button
        onClick={() => {
          setDrawerData({
            ...drawerData,
            isDrawerActive: DRAWER[0],
          });
        }}
      >
        Create Group
      </Button>
    </div>
  );
};

export default index;
