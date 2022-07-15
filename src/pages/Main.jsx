import React from "react";
import styled from "styled-components";
import { useQuery } from "react-query";
import { FaHeart } from "react-icons/fa"

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
            {aPapers.map((item, postId) => {
              return (
                <Post11
                  onClick={() => {
                    navigate(`/paper/${item.userId}/${item?.postId}`);
                  }}
                >
                  <div>
                    <div key={postId}>
                      <p>{item?.thumbnail}</p>
                      <p>타이틀={item?.title}</p>
                      <p>유저아이디= {item?.userId}</p>
                      <p><FaHeart size="12px" />{item?.likes}</p>
                    </div>
                  </div>
                </Post11>
              );
            })}
            <Post12>
              <Post121>
                {dPapers.map((item, postId) => {
                  return (
                    <Post1211
                      onClick={() => {
                        navigate(`/paper/${item.userId}/${item.postId}`);
                      }}
                    >
                      <div>
                        <div key={postId}>
                          <p>{item?.thumbnail}</p>
                          <p>타이틀={item?.title}</p>
                          <p>유저아이디= {item?.userId}</p>
                          <p><FaHeart size="12px" />{item?.likes}</p>
                        </div>
                      </div>
                    </Post1211>
                  );
                })}
                {gPapers.map((item, postId) => {
                  return (
                    <Post1212
                      onClick={() => {
                        navigate(`/paper/${item.userId}/${item.postId}`);
                      }}
                    >
                      <div>
                        <div key={postId}>
                          <p>{item?.thumbnail}</p>
                          <p>타이틀={item?.title}</p>
                          <p>유저아이디= {item?.userId}</p>
                          <p><FaHeart size="12px" />{item?.likes}</p>
                        </div>
                      </div>
                    </Post1212>
                  );
                })}
              </Post121>
              <Post122>
                {ePapers.map((item, postId) => {
                  return (
                    <Post1221
                      onClick={() => {
                        navigate(`/paper/${item.userId}/${item.postId}`);
                      }}
                    >
                      <div>
                        <div key={postId}>
                          <p>{item?.thumbnail}</p>
                          <p>타이틀={item?.title}</p>
                          <p>유저아이디= {item?.userId}</p>
                          <p><FaHeart size="12px" />{item?.likes}</p>
                        </div>
                      </div>
                    </Post1221>
                  );
                })}
                {hPapers.map((item, postId) => {
                  return (
                    <Post1222
                      onClick={() => {
                        navigate(`/paper/${item.userId}/${item.postId}`);
                      }}
                    >
                      <div>
                        <div key={postId}>
                          <p>{item?.thumbnail}</p>
                          <p>타이틀={item?.title}</p>
                          <p>유저아이디= {item?.userId}</p>
                          <p><FaHeart size="12px" />{item?.likes}</p>
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
              {bPapers.map((item, postId) => {
                return (
                  <Post211
                    onClick={() => {
                      navigate(`/paper/${item.userId}/${item.postId}`);
                    }}
                  >
                    <div>
                      <div key={postId}>
                        <p>{item?.thumbnail}</p>
                        <p>타이틀={item?.title}</p>
                        <p>유저아이디= {item?.userId}</p>
                        <p><FaHeart size="12px" />{item?.likes}</p>
                      </div>
                    </div>
                  </Post211>
                );
              })}
              <Post212>
                {cPapers.map((item, postId) => {
                  return (
                    <Post2121
                      onClick={() => {
                        navigate(`/paper/${item.userId}/${item.postId}`);
                      }}
                    >
                      <div>
                        <div key={postId}>
                          <p>{item?.thumbnail}</p>
                          <p>타이틀={item?.title}</p>
                          <p>유저아이디= {item?.userId}</p>
                          <p><FaHeart size="12px" />{item?.likes}</p>
                        </div>
                      </div>
                    </Post2121>
                  );
                })}

                <Post2122
                  onClick={() => {
                    navigate(`/paper/`);
                  }}
                >
                  <div>
                    <div>
                      설명

                    </div>
                  </div>
                </Post2122>

              </Post212>
            </Post21>
            <Post22>
              {fPapers.map((item, postId) => {
                return (
                  <Post221
                    onClick={() => {
                      navigate(`/paper/${item.userId}/${item.postId}`);
                    }}
                  >
                    <div>
                      <div key={postId}>
                        <p>{item?.thumbnail}</p>
                        <p>타이틀={item?.title}</p>
                        <p>유저아이디= {item?.userId}</p>
                        <p><FaHeart size="12px" />{item?.likes}</p>
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
                          <p>{item?.thumbnail}</p>
                          <p>타이틀={item?.title}</p>
                          <p>유저아이디= {item?.userId}</p>
                          <p><FaHeart size="12px" />{item?.likes}</p>
                        </div>
                      </div>
                    </Post2221>
                  );
                })}
                {iPapers.map((item, postId) => {
                  return (
                    <Post2222
                      onClick={() => {
                        navigate(`/paper/${item.userId}/${item.postId}`);
                      }}
                    >
                      <div>
                        <div key={postId}>
                          <p>{item?.thumbnail}</p>
                          <p>타이틀={item?.title}</p>
                          <p>유저아이디= {item?.userId}</p>
                          <p><FaHeart size="12px" />{item?.likes}</p>
                        </div>
                      </div>
                    </Post2222>
                  );
                })}
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
                      <div >닉네임 = {popularUsers.nickname}</div>
                      <div>인기도 = {popularUsers.popularity}</div>
                    </Popular>
                  </SwiperSlide>
                );
              })}
          </Swiper>
        </PopularBox>
        <EndBox>
          <div className="enTitle">PAPER에 담긴 아름다운 작품을 감상해 보세요.</div>
          <div className="enText">글을 써서 나뭇잎을 모아 나무로 만드세요</div>
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
  .poTitle{    
    font-weight: 400;
    font-size: 30px;
    line-height: 150%;
  }
  .poText{
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
 
  .enTitle{    
    font-weight: 300;
    font-size: 30px;
    line-height: 150%;
  }
  .enText{
    font-weight: 600;
    font-size: 30px;
    line-height: 150%;
  }
`;

export default Main;
