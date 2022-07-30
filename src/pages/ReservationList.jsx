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
  const [tab, setTab] = useState(true);
  const [color, setColor] = useState("#fff");
  const [color2, setColor2] = useState("#ACACAC");
  const [backgroundColor, setBackColor] = useState("#889175");
  const [backgroundColor2, setBackColor2] = useState("var(--main)");
  // console.log(bookingList)
  const changeColor = () => {
    if (color2 === "#fff") {
      setColor2("#ACACAC");
      setColor("#fff");
    }
  };
  const changeColor2 = () => {
    if (color === "#fff") {
      setColor("#ACACAC");
      setColor2("#fff");
    }
  };
  const changeBackColor = () => {
    if (backgroundColor2 === "#889175") {
      setBackColor2("var(--main)");
      setBackColor("#889175");
    }
  };
  const changeBackColor2 = () => {
    if (backgroundColor === "#889175") {
      setBackColor("var(--main)");
      setBackColor2("#889175");
    }
  };

  return (
    <>
      <Header />
      <Wrap>
        <div className="innerWrap">
          <div className="bookingWrap">
            <BookingTitle>
              <div className="bookingTitle">예약 리스트</div>
              <div className="bookingSubTitle">Reservation List</div>
            </BookingTitle>
            <TabBox>
              <ScCategory
                color={color}
                backgroundColor={backgroundColor}
                onClick={() => {
                  setTab(true);
                  changeColor();
                  changeBackColor();
                }}
              >
                예약 신청 내역
              </ScCategory>
              <ScCategory2
                color={color2}
                backgroundColor={backgroundColor2}
                onClick={() => {
                  setTab(false);
                  changeColor2();
                  changeBackColor2();
                }}
              >
                예약 받은 내역
              </ScCategory2>
            </TabBox>
            {tab === true && (
              <>
                <ListTitle>
                  <div className="bookingInfo">
                    <div className="userName">예약상대</div>
                    <div className="userBookingWrap">
                      <span className="dayInfo">날짜</span>
                      <span className="timeInfo">시간</span>
                      <span className="start">채팅입장</span>
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
              </>
            )}
            {tab === false && (
              <>
                <ListTitle>
                  <div className="bookingInfo">
                    <div className="userName">예약상대</div>
                    <div className="userBookingWrap">
                      <span className="dayInfo">날짜</span>
                      <span className="timeInfo">시간</span>
                      <span className="start">채팅입장</span>
                    </div>
                  </div>
                </ListTitle>
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
              </>
            )}
          </div>
        </div>
      </Wrap>
      <Footer />
    </>
  );
};

const Wrap = styled.div`
  width: 100%;
  min-height: 1500px;
  margin-bottom: 100px;

  .innerWrap {
    width: 592px;
    margin: auto;

    /* 예약 리스트 Wrap */
    .bookingWrap {
      width: 100%;
      height: auto;
      min-height: 100px;

      /* 예약 리스트 */
      .bookingList {
        width: 100%;
        margin: auto;
        max-height: 880px;
        min-height: 260px;
        border: 1px solid #e1e1e1;
        overflow-y: scroll;
        background-color: #fff;

        /* 스크롤 버튼 조절 */
        ::-webkit-scrollbar {
          /*스크롤바의 너비*/
          width: 8px;
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
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 1px solid #c7c7c7;

          /* 예약 정보 */
          .bookingInfo {
            width: 67%;
            height: 72px;
            display: flex;
            text-align: center;
            margin-right: 0px;
            gap: 1%;

            .userName {
              width: 10%;
              width: auto;
              min-width: 100px;
              font-weight: 700;
              font-size: 18px;
              display: flex;
              align-items: center;
              justify-content: flex-start;
              margin-left: 10px;
              margin-right: 8px;
            }

            .userBookingWrap {
              width: 77%;
              text-align: left;
              display: flex;
              align-items: center;
              gap: 5px;

              span {
                display: inline-block;
                font-size: 14px;
              }

              .dayInfo {
                min-width: 150px;
              }

              .timeInfo {
              }
            }
          }

          .btnBox {
            width: 200px;
            padding-left: 18px;
            display: flex;
            align-items: center;
            justify-content: center;
          }

          .videoBtn {
            width: 50%;
            max-width: 80px;
            height: 34px;
            border: 1px solid;
            padding: 10px 8px 9px;
            font-size: 14px;
            font-weight: 400;
            color: #000;
            cursor: pointer;
            margin-right: 8px;
            background-color: #fff;
            &:hover {
              color: #fff;
              background-color: #153587;
            }
          }

          .startBtn {
            width: 80px;
            max-width: 80px;
            height: 34px;
            border: 1px solid;
            padding: 10px 8px 9px;
            font-size: 14px;
            font-weight: 400;
            color: #000;
            cursor: pointer;
            margin-right: 8px;
            background-color: #fff;
            &:hover {
              color: #fff;
              background-color: #153587;
            }
          }

          .waitBtn {
            width: 50%;
            max-width: 80px;
            height: 34px;
            border: 1px solid;
            padding: 10px 8px 9px;
            font-size: 14px;
            font-weight: 400;
            color: #000;
            cursor: auto;
            margin-right: 8px;
            background-color: #969696;
          }

          .delBtn {
            width: 50%;
            max-width: 80px;
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
              background-color: #981821;
            }
          }
        }
      }
    }
  }
`;
const BookingTitle = styled.div`
  width: 592px;
  height: 260px;
  display: flex;
  align-items: center;
  justify-content: end;
  flex-direction: column;
  padding-bottom: 25px;
  margin-bottom: 40px;
  border-bottom: 1px solid #acacac;
  /* 예약 리스트 타이틀 */
  .bookingTitle {
    font-family: "Gmarket Sans";
    font-style: normal;
    font-weight: 400;
    font-size: 30px;
    font-weight: bolder;
  }
  .bookingSubTitle {
    font-family: "Gmarket Sans";
    font-style: normal;
    font-weight: 300;
    font-size: 20px;
    line-height: 150%;
  }
`;
const TabBox = styled.div`
  width: 268px;
  height: 52px;
  padding: 8px;
  gap: 16px;
  border: 1px solid #acacac;
  margin-bottom: 16px;
  display: flsex;
  align-items: center;
  justify-content: center;
`;
const ScCategory = styled.div`
  width: 118px;
  height: 36px;
  display: flsex;
  align-items: center;
  justify-content: center;
  color: ${(props) => props.color};
  background-color: ${(props) => props.backgroundColor};
  &:hover {
    cursor: pointer;
  }
`;
const ScCategory2 = styled.div`
  width: 118px;
  height: 36px;
  display: flsex;
  align-items: center;
  justify-content: center;
  color: ${(props) => props.color};
  background-color: ${(props) => props.backgroundColor};
  &:hover {
    cursor: pointer;
  }
`;

const ListTitle = styled.div`
  width: 100%;
  height: 44px;
  background: #f1f1f1;
  border: 1px solid #acacac;
  font-family: "Gmarket Sans";
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
    display: flex;
    text-align: center;
    gap: 1%;

    .userName {
      width: 100%;
      width: auto;
      min-width: 100px;
      font-size: 16px;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      margin-left: 8px;
      margin-right: 5px;
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
        min-width: 110px;
      }
      .timeInfo {
        min-width: 110px;
      }
      .start {
        min-width: 130px;
      }
    }
  }
`;

export default ReservationList;
