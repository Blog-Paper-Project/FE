import React, { useState } from "react";
import { useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
/* api */
import { apiToken } from "../shared/apis/Apis";
/* 컴포넌트 */
import Header from "../components/main/Header";
/* 해야 할 것 */
//1. 블로그 글 눌러서 들어갔을 때 주소 맨 뒤 params의 postId를 얻어 내야한다.
//2. 아래 map 돌린 거 array 정확히 다 받으면 그거 돌리자
//3. 아래 p 태그 누를 시 페이지 변환할 것 (각각 형태 만들기)
const Paper = () => {
  const { userId } = useParams();
  const navigate = useNavigate();

  //## 개인 페이지 데이터  useQuery get
  const GetMyPaperData = async () => {
    const getData = await apiToken.get(`/api/paper/users/${userId}`);
    console.log(getData);
    return getData?.data;
  };
  // console.log(userId);
  const { data: myblog_data, status } = useQuery(
    "myblog_data",
    GetMyPaperData,
    {
      onSuccess: (data) => {
        console.log(data);
      },
    }
  );

  if (status === "loading") {
    return <>loading...</>;
  }

  if (status === "error") {
    return alert("error");
  }
  console.log(myblog_data.user);
  // const ToPostDetail () => {

  // }

  return (
    <>
      <Header />
      <p>기본 정렬 (카테고리별) </p>
      <p>태그 정렬</p>
      <p>전체 정렬</p>

      <div>
        {myblog_data?.user.Papers.map((value, idx) => {
          console.log(myblog_data);
          return (
            <div key={idx}>
              <div>{value.title}</div>
              <img
                src={
                  process.env.REACT_APP_S3_URL + `/${value.thumbnail}` ||
                  "images/Meiyou2.png"
                }
                alt=""
                onClick={() => {
                  navigate(`/paper/${value.userId}/${value.postId}`);
                }}
              />
            </div>
          );
        })}
      </div>
    </>
  );
};

// 24번 처럼 한 칸씩 쭈르르륵 내려가는 식으로 정렬하면 보기에도 이해가 쉽지 않을까?.
// 1. 50번의 thumbnail 값이 안 오고 있다. 성준님이 7/4 4시 잠시 후에 보내게 만든 후 말씀해주신다고 함.
export default Paper;
