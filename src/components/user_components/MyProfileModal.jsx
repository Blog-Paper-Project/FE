import React, { useState } from "react";
import "./modal.css";

import { useMutation, useQueryClient } from "react-query";

import api from "../../shared/apis/Apis";

const MyProfileModal = (props) => {
  const queryClient = useQueryClient();

  const { open, close, header, profileImage, introduction, nickname, email } =
    props;

  // const [CHGprofileImg, setCHGprofileImg] = useState();
  const [CHGintroduction, setCHGIntroduction] = useState();
  const [CHGnickname, setCHGnickname] = useState();
  // const [CHGemail, setCHGemail] = useState();
  // const [imgBase64, setImgBase64] = useState("");

  // const handleChangeFile = (event) => {
  //   let reader = new FileReader();
  //   reader.onloadend = () => {
  //     const base64 = reader.result;
  //     if (base64) {
  //       setImgBase64(base64.toString());
  //     }
  //   };

  //   if (event.target.files[0]) {
  //     reader.readAsDataURL(event.target.files[0]); // 1. 파일을 읽어 버퍼에 저장합니다.
  //     setCHGprofileImg(event.target.files[0]);
  //   }
  // };

  const useProfile = async () => {
    const formData = new FormData();

    formData.append("introduction", CHGintroduction);
    formData.append("nickname", CHGnickname);

    const data = await api.patch(
      "/user/myprofile",
      { headers: { "content-type": "multipart/form-data" } },
      {
        formData,
      }
    );

    return data;
  };

  const { mutate: onsubmit } = useMutation(useProfile, {
    onSuccess: () => {
      queryClient.invalidateQueries();
    },
    onError: () => {
      window.alert("엥?더 찾아봐!!");
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
              {/* <input type="file" onchange={handleChangeFile} /> */}
              <img
                src={
                  profileImage
                    ? profileImage
                    : "https://www.snsboom.co.kr/common/img/default_profile.png"
                }
                alt="profile"
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
            </div>

            {/* <div>
              이메일
              <input
                defaultValue={email}
                onchange={(e) => {
                  setCHGemail(e.target.value);
                }}
              />
            </div> */}

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
