import React from "react";
import styled from "styled-components";
import { useQuery } from "react-query";
import { FaHeart } from "react-icons/fa";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/grid";
import "swiper/css/pagination";
import "./Main.css";

// import required modules
import { Grid, Pagination } from "swiper";

/* 컴포넌트 */
import Header from "../components/main/Header";
import { useNavigate } from "react-router-dom";
import { api } from "../shared/apis/Apis";
import Footer from "../components/main/Footer";
import ViewEdit from "../components/editor/ViewEdit";
import defaultUserImage from "../public/images/default_profile.png";


const Main = () => {
  const navigate = useNavigate();

  const paperList = async () => {
    const res = await api.get("/api/paper");
    return res;
  };

  const { data: paper_query } = useQuery("paper_list", paperList, {
    staleTime: 0,
    onSuccess: (data) => {
      return data;
    },
  });

  const aPapers = paper_query?.data.papers[0];
  const bPapers = paper_query?.data.papers[1];
  const cPapers = paper_query?.data.papers[2];
  const dPapers = paper_query?.data.papers[3];
  const ePapers = paper_query?.data.papers[4];
  const fPapers = paper_query?.data.papers[5];
  const gPapers = paper_query?.data.papers[6];
  const hPapers = paper_query?.data.papers[7];
  const iPapers = paper_query?.data.papers[8];
  const jPapers = paper_query?.data.papers[9];

  return (
    <>
      <MainBox>
        <Header />
        <MainTop>
          <img
            className="paperTitle"
            src={process.env.PUBLIC_URL + "/Group 365.png"}
            back_size="100% 100%"
            alt="icon"
          />
        </MainTop>



        <PostWrap>
          <PostBox>
            <Post1st>
            <div
                style={{
                  width: "259px",
                  height: "234px",
                  marginLeft: "56px",
                  marginTop: "56px",
                  overflow: "hidden",
                  cursor: "pointer"
                }}
                onClick={() => {
                  navigate(`/paper/${aPapers?.blogId}/${aPapers?.postId}`);
                }}
              >
                <h2 style={{ fontSize: "40px" }}>{aPapers?.title}</h2>
                {aPapers?.contents && (
                  <ViewEdit
                    contents={aPapers?.contents}
                    style={{ height: "200px" }}
                  />
                )}
              </div>
              <div
                style={{
                  marginLeft: "56px",
                  cursor: "pointer"
                }}
                className="writer"
                onClick={() => {
                  navigate(`/paper/${aPapers?.blogId}`);
                }}>
                by. {aPapers?.nickname}
              </div>
              <p>
                <FaHeart
                  style={{
                    marginRight: "5px",
                    marginLeft: "57px"
                  }}
                  size="12px" />
                {aPapers?.likes}
              </p>
            </Post1st>

            <Post2st style={{
              position: "relative",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            >
              <img
                src={process.env.REACT_APP_S3_URL + `/${bPapers?.thumbnail}`}
                alt="img"
                style={{ width: "100%", height: "100%", padding: "5px" }}
                onClick={() => {
                  navigate(`/paper/${bPapers?.blogId}/${bPapers?.postId}`);
                }}
              />
              <div
                style={{
                  position: "absolute",
                  bottom: "56px",
                  left: "56px",
                  backgroundColor: "rgba(255, 255, 255, 0.8)",
                  width: "260px",
                  height: "304px",
                  cursor: "pointer"
                }}
              >
                <div
                  style={{
                    width: "260px",
                    height: "250px",
                    overflow: "hidden"
                  }}
                  onClick={() => {
                    navigate(`/paper/${bPapers?.blogId}/${bPapers?.postId}`);
                  }}>
                  <h2 style={{ fontSize: "40px" }}>{bPapers?.title}</h2>
                  <br />
                  {bPapers?.contents && (
                    <ViewEdit
                      contents={bPapers?.contents}
                      style={{ height: "200px" }}
                    />
                  )}
                </div>
                <br />
                <div className="writer"
                  onClick={() => {
                    navigate(`/paper/${bPapers?.blogId}`);
                  }}>
                  by. {bPapers?.nickname}
                </div>
                <span style={{ cursor: "auto" }}>
                  <FaHeart
                    style={{ marginRight: "5px" }}
                    size="12px" />
                  {bPapers?.likes}
                </span>
              </div>
            </Post2st>

            <Post3st>
            <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <img
                  src={
                    process.env.REACT_APP_S3_URL + `/${cPapers?.thumbnail}`
                  }
                  alt="img"
                  style={{
                    width: "253px",
                    height: "108px",
                    margin: "56px auto 56px auto",
                  }}
                  onClick={() => {
                    navigate(`/paper/${cPapers?.blogId}/${cPapers?.postId}`);
                  }}
                />
              </div>
              <div
                style={{
                  marginLeft: "56px",
                  cursor: "pointer"
                }}
              >
                <h2
                  style={{ fontSize: "40px" }}
                  onClick={() => {
                    navigate(`/paper/${cPapers?.blogId}/${cPapers?.postId}`);
                  }}>
                  {cPapers?.title}</h2>
                <br />
                <div className="writer"
                  onClick={() => {
                    navigate(`/paper/${cPapers?.blogId}`);
                  }}>
                  by. {cPapers?.nickname}
                </div>
              </div>
              <p>
                <FaHeart
                  style={{
                    marginRight: "5px",
                    marginLeft: "57px"
                  }}
                  size="12px" />
                {cPapers?.likes}
              </p>
            </Post3st>

            <Post4st>
              <div
                style={{
                  width: "259px",
                  height: "234px",
                  marginLeft: "56px",
                  marginTop: "56px",
                  overflow: "hidden",
                  cursor: "pointer"
                }}
                onClick={() => {
                  navigate(`/paper/${dPapers?.blogId}/${dPapers?.postId}`);
                }}
              >
                <h2 style={{ fontSize: "40px" }}>{dPapers?.title}</h2>
                {dPapers?.contents && (
                  <ViewEdit
                    contents={dPapers?.contents}
                    style={{ height: "200px" }}
                  />
                )}
              </div>
              <br />
              <div
                style={{
                  marginLeft: "56px",
                  cursor: "pointer"
                }}
                className="writer"
                onClick={() => {
                  navigate(`/paper/${dPapers?.blogId}`);
                }}>
                by. {dPapers?.nickname}
              </div>
              <p>
                <FaHeart
                  style={{
                    marginRight: "5px",
                    marginLeft: "56px"
                  }}
                  size="12px" />
                {dPapers?.likes}
              </p>
            </Post4st>

            <Post5st style={{
              position: "relative",
              paddingLeft: "68px",
              paddingTop: "69px",
            }}
            >
              <div style={{
                width: "622px",
                height: "481px",
                overflow: "hidden",
                cursor: "pointer"
              }}
                onClick={() => {
                  navigate(`/paper/${ePapers?.blogId}/${ePapers?.postId}`);
                }}
              >
                {ePapers?.contents && (
                  <ViewEdit
                    contents={ePapers?.contents}
                    style={{ width: "100%", height: "100%", padding: "5px" }}
                  />
                )}
              </div>
              <div
                style={{
                  position: "absolute",
                  bottom: "80px",
                  backgroundColor: "rgb(255, 255, 255, 0.8)",
                  width: "343px",
                  height: "304px",
                  cursor: "pointer"
                }}
              >
                <div
                  style={{
                    width: "260px",
                    height: "250px",
                    overflow: "hidden",
                  }}
                  onClick={() => {
                    navigate(`/paper/${ePapers?.blogId}/${ePapers?.postId}`);
                  }}>
                  <h2 style={{ fontSize: "40px" }}>{ePapers?.title}</h2>
                  <br />
                  {ePapers?.contents && (
                    <ViewEdit
                      contents={ePapers?.contents}
                      style={{ height: "200px" }}
                    />
                  )}
                </div>
                <br />
                <div className="writer"
                  onClick={() => {
                    navigate(`/paper/${ePapers?.blogId}`);
                  }}>
                  by. {ePapers?.nickname}
                </div>
                <p style={{ cursor: "auto" }}>
                  <FaHeart
                    style={{ marginRight: "5px" }}
                    size="12px" />
                  {ePapers?.likes}
                </p>
              </div>
            </Post5st>

            <Information>
              <div style={{
                position: "relative",
                padding: "53px 56px",
              }}>
                <div>
                  <div style={{
                    fontWeight: "400",
                    fontSize: "60px",
                    lineHeight: "60px",
                  }}>
                    The PAPER
                    <span style={{
                      fontWeight: "300",
                      fontSize: "60px",
                      lineHeight: "60px",
                    }}>
                      | write
                    </span>
                  </div>
                  <div style={{
                    fontWeight: "300",
                    fontSize: "25px",
                    marginTop: "27px"
                  }}>
                    PAPER에 담긴 아름다운 작품을 감상해 보세요.
                  </div>
                  <span style={{
                    fontWeight: "400",
                    fontSize: "25px",
                  }}>
                    글을 써서 나뭇잎을 모아 나무로 만드세요.
                  </span>
                </div>
                <img
                  style={{
                    padding: "0px 0px 0px 212px"
                  }}
                  className="paperInfo"
                  src={process.env.PUBLIC_URL + "/Frame 182.png"}
                  back_size="100% 100%"
                  alt="icon"
                />
              </div>
            </Information>

            <Post6st style={{
              position: "relative",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            >
              <img
                src={process.env.REACT_APP_S3_URL + `/${fPapers?.thumbnail}`}
                alt="img"
                style={{ width: "100%", height: "100%", padding: "5px" }}
                onClick={() => {
                  navigate(`/paper/${fPapers?.blogId}/${fPapers?.postId}`);
                }}
              />
              <div
                style={{
                  position: "absolute",
                  bottom: "56px",
                  left: "56px",
                  backgroundColor: "rgba(255, 255, 255, 0.8)",
                  width: "260px",
                  height: "304px",
                  cursor: "pointer"
                }}
              >
                <div
                  style={{
                    width: "260px",
                    height: "250px",
                    overflow: "hidden"
                  }}
                  onClick={() => {
                    navigate(`/paper/${fPapers?.blogId}/${fPapers?.postId}`);
                  }}>
                  <h2 style={{ fontSize: "40px" }}>{fPapers?.title}</h2>
                  <br />
                  {fPapers?.contents && (
                    <ViewEdit
                      contents={fPapers?.contents}
                      style={{ height: "200px" }}
                    />
                  )}
                </div>
                <br />
                <div className="writer"
                  onClick={() => {
                    navigate(`/paper/${fPapers?.blogId}`);
                  }}>
                  by. {fPapers?.nickname}
                </div>
                <span style={{ cursor: "auto" }}>
                  <FaHeart
                    style={{ marginRight: "5px" }}
                    size="12px" />
                  {fPapers?.likes}
                </span>
              </div>
            </Post6st>

            <Post7st>
              <div
                style={{
                  width: "259px",
                  height: "234px",
                  marginLeft: "56px",
                  marginTop: "56px",
                  overflow: "hidden",
                  cursor: "pointer"
                }}
                onClick={() => {
                  navigate(`/paper/${gPapers?.blogId}/${gPapers?.postId}`);
                }}
              >
                <h2 style={{ fontSize: "40px" }}>{gPapers?.title}</h2>
                {gPapers?.contents && (
                  <ViewEdit
                    contents={gPapers?.contents}
                    style={{ height: "200px" }}
                  />
                )}
              </div>
              <div
                style={{
                  marginLeft: "56px",
                  cursor: "pointer"
                }}
                className="writer"
                onClick={() => {
                  navigate(`/paper/${gPapers?.blogId}`);
                }}>
                by. {gPapers?.nickname}
              </div>
              <p>
                <FaHeart
                  style={{
                    marginRight: "5px",
                    marginLeft: "57px"
                  }}
                  size="12px" />
                {gPapers?.likes}
              </p>
            </Post7st>

            <Post8st>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <img
                  src={
                    process.env.REACT_APP_S3_URL + `/${hPapers?.thumbnail}`
                  }
                  alt="img"
                  style={{
                    width: "253px",
                    height: "108px",
                    margin: "56px auto 56px auto",
                  }}
                  onClick={() => {
                    navigate(`/paper/${hPapers?.blogId}/${hPapers?.postId}`);
                  }}
                />
              </div>
              <div
                style={{
                  marginLeft: "56px",
                  cursor: "pointer"
                }}
              >
                <h2
                  style={{ fontSize: "40px" }}
                  onClick={() => {
                    navigate(`/paper/${hPapers?.blogId}/${hPapers?.postId}`);
                  }}>
                  {hPapers?.title}</h2>
                <br />
                <div className="writer"
                  onClick={() => {
                    navigate(`/paper/${hPapers?.blogId}`);
                  }}>
                  by. {hPapers?.nickname}
                </div>
              </div>
              <p>
                <FaHeart
                  style={{
                    marginRight: "5px",
                    marginLeft: "57px"
                  }}
                  size="12px" />
                {hPapers?.likes}
              </p>
            </Post8st>

            <Post9st>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <img
                  src={
                    process.env.REACT_APP_S3_URL + `/${iPapers?.thumbnail}`
                  }
                  alt="img"
                  style={{
                    width: "253px",
                    height: "108px",
                    margin: "56px auto 56px auto",
                  }}
                  onClick={() => {
                    navigate(`/paper/${iPapers?.blogId}/${iPapers?.postId}`);
                  }}
                />
              </div>
              <div
                style={{
                  marginLeft: "56px",
                  cursor: "pointer"
                }}

              >
                <h2 style={{ fontSize: "40px" }}
                  onClick={() => {
                    navigate(`/paper/${iPapers?.blogId}/${iPapers?.postId}`);
                  }}>
                  {iPapers?.title}</h2>
                <br />
                <div className="writer"
                  onClick={() => {
                    navigate(`/paper/${iPapers?.blogId}`);
                  }}>
                  by. {iPapers?.nickname}
                </div>
              </div>
              <p>
                <FaHeart
                  style={{
                    marginRight: "5px",
                    marginLeft: "57px"
                  }}
                  size="12px" />
                {iPapers?.likes}
              </p>
            </Post9st>

            <Post10st>
              <div
                style={{
                  width: "698px",
                  height: "298px",
                  paddingLeft: "56px",
                  paddingTop: "56px",
                  cursor: "pointer"
                }}
              >
                <div
                  style={{
                    width: "698px",
                    height: "250px",
                    overflow: "hidden"
                  }}
                  onClick={() => {
                    navigate(`/paper/${jPapers?.blogId}/${jPapers?.postId}`);
                  }}
                >
                  <h2 style={{ fontSize: "40px" }}>{jPapers?.title}</h2>
                  <br />
                  <br />
                  {jPapers?.contents && (
                    <ViewEdit
                      contents={jPapers?.contents}
                      style={{ height: "200px" }}
                    />
                  )}
                </div>
              </div>
              <br />
              <div className="writer"
                onClick={() => {
                  navigate(`/paper/${jPapers?.blogId}`);
                }}
                style={{
                  marginLeft: "57px",
                  cursor: "pointer"
                }}>
                by. {bPapers?.nickname}
              </div>
              <p>
                <FaHeart
                  style={{
                    marginRight: "5px",
                    marginLeft: "57px"
                  }} />
                {jPapers?.likes}
              </p>
            </Post10st>
          </PostBox>
        </PostWrap>


        <PopularBloger>
          <div className="poTitle">인기 블로거</div>
          <div className="poText">Popular Bloger</div>
        </PopularBloger>
        <PopularBox>
          <Swiper
            slidesPerView={3}
            grid={{
              rows: 2,
            }}
            spaceBetween={0}
            pagination={{
              clickable: true,
            }}
            modules={[Grid, Pagination]}
            className="mySwiper"
          >
            {paper_query &&
              paper_query?.data.popularUsers.map((popularUsers) => {
                const S3 = process.env.REACT_APP_S3_URL + `/${popularUsers.profileImage}`;
                return (
                  <SwiperSlide
                    key={popularUsers.blogId}
                  >
                    <Popular>
                      <PopularImg
                        onClick={() => {
                          navigate(`/paper/${popularUsers.blogId}`);
                        }}
                        src={popularUsers.profileImage === null ? defaultUserImage : S3} />
                      <div className="popularNick">{popularUsers.nickname}</div>
                      <div className="popularIntro">{popularUsers.introduction}</div>
                      <div>인기도 {popularUsers.popularity}</div>
                    </Popular>
                  </SwiperSlide>
                );
              })}
          </Swiper>
        </PopularBox>
        <EndBox>
          <div className="enTitle">
            PAPER에 담긴 아름다운 작품을 감상해 보세요.
          </div>
          <div className="enText">

            글을 써서 나뭇잎을 모아 나무로 만드세요
          </div>
        </EndBox>
        <Footer />
      </MainBox>
    </>
  );
};

const MainBox = styled.div`
  background-color: #fffdf7;
  height: 3909px;
`;
const MainTop = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 266px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 160px;
  font-weight: 600;
  line-height: 90px;
  border-bottom: 1px solid #A7ACA1;
`;
const PostWrap = styled.div`
  height: 1680px;
  display: flex;
  justify-content: center;
`
const PostBox = styled.div`
  width: 1516px;
  height: 1680px;
`;



const Post1st = styled.div`
  width: 379px;
  height: 400px;
  float: left;
  border: 1px solid #A7ACA1;
  .writer{
    font-family: 'Gmarket Sans';
    font-style: normal;
    font-weight: 400;
    font-size: 18px;
    line-height: 18px;
  }
`;
const Post2st = styled.div`
  width: 379px;
  height: 400px;
  float: left;
  border: 1px solid #A7ACA1;
  .writer{
    font-family: 'Gmarket Sans';
    font-style: normal;
    font-weight: 400;
    font-size: 18px;
    line-height: 18px;
  }
`;
const Post3st = styled.div`
  width: 379px;
  height: 400px;
  float: left;
  border: 1px solid #A7ACA1;
  .writer{
    font-family: 'Gmarket Sans';
    font-style: normal;
    font-weight: 400;
    font-size: 18px;
    line-height: 18px;
  }
`;
const Post4st = styled.div`
  width: 379px;
  height: 400px;
  float: left;
  border: 1px solid #A7ACA1;
  .writer{
    font-family: 'Gmarket Sans';
    font-style: normal;
    font-weight: 400;
    font-size: 18px;
    line-height: 18px;
  }
`;
const Post5st = styled.div`
  width: 758px;
  height: 880px;
  border: 1px solid #A7ACA1;
  float:left;
  .writer{
    font-family: 'Gmarket Sans';
    font-style: normal;
    font-weight: 400;
    font-size: 18px;
    line-height: 18px;
  }
`;
const Information = styled.div`
  width: 758px;
  height: 480px;
  float: left;
  border: 1px solid #A7ACA1;
  background-color: white;
  font-family: 'Gmarket Sans';
  font-style: normal;
`;
const Post6st = styled.div`
  width: 379px;
  height: 400px;
  float: left;
  border: 1px solid #A7ACA1;
  .writer{
    font-family: 'Gmarket Sans';
    font-style: normal;
    font-weight: 400;
    font-size: 18px;
    line-height: 18px;
  }
`;
const Post7st = styled.div`
  width: 379px;
  height: 400px;
  float: left;
  border: 1px solid #A7ACA1;
  .writer{
    font-family: 'Gmarket Sans';
    font-style: normal;
    font-weight: 400;
    font-size: 18px;
    line-height: 18px;
  }
`;
const Post8st = styled.div`
  width: 379px;
  height: 400px;
  float: left;
  border: 1px solid #A7ACA1;
  .writer{
    font-family: 'Gmarket Sans';
    font-style: normal;
    font-weight: 400;
    font-size: 18px;
    line-height: 18px;
  }
`;
const Post9st = styled.div`
  width: 379px;
  height: 400px;
  float: left;
  border: 1px solid #A7ACA1;
  .writer{
    font-family: 'Gmarket Sans';
    font-style: normal;
    font-weight: 400;
    font-size: 18px;
    line-height: 18px;
  }
`;
const Post10st = styled.div`
  width: 758px;
  height: 400px;
  float: left;
  border: 1px solid #A7ACA1;
  .writer{
    font-family: 'Gmarket Sans';
    font-style: normal;
    font-weight: 400;
    font-size: 18px;
    line-height: 18px;
  }
`;



const PopularBloger = styled.div`
  width: 100%;
  height: 260px;
  border: 1px solid #A7ACA1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: end;
  padding-bottom: 25px;
  font-family: 'Gmarket Sans';
  font-style: normal;
  float: left;
  .poTitle {
    font-weight: 400;
    font-size: 30px;
    line-height: 150%;
  }
  .poText {
    font-weight: 300;
    font-size: 20px;
    line-height: 150%;
  }
`;
const PopularBox = styled.div`
  width: 90%;
  height: 920px;
  padding: 20px 0 0 0;
  float: left;
`;
const Popular = styled.div`
  background-color: #fffdf7;
  display: flex;
  align-items: center;
  padding-top: 50px;
  width: 506px;
  height: 410px;
  border: 1px solid #A7ACA1;
  flex-direction: column;
  float: left;
  .popularNick{
    margin-top: 20px;
    font-family: 'Gmarket Sans';
    font-style: normal;
    font-weight: 400;
    font-size: 30px;
    line-height: 30px;
  }
  .popularIntro{
    margin-top: 20px;
    margin-bottom: 40px;
    width: 212px;
    height: 76px;
    overflow: hidden;
    font-family: 'Noto Sans';
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 19px;
    text-align: center;
    color: #333333;
  }
`;
const PopularImg = styled.img`
  width: 100px;
  height: 100px;
  margin: 0 0 0 0;
  border-radius: 100px;
  align-items: center;
`
const EndBox = styled.div`
  width: 100%;
  height: 10%;
  display: flex !important;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 1px solid #A7ACA1;
  font-family: 'Gmarket Sans';
  font-style: normal;
  .enTitle {
    font-weight: 300;
    font-size: 30px;
    line-height: 150%;
  }
  .enText {
    font-weight: 400;
    font-size: 30px;
    line-height: 150%;
  }
`;

export default Main;
