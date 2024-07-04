import React from "react";
import FirstPart from "./FirstPart";
import { useRecoilState, useRecoilValue } from "recoil";
import { createGroup } from "../../../../recoil/atoms/chat";
import SecondPart from "./SecondPart";

const index = () => {
  const createGroupData = useRecoilValue(createGroup);

  return (
    <div>{createGroupData.step === 1 ? <FirstPart /> : <SecondPart />}</div>
  );
};

export default index;
