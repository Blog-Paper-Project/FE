import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "react-query";

import UseInput from "../../hooks/UseInput";
import { nicknameCheck, blogIdCheck } from "../../shared/SignUpCheck";
import { api } from "../../shared/apis/Apis";
import Header from "../../components/main/Header";
import Footer from "../../components/main/Footer";

import styled from "styled-components";
import { deleteCookie, getCookie } from "../../shared/Cookie";

const SignUp = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const email = getCookie("email");

  const [nickname, setNickname] = UseInput(null);
  const [blogId, setBlogId] = UseInput(null);

  const [nicknameCHK, setNicknameCHK] = useState(false);
  const [blogIdCHK, setBlogIdCHK] = useState(false);

  //닉네임 중복체크
  const getDupNick = async () => {
    if (!nicknameCheck(nickname)) {
      return null;
    } else {
      const data = await api.post("/user/idcheck", {
        nickname,
      });
      return data;
    }
  };

  const { mutate: dupNick } = useMutation(getDupNick, {
    onSuccess: (data) => {
      queryClient.invalidateQueries();
      if (data === null) {
        window.alert("닉네임 형식을 지켜주세요");
      } else {
        setNicknameCHK(true);
      }
    },
    onError: () => {
      setNicknameCHK(false);
    },
  });

  //블로그아이디 중복체크
  const getDupBlogId = async () => {
    if (!blogIdCheck(blogId)) {
      return null;
    } else {
      const data = await api.post("/user/blogid", {
        blogId,
      });
      return data;
    }
  };

  const { mutate: dupBlogId } = useMutation(getDupBlogId, {
    onSuccess: (data) => {
      queryClient.invalidateQueries();
      if (data === null) {
        window.alert("블로그주소 형식을 지켜주세요");
      } else {
        setBlogIdCHK(true);
      }
    },
    onError: () => {
      setBlogIdCHK(false);
    },
  });

  //회원가입
  const Submit = async () => {
    //공백일 시
    if (nickname === "" || blogId === "") {
      window.alert("닉네임, 블로그주소를 모두 입력해주세요!");
      return;
    }

    const data = await api.patch(`/user/social-signup`, {
      email,
      nickname,
      blogId,
    });
    return data;
  };

  const { mutate: onsubmit } = useMutation(Submit, {
    onSuccess: (data) => {
      queryClient.invalidateQueries();
      if (data.data.result === true) {
        deleteCookie("email");
        window.alert("가입성공!!!");
        navigate("/");
      } else {
        window.alert("???????");
      }
    },
    onError: () => {
      window.alert("외않되");
      return;
    },
  });

  if (SignUp.isLoading) {
    return null;
  }

  return (
    <SignUpContainer>
      <Header />
      <SignUpBox>
        <Top>
          <h2>회원가입</h2>
          <p>Sign Up</p>
        </Top>

        <InputBox>
          <OKEmail>{email}</OKEmail>
          <SignUpInput
            type="text"
            label="닉네임"
            placeholder="닉네임 :       영어/한글/숫자 3~15자"
            value={nickname || ""}
            onChange={setNickname}
            onBlur={(e) => {
              if (e.currentTarget.value && e.currentTarget === e.target) {
                dupNick();
              }
            }}
          />
          {nickname === null ? null : nicknameCHK ? null : (
            <p style={{ color: "red" }}>
              이미 중복된 닉네임이거나, 사용불가능한 닉네임입니다.
            </p>
          )}
          <SignUpInput
            type="text"
            label="블로그주소"
            placeholder="블로그주소 :       영어/숫자 3~15자"
            value={blogId || ""}
            onChange={setBlogId}
            onBlur={(e) => {
              if (e.currentTarget.value && e.currentTarget === e.target) {
                dupBlogId();
              }
            }}
          />
          {blogId === null ? null : blogIdCHK ? null : (
            <p style={{ color: "red" }}>
              이미 중복된 블로그주소이거나, 사용불가능한 블로그주소입니다.
            </p>
          )}
          <SignUpButton onClick={onsubmit}>회원가입</SignUpButton>
        </InputBox>
      </SignUpBox>
      <Footer />
    </SignUpContainer>
  );
};

const SignUpContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #e5e2db;
`;

const SignUpBox = styled.div`
  width: 386px;
`;

const Top = styled.div`
  display: flex;
  text-align: center;
  flex-direction: column;
  width: 100%;
  border-bottom: solid 1px black;
  margin: 100px auto 32px auto;
  padding-bottom: 25px;
  > h2 {
    font-size: 30px;
  }
  > p {
    font-size: 20px;
  }
`;

const InputBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 16px;
  margin-top: 8px;
`;

const SignUpInput = styled.input`
  width: 100%;
  height: 50px;
`;

const SignUpButton = styled.button`
  width: 100%;
  height: 50px;
  background-color: black;
  display: flex;
  justify-content: center;
  text-align: center;
  color: white;
  font-family: Gmarket Sans;
  font-size: 16px;
  font-weight: 400;
  line-height: 50px;
  letter-spacing: 0em;
  margin-top: 41px;
`;

const OKEmail = styled.div`
  width: calc(100% - 20px);
  height: 50px;
  padding: 0 10px;
  background-color: gray;
  display: flex;
  align-items: center;
  text-align: center;
  font-size: 14px;
`;

export default SignUp;
