import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { api } from "../shared/apis/Apis";
import { useDispatch, useSelector } from "react-redux";
import { getBookingDB } from "../redux/modules/Booking";
import { getCookie } from "../shared/Cookie";
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
  useEffect(() => {
    dispatch(getLeafDB(blogId));
    dispatch(getBookingDB());
  }, []);
  console.log(LeafCount)
  const HostLeafCount = LeafCount?.pointList.hostLeaf[0];
  const hostProfileImage = HostLeafCount?.profileImage;

  const [availability, setAvailability] = useState([]);
  const Calendar = CalendarTemplate({
    blogId,
    availability,
    setAvailability,
  });
  const S3 = process.env.REACT_APP_S3_URL + `/${hostProfileImage}`;

  return (
    <>
      <Header />
      <HostBox>
        <HostInfo>
          <div>
            내가 보유한 나뭇잎 갯수 = {LeafCount?.pointList.gusetLeaf}
          </div>
          <div>
            예약에 필요한 나뭇잎 갯수 = {HostLeafCount?.setPoint}
          </div>
          <div>
            호스트의 닉네임 = {HostLeafCount?.nickname}
          </div>
          <div>호스트프로필</div>
          <HostImgBox src={hostProfileImage === "null" ? defaultUserImage : S3} />
        </HostInfo>
      </HostBox>
      <CalendarBox>
        <Calendar userId={blogId} />
      </CalendarBox>
      <Footer />
    </>
  );
};

const HostBox = styled.div`
  width: 100%;
  height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
`
const HostInfo = styled.div`
  width: 50%;
  height: 50%;
  outline: 1px solid;
`
const HostImgBox = styled.img`
  width: 40px;
  height: 40px;
  margin: 0 0 0 0;
  border-radius: 50px;
  outline: 1px solid black;
  align-items: center;
`
const CalendarBox = styled.div`
width: 100%;
height: 600px;
display: flex;
justify-content: center;
align-items: center;
`

export default Reservation;
