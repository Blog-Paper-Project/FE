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
          <div>PAPER</div>
        </MainTop>
        <PostWrap>
          <PostBox>
            <Post1>
              <Post11>
                <Post111>
                  <div
                    style={{
                      width: "70%",
                      height: "300px",
                      paddingLeft: "30px",
                      paddingTop: "30px",
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
                    <p>
                      <FaHeart size="12px" />
                      {aPapers?.likes}
                    </p>
                  </div>
                </Post111>
                <Post112 style={{
                  position: "relative",
                  overflow: "hidden",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                >
                  <img
                    src={process.env.REACT_APP_S3_URL + `/${bPapers?.thumbnail}`}
                    alt="img"
                    style={{ width: "100%", height: "100%", padding: "5px" }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      bottom: "10%",
                      left: "10%",
                      backgroundColor: "rgba(255, 255, 255, 0.8)",
                      width: "347px",
                      height: "274px",
                    }}
                    onClick={() => {
                      navigate(`/paper/${bPapers?.blogId}/${bPapers?.postId}`);
                    }}
                  >
                    <h2 style={{ fontSize: "40px" }}>{bPapers?.title}</h2>
                    <br />
                    {bPapers?.contents && (
                      <ViewEdit
                        contents={bPapers?.contents}
                        style={{ height: "200px" }}
                      />
                    )}
                    <p>
                      <FaHeart size="12px" />
                      {bPapers?.likes}
                    </p>
                  </div>
                </Post112>
              </Post11>
              <Post12 style={{
                  position: "relative",
                  overflow: "hidden",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                >
                  {ePapers?.contents && (
                      <ViewEdit
                        contents={ePapers?.contents}
                        style={{ width: "100%", height: "100%", padding: "5px" }}
                      />
                    )}
                 
                  <div
                    style={{
                      position: "absolute",
                      bottom: "10%",
                      left: "10%",
                      backgroundColor: "rgba(255, 255, 255, 0.8)",
                      width: "347px",
                      height: "274px",
                    }}
                    onClick={() => {
                      navigate(`/paper/${ePapers?.blogId}/${ePapers?.postId}`);
                    }}
                  >
                    <h2 style={{ fontSize: "40px" }}>{ePapers?.title}</h2>
                    <br />
                    {ePapers?.contents && (
                      <ViewEdit
                        contents={aPapers?.contents}
                        style={{ height: "200px" }}
                      />
                    )}
                    <p>
                      <FaHeart size="12px" />
                      {ePapers?.likes}
                    </p>
                  </div>
                
              </Post12>
              <Post13>
                <Post131>
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
                        width: "413px",
                        height: "108px",
                        margin: "73px auto 41px auto",
                      }}
                    />
                  </div>
                  <div
                    style={{
                      marginLeft: "20px",
                    }}
                    onClick={() => {
                      navigate(`/paper/${hPapers?.blogId}/${hPapers?.postId}`);
                    }}
                  >
                    <h2 style={{ fontSize: "40px" }}>{hPapers?.title}</h2>
                    <br />
                    <p>
                      <FaHeart size="12px" />
                      {hPapers?.likes}
                    </p>
                  </div>
                </Post131>
                <Post132>
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
                        width: "413px",
                        height: "108px",
                        margin: "73px auto 41px auto",
                      }}
                    />
                  </div>
                  <div
                    style={{
                      marginLeft: "20px",
                    }}
                    onClick={() => {
                      navigate(`/paper/${iPapers?.blogId}/${iPapers?.postId}`);
                    }}
                  >
                    <h2 style={{ fontSize: "40px" }}>{iPapers?.title}</h2>
                    <br />
                    <p>
                      <FaHeart size="12px" />
                      {iPapers?.likes}
                    </p>
                  </div>
                </Post132>
              </Post13>
            </Post1>
            <Post2>
              <Post21>
                <Post211>
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
                        width: "413px",
                        height: "108px",
                        margin: "73px auto 41px auto",
                      }}
                    />
                  </div>
                  <div
                    style={{
                      marginLeft: "20px",
                    }}
                    onClick={() => {
                      navigate(`/paper/${cPapers?.blogId}/${cPapers?.postId}`);
                    }}
                  >
                    <h2 style={{ fontSize: "40px" }}>{cPapers?.title}</h2>
                    <br />
                    <p>
                      <FaHeart size="12px" />
                      {cPapers?.likes}
                    </p>
                  </div>
                </Post211>
                <Post212>
                  <div
                    style={{
                      width: "70%",
                      height: "300px",
                      paddingLeft: "30px",
                      paddingTop: "30px",
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
                    <p>
                      <FaHeart size="12px" />
                      {dPapers?.likes}
                    </p>
                  </div>
                </Post212>
              </Post21>

              <Post22>
                설명
              </Post22>
              <Post23>
                <Post231>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <img
                      src={
                        process.env.REACT_APP_S3_URL + `/${fPapers?.thumbnail}`
                      }
                      alt="img"
                      style={{
                        width: "413px",
                        height: "108px",
                        margin: "73px auto 41px auto",
                      }}
                    />
                  </div>
                  <div
                    style={{
                      marginLeft: "20px",
                    }}
                    onClick={() => {
                      navigate(`/paper/${fPapers?.blogId}/${fPapers?.postId}`);
                    }}
                  >
                    <h2 style={{ fontSize: "40px" }}>{fPapers?.title}</h2>
                    <br />
                    <p>
                      <FaHeart size="12px" />
                      {fPapers?.likes}
                    </p>
                  </div>
                </Post231>
                <Post232 style={{
                  position: "relative",
                  overflow: "hidden",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                >
                  <img
                    src={process.env.REACT_APP_S3_URL + `/${gPapers?.thumbnail}`}
                    alt="img"
                    style={{ width: "100%", height: "100%", padding: "5px" }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      bottom: "10%",
                      left: "10%",
                      backgroundColor: "rgba(255, 255, 255, 0.8)",
                      width: "347px",
                      height: "274px",
                    }}
                    onClick={() => {
                      navigate(`/paper/${gPapers?.blogId}/${gPapers?.postId}`);
                    }}
                  >
                    <h2 style={{ fontSize: "40px" }}>{gPapers?.title}</h2>
                    <br />
                    {gPapers?.contents && (
                      <ViewEdit
                        contents={gPapers?.contents}
                        style={{ height: "200px" }}
                      />
                    )}
                    <p>
                      <FaHeart size="12px" />
                      {gPapers?.likes}
                    </p>
                  </div>
                </Post232>
              </Post23>
              <Post24>
                <div
                  style={{
                    width: "698px",
                    height: "300px",
                    paddingLeft: "30px",
                    paddingTop: "30px",
                  }}
                  onClick={() => {
                    navigate(`/paper/${jPapers?.blogId}/${jPapers?.postId}`);
                  }}
                >
                  <h2 style={{ fontSize: "40px" }}>{jPapers?.title}</h2>
                  {jPapers?.contents && (
                    <ViewEdit
                      contents={jPapers?.contents}
                      style={{ height: "200px" }}
                    />
                  )}
                  <p>
                    <FaHeart size="12px" />
                    {jPapers?.likes}
                  </p>
                </div>
              </Post24>
            </Post2>
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
                return (
                  <SwiperSlide
                    key={popularUsers.blogId}
                    onClick={() => {
                      navigate(`/paper/${popularUsers.blogId}`);
                    }}
                  >
                    <Popular>
                      <div>{popularUsers.profileImage}</div>
                      <div>닉네임 = {popularUsers.nickname}</div>
                      <div>인기도 = {popularUsers.popularity}</div>
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
          <div className="enText">글을 써서 나뭇잎을 모아 나무로 만드세요</div>
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
  width: 100%;
  height: 7%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 160px;
  font-weight: 600;
  line-height: 90px;
`;
const PostWrap = styled.div`
  width: 100%;
  height: 45%;
  display: flex;
  justify-content: center;
`
const PostBox = styled.div`
  width: 90%;
  height: 95%;
  outline: 1px solid;
`;
const Post1 = styled.div`
  width: 50%;
  height: 100%;
  float: left;
  /* border: 1px solid black; */
  /* padding: 20px; */
`;
const Post11 = styled.div`
  width: 100%;
  height: 23%;
  outline: 1px solid;
`;
const Post111 = styled.div`
  width: 50%;
  height: 100%;
  outline: 1px solid;
  float: left;
`;
const Post112 = styled.div`
  width: 50%;
  height: 100%;
  outline: 1px solid;
  background-color: green;
  float: left;
`;
const Post12 = styled.div`
  width: 100%;
  height: 54%;
  background-color: yellow;
`;
const Post13 = styled.div`
  width: 100%;
  height: 23%;
  background-color: lime;
`;
const Post131 = styled.div`
  width: 50%;
  height: 100%;
  float: left;
  background-color: aqua;
`;
const Post132 = styled.div`
  width: 50%;
  height: 100%;
  float: left;
  background-color: aquamarine;
`;
const Post2 = styled.div`
  width: 50%;
  height: 100%;
  float: left;
  background-color: azure;
`;
const Post21 = styled.div`
  width: 100%;
  height: 23%;
  float: left;
  background-color: black;
`;
const Post211 = styled.div`
  width: 50%;
  height: 100%;
  float: left;
  background-color: blanchedalmond;
`;
const Post212 = styled.div`
  width: 50%;
  height: 100%;
  float: left;
  background-color: blue;
`;
const Post22 = styled.div`
  width: 100%;
  height: 27%;
  background-color: cadetblue;
  float: left;
`;
const Post23 = styled.div`
  width: 100%;
  height: 27%;
  float: left;
  background-color: black;
`;
const Post231 = styled.div`
  width: 50%;
  height: 100%;
  float: left;
  background-color: blueviolet;
`;
const Post232 = styled.div`
  width: 50%;
  height: 100%;
  float: left;
  background-color: brown;
`;
const Post24 = styled.div`
  width: 100%;
  height: 23%;
  float: left;
  background-color: burlywood;
`;
// const Post121 = styled.div`
//   width: 50%;
//   height: 100%;
//   float: left;
// `;
// const Post1211 = styled.div`
//   width: 100%;
//   height: 50%;
//   outline: 1px solid;
// `;
// const Post1212 = styled.div`
//   width: 100%;
//   height: 50%;
//   outline: 1px solid;
// `;
// const Post122 = styled.div`
//   width: 50%;
//   height: 100%;
//   float: right;
// `;
// const Post1221 = styled.div`
//   width: 100%;
//   height: 50%;
//   outline: 1px solid;
// `;
// const Post1222 = styled.div`
//   width: 100%;
//   height: 50%;
//   outline: 1px solid;
// `;
// const Post2 = styled.div`
//   width: 50%;
//   height: 100%;
//   float: left;
// `;
// const Post21 = styled.div`
//   width: 100%;
//   height: 54%;
// `;
// const Post211 = styled.div`
//   width: 100%;
//   height: 50%;
//   outline: 1px solid;
// `;
// const Post212 = styled.div`
//   width: 100%;
//   height: 50%;
//   float: left;
// `;
// const Post2121 = styled.div`
//   width: 50%;
//   height: 100%;
//   outline: 1px solid;
//   float: right;
//   outline: 1px solid;
// `;
// const Post2122 = styled.div`
//   width: 50%;
//   height: 100%;
//   outline: 1px solid;
// `;
// const Post22 = styled.div`
//   width: 100%;
//   height: 46%;
// `;
// const Post221 = styled.div`
//   width: 100%;
//   height: 50%;
//   outline: 1px solid;
// `;
// const Post222 = styled.div`
//   width: 100%;
//   height: 50%;
// `;
// const Post2221 = styled.div`
//   width: 50%;
//   height: 100%;
//   outline: 1px solid;
//   float: right;
//   outline: 1px solid;
// `;
// const Post2222 = styled.div`
//   width: 50%;
//   height: 100%;
//   outline: 1px solid;
// `;
const PopularBloger = styled.div`
  width: 100%;
  height: 7%;
  outline: 1px solid black;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: end;
  padding-bottom: 1%;
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
  height: 22%;
  padding: 20px 0 0 0;
`;
const Popular = styled.div`
  background-color: #fffdf7;
  width: 90%;
  height: 85%;
  outline: 1px solid;
  display: block;
`;
const EndBox = styled.div`
  width: 100%;
  height: 10%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-top: 1px solid black;
  .enTitle {
    font-weight: 300;
    font-size: 30px;
    line-height: 150%;
  }
  .enText {
    font-weight: 600;
    font-size: 30px;
    line-height: 150%;
  }
`;

export default Main;
