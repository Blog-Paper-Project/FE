import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "react-query";

import UseInput from "../hooks/UseInput";

/* 컴포넌트 */
import { emailCheck, nicknameCheck, blogIdCheck } from "../shared/SignUpCheck";
import SignUpModal from "../components/user/SignUpModal";
import { api } from "../shared/apis/Apis";
import Header from "../components/main/Header";
import Footer from "../components/main/Footer";

import styled from "styled-components";

const SignUp = () => {
  const queryClient = useQueryClient();

  const navigate = useNavigate();

  const blogRef = useRef();

  const [email, setEmail] = UseInput(null);
  const [nickname, setNickname] = UseInput(null);
  const [blogId, setBlogId] = UseInput(null);
  const [password, setPassword] = UseInput(null);
  const [confirmPassword, setConfirmPassword] = UseInput(null);
  const [emailAuth, setEmailAuth] = UseInput(null);

  const [emailCHK, setEmailCHK] = useState(false);
  const [nicknameCHK, setNicknameCHK] = useState(false);
  const [blogIdCHK, setBlogIdCHK] = useState(false);
  const [term, setTerm] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(true);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    if (isModalOpen === true) return setIsModalOpen(false);
  };

  const onChangeTerm = (e) => {
    setTerm(e.target.checked);
  };

  const getDupEmail = async () => {
    if (!emailCheck(email)) {
      return null;
    } else {
      const data = await api.post("/user/idcheck", {
        email,
      });
      return data;
    }
  };

  const { mutate: dupEmail } = useMutation(getDupEmail, {
    onSuccess: (data) => {
      queryClient.invalidateQueries();
      if (data === null) {
        window.alert("아이디 형식을 지켜주세요");
      } else {
        setEmailCHK(true);
        window.alert("사용가능한 아이디 입니다");
      }
    },
    onError: () => {
      setEmailCHK(false);
    },
  });

  const getDupNick = async () => {
    if (!nicknameCheck(nickname)) {
      return null;
    } else {
      const data = await api.post("/user/idcheck", {
        nickname,
      });
      return data;
    }
  };

  const { mutate: dupNick } = useMutation(getDupNick, {
    onSuccess: (data) => {
      queryClient.invalidateQueries();
      if (data === null) {
        window.alert("닉네임 형식을 지켜주세요");
      } else {
        setNicknameCHK(true);
        // window.alert("사용가능한 닉네임 입니다");
      }
    },
    onError: () => {
      setNicknameCHK(false);
    },
  });

  const getDupBlogId = async () => {
    if (!blogIdCheck(blogId)) {
      return null;
    } else {
      const data = await api.post("/user/blogid", {
        blogId,
      });
      return data;
    }
  };

  const { mutate: dupBlogId } = useMutation(getDupBlogId, {
    onSuccess: (data) => {
      queryClient.invalidateQueries();
      if (data === null) {
        window.alert("블로그주소 형식을 지켜주세요");
      } else {
        setBlogIdCHK(true);
        // window.alert("사용가능한 블로그주소 입니다");
      }
    },
    onError: () => {
      setBlogIdCHK(false);
    },
  });

  const Submit = async () => {
    if (
      email === "" ||
      nickname === "" ||
      blogId === "" ||
      password === "" ||
      confirmPassword === ""
    ) {
      window.alert("이메일, 닉네임, 블로그주소, 비밀번호를 모두 입력해주세요!");
      return;
    }
    //비밀번호 일치
    if (password !== confirmPassword) {
      window.alert("비밀번호가 일치하지 않습니다");
      return;
    }

    const data = await api.post(`/user/signup`, {
      email,
      nickname,
      blogId,
      password,
      confirmPassword,
    });
    return data;
  };

  const { mutate: onsubmit } = useMutation(Submit, {
    onSuccess: (data) => {
      queryClient.invalidateQueries();
      if (data.data.result == true) {
        window.alert("가입성공!!!");
        navigate("/login");
      } else {
        window.alert("아이디, 닉네임, 블로그주소 중복체크 후 가입해 주세요");
      }
    },
    onError: () => {
      window.alert("외않되");
      return;
    },
  });

  // ------------------------

  const postEmailCheck = async () => {
    if (!emailCheck(email)) {
      return null;
    } else {
      const data = await api.post("/user/emailauth", {
        email,
      });
      return data;
    }
  };

  const { mutate: sendEmail } = useMutation(postEmailCheck, {
    onSuccess: (data) => {
      queryClient.invalidateQueries();
      if (data === null) {
        window.alert("아이디를 입력해주세요");
      } else {
        console.log(data);
      }
    },
    onError: () => {
      console.log("error");
    },
  });

  const postEmailAuth = async () => {
    const data = await api.post("/user/emailauth", {
      emailAuth,
    });
    return data;
  };

  const { mutate: sendEmailAuth } = useMutation(postEmailAuth, {
    onSuccess: (data) => {
      queryClient.invalidateQueries();
      if (data === null) {
        window.alert("인증번호를 입력해주세요");
      } else {
        console.log(data);
      }
    },
    onError: () => {
      console.log("error");
    },
  });

  if (SignUp.isLoading) {
    return null;
  }

  return (
    <SignUpContainer>
      <Header />
      <SignUpBox>
        <Top>
          <h2>회원가입</h2>
          <p>Sign Up</p>
        </Top>

        {isModalOpen === true ? (
          <SignUpModal
            term={term}
            onChangeTerm={onChangeTerm}
            open={openModal}
            close={closeModal}
            header="이용약관"
          />
        ) : null}

        <button
          onClick={() => {
            setIsModalOpen(true);
          }}
        >
          약관보기
        </button>

        <InputBox>
          <EmailBox>
            <SignUpInput
              type="email"
              id="email"
              placeholder="이메일 : "
              value={email || ""}
              onChange={setEmail}
              onBlur={(e) => {
                if (e.currentTarget.value && e.currentTarget === e.target) {
                  dupEmail();
                }
              }}
            />

            {emailCHK ? (
              <SendButton onClick={sendEmail}>인증메일보내기</SendButton>
            ) : null}
          </EmailBox>
          {email === null ? null : emailCHK ? null : (
            <p style={{ color: "red" }}>
              이미 중복된 아이디거나, 사용불가능한 아이디입니다.
            </p>
          )}
          <EmailBox>
            <SignUpInput
              type="text"
              id="emailauth"
              placeholder="인증번호 : "
              value={emailAuth || ""}
              onChange={setEmailAuth}
            />

            <SendButton onClick={sendEmailAuth}>인증번호확인</SendButton>
          </EmailBox>
          <SignUpInput
            type="text"
            label="닉네임"
            placeholder="닉네임 :       영어/한글/숫자 3~15자"
            value={nickname || ""}
            onChange={setNickname}
            onBlur={(e) => {
              if (e.currentTarget.value && e.currentTarget === e.target) {
                dupNick();
              }
            }}
          />
          {nickname === null ? null : nicknameCHK ? null : (
            <p style={{ color: "red" }}>
              이미 중복된 닉네임이거나, 사용불가능한 닉네임입니다.
            </p>
          )}
          <SignUpInput
            type="text"
            label="블로그주소"
            placeholder="블로그주소 :       영어/숫자 3~15자"
            value={blogId || ""}
            ref={blogRef}
            onChange={setBlogId}
            onBlur={(e) => {
              if (e.currentTarget.value && e.currentTarget === e.target) {
                dupBlogId();
              }
            }}
          />
          {blogId === null ? null : blogIdCHK ? null : (
            <p style={{ color: "red" }}>
              이미 중복된 블로그주소이거나, 사용불가능한 블로그주소입니다.
            </p>
          )}
          <SignUpInput
            type="password"
            label="비밀번호"
            value={password || ""}
            placeholder="비밀번호 :   영어/숫자/특수문자 8자 이상 "
            onChange={setPassword}
          />
          <SignUpCheckInput
            type="password"
            label="비밀번호 확인"
            value={confirmPassword || ""}
            placeholder="비밀번호 확인 :"
            onChange={setConfirmPassword}
            password={password}
            confirmPassword={confirmPassword}
          />
        </InputBox>
        {term === false ? (
          <SignUpButton
            onClick={() => {
              window.alert("약관동의 후 가입해주세요");
            }}
          >
            회원가입
          </SignUpButton>
        ) : (
          <SignUpButton onClick={onsubmit}>회원가입</SignUpButton>
        )}
      </SignUpBox>
      <Footer />
    </SignUpContainer>
  );
};

const SignUpContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #e5e2db;
`;

const SignUpBox = styled.div`
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
  border-bottom: solid 1px black;
  margin: 130px auto 32px auto;
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

const SignUpInput = styled.input`
  width: 100%;
  height: 50px;
  margin: 8px 0 8px 0;
`;

const SignUpCheckInput = styled.input`
  width: 100%;
  height: 50px;
  margin: 8px 0 8px 0;
  border: ${(props) =>
    props.confirmPassword && props.password !== props.confirmPassword
      ? "1px solid red"
      : ""}!important;
`;

const SignUpButton = styled.button`
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
  margin-top: 41px;
`;

const EmailBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const SendButton = styled.div`
  height: 50px;
  background-color: black;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  margin: 8px 0 8px 0;
  width: 80px;
`;

export default SignUp;
