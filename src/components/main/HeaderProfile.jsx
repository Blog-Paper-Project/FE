import React from "react";
import "../../css/headmodal.css";
import styled from "styled-components";
import { deleteCookie } from "../../shared/Cookie";
import { useNavigate } from "react-router-dom";

const HeaderProfile = (props) => {
  const { open, close, header, username, nickname, login } = props;
  const navigate = useNavigate();

  const onLogout = () => {
    deleteCookie("token");
    deleteCookie("nickname");
    deleteCookie("userId");
    login(false);
    close();
    navigate("/");
  };

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
              {/* <ProfileImg src={profileImg} /> */}
              <Nick style={{ fontWeight: "bolder", marginBottom: "10px" }}>
                {nickname}
              </Nick>
              <Nick>{username}</Nick>
            </main>
            <footer>
              <buttonbox>
                <button
                  className="close"
                  onClick={() => {
                    navigate(`/myprofile/`);
                  }}
                  style={{ backgroundColor: "#D9D9D9" }}
                >
                  회원정보
                </button>
                <button
                  className="close"
                  onClick={onLogout}
                  style={{ backgroundColor: "#D9D9D9" }}
                >
                  로그아웃
                </button>
              </buttonbox>
            </footer>
          </section>
        ) : null}
      </div>
    </>
  );
};
export default HeaderProfile;

// const ProfileImg = styled.img`
//   width: 300px;
//   height: 300px;
//   margin: 0 0 20px 55px;
//   border-radius: 34px;
//   align-items: center;

// `
const Nick = styled.div`
  text-align: center;
  font-size: 20px;
`;
