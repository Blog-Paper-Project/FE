import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { api, apikakao } from "../../shared/apis/Apis";
import { setCookie } from "../../shared/Cookie";

const Kakao = () => {
  const navigate = useNavigate();
  let code = new URL(window.location.href).searchParams.get("code");
  console.log(code);

  useEffect(() => {
    if (code) {
      const kakaoLogin = () => {
        apikakao
          .get(`/user/login/kakao/callback?code=${code}`)
          .then((res) => {
            console.log(res);
          })
          .catch((err) => {
            console.log("소셜로그인 에러", err);
            alert("로그인 실패 !");
          });
      };
      kakaoLogin();
    }
  }, [code]);
  return <div>Kakao</div>;
};

export default Kakao;
