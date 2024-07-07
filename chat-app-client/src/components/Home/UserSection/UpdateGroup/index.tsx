import React, { useEffect, useState } from "react";

import Container from "../../../Common/Container";
import DrawerComponent from "../../../Common/Drawer";
import { useRecoilValue } from "recoil";
import { DrawerAtom } from "../../../../recoil/atoms";
import { DRAWER } from "../../../../utils/drawer";
import { selectedUserProfileSelector } from "../../../../recoil/selectors/profile";

const index: React.FC = () => {
  const drawerData = useRecoilValue(DrawerAtom);

  const gropInfo = useRecoilValue(selectedUserProfileSelector);

  const { name, groupMember } = gropInfo || {};
  return drawerData.isDrawerActive === DRAWER[1] ? (
    <DrawerComponent placement="right" backButton={false} title="Group Info">
      <Container>
        <div className="shadow-md mb-2 text-center flex flex-col justify-center items-center">
          <div>
            <img src="data:image/png;base64,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" />
          </div>

          <div className="my-5">
            <h1 className="font-bold text-1xl">{name}</h1>
            <p className="text-slate-400">Group . {groupMember} members</p>
          </div>
        </div>
      </Container>
    </DrawerComponent>
  ) : null;
};

export default index;
