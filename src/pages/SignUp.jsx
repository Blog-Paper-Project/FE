import axios from "axios";
import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";

import UseInput from "../hooks/UseInput";

import { useQuery } from "react-query";

const SignUp = () => {
  // const navigate = useNavigate();

  const [email, setEmail] = UseInput(null);
  const [nickname, setNickname] = UseInput(null);
  const [password, setPassword] = UseInput(null);
  const [confirmPassword, setConfirmPassword] = UseInput(null);

  const passwordCheck = useRef();

  if (password && confirmPassword && password === confirmPassword) {
    passwordCheck.current.innerText = "✔️";
  } else if (password !== confirmPassword) {
    passwordCheck.current.innerText = "❌";
  }

  const getemailCheck = () => {
    return axios.get(`http://15.164.50.132/user/idcheck/${email}`);
  };

  const dupCheck = useQuery("DUP_CHECK", getemailCheck, {
    onSuccess: (data) => {
      console.log("중복체크!", data);
    },
  });

  const Submit = async () => {
    if (
      email === "" ||
      nickname === "" ||
      password === "" ||
      confirmPassword === ""
    ) {
      window.alert("이메일, 닉네임, 비밀번호를 모두 입력해주세요!");
      return;
    }
    //비밀번호 일치
    if (password !== confirmPassword) {
      window.alert("비밀번호가 일치하지 않습니다");
      return;
    }

    // await axios
    //   .post("http://15.164.50.132/api/signup", {
    //     email,
    //     nickname,
    //     password,
    //     confirmPassword,
    //   })
    //   .then((res) => {
    //     console.log(res);
    //     window.alert("회원가입을 축하합니다!");
    //     navigate("/Login");
    //   })
    //   .catch((error) => {
    //     window.alert("아이디, 닉네임 또는 비밀번호를 확인해주세요.");
    //     console.log("회원가입 DB Error", error);
    //   });
  };

  return (
    <>
      <div>
        <div>
          <input
            type="email"
            label="이메일"
            placeholder="🔑  이메일 형식으로 작성"
            value={email || ""}
            onChange={setEmail}
          />
          <button onClick={getemailCheck}>중복확인</button>
        </div>
        <div>
          <input
            type="text"
            label="닉네임"
            placeholder="🙋   영어 or 한글만 가능"
            value={nickname || ""}
            onChange={setNickname}
          />
          <button>중복확인</button>
        </div>
        <div>
          <input
            type="password"
            label="비밀번호"
            value={password || ""}
            placeholder="🔒    최소8글자"
            onChange={setPassword}
          />
          <span ref={passwordCheck} />
        </div>
        <div>
          <input
            type="password"
            label="비밀번호 확인"
            value={confirmPassword || ""}
            placeholder="🔒    최소8글자"
            onChange={setConfirmPassword}
          />
        </div>
        <button onClick={Submit}>회원가입</button>
      </div>
    </>
  );
};

export default SignUp;
