import React, { useEffect, useRef } from "react";
import { FcVideoCall } from "react-icons/fc";
import { useRecoilState } from "recoil";
import { modalAtom } from "../../../recoil/atoms/profile";
const VideoCall = ({ className }: any) => {
  const [modalData, setModalData] = useRecoilState(modalAtom);
  return (
    <>
      <div className={className}>
        <FcVideoCall
          onClick={() => {
            setModalData({
              ...modalData,
              videoCall: true,
            });
          }}
          className="text-slate-50"
        />
      </div>
    </>
  );
};

export default VideoCall;
