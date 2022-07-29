import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { apiToken } from "../shared/apis/Apis";
import { useDispatch, useSelector } from "react-redux";
import { getBookingDB } from "../redux/modules/Booking";
import defaultUserImage from "../public/images/default_profile.png";

import { useParams } from "react-router-dom";

import CalendarTemplate from "../components/booking/Calendar";
import Header from "../components/main/Header";
import Footer from "../components/main/Footer";
import { getLeafDB } from "../redux/modules/Leaf";

const Reservation = () => {
  const { blogId } = useParams();
  const dispatch = useDispatch();
  const LeafCount = useSelector((state) => state.leafReducer.data);
  const [availability, setAvailability] = useState([]);

  useEffect(() => {
    dispatch(getLeafDB(blogId));

    apiToken({
      method: "get",
      url: `/api/booking/blog/${blogId}`, 
    })
      .then((doc) => {
        console.log(doc.data);
        setAvailability(doc?.data.bookingList);
      })
      
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const HostLeafCount = LeafCount?.pointList.hostLeaf[0];
  const hostProfileImage = HostLeafCount?.profileImage;

  const Calendar = CalendarTemplate({
    blogId,
    availability,
    setAvailability: (timeList) => {
      setAvailability(timeList);
    },
  });
  const S3 = process.env.REACT_APP_S3_URL + `/${hostProfileImage}`;

  return (
    <>
      <Header />
      <Wrap>
        <InfoBox>
          <TitleBox>
            <div className="korean">예약 하기</div>
            <div className="english">Reservation</div>
          </TitleBox>
          <HostBox>

            <ImgBox>
              <HostImgBox src={hostProfileImage === null ? defaultUserImage : S3} />
              <div className="hostNickName">
                {HostLeafCount?.nickname}
              </div>
            </ImgBox>
            <LeafBox>
              <div className="guestLeaf">
                <div className="leafTitle">
                  내가 보유한 나뭇잎 갯수
                </div>
                <img
                  className="leafIcon"
                  src={process.env.PUBLIC_URL + "/Group.png"}
                  back_size="100% 100%"
                  alt="icon"
                />
                <div className="leafCount">
                  {LeafCount?.pointList.gusetLeaf}개
                </div>
              </div>

              <div className="hostLeaf">
                <div className="leafTitle">
                  예약에 필요한 나뭇잎 갯수
                </div>
                <img
                  className="leafIcon"
                  src={process.env.PUBLIC_URL + "/Group.png"}
                  alt="icon"
                />
                <div className="leafCount">
                  {HostLeafCount?.setPoint}개
                </div>
              </div>
            </LeafBox>
          </HostBox>
        </InfoBox>

        <CalendarBox>
          <Calendar userId={blogId} />
        </CalendarBox>
      </Wrap>
      <Footer />
    </>
  );
};

const Wrap = styled.div`
  width: 100%;
  height: 1500px;
`
const InfoBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`
const TitleBox = styled.div`
  width: 640px;
  height: 260px;
  display: flex;
  align-items: center;
  justify-content: end;
  padding: 25px;
  margin-bottom: 46px;
  flex-direction: column;
  border-bottom: 1px solid #ACACAC;
  .korean {
    font-family: 'Gmarket Sans';
    font-style: normal;
    font-weight: 400;
    font-size: 30px;
  }
  .english {
    font-family: 'Gmarket Sans';
    font-style: normal;
    font-weight: 300;
    font-size: 20px;
  }
`
const HostBox = styled.div`
  width: 592px;
  height: 158.4px;
  display: flex;
  align-items: center;
  float: left;
`

const ImgBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  .hostNickName{
    font-family: 'Gmarket Sans';
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 14px;
    display: flex;
    align-items: center;
    text-align: center;
    padding-top: 16px;
  }
`
const LeafBox = styled.div`
  width: 592px;
  height: 130px;
  display: flex;
  padding-left: 67px;
  margin-top: -30px;
  justify-content: center;
  flex-direction: column;
  gap: 40px;
  float: left;
  .guestLeaf{
    display: flex;
    align-items: center;
    .leafTitle{
      font-family: 'Gmarket Sans';
      font-style: normal;
      font-weight: 400;
      font-size: 18px;
      line-height: 18px;
      /* identical to box height */
      display: flex;
      align-items: center;
    }
    .leafIcon{
      height: 24.67px;
      margin-left: 28px;
    }
    .leafCount{
      height: 50px;
      width: 125px;
      margin-left: 16px;
      padding-left: 16px;
      font-weight: 500;
      font-size: 14px;
      line-height: 20px;
      display: flex;
      align-items: center;
      color: #ACACAC;
      background: #FFFFFF;
      border-bottom: 1px solid #ACACAC;
    }
  }
  .hostLeaf{
    display: flex;    
    align-items: center;
    .leafTitle{
      font-family: 'Gmarket Sans';
      font-style: normal;
      font-weight: 400;
      font-size: 18px;
      line-height: 18px;
      /* identical to box height */
      display: flex;
      align-items: center;
    }
    .leafIcon{
      height: 24.67px;
      margin-left: 15px;
    }
    .leafCount{
      height: 50px;
      width: 125px;
      margin-left: 16px;
      padding-left: 16px;
      font-weight: 500;
      font-size: 14px;
      line-height: 20px;
      display: flex;
      align-items: center;
      color: #ACACAC;
      background: #FFFFFF;
      border-bottom: 1px solid #ACACAC;
    }
  }
`
const HostImgBox = styled.img`
  width: 130px;
  height: 130px;
  margin: 0 0 0 0;
  border-radius: 100px;
  align-items: center;
  cursor: auto;
`
const CalendarBox = styled.div`
margin-top: 66.6px;
display: flex;
justify-content: center;
align-items: center;
`

export default Reservation;
