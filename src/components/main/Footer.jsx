import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <>
      <FooterBox>
        <Footer1>
          <Footer1T>
            <img
              className="futerTitle"
              src={process.env.PUBLIC_URL + "/logo_paper.png"}
              back_size="100% 100%"
              alt="logo"
            />
          </Footer1T>
        </Footer1>
        <Footer2>
          <Footer2T>
            <div className="title">Front-end Developer</div>
            <div className="text">
              <div> • Gu Ja-deok</div>
              <div> • Jeong Dae-gyu</div>
              <div> • Im Un-cheol</div>
            </div>
          </Footer2T>
        </Footer2>
        <Footer3>
          <Footer3T>
            <div className="title">Back-end Developer</div>
            <div className="text">
              <div> • Moon Kwang-Min</div>
              <div> • Kim Seong-Jun</div>
              <div> • Song Min-ji</div>
              <div> • Park Seon-woo</div>
            </div>
          </Footer3T>
        </Footer3>
        <Footer4>
          <Footer4T>
            <div className="title">Git-hub Address </div>
            <div className="text">
              <div>Front: </div>
              <a href="https://www.naver.com/">• https://github.com/Blog-Paper-Project/FE</a>
              <div>Back: </div>
              <a href="https://www.naver.com/">• https://github.com/Blog-Paper-Project/BE</a>
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
  font-family: 'Noto Sans KR';
  font-style: normal;
  font-weight: 400;
  font-size: 15px;
  line-height: 22px;
  width: 100%;
  height: 270px;
  border-collapse: collapse;
  padding-top: 50px;
`;

const Footer1 = styled.div`
  width: 25%;
  height: 220px;
  border: 1px solid #A7ACA1;
  border-right: none;
  float: left;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Footer1T = styled.div`
  width: 70%;
  height: 55%;
`;

const Footer2 = styled.div`
  width: 25%;
  height: 220px;
  border: 1px solid #A7ACA1;
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
    font-size: 20px;
    font-weight: 600;
    margin-bottom: 10px;
  }
  .text {
    padding-left: 10px;
  }
`;

const Footer3 = styled.div`
  width: 25%;
  height: 220px;
  border: 1px solid #A7ACA1;
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
    font-size: 20px;
    font-weight: 600;
    margin-bottom: 10px;
  }
  .text {
    padding-left: 10px;
  }
`;

const Footer4 = styled.div`
  width: 25%;
  height: 220px;
  border: 1px solid #A7ACA1;
  float: left;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Footer4T = styled.div`
  width: 70%;
  height: 55%;
  .title {
    font-size: 20px;
    font-weight: 600;
    margin-bottom: 10px;
  }
  .text {
    padding-left: 10px;
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
