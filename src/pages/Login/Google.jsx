import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../shared/apis/Apis";
import { setCookie } from "../../shared/Cookie";
import Swal from "sweetalert2";

const Google = () => {
  const navigate = useNavigate();
  let code = new URL(window.location.href).searchParams.get("code");
  console.log(code);

  useEffect(() => {
    if (code) {
      const GoogleLogin = () => {
        api
          .get(`/user/login/google/callback?code=${code}`)
          .then((data) => {
            console.log(data.data.blogId);
            if (data.data.blogId === null || data.data.blogId === undefined) {
              setCookie("token", data.data.token, 2);
              setCookie("nickname", data.data.nickname, 2);
              setCookie("userId", data.data.userId, 2);
              setCookie("profileimage", data.data.profileImage, 2);
              setCookie("email", data.data.email, 2);

              navigate("/socialsignup");
            } else if (
              data.data.blogId !== null &&
              data.data.blogId !== undefined
            ) {
              setCookie("token", data.data.token, 2);
              setCookie("nickname", data.data.nickname, 2);
              setCookie("userId", data.data.userId, 2);
              setCookie("blogId", data.data.blogId, 2);
              setCookie("profileimage", data.data.profileImage, 2);

              navigate("/");
            }
          })
          .catch((data) => {
            Swal.fire({
              text: data.response.data.split("&quot;")[1],
              icon: "warning",
              confirmButtonColor: "#3085d6",
              confirmButtonText: "확인",
            });
            navigate("/login");
          });
      };
      GoogleLogin();
    }
  }, [code]);
  return <div>Google</div>;
};

export default Google;
