import React, { useState, useRef, useEffect } from "react";
import { getCookie } from "../shared/Cookie";
import { useNavigate } from "react-router";
import { socket } from "../App";

const Chat = () => {
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);
  const inputRef = useRef();
  const nickname = getCookie("nickname");
  const navigate = useNavigate();

  const sendMessage = () => {
    if (currentMessage !== "") {
      const messageData = {
        message: currentMessage,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };
      socket.emit("message", messageData);
      setMessageList((list) => [...list, messageData]);
      console.log(messageList);
      inputRef.current.value = "";
    }
  };

  useEffect(() => {
    socket.on("update", (data) => {
      console.log(data);
      console.log(messageList);
      setMessageList((list) => [...list, data]);
    });

  }, []);

  const leaveChat = () => {
    navigate("/myprofile");
  };

  console.log(messageList);

  return (
    <div>
      <div style={{ color: "red" }}>
        <p>paper</p>
      </div>
      <div>
        {messageList.map((messageContent, i) => {
          return (
            <div className="message" key={i}>
              <div>
                <p>{messageContent.message}</p>
              </div>
              <div>
                <p id="time">{messageContent.time}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div>
        <input
          type="text"
          placeholder="대화를 입력하세요."
          onChange={(e) => setCurrentMessage(e.target.value)}
          onKeyDown={(e) => {
            e.key === "Enter" && sendMessage();
          }}
          ref={inputRef}
        />
        <button onClick={sendMessage}>보내기</button>
        <button onClick={leaveChat}>나가기</button>
      </div>
    </div>
  );
};

export default Chat;
