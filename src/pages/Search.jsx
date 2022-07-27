import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import Header from "../components/main/Header";
import { __searchPost } from "../redux/modules/Search";

const Search = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const datas = useSelector((state) => state.searchReducer.data);
  const { payload } = useParams();

  useEffect(() => {
    dispatch(__searchPost(payload));
  }, [dispatch]);
  console.log(datas)
  return (
    <>
      <Header />
      <PostBox>
        <HeadTitle>"{payload}"로 검색</HeadTitle>
        <Wrap>
          {datas?.papers?.map((data) => (
            <Post
              key={data}
              onClick={() => {
                navigate("/");
              }}
            >
              <Title>{data.title}</Title>
              <Contents>{data.contents}</Contents>
              <Create>{data.createdAt}</Create>
              <Update>{data.updatedAt}</Update>
            </Post>
          ))}
        </Wrap>
      </PostBox>
    </>
  );
};

const PostBox = styled.div`
  padding-top: 72px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 100px;
`;

const HeadTitle = styled.h2`
  font-size: 32px;
  font-weight: 600;
  letter-spacing: -0.6px;
  text-align: center;
`;

const Wrap = styled.div`
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  width: 980px;
  margin: 0 auto;
  gap: 30px;
`;

const Post = styled.div`
  background-color: gray;
  width: calc(25% - 44px);
  margin-bottom: 56px;
  display: block;
`;

// const Image = styled.div`
//   width: 100%;
//   padding-top: 100%;
//   position: relative;
//   overflow: hidden;
//   border-radius: 12px;
//   box-shadow: inset 0px 0px 0px 1px rgb(0 0 0 / 15%);
//   box-sizing: border-box;
// `;

// const Desc = styled.div`
//   margin-top: 12px;
// `;

const Title = styled.p`
  font-size: 16px;
  letter-spacing: -0.02px;
  overflow: hidden;
  text-overflow: nowrap;
  margin-bottom: 4px;
  line-height: 1.5;
  font-weight: normal;
`;

const Contents = styled.p`
  font-size: 15px;
  font-weight: 700;
  margin-bottom: 4px;
  line-height: 1.5;
`;

const Create = styled.p`
  font-size: 16px;
  letter-spacing: -0.02px;
  overflow: hidden;
  text-overflow: nowrap;
  margin-bottom: 4px;
  line-height: 1.5;
  font-weight: normal;
`;

const Update = styled.p`
  font-size: 16px;
  letter-spacing: -0.02px;
  overflow: hidden;
  text-overflow: nowrap;
  margin-bottom: 4px;
  line-height: 1.5;
  font-weight: normal;
`;

export default Search;
