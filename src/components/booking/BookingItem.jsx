import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { getCookie } from '../../shared/Cookie';
import { deleteGuestBookingDB, deleteHostBookingDB, patchBookingDB } from '../../redux/modules/Booking';
import { useEffect } from "react";

// 모듈
// import { actionCreators as bookingAction } from '../redux/modules/booking';
// import { actionCreators as notiActions } from '../redux/modules/booking';

const BookingItem = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { item, setChange, change } = props;
  // 조건에 필요한 정보
  const Bloger = getCookie("blogId")
  const Host = item?.hostId;
  const Guest = item?.guestId;
  const hostId = Number(item?.hostId);
  const bookingId = Number(item?.bookingId);
  const timeId = item.bokingId;

  if (!item) return null;
  // 게스트일때
  if (Guest === Bloger) {
    return (
      <div>
        {item?.accepted === false && (
          <li className="booking" key={`${timeId}`}>
            <div className="bookingInfo">
              {/* 게스트인지 호스트인지에 따라서 userName 다르게 보이게 함 */}
              <div className="userName"
                onClick={() => {
                  navigate(`/paper/${Host}`);
                }}>{Host}</div>
              <div className="userBookingWrap">
                <span className="dayInfo">{item?.date}</span>
                <span className="timeInfo">{item?.time}</span>
              </div>
            </div>
            <button
              className="waitBtn"
            >
              '수락대기중'
            </button>
            <button
              className="delBtn"
              onClick={() => {
                dispatch(deleteGuestBookingDB(Guest, bookingId))
                setChange(!change)
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
              <div className="userName"
                onClick={() => {
                  navigate(`/paper/${Host}`);
                }}>{Host}</div>
              <div className="userBookingWrap">
                <span className="dayInfo">
                  {item.date}
                </span>
                <span className="timeInfo">
                  {item.time}
                </span>
              </div>
            </div>
            <button
              className="videoBtn"
              onClick={() => {
                navigate({
                  pathname: `/chat/${item.hostId}/${item.guestId}`,
                  state: item.hostId,
                });
              }}
            >
              '시작하기'
            </button>
          </li>
        )}
      </div>
    );
    // 호스트일때
  } else if (Host === Bloger) {
    return (
      <>
        {item?.accepted === false && (
          <li className="booking" key={`${timeId}`}>
            <div className="bookingInfo">
              {/* 게스트인지 호스트인지에 따라서 userName 다르게 보이게 함 */}
              <div className="userName"
                onClick={() => {
                  navigate(`/paper/${Guest}`);
                }}>{Guest}</div>
              <div className="userBookingWrap">
                <span className="dayInfo">{item.date}</span>
                <span className="timeInfo">{item.time}</span>
              </div>
            </div>
            <button
              className="videoBtn"
              onClick={() => {
                dispatch(patchBookingDB({ hostId, bookingId }));
                setChange(!change)
              }}
            >
              '수락하기'
            </button>
            <button
              className="delBtn"
              onClick={() => {
                dispatch(deleteHostBookingDB({ hostId, bookingId }));
                setChange(!change)
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
              <div className="userName"
                onClick={() => {
                  navigate(`/paper/${Guest}`);
                }}>{Guest}</div>
              <div className="userBookingWrap">
                <span className="dayInfo">
                  {item.date}
                </span>
                <span className="timeInfo">
                  {item.time}
                </span>
              </div>
            </div>
            <button
              className="videoBtn"
              onClick={() => {
                navigate(
                  `/videochat/${item.hostId + item.guestId}`,
                );
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
