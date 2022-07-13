import React, { useState, useRef, useEffect } from "react";
import { getCookie } from "../shared/Cookie";
import { useNavigate } from "react-router";
import styled from "styled-components";
import { socket } from "../App";
import Peer from "simple-peer";

import TextField from "@material-ui/core/TextField";
import { CopyToClipboard } from "react-copy-to-clipboard";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import AssignmentIcon from "@material-ui/icons/Assignment";
import PhoneIcon from "@material-ui/icons/Phone";

/* emit 보내기 on 받기 */

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
  const [receivingCall, setReceivingCall] = useState(false);
  const [caller, setCaller] = useState("");
  const [callerSignal, setCallerSignal] = useState();
  const [callAccepted, setCallAccepted] = useState(false);
  const [idToCall, setIdToCall] = useState("");
  const [callEnded, setCallEnded] = useState(false);
  const [name, setName] = useState("");
  const [videoOn, setVideoOn] = useState(true);
  const [audioOn, setAudioOn] = useState(true);

  const myVideo = useRef();
  const userVideo = useRef();
  const connectionRef = useRef();

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        setStream(stream);
        myVideo.current.srcObject = stream;
      });
    console.log(socket.id);
    socket.on("me", (id) => {
      setMe(id);
    });

    socket.on("callUser", (data) => {
      setReceivingCall(true);
      setCaller(data.from);
      setName(data.name);
      setCallerSignal(data.signal);
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
        name: name,
      });
    });

    peer.on("stream", (stream) => {
      userVideo.current.srcObject = stream;
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
      socket.emit("answerCall", { signal: data, to: caller });
    });

    peer.on("stream", (stream) => {
      userVideo.current.srcObject = stream;
    });

    peer.signal(callerSignal);
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
          myVideo.current.srcObject = myVideo.current; // 내 비디오로 변경
        };
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
    // connectionRef.current.destroy();
    navigate("/myprofile");
  };

  return (
    <div>
      <div style={{ color: "red", fontSize: "20px" }}>
        <h3>paper</h3>
      </div>
      <Box>
        <div>가나다</div>
        <div className="container">
          <div className="video-container">
            <div className="video">
              <video
                playsInline
                muted
                ref={myVideo}
                autoPlay
                style={{ width: "300px" }}
              />
            </div>
            <div className="video">
              {callAccepted && !callEnded ? (
                <video
                  playsInline
                  ref={userVideo}
                  autoPlay
                  style={{ width: "300px" }}
                />
              ) : null}
            </div>
          </div>
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
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={leaveChat}
                >
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
            {receivingCall && !callAccepted ? (
              <div className="caller">
                <h1>{name} is calling...</h1>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={answerCall}
                >
                  Answer
                </Button>
              </div>
            ) : null}
          </div>
        </div>

        {audioOn ? (
          <button size={25} onClick={audioHandler}>
            소리키기
          </button>
        ) : (
          <button size={25} onClick={audioHandler}>
            음소거
          </button>
        )}
        {videoOn ? (
          <button size={25} onClick={videoHandler}>
            화면키기 기
          </button>
        ) : (
          <button size={25} onClick={videoHandler}>
            화면끄기
          </button>
        )}
        <button size={25} onClick={shareScreen}>
          화면공유
        </button>

        <ChatBox>
          {messageList.map((messageContent, index) => {
            return (
              <div key={index}>
                {messageContent.type === "connect" ? (
                  <p>{messageContent.name} 님이 입장하였습니다</p>
                ) : null}
                {messageContent.type === "disconnect" ? (
                  <p>{messageContent.name} 님이 퇴장하였습니다</p>
                ) : null}
                {messageContent.nick == nickname ? (
                  <div>
                    <p style={{ color: "blue" }}>{messageContent.nick}</p>
                    <p>{messageContent.message}</p>
                    <p id="time">{messageContent.time}</p>
                  </div>
                ) : (
                  <div>
                    <p style={{ color: "red" }}>{messageContent.nick}</p>
                    <p>{messageContent.message}</p>
                    <p id="time">{messageContent.time}</p>
                  </div>
                )}
              </div>
            );
          })}

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
        </ChatBox>
      </Box>
    </div>
  );
};

const Box = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const ChatBox = styled.div`
  background-color: gray;
  width: 300px;
  height: 300px;
`;

export default Chat;
