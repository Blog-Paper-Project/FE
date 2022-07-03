import React, { useState } from "react";

import { useQuery } from "react-query";

import MyProfileModal from "../components/user/MyProfileModal";

import { apiToken } from "../shared/apis/Apis";

import Header from "../components/main/Header";

const MyProfile = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  const { data: res } = useQuery("MY_PROFILE", getMyProfile);

  const S3 = process.env.REACT_APP_S3_URL+`/${res?.data.myprofile.profileImage}`

  return (
    <>
      {/* <Header /> */}
      <div>
        <img
          src={
            res?.data.myprofile.profileImage
              ? S3
              : "https://www.snsboom.co.kr/common/img/default_profile.png"
          }
          alt="profileImg"
        />
        <div>내 소개 {res?.data.myprofile.introduction}</div>
        <div>포인트 {res?.data.myprofile.point}</div>
        <div>인기도 {res?.data.myprofile.popularity}</div>
        <div>닉네임 {res?.data.myprofile.nickname}</div>
        <div>이메일 {res?.data.myprofile.email}</div>
        <div>
          <button
            onClick={() => {
              setIsModalOpen(true);
            }}
          >
            개인정보 변경
          </button>
        </div>
        {isModalOpen === true ? (
          <MyProfileModal
            open={openModal}
            close={closeModal}
            profileImage={S3}
            introduction={res?.data.myprofile.introduction}
            nickname={res?.data.myprofile.nickname}
            email={res?.data.myprofile.email}
            header="개인정보 수정"
          />
        ) : null}
      </div>
    </>
  );
};

export default MyProfile;
