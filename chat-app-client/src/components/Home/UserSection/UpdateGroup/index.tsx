import React, { useEffect, useState } from "react";

import Container from "../../../Common/Container";
import DrawerComponent from "../../../Common/Drawer";
import { useRecoilValue } from "recoil";
import { DrawerAtom } from "../../../../recoil/atoms";
import { DRAWER } from "../../../../utils/drawer";
import { selectedUserProfileSelector } from "../../../../recoil/selectors/profile";
import { AVATAR } from "../../../../utils/helper";

const index: React.FC = () => {
  const drawerData = useRecoilValue(DrawerAtom);

  const gropInfo = useRecoilValue(selectedUserProfileSelector);

  const { name, groupMember } = gropInfo || {};
  return drawerData.isDrawerActive === DRAWER[1] ? (
    <DrawerComponent placement="right" backButton={false} title="Group Info">
      <Container>
        <div className="shadow-md mb-2 text-center flex flex-col justify-center items-center">
          <div>
            <img src={AVATAR} />
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
