import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router";

const Footer = () => {
  const navigate = useNavigate();

  return (
    <>
      <FooterBox>
        <Footer1>
          <Footer1T>
            <img
              onClick={() => {
                navigate("/");
              }}
              className="futerTitle"
              src={process.env.PUBLIC_URL + "/logo_paper.png"}
              alt="logo"
            />
          </Footer1T>
        </Footer1>
        <Footer2>
          <Footer2T>
            <div className="title">Frontend Developer / Designer</div>
            <div className="text">
              <div> • Koo Ja-deok</div>
              <div> • Jeong Dae-gyu</div>
              <div> • Im Un-cheol</div>
              <div> • Park Sin-Young / Designer</div>
            </div>
          </Footer2T>
        </Footer2>
        <Footer3>
          <Footer3T>
            <div className="title">Backend Developer</div>
            <div className="text">
              <div> • Moon Kwang-Min</div>
              <div> • Kim Sung-Jun</div>
              <div> • Song Min-ji</div>
              <div> • Park Soun-woo </div>
            </div>
          </Footer3T>
        </Footer3>
        <Footer4>
          <Footer4T>
            <div className="title">GitHub Address </div>
            <div className="text">
              <div>Front: </div>
              <a href="https://github.com/Blog-Paper-Project/FE">
                • https://github.com/Blog-Paper-Project/FE
              </a>
              <div>Back: </div>
              <a href="https://github.com/Blog-Paper-Project/BE">
                • https://github.com/Blog-Paper-Project/BE
              </a>
            </div>
          </Footer4T>
        </Footer4>
      </FooterBox>
      <FooterEnd>
        <div>Copyright ⓒ PAPER.All Rights Reserved</div>
      </FooterEnd>
    </>
  );
};

const FooterBox = styled.div`
  font-family: "Noto Sans KR";
  font-style: normal;
  font-weight: 400;
  font-size: 15px;
  line-height: 22px;
  width: 100%;
  height: 270px;
  border-collapse: collapse;
  padding-top: 50px;
  border-top: 1px solid #a7aca1;
  margin-top: 150px;
`;

const Footer1 = styled.div`
  width: 25%;
  height: 220px;
  border: 1px solid #a7aca1;
  border-right: none;
  float: left;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Footer1T = styled.div`
  height: 55%;
  width: 70%;
  .futerTitle {
    width: 50%;
    height: auto;
    max-width: 500px;
    display: block;
  }
`;

const Footer2 = styled.div`
  width: 25%;
  height: 220px;
  border: 1px solid #a7aca1;
  border-right: none;
  float: left;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Footer2T = styled.div`
  width: 70%;
  height: 55%;
  .title {
    font-family: "Gmarket Sans";
    font-size: 18px;
    font-weight: 600;
    margin-bottom: 10px;
  }
  .text {
    padding-left: 5px;
    font-size: 14px;
    font-family: "Gmarket Sans";
  }
`;

const Footer3 = styled.div`
  width: 25%;
  height: 220px;
  border: 1px solid #a7aca1;
  border-right: none;
  float: left;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Footer3T = styled.div`
  width: 70%;
  height: 55%;
  .title {
    font-family: "Gmarket Sans";
    font-size: 18px;
    font-weight: 600;
    margin-bottom: 10px;
  }
  .text {
    padding-left: 5px;
    font-size: 14px;
    font-family: "Gmarket Sans";
  }
`;

const Footer4 = styled.div`
  width: 25%;
  height: 220px;
  border: 1px solid #a7aca1;
  border-right: none;
  float: left;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Footer4T = styled.div`
  width: 70%;
  height: 55%;
  .title {
    font-size: 18px;
    font-weight: 600;
    margin-bottom: 10px;
    font-family: "Gmarket Sans";
  }
  .text {
    padding-left: 5px;
    font-size: 13px;
    font-family: "Gmarket Sans";
  }
`;

const FooterEnd = styled.div`
  width: 100%;
  height: 54px;
  display: flex;
  align-items: center;
  padding-left: 48px;
`;

export default Footer;
