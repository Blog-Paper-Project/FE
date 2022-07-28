import React, { useContext } from "react";
import styled from "styled-components";

import { SocketContext } from "../../Context";
import { getCookie } from "../../shared/Cookie";

const Chatting = () => {
  const { messageList, boxRef, setCurrentMessage, inputRef, sendMessage } =
    useContext(SocketContext);

  const nickname = getCookie("nickname");
  console.log(messageList);

  return (
    <>
      <ChatBox>
        <ChatBack>
          <ChatList ref={boxRef}>
            {messageList.map((messageContent, index) => {
              return (
                <div key={index}>
                  {messageContent.type === "connect" ? (
                    <p>{messageContent.name} 님이 입장하였습니다</p>
                  ) : null}
                  {messageContent.type === "disconnect" ? (
                    <p>{messageContent.name} 님이 퇴장하였습니다</p>
                  ) : null}
                  {messageContent.nick === nickname ? (
                    <div>
                      <Mynick>{messageContent.nick}</Mynick>
                      <MessageBox>
                        <Message>{messageContent.message}</Message>
                        <p id="time">{messageContent.time}</p>
                      </MessageBox>
                    </div>
                  ) : (
                    <div>
                      <Othernick>{messageContent.nick}</Othernick>
                      <MessageBox>
                        <Message>{messageContent.message}</Message>
                        <p id="time">{messageContent.time}</p>
                      </MessageBox>
                    </div>
                  )}
                </div>
              );
            })}
          </ChatList>
          <InputWrap>
            <Input1
              type="text"
              placeholder="대화를 입력하세요."
              onChange={(e) => setCurrentMessage(e.target.value)}
              onKeyDown={(e) => {
                e.key === "Enter" && sendMessage();
              }}
              ref={inputRef}
            />
            <SendButton onClick={sendMessage}>전송</SendButton>
          </InputWrap>
        </ChatBack>
      </ChatBox>
    </>
  );
};

const ChatBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const ChatBack = styled.div`
  background-color: #d9d9d9;
  height: 615.41px;
  flex-direction: column;
  position: relative;
  width: 300px;
  padding: 10px;
`;

const ChatList = styled.div`
  background-color: white;
  padding: 10px;
  height: 550px;
  overflow-y: auto;
  line-height: 20px;
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const Mynick = styled.p`
  display: flex;
  /* justify-content: flex-end; */
  color: blue;
  margin-bottom: 8px;
`;

const Othernick = styled.p`
  display: flex;
  justify-content: flex-end;
  color: red;
  margin-bottom: 8px;
`;

const MessageBox = styled.div`
  display: flex;
  justify-content: space-between;
  border: 1px solid gray;
  width: 100%;
`;

const Message = styled.p`
  word-break: break-all;
`;

const InputWrap = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  background-color: white;
  border-bottom: solid 1px #acacac;
`;

const Input1 = styled.input`
  width: 100%;
  height: 50px;
`;

const SendButton = styled.button`
  width: 96px;
  height: 34px;
  background-color: #fffdf7;
  color: black;
  border: 1px solid gray;
  margin: 8px 8px 8px 0px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  width: 80px;
`;

export default Chatting;
