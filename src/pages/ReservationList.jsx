import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux/es/exports";
import bookingReducer, { getBookingDB } from "../redux/modules/Booking";
import styled from "styled-components";

import BookingItem from "../components/booking/BookingItem";
import Header from "../components/main/Header";
import Footer from "../components/main/Footer";

const ReservationList = () => {
  const dispatch = useDispatch();
  //  불러온 예약 정보
  const bookingList = useSelector((state) => state?.bookingReducer.data);
  const [leafChange, setLeafChange] = useState(false);
  useEffect(() => {
    dispatch(getBookingDB());
  }, [dispatch, leafChange]);

  return (
    <>
      <Header />
      <Wrap>
        <div className="innerWrap">
          <div className="bookingWrap">
            <p className="bookingTitle">
              예약 리스트 <span>/ 예약 한 내역</span>
            </p>
            <ListTitle>
              <div className="bookingInfo">
                <div className="userName">
                  예약상대
                </div>
                <div className="userBookingWrap">
                  <span className="dayInfo">
                    날짜
                  </span>
                  <span className="timeInfo">
                    시간
                  </span>
                </div>
              </div>
            </ListTitle>
            <ul className="bookingList">
              {bookingList?.guestBookingList.length === 0 && (
                <li className="noBookingText">예약된 내역이 없습니다!</li>
              )}
              {bookingList?.guestBookingList.map((item, idx) => {
                return (
                  <BookingItem
                    leafChange={leafChange}
                    setLeafChange={setLeafChange}
                    item={item}
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
              예약 리스트 <span>/ 예약 받은 내역</span>
            </p>
            <ListTitle>타이틀</ListTitle>
            <ul className="bookingList">

              {bookingList?.hostBookingList.length === 0 && (
                <li className="noBookingText">예약된 내역이 없습니다!</li>
              )}
              {bookingList?.hostBookingList.map((item, idx) => {
                return (
                  <BookingItem
                    leafChange={leafChange}
                    setLeafChange={setLeafChange}
                    item={item}
                    key={idx}
                  />
                );
              })}
            </ul>
          </div>
        </div>
      </Wrap>
      <Footer />
    </>
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
      border-top: 1px solid #ACACAC;

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
        border: 1px solid #E1E1E1;
        padding: 20px 10px 20px 20px;
        overflow-y: scroll;
        background-color: #fff;

        /* 스크롤 버튼 조절 */
        ::-webkit-scrollbar {
          /*스크롤바의 너비*/
          width: 20px;
        }
        ::-webkit-scrollbar-thumb {
          /*스크롤바의 색상*/
          height: 20%;
          background-color: #889175;
          border-radius: 15px;
        }
        ::-webkit-scrollbar-track {
          /*스크롤바 트랙 색상 */
          background-color: rgba(217, 217, 217, 0.5);
          border-radius: 15px;
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
            max-width: 92px;
            height: 34px;
            border: 1px solid;
            padding: 10px 8px 9px;
            font-size: 14px;
            font-weight: 400;
            color: #000;
            cursor: pointer;
            background-color: #fff;
            &:hover {
              color: #fff;
              background-color: #153587;
            }
          }

          .waitBtn {
            width: 15%;
            max-width: 92px;
            height: 34px;
            border: 1px solid;
            padding: 10px 8px 9px;
            font-size: 14px;
            font-weight: 400;
            color: #000;
            cursor: auto;
            background-color: #969696;
          }

          .delBtn {
            width: 15%;
            max-width: 92px;
            height: 34px;
            border: 1px solid;
            padding: 10px 8px 9px;
            font-size: 14px;
            font-weight: 400;
            color: #000;
            margin-left: 5px;
            cursor: pointer;
            background-color: #fff;
            &:hover {
              color: #fff;
              background-color: #981821;
            }
          }          
        }
      }
    }
  }
`;
const ListTitle = styled.div`
  width: 100%;
  height: 44px;
  background: #F1F1F1;
  border: 1px solid #ACACAC;
  font-family: 'Gmarket Sans';
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 16px;
  display: flex;
  align-items: center;
  text-align: center;
  overflow: hidden;
  .bookingInfo {
    width: 100%;
    padding: 20px;
    display: flex;
    text-align: center;
    border-radius: 4px;
    margin-right: 20px;
    gap: 3%;

    .userName {
      width: 15%;
      width: auto;
      min-width: 100px;
      font-size: 16px;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      margin-left: 10px;
      margin-right: 5px;
      padding-left: 10px;
    }

    .userBookingWrap {
      width: 100%;
      text-align: center;
      display: flex;
      align-items: center;
      gap: 40px;
        span {
          display: inline-block;
          font-size: 16px;
        }
        .dayInfo {
          min-width: 200px;
        }

        .timeInfo {
          min-width: 200px;
        }
    }
  }
`

export default ReservationList;
