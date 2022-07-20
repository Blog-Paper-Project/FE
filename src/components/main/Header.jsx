import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";
import { getCookie } from "../../shared/Cookie";
import styled from "styled-components";
import { deleteCookie } from "../../shared/Cookie";
import Swal from "sweetalert2";

/* 컴포넌트 */
import HeadPaperSearch from "./HeadPaperSearch";

const Header = () => {
  const onLogout = () => {
    deleteCookie("token");
    deleteCookie("nickname");
    deleteCookie("userId");
    deleteCookie("blogId");
    deleteCookie("profileimage")
    setCookie(false)
    Swal.fire({
      icon: "success",
      text: `로그 아웃 하셨습니다!`,
      showConfirmButton: true,
      confirmButtonColor: "#3085d6",
    });
    navigate("/")
  };
  const navigate = useNavigate();
  /* 쿠키 */
  const cookie = getCookie("token");
  const blogId = getCookie("blogId");
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

  const profileButton = process.env.REACT_APP_S3_URL + `/${profileImage}`;

  return (
    <>
      <HeaderBox>
        <Svg>
          <Logo>
            <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
              Paper
            </Link>
          </Logo>
          <Search>
            <HeadPaperSearch />
          </Search>
          <Login>
            {is_cookie ? (
              <>
                <DropDownContainer >
                  <DropDownHeader>
                    <ProfileImgBox
                      src={
                        profileImage === null
                          ? "https://www.snsboom.co.kr/common/img/default_profile.png"
                          : profileButton
                      }
                      onClick={toggling}
                    />
                  </DropDownHeader>
                  {isOpen && (
                    <DropDownListContainer>
                      <DropDownList>
                      <ListItem
                          onClick={() => {
                            navigate(`/paper/${blogId}`);
                          }}
                        >
                          내블로그
                        </ListItem>
                        <ListItem
                          onClick={() => {
                            navigate(`/myprofile/`);
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
                <Link to="/write">
                  <div>글작성</div>
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  style={{ color: "inherit", textDecoration: "none" }}
                >
                  <button>로그인</button>
                </Link>
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
  height: 60px;
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
  height: 60px;
  padding-left: 2%;
  display: flex;
  align-items: center;
  outline: 1px solid black;
`;
const Search = styled.div`
  display: flex;
  align-items: center !important;
  width: 46%;
  height: 60px;
  outline: 1px solid black;
`;
const Login = styled.div`
  width: 27%;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  outline: 1px solid black;
`;
const ProfileImgBox = styled.img`
  width: 40px;
  height: 40px;
  margin: 0 0 0 0;
  border-radius: 50px;
  outline: 1px solid black;
  align-items: center;
  cursor: pointer;
`;
const DropDownContainer = styled.div`
  width: 30%;  
`;
const DropDownHeader = styled.div`
  padding: 0.4em 2em 0.4em 1em;
  font-weight: 500;
  font-size: 1.3rem;
  color: #3faffa;
  background: #ffffff;
`;
const DropDownListContainer = styled.div`

`;
const DropDownList = styled.ul`
position: absolute;
  padding: 0;
  margin: 0;
  padding-left: 1em;
  background: #ffffff;
  border: 2px solid #e5e5e5;
  box-sizing: border-box;
  color: #3faffa;
  font-size: 1.3rem;
  font-weight: 500;
  &:first-child {
    padding-top: 0.8em;
  }
`;
const ListItem = styled.button`
list-style: none;
  margin-bottom: 0.8em;
`;

export default Header;
