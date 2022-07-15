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
    const res = await api.get("/api/paper/");
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
          <div>The PAPER</div>
        </MainTop>
        <PostBox>
          {/* 왼쪽글 */}
          <Post1>
            <Post11
              style={{
                position: "relative",
                overflow: "hidden",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <img
                src={process.env.REACT_APP_S3_URL + `/${aPapers?.thumbnail}`}
                alt="img"
                style={{ height: "100%", padding: "5px" }}
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
                  navigate(`/paper/${aPapers?.userId}/${aPapers?.postId}`);
                }}
              >
                <h2>{aPapers?.title}</h2>
                <br />
                {aPapers?.contents && (
                  <ViewEdit
                    contents={aPapers?.contents}
                    style={{ height: "200px" }}
                  />
                )}
                <p>by. {aPapers?.userId}</p>
                <p>
                  <FaHeart size="12px" />
                  {aPapers?.likes}
                </p>
              </div>
            </Post11>

            <Post12>
              <Post121>
                <Post1211
                  onClick={() => {
                    navigate(`/paper/${dPapers?.userId}/${dPapers?.postId}`);
                  }}
                >
                  <div>
                    <p>{dPapers?.thumbnail}</p>
                    <p>타이틀={dPapers?.title}</p>
                    <p>유저아이디= {dPapers?.userId}</p>
                    <p>
                      <FaHeart size="12px" />
                      {dPapers?.likes}
                    </p>
                  </div>
                </Post1211>
                <Post1212
                  onClick={() => {
                    navigate(`/paper/${gPapers?.userId}/${gPapers?.postId}`);
                  }}
                >
                  <div>
                    <p>{gPapers?.thumbnail}</p>
                    <p>타이틀={gPapers?.title}</p>
                    <p>유저아이디= {gPapers?.userId}</p>
                    <p>
                      <FaHeart size="12px" />
                      {gPapers?.likes}
                    </p>
                  </div>
                </Post1212>
              </Post121>
              <Post122>
                <Post1221
                  onClick={() => {
                    navigate(`/paper/${ePapers?.userId}/${ePapers?.postId}`);
                  }}
                >
                  <div>
                    <p>{ePapers?.thumbnail}</p>
                    <p>타이틀={ePapers?.title}</p>

                    <p>유저아이디= {ePapers?.userId}</p>
                    <p>
                      <FaHeart size="12px" />
                      {ePapers?.likes}
                    </p>
                  </div>
                </Post1221>

                <Post1222
                  onClick={() => {
                    navigate(`/paper/${hPapers?.userId}/${hPapers?.postId}`);
                  }}
                >
                  <div>
                    <p>{hPapers?.thumbnail}</p>
                    <p>타이틀={hPapers?.title}</p>

                    <p>유저아이디= {hPapers?.userId}</p>
                    <p>
                      <FaHeart size="12px" />
                      {hPapers?.likes}
                    </p>
                  </div>
                </Post1222>
              </Post122>
            </Post12>
          </Post1>
          {/* 오른쪽글 */}
          <Post2>
            <Post21>
              <Post211
                onClick={() => {
                  navigate(`/paper/${bPapers?.userId}/${bPapers?.postId}`);
                }}
              >
                <div
                  style={{
                    width: "698px",
                    height: "300px",
                    paddingLeft: "30px",
                    paddingTop: "30px",
                  }}
                >
                  <h2>{bPapers?.title}</h2>
                  <ViewEdit
                    contents={bPapers?.contents}
                    style={{ height: "200px" }}
                  />
                  <p>유저아이디= {bPapers?.userId}</p>
                  <p>
                    <FaHeart size="12px" />
                    {bPapers?.likes}
                  </p>
                </div>
              </Post211>
              <Post212>
                <Post2121
                  style={{
                    position: "relative",
                    overflow: "hidden",
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
                    style={{ width:"100%", height: "100%", padding: "5px" }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      bottom: "10%",
                      backgroundColor: "rgba(255, 255, 255, 0.8)",
                      width: "382px",
                      height: "281px",
                    }}
                    onClick={() => {
                      navigate(`/paper/${cPapers?.userId}/${cPapers?.postId}`);
                    }}
                  >
                    <h2>{cPapers?.title}</h2>
                    <br />
                    {cPapers?.contents && (
                      <ViewEdit
                        contents={cPapers?.contents}
                        style={{ height: "200px" }}
                      />
                    )}
                    <p>by. {cPapers?.userId}</p>
                    <p>
                      <FaHeart size="12px" />
                      {cPapers?.likes}
                    </p>
                  </div>
                </Post2121>

                <Post2122
                  onClick={() => {
                    navigate(`/paper/`);
                  }}
                >
                  <div>
                    <div>설명</div>
                  </div>
                </Post2122>
              </Post212>
            </Post21>
            <Post22>
              <Post221
                onClick={() => {
                  navigate(`/paper/${fPapers?.userId}/${fPapers?.postId}`);
                }}
              >
                <div>
                  <p>{fPapers?.thumbnail}</p>
                  <p>타이틀={fPapers?.title}</p>
                  <p>유저아이디= {fPapers?.userId}</p>
                  <p>
                    <FaHeart size="12px" />
                    {fPapers?.likes}
                  </p>
                </div>
              </Post221>

              <Post222>
                <Post2221
                  onClick={() => {
                    navigate(`/paper/${jPapers?.userId}/${jPapers?.postId}`);
                  }}
                >
                  <div>
                    <p>{jPapers?.thumbnail}</p>
                    <p>타이틀={jPapers?.title}</p>
                    <p>유저아이디= {jPapers?.userId}</p>
                    <p>
                      <FaHeart size="12px" />
                      {jPapers?.likes}
                    </p>
                  </div>
                </Post2221>
                <Post2222
                  onClick={() => {
                    navigate(`/paper/${iPapers?.userId}/${iPapers?.postId}`);
                  }}
                >
                  <div>
                    <p>{iPapers?.thumbnail}</p>
                    <p>타이틀={iPapers?.title}</p>
                    <p>유저아이디= {iPapers?.userId}</p>
                    <p>
                      <FaHeart size="12px" />
                      {iPapers?.likes}
                    </p>
                  </div>
                </Post2222>
              </Post222>
            </Post22>
          </Post2>
        </PostBox>
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
                    key={popularUsers.userId}
                    onClick={() => {
                      navigate(`/paper/${popularUsers.userId}`);
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
  height: 4096px;
`;
const MainTop = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 9%;
  outline: 1px solid #acacac;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 90px;
  font-weight: 400;
  line-height: 90px;
`;
const PostBox = styled.div`
  width: 100%;
  height: 46%;
`;
const Post1 = styled.div`
  width: 50%;
  height: 100%;
  float: left;
`;
const Post11 = styled.div`
  width: 100%;
  height: 54%;
  outline: 1px solid #acacac;
`;
const Post12 = styled.div`
  width: 100%;
  height: 46%;
`;
const Post121 = styled.div`
  width: 50%;
  height: 100%;
  float: left;
`;
const Post1211 = styled.div`
  width: 100%;
  height: 50%;
  outline: 1px solid #acacac;
`;
const Post1212 = styled.div`
  width: 100%;
  height: 50%;
  outline: 1px solid #acacac;
`;
const Post122 = styled.div`
  width: 50%;
  height: 100%;
  float: right;
`;
const Post1221 = styled.div`
  width: 100%;
  height: 50%;
  outline: 1px solid #acacac;
`;
const Post1222 = styled.div`
  width: 100%;
  height: 50%;
  outline: 1px solid #acacac;
`;
const Post2 = styled.div`
  width: 50%;
  height: 100%;
  float: left;
`;
const Post21 = styled.div`
  width: 100%;
  height: 54%;
`;
const Post211 = styled.div`
  width: 100%;
  height: 50%;
  outline: 1px solid #acacac;
`;
const Post212 = styled.div`
  width: 100%;
  height: 50%;
  float: left;
`;
const Post2121 = styled.div`
  width: 50%;
  height: 100%;
  float: right;
  outline: 1px solid #acacac;
`;
const Post2122 = styled.div`
  width: 50%;
  height: 100%;
  outline: 1px solid #acacac;
`;
const Post22 = styled.div`
  width: 100%;
  height: 46%;
`;
const Post221 = styled.div`
  width: 100%;
  height: 50%;
  outline: 1px solid #acacac;
`;
const Post222 = styled.div`
  width: 100%;
  height: 50%;
`;
const Post2221 = styled.div`
  width: 50%;
  height: 100%;
  float: right;
  outline: 1px solid #acacac;
`;
const Post2222 = styled.div`
  width: 50%;
  height: 100%;
  outline: 1px solid #acacac;
`;

const PopularBloger = styled.div`
  width: 100%;
  height: 3%;
  outline: 1px solid #acacac;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-top: 3%;
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
  height: 21%;
  padding: 20px 0 0 0;
`;

const Popular = styled.div`
  background-color: #e5e2db;
  width: 500px;
  height: 395px;
  margin-bottom: px;
  outline: 1px solid;
  display: block;
`;
const EndBox = styled.div`
  width: 100%;
  height: 8%;
  border-top: 1px solid #acacac;
  border-bottom: 1px solid #acacac;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  outline: 1px solid #acacac;

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

const Box = styled.div`
  width: 100%;
  height: 100%;
  padding: 10px;
`;

const Content = styled.div`
  width: 80%;
  height: 30%;
  background-color: gray;
  padding: 10px;
  opacity: 0.5;
  gap: 30px;
  > h2 {
    font-size: 40px;
  }
  > p {
    font-size: 20px;
    margin: 32px 0 20px 0;
  }
`;

export default Main;
