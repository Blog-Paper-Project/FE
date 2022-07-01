import React, { useState } from "react";
import "./modal.css";

import { useMutation, useQueryClient } from "react-query";

import { nicknameCheck } from "../../shared/SignUpCheck";

import { api, apiToken } from "../../shared/apis/Apis";

const MyProfileModal = (props) => {
  const queryClient = useQueryClient();

  const { open, close, header, profileImage, introduction, nickname } = props;

  const [CHGintroduction, setCHGIntroduction] = useState(introduction);
  const [CHGnickname, setCHGnickname] = useState(nickname);
  const [previewImg, setpreviewImg] = useState(profileImage);
  const [CHGprofileImg, setCHGprofileImg] = useState();

  //닉네임 중복체크
  const getNickCheck = async () => {
    if (!nicknameCheck(CHGnickname)) {
      return null;
    } else {
      const data = await api.post(`/user/idcheck/${CHGnickname}`);
      return data;
    }
  };

  const { mutate: dupnick } = useMutation(getNickCheck, {
    onSuccess: (data) => {
      queryClient.invalidateQueries();
      if (data === null) {
        window.alert("닉네임 형식을 지켜주세요");
      } else {
        window.alert("사용가능한 닉네임 입니다");
      }
    },
    onError: () => {
      window.alert("이미 사용중인 닉네임입니다");
    },
  });

  //이미지 미리보기
  const encodeFileToBase64 = (fileBlob) => {
    const reader = new FileReader();

    reader.readAsDataURL(fileBlob);

    return new Promise((resolve) => {
      reader.onload = () => {
        setpreviewImg(reader.result);
        resolve();
      };
    });
  };

  //프로필 변경
  const useProfile = async () => {
    const formData = new FormData();

    formData.append("introduction", CHGintroduction);
    formData.append("nickname", CHGnickname);
    formData.append("image", CHGprofileImg);

    const data = await apiToken.patch("/user/myprofile", formData);

    return data;
  };

  const { mutate: onsubmit } = useMutation(useProfile, {
    onSuccess: () => {
      queryClient.invalidateQueries();
      window.alert("수정성공!!");
    },
    onError: () => {
      window.alert("에러!!");
      return;
    },
  });

  if (MyProfileModal.isLoading) {
    return null;
  }

  return (
    <>
      <div className={open ? "openModal modal" : "modal"}>
        {open ? (
          <section>
            <header>
              {header}
              <button className="open" onClick={close}>
                닫기
              </button>
            </header>

            <div>
              프로필 이미지
              <img
                src={
                  previewImg
                    ? previewImg
                    : "https://www.snsboom.co.kr/common/img/default_profile.png"
                }
                alt="profile"
              />
              <input
                type="file"
                id="file"
                accept={"image/*"}
                onChange={(e) => {
                  encodeFileToBase64(e.target.files[0]);
                  setCHGprofileImg(e.target.files[0]);
                }}
              />
            </div>

            <div>
              내 소개
              <input
                defaultValue={introduction}
                onChange={(e) => {
                  setCHGIntroduction(e.target.value);
                }}
              />
            </div>

            <div>
              닉네임
              <input
                defaultValue={nickname}
                onChange={(e) => {
                  setCHGnickname(e.target.value);
                }}
              />
              <button onClick={dupnick}>중복확인</button>
            </div>

            <footer>
              <button onClick={onsubmit}>수정</button>
            </footer>
          </section>
        ) : null}
      </div>
    </>
  );
};

export default MyProfileModal;
