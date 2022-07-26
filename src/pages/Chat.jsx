import React, { useEffect, useContext } from "react";
import { useParams } from "react-router-dom";

import Sidebar from "../components/chat/Sidebar";
import Notifications from "../components/chat/Notifications";
import VideoPlayer from "../components/chat/VideoPlayer";
import Chatting from "../components/chat/Chatting";

import Header from "../components/main/Header";
import styled from "styled-components";
import { getCookie } from "../shared/Cookie";
import { SocketContext } from "../Context";
import AudioOff from "../public/images/AudioOff.svg";
import AudioOn from "../public/images/AudioOn.svg";
import VideoOff from "../public/images/VideoOff.svg";
import VideoOn from "../public/images/VideoOn.svg";
import ShareScreen from "../public/images/ShareScreen.svg";

const Chat = () => {
  const {
    socket,
    audioOn,
    videoOn,
    audioHandler,
    videoHandler,
    shareScreen,
  } = useContext(SocketContext);
  const nickname = getCookie("nickname");

  const { hostId } = useParams();
  const { guestId } = useParams();

  useEffect(() => {
    const roomData = {
      room: `${hostId}/${guestId}`,
      name: nickname,
    };
    socket.emit("user-connected");

    socket.emit("newUser", roomData);
    console.log(roomData);

    socket.on("roomfull", (data) => {
      window.alert("hi");
    });

    socket.on("mysocket", (data) => {
      console.log(data);
    });
  }, []);

  return (
    <>
      <Header />
      <ChatBox>
        <VideoBox>
          <VideoPlayer />
          <ButtonList>
            <div>
              {audioOn ? (
                <button size={25} onClick={audioHandler}>
                  <img src={AudioOff} alt="" />
                </button>
              ) : (
                <button size={25} onClick={audioHandler}>
                  <img src={AudioOn} alt="" />
                </button>
              )}
            </div>
            <div>
              {videoOn ? (
                <button size={25} onClick={videoHandler}>
                  <img src={VideoOff} alt="" />
                </button>
              ) : (
                <button size={25} onClick={videoHandler}>
                  <img src={VideoOn} alt="" />
                </button>
              )}
            </div>
            <div>
              <button size={25} onClick={shareScreen}>
                <img src={ShareScreen} />
              </button>
            </div>
          </ButtonList>
          <Sidebar>
            <Notifications />
          </Sidebar>
        </VideoBox>
        <Chatting />
      </ChatBox>
    </>
  );
};

const ChatBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 42px 202px auto 202px;
`;

const VideoBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ButtonList = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin: 50px;
  border-top: 1px solid gray;
  gap: 50px;
  padding-top: 30px;
`;

export default Chat;
