import React from "react";
import styled from "styled-components";
import { useQuery } from "react-query";
import { useLocation, useNavigate } from "react-router-dom";
import { api } from "../shared/apis/Apis";

/* 컴포넌트 */
import Header from "../components/main/Header";
import Footer from "../components/main/Footer";
import defaultUserImage from "../public/images/default_profile.png";
import { useState } from "react";

const AllPaper = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  // const [category, setCategory] = useState(state);

  // console.log(category);

  // const handleClick = (e) => {
  //   setCategory(e)
  // };

  const paperLists = async () => {
    const res = await api.get("/api/paper/posts");
    return res;
  };

  const { data: paper_query } = useQuery(["paper_lists", state], paperLists, {
    staleTime: 0,
    onSuccess: (data) => {
      console.log(paper_query);
      return data;
    },
  });
  const Papers = paper_query?.data.papers;
  // console.log(Papers);
  const SelectCategoryData = Papers?.filter(
    (PostsData) => PostsData.category === state
  );
  console.log(SelectCategoryData);
  return (
    <>
      <Wrap>
        <Header />
        {/* <CategoryWrap>
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
        </CategoryWrap> */}
        {Papers && state === "All" ? (
          <>
            <Bigbox>
              {Papers?.map((Papers, i) => {
                return (
                  <Card key={i}>
                    <Box
                      onClick={() => {
                        navigate(
                          `/paper/${Papers?.Users.blogId}/${Papers?.postId}`
                        );
                      }}
                    >
                      {Papers?.thumbnail === null ? (
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
                            `/${Papers?.thumbnail}`
                          }
                          alt="img"
                          style={{ width: "100%", height: "100%" }}
                        />
                      )}
                    </Box>
                    <Box1
                      onClick={() => {
                        navigate(
                          `/paper/${Papers?.Users.blogId}/${Papers?.postId}`
                        );
                      }}
                    >
                      <H4>{Papers.title}</H4>
                      <P>{Papers.contents}</P>
                    </Box1>
                    <Box2>{Papers.createdAt}</Box2>
                    <Box3
                      onClick={() => {
                        navigate(`/paper/${Papers?.Users.blogId}`);
                      }}
                    >
                      <div className="by">
                        {Papers?.Users.profileImage === null ? (
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
                              `/${Papers?.Users.profileImage}`
                            }
                            alt="img"
                          />
                        )}{" "}
                        by <span>{Papers.Users.nickname}</span>
                      </div>
                      <div>
                        <img
                          className="heart"
                          src={process.env.PUBLIC_URL + "/Vector.png"}
                          back_size="100% 100%"
                          alt="icon"
                        />{" "}
                        {Papers.Likes.length}
                      </div>
                    </Box3>
                  </Card>
                );
              })}
            </Bigbox>
          </>
        ) : (
          <>
            <Bigbox>
              {SelectCategoryData?.map((SelectCategoryData, i) => {
                return (
                  <Card key={i}>
                    <Box
                      onClick={() => {
                        navigate(
                          `/paper/${SelectCategoryData?.Users.blogId}/${SelectCategoryData?.postId}`
                        );
                      }}
                    >
                      {SelectCategoryData?.thumbnail === null ? (
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
                            `/${SelectCategoryData?.thumbnail}`
                          }
                          alt="img"
                          style={{ width: "100%", height: "100%" }}
                        />
                      )}
                    </Box>
                    <Box1
                      onClick={() => {
                        navigate(
                          `/paper/${SelectCategoryData?.Users.blogId}/${SelectCategoryData?.postId}`
                        );
                      }}
                    >
                      <H4>{SelectCategoryData.title}</H4>
                      <P>{SelectCategoryData.contents}</P>
                    </Box1>
                    <Box2>{SelectCategoryData.createdAt}</Box2>
                    <Box3
                      onClick={() => {
                        navigate(`/paper/${SelectCategoryData?.Users.blogId}`);
                      }}
                    >
                      <div className="by">
                        {SelectCategoryData?.Users.profileImage === null ? (
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
                              `/${SelectCategoryData?.Users.profileImage}`
                            }
                            alt="img"
                          />
                        )}{" "}
                        by <span>{SelectCategoryData.Users.nickname}</span>
                      </div>
                      <div>
                        <img
                          className="heart"
                          src={process.env.PUBLIC_URL + "/Vector.png"}
                          back_size="100% 100%"
                          alt="icon"
                        />{" "}
                        {SelectCategoryData.Likes.length}
                      </div>
                    </Box3>
                  </Card>
                );
              })}
            </Bigbox>
          </>
        )}

        <Footer />
      </Wrap>
    </>
  );
};

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
  margin-top: 100px;
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

export default AllPaper;
