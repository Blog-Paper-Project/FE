import React, { useContext } from "react";

import { SocketContext } from "../../Context";

const Chatting = () => {
  const { messageList, boxRef, setCurrentMessage, inputRef, sendMessage } =
    useContext(SocketContext);
  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          gap: "50px",
        }}
      >
        <div
          style={{
            backgroundColor: "#d9d9d9",
            height: "480px",
            flexDirection: "column",
            position: "relative",
            width: "283px",
            padding: "10px",
          }}
        >
          <div
            style={{
              backgroundColor: "white",
              padding: "10px",
              height: "450px",
              overflowY: "auto",
            }}
            ref={boxRef}
          >
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
          </div>

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
        </div>
      </div>
    </>
  );
};

export default Chatting;
