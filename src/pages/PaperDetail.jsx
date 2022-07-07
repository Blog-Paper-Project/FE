import React from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import ViewEdit from "../components/editor/ViewEdit";
import Header from "../components/main/Header";
import CommentBox from "../components/paper/CommentBox";
import { apiToken } from "../shared/apis/Apis";

/*해야할 것*/
// Comments: []
// Likes: []
// Users: {nickname: '감자입니다', profileImage: null}
// category: ""
// contents: "## 큰글시2"
// createdAt: "2022-07-06 23:44:43"
// postId: 2
// title: "제목입니다2"
// updatedAt: "2022-07-06 23:44:43"
// userId: 4

const PaperDetail = () => {
  const { userId } = useParams();
  const { postId } = useParams();
  // console.log(userId);
  // console.log(postId);

  const GetDetailtData = async () => {
    const getData = await apiToken.get(`/api/paper/users/${userId}/${postId}`);
    // console.log(getData);
    return getData?.data.paper;
  };

  //1. isLoding, error 대신에 status로 한 번에 저 두가지 체크 가능
  //2. isLoding을 안 만들어주면 데이터가 안 왔을 때 처음에 (Undefined를 찍으니)보여지는 값에서 문제가 생길 수 있음
  const { data: detail_data, status } = useQuery("detail_data", GetDetailtData);
  if (status === "loading") {
    return <>loading...</>;
  }

  if (status === "error") {
    return alert("error");
  }

  // console.log(detail_data);
  return (
    <div>
      <div>{detail_data?.title}</div>
      <div>{detail_data?.createdAt}</div>
      <ViewEdit contents={detail_data?.contents} />
      <div>
        {detail_data?.Tags.map((value, index) => {
          return <div key={index}>{value?.name}</div>;
        })}
      </div>
      <CommentBox postId={postId} />
    </div>
  );
};

export default PaperDetail;
