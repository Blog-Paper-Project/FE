import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux/es/exports";
import bookingReducer, { getBookingDB } from "../redux/modules/Booking";
import styled from "styled-components";

import BookingItem from "../components/booking/BookingItem";

const ReservationList = () => {
  const dispatch = useDispatch();
  // 마이페이지에 불러올 유저 api
  // const userApi = props.match.params;
  //마이페이지 유저정보
  // const userInfo = useSelector((state) => state.user.detailInfo);
  // 마이페이지 예약정보 불러오기 위한 값들

  //  불러온 예약 정보
  const bookingList = useSelector((state) => state?.bookingReducer.data);
  useEffect(() => {
    dispatch(getBookingDB());
  }, []);
  console.log(bookingList)

  return (
    <Wrap>
      <div className="innerWrap">
        <div className="bookingWrap">
          <p className="bookingTitle">
            '예약 리스트' <span>/ '예약 신청 내역'</span>
          </p>
          <ul className="bookingList">
            {bookingList?.guestBookingList.length === 0 && (
              <li className="noBookingText">'예약된 내역이 없습니다!'</li>
            )}
            {bookingList?.guestBookingList.map((item, idx) => {
              console.log(item)
              return (
                <BookingItem

                  item={item}
                  // userInfo={userInfo}
                  key={idx}
                />
              );
            })}
          </ul>
        </div>
      </div>
      <div className="innerWrap">
        <div className="bookingWrap">
          <p className="bookingTitle">
            '예약 리스트' <span>/ '예약 받은 내역'</span>
          </p>
          <ul className="bookingList">
            {bookingList?.hostBookingList.length === 0 && (
              <li className="noBookingText">'예약된 내역이 없습니다!'</li>
            )}
            {bookingList?.hostBookingList.map((item, idx) => {
              return (
                <BookingItem

                  item={item}
                  // userInfo={userInfo}
                  key={idx}
                />
              );
            })}
          </ul>
        </div>
      </div>
    </Wrap>
  );
};

const Wrap = styled.div`
  width: 100%;
  min-height: 904px;
  margin-bottom: 100px;

  .innerWrap {
    max-width: 1280px;
    width: 80%;
    margin: auto;

    /* 예약 리스트 Wrap */
    .bookingWrap {
      width: 90%;
      height: auto;
      margin: 70px auto;
      min-height: 100px;
      padding: 10px;
      border-top: 1px solid #c4c4c4;

      /* 예약 리스트 타이틀 */
      .bookingTitle {
        font-size: 38px;
        font-weight: bolder;
        margin-bottom: 60px;

        span {
          font-size: 26px;
          color: #969696;
          margin-left: 15px;
        }
      }

      /* 예약 리스트 */
      .bookingList {
        width: 100%;
        margin: auto;
        max-height: 400px;
        min-height: 260px;
        border: 2px solid #c7c7c7;
        border: 1px solid #c7c7c7;
        border-radius: 4px;
        padding: 20px 10px 20px 20px;
        box-shadow: inset 0px 0px 6px rgba(0, 0, 0, 0.15);
        overflow-y: scroll;

        /* 스크롤 버튼 조절 */
        ::-webkit-scrollbar {
          /*스크롤바의 너비*/
          width: 20px;
        }
        ::-webkit-scrollbar-thumb {
          /*스크롤바의 색상*/
          height: 20%;
          background-color: #e4e4e4;
          border-radius: 15px;
        }
        ::-webkit-scrollbar-track {
          /*스크롤바 트랙 색상 */
          background-color: #d7d7d7;
          border-radius: 15px;
          display: none;
        }
        .noBookingText {
          text-align: center;
          padding-top: 20px;
          font-weight: 700;
          font-size: 18px;
          letter-spacing: 1px;
        }

        /* 예약 카드 */
        .booking {
          width: 100%;
          border-radius: 10px;
          display: flex;
          justify-content: space-between;
          align-items: center;

          + .booking {
            margin-top: 10px;
          }

          /* 예약 정보 */
          .bookingInfo {
            width: 100%;
            height: 50px;
            padding: 10px;
            display: flex;
            text-align: center;
            border: 1px solid #c7c7c7;
            border-radius: 4px;
            margin-right: 20px;
            gap: 3%;

            .userName {
              width: 20%;
              width: auto;
              min-width: 100px;
              font-size: 16px;
              display: flex;
              align-items: center;
              justify-content: flex-start;
              margin-left: 10px;
              margin-right: 30px;
              padding-left: 10px;
            }

            .userBookingWrap {
              width: 70%;
              text-align: left;
              display: flex;
              align-items: center;
              gap: 50px;

              span {
                display: inline-block;
                font-size: 16px;
              }

              .dayInfo {
                min-width: 200px;
              }

              .timeInfo {
              }
            }
          }

          .videoBtn {
            width: 15%;
            max-width: 240px;
            height: 50px;
            border: none;
            padding: 10px 8px 9px;
            border-radius: 5px;
            font-size: 16px;
            font-weight: bolder;
            color: #fff;
            cursor: pointer;
            background-color: #153587;
          }

          .waitBtn {
            width: 15%;
            max-width: 240px;
            height: 50px;
            border: none;
            padding: 10px 8px 9px;
            border-radius: 5px;
            font-size: 16px;
            font-weight: bolder;
            color: #fff;
            background-color: #666666;
          }

          .delBtn {
            width: 15%;
            max-width: 200px;
            height: 50px;
            border: none;
            padding: 10px 8px 9px;
            border-radius: 5px;
            font-size: 16px;
            font-weight: bolder;
            color: #fff;
            margin-left: 5px;
            cursor: pointer;
            background-color: #981821;
          }

          /* .deleteBtn {
            width: 32%;
            max-width: 253px;
            height: 50px;
            border: none;
            padding: 10px 8px 9px;
            border-radius: 5px;
            font-size: 16px;
            font-weight: bolder;
            color: #fff;
            margin-left: 5px;
            background-color: #525252;
          } */
        }
      }
    }
  }
`;

export default ReservationList;
