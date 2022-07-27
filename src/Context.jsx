import React, { createContext, useState, useRef, useEffect } from "react";
import { io } from "socket.io-client";
import Peer from "simple-peer";
import { getCookie } from "./shared/Cookie";
import { useNavigate } from "react-router-dom";

const SocketContext = createContext();

const socket = io("https://first-sw.shop");

const ContextProvider = ({ children }) => {
  const [callAccepted, setCallAccepted] = useState(false);
  const [callEnded, setCallEnded] = useState(false);
  const [stream, setStream] = useState();
  const [name, setName] = useState("");
  const [call, setCall] = useState({});
  const [me, setMe] = useState("");
  const [callToUser, setCallToUser] = useState("");

  const myVideo = useRef();
  const userVideo = useRef();
  const connectionRef = useRef();

  // const [videoOn, setVideoOn] = useState(true);
  // const [audioOn, setAudioOn] = useState(true);

  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);
  const inputRef = useRef();
  const boxRef = useRef();

  const nickname = getCookie("nickname");
  const navigate = useNavigate();

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((currentStream) => {
        setStream(currentStream);

        myVideo.current.srcObject = currentStream;
      });

    socket.on("me", (id) => setMe(id));

    socket.on("callUser", ({ from, name: callerName, signal }) => {
      setCall({ isReceivingCall: true, from, name: callerName, signal });
    });
  }, [call, callAccepted]);

  //화상
  const answerCall = () => {
    setCallAccepted(true);
    const peer = new Peer({ initiator: false, trickle: false, stream });

    peer.on("signal", (data) => {
      socket.emit("answerCall", { signal: data, to: call.from });
    });

    peer.on("stream", (currentStream) => {
      userVideo.current.srcObject = currentStream;
    });

    peer.signal(call.signal);

    connectionRef.current = peer;
  };

  //화상
  const callUser = () => {
    const peer = new Peer({ initiator: true, trickle: false, stream });

    peer.on("signal", (data) => {
      socket.emit("callUser", {
        userToCall: callToUser,
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

  // // 오디오 온오프
  // const audioHandler = () => {
  //   myVideo.current.srcObject
  //     .getAudioTracks()
  //     .forEach((track) => (track.enabled = !track.enabled));
  //   setAudioOn(!audioOn);
  // };

  // // 비디오 온오프
  // const videoHandler = () => {
  //   myVideo.current.srcObject
  //     .getVideoTracks()
  //     .forEach((track) => (track.enabled = !track.enabled));
  //   setVideoOn(!videoOn);
  // };

  // // 화면 공유
  // const shareScreen = () => {
  //   navigator.mediaDevices
  //     .getDisplayMedia({
  //       video: { cursor: "always" },
  //       audio: { echoCancellation: true, noiseSuppression: true },
  //     })
  //     .then((currentStream) => {
  //       myVideo.current.srcObject = currentStream; // 내 비디오 공유 화면으로 변경
  //       const videoTrack = currentStream.getVideoTracks()[0];
  //       connectionRef.current
  //         .getSenders()
  //         .find((sender) => sender.track.kind === videoTrack.kind)
  //         .replaceTrack(videoTrack);
  //       videoTrack.onended = function () {
  //         const screenTrack = myVideo.current.getVideoTracks()[0];
  //         connectionRef.current
  //           .getSenders()
  //           .find((sender) => sender.track.kind === screenTrack.kind)
  //           .replaceTrack(screenTrack);
  //         stream.getTracks().forEach((track) => track.stop());
  //       };
  //       myVideo.current.srcObject = myVideo.current; // 내 비디오로 변경
  //     });
  // };

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
      console.log(data);
      setMessageList((list) => [...list, data]);
    });
  }, []);

  //스크롤 하단고정
  const scrollToBottom = () => {
    if (boxRef.current) {
      boxRef.current.scrollTop = boxRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  });

  const leaveCall = (currentStream) => {
    setCallEnded(true);
    connectionRef.current.destroy();
    myVideo.remove();
    myVideo.destroy();
    userVideo.remove();
    userVideo.destroy();
    currentStream.remove();
    currentStream.destroy();
    socket.emit("leaveRoom");
    window.location.reload();
    navigate(-1);
  };

  return (
    <SocketContext.Provider
      value={{
        socket,
        call,
        callAccepted,
        myVideo,
        userVideo,
        stream,
        name,
        setName,
        callEnded,
        me,
        callUser,
        leaveCall,
        answerCall,
        boxRef,
        messageList,
        setCurrentMessage,
        sendMessage,
        inputRef,
        nickname,
        callToUser,
        setCallToUser,
        // audioHandler,
        // videoHandler,
        // shareScreen,
        // audioOn,
        // videoOn,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export { ContextProvider, SocketContext };
