import React from "react";
import styled from "styled-components";
import { useQuery } from 'react-query';
import api from "../shared/apis/Apis";


/* 컴포넌트 */
import Header from "../components/main_components/Header";





const Main = () => {

  const paperList = () => {
    return api.get("/api/paper/");
  }

  const paper_query = useQuery("paper_list", paperList, {
    onSuccess: (data) => {
      console.log(data)
    },
  });

  return (
    <>
      <MainBox>
        <Header />
        {paper_query && paper_query?.data?.data?.papers?.map((item, paper_list) => {
          return (
            <BestPaper key={paper_list}>
              <div>글제목 = {item.title}</div>
              <div>글쓴이 = {item.userId}</div>
              <div>추천수 = {item.likes}</div>
            </BestPaper>
          )
        })
        }
        {paper_query && paper_query?.data?.data?.popularUsers?.map((item, index) => {
          return (
            <Popular key={index}>
              <div>닉네임 = {item.nickname}</div>
              <div>인기도 = {item.popularity}</div>
            </Popular>
          )
        })
        }
      </MainBox>

    </>
  );
};

const MainBox = styled.div`
background: none;
  width: 1000px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-row-gap: 3em;
  margin: 150px auto;
  @media screen and (max-width: 1000px) {
    width: 100%;
    grid-template-columns: repeat(2, 2fr);
  }
  @media screen and (max-width: 600px) {
    width: 100%;
    grid-template-columns: repeat(1, 3fr);
  }
`;
const BestPaper = styled.div`

`
const Popular = styled.div`

`

export default Main;
