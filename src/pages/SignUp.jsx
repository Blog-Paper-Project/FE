import axios from "axios";
import React, { useRef, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";

import UseInput from "../hooks/UseInput";

import { useMutation } from "react-query";

import { emailCheck } from "../shared/SignUpCheck";
import { nicknameCheck } from "../shared/SignUpCheck";

import SignUpModal from "../components/user_components/SignUpModal";

const SignUp = () => {

  console.log(process.env.REACT_APP_API_URL)
  const navigate = useNavigate();

  const [email, setEmail] = UseInput(null);
  const [nickname, setNickname] = UseInput(null);
  const [password, setPassword] = UseInput(null);
  const [confirmPassword, setConfirmPassword] = UseInput(null);

  const [term, setTerm] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const passwordChecked = useRef();

  if (password && confirmPassword && password === confirmPassword) {
    passwordChecked.current.innerText = "✔️";
  } else if (password !== confirmPassword) {
    passwordChecked.current.innerText = "❌";
  }

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    if (isModalOpen === true) return setIsModalOpen(false);
  };

  const onChangeTerm = useCallback((e) => {
    setTerm(e.target.checked);
  });

  const getEmailCheck = async () => {
    if (!emailCheck(email)) {
      return null;
    } else {
      const data = await axios.post(`${process.env.REACT_APP_API_URL}/user/idcheck/${email}`);
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
    onError: () => {
      window.alert("이미 사용중인 아이디입니다.");
    },
  });

  const getNickCheck = async () => {
    if (!nicknameCheck(nickname)) {
      return null;
    } else {
      const data = await axios.post(`${process.env.REACT_APP_API_URL}/user/idcheck/${nickname}`);
      return data;
    }
  };

  const { mutate: dupnick } = useMutation(getNickCheck, {
    onSuccess: (data) => {
      if (data === null) {
        window.alert("닉네임 형식을 지켜주세요");
      } else {
        window.alert("사용가능한 닉네임 입니다");
      }
    },
    onError: () => {
      window.alert("이미 사용중인 닉네임입니다");
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

    const data = axios.post(`${process.env.REACT_APP_API_URL}/user/signup`, {
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
        window.alert("아이디, 닉네임 중복체크 후 가입해 주세요");
      }
    },
    onError: () => {
      window.alert("외않되");
      return;
    },
  });

  return (
    <>
      <div>
        <button
          onClick={() => {
            setIsModalOpen(true);
          }}
        >
          약관보기
        </button>

        {isModalOpen === true ? (
          <SignUpModal open={openModal} close={closeModal} header="이용약관" />
        ) : null}

        <div>
          약관동의
          <input type="checkbox" value={term} onChange={onChangeTerm} />
        </div>
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
            placeholder="🙋   영어 or 한글만 가능(4~8자)"
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
            placeholder="🔒    영어, 숫자, 특수문자(최소 4자)"
            onChange={setPassword}
          />
          <span ref={passwordChecked} />
        </div>
        <div>
          <input
            type="password"
            label="비밀번호 확인"
            value={confirmPassword || ""}
            placeholder="🔒    영어, 숫자, 특수문자(최소 4자)"
            onChange={setConfirmPassword}
          />
        </div>
        {term === false ? (
          <button
            onClick={() => {
              window.alert("약관동의 후 가입해주세요");
            }}
          >
            회원가입
          </button>
        ) : (
          <button onClick={onsubmit}>회원가입</button>
        )}
      </div>
    </>
  );
};

export default SignUp;
