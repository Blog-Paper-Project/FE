import React, { useState } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";

import { api } from "../shared/apis/Apis";

/* 컴포넌트 */
import Header from "../components/main/Header";

const MyBlog = () => {
  //1. 블로그 글 눌러서 들어갔을 때 주소 맨 뒤 params의 postId를 얻어 내야한다.
  const { userId } = useParams(); // 1 자리에 이후에 useparams 넣어서 저런 방식으로 props로 보내주면 됌.

  const GetMyBlogData = async () => {
    const getData = await api.get(`/api/paper/users/${userId}`);
    console.log(getData);
    return getData.data;
  };
  console.log(userId);
  const { data: myblog_data, status } = useQuery("myblog_data", GetMyBlogData, {
    onSuccess: (data) => {
      console.log(data);
    },
  });

  if (status === "loading") {
    return <>loading...</>;
  }

  if (status === "error") {
    return alert("error");
  }

  console.log(myblog_data);

  // const ToPostDetail () => {

  // }

  return (
    <>
      <Header />
      {/* <div onClick={ToPostDetail}>
       */}
      <div>
        {myblog_data?.user.Papers.map((value, idx) => {
          return <div key={idx}>{value.title}</div>;
        })}
      </div>
    </>
  );
};

// 24번 처럼 한 칸씩 쭈르르륵 내려가는 식으로 정렬하면 보기에도 이해가 쉽지 않을까?.

export default MyBlog;
