import React from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import ViewEdit from "../components/editor/ViewEdit";
import Header from "../components/main/Header";
import { apiToken } from "../shared/apis/Apis";

const PostDetail = ({ postId }) => {
  const { userId } = useParams();

  const GetDetailtData = async () => {
    const getData = await apiToken.get(`/api/paper/users/${userId}/${postId}`);
    // console.log(getData);
    return getData?.data;
  };

  //1. isLoding, error 대신에 status로 한 번에 저 두가지 체크 가능
  //2. isLoding을 안 만들어주면 데이터가 안 왔을 때 처음에 (Undefined를 찍으니)보여지는 값에서 문제가 생길 수 있음
  //3. 왜 아래 error가 안 쓰이고 있다고 뜨는 거지?
  const {
    data: detail_data,
    status,
    error,
  } = useQuery("detail_data", GetDetailtData);
  console.log(detail_data);
  return (
    <>
      <Header />
      <ViewEdit />
    </>
  );
};

export default PostDetail;
