import React, { useState, useRef, useEffect } from "react";
import { getCookie } from "../shared/Cookie";
import { useNavigate } from "react-router";
import styled from "styled-components";
import { socket } from "../App";
import Peer from "simple-peer";

import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import PhoneIcon from "@material-ui/icons/Phone";

const Chat = () => {
  //채팅관련
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);
  const inputRef = useRef();
  const nickname = getCookie("nickname");
  const navigate = useNavigate();

  //화상관련
  const [me, setMe] = useState("");
  const [stream, setStream] = useState();
  const [callAccepted, setCallAccepted] = useState(false);
  const [idToCall, setIdToCall] = useState("");
  const [callEnded, setCallEnded] = useState(false);
  const [name, setName] = useState("");
  const [videoOn, setVideoOn] = useState(true);
  const [audioOn, setAudioOn] = useState(true);
  const [call, setCall] = useState({});

  const myVideo = useRef();
  const userVideo = useRef();
  const connectionRef = useRef();
  const boxRef = useRef();

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((currentStream) => {
        setStream(currentStream);
        myVideo.current.srcObject = currentStream;
      });
    console.log(socket.id);
    socket.on("me", (id) => {
      setMe(id);
    });

    socket.on("callUser", ({ from, name: callerName, signal }) => {
      setCall({ isReceivingCall: true, from, name: callerName, signal });
    });
  }, []);

  const callUser = (id) => {
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream: stream,
    });

    peer.on("signal", (data) => {
      socket.emit("callUser", {
        userToCall: id,
        signalData: data,
        from: me,
        name,
      });
    });

    peer.on("stream", (currentStream) => {
      userVideo.current.srcObject = currentStream;
    });

    socket.on("callAccepted", (signal) => {
      setCallAccepted(true);
      peer.signal(signal);
    });

    connectionRef.current = peer;
  };

  const answerCall = () => {
    setCallAccepted(true);
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream: stream,
    });

    peer.on("signal", (data) => {
      socket.emit("answerCall", { signal: data, to: call.from });
    });

    peer.on("stream", (currentStream) => {
      userVideo.current.srcObject = currentStream;
    });

    peer.signal(call.signal);
    connectionRef.current = peer;
  };

  // 오디오 온오프
  const audioHandler = () => {
    myVideo.current.srcObject
      .getAudioTracks()
      .forEach((track) => (track.enabled = !track.enabled));
    setAudioOn(!audioOn);
  };

  // 비디오 온오프
  const videoHandler = () => {
    myVideo.current.srcObject
      .getVideoTracks()
      .forEach((track) => (track.enabled = !track.enabled));
    setVideoOn(!videoOn);
  };

  // 화면 공유
  const shareScreen = () => {
    navigator.mediaDevices
      .getDisplayMedia({
        video: { cursor: "always" },
        audio: { echoCancellation: true, noiseSuppression: true },
      })
      .then((stream) => {
        myVideo.current.srcObject = stream; // 내 비디오 공유 화면으로 변경
        const videoTrack = stream.getVideoTracks()[0];
        connectionRef.current
          .getSenders()
          .find((sender) => sender.track.kind === videoTrack.kind)
          .replaceTrack(videoTrack);
        videoTrack.onended = function () {
          const screenTrack = myVideo.current.getVideoTracks()[0];
          connectionRef.current
            .getSenders()
            .find((sender) => sender.track.kind === screenTrack.kind)
            .replaceTrack(screenTrack);
          stream.getTracks().forEach((track) => track.stop());
        };
        myVideo.current.srcObject = myVideo.current; // 내 비디오로 변경
      });
  };

  //채팅보내기
  const sendMessage = () => {
    if (currentMessage !== "") {
      const messageData = {
        nick: nickname,
        message: currentMessage,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };
      socket.emit("message", messageData);
      setMessageList((list) => [...list, messageData]);
      inputRef.current.value = "";
    }
  };

  //채팅받기
  useEffect(() => {
    socket.on("update", (data) => {
      setMessageList((list) => [...list, data]);
    });
  }, []);

  //채팅 나가기
  const leaveChat = () => {
    socket.emit("leaveRoom");
    setCallEnded(true);
    connectionRef.current.destroy();
    stream.getTracks().forEach(function (track) {
      track.stop();
    });
    navigate("/");
  };

  //스크롤 하단고정
  const scrollToBottom = () => {
    if (boxRef.current) {
      boxRef.current.scrollTop = boxRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  });

  return (
    <ChatContainer>
      <ChatBox>
        <MyCam>
          <video
            playsInline
            muted
            ref={myVideo}
            autoPlay
            style={{ width: "100%" }}
          />
        </MyCam>
        <UserCam>
          {callAccepted && !callEnded ? (
            <video
              playsInline
              ref={userVideo}
              autoPlay
              style={{ width: "100%" }}
            />
          ) : (
            <img
              alt=""
              src={"https://www.snsboom.co.kr/common/img/default_profile.png"}
              style={{ width: "100%" }}
            />
          )}
        </UserCam>

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
                  {messageContent.nick === nickname ? (
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
      <ButtonList>
        <div>
          {audioOn ? (
            <button size={25} onClick={audioHandler}>
              소리끄기!!
            </button>
          ) : (
            <button size={25} onClick={audioHandler}>
              소키키기!!
            </button>
          )}
        </div>
        <div>
          {videoOn ? (
            <button size={25} onClick={videoHandler}>
              화면끄기
            </button>
          ) : (
            <button size={25} onClick={videoHandler}>
              화면키키
            </button>
          )}
        </div>
        <div>
          <button size={25} onClick={shareScreen}>
            화면공유
          </button>
        </div>
        <div>
          <button onClick={leaveChat}>나가기</button>
        </div>
      </ButtonList>

      <div className="myId">
        <TextField
          id="filled-basic"
          label="Name"
          variant="filled"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{ marginBottom: "20px" }}
        />
        <TextField
          id="filled-basic"
          label="ID to call"
          variant="filled"
          value={idToCall}
          onChange={(e) => setIdToCall(e.target.value)}
        />
        <div className="call-button">
          {callAccepted && !callEnded ? (
            <Button variant="contained" color="secondary" onClick={leaveChat}>
              End Call
            </Button>
          ) : (
            <IconButton
              color="primary"
              aria-label="call"
              onClick={() => callUser(idToCall)}
            >
              <PhoneIcon fontSize="large" />
            </IconButton>
          )}
          {idToCall}
        </div>
      </div>
      <div>
        {call.isReceivingCall && !callAccepted && (
          <div style={{ display: "flex", justifyContent: "space-around" }}>
            <h1>{call.name} is calling:</h1>
            <Button variant="contained" color="primary" onClick={answerCall}>
              Answer
            </Button>
          </div>
        )}
      </div>
    </ChatContainer>
  );
};

const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #e5e2db;
  height: 100vh;
  padding-top: 50px;
`;

const ChatBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 50px;
`;

const MyCam = styled.div`
  width: 500px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: gray;
  > button {
  }
`;

const UserCam = styled.div`
  width: 500px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: gray;
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

const ButtonList = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin: 50px;
  border-top: 1px solid gray;
  gap: 50px;
  padding-top: 30px;
`;

export default Chat;
