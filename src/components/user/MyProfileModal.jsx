import React, { useState } from "react";
import "./modal.css";

import { useMutation, useQueryClient } from "react-query";

import { nicknameCheck } from "../../shared/SignUpCheck";

import { api, apiToken } from "../../shared/apis/Apis";
import { deleteCookie, setCookie } from "../../shared/Cookie";
import { useRef } from "react";
import styled from "styled-components";

const MyProfileModal = (props) => {
  const queryClient = useQueryClient();

  const { open, close, header, profileImage, introduction, nickname } = props;

  const [CHGintroduction, setCHGIntroduction] = useState(introduction);
  const [CHGnickname, setCHGnickname] = useState(nickname);
  const [previewImg, setpreviewImg] = useState(profileImage);
  const [CHGprofileImg, setCHGprofileImg] = useState();
  const fileInputRef = useRef();

  //닉네임 중복체크
  const getNickCheck = async () => {
    if (!nicknameCheck(CHGnickname)) {
      return null;
    } else {
      const data = await api.post("/user/idcheck", {
        nickname: CHGnickname,
      });
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
      deleteCookie("nickname");
      setCookie("nickname", CHGnickname);
      close();
    },
    onError: () => {
      window.alert("닉네임중복임!!!");
      return;
    },
  });

  if (MyProfileModal.isLoading) {
    return null;
  }

  //input창 숨기고 사진 넣기
  const onClickImageUpload = () => {
    fileInputRef.current.click();
  };

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
              <div>
                <img
                  src={
                    previewImg.split("/")[3] === "null"
                      ? "https://www.snsboom.co.kr/common/img/default_profile.png"
                      : previewImg
                  }
                  alt="profile"
                  onClick={onClickImageUpload}
                />
              </div>
              <input
                type="file"
                id="file"
                accept={"image/*"}
                style={{ display: "none" }}
                ref={fileInputRef}
                onChange={(e) => {
                  encodeFileToBase64(e.target.files[0]);
                  setCHGprofileImg(e.target.files[0]);
                }}
              />

              <div>
                내 소개
                <textarea
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

const ProfileImg = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50px;
`;

export default MyProfileModal;
