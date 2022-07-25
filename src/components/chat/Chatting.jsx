import React, { useContext } from "react";

import { SocketContext } from "../../Context";

import styled from "styled-components";

const Chatting = () => {
  const { messageList, boxRef, setCurrentMessage, inputRef, sendMessage } =
    useContext(SocketContext);
  return (
    <>
      <ChatBox>
        <ChatList>
          <ChatChat ref={boxRef}>
            {messageList.map((messageContent, index) => {
              return (
                <div key={index}>
                  {messageContent.type === "connect" ? (
                    <p>{messageContent.name} 님이 입장하였습니다</p>
                  ) : null}
                  {messageContent.type === "disconnect" ? (
                    <p>{messageContent.name} 님이 퇴장하였습니다</p>
                  ) : null}
                  {messageContent.nick === "hi" ? (
                    <div>
                      <p style={{ color: "blue" }}>{messageContent.nick}</p>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <p>{messageContent.message}</p>
                        <p id="time">{messageContent.time}</p>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <p style={{ color: "red" }}>{messageContent.nick}</p>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <p>{messageContent.message}</p>
                        <p id="time">{messageContent.time}</p>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </ChatChat>

          <div style={{ position: "absolute", bottom: 0, width: "100%" }}>
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
        </ChatList>
      </ChatBox>
    </>
  );
};

const ChatBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 50px;
`;

const ChatList = styled.div`
  background-color: #d9d9d9;
  height: 480px;
  flex-direction: column;
  position: relative;
  width: 283px;
  padding: 10px;
`;

const ChatChat = styled.div`
  background-color: white;
  padding: 10px;
  height: 450px;
  overflow-y: auto;
`;

export default Chatting;
