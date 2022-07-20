import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "react-query";

import UseInput from "../../hooks/UseInput";
import { api } from "../../shared/apis/Apis";
import { setCookie } from "../../shared/Cookie";
import styled from "styled-components";
import Header from "../../components/main/Header";
import Footer from "../../components/main/Footer";
import kakao from "../../public/images/kakao.svg";
import google from "../../public/images/google.svg";
import { KAKAO_AUTH_URL } from "../../shared/SocialOauth";

const Login = () => {
  const queryClient = useQueryClient(); // app에 있는데 각 페이지마다 필요한가? 26번이 있을 땐 필요한 건가?
  const navigate = useNavigate();

  const [email, setEmail] = UseInput(null);
  const [password, setPassword] = UseInput(null);

  const onLogin = async () => {
    const data = await api.post("/user/login", {
      email,
      password,
    });
    return data;
  };

  const { mutate: onsubmit } = useMutation(onLogin, {
    onSuccess: (data) => {
      queryClient.invalidateQueries();
      const AccessToken = data.data.token;
      const Accessnickname = data.data.nickname;
      const AccessUseId = data.data.userId;
      const AccessBlogId = data.data.blogId;

      setCookie("token", AccessToken, 2);
      setCookie("nickname", Accessnickname, 2);
      setCookie("userId", AccessUseId, 2);
      setCookie("blogId", AccessBlogId, 2);
      window.alert("로그인성공!!!!");
      navigate("/");
    },
    onError: () => {
      window.alert("엥?아이디, 비번 확인해라잉!");
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
        <Top>
          <h2>로그인</h2>
          <p>Login</p>
        </Top>
        <InputBox>
          <LoginInput
            type="email"
            label="이메일"
            placeholder="아이디"
            value={email || ""}
            onChange={setEmail}
          />
          <LoginInput
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
          }}
        >
          <Link to="/">
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
          }}
        >
          <p>SNS계정으로 로그인</p>
        </div>
        <SocialLogin>
          <a href={KAKAO_AUTH_URL}>
            <img src={kakao} alt="kakao" />
          </a>
          <img src={kakao} alt="kakao" />
          <img src={google} alt="kakao" />
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
  background-color: #e5e2db;
`;

const LoginBox = styled.div`
  width: 386px;
  height: 708px;
  /* background-color: gray; */
  flex-direction: column;
  justify-content: center;
`;

const Top = styled.div`
  display: flex;
  text-align: center;
  flex-direction: column;
  width: 386px;
  border-bottom: solid 1px gray;
  margin: 160px auto 32px auto;
  padding-bottom: 25px;
  > h2 {
    font-size: 30px;
  }
  > p {
    font-size: 20px;
  }
`;

const InputBox = styled.div`
  flex-direction: column;
  justify-content: center;
`;

const LoginInput = styled.input`
  width: 100%;
  height: 50px;
  margin: 8px 0 8px 0;
`;

const LoginButton = styled.button`
  width: 100%;
  height: 50px;
  background-color: black;
  display: flex;
  justify-content: center;
  color: white;
  border: 1px solid #e5e2db;
  font-family: Gmarket Sans;
  font-size: 16px;
  font-weight: 400;
  line-height: 50px;
  letter-spacing: 0em;
  text-align: center;
`;

const SocialLogin = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 24px;
`;

export default Login;
