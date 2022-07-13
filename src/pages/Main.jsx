import React, { useState } from "react";
import styled from "styled-components";
import { useQuery } from "react-query";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/grid";
import "swiper/css/pagination";

// import required modules
import { Grid, Pagination } from "swiper";

/* 컴포넌트 */
import Header from "../components/main/Header";
import "./Main.css";
import { useNavigate } from "react-router-dom";
import { api } from "../shared/apis/Apis";
import { socket } from "../App";
import Footer from "../components/main/Footer";

const Main = () => {
  const navigate = useNavigate();
  const paperList = () => {
    return api.get("/api/paper/");
  };

  const { data: paper_query } = useQuery("paper_list", paperList, {
    staleTime: 50000,
    onSuccess: (data) => {
      console.log(data);
    },
  });
  // // console.log(socket.id)
  const aPapers = new Array(paper_query?.data.papers[0]);
  const bPapers = new Array(paper_query?.data.papers[1]);
  const cPapers = new Array(paper_query?.data.papers[2]);
  const dPapers = new Array(paper_query?.data.papers[3]);
  const ePapers = new Array(paper_query?.data.papers[4]);
  const fPapers = new Array(paper_query?.data.papers[5]);
  const gPapers = new Array(paper_query?.data.papers[6]);
  const hPapers = new Array(paper_query?.data.papers[7]);
  const iPapers = new Array(paper_query?.data.papers[8]);
  const jPapers = new Array(paper_query?.data.papers[9]);
  const kPapers = new Array(paper_query?.data.papers[10]);

  return (
    <>
      <MainBox>
        <Header />
        <MainTop>
          <div>The PAPER | write</div>
          <div>PAPER에 담긴 아름다운 작품을 감상해 보세요.</div>
          <div>글을 써서 나뭇잎을 모아 나무로 만드세요.</div>
        </MainTop>
        <PostBox>
          {/* 왼쪽글 */}
          <Post1>
            {aPapers.map((item, postId) => {
              return (
                <Post11
                  onClick={() => {
                    navigate(`/paper/${item.userId}/${item?.postId}`);
                  }}
                >
                  <div>
                    <div key={postId}>
                      <p>유저아이디= {item?.userId}</p>
                      <img src="" />
                      <p>라이크={item?.likes}</p>
                      <p>타이틀={item?.title}</p>
                      <p>포스트번호={item?.postId}</p>
                    </div>
                  </div>
                </Post11>
              );
            })}
            <Post12>
              <Post121>
                {bPapers.map((item, postId) => {
                  return (
                    <Post1211
                      onClick={() => {
                        navigate(`/paper/${item.userId}/${item.postId}`);
                      }}
                    >
                      <div>
                        <div key={postId}>
                          <p>유저아이디= {item?.userId}</p>
                          <img src="" />
                          <p>라이크={item?.likes}</p>
                          <p>타이틀={item?.title}</p>
                          <p>포스트번호={item?.postId}</p>{" "}
                        </div>
                      </div>
                    </Post1211>
                  );
                })}
                {cPapers.map((item, postId) => {
                  return (
                    <Post1212
                      onClick={() => {
                        navigate(`/paper/${item.userId}/${item.postId}`);
                      }}
                    >
                      <div>
                        <div key={postId}>
                          <p>유저아이디= {item?.userId}</p>
                          <img src="" />
                          <p>라이크={item?.likes}</p>
                          <p>타이틀={item?.title}</p>
                          <p>포스트번호={item?.postId}</p>{" "}
                        </div>
                      </div>
                    </Post1212>
                  );
                })}
              </Post121>
              <Post122>
                {dPapers.map((item, postId) => {
                  return (
                    <Post1221
                      onClick={() => {
                        navigate(`/paper/${item.userId}/${item.postId}`);
                      }}
                    >
                      <div>
                        <div key={postId}>
                          <p>유저아이디= {item?.userId}</p>
                          <img src="" />
                          <p>라이크={item?.likes}</p>
                          <p>타이틀={item?.title}</p>
                          <p>포스트번호={item?.postId}</p>{" "}
                        </div>
                      </div>
                    </Post1221>
                  );
                })}
                {ePapers.map((item, postId) => {
                  return (
                    <Post1222
                      onClick={() => {
                        navigate(`/paper/${item.userId}/${item.postId}`);
                      }}
                    >
                      <div>
                        <div key={postId}>
                          <p>유저아이디= {item?.userId}</p>
                          <img src="" />
                          <p>라이크={item?.likes}</p>
                          <p>타이틀={item?.title}</p>
                          <p>포스트번호={item?.postId}</p>{" "}
                        </div>
                      </div>
                    </Post1222>
                  );
                })}
              </Post122>
            </Post12>
          </Post1>
          {/* 오른쪽글 */}
          <Post2>
            <Post21>
              {fPapers.map((item, postId) => {
                return (
                  <Post211
                    onClick={() => {
                      navigate(`/paper/${item.userId}/${item.postId}`);
                    }}
                  >
                    <div>
                      <div key={postId}>
                        <p>유저아이디= {item?.userId}</p>
                        <img src="" />
                        <p>라이크={item?.likes}</p>
                        <p>타이틀={item?.title}</p>
                        <p>포스트번호={item?.postId}</p>{" "}
                      </div>
                    </div>
                  </Post211>
                );
              })}
              <Post212>
                {gPapers.map((item, postId) => {
                  return (
                    <Post2121
                      onClick={() => {
                        navigate(`/paper/${item.userId}/${item.postId}`);
                      }}
                    >
                      <div>
                        <div key={postId}>
                          <p>유저아이디= {item?.userId}</p>
                          <img src="" />
                          <p>라이크={item?.likes}</p>
                          <p>타이틀={item?.title}</p>
                          <p>포스트번호={item?.postId}</p>{" "}
                        </div>
                      </div>
                    </Post2121>
                  );
                })}
                {hPapers.map((item, postId) => {
                  return (
                    <Post2122
                      onClick={() => {
                        navigate(`/paper/${item.userId}/${item.postId}`);
                      }}
                    >
                      <div>
                        <div key={postId}>
                          <p>유저아이디= {item?.userId}</p>
                          <img src="" />
                          <p>라이크={item?.likes}</p>
                          <p>타이틀={item?.title}</p>
                          <p>포스트번호={item?.postId}</p>{" "}
                        </div>
                      </div>
                    </Post2122>
                  );
                })}
              </Post212>
            </Post21>
            <Post22>
              {iPapers.map((item, postId) => {
                return (
                  <Post221
                    onClick={() => {
                      navigate(`/paper/${item.userId}/${item.postId}`);
                    }}
                  >
                    <div>
                      <div key={postId}>
                        <p>유저아이디= {item?.userId}</p>
                        <img src="" />
                        <p>라이크={item?.likes}</p>
                        <p>타이틀={item?.title}</p>
                        <p>포스트번호={item?.postId}</p>{" "}
                      </div>
                    </div>
                  </Post221>
                );
              })}
              <Post222>
                {jPapers.map((item, postId) => {
                  return (
                    <Post2221
                      onClick={() => {
                        navigate(`/paper/${item.userId}/${item.postId}`);
                      }}
                    >
                      <div>
                        <div key={postId}>
                          <p>유저아이디= {item?.userId}</p>
                          <img src="" />
                          <p>라이크={item?.likes}</p>
                          <p>타이틀={item?.title}</p>
                          <p>포스트번호={item?.postId}</p>{" "}
                          <p>포스트번호={item?.postId}</p>
                        </div>
                      </div>
                    </Post2221>
                  );
                })}
                {kPapers.map((item, postId) => {
                  return (
                    <Post2222
                      onClick={() => {
                        navigate(`/paper/${item.userId}/${item.postId}`);
                      }}
                    >
                      <div>
                        <div key={postId}>
                          <p>유저아이디= {item?.userId}</p>
                          <img src="" />
                          <p>라이크={item?.likes}</p>
                          <p>타이틀={item?.title}</p>
                          <p>포스트번호={item?.postId}</p>{" "}
                        </div>
                      </div>
                    </Post2222>
                  );
                })}
              </Post222>
            </Post22>
          </Post2>
        </PostBox>
        {/* {paper_query &&
            paper_query?.data.papers.map((papers) => {
              return (
                <BestPaper key={papers.postId}>
                  <div>글제목 = {papers.title}</div>
                  <div>글쓴이 = {papers.userId}</div>
                  <div>추천수 = {papers.likes}</div>
                  <div>태그 = {papers.thumbnail}</div>
                </BestPaper>
              );
            })} */}

        <PopularBloger>
          <div>인기 블로거</div>
          <div>Popular Bloger</div>
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
          <div>PAPER에 담긴 아름다운 작품을 감상해 보세요.</div>
          <div>글을 써서 나뭇잎을 모아 나무로 만드세요</div>
        </EndBox>
        <Footer />
      </MainBox>
    </>
  );
};

const MainBox = styled.div`
  background-color: #e5e2db;
  height: 4096px;
`;
const MainTop = styled.div`
  width: 100%;
  height: 9%;
  border-bottom: 1px solid #acacac;
  text-align: center;
`;
const PostBox = styled.div`
  width: 100%;
  height: 46%;
`;
const Post1 = styled.div`
  width: 50%;
  height: 100%;
  background-color: black;
  float: left;
`;
const Post11 = styled.div`
  width: 100%;
  height: 54%;
  background-color: yellow;
`;
const Post12 = styled.div`
  width: 100%;
  height: 46%;
  background-color: blue;
`;
const Post121 = styled.div`
  width: 50%;
  height: 100%;
  background-color: white;
  float: left;
`;
const Post1211 = styled.div`
  width: 100%;
  height: 50%;
  background-color: green;
`;
const Post1212 = styled.div`
  width: 100%;
  height: 50%;
  background-color: purple;
`;
const Post122 = styled.div`
  width: 50%;
  height: 100%;
  background-color: brown;
  float: right;
`;
const Post1221 = styled.div`
  width: 100%;
  height: 50%;
  background-color: blue;
`;
const Post1222 = styled.div`
  width: 100%;
  height: 50%;
  background-color: red;
`;
const Post2 = styled.div`
  width: 50%;
  height: 100%;
  background-color: black;
  float: left;
`;
const Post21 = styled.div`
  width: 100%;
  height: 54%;
  background-color: gray;
`;
const Post211 = styled.div`
  width: 100%;
  height: 50%;
  background-color: blue;
`;
const Post212 = styled.div`
  width: 100%;
  height: 50%;
  background-color: purple;
  float: left;
`;
const Post2121 = styled.div`
  width: 50%;
  height: 100%;
  background-color: brown;
  float: right;
`;
const Post2122 = styled.div`
  width: 50%;
  height: 100%;
  background-color: white;
`;
const Post22 = styled.div`
  width: 100%;
  height: 46%;
  background-color: lime;
`;
const Post221 = styled.div`
  width: 100%;
  height: 50%;
  background-color: #1db6ca;
`;
const Post222 = styled.div`
  width: 100%;
  height: 50%;
  background-color: #829629;
`;
const Post2221 = styled.div`
  width: 50%;
  height: 100%;
  background-color: #c21f7e;
  float: right;
`;
const Post2222 = styled.div`
  width: 50%;
  height: 100%;
  background-color: #7c24b6;
`;

const PopularBloger = styled.div`
  width: 100%;
  height: 5%;
  border-top: 1px solid #acacac;
  border-bottom: 1px solid #acacac;
  text-align: center;
`;

const PopularBox = styled.div`
  width: 90vw;
  height: 20%;
`;

const BestPaper = styled.div`
  background-color: green;
  width: 200px;
  margin-bottom: 56px;
  display: block;
`;
const Popular = styled.div`
  background-color: pink;
  width: 200px;
  height: 200px;
  margin-bottom: 56px;
  display: block;
`;
const EndBox = styled.div`
  width: 100%;
  height: 9%;
  border-top: 1px solid #acacac;
  border-bottom: 1px solid #acacac;
  text-align: center;
`;

export default Main;
