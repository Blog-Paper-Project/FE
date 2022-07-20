import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";
import { getCookie } from "../../shared/Cookie";
import styled from "styled-components";
import { useQuery } from "react-query";
import { useDispatch } from "react-redux";
/* api */
import { apiToken } from "../../shared/apis/Apis";
/* 컴포넌트 */
import HeaderProfile from "./HeaderProfile";
import HeadPaperSearch from "./HeadPaperSearch";
const Header = () => {
  const [modalOpen, setModalOpen] = React.useState(false);
  const navigate = useNavigate();
  /* 쿠키 */
  const cookie = getCookie("token");
  const [is_cookie, setCookie] = React.useState(false);
  React.useEffect(() => {
    if (cookie !== undefined) {
      return setCookie(true);
    }
  }, []);
  /* 쿠키 */
  /* 유저정보 모달창 */
  const openModal = () => {
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };
  /* 유저정보 모달창 */
  /* 개인페이지 이동 */
  const useGetMyPaper = async () => {
    const userData = await apiToken.get("/user/myprofile");
    // console.log(userData);
    return userData.data.myprofile;
  };
  const { data: userpaper_query, status } = useQuery(
    "userpaper_query",
    useGetMyPaper,
    {
      onSuccess: (data) => {
        // console.log(data);
      },
      // onError: (e) => {
      //   alert(e.message);
      // },
      staleTime: 50000,
    }
  );
  const nickname = userpaper_query?.nickname;
  const profileImage = userpaper_query?.profileImage;
  const profileButton = process.env.REACT_APP_S3_URL + `/${profileImage}`;
  if (status === "Loading") {
    return <div>loading...</div>;
  }
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
                <ProfileImgBox
                  src={
                    profileImage === null
                      ? "https://www.snsboom.co.kr/common/img/default_profile.png"
                      : profileButton
                  }
                  onClick={openModal}
                />
                <HeaderProfile
                  open={modalOpen}
                  close={closeModal}
                  header="프로필"
                  nickname={nickname}
                  login={setCookie}
                  profileImage={profileImage}
                />
                <button
                  onClick={() => {
                    navigate(`/paper/${userpaper_query.blogId}`);
                  }}
                >
                  내 블로그로 가기
                </button>
                <button
                  onClick={() => {
                    navigate(`/paper/${userpaper_query.blogId}/reservationList`);
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
export default Header;
