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

const Chat = () => {
  const { socket, setStream, myVideo, setCall, setMe } = useContext(SocketContext);
  const nickname = getCookie("nickname");

  const { hostId } = useParams();
  const { guestId } = useParams();

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((currentStream) => {
        setStream(currentStream);

        myVideo.current.srcObject = currentStream;
      });
    socket.on("me", (id) => setMe(id));

    socket.on("callUser", ({ from, name: callerName, signal }) => {
      setCall({ isReceivingCall: true, from, name: callerName, signal });
    });
  },[]);

  useEffect(() => {
    const roomData = {
      room: `${hostId}/${guestId}`,
      name: nickname,
    };
    socket.emit("user-connected");

    socket.emit("newUser", roomData);
    console.log(roomData);

    socket.on("me", (id) => {
      console.log(id);
    });

    socket.on("roomfull", (data) => {
      window.alert("hi");
    });
  }, []);

  return (
    <>
      <Header />
      <ChatBox>
        <VideoBox>
          <VideoPlayer />
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

export default Chat;
