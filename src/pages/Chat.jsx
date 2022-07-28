import React, { useEffect, useContext } from "react";
import { useParams } from "react-router-dom";

import Sidebar from "../components/chat/Sidebar";
import Notifications from "../components/chat/Notifications";
import VideoPlayer from "../components/chat/VideoPlayer";
import Chatting from "../components/chat/Chatting";

// import Header from "../components/main/Header";
import { getCookie } from "../shared/Cookie";
import { SocketContext } from "../Context";
import styled from "styled-components";

const Chat = () => {
  const { socket, setCallToUser } = useContext(SocketContext);
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

    socket.on("roomfull");

    socket.on("mysocket", (data) => {
      if ((data.length = 2)) {
        const usersocketId = data.filter((id) => id !== socket.id);
        setCallToUser(usersocketId[0]);
      }
    });
  }, []);

  return (
    <>
      {/* <Header /> */}
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
