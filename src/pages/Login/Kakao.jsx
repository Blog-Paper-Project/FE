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
            const AccessToken = data.data.token;
            const Accessnickname = data.data.nickname;
            const AccessUseId = data.data.userId;
            const AccessBlogId = data.data.blogId;
            const AccessProfileImage = data.data.profileImage;

            setCookie("token", AccessToken, 2);
            setCookie("nickname", Accessnickname, 2);
            setCookie("userId", AccessUseId, 2);
            setCookie("blogId", AccessBlogId, 2);
            setCookie("profileimage", AccessProfileImage, 2);
            navigate("/");
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
