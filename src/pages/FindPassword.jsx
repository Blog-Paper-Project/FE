import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "react-query";
import Swal from "sweetalert2";
import styled from "styled-components";

import UseInput from "../hooks/UseInput";

import { api } from "../shared/apis/Apis";
import Header from "../components/main/Header";
import Footer from "../components/main/Footer";

const FindPassword = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const [email, setEmail] = UseInput(null);
  const [emailAuth, setEmailAuth] = UseInput(null);

  const [password, setPassword] = UseInput(null);
  const [confirmPassword, setConfirmPassword] = UseInput(null);
  const [emailAuthCHK, setEmailAuthCHK] = useState(false);

  //이메일 유효성 확인
  const postEmailCheck = async () => {
    const data = await api.post("/user/emailauth", {
      email,
    });
    return data;
  };

  const { mutate: sendEmail } = useMutation(postEmailCheck, {
    onSuccess: () => {
      queryClient.invalidateQueries();
      Swal.fire({
        text: "인증번호가 전송되었습니다.",
        icon: "success",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "확인",
      });
    },
    onError: () => {
      console.log("error");
    },
  });

  //인증번호 확인
  const postEmailAuth = async () => {
    const data = await api.post("/user/check-emailauth", {
      email,
      emailAuth,
    });
    return data;
  };

  const { mutate: sendEmailAuth } = useMutation(postEmailAuth, {
    onSuccess: (data) => {
      queryClient.invalidateQueries();
      if (data === null) {
        Swal.fire({
          text: "인증번호를 확인해 주세요.",
          icon: "warning",
          confirmButtonColor: "#3085d6",
          confirmButtonText: "확인",
        });
      } else if (data.data.result === true) {
        Swal.fire({
          text: "인증이 완료되었습니다.",
          icon: "success",
          confirmButtonColor: "#3085d6",
          confirmButtonText: "확인",
        });
        setEmailAuthCHK(true);
      }
    },
    onError: () => {
      Swal.fire({
        text: "인증번호를 확인해 주세요.",
        icon: "warning",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "확인",
      });
    },
  });

  //회원가입
  const postSignUp = async () => {
    //공백일 시
    if (email === "" || password === "" || confirmPassword === "") {
      window.alert("비밀번호를 모두 입력해주세요!");
      return;
    }
    //비밀번호 일치
    if (password !== confirmPassword) {
      Swal.fire({
        text: "비밀번호가 일치하지 않습니다.",
        icon: "error",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "확인",
      });
      return;
    }

    const data = await api.patch(`/user/change-password`, {
      email,
      password,
      confirmPassword,
    });
    return data;
  };

  const { mutate: changePW } = useMutation(postSignUp, {
    onSuccess: (data) => {
      queryClient.invalidateQueries();
      Swal.fire({
        text: "비밀번호가 변경되었습니다.",
        icon: "success",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "확인",
      });
      navigate("/login");
    },
    onError: (err) => {
      console.log(err);
      return;
    },
  });

  if (FindPassword.isLoading) {
    return null;
  }
  return (
    <SignUpContainer>
      <Header />
      <SignUpBox>
        <Title>
          <h2>비밀번호 찾기</h2>
          <p>Find Password</p>
        </Title>
        <InputBox>
          {emailAuthCHK ? (
            <OKEmail>{email}</OKEmail>
          ) : (
            <InputWrap>
              <Input1
                type="email"
                id="email"
                placeholder="이메일 : "
                value={email || ""}
                onChange={setEmail}
              />
              <SendButton onClick={sendEmail}>인증메일보내기</SendButton>
            </InputWrap>
          )}
          {emailAuthCHK ? null : (
            <InputWrap>
              <Input1
                type="text"
                id="emailauth"
                placeholder="인증번호 : "
                value={emailAuth || ""}
                onChange={setEmailAuth}
              />
              <SendButton onClick={sendEmailAuth}>인증번호확인</SendButton>
            </InputWrap>
          )}
          <Input2
            type="password"
            label="비밀번호"
            value={password || ""}
            placeholder="비밀번호 :   영어/숫자/특수문자 8자 이상 "
            onChange={setPassword}
            password={password}
            confirmPassword={confirmPassword}
          />
          <Input2
            type="password"
            label="비밀번호 확인"
            value={confirmPassword || ""}
            placeholder="비밀번호 확인 :"
            onChange={setConfirmPassword}
            password={password}
            confirmPassword={confirmPassword}
          />
          {confirmPassword === null ? null : password === confirmPassword ? (
            <p style={{ color: "green" }}>비밀번호가 일치합니다.</p>
          ) : (
            <p style={{ color: "red" }}>비밀번호가 일치하지 않습니다.</p>
          )}
        </InputBox>
        <SignUpButton onClick={changePW}>비밀번호 변경</SignUpButton>
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

const InputWrap = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  background-color: white;
  border-bottom: solid 1px #acacac;
`;

const Input1 = styled.input`
  width: 100%;
  height: 50px;
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

const SendButton = styled.button`
  width: 96px;
  height: 34px;
  background-color: #fffdf7;
  color: black;
  border: 1px solid gray;
  margin: 8px 8px 8px 0px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  width: 80px;
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

export default FindPassword;
