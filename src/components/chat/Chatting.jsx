import React, { useContext } from "react";
import styled from "styled-components";

import { SocketContext } from "../../Context";
import { getCookie } from "../../shared/Cookie";

const Chatting = () => {
  const { messageList, boxRef, setCurrentMessage, inputRef, sendMessage } =
    useContext(SocketContext);

  const nickname = getCookie("nickname");

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
                      <MessageBox2>
                        <Message2>{messageContent.message}</Message2>
                        <p id="time">
                          {messageContent.time.split(":")[0].padStart(2, "0")} :
                          {messageContent.time.split(":")[1].padStart(2, "0")}
                        </p>
                      </MessageBox2>
                    </div>
                  ) : messageContent.type === "connect" ? (
                    <p>{messageContent.name} 님이 입장하였습니다</p>
                  ) : messageContent.type === "disconnect" ? (
                    <p>{messageContent.name} 님이 퇴장하였습니다</p>
                  ) : (
                    <div>
                      <Othernick>{messageContent.nick}</Othernick>
                      <MessageBox>
                        <Message>{messageContent.message}</Message>
                        <p id="time">
                          {messageContent.time.split(":")[0].padStart(2, "0")} :
                          {messageContent.time.split(":")[1].padStart(2, "0")}
                        </p>
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
  /* height: 100vh; */
`;

const ChatBack = styled.div`
  background-color: #889175;
  border-radius: 5px;
  height: 710px;
  flex-direction: column;
  position: relative;
  width: 300px;
  padding: 2px;
`;

const ChatList = styled.div`
  background-color: white;
  padding: 10px;
  height: 655px;
  overflow-y: auto;
  line-height: 20px;
  display: flex;
  flex-direction: column;
  gap: 5px;
  ::-webkit-scrollbar {
    display: none;
  }
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
`;

const InputWrap = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  background-color: white;
  border-bottom: solid 1px #acacac;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
`;

const Input1 = styled.input`
  width: 100%;
  height: 50px;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
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

const Mynick = styled.p`
  display: flex;
  /* justify-content: flex-end; */
  /* color: #08a9ff; */
  margin-bottom: 8px;
  font-weight: bold;
`;

const Othernick = styled.p`
  display: flex;
  /* justify-content: flex-end; */
  /* color: #ff1512; */
  margin-bottom: 8px;
  font-weight: bold;
`;

const MessageBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  width: 100%;
`;

const MessageBox2 = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  width: 100%;
`;

const Message = styled.p`
  word-break: break-all;
  width: 100%;
  border-radius: 15px;
  border-bottom-left-radius: 0;
  border: 2px solid #889175;
  padding: 10px;
`;

const Message2 = styled.p`
  word-break: break-all;
  width: 100%;
  border-radius: 15px;
  border-bottom-right-radius: 0;
  background-color: #889175;
  color: white;
  padding: 10px;
`;

export default Chatting;
