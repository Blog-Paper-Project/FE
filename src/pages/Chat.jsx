import React, { useEffect, useContext } from "react";

import Sidebar from "../components/chat/Sidebar";
import Notifications from "../components/chat/Notifications";
import VideoPlayer from "../components/chat/VideoPlayer";
import Chatting from "../components/chat/Chatting";

import Header from "../components/main/Header";
import styled from "styled-components";
import { getCookie } from "../shared/Cookie";
import { SocketContext } from "../Context"

const Chat = () => {
  const { socket } = useContext(SocketContext);
  const nickname = getCookie("nickname");

  useEffect(() => {
    const roomData = {
      room: "광민1",
      name: nickname,
    };
    socket.emit("user-connected");

    socket.emit("newUser", roomData);

    socket.on("roomfull");
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
