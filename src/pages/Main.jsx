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

  const BestPapers = paper_query?.data.papers
  console.log(BestPapers)

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
            <Bigbox>
              {BestPapers?.map((BestPapers, i) => {
                return (
                  <Card
                    key={i}
                    onClick={() => {
                      navigate(`/paper/${BestPapers?.blogId}/${BestPapers?.postId}`);
                    }}
                  >
                    <Box
                      onClick={() => {
                        navigate(`/paper/${BestPapers?.blogId}/${BestPapers?.postId}`);
                      }}>
                      {BestPapers?.thumbnail === null ? (
                        <img
                          className="postImg"
                          src={'https://picsum.photos/200/300'}
                          style={{ width: "100%", height: "100%" }}
                          alt="back"
                        />
                      ) : (<img
                        src={process.env.REACT_APP_S3_URL + `/${BestPapers?.thumbnail}`}
                        alt="img"
                        style={{ width: "100%", height: "100%" }}
                      />)}
                    </Box>
                    <Box1>
                      <H4>{BestPapers.title}</H4>
                      <P>{BestPapers.contents}</P>
                    </Box1>
                    <Box2>
                      {BestPapers.createdAt}
                    </Box2>
                    <Box3>
                      <div className='by'>
                        {BestPapers?.thumbnail === null ? (
                          <img
                            className="userProfile"
                            src={defaultUserImage}
                            alt="back"
                          />
                        ) : (<img
                          className='userProfile'
                          src={process.env.REACT_APP_S3_URL + `/${BestPapers?.profileImage}`}
                          alt="img"
                          onClick={() => {
                            navigate(`/paper/${BestPapers?.blogId}`);
                          }}
                        />)} by <span>
                          {BestPapers.nickname}
                        </span>
                      </div>
                      <div>
                        <img
                          className="heart"
                          src={process.env.PUBLIC_URL + "/Vector.png"}
                          back_size="100% 100%"
                          alt="icon"
                        /> {BestPapers?.likes}
                      </div>
                    </Box3>
                  </Card>
                )
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
  border-bottom: 1px solid #a7aca1;
`;
const PostWrap = styled.div`
  height: 1680px;
  display: flex;
  justify-content: center;
`;
const PostBox = styled.div`
  width: 1516px;
  height: 1680px;
`;

const PopularBloger = styled.div`
  width: 100%;
  height: 260px;
  border: 1px solid #a7aca1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: end;
  padding-bottom: 25px;
  font-family: "Gmarket Sans";
  font-style: normal;
  float: left;
  flex-wrap: wrap;
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
  display: flex;
  width: 90%;
  height: 920px;
  padding: 20px 0 0 0;
  float: left;
  flex-wrap: wrap;
`;
const Popular = styled.div`
  background-color: #fffdf7;
  display: flex;
  align-items: center;
  padding-top: 50px;
  width: 506px;
  height: 410px;
  border: 1px solid #a7aca1;
  flex-direction: column;
  float: left;
  .popularNick {
    margin-top: 20px;
    font-family: "Gmarket Sans";
    font-style: normal;
    font-weight: 400;
    font-size: 30px;
    line-height: 30px;
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
  width: 100px;
  height: 100px;
  margin: 0 0 0 0;
  border-radius: 100px;
  align-items: center;
`;
const EndBox = styled.div`
  width: 100%;
  height: 10%;
  display: flex !important;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 1px solid #a7aca1;
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
  cursor: pointer;
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
  box-shadow: rgb(0 0 0 / 7%) 0px 4px 16px 0px;
  transition: box-shadow 0.25s ease-in 0s, transform 0.25s ease-in 0s;
  overflow: hidden;
  border-radius: 5px;
  &:hover {
    transform: translateY(-8px);
    box-shadow: rgb(0 0 0 / 11%) 0px 12px 20px 0px;
  }
`

export default Main;
