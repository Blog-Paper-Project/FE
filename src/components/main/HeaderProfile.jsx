import React from "react";
import "../../css/headmodal.css";
import styled from "styled-components";
import { deleteCookie } from "../../shared/Cookie";
import { useNavigate } from "react-router-dom";

const HeaderProfile = (props) => {
  const { open, close, header, nickname, login, profileImage } = props;
  const navigate = useNavigate();

  const onLogout = () => {
    deleteCookie("token");
    deleteCookie("nickname");
    deleteCookie("userId");
    login(false);
    close();
    navigate("/");
  };
  const proImg = process.env.REACT_APP_S3_URL + `/${profileImage}`;

  return (
    <>
      <div className={open ? "openModal headmodal" : "headmodal"}>
        {open ? (
          <section>
            <header>
              <p style={{ fontsize: "40px" }}>{header}</p>
              <button className="close" onClick={close}>
                &times;
              </button>
            </header>
            <main>
              <MainBox>
                <ProfileImg
                  src={
                    profileImage === null
                      ? "https://www.snsboom.co.kr/common/img/default_profile.png"
                      : proImg
                  }
                />
                <MainText>
                  <Nick style={{ fontWeight: "bolder", marginBottom: "10px" }}>
                    {nickname}
                  </Nick>
                </MainText>
              </MainBox>
            </main>
            <footer>
              <ButtonBox>
                <Button
                  className="close"
                  onClick={() => {
                    navigate(`/myprofile/`);
                  }}
                  style={{ backgroundColor: "#D9D9D9" }}
                >
                  회원정보
                </Button>
                <Button
                  className="close"
                  onClick={() => {
                    onLogout();
                  }}
                  style={{ backgroundColor: "#D9D9D9" }}
                >
                  로그아웃
                </Button>
              </ButtonBox>
            </footer>
          </section>
        ) : null}
      </div>
    </>
  );
};
export default HeaderProfile;

const ProfileImg = styled.img`
  width: 88px;
  height: 88px;
  margin: 0 0 20px 0;
  border-radius: 50px;
  border: 1px solid;
  align-items: center;
`;
const MainBox = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
`;
const MainText = styled.div`
  padding-left: 3%;
  width: 72%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;
const ButtonBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const Button = styled.div`
  width: 79%;
  height: 50px;
  color: #000;
  background-color: #6c757d;
  border-radius: 5px;
  font-weight: 700;
  font-size: 16px;
  line-height: 23px;
  margin-top: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Nick = styled.div`
  font-weight: 400;
  font-size: 22px;
  line-height: 32px;
`;
