import React, { useState } from "react";
import "./modal.css";

import { useMutation, useQueryClient } from "react-query";

import { nicknameCheck } from "../../shared/SignUpCheck";

import { api, apiToken } from "../../shared/apis/Apis";
import { deleteCookie, getCookie, setCookie } from "../../shared/Cookie";
import { useRef } from "react";
import styled from "styled-components";
import chgImg from "../../public/images/chgImg.svg";
import LeafDrop from "../booking/LeafDrop";
import { useDispatch } from "react-redux";
import { patchLeafDB } from "../../redux/modules/Leaf";

const MyProfileModal = (props) => {
  const queryClient = useQueryClient();

  const { open, close, header, profileImage, introduction, nickname } = props;

  const [CHGintroduction, setCHGIntroduction] = useState(introduction);
  const [CHGnickname, setCHGnickname] = useState(nickname);
  const [previewImg, setpreviewImg] = useState(profileImage);
  const [CHGprofileImg, setCHGprofileImg] = useState();
  const fileInputRef = useRef();
  const PreNickname = getCookie("nickname");
  const [LeafCount, setLeafCount] = useState();
  const dispatch = useDispatch();
  const userId = getCookie("userId");

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
    onSuccess: (data) => {
      queryClient.invalidateQueries();
      window.alert("수정성공!!");
      deleteCookie("nickname");
      deleteCookie("profileimage");
      setCookie("nickname", CHGnickname);
      setCookie("profileimage", data.data.profileImage);
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
    onSuccess: (data) => {
      queryClient.invalidateQueries();
      deleteCookie("profileimage");
      setCookie("profileimage", data.data.profileImage);
      window.alert("수정성공!!");
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
  const leafPatch = () => {
    dispatch(patchLeafDB(userId, LeafCount));
  };

  return (
    <>
      <div className={open ? "openModal modal" : "modal"}>
        {open ? (
          <section>
            <header>
              <h2>마이페이지 수정</h2>
              <p>Modify Mypage</p>
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
              <ModifyBox>
                <Wrap>
                  <p>닉네임</p>
                  <InputWrap>
                    <input
                      defaultValue={nickname}
                      onChange={(e) => {
                        setCHGnickname(e.target.value);
                      }}
                    />
                    <DupButton onClick={dupnick}>중복 확인</DupButton>
                  </InputWrap>
                </Wrap>
                <Wrap2>
                  <p>자기소개</p>
                  <IntroTextBox
                    defaultValue={introduction}
                    onChange={(e) => {
                      setCHGIntroduction(e.target.value);
                    }}
                  />
                </Wrap2>
                <Wrap>
                  <p>나뭇잎 수</p>
                  <InputWrap>
                    <LeafDrop
                      setLeafCount={setLeafCount}
                      LeafCount={LeafCount}
                    />
                    <DupButton onClick={leafPatch}>설정하기</DupButton>
                  </InputWrap>
                </Wrap>
              </ModifyBox>
            </div>
            <footer>
              <button onClick={close}>취소하기</button>
              {PreNickname === CHGnickname ? (
                <button onClick={onsubmit1}>수정</button>
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

const ModifyBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 16px;
  width: 400px;
  margin: 0 auto;
`;

const Wrap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const InputWrap = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: white;
  border-bottom: solid 1px #acacac;
  width: 272px;
  height: 50px;
`;

const DupButton = styled.button`
  width: 96px;
  height: 34px;
  color: black;
  border: 1px solid gray;
  margin: 8px 8px 8px 0px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  width: 80px;
`;

const Wrap2 = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  gap: 8px;
`;

const IntroTextBox = styled.textarea`
  width: 400px;
  height: 192px;
  resize: none;
  border: none;
  border-bottom: solid 1px #acacac;
  padding: 10px;
  :focus {
    outline: none;
  }
`;

export default MyProfileModal;
