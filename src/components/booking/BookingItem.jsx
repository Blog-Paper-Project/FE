import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { getCookie } from '../../shared/Cookie';
import { deleteGuestBookingDB, deleteHostBookingDB, getBookingDB, patchBookingDB } from '../../redux/modules/Booking';
import { useEffect } from "react";
import { socket } from "../../App";

// 모듈
// import { actionCreators as bookingAction } from '../redux/modules/booking';
// import { actionCreators as notiActions } from '../redux/modules/booking';

const BookingItem = ({ item, leafChange, setLeafChange }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const { item, change, setChange } = props;
  // 조건에 필요한 정보
  const Bloger = getCookie("blogId");
  const nickname = getCookie("nickname");
  const Host = item?.hostId;
  const Guest = item?.guestId;
  const hostId = item?.hostId;
  const bookingId = Number(item?.bookingId);
  const timeId = item.bokingId;

  const enterChat = async () => {
    const roomData = {
      room: `${Host}/${Guest}`,
      name: nickname,
    };
    await socket.emit("user-connected");

    console.log(roomData);

    socket.emit("newUser", roomData);
    navigate(`/chat/${Host}/${Guest}`);

    socket.on("roomfull", (data) => {
      window.alert("방꽉참");
      navigate("/myprofile");
    });
  };
  console.log(item)

  // 예약 정보
  let startTime = item.start;
  let endTime = item.end;

  if (!item) return null;
  let [week, month, day, year, sTime] = startTime.split(' ');
  let start = sTime.substr(0, 5);
  let end = endTime.substr(-17, 5);

  // 게스트일때
  if (Guest === Bloger) {
    return (
      <>
        {item?.accepted === false && (
          <li className="booking" key={`${timeId}`}>
            <div className="bookingInfo">
              {/* 게스트인지 호스트인지에 따라서 userName 다르게 보이게 함 */}
              <div
                className="userName"
                onClick={() => {
                  navigate(`/paper/${Host}`);
                }}
              >
                {Host}
              </div>
              <div className="userBookingWrap">
                <span className="dayInfo">
                  {week} &nbsp; {month} &nbsp; {day} &nbsp; {year} &emsp;
                </span>
                <span className="timeInfo">
                  {start}&emsp;~&emsp;{end}</span>
              </div>
            </div>
            <button className="waitBtn">
              '수락대기중'
            </button>
            <button
              className="delBtn"
              onClick={(e) => {
                dispatch(deleteGuestBookingDB(Guest, bookingId))
                dispatch(getBookingDB())
                setLeafChange(!leafChange)
              }}
            >
              '예약 취소'
            </button>
          </li>
        )}
        {item?.accepted === true && (
          <li className="booking" key={`${timeId}`}>
            <div className="bookingInfo">
              {/* 선생인지 학생인지에 따라서 userName 다르게 보이게 함 */}
              <div
                className="userName"
                onClick={() => {
                  navigate(`/paper/${Host}`);
                }}
              >
                {Host}
              </div>
              <div className="userBookingWrap">
                <span className="dayInfo">
                  {week} &nbsp; {month} &nbsp; {day} &nbsp; {year} &emsp;
                </span>
                <span className="timeInfo">
                  {start}&emsp;~&emsp;{end}
                </span>
              </div>
            </div>
            <button
              className="videoBtn"
              onClick={() => {
                enterChat();
              }}
            >
              '시작하기'
            </button>
          </li>
        )}
      </>
    );
    // 호스트일때
  } else if (Host === Bloger) {
    return (
      <>
        {item?.accepted === false && (
          <li className="booking" key={`${timeId}`}>
            <div className="bookingInfo">
              {/* 게스트인지 호스트인지에 따라서 userName 다르게 보이게 함 */}
              <div
                className="userName"
                onClick={() => {
                  navigate(`/paper/${Guest}`);
                }}
              >
                {Guest}
              </div>
              <div className="userBookingWrap">
                <span className="dayInfo">
                  {week} &nbsp; {month} &nbsp; {day} &nbsp; {year} &emsp;
                </span>
                <span className="timeInfo">
                  {start}&emsp;~&emsp;{end}
                </span>
              </div>
            </div>
            <button
              className="videoBtn"
              onClick={(e) => {
                dispatch(patchBookingDB({ hostId, bookingId }));
                dispatch(getBookingDB())
                setLeafChange(!leafChange)
              }}
            >
              '수락하기'
            </button>
            <button
              className="delBtn"
              onClick={(e) => {
                dispatch(deleteHostBookingDB({ hostId, bookingId }));
                dispatch(getBookingDB())
                setLeafChange(!leafChange)
              }}
            >
              '예약취소'
            </button>
          </li>
        )}
        {item?.accepted === true && (
          <li className="booking" key={`${timeId}`}>
            <div className="bookingInfo">
              {/* 게스트인지 호스트인지에 따라서 userName 다르게 보이게 함 */}
              <div
                className="userName"
                onClick={() => {
                  navigate(`/paper/${Guest}`);
                }}
              >
                {Guest}
              </div>
              <div className="userBookingWrap">
                <span className="dayInfo">
                  {week} &nbsp; {month} &nbsp; {day} &nbsp; {year} &emsp;
                </span>
                <span className="timeInfo">
                  {start}&emsp;~&emsp;{end}
                </span>
              </div>
            </div>
            <button
              className="videoBtn"
              onClick={() => {
                enterChat();
              }}
            >
              '시작하기'
            </button>
          </li>
        )}
      </>
    );
  }

  return null;
};

export default BookingItem;
