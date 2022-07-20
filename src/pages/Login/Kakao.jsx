import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { apikakao } from "../../shared/apis/Apis";
import { setCookie } from "../../shared/Cookie";

const Kakao = () => {
  const navigate = useNavigate();
  let code = new URL(window.location.href).searchParams.get("code");

  useEffect(() => {
    if (code) {
      const kakaoLogin = () => {
        apikakao
          .get(`/user/login/kakao/callback?code=${code}`)
          .then((data) => {
            console.log(data.data);
            console.log(data.data.blogId);
            if ((data.data.blogId = "null")) {
              setCookie("token", data.data.token, 2);
              setCookie("nickname", data.data.nickname, 2);
              setCookie("userId", data.data.userId, 2);
              setCookie("profileimage", data.data.profileImage, 2);
              setCookie("email", data.data.email, 2);

              navigate("/socialsignup");
            } else if (data.data.blogId != "null") {
              setCookie("token", data.data.token, 2);
              setCookie("nickname", data.data.nickname, 2);
              setCookie("userId", data.data.userId, 2);
              setCookie("blogId", data.data.blogId, 2);
              setCookie("profileimage", data.data.profileImage, 2);

              navigate("/");
            }
          })
          .catch((data) => {
            window.alert(data.response.data.split("&quot;")[1]);
            console.log(data.response.data.split("&quot;")[1]);
            navigate(-1);
          });
      };
      kakaoLogin();
    }
  }, [code]);
  return <div>Kakao</div>;
};

export default Kakao;
