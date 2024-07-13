import React, { useEffect, useRef } from "react";
import { FcVideoCall } from "react-icons/fc";
import { useRecoilState, useRecoilValue } from "recoil";
import { userSelectedChatId, videoCallAtom } from "../../../recoil/atoms/chat";
import socket from "../../../utils/socket";
import Peer from "simple-peer";

import ModalComponent from "../../Common/Modal";
import Container from "../../Common/Container";
import { modalAtom } from "../../../recoil/atoms/profile";
import global from "global"; // Import the polyfilled global

const VideoCalling = ({ className }: any) => {
  const [videoData, setVideoData] = useRecoilState(videoCallAtom);
  const selectedChatId = useRecoilValue(userSelectedChatId);
  const [modalData, setModalData] = useRecoilState(modalAtom);
  const { stream, me, name, caller, callerSignal, callAccepted, callEnded } =
    videoData || {};

  const myVideo = useRef();
  const userVideo = useRef();
  const connectionRef = useRef();

  //   useEffect(() => {
  //     // navigator.mediaDevices
  //     //   .getUserMedia({ video: true, audio: true })
  //     //   .then((stream) => {
  //     //     setVideoData({
  //     //       ...videoData,
  //     //       stream: stream,
  //     //     });
  //     //     if (myVideo.current) {
  //     //       myVideo.current.srcObject = stream;
  //     //     }
  //     //   });
  //     // socket.on("callUser", (data) => {
  //     //   setVideoData({
  //     //     ...videoData,
  //     //     receivingCall: true,
  //     //     caller: data.from,
  //     //     name: data.name,
  //     //     callerSignal: data.signal,
  //     //   });
  //     // });
  //     // if (selectedChatId) {
  //     //   callUser(selectedChatId);
  //     // }
  //   }, [modalData?.videoCall]);

  const callUser = (id) => {
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream: stream,
    });

    peer.on("signal", (data) => {
      socket.current.emit("callUser", {
        userToCall: id,
        signalData: data,
        from: me,
        name: name,
      });
    });

    peer.on("stream", (peerStream) => {
      if (userVideo.current) {
        userVideo.current.srcObject = peerStream;
      }
    });

    socket.current.on("callAccepted", (signal) => {
      setVideoData({
        ...videoData,
        callAccepted: true,
      });
      peer.signal(signal);
    });

    connectionRef.current = peer;
  };

  const answerCall = () => {
    setVideoData({
      ...videoData,
      callAccepted: true,
    });

    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream: stream,
    });

    peer.on("signal", (data) => {
      socket.emit("answerCall", {
        signal: data,
        to: caller,
      });
    });

    peer.on("stream", (stream) => {
      userVideo.current.srcObject = stream;
    });

    peer.signal(callerSignal).connectionRef.current = peer;
  };

  const leaveCall = () => {
    setVideoData({
      ...videoData,
      callEnded: true,
    });
    connectionRef.current.destroy();
  };

  const handleCancel = () => {};

  return (
    <Container>
      <ModalComponent
        modalOpen={modalData.videoCall}
        title={null}
        // onOk={handleOk}
        handleCancel={handleCancel}
      >
        <div>
          {stream && <video playsInline muted ref={myVideo} autoPlay />}
        </div>

        <div>
          {callAccepted && !callEnded && (
            <div>
              {stream && <video playsInline muted ref={userVideo} autoPlay />}
            </div>
          )}
        </div>
      </ModalComponent>
    </Container>
  );
};

export default VideoCalling;
