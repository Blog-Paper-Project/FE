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

  console.log(aPapers)

  return (
    <>

      <MainBox>
        <Header />
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
                  src={aPapers?.thumbnail === null ? ("https://source.unsplash.com/collection/1") : (process.env.REACT_APP_S3_URL + `/${aPapers?.thumbnail}`)}
                  alt="back"
                />
                <div className="postTitle">
                  {aPapers?.title}
                </div>
                <div className="contents">
                  {aPapers?.contents}
                </div>
              </Post1st>
              <Post2st
                onClick={() => {
                  navigate(`/paper/${bPapers?.blogId}/${bPapers?.postId}`);
                }}
              >
                <div className="postTitle">
                  {bPapers?.title}
                </div>
                <div className="contents">
                  {bPapers?.contents}
                </div>
              </Post2st>
              <Post3st
                onClick={() => {
                  navigate(`/paper/${cPapers?.blogId}/${cPapers?.postId}`);
                }}
              >
                <div className="postTitle">
                  {cPapers?.title}
                </div>
                <div className="contents">
                  {cPapers?.contents}
                </div>
              </Post3st>
            </PostWrap1>

            <Post4st
              onClick={() => {
                navigate(`/paper/${dPapers?.blogId}/${dPapers?.postId}`);
              }}
            >
              <img
                className="postImg"
                src={dPapers?.thumbnail === null ? ("https://source.unsplash.com/collection/1") : (process.env.REACT_APP_S3_URL + `/${aPapers?.thumbnail}`)}
                alt="back"
              />
              <div className="postTitle">
                {dPapers?.title}
              </div>
              <div className="contents">
                {dPapers?.contents}
              </div>
            </Post4st>

            <PostWrap2>
              <Post5st
                onClick={() => {
                  navigate(`/paper/${ePapers?.blogId}/${ePapers?.postId}`);
                }}
              >
                <div className="postTitle">
                  {ePapers?.title}
                </div>
                <div className="contents">
                  {ePapers?.contents}
                </div>
              </Post5st>
              <Post6st
                onClick={() => {
                  navigate(`/paper/${fPapers?.blogId}/${fPapers?.postId}`);
                }}>
                <div className="postTitle">
                  {fPapers?.title}
                </div>
                <div className="contents">
                  {fPapers?.contents}
                </div>
              </Post6st>
              <Post7st
                onClick={() => {
                  navigate(`/paper/${gPapers?.blogId}/${gPapers?.postId}`);
                }}
              >
                <img
                  className="postImg"
                  src={gPapers?.thumbnail === null ? ("https://source.unsplash.com/collection/1") : (process.env.REACT_APP_S3_URL + `/${gPapers?.thumbnail}`)}
                  alt="back"
                />
                <div className="postTitle">
                  {gPapers?.title}
                </div>
                <div className="contents">
                  {gPapers?.contents}
                </div>
              </Post7st>
            </PostWrap2>
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
  min-height: 3586px;
  display: flex;
  justify-content: center;
  flex-direction: column;  
`;


const PostWrap = styled.div` 
  min-height: 1637px;
  display: flex;
  justify-content: center;
  padding-top: 160px;
`;

const PostBox = styled.div`
  
  min-height: 1156px;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 24px;
  
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
  border-bottom: 1px solid #A7ACA1;
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
    font-family: 'Gmarket Sans';
    font-style: normal;
    font-weight: 400;
    font-size: 30px;
    line-height: 150%;
    margin-bottom: 15px;
  }
  .contents {
    width: 438px;
    height: 72px;
    overflow: hidden;
    font-family: 'Gmarket Sans';
    font-style: normal;
    font-weight: 300;
    font-size: 20px;
    line-height: 120%;
  }
  &:hover {
    transform: translateY(-8px);
    box-shadow: rgb(0 0 0 / 11%) 0px 12px 20px 0px;
  }
`;
const Post2st = styled.div`
  width: 438px;
  height: 237px;
  float: left;
  border-bottom: 1px solid #A7ACA1;
  .postTitle {
    width: 438px;
    height: 90px;
    display: flex;
    align-items: center;
    overflow: hidden;
    font-family: 'Gmarket Sans';
    font-style: normal;
    font-weight: 400;
    font-size: 30px;
    line-height: 150%;
    margin-top: 36px;
    margin-bottom: 15px;
  }
  .contents {
    width: 438px;
    height: 72px;
    overflow: hidden;
    font-family: 'Gmarket Sans';
    font-style: normal;
    font-weight: 300;
    font-size: 20px;
    line-height: 120%;
  }
  &:hover {
    transform: translateY(-8px);
    box-shadow: rgb(0 0 0 / 11%) 0px 12px 20px 0px;
  }
`;
const Post3st = styled.div`
  width: 438px;
  height: 213px;
  float: left;
  .postTitle {
    width: 438px;
    height: 90px;
    display: flex;
    align-items: center;
    overflow: hidden;
    font-family: 'Gmarket Sans';
    font-style: normal;
    font-weight: 400;
    font-size: 30px;
    line-height: 150%;
    margin-top: 36px;
    margin-bottom: 15px;
  }
  .contents {
    width: 438px;
    height: 72px;
    overflow: hidden;
    font-family: 'Gmarket Sans';
    font-style: normal;
    font-weight: 300;
    font-size: 20px;
    line-height: 120%;
  }
  &:hover {
    transform: translateY(-8px);
    box-shadow: rgb(0 0 0 / 11%) 0px 12px 20px 0px;
  }
`;

const Post4st = styled.div`
  width: 592px;
  height: 996px;
  border: 1px solid #A7ACA1;
  display: flex;
  align-items: center;
  flex-direction: column;
  float: left;
  .postImg {
    width: 592px;
    height: 483px;
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
    font-family: 'Gmarket Sans';
    font-style: normal;
    font-weight: 400;
    font-size: 50px;
    line-height: 150%;
    margin-bottom: 15px;
  }
  .contents {
    width: 544px;
    height: 144px;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    font-family: 'Gmarket Sans';
    font-style: normal;
    font-weight: 300;
    font-size: 20px;
    line-height: 120%;
  }
  &:hover {
    transform: translateY(-8px);
    box-shadow: rgb(0 0 0 / 11%) 0px 12px 20px 0px;
  }
`;

const PostWrap2 = styled.div`
  display: flex;
  flex-direction: column;
  width: 438px;
  height: 996px;
  float: left;
  gap: 24px;  
`
const Post5st = styled.div`
  width: 438px;
  height: 237px;
  float: left;
  border-bottom: 1px solid #A7ACA1;
  .postTitle {
    width: 438px;
    height: 90px;
    display: flex;
    align-items: center;
    overflow: hidden;
    font-family: 'Gmarket Sans';
    font-style: normal;
    font-weight: 400;
    font-size: 30px;
    line-height: 150%;
    margin-top: 36px;
    margin-bottom: 15px;
  }
  .contents {
    width: 438px;
    height: 72px;
    overflow: hidden;
    font-family: 'Gmarket Sans';
    font-style: normal;
    font-weight: 300;
    font-size: 20px;
    line-height: 120%;
  }
  &:hover {
    transform: translateY(-8px);
    box-shadow: rgb(0 0 0 / 11%) 0px 12px 20px 0px;
  }
`;
const Post6st = styled.div`
  width: 438px;
  height: 237px;
  float: left;
  border-bottom: 1px solid #A7ACA1;
  .postTitle {
    width: 438px;
    height: 90px;
    display: flex;
    align-items: center;
    overflow: hidden;
    font-family: 'Gmarket Sans';
    font-style: normal;
    font-weight: 400;
    font-size: 30px;
    line-height: 150%;
    margin-top: 36px;
    margin-bottom: 15px;
  }
  .contents {
    width: 438px;
    height: 72px;
    overflow: hidden;
    font-family: 'Gmarket Sans';
    font-style: normal;
    font-weight: 300;
    font-size: 20px;
    line-height: 120%;
  }
  &:hover {
    transform: translateY(-8px);
    box-shadow: rgb(0 0 0 / 11%) 0px 12px 20px 0px;
  }
`;
const Post7st = styled.div`
  width: 438px;
  height: 498px;
  float: left;
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
    font-family: 'Gmarket Sans';
    font-style: normal;
    font-weight: 400;
    font-size: 30px;
    line-height: 150%;
    margin-bottom: 15px;
  }
  .contents {
    width: 438px;
    height: 72px;
    overflow: hidden;
    font-family: 'Gmarket Sans';
    font-style: normal;
    font-weight: 300;
    font-size: 20px;
    line-height: 120%;
  }
  &:hover {
    transform: translateY(-8px);
    box-shadow: rgb(0 0 0 / 11%) 0px 12px 20px 0px;
  }
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
  margin-top: 30px;
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
  height: 410px;
  display: flex;
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

export default Main;
