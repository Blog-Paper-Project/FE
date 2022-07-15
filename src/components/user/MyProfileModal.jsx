import React, { useState } from "react";
import "./modal.css";

import { useMutation, useQueryClient } from "react-query";

import { nicknameCheck } from "../../shared/SignUpCheck";

import { api, apiToken } from "../../shared/apis/Apis";
import { deleteCookie, getCookie, setCookie } from "../../shared/Cookie";
import { useRef } from "react";
import styled from "styled-components";
import chgImg from "../../public/images/chgImg.svg";

const MyProfileModal = (props) => {
  const queryClient = useQueryClient();

  const { open, close, header, profileImage, introduction, nickname } = props;

  const [CHGintroduction, setCHGIntroduction] = useState(introduction);
  const [CHGnickname, setCHGnickname] = useState(nickname);
  const [previewImg, setpreviewImg] = useState(profileImage);
  const [CHGprofileImg, setCHGprofileImg] = useState();
  const fileInputRef = useRef();
  const PreNickname = getCookie("nickname");

  console.log(PreNickname);
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
      deleteCookie("profileImage");
      setCookie("profileImage", CHGprofileImg);
      close();
    },
    onError: () => {
      window.alert("읭??에러!!!");
      return;
    },
  });

  //프로필 변경
  const useProfile1 = async () => {
    const formData = new FormData();

    formData.append("introduction", CHGintroduction);
    formData.append("image", CHGprofileImg);

    const data = await apiToken.patch("/user/myprofile", formData);

    return data;
  };

  const { mutate: onsubmit1 } = useMutation(useProfile1, {
    onSuccess: () => {
      queryClient.invalidateQueries();
      window.alert("수정성공!!");
      deleteCookie("nickname");
      setCookie("nickname", CHGnickname);
      deleteCookie("profileImage");
      setCookie("profileImage", CHGprofileImg);
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
              <ProfileImg
                src={
                  previewImg.split("/")[3] === "null"
                    ? "https://www.snsboom.co.kr/common/img/default_profile.png"
                    : previewImg
                }
                alt="profile"
                onClick={onClickImageUpload}
              />
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
              <ChgProfile>
                <img src={chgImg} alt="img" onClick={onClickImageUpload} />
              </ChgProfile>
              <InputBox>
                <div
                  style={{
                    width: "40%",
                    backgroundColor: "white",
                    alignItems: "center",
                    flexDirection: "row",
                    margin: "8px 0 16px 0",
                    height: "40px",
                  }}
                >
                  <SignUpDupInput
                    defaultValue={nickname}
                    onChange={(e) => {
                      setCHGnickname(e.target.value);
                    }}
                  />
                  <DupButton onClick={dupnick}>중복 확인</DupButton>
                </div>
                <div>
                  <textarea
                    style={{
                      width: "500px",
                      height: "6.25em",
                      border: "none",
                      resize: "none",
                      border: "1px solid black",
                      padding: "10px",
                    }}
                    defaultValue={introduction}
                    onChange={(e) => {
                      setCHGIntroduction(e.target.value);
                    }}
                  />
                </div>
              </InputBox>
            </div>

            <footer>
              {PreNickname === CHGnickname ? (
                <button onClick={onsubmit1}>닉네임빼고수정</button>
              ) : (
                <button onClick={onsubmit}>수정</button>
              )}
            </footer>
          </section>
        ) : null}
      </div>
    </>
  );
};

const ProfileImg = styled.img`
  width: 154px;
  height: 154px;
  border-radius: 154px;
  display: block;
  margin: 0px auto;
`;

const ChgProfile = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 30px;
  border: 1px solid gray;
  justify-content: center;
  display: flex;
  align-items: center;
  position: relative;
  right: -56%;
  bottom: 30px;
  background-color: white;
`;

const InputBox = styled.div`
  flex-direction: column;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SignUpDupInput = styled.input`
  width: 70%;
  height: 100%;
`;

const DupButton = styled.button`
  margin: 8px 8px 8px;
  width: 56px;
  height: 20px;
`;

export default MyProfileModal;
