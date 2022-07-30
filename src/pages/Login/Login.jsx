import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "react-query";
import Swal from "sweetalert2";

import UseInput from "../../hooks/UseInput";
import { api } from "../../shared/apis/Apis";
import { setCookie } from "../../shared/Cookie";
import styled from "styled-components";
import Header from "../../components/main/Header";
import Footer from "../../components/main/Footer";
import kakao from "../../public/images/kakao.svg";
import google from "../../public/images/google.svg";
import naver from "../../public/images/naver.svg";
import { KAKAO_AUTH_URL } from "../../shared/SocialOauth";
import { GOOGLE_AUTH_URL } from "../../shared/SocialOauth";
import { NAVER_AUTH_URL } from "../../shared/SocialOauth";

const Login = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const [email, setEmail] = UseInput(null);
  const [password, setPassword] = UseInput(null);

  const postLogin = async () => {
    const data = await api.post("/user/login", {
      email,
      password,
    });
    return data;
  };

  const { mutate: onsubmit } = useMutation(postLogin, {
    onSuccess: (data) => {
      queryClient.invalidateQueries();
      setCookie("token", data.data.token, 2);
      setCookie("nickname", data.data.nickname, 2);
      setCookie("userId", data.data.userId, 2);
      setCookie("blogId", data.data.blogId, 2);
      setCookie("profileimage", data.data.profileImage, 2);

      navigate("/");
    },
    onError: () => {
      Swal.fire({
        text: "아아디, 비밀번호를 확인해주세요.",
        icon: "warning",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "확인",
      });
      return;
    },
  });

  if (Login.isLoading) {
    return null;
  }

  return (
    <LoginContainer>
      <Header />
      <LoginBox>
        <Title>
          <h2>로그인</h2>
          <p>Login</p>
        </Title>
        <InputBox>
          <Input2
            type="email"
            label="이메일"
            placeholder="이메일"
            value={email || ""}
            onChange={setEmail}
          />
          <Input2
            type="password"
            label="비밀번호"
            value={password || ""}
            placeholder="비밀번호"
            onChange={setPassword}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                onsubmit();
              }
            }}
          />
        </InputBox>
        <div
          style={{
            marginTop: "16px",
            marginBottom: "34px",
            textAlign: "right",
            fontSize: "14px",
            fontWeight: "400",
            lineHeight: "14px",
          }}
        >
          <Link to="/findpassword">
            <p>아이디 및 비밀번호 찾기</p>
          </Link>
        </div>

        <LoginButton onClick={onsubmit}>로그인하기</LoginButton>
        <div
          style={{
            marginTop: "32px",
            marginBottom: "20px",
            textAlign: "center",
            fontSize: "14px",
            fontWeight: "500",
            lineHeight: "20px",
            color: "#ACACAC",
          }}
        >
          <p>SNS계정으로 로그인</p>
        </div>
        <SocialLogin>
          {/* <a href={GOOGLE_AUTH_URL}>
            <img src={google} alt="google" />
          </a> */}

          <a href={KAKAO_AUTH_URL}>
            <img src={kakao} alt="kakao" />
          </a>

          {/* <a href={NAVER_AUTH_URL}>
            <img src={naver} alt="naver" />
          </a> */}
        </SocialLogin>
        <div
          style={{
            marginTop: "58px",
            textAlign: "center",
            fontSize: "14px",
          }}
        >
          <Link to="/signup">
            <p>아직 회원이 아니신가요? 회원가입</p>
          </Link>
        </div>
      </LoginBox>
      <Footer />
    </LoginContainer>
  );
};

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #fffdf7;
`;

const LoginBox = styled.div`
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

const Input2 = styled.input`
  width: 100%;
  height: 50px;
  border-bottom: solid 1px #acacac;
`;

const LoginButton = styled.button`
  width: 100%;
  height: 50px;
  background-color: black;
  display: flex;
  justify-content: center;
  align-items: center;
  /* text-align: center; */
  color: #ffffff;
  font-size: 16px;
  font-weight: 400;
  line-height: 16px;
  margin-top: 41px;
  font-family: "Gmarket Sans Light";
`;

const SocialLogin = styled.div`
  display: flex;
  justify-content: center;
  gap: 24px;
`;

export default Login;
