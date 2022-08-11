import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { getCookie } from "../../shared/Cookie";
import {
  deleteGuestBookingDB,
  deleteHostBookingDB,
  getBookingDB,
  patchBookingDB,
} from "../../redux/modules/Booking";
import dayjs from "dayjs";
import Swal from "sweetalert2";

const BookingItem = ({ item, leafChange, setLeafChange }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //시간

  // 조건에 필요한 정보
  const Bloger = getCookie("blogId");
  const Host = item?.hostId;
  const Guest = item?.guestId;
  const hostId = item?.hostId;
  const bookingId = Number(item?.bookingId);
  const timeId = item?.bokingId;
  useEffect(() => {
    dispatch(getBookingDB());
  }, [dispatch, leafChange]);

  const enterChat = () => {
    navigate(`/chat/${Host}/${Guest}`);
  };

  // 예약 정보
  let startTime = item?.start;
  let endTime = item?.end;
  // console.log(item);
  if (!item) {
    return null;
  }
  let [week, month, day, year, sTime] = startTime?.split(" ");
  let start = sTime.substr(0, 5);
  let end = endTime.substr(16, 5);
  let chatTime = start.substr(0, 2);

  let Month = (month) => {
    if (month === "Jan") return "01";
    if (month === "Feb") return "02";
    if (month === "Mar") return "03";
    if (month === "Apr") return "04";
    if (month === "May") return "05";
    if (month === "Jun") return "06";
    if (month === "Jul") return "07";
    if (month === "Aug") return "08";
    if (month === "Sep") return "09";
    if (month === "Oct") return "10";
    if (month === "Nov") return "11";
    if (month === "Dec") return "12";
  };
  let Week = (week) => {
    if (week === "Mon") return "월";
    if (week === "Tue") return "화";
    if (week === "Wed") return "수";
    if (week === "Thu") return "목";
    if (week === "Fri") return "금";
    if (week === "Sat") return "토";
    if (week === "Sun") return "일";
  };

  const chatday = `${year}.${Month(month)}.${day}.${week}`;

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
                  {year}.{Month(month)}.{day}.{Week(week)}
                </span>
                <span className="timeInfo">
                  {start} - {end}
                </span>
              </div>
            </div>
            <div className="btnBox">
              <button className="waitBtn">수락대기</button>
              <button
                className="delBtn"
                onClick={(e) => {
                  dispatch(deleteGuestBookingDB(Guest, bookingId));
                  setLeafChange(!leafChange);
                }}
              >
                예약취소
              </button>
            </div>
          </li>
        )}
        {item?.accepted === true && (
          <li className="booking" key={`${timeId}`}>
            <div className="bookingInfo">
              {/* 호스트인지 게스트인지에 따라서 userName 다르게 보이게 함 */}
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
                  {year}.{Month(month)}.{day}.{Week(week)}
                </span>
                <span className="timeInfo">
                  {start} - {end}
                </span>
              </div>
            </div>
            <div className="btnBox">
              {dayjs().format("YYYY.MM.DD.ddd") === chatday &&
              dayjs().format("HH") >= chatTime ? (
                <button
                  className="startBtn"
                  onClick={() => {
                    enterChat();
                  }}
                >
                  Start
                </button>
              ) : (
                <button
                  className="waitBtn"
                  onClick={() => {
                    Swal.fire({
                      title: "원래는 예약시간에만 입장 가능합니다.",
                      icon: "warning",
                      confirmButtonColor: "#3085d6",
                      confirmButtonText: "확인",
                    }).then((result) => {
                      if (result.isConfirmed) {
                        enterChat();
                      }
                    });
                  }}
                >
                  Start
                </button>
              )}
            </div>
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
                  {year}.{Month(month)}.{day}.{Week(week)}
                </span>
                <span className="timeInfo">
                  {start} - {end}
                </span>
              </div>
            </div>
            <div className="btnBox">
              <button
                className="videoBtn"
                onClick={(e) => {
                  dispatch(patchBookingDB({ hostId, bookingId }));
                  setLeafChange(!leafChange);
                }}
              >
                수락하기
              </button>
              <button
                className="delBtn"
                onClick={(e) => {
                  dispatch(deleteHostBookingDB({ hostId, bookingId }));
                  setLeafChange(!leafChange);
                }}
              >
                예약취소
              </button>
            </div>
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
                  {year}.{Month(month)}.{day}.{Week(week)}
                </span>
                <span className="timeInfo">
                  {start} - {end}
                </span>
              </div>
            </div>
            <div className="btnBox">
              {dayjs().format("YYYY.MM.DD.ddd") === chatday &&
              dayjs().format("HH") >= chatTime ? (
                <button
                  className="startBtn"
                  onClick={() => {
                    enterChat();
                  }}
                >
                  Start
                </button>
              ) : (
                <button
                  className="waitBtn"
                  onClick={() => {
                    Swal.fire({
                      title: "원래는 예약시간에만 입장 가능합니다.",
                      icon: "warning",
                      confirmButtonColor: "#3085d6",
                      confirmButtonText: "확인",
                    }).then((result) => {
                      if (result.isConfirmed) {
                        enterChat();
                      }
                    });
                  }}
                >
                  Start
                </button>
              )}
            </div>
          </li>
        )}
      </>
    );
  }

  return null;
};

export default BookingItem;
