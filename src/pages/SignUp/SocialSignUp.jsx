import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "react-query";
import Swal from "sweetalert2";

import UseInput from "../../hooks/UseInput";
import { nicknameCheck, blogIdCheck } from "../../shared/SignUpCheck";
import { api } from "../../shared/apis/Apis";
import Header from "../../components/main/Header";
import Footer from "../../components/main/Footer";

import styled from "styled-components";
import { deleteCookie, getCookie, setCookie } from "../../shared/Cookie";

const SocialSignUp = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const email = getCookie("email");

  const [nickname, setNickname] = UseInput(null);
  const [blogId, setBlogId] = UseInput(null);

  const [nicknameCHK, setNicknameCHK] = useState(false);
  const [blogIdCHK, setBlogIdCHK] = useState(false);

  //닉네임 중복체크
  const postDupNick = async () => {
    if (!nicknameCheck(nickname)) {
      return null;
    } else {
      const data = await api.post("/user/idcheck", {
        nickname,
      });
      return data;
    }
  };

  const { mutate: dupNick } = useMutation(postDupNick, {
    onSuccess: (data) => {
      queryClient.invalidateQueries();
      if (data === null) {
        Swal.fire({
          text: "닉네임형식을 확인해 주세요.",
          icon: "warning",
          confirmButtonColor: "#3085d6",
          confirmButtonText: "확인",
        });
      } else {
        setNicknameCHK(true);
      }
    },
    onError: () => {
      setNicknameCHK(false);
    },
  });

  //블로그아이디 중복체크
  const postDupBlogId = async () => {
    if (!blogIdCheck(blogId)) {
      return null;
    } else {
      const data = await api.post("/user/blogid", {
        blogId,
      });
      return data;
    }
  };

  const { mutate: dupBlogId } = useMutation(postDupBlogId, {
    onSuccess: (data) => {
      queryClient.invalidateQueries();
      if (data === null) {
        Swal.fire({
          text: "블로그주소 형식을 확인해 주세요.",
          icon: "warning",
          confirmButtonColor: "#3085d6",
          confirmButtonText: "확인",
        });
      } else {
        setBlogIdCHK(true);
      }
    },
    onError: () => {
      setBlogIdCHK(false);
    },
  });

  //회원가입
  const patchSignUp = async () => {
    //공백일 시
    if (nickname === "" || blogId === "") {
      Swal.fire({
        text: "닉네임, 블로그아이디를 확인해주세요.",
        icon: "warning",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "확인",
      });
      return;
    }

    const data = await api.patch(`/user/social-signup`, {
      email,
      nickname,
      blogId,
    });
    return data;
  };

  const { mutate: onsubmit } = useMutation(patchSignUp, {
    onSuccess: (data) => {
      queryClient.invalidateQueries();
      if (data.data.result === true) {
        setCookie("nickname", nickname, 2);
        setCookie("blogId", blogId, 2);
        deleteCookie("email");

        navigate("/");
      } else {
        Swal.fire({
          text: "중복된 값이 있습니다.",
          icon: "error",
          confirmButtonColor: "#3085d6",
          confirmButtonText: "확인",
        });
      }
    },
    onError: () => {
      Swal.fire({
        text: "닉네임, 블로그아이디를 기입해주세요.",
        icon: "error",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "확인",
      });
      return;
    },
  });

  if (SocialSignUp.isLoading) {
    return null;
  }

  return (
    <SignUpContainer>
      <Header />
      <SignUpBox>
        <Title>
          <h2>회원가입</h2>
          <p>Sign Up</p>
        </Title>

        <InputBox>
          <OKEmail>{email}</OKEmail>
          <Input2
            type="text"
            label="닉네임"
            placeholder="닉네임 :               (영어/한글/숫자 3~15자)"
            value={nickname || ""}
            onChange={setNickname}
            nicknameCHK={nicknameCHK}
            onBlur={(e) => {
              if (e.currentTarget.value && e.currentTarget === e.target) {
                dupNick();
              }
            }}
          />
          {nickname === null ? null : nicknameCHK ? (
            <p style={{ color: "green" }}>사용가능한 닉네임입니다.</p>
          ) : (
            <p style={{ color: "red" }}>
              이미 중복된 닉네임이거나, 사용불가능한 닉네임입니다.
            </p>
          )}
          <Input2
            type="text"
            label="블로그주소"
            placeholder="블로그 이름 :     도메인으로 사용할 이름 (영어/숫자 3~15자)"
            value={blogId || ""}
            onChange={setBlogId}
            blogIdCHK={blogIdCHK}
            onBlur={(e) => {
              if (e.currentTarget.value && e.currentTarget === e.target) {
                dupBlogId();
              }
            }}
          />
          {blogId === null ? null : blogIdCHK ? (
            <p style={{ color: "green" }}>사용가능한 블로그주소입니다.</p>
          ) : (
            <p style={{ color: "red" }}>
              이미 중복된 블로그주소이거나, 사용불가능한 블로그주소입니다.
            </p>
          )}
        </InputBox>
        <SignUpButton onClick={onsubmit}>회원가입</SignUpButton>
      </SignUpBox>
      <Footer />
    </SignUpContainer>
  );
};

const SignUpContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #fffdf7;
`;

const SignUpBox = styled.div`
  width: 386px;
  margin: 160px auto;
`;

const Title = styled.div`
  display: flex;
  text-align: center;
  flex-direction: column;
  width: 100%;
  border-bottom: solid 1px #acacac;
  margin: 0 auto 32px auto;
  padding-bottom: 25px;
  > h2 {
    font-size: 30px;
    font-weight: 400;
    line-height: 45px;
  }
  > p {
    font-size: 20px;
    font-weight: 300;
    line-height: 30px;
  }
`;

const InputBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 16px;
`;

const OKEmail = styled.div`
  width: 100%;
  height: 50px;
  padding: 0 10px;
  background-color: #efefef;
  display: flex;
  align-items: center;
  text-align: center;
  font-size: 14px;
  border: 1px solid green;
`;

const Input2 = styled.input`
  width: 100%;
  height: 50px;
  border-bottom: solid 1px #acacac;
  border: ${(props) =>
    props.confirmPassword && props.password !== props.confirmPassword
      ? "1px solid red"
      : props.confirmPassword && props.password === props.confirmPassword
      ? "1px solid green"
      : null}!important;
  border: ${(props) => (props.nicknameCHK ? "1px solid green" : "")}!important;
  border: ${(props) => (props.blogIdCHK ? "1px solid green" : "")}!important;
  border: ${(props) =>
    props.confirmPassword && props.password === props.confirmPassword
      ? "1px solid green"
      : ""}!important;
`;

const SignUpButton = styled.button`
  width: 100%;
  height: 50px;
  background-color: black;
  display: flex;
  justify-content: center;
  text-align: center;
  color: white;
  font-size: 16px;
  font-weight: 400;
  line-height: 50px;
  letter-spacing: 0em;
  margin-top: 41px;
`;

export default SocialSignUp;
