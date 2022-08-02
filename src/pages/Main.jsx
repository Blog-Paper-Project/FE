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

  const aPapers = paper_query?.data.papers[0];
  const bPapers = paper_query?.data.papers[1];
  const cPapers = paper_query?.data.papers[2];
  const dPapers = paper_query?.data.papers[3];
  const ePapers = paper_query?.data.papers[4];
  const fPapers = paper_query?.data.papers[5];
  const gPapers = paper_query?.data.papers[6];

  // console.log(aPapers);
  const handleClick = (e) => {
//     console.log(e);
    navigate("/paper/allpapers", { state: e });
  };

  return (
    <>
      <MainBox>
        <Header />
        <CategoryWrap>
          <div className="CategoryBox">
            <Category
              onClick={() => {
                handleClick("All");
              }}
            >
              All
            </Category>
            <Category
              onClick={() => {
                handleClick("Art");
              }}
            >
              Art
            </Category>
            <Category
              onClick={() => {
                handleClick("Sport");
              }}
            >
              Sport
            </Category>
            <Category
              onClick={() => {
                handleClick("Daily");
              }}
            >
              Daily
            </Category>
            <Category
              onClick={() => {
                handleClick("Food");
              }}
            >
              Food
            </Category>
            <Category
              onClick={() => {
                handleClick("Tour");
              }}
            >
              Tour
            </Category>
            <Category
              onClick={() => {
                handleClick("Study");
              }}
            >
              Study
            </Category>
            <Category
              onClick={() => {
                handleClick("Shopping");
              }}
            >
              Shopping
            </Category>
            <Category
              onClick={() => {
                handleClick("Pet");
              }}
            >
              Pet
            </Category>
          </div>
        </CategoryWrap>
        <PostWrap>
          <PostBox>
            <PostWrap1>
              <Post1st
                onClick={() => {
                  navigate(`/paper/${aPapers?.blogId}/${aPapers?.postId}`);
                }}
              >
                <img
                  className="postImg"
                  src={
                    aPapers?.thumbnail === null
                      ? "https://source.unsplash.com/collection/1"
                      : process.env.REACT_APP_S3_URL + `/${aPapers?.thumbnail}`
                  }
                  alt="back"
                />
                <div className="postTitle">{aPapers?.title}</div>
                <div className="contents">{aPapers?.contents}</div>
              </Post1st>
              <Post2st
                onClick={() => {
                  navigate(`/paper/${bPapers?.blogId}/${bPapers?.postId}`);
                }}
              >
                <div className="postTitle">{bPapers?.title}</div>
                <div className="contents">{bPapers?.contents}</div>
              </Post2st>
              <Post3st
                onClick={() => {
                  navigate(`/paper/${cPapers?.blogId}/${cPapers?.postId}`);
                }}
              >
                <div className="postTitle">{cPapers?.title}</div>
                <div className="contents">{cPapers?.contents}</div>
              </Post3st>
            </PostWrap1>

            <Post4st
              onClick={() => {
                navigate(`/paper/${dPapers?.blogId}/${dPapers?.postId}`);
              }}
            >
              <img
                className="postImg"
                src={
                  dPapers?.thumbnail === null
                    ? "https://source.unsplash.com/collection/1"
                    : process.env.REACT_APP_S3_URL + `/${dPapers?.thumbnail}`
                }
                alt="back"
              />
              <div className="postTitle">{dPapers?.title}</div>
              <div className="contents">{dPapers?.contents}</div>
            </Post4st>

            <PostWrap2>
              <Post5st
                onClick={() => {
                  navigate(`/paper/${ePapers?.blogId}/${ePapers?.postId}`);
                }}
              >
                <div className="postTitle">{ePapers?.title}</div>
                <div className="contents">{ePapers?.contents}</div>
              </Post5st>
              <Post6st
                onClick={() => {
                  navigate(`/paper/${fPapers?.blogId}/${fPapers?.postId}`);
                }}
              >
                <div className="postTitle">{fPapers?.title}</div>
                <div className="contents">{fPapers?.contents}</div>
              </Post6st>
              <Post7st
                onClick={() => {
                  navigate(`/paper/${gPapers?.blogId}/${gPapers?.postId}`);
                }}
              >
                <img
                  className="postImg"
                  src={
                    gPapers?.thumbnail === null
                      ? "https://source.unsplash.com/collection/1"
                      : process.env.REACT_APP_S3_URL + `/${gPapers?.thumbnail}`
                  }
                  alt="back"
                />
                <div className="postTitle">{gPapers?.title}</div>
                <div className="contents">{gPapers?.contents}</div>
              </Post7st>
            </PostWrap2>
          </PostBox>
          <CenterPostWrap>
            <CenterPostBox>
              <img alt="" />
              <div className="PostBox"></div>
            </CenterPostBox>
          </CenterPostWrap>
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
  display: flex;
  justify-content: center;
  flex-direction: column;
`;
const CategoryWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 60px;
  border-bottom: 1px solid #a7aca1;

  .CategoryBox {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    width: 1227px;
    height: 60px;
    font-family: "Gmarket Sans Light";
    font-size: 18px;
    font-weight: 300;
    line-height: 27px;
  }
`;
const Category = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100px;
  cursor: pointer;
  :hover {
    display: flex;
    justify-content: center;
    width: 100px;
    height: auto;
    font-family: "Gmarket Sans";
    font-weight: 400;
    border-bottom: 2px solid;
    transition: all 0.25s ease-in-out 0s c;
  }
`;

const PostWrap = styled.div`
  height: 1577px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  /* border-top: 2px solid #a7aca1; */
  padding-top: 100px;
`;

const PostBox = styled.div`
  height: 1020px;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 24px;
  margin-bottom: 56px;
`;
const PostWrap1 = styled.div`
  display: flex;
  flex-direction: column;
  width: 438px;
  height: 996px;
  float: left;
  gap: 24px;
`;
const Post1st = styled.div`
  width: 438px;
  height: 498px;
  float: left;
  border-bottom: 1px solid #a7aca1;
  .postImg {
    width: 438px;
    height: 282px;
    object-fit: "cover";
    margin-bottom: 15px;
  }
  .postTitle {
    width: 438px;
    height: 90px;
    overflow: hidden;
    font-family: "Gmarket Sans";
    font-style: normal;
    font-weight: 400;
    font-size: 30px;
    line-height: 150%;
    margin-bottom: 15px;
    padding-right: 80px;
    letter-spacing: -0.005em;
  }
  .contents {
    width: 438px;
    height: 72px;
    overflow: hidden;
    font-family: "Gmarket Sans Light";
    font-style: normal;
    font-weight: 300;
    font-size: 20px;
    line-height: 120%;
    margin-bottom: 24px;
    letter-spacing: -0.005em;
  }
`;
const Post2st = styled.div`
  width: 438px;
  height: 237px;
  float: left;
  border-bottom: 1px solid #a7aca1;
  .postTitle {
    width: 438px;
    height: 90px;
    overflow: hidden;
    font-family: "Gmarket Sans";
    font-style: normal;
    font-weight: 400;
    font-size: 30px;
    line-height: 150%;
    padding-right: 80px;
    letter-spacing: -0.005em;
    margin-top: 36px;
    margin-bottom: 15px;
  }
  .contents {
    width: 438px;
    height: 72px;
    overflow: hidden;
    font-family: "Gmarket Sans Light";
    font-style: normal;
    font-weight: 300;
    font-size: 20px;
    line-height: 120%;
    margin-bottom: 24px;
    letter-spacing: -0.005em;
  }
`;
const Post3st = styled.div`
  width: 438px;
  height: 213px;
  float: left;
  .postTitle {
    width: 438px;
    height: 85px;
    overflow: hidden;
    font-family: "Gmarket Sans";
    font-style: normal;
    font-weight: 400;
    font-size: 30px;
    line-height: 150%;
    margin-bottom: 15px;
    padding-right: 80px;
    letter-spacing: -0.005em;
    margin-top: 36px;
  }
  .contents {
    width: 438px;
    height: 72px;
    overflow: hidden;
    font-family: "Gmarket Sans Light";
    font-style: normal;
    font-weight: 300;
    font-size: 20px;
    line-height: 120%;
    margin-bottom: 24px;
    letter-spacing: -0.005em;
  }
`;

const Post4st = styled.div`
  width: 592px;
  height: 996px;
  border-left: 1px solid #a7aca1;
  border-right: 1px solid #a7aca1;
  border-bottom: 1px solid #a7aca1;
  display: flex;
  align-items: center;
  flex-direction: column;
  float: left;
  .postImg {
    width: 592px;
    height: 484px;
    object-fit: "cover";
    margin-bottom: 20px;
  }
  .postTitle {
    width: 544px;
    height: 225px;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    font-family: "Gmarket Sans";
    font-style: normal;
    font-weight: 400;
    font-size: 50px;
    line-height: 150%;
    margin-bottom: 15px;
    letter-spacing: -0.005em;
    padding: 5px 40px;
    text-align: center;
  }
  .contents {
    width: 544px;
    height: 144px;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    font-family: "Gmarket Sans Light";
    font-style: normal;
    font-weight: 300;
    font-size: 20px;
    line-height: 120%;
    padding: 0 24px;
    text-align: center;
    letter-spacing: -0.005em;
  }
`;

const PostWrap2 = styled.div`
  display: flex;
  flex-direction: column;
  width: 438px;
  height: 996px;
  float: left;
  gap: 24px;
`;
const Post5st = styled.div`
  width: 438px;
  height: 237px;
  float: left;
  border-bottom: 1px solid #a7aca1;
  .postTitle {
    width: 438px;
    height: 90px;
    overflow: hidden;
    font-family: "Gmarket Sans";
    font-style: normal;
    font-weight: 400;
    font-size: 30px;
    line-height: 150%;
    padding-right: 80px;
    letter-spacing: -0.005em;
    margin-top: 36px;
    margin-bottom: 15px;
  }
  .contents {
    width: 438px;
    height: 72px;
    overflow: hidden;
    font-family: "Gmarket Sans Light";
    font-style: normal;
    font-weight: 300;
    font-size: 20px;
    line-height: 120%;
    margin-bottom: 24px;
    letter-spacing: -0.005em;
  }
`;
const Post6st = styled.div`
  width: 438px;
  height: 237px;
  float: left;
  border-bottom: 1px solid #a7aca1;
  .postTitle {
    width: 438px;
    height: 90px;
    overflow: hidden;
    font-family: "Gmarket Sans";
    font-style: normal;
    font-weight: 400;
    font-size: 30px;
    line-height: 150%;
    padding-right: 80px;
    letter-spacing: -0.005em;
    margin-top: 36px;
    margin-bottom: 15px;
  }
  .contents {
    width: 438px;
    height: 72px;
    overflow: hidden;
    font-family: "Gmarket Sans Light";
    font-style: normal;
    font-weight: 300;
    font-size: 20px;
    line-height: 120%;
    margin-bottom: 24px;
    letter-spacing: -0.005em;
  }
`;
const Post7st = styled.div`
  width: 438px;
  height: 474px;
  float: left;
  .postImg {
    width: 438px;
    height: 282px;
    object-fit: "cover";
    margin-bottom: 15px;
  }
  .postTitle {
    width: 438px;
    height: 85px;
    overflow: hidden;
    font-family: "Gmarket Sans";
    font-style: normal;
    font-weight: 400;
    font-size: 30px;
    line-height: 150%;
    padding-right: 80px;
    letter-spacing: -0.005em;
    margin-bottom: 15px;
  }
  .contents {
    width: 438px;
    height: 72px;
    overflow: hidden;
    font-family: "Gmarket Sans Light";
    font-style: normal;
    font-weight: 300;
    font-size: 20px;
    line-height: 120%;
    padding-bottom: 5px;
    letter-spacing: -0.005em;
  }
`;
const CenterPostWrap = styled.div`
  display: flex;
  justify-content: center;
  height: 401px;
`;
const CenterPostBox = styled.div`
  width: 1516px;
  /* height: 401px; */
//   border: 1px solid;
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
    font-family: "Gmarket Sans Light";
  }
`;

const PopularBox = styled.div`
  display: flex;
  width: 100%;
  height: 820px;
  flex-wrap: wrap;
  border-top: 1px solid #a7aca1;
  border-bottom: 1px solid #a7aca1;
`;

const Popular = styled.div`
  display: flex;
  align-items: center;
  padding-top: 50px;
  width: 506px;
  height: 410px;
  flex-direction: column;
  float: left;
  border: 1px solid #a7aca1;

  .popularNick {
    margin-top: 30px;
    margin-bottom: 8px;
    font-family: "Gmarket Sans";
    font-style: normal;
    font-weight: 600;
    font-size: 28px;
    line-height: 35px;
    color: #333;
  }
  .popularIntro {
    margin-top: 25px;
    margin-bottom: 40px;
    width: 212px;
    height: 76px;
    overflow: hidden;
    font-family: "Noto Sans";
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 27px;
    letter-spacing: 0.3%;
    text-align: center;
    color: #333333;
  }
`;
const PopularImg = styled.img`
  width: 100px;
  height: 100px;
  margin: 0 0 0 0;
  border-radius: 50%;
  align-items: center;
`;
const EndBox = styled.div`
  width: 100%;
  margin-top: 130px;
  height: 150px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-style: normal;
  .enTitle {
    font-weight: 300;
    font-size: 30px;
    line-height: 150%;
    font-family: "Gmarket Sans Light";
  }
  .enText {
    font-weight: 400;
    font-size: 30px;
    line-height: 150%;
    font-family: "Gmarket Sans";
  }
`;

export default Main;
