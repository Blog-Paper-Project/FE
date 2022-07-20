import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { apikakao } from "../../shared/apis/Apis";
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
          .then((data) => {
            console.log(data);
            const AccessToken = data.token;
            const Accessnickname = data.nickname;
            const AccessUseId = data.userId;
            const AccessBlogId = data.blogId;

            setCookie("token", AccessToken);
            setCookie("nickname", Accessnickname);
            setCookie("userId", AccessUseId);
            setCookie("blogId", AccessBlogId);
            // navigate("/");
          })
          .catch((err) => {
            console.log("소셜로그인 에러", err);
          });
      };
      kakaoLogin();
    }
  }, [code]);
  return <div>Kakao</div>;
};

export default Kakao;
