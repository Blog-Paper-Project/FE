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
      url: `/api/booking`, // 학생 또는 선생님
    })
      .then((doc) => {
        // console.log(doc.data.totalList);
        setAvailability(doc?.data.totalList.hostBookingList);
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
      <Wrap>
        <Header />

        <InfoBox>
          <TitleBox>
            <div className="korean">예약 하기</div>
            <div className="english">Reservation</div>
          </TitleBox>
          <HostBox>
            <HostInfo>
              <ImgBox>
                <HostImgBox src={hostProfileImage === "null" ? defaultUserImage : S3} />
                <div>
                  호스트의 닉네임 = {HostLeafCount?.nickname}
                </div>
              </ImgBox>
              <LeafBox>
                <div>
                  내가 보유한 나뭇잎 갯수 = {LeafCount?.pointList.gusetLeaf}
                </div>
                <div>
                  예약에 필요한 나뭇잎 갯수 = {HostLeafCount?.setPoint}
                </div>
              </LeafBox>
            </HostInfo>
          </HostBox>
        </InfoBox>

        <CalendarBox>
          <Calendar userId={blogId} />
        </CalendarBox>
        <Footer />
      </Wrap>
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
  justify-content: center;
  flex-direction: column;
  border: 1px solid;
  .korean {
    font-weight: 400;
    font-size: 30px;
  }
  .english {
    font-weight: 300;
    font-size: 20px;
  }
`
const HostBox = styled.div`
  width: 100%;
  height: 30%;
  display: flex;
  align-items: center;
  justify-content: center;
`
const HostInfo = styled.div`
  width: 30%;
  height: 70%;
  outline: 1px solid;
`
const ImgBox = styled.div`
  
`
const LeafBox = styled.div`

`
const HostImgBox = styled.img`
  width: 130px;
  height: 130px;
  margin: 0 0 0 0;
  border-radius: 100px;
  outline: 1px solid black;
  align-items: center;
`
const CalendarBox = styled.div`
width: 100%;
height:60%;
display: flex;
justify-content: center;
align-items: center;
`

export default Reservation;
