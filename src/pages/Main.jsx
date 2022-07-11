import React from "react";
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

const Main = () => {
  const navigate = useNavigate;
  const paperList = () => {
    return api.get("/api/paper/");
  };

  const { data: paper_query } = useQuery("paper_list", paperList, {
    onSuccess: (data) => {
      console.log(data);
    },
  });
  console.log(socket.id)

  return (
    <>
      <Header />
      <PostBox>
        {paper_query &&
          paper_query?.data.papers.map((papers) => {
            return (
              <BestPaper key={papers.postId}>
                <div>글제목 = {papers.title}</div>
                <div>글쓴이 = {papers.userId}</div>
                <div>추천수 = {papers.likes}</div>
                <div>태그 = {papers.thumbnail}</div>
              </BestPaper>
            );
          })}
      </PostBox>

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
                <SwiperSlide key={popularUsers.userId}>

                <div
                  
                  onClick={() => {
                    navigate(``);
                  }}
                >
                  <Popular>
                    <div>{popularUsers.profileImage}</div>
                    <div>닉네임 = {popularUsers.nickname}</div>
                    <div>인기도 = {popularUsers.popularity}</div>
                  </Popular>
                </div>
                </SwiperSlide>

              );
            })}
      </Swiper>

    </>
  );
};

const PostBox = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  justify-content: space-around;
  align-content: center;
  margin-top: 10px;
  margin-left: 60px;
  padding: 100px;
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

export default Main;
