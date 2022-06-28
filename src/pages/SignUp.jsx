import axios from "axios";
import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import UseInput from "../hooks/UseInput";

import { useMutation } from "react-query";

import { emailCheck } from "../shared/SignUpCheck";
import { nicknameCheck } from "../shared/SignUpCheck";

const SignUp = () => {
  const navigate = useNavigate();

  const [email, setEmail] = UseInput(null);
  const [nickname, setNickname] = UseInput(null);
  const [password, setPassword] = UseInput(null);
  const [confirmPassword, setConfirmPassword] = UseInput(null);

  const [EmailCheck, setEmailCheck] = useState(false);
  const [NickNameCheck, setNickNameCheck] = useState(false);

  const passwordCheck = useRef();

  if (password && confirmPassword && password === confirmPassword) {
    passwordCheck.current.innerText = "✔️";
  } else if (password !== confirmPassword) {
    passwordCheck.current.innerText = "❌";
  }

  const getEmailCheck = async () => {
    if (!emailCheck(email)) {
      return null;
    } else {
      const data = await axios.post(
        `http://15.164.50.132/user/idcheck/${email}`
      );
      return data;
    }
  };

  const { mutate: dupEmail } = useMutation(getEmailCheck, {
    onSuccess: (data) => {
      if (data === null) {
        window.alert("아이디 형식을 지켜주세요");
      } else {
        window.alert("사용가능한 아이디 입니다");
      }
    },
    onError: (data) => {
      console.log(data);
      window.alert("이미 사용중인 아이디입니다.");
    },
  });

  const getNickCheck = async () => {
    if (!nicknameCheck(email)) {
      window.alert("올바른 닉네임 형식을 작성해주세요");
      return;
    }

    const data = await axios.post(
      `http://15.164.50.132/user/idcheck/${nickname}`
    );
    return data;
  };

  const { mutate: dupnick } = useMutation(getNickCheck, {
    onSuccess: (data) => {
      console.log(data);
      setNickNameCheck(true);
      console.log(EmailCheck);
      window.alert("사용가능!");
    },
    onError: (data) => {
      console.log(data);
      window.alert("사용불가능!");
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

    const data = axios.post("http://15.164.50.132/user/signup", {
      email,
      nickname,
      password,
      confirmPassword,
    });
    return data;
  };

  const { mutate: onsubmit } = useMutation(Submit, {
    onSuccess: (data) => {
      if (data.data.result == true) {
        window.alert("가입성공!!!");
        navigate("/");
      } else {
        window.alert("중복!!!");
      }
    },
    onError: (data) => {
      console.log(data);
      window.alert("ㅠㅠ실패!!");
    },
  });

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
          <button onClick={dupEmail}>중복확인</button>
        </div>
        <div>
          <input
            type="text"
            label="닉네임"
            placeholder="🙋   영어 or 한글만 가능"
            value={nickname || ""}
            onChange={setNickname}
          />
          <button onClick={dupnick}>중복확인</button>
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
        {EmailCheck === true && NickNameCheck === true ? (
          <button onClick={onsubmit}>회원가입</button>
        ) : (
          <button
            onClick={() => {
              window.alert("중복체크후 사용해주세요!!");
            }}
          >
            회원가입
          </button>
        )}
      </div>
    </>
  );
};

export default SignUp;
