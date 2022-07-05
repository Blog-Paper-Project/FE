import React, { useEffect, useState, useRef } from "react";
import { getCookie } from "../shared/Cookie";
import io from "socket.io-client";

const Chat = () => {
  const socket = io.connect(process.env.REACT_APP_API_URL);
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);
  const inputRef = useRef();
  const nickname = getCookie("nickname");

  const sendMessage = async () => {
    const messageData = {
      message: currentMessage,
      time:
        new Date(Date.now()).getHours() +
        ":" +
        new Date(Date.now()).getMinutes(),
    };
    await socket.emit("message", messageData);
    setMessageList((list) => [...list, messageData]);
    inputRef.current.value = "";
  };

  useEffect(() => {
    socket.on("message", (data) => {
      setMessageList((list) => [...list, data]);
      console.log(data);
    });
  }, [socket]);

  return (
    <div className="chat-window">
      <div className="chat-header">
        <p>paper</p>
      </div>
      <div className="chat-body">
        <button className="message-container">
          {messageList.map((messageContent, i) => {
            return (
              <div
                className="message"
                id={nickname === messageContent.nickname ? "other" : "you"}
                key={i}
              >
                <div>
                  <div className="message-content">
                    <p>{messageContent.message}</p>
                  </div>
                  <div className="message-meta">
                    <p id="time">{messageContent.time}</p>
                    <p id="author">{messageContent.author}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </button>
      </div>
      <div className="chat-footer">
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
      </div>
    </div>
  );
};

export default Chat;
