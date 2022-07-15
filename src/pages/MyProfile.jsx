import React, { useState } from "react";

import { useQuery } from "react-query";

import MyProfileModal from "../components/user/MyProfileModal";

import { apiToken } from "../shared/apis/Apis";

import { getCookie } from "../shared/Cookie";
import { useNavigate } from "react-router";

import Header from "../components/main/Header";
import { socket } from "../App";
import styled from "styled-components";
import Footer from "../components/main/Footer";
import ReservationList from "../components/booking/ReservationList";

const MyProfile = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const nickname = getCookie("nickname");
  const navigate = useNavigate();

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    if (isModalOpen === true) return setIsModalOpen(false);
  };

  const getMyProfile = async () => {
    const res = await apiToken.get("/user/myprofile");
    return res;
  };
  const { data: res, status } = useQuery("MY_PROFILE", getMyProfile, {
    staleTime: Infinity,
    onSuccess: (data) => {
      return data;
    },
  });

  if (status === "loading") {
    return <div>loading...</div>;
  }
  console.log(res);
  const S3 =
    process.env.REACT_APP_S3_URL + `/${res?.data.myprofile.profileImage}`;

  const enterChat = async () => {
    const roomData = {
      room: "광민1",
      name: nickname,
    };
    await socket.emit("user-connected");

    socket.emit("newUser", roomData);
    navigate("/chat");

    socket.on("roomfull", (data) => {
      window.alert("방꽉참");
      navigate("/myprofile");
    });
  };

  return (
    <MyProfileContainer>
      <Header />
      <Top>
        <h2>마이페이지</h2>
        <p>My page</p>
      </Top>
      <ProfileImg
        src={
          res?.data.myprofile.profileImage
            ? S3
            : "https://www.snsboom.co.kr/common/img/default_profile.png"
        }
        alt="profileImg"
      />
      <div>{res?.data.myprofile.nickname}</div>
      <ProfileBox>
        <IntroBox>
          <p>자기소개</p>
          <Intro>
            <p>{res?.data.myprofile.introduction}</p>
          </Intro>
        </IntroBox>
        <PointWrap>
          <p>모은 나뭇잎</p>
          <PointBox>
            <p>{res?.data.myprofile.point}</p>
          </PointBox>
        </PointWrap>
        <PointWrap>
          <p>인기도</p>
          <PointBox>
            <p>{res?.data.myprofile.popularity}</p>
          </PointBox>
        </PointWrap>
        <PointWrap>
          <p>이메일</p>
          <PointBox>
            <p>{res?.data.myprofile.email}</p>
          </PointBox>
        </PointWrap>

        <ProfileButton
          onClick={() => {
            setIsModalOpen(true);
          }}
        >
          마이페이지 수정
        </ProfileButton>
        <button onClick={enterChat}>채팅시작!</button>
      </ProfileBox>

      {isModalOpen === true ? (
        <MyProfileModal
          open={openModal}
          close={closeModal}
          profileImage={S3}
          introduction={res?.data.myprofile.introduction}
          nickname={res?.data.myprofile.nickname}
          email={res?.data.myprofile.email}
          header="마이페이지 수정"
        />
      ) : null}

      <ReservationList />
      <Footer />
    </MyProfileContainer>
  );
};

const MyProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #e5e2db;
`;

const ProfileBox = styled.div`
  width: 386px;
  height: 500px;
  /* background-color: gray; */
  flex-direction: column;
  justify-content: center;
`;

const Top = styled.div`
  display: flex;
  text-align: center;
  flex-direction: column;
  width: 386px;
  border-bottom: solid 1px black;
  margin: 160px auto 32px auto;
  padding-bottom: 25px;
  > h2 {
    font-size: 30px;
  }
  > p {
    font-size: 20px;
  }
`;

const ProfileImg = styled.img`
  width: 154px;
  height: 154px;
  border-radius: 154px;
  display: block;
  margin: 0px auto;
`;

const IntroBox = styled.div`
  margin-top: 8px;
  display: flex;
  flex-direction: column;
  width: 386px;
  > p {
    font-size: 14px;
  }
`;

const Intro = styled.div`
  background-color: white;
  height: 102px;
  padding: 10px;
  margin-top: 8px;
`;

const PointWrap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 386px;
  margin: 8px 0 8px 0;
  p {
    font-size: 14px;
  }
`;

const PointBox = styled.div`
  background-color: white;
  width: 272px;
  height: 30px;
  padding-left: 10px;
  font-size: 14px;
  display: flex;
  align-items: center;
`;

const ProfileButton = styled.button`
  width: 100%;
  height: 50px;
  background-color: black;
  display: flex;
  justify-content: center;
  color: white;
  border: 1px solid #e5e2db;
  font-family: Gmarket Sans;
  font-size: 16px;
  font-weight: 400;
  line-height: 50px;
  letter-spacing: 0em;
  text-align: center;
  margin-top: 30px;
`;

export default MyProfile;
