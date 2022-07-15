import React from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import ViewEdit from "../components/editor/ViewEdit";
import Header from "../components/main/Header";
import CommentContainer from "../components/paper/CommentContainer";
import Like from "../components/paper/Like";
import { apiToken } from "../shared/apis/Apis";
import { getCookie } from "../shared/Cookie";

/*해야할 것*/

const PaperDetail = () => {
  const navigate = useNavigate();
  const { userId } = useParams();
  const { postId } = useParams();
  // console.log(userId);
  // console.log(postId);
  const queryClient = useQueryClient();
  const LoginId = getCookie("userId");

  // ## useMutation 글 delete 함수
  const DeleteDetail = async () => {
    const response = await apiToken.delete(`/api/paper/${postId}`);
    // console.log(response);
    return response?.data;
  };

  // ## useMutation 글 delete
  const { mutate: onDelete } = useMutation(DeleteDetail, {
    onSuccess: () => {
      queryClient.invalidateQueries("paper_data", "detail_data");
      navigate(`/paper/${userId}`);
      // console.log();
    },
  });

  // console.log("PaperDeTail", detail_data);

  // ## useQuery 글 get 함수
  const GetDetailtData = async () => {
    const response = await apiToken.get(`/api/paper/users/${userId}/${postId}`);
    // console.log("PaperDetail page", response);
    return response?.data.paper;
  };

  // ## useQuery 글 get

  //1. isLoding, error 대신에 status로 한 번에 저 두가지 체크 가능
  //2. isLoding을 안 만들어주면 데이터가 안 왔을 때 처음에 (Undefined를 찍으니)보여지는 값에서 문제가 생길 수 있음
  const { data: detail_data, status } = useQuery(
    "detail_data",
    GetDetailtData,
    { staleTime: 0, cacheTime: 0 },
    {
      onSuccess: (data) => {
        console.log(data);
        return data;
      },
    }
  );
  if (status === "loading") {
    return <>loading...</>;
  }

  if (status === "error") {
    return alert("error");
  }

  // console.log("PaperDeTail", detail_data);
  return (
    <div>
      <Header />
      {LoginId === userId ? (
        <>
          {/* 아래 글 삭제 버튼*/}
          <div>
            <button
              onClick={() => {
                onDelete();
              }}
            >
              글 삭제하기
            </button>
          </div>
          {/* 아래 글 수정 버튼*/}
          <div>
            <button
              onClick={() => {
                navigate(`/modify/${userId}/${postId}`);
              }}
            >
              글 수정하기
            </button>
          </div>
        </>
      ) : null}
      {/* 아래 글*/}
      <div>{detail_data?.title}</div>
      <div>{detail_data?.createdAt}</div>
      <ViewEdit contents={detail_data?.contents} />
      {/* 아래 해시태그 */}
      <div>
        {detail_data?.Tags.map((value, index) => {
          return <div key={index}>{value.name}</div>;
        })}
      </div>
      {/* 아래 댓글 */}
      <div>
        <CommentContainer postId={postId} Comments={detail_data?.Comments} />
      </div>
      {/* 아래 좋아요 */}
      <div>
        <Like postId={postId} Likes={detail_data?.Likes} LoginId={LoginId} />
      </div>
    </div>
  );
};

export default PaperDetail;
