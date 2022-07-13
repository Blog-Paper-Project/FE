import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from "react-router";
import { getCookie } from '../../shared/Cookie';

// 모듈
// import { actionCreators as bookingAction } from '../redux/modules/booking';
// import { actionCreators as notiActions } from '../redux/modules/booking';

const BookingItem = (props) => {
  // const dispatch = useDispatch();
  const navigate = useNavigate();

  const { item, userName, userId } = props;
console.log(item)
  // 조건에 필요한 정보
  const User = getCookie('userId');
  const Host = userId;
  const Guest = userName;
  const TutorDel = item.TutorDel;
  const TuteeDel = item.TuteeDel;
  const timeId = item.bokingId;
  console.log(item)

  // 예약 정보
  let startTime = item.start;
  let endTime = item.end;

  if (!item) return null;
  // let [week, month, day, year, sTime] = startTime.split(' ');
  // let start = sTime.substr(0, 5);
  // let end = endTime.substr(-17, 5);

  // 학생일때
  if (Guest === User) {
    return (
      <div>
        {(
          <li className="booking" key={`${timeId}`}>
            <div className="bookingInfo">
              {/* 선생인지 학생인지에 따라서 userName 다르게 보이게 함 */}
              <div className="userName">{item.hostId}</div>
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
                  pathname: `/videochat/${
                    item.hostId + item.guestId
                  }`,
                  state: item.hostId,
                });
              }}
            >
             '시작하기'
            </button>
            {/* <button
              className="delBtn"
              onClick={() => {
                dispatch(delBookingNotiDB(timeId));
              }}
            >
             '예약 취소'
            </button> */}
          </li>
        )}
        {(
          <li className="booking" key={`${timeId}`}>
            <div className="bookingInfo">
              {/* 선생인지 학생인지에 따라서 userName 다르게 보이게 함 */}
              <div className="userName">{item.hostId}</div>
              <div className="userBookingWrap">
                <span className="dayInfo">
                  {item.date}
                </span>
                <span className="timeInfo">
                  {item.time}
                </span>
              </div>
            </div>
            {/* <button
              className="deleteBtn"
              onClick={() => {
                TuteeDel === 1 && dispatch(delCheckNotiDB(timeId));
              }}
            >
             '예약 취소'
            </button> */}
          </li>
        )}
      </div>
    );

    // 선생님일때
  } else if (Host === User) {
    return (
      <>
        {(
          <li className="booking" key={`${timeId}`}>
            <div className="bookingInfo">
              {/* 선생인지 학생인지에 따라서 userName 다르게 보이게 함 */}
              <div className="userName">{item.guestId}</div>
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
            {/* <button
              className="delBtn"
              onClick={() => {
                dispatch(delBookingNotiDB(timeId));
              }}
            >
           '예약 취소'
            </button> */}
          </li>
        )}
        {(
          <li className="booking" key={`${timeId}`}>
            <div className="bookingInfo">
              {/* 선생인지 학생인지에 따라서 userName 다르게 보이게 함 */}
              <div className="userName">{item.guestId}</div>
              <div className="userBookingWrap">
                <span className="dayInfo">
                  {item.date}
                </span>
                <span className="timeInfo">
                  {item.time}
                </span>
              </div>
            </div>
            {/* <button
              className="deleteBtn"
              onClick={() => {
                TutorDel === 1 && dispatch(notiActions.delCheckNotiDB(timeId));
              }}
            >
            '예약 취소'
            </button> */}
          </li>
        )}
      </>
    );
  }

  return null;
};

export default BookingItem;
