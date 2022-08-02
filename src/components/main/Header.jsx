import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";
import { getCookie } from "../../shared/Cookie";
import styled from "styled-components";
import { deleteCookie } from "../../shared/Cookie";
import defaultUserImage from "../../public/images/default_profile.png";
import Swal from "sweetalert2";
/* 컴포넌트 */
import HeadPaperSearch from "./HeadPaperSearch";
import { BiSearchAlt2 } from "react-icons/bi";


const Header = () => {
  const navigate = useNavigate();
  const onLogout = () => {
    deleteCookie("token");
    deleteCookie("nickname");
    deleteCookie("userId");
    deleteCookie("blogId");
    deleteCookie("profileimage");
    setCookie(false);
    Swal.fire({
      icon: "success",
      text: `로그 아웃 하셨습니다!`,
      showConfirmButton: true,
      confirmButtonColor: "#3085d6",
    }).then(() => {
      navigate("/");
    });
    navigate("/");
  };

  /* 쿠키 */
  const cookie = getCookie("token");
  const blogId = getCookie("blogId");
  const nickname = getCookie("nickname");
  const profileImage = getCookie("profileimage");
  const [is_cookie, setCookie] = React.useState(false);

  React.useEffect(() => {
    if (cookie !== undefined) {
      return setCookie(true);
    }
  }, []);
  /* 유저정보 모달창 */

  //드롭다운 메뉴
  const [isOpen, setIsOpen] = React.useState(false);
  const toggling = () => setIsOpen(!isOpen);
  const el = useRef();

  const handleCloseToggling = (e) => {
    if (el.current && !el.current.contains(e.target)) {
      setIsOpen(false);
    }
  };
  React.useEffect(() => {
    window.addEventListener("click", handleCloseToggling);
    return () => {
      window.removeEventListener("click", handleCloseToggling);
    };
  }, []);

  const S3 = process.env.REACT_APP_S3_URL + `/${profileImage}`;

  return (
    <>
      <HeaderBox>
        <Svg>


          <img
            onClick={() => {
              navigate("/");
            }}
            className="paperTitle"
            src={process.env.PUBLIC_URL + "/logo_paper.png"}
            back_size="100% 100%"
            alt="icon"
          />


          <Login>
            {is_cookie ? (
              <>
                <BtnBox1>
                  <SearchIcon1
                    onClick={() => {
                      navigate(`/paper/search`);
                    }}
                  >
                    <BiSearchAlt2 color="black" size="25px" />
                  </SearchIcon1>

                  <BtnItem>
                    <Btn
                      onClick={() => {
                        navigate("/paper/allpapers");
                      }}
                    >
                      전체글
                    </Btn>
                  </BtnItem>
                </BtnBox1>
                <DropDownContainer ref={el}>
                  <ProfileImgBox
                    src={
                      profileImage === "null" || profileImage === "undefined"
                        ? defaultUserImage
                        : S3
                    }
                    onClick={toggling}
                  />
                  {isOpen && (
                    <DropDownListContainer>
                      <DropDownList>
                        <ListItem
                          onClick={() => {
                            navigate(`/paper/${blogId}`);
                          }}
                        >
                          내 블로그
                        </ListItem>
                        <ListItem
                          onClick={() => {
                            navigate(`/paper/${blogId}/reservationList`);
                          }}
                        >
                          예약리스트
                        </ListItem>
                        <ListItem
                          onClick={() => {
                            navigate(`/write`);
                          }}
                        >
                          글 작성하기
                        </ListItem>
                        <ListItem
                          onClick={() => {
                            navigate(`/myprofile`);
                          }}
                        >
                          회원정보
                        </ListItem>
                        <ListItem
                          onClick={() => {
                            onLogout();
                          }}
                        >
                          로그아웃
                        </ListItem>
                      </DropDownList>
                    </DropDownListContainer>
                  )}
                </DropDownContainer>
                <NickBox>{nickname}</NickBox>
              </>
            ) : (
              <>
                <BtnBox2>
                  <SearchIcon2
                    onClick={() => {
                      navigate(`/paper/search`);
                    }}
                  >
                    <BiSearchAlt2 color="black" size="25px" />
                  </SearchIcon2>
                  <BtnItem>
                    <Btn
                      onClick={() => {
                        navigate("/paper/allpapers");
                      }}
                    >
                      전체글
                    </Btn>
                  </BtnItem>
                  <BtnItem>
                    <Btn
                      onClick={() => {
                        navigate("/login");
                      }}
                    >
                      로그인
                    </Btn>
                  </BtnItem>
                </BtnBox2>
              </>
            )}
          </Login>
        </Svg>
      </HeaderBox>
    </>
  );
};

const HeaderBox = styled.div`
  background-color: #fffdf7;
  width: 100%;
  height: 143px;
  border-bottom: 1px solid #A7ACA1;
`;
const Svg = styled.div`
  display: flex;
  width: 100%;
  height: 143px;
  position: relative;
  align-items: center;
  justify-content: center;
  .paperTitle {
   
    width: 50%;
    height: auto;
    max-width:332px;
    display:block;
  
  }
`;

const Login = styled.div`
  position: absolute;
  right: 0px;
  bottom: 20px;
  width: 26%;
  margin-right: 2.2%;
  display: flex;
  align-items: center;
  justify-content: end;
`;
const ProfileImgBox = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50px;
  align-items: center;
  /* padding-bottom: 2px; */
`;
const SearchIcon1 = styled.div`
  display: flex;
  align-items: center;
  margin-right: 10%;
`
const SearchIcon2 = styled.div`
  display: flex;
  align-items: center;
`
const BtnBox1 = styled.div`
  width: 45%;
  display: flex;
  justify-content: end;
  margin-right: 5%;
`;
const BtnBox2 = styled.div`
  width: 78%;
  display: flex;
  justify-content: end;
  gap: 24px;
  padding-top: 3px;
`;
const BtnItem = styled.div`
  width: 70%;
`;

const Btn = styled.button`
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  border: 1px solid;
  outline: 1px solid;
  width: 100%;
  min-width: 60px;
  height: 40px;
  background-color: #fffdf7;
`;
const DropDownContainer = styled.div`
  width: 50px;
`;
const DropDownListContainer = styled.div`
  margin-top: 4px;
  margin-right: 20px;
`;
const DropDownList = styled.ul`
  position: absolute;
  z-index: 3;
  padding: 0;
  margin: 0;
  padding: 5px;
  background: #fffdf7;
  outline: 1px solid #333;
  border: 1px solid #333;
  box-sizing: border-box;
  color: #333;
  font-size: 1.3rem;
  font-weight: 400;

  &:first-child {
    padding-top: 0.8em;
  }
`;
const ListItem = styled.li`
  list-style: none;
  margin-bottom: 0.5em;
  cursor: pointer;
`;
const NickBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 82px;
  font-family: "Gmarket Sans";
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 14px;
  @media screen and (max-width: 1100px) {
    display: none;
  }
`;

export default Header;
