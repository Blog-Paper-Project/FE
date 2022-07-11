import React from "react";
import { Link, useNavigate } from "react-router-dom";

import { useMutation, useQueryClient } from "react-query";

import UseInput from "../hooks/UseInput";
import { api } from "../shared/apis/Apis";
import { setCookie } from "../shared/Cookie";
import styled from "styled-components";
import Header from "../components/main/Header";
import Footer from "../components/main/Footer";
import { ContactSupportOutlined } from "@material-ui/icons";

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

      setCookie("token", AccessToken, 10);
      setCookie("nickname", Accessnickname, 10);
      setCookie("userId", AccessUseId, 10);
      
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
        <p>로그인</p>
        <InputBox>
          <SignInInput
            type="email"
            label="이메일"
            placeholder="아이디"
            value={email || ""}
            onChange={setEmail}
          />
          <SignInInput
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
        <p>아이디 및 비밀번호 찾기</p>
        <button onClick={onsubmit}>로그인</button>
        <Link to="/signup">
          <button>회원가입</button>
        </Link>
      </LoginBox>
      <Footer />
    </LoginContainer>
  );
};

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  height: 100vh;
`;

const LoginBox = styled.div`
  width: 385px;
  height: 584px;
  background-color: gray;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const InputBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 10px;
`;

const SignInInput = styled.input`
  width: 95%;
  height: 50px;
`;

export default Login;
