import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import Header from "../components/main/Header";
import { __searchPost } from "../redux/modules/Search";
import defaultUserImage from "../public/images/default_profile.png";
import Footer from "../components/main/Footer";

const Search = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const datas = useSelector((state) => state.searchReducer.data);
  const { payload } = useParams();

  useEffect(() => {
    dispatch(__searchPost(payload));
  }, [dispatch]);
  console.log(datas);
  const SearchPaper = datas.papers;
  console.log(SearchPaper)

  return (
    <>
      <Wrap>
        <Header />
        <HeadTitle>"{payload}"로 검색한 결과</HeadTitle>
        <Bigbox>
          {SearchPaper?.map((SearchPaper, i) => {
            return (
              <Card key={i}>
                <Box
                  onClick={() => {
                    navigate(
                      `/paper/${SearchPaper?.Users.blogId}/${SearchPaper?.postId}`
                    );
                  }}
                >
                  {SearchPaper?.thumbnail === null ? (
                    <img
                      className="postImg"
                      src={`https://source.unsplash.com/collection/${i}`}
                      style={{ width: "100%", height: "100%" }}
                      alt="back"
                    />
                  ) : (
                    <img
                      src={
                        process.env.REACT_APP_S3_URL +
                        `/${SearchPaper?.thumbnail}`
                      }
                      alt="img"
                      style={{ width: "100%", height: "100%" }}
                    />
                  )}
                </Box>
                <Box1
                  onClick={() => {
                    navigate(
                      `/paper/${SearchPaper?.Users.blogId}/${SearchPaper?.postId}`
                    );
                  }}
                >
                  <H4>{SearchPaper.title}</H4>
                  <P>{SearchPaper.contents}</P>
                </Box1>
                <Box2>{SearchPaper.createdAt}</Box2>
                <Box3
                  onClick={() => {
                    navigate(`/paper/${SearchPaper?.Users.blogId}`);
                  }}
                >
                  <div className="by">
                    {SearchPaper?.Users.profileImage === null ? (
                      <img
                        className="userProfile"
                        src={defaultUserImage}
                        alt="back"
                      />
                    ) : (
                      <img
                        className="userProfile"
                        src={
                          process.env.REACT_APP_S3_URL +
                          `/${SearchPaper?.Users.profileImage}`
                        }
                        alt="img"
                      />
                    )}{" "}
                    by <span>{SearchPaper.Users.nickname}</span>
                  </div>
                  <div>
                    <img
                      className="heart"
                      src={process.env.PUBLIC_URL + "/Vector.png"}
                      back_size="100% 100%"
                      alt="icon"
                    />{" "}
                    {SearchPaper.Likes.length}
                  </div>
                </Box3>
              </Card>
            );
          })}
        </Bigbox>
        <Footer />
      </Wrap>
    </>
  );
};

const HeadTitle = styled.h2`
  font-size: 32px;
  font-weight: 600;
  letter-spacing: -0.6px;
  text-align: center;
  margin-top: 100px;
`;

const Wrap = styled.div`
  display: block;
  height: auto;
  width: 100%;
  background-color: #fffdf7;
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
  min-height: 700px;
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
`;

export default Search;
