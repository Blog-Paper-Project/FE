import React, { useState } from "react";

import { useQuery } from "react-query";

import MyProfileModal from "../components/user_components/MyProfileModal";

import api from "../shared/apis/Apis";

const MyProfile = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    if (isModalOpen === true) return setIsModalOpen(false);
  };

  const getMyProfile = async () => {
    const res = await api.get("/user/myprofile");
    return res;
  };

  const { data: res } = useQuery("MY_PROFILE", getMyProfile);

  console.log(res?.data.myprofile);

  return (
    <>
      <div>
        <img
          src={
            res?.data.myprofile.profileImage
              ? res?.data.myprofile.profileImage
              : "https://www.snsboom.co.kr/common/img/default_profile.png"
          }
          alt="profile"
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
            profileImage={res?.data.myprofile.profileImage}
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
