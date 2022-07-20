import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";
import { getCookie } from "../../shared/Cookie";
import styled from "styled-components";
import { useQuery } from "react-query";
import { deleteCookie } from "../../shared/Cookie";
import defaultUserImage from "../../public/images/default_profile.png";

/* api */
import { apiToken } from "../../shared/apis/Apis";
/* 컴포넌트 */
// import HeaderProfile from "./HeaderProfile";
import HeadPaperSearch from "./HeadPaperSearch";

const Header = () => {
  const onLogout = () => {
    deleteCookie("token");
    deleteCookie("nickname");
    deleteCookie("userId");
    deleteCookie("blogId");
    navigate("/");
  };
  const [modalOpen, setModalOpen] = React.useState(false);
  const navigate = useNavigate();
  /* 쿠키 */
  const cookie = getCookie("token");
  const nickname = getCookie("nickname");
  const blogId = getCookie("blogId");
  const profileImage = getCookie("profileimage");
  const [is_cookie, setCookie] = React.useState(false);
  console.log(profileImage);
  React.useEffect(() => {
    if (cookie !== undefined) {
      return setCookie(true);
    }
  }, []);
  /* 유저정보 모달창 */
  const openModal = () => {
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };
  //드롭다운 메뉴
  const [isOpen, setIsOpen] = React.useState(false);
  const toggling = () => setIsOpen(!isOpen);
  /* 유저정보 모달창 */
  /* 개인페이지 이동 */
  // const useGetMyPaper = async () => {
  //   const userData = await apiToken.get("/user/myprofile");
  //   // console.log(userData);
  //   return userData.data.myprofile;
  // };
  // const { data: userpaper_query, status } = useQuery(
  //   "userpaper_query",
  //   useGetMyPaper,
  //   {
  //     onSuccess: (data) => {
  //       // console.log(data);
  //     },
  //     // onError: (e) => {
  //     //   alert(e.message);
  //     // },
  //     staleTime: 50000,
  //   }
  // );
  // const nickname = userpaper_query?.nickname;
  // const profileImage = userpaper_query?.profileImage;
  const S3 = process.env.REACT_APP_S3_URL + `/${profileImage}`;
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
                <DropDownContainer>
                  <DropDownHeader>
                    <ProfileImgBox
                      src={profileImage === "null" ? defaultUserImage : S3}
                      onClick={toggling}
                      // onClick={openModal}
                    />
                  </DropDownHeader>
                  {isOpen && (
                    <DropDownListContainer>
                      <DropDownList>
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

                {/* <HeaderProfile
                  open={modalOpen}
                  close={closeModal}
                  header="프로필"
                  nickname={nickname}
                  login={setCookie}
                  profileImage={profileImage}
                /> */}
                <button
                  onClick={() => {
                    navigate(`/paper/${blogId}`);
                  }}
                >
                  내 블로그로 가기
                </button>
                <button
                  onClick={() => {
                    navigate(`/paper/${blogId}/reservationList`);
                  }}
                >
                  예약리스트
                </button>
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
  width: 10.5em;
  margin: 0 auto;
`;
const DropDownHeader = styled.div`
  margin-bottom: 0.8em;
  padding: 0.4em 2em 0.4em 1em;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.15);
  font-weight: 500;
  font-size: 1.3rem;
  color: #3faffa;
  background: #ffffff;
`;
const DropDownListContainer = styled.div``;
const DropDownList = styled.ul`
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
const ListItem = styled.li`
  list-style: none;
  margin-bottom: 0.8em;
`;

export default Header;
