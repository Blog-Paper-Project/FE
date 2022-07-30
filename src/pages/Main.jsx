import React from "react";
import styled from "styled-components";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { api } from "../shared/apis/Apis";

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
import Footer from "../components/main/Footer";
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

  const BestPapers = paper_query?.data.papers;
  // console.log(BestPapers);

  return (
    <>
      <MainBox>
        <Header />
        <MainTop>
          <div className="MainTile">Welcome.</div>
          <div className="MainContent">
            자신의 생각을 글로 적어보아요.
            <br />
            공감 가는 글을 읽고 블로거 주인과 소통하고 싶나요? <br />
            나의 생각을 공유해 나뭇잎을 모으고 댓글뿐만 아니라 화상채팅으로
            소통할 수 있습니다. <br />
            자신만의 이야기로 소통할 수 있는 블로그 PAPER
          </div>
        </MainTop>
        <PostWrap>
          <PostBox>
            <Bigbox>
              {BestPapers?.map((BestPapers, i) => {
                return (
                  <Card key={i}>
                    <Box
                      onClick={() => {
                        navigate(
                          `/paper/${BestPapers?.blogId}/${BestPapers?.postId}`
                        );
                      }}
                    >
                      {BestPapers?.thumbnail === null ? (
                        <img
                          className="postImg"
                          src={`https://source.unsplash.com/collection/${i}`}
                          style={{ width: "100%", height: "100%" }}
                          alt="back"
                        />
                      ) : (
                        <img
                          src={
                            process.env.REACT_APP_S3_URL +
                            `/${BestPapers?.thumbnail}`
                          }
                          alt="img"
                          style={{ width: "100%", height: "100%" }}
                        />
                      )}
                    </Box>
                    <Box1
                      onClick={() => {
                        navigate(
                          `/paper/${BestPapers?.blogId}/${BestPapers?.postId}`
                        );
                      }}
                    >
                      <H4>{BestPapers.title}</H4>
                      <P>{BestPapers.contents}</P>
                    </Box1>
                    <Box2>{BestPapers.createdAt}</Box2>
                    <Box3
                      onClick={() => {
                        navigate(`/paper/${BestPapers?.blogId}`);
                      }}
                    >
                      <div className="by">
                        {BestPapers?.profileImage === null ? (
                          <img
                            className="userProfile"
                            src={defaultUserImage}
                            alt="back"
                          />
                        ) : (
                          <img
                            className="userProfile"
                            src={
                              process.env.REACT_APP_S3_URL +
                              `/${BestPapers?.profileImage}`
                            }
                            alt="img"
                          />
                        )}{" "}
                        by <span>{BestPapers.nickname}</span>
                      </div>
                      <div>
                        <img
                          className="heart"
                          src={process.env.PUBLIC_URL + "/Vector.png"}
                          back_size="100% 100%"
                          alt="icon"
                        />{" "}
                        {BestPapers?.likes}
                      </div>
                    </Box3>
                  </Card>
                );
              })}
            </Bigbox>
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
                const S3 =
                  process.env.REACT_APP_S3_URL +
                  `/${popularUsers.profileImage}`;
                return (
                  <SwiperSlide key={popularUsers.blogId}>
                    <Popular>
                      <PopularImg
                        onClick={() => {
                          navigate(`/paper/${popularUsers.blogId}`);
                        }}
                        src={
                          popularUsers.profileImage === null
                            ? defaultUserImage
                            : S3
                        }
                      />
                      <div className="popularNick">{popularUsers.nickname}</div>
                      <div className="popularIntro">
                        {popularUsers.introduction}
                      </div>
                      {/* <div>인기도 {popularUsers.popularity}</div> */}
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
      </MainBox>
      <Footer />
    </>
  );
};

const MainBox = styled.div`
  background-color: #fffdf7;
  height: 3550px;
`;

const MainTop = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 1904px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #333;
  padding-left: 80px;
  padding-right: 80px;
  margin-top: 60px;
  .MainTile {
    height: 85px;
    width: 600px;
    font-family: Georgia;
    font-size: 95px;
    font-weight: bold;
  }
  .MainContent {
    display: flex;
    justify-content: flex-end;
    align-items: flex-start;
    width: 770px;

    font-size: 15px;
    line-height: 24px;
    /* color: #4c4c4c; */
    color: #333;
    font-family: "Song Myung", serif;
    /* font-style: italic; */
    font-weight: 400;
    text-align: right;
    opacity: 0.7;
  }
`;

const PostWrap = styled.div`
  height: 1680px;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-wrap: wrap;
`;

const PostBox = styled.div`
  width: 1900px;
  height: 1680px;
  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;
`;

const PopularBloger = styled.div`
  width: 100%;
  height: 260px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: end;
  padding-bottom: 25px;
  font-style: normal;
  float: left;
  flex-wrap: wrap;
  .poTitle {
    font-weight: 600;
    font-size: 35px;
    line-height: 170%;
    font-family: "Gmarket Sans";
  }
  .poText {
    font-weight: 300;
    font-size: 20px;
    line-height: 150%;
    font-family: "Gmarket Sans";
  }
`;

const PopularBox = styled.div`
  display: flex;
  width: 90%;
  height: 920px;
  padding: 45px 0 0 0;
  float: left;
  flex-wrap: wrap;
`;

const Popular = styled.div`
  background-color: #f7f5f0f6;
  display: flex;
  align-items: center;
  padding-top: 50px;
  width: 385px;
  height: 410px;
  flex-direction: column;
  float: left;
  gap: 10px;
  border-radius: 6px;
  .popularNick {
    margin-top: 20px;
    margin-bottom: 8px;
    font-family: "Noto Sans";
    font-style: normal;
    font-weight: 600;
    font-size: 28px;
    line-height: 35px;
    color: #333;
  }
  .popularIntro {
    margin-top: 20px;
    margin-bottom: 40px;
    width: 212px;
    height: 76px;
    overflow: hidden;
    font-family: "Noto Sans";
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 19px;
    text-align: center;
    color: #333333;
  }
`;
const PopularImg = styled.img`
  width: 140px;
  height: 140px;
  margin: 0 0 0 0;
  border-radius: 50%;
  align-items: center;
`;
const EndBox = styled.div`
  width: 100%;
  height: 15%;
  display: flex !important;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-family: "Gmarket Sans";
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
const Box = styled.div`
  height: 180px;
  cursor: pointer;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  transform: none;
  transition: all 0s ease 0s;
  box-sizing: border-box;
  background-position: center;
  background-size: cover;
`;
const Box1 = styled.div`
  font-size: 16px;
  text-decoration: none solid rgb(33, 37, 41);
  background-color: #f8f9fa;
  background-position: 0% 0%;
  position: color;
  height: 130px;
  width: 320px;
  cursor: pointer;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  padding-top: 10px;
`;
const H4 = styled.p`
  font-size: 19px;
  font-weight: 700;
  line-height: 24px;
  white-space: nowrap;
  word-spacing: 0px;
  height: 23%;
  width: 320px;
  padding: 0px 15px;
  display: block;
  overflow: hidden;
  cursor: pointer;
  transform: none;
  transition: all 0s ease 0s;
  box-sizing: border-box;
  text-overflow: ellipsis;
`;
const P = styled.div`
  font-size: 14px;
  line-height: 21px;
  text-decoration: none solid rgb(73, 80, 87);
  word-spacing: 0px;
  height: 68%;
  width: 320px;
  margin-top: 10px;
  padding: 0px 15px;
  display: -webkit-box;
  overflow: hidden;
  cursor: pointer;
  transform: none;
  transition: all 0s ease 0s;
  box-sizing: border-box;
  text-overflow: ellipsis;
  white-space: normal;
  word-wrap: break-word;
`;
const Box2 = styled.div`
  color: gray;
  height: 40px;
  line-height: 50px;
  width: 320px;
  min-height: auto;
  min-width: auto;
  display: block;
  background-color: #f8f9fa;
  box-sizing: border-box;
  padding-left: 20px;
  font-size: 14px;
`;

const Box3 = styled.div`
  height: 13%;
  width: 100%;
  border-top: 1px solid #f1f3f5;
  padding: 10px 16px 10px 16px;
  min-height: auto;
  min-width: auto;
  display: flex;
  align-items: center;
  background-color: #f8f9fa;
  font-size: 12px;
  text-decoration: none solid rgb(33, 37, 41);
  word-spacing: 0px;
  cursor: pointer;
  justify-content: space-between;
  box-sizing: border-box;
  .by {
    display: flex;
    align-items: center;
    color: gray;
    gap: 5px;
  }
  span {
    color: black;
    font-weight: 600;
  }

  .userinfo {
    display: flex;
  }
  .heart {
    width: 14px;
  }
  .userProfile {
    width: 25px;
    height: 25px;
    border-radius: 50px;
  }
`;

const Bigbox = styled.div`
  gap: 40px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 50px;
`;
const Card = styled.div`
  width: 320px;
  height: 405px;
  box-shadow: rgb(0 0 0 / 7%) 0px 3px 5px 0px;
  transition: box-shadow 0.25s ease-in 0s, transform 0.25s ease-in 0s;
  overflow: hidden;
  border-radius: 5px;
  &:hover {
    transform: translateY(-8px);
    box-shadow: rgb(0 0 0 / 11%) 0px 12px 20px 0px;
  }
`;

export default Main;
