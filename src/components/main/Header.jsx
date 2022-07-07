import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";
import { getCookie } from "../../shared/Cookie";
import styled from "styled-components";
import { useQuery } from "react-query";
import { useDispatch } from "react-redux";

/* api */
import { api, apiToken } from "../../shared/apis/Apis";

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
  const username = getCookie("username");
  const nickname = getCookie("nickname");

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
      onSuccess: (userpaper_query) => {
        // console.log(userpaper_query);
      },
    }
  );
  if (status === "Loading") {
    return <div>loading...</div>;
  }
  // console.log(userpaper_query?.data.myprofile.userId);
  return (
    <>
      <HeaderBox>
        <Svg>
          <Logo>
            <Link to="/">
              <div>logo</div>
            </Link>
            <MainTitle>Paper</MainTitle>
          </Logo>

          <HeadPaperSearch />

          {is_cookie ? (
            <>
              <button
                onClick={() => {
                  navigate(`/paper/${userpaper_query.userId}`);
                }}
              >
                내 블로그로 가기
              </button>
              <ProfileImgBox>
                <button onClick={openModal}>유저이미지(모달오픈)</button>
                <HeaderProfile
                  open={modalOpen}
                  close={closeModal}
                  header="프로필"
                  username={username}
                  nickname={nickname}
                  login={setCookie}
                />
              </ProfileImgBox>
              <Link to="/myprofile">
                <div>마이프로필</div>
              </Link>
              <Link to="/write">
                <div>글작성</div>
              </Link>
            </>
          ) : (
            <>
              <Link to="/login">
                <div>로그인</div>
              </Link>
            </>
          )}
        </Svg>
      </HeaderBox>
    </>
  );
};
const HeaderBox = styled.div`
  background-color: gray;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

const Svg = styled.div`
  margin: 20px 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 80%;
  padding: 0 20%;
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
`;

const MainTitle = styled.div`
  background-color: #fff;
  line-height: 2.3;
  display: block;
  color: green;
  margin: 0 0 0 20px;
  border-radius: 10px;
`;

const ProfileImgBox = styled.div`
  display: flex;
`;

export default Header;
