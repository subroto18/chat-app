import { Button } from "antd";
import DropDown from "./Dropdown";
import { useRecoilState } from "recoil";
import { DrawerAtom } from "../../../../recoil/atoms";

const index = () => {
  const [drawerData, setDrawerData] = useRecoilState(DrawerAtom);

  return (
    <div className="flex justify-between px-5 py-3 bg-slate-200 mb-3 border-r-2 border-slate-300">
      <div>
        <img
          src={
            "data:image/png;base64,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"
          }
          className="w-[40px] h-[40px] rounded-full"
        />
      </div>

      <Button
        onClick={() => {
          setDrawerData({
            ...drawerData,
            isDrawerActive: true,
          });
        }}
      >
        Create Group
      </Button>
    </div>
  );
};

export default index;
