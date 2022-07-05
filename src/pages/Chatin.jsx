import React, { useEffect } from "react";
//임시
import io from "socket.io-client";
import { getCookie } from "../shared/Cookie";
import { useNavigate } from "react-router";
//임시

const Chatin = () => {
  //임시
  const socket = io.connect(process.env.REACT_APP_API_URL);
  const nickname = getCookie("nickname");
  const navigate = useNavigate();

  const enterChat = () => {
    const roomData = {
      roomId: 1,
      nick: nickname,
    };

    socket.emit("join-room", roomData);
    navigate("/chat");
    console.log(roomData);
  };

  useEffect(() => {
    socket.on("user-connected", (msg) => {
      console.log(msg);
    });
  }, [socket]);

  //임시
  return <button onClick={enterChat}>채팅하기</button>;
};

export default Chatin;
