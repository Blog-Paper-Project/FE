import React from "react";
import styled from "styled-components";
import { useQuery } from "react-query";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Pagination } from "swiper";

/* 컴포넌트 */
import Header from "../components/main/Header";
import "./Main.css";
import { useNavigate } from "react-router-dom";
import { api } from "../shared/apis/Apis";

const Main = () => {
  const navigate = useNavigate;

  const paperList = () => {
    return api.get("/api/paper/");
  };

  const { data: paper_query } = useQuery("paper_list", paperList, {
    onSuccess: (data) => {
       console.log(data)
    },
  });
  // console.log(paper_query)
  return (
    <>
      <Header />

      {paper_query &&
        paper_query?.data.papers.map((papers) => {
          return (
            <BestPaper key={papers.postId}>
              <div>글제목 = {papers.title}</div>
              <div>글쓴이 = {papers.userId}</div>
              <div>추천수 = {papers.likes}</div>
            </BestPaper>
          );
        })}
      <Swiper
        slidesPerView={5}
        spaceBetween={10}
        pagination={{
          clickable: true,
        }}
        breakpoints={{
          640: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 4,
            spaceBetween: 40,
          },
          1024: {
            slidesPerView: 5,
            spaceBetween: 50,
          },
        }}
        modules={[Pagination]}
        className="mySwiper"
      >
        {paper_query &&
          paper_query?.data.popularUsers.map((popularUsers) => {
            return (
              <div
                onClick={() => {
                  navigate(``);
                }}
              >
                <SwiperSlide>
                  <Popular key={popularUsers.userId} className="box">
                    <div>닉네임 = {popularUsers.nickname}</div>
                    <div>인기도 = {popularUsers.popularity}</div>
                  </Popular>
                </SwiperSlide>
              </div>
            );
          })}
      </Swiper>
    </>
  );
};

const BestPaper = styled.div`
  background-color: green;
  width: calc(25% - 44px);
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
