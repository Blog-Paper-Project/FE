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
      <Header />
      <MainBox>
        <Wrap>
          {paper_query && paper_query?.data?.data?.papers?.map((item, paper_list) => {
            return (
              <BestPaper key={paper_list}>
                <div>글제목 = {item.title}</div>
                <div>글쓴이 = {item.userId}</div>
                <div>추천수 = {item.likes}</div>
              </BestPaper>
            )
          })}
          {paper_query && paper_query?.data?.data?.popularUsers?.map((item, paper_list) => {
            return (
              <Popular key={paper_list}>
                <div>닉네임 = {item.nickname}</div>
                <div>인기도 = {item.popularity}</div>
              </Popular>
            )
          })}
        </Wrap>
      </MainBox>

    </>
  );
};

const MainBox = styled.div`
  padding-top: 72px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 50px;
`
const Wrap = styled.div`
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  width: 980px;
  margin: 0 auto;
  gap: 30px;
`;

const BestPaper = styled.div`
  background-color: green;
  width: calc(25% - 44px);
  margin-bottom: 56px;
  display: block;
`
const Popular = styled.div`
background-color: pink;
  width: calc(25% - 44px);
  margin-bottom: 56px;
  display: block;
`

export default Main;
