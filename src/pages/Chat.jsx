import React, { useState, useRef, useEffect } from "react";
import { getCookie } from "../shared/Cookie";
import { useNavigate } from "react-router";
import { socket } from "../App";
import styled from "styled-components";

/* emit 보내기 on 받기 */

const Chat = () => {
  //채팅관련
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);
  const inputRef = useRef();
  const nickname = getCookie("nickname");
  const navigate = useNavigate();

  //화상관련
  const userVideo = useRef();
  const partnerVideo = useRef();
  const peerRef = useRef();
  const otherUser = useRef();
  const userStream = useRef();
  const [videoOn, setVideoOn] = useState(true);
  const [audioOn, setAudioOn] = useState(true);

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ audio: true, video: true })
      .then((stream) => {
        userVideo.current.srcObject = stream;
        userStream.current = stream;

        socket.on("other user", (nickname) => {
          callUser(nickname);
          otherUser.current = nickname;
        });

        socket.on("user joined", (nickname) => {
          otherUser.current = nickname;
        });
        socket.on("offer", handleRecieveCall);

        socket.on("answer", handleAnswer);

        socket.on("ice-candidate", handleNewICECandidateMsg);
      });
  }, []);

  function callUser(nickname) {
    peerRef.current = createPeer(nickname);
    userStream.current
      .getTracks()
      .forEach((track) => peerRef.current.addTrack(track, userStream.current));
  }

  function createPeer(nickname) {
    const peer = new RTCPeerConnection({
      iceServers: [
        {
          urls: "stun:stun.stunprotocol.org",
        },
        {
          urls: "turn:numb.viagenie.ca",
          credential: "credential",
          username: nickname,
        },
      ],
    });

    peer.onicecandidate = handleICECandidateEvent;
    peer.ontrack = handleTrackEvent;
    peer.onnegotiationneeded = () => handleNegotiationNeededEvent(nickname);

    return peer;
  }

  function handleNegotiationNeededEvent(nickname) {
    peerRef.current
      .createOffer()
      .then((offer) => {
        return peerRef.current.setLocalDescription(offer);
      })
      .then(() => {
        const payload = {
          target: nickname,
          caller: socket.current.id,
          sdp: peerRef.current.localDescription,
        };
        socket.emit("offer", payload);
      })
      .catch((e) => console.log(e));
  }

  function handleRecieveCall(incoming) {
    peerRef.current = createPeer();
    const desc = new RTCSessionDescription(incoming.sdp);
    peerRef.current
      .setRemoteDescription(desc)
      .then(() => {
        userStream.current
          .getTracks()
          .forEach((track) =>
            peerRef.current.addTrack(track, userStream.current)
          );
      })
      .then(() => {
        return peerRef.current.createAnswer();
      })
      .then((answer) => {
        return peerRef.current.setLocalDescription(answer);
      })
      .then(() => {
        const payload = {
          target: incoming.caller,
          caller: socket.current.id,
          sdp: peerRef.current.localDescription,
        };
        socket.current.emit("answer", payload);
      });
  }

  function handleAnswer(message) {
    const desc = new RTCSessionDescription(message.sdp);
    peerRef.current.setRemoteDescription(desc).catch((e) => console.log(e));
  }

  function handleICECandidateEvent(e) {
    if (e.candidate) {
      const payload = {
        target: otherUser.current,
        candidate: e.candidate,
      };
      socket.emit("ice-candidate", payload);
    }
  }

  function handleNewICECandidateMsg(incoming) {
    const candidate = new RTCIceCandidate(incoming);

    peerRef.current.addIceCandidate(candidate).catch((e) => console.log(e));
  }

  function handleTrackEvent(e) {
    partnerVideo.current.srcObject = e.streams[0];
  }

  // 오디오 온오프
  const audioHandler = () => {
    userVideo.current.srcObject
      .getAudioTracks()
      .forEach((track) => (track.enabled = !track.enabled));
    setAudioOn(!audioOn);
  };

  // 비디오 온오프
  const videoHandler = () => {
    userVideo.current.srcObject
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
        userVideo.current.srcObject = stream; // 내 비디오 공유 화면으로 변경
        const videoTrack = stream.getVideoTracks()[0];
        // connectionRef.current
        //   .getSenders()
        //   .find((sender) => sender.track.kind === videoTrack.kind)
        //   .replaceTrack(videoTrack);
        videoTrack.onended = function () {
          // const screenTrack = userStream.current.getVideoTracks()[0];
          // connectionRef.current
          //   .getSenders()
          //   .find((sender) => sender.track.kind === screenTrack.kind)
          //   .replaceTrack(screenTrack);
          stream.getTracks().forEach((track) => track.stop());
          userVideo.current.srcObject = userStream.current; // 내 비디오로 변경
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
    navigate("/myprofile");
  };

  return (
    <div>
      <div style={{ color: "red", fontSize: "20px" }}>
        <h3>paper</h3>
      </div>
      <Box>
        <div>가나다</div>
        <div>
          내 화면
          <video
            className="my-video"
            ref={userVideo}
            playsInline
            muted
            autoPlay
            style={{ width: "400px", height: "400px" }}
          />
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
        </div>
        <div>
          너 화면
          <video
            className="user-video"
            ref={partnerVideo}
            playsInline
            autoPlay
          />
        </div>
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
