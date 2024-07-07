import React from "react";
import FirstPart from "./FirstPart";
import { useRecoilState, useRecoilValue } from "recoil";
import { createGroup } from "../../../../recoil/atoms/chat";
import SecondPart from "./SecondPart";
import { DrawerAtom } from "../../../../recoil/atoms";
import { DRAWER } from "../../../../utils/drawer";

const index = () => {
  const drawerData = useRecoilValue(DrawerAtom);
  const createGroupData = useRecoilValue(createGroup);

  return drawerData.isDrawerActive === DRAWER[0] ? (
    <div>{createGroupData.step === 1 ? <FirstPart /> : <SecondPart />}</div>
  ) : null;
};

export default index;
