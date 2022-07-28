import React from 'react'
import styled from "styled-components";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { api } from "../shared/apis/Apis";

/* 컴포넌트 */
import Header from "../components/main/Header";
import Footer from "../components/main/Footer";

const AllPaper = () => {
  const navigate = useNavigate();

  const paperLists = async () => {
    const res = await api.get("/api/paper/posts");
    return res;
  };

  const { data: paper_query } = useQuery("paper_lists", paperLists, {
    staleTime: 0,
    onSuccess: (data) => {
      console.log(paper_query)
      return data;
    },
  });
  const Papers = paper_query?.data.papers
  return (
    <>
      <Wrap>
        <Header />
        <Bigbox>

          {Papers?.map((Papers, i) => {
            return (
              <Card
                key={i}
                onClick={() => {
                  navigate(`/paper/${Papers?.Users.blogId}/${Papers?.postId}`);
                }}
              >
                <Box>
                  {Papers?.thumbnail === null ? (
                    <img
                      className="postImg"
                      src={process.env.PUBLIC_URL + "/post.jpg"}
                      style={{ width: "100%", height: "100%", filter: "brightness(75%)" }}
                      alt="back"
                    />
                  ) : (<img
                    src={process.env.REACT_APP_S3_URL + `/${Papers?.thumbnail}`}
                    alt="img"
                    style={{ width: "100%", height: "100%", filter: "brightness(75%)" }}
                    onClick={() => {
                      navigate(`/paper/${Papers?.Users.blogId}/${Papers?.postId}`);
                    }}
                  />)}
                </Box>
                <Box1>
                  <H4>{Papers.title}</H4>
                  <P>{Papers.contents}</P>
                </Box1>
                <Box2>
                  조회수: {Papers.viewCount}
                </Box2>
                <Box3>
                  <div className='by'>
                    by <span>
                      {Papers.Users.nickname}
                    </span>
                  </div>

                  <div>
                    <img
                      className="heart"
                      src={process.env.PUBLIC_URL + "/Vector.png"}
                      back_size="100% 100%"
                      alt="icon"
                    /> {Papers.Likes.length}
                  </div>

                </Box3>
              </Card>
            )
          })}

        </Bigbox>
        <Footer />
      </Wrap>
    </>
  )
}

const Wrap = styled.div`
  display: block;
  height: auto;
  width: 100%;
`
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
  line-height: 40px;
  width: 320px;
  min-height: auto;
  min-width: auto;
  display: block;
  cursor: pointer;
  background-color: #f8f9fa;
  box-sizing: border-box;
  padding-left: 20px;
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
    color: gray;
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
`;

const Bigbox = styled.div`
  gap: 40px;  
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 50px;
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
`

export default AllPaper