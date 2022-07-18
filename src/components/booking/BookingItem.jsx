import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { getCookie } from '../../shared/Cookie';
import { deleteGuestBookingDB, deleteHostBookingDB, patchBookingDB } from '../../redux/modules/Booking';

// 모듈
// import { actionCreators as bookingAction } from '../redux/modules/booking';
// import { actionCreators as notiActions } from '../redux/modules/booking';

const BookingItem = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { item } = props;
  // 조건에 필요한 정보
  const User = Number(getCookie("userId"));
  const Host = Number(item?.hostId);
  const Guest = Number(item?.guestId);
  const hostId = Number(item?.hostId);
  const bookingId = Number(item?.bookingId);
  // const TutorDel = item.TutorDel;
  // const TuteeDel = item.TuteeDel;
  const timeId = item.bokingId;
  // console.log(item)
  console.log(hostId, bookingId);
  // 예약 정보
  // let startTime = item.start;
  // let endTime = item.end;
  if (!item) return null;
  // let [week, month, day, year, sTime] = startTime.split(' ');
  // let start = sTime.substr(0, 5);
  // let end = endTime.substr(-17, 5);

  // 게스트일때
  if (Guest === User) {
    return (
      <div>
        {item?.accepted === false && (
          <li className="booking" key={`${timeId}`}>
            <div className="bookingInfo">
              {/* 게스트인지 호스트인지에 따라서 userName 다르게 보이게 함 */}
              <div className="userName">{item?.hostId}</div>
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
                dispatch(deleteGuestBookingDB({User, bookingId}))

                // dispatch(delBookingNotiDB(timeId));
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
  } else if (Host === User) {
    return (
      <>
        {item?.accepted === false && (
          <li className="booking" key={`${timeId}`}>
            <div className="bookingInfo">
              {/* 게스트인지 호스트인지에 따라서 userName 다르게 보이게 함 */}
              <div className="userName">{item.guestId}</div>
              <div className="userBookingWrap">
                <span className="dayInfo">{item.date}</span>
                <span className="timeInfo">{item.time}</span>
              </div>
            </div>

            <button
              className="videoBtn"
              onClick={() => {
                dispatch(patchBookingDB({ hostId, bookingId }));
              }}
            >
              '수락하기'
            </button>

            <button
              className="delBtn"
              onClick={() => {
                dispatch(deleteHostBookingDB({hostId, bookingId}));
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
          </li>
        )}
      </>
    );
  }

  return null;
};

export default BookingItem;
