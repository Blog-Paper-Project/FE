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

const Header = () => {
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
  const navigate = useNavigate();
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
          <Logo>
            <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
              <img
                className="paperTitle"
                src={process.env.PUBLIC_URL + "/Frame.png"}
                back_size="100% 100%"
                alt="icon"
              />
            </Link>
          </Logo>
          <Search>
            <HeadPaperSearch />
          </Search>
          <Login>
            {is_cookie ? (
              <>
                <BtnBox>
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
                        navigate("/write");
                      }}
                    >
                      작성하기
                    </Btn>
                  </BtnItem>
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
                              navigate(`/myprofile`);
                            }}
                          >
                            회원정보
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
                              onLogout();
                            }}
                          >
                            로그아웃
                          </ListItem>
                        </DropDownList>
                      </DropDownListContainer>
                    )}
                  </DropDownContainer>
                </BtnBox>
                {/* <NickBox>{nickname}</NickBox> */}
              </>
            ) : (
              <>
                <BtnBox>
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
                </BtnBox>
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
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 90px;
`;
const Svg = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: auto;
`;
const Logo = styled.div`
  padding-left: 2%;
  width: 27%;
  height: 90px;
  padding-left: 2%;
  display: flex;
  align-items: center;
  background-color: #fffdf7;
`;
const Search = styled.div`
  display: flex;
  align-items: center !important;
  justify-content: center;
  background-color: #fffdf7;
  width: 46%;
  height: 90px;
`;
const Login = styled.div`
  width: 27%;
  height: 85px;
  display: flex;
  align-items: center;
  justify-content: end;
  padding-right: 48px;
`;
const ProfileImgBox = styled.img`
  width: 50px;
  height: 50px;
  margin: 0 0 0 0;
  border-radius: 50%;
  align-items: center;
  /* padding-bottom: 2px; */
`;
const BtnBox = styled.div`
  width: 85%;
  display: flex;
  gap: 24px;
  padding-top: 3px;
`;
const BtnItem = styled.div`
  width: 80%;
  padding-top: 7px;
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
