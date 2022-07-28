import React, { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { apiToken } from "../../shared/apis/Apis";
import { getCookie } from "../../shared/Cookie";
import CommentList from "./CommentList";
/*해야할 것 */
const Comment = (props) => {
  const { postId, Comments } = props;
  const [comment, setComment] = useState("");
  const queryClient = useQueryClient();

  const navigate = useNavigate("");
  // console.log(props.Comments);
  // ## useMutation 댓글 post 함수
  const PostComment = async (comment) => {
    const response = await apiToken.post(`/api/paper/${postId}/comments`, {
      text: comment,
    });
    setComment("");
    console.log(response);
    return response?.data;
  };

  // ## useMutation 댓글 post
  const { mutate: onPost } = useMutation(PostComment, {
    onSuccess: () => {
      queryClient.invalidateQueries("detail_data");
      // console.log();
    },
  });

  return (
    <Container>
      {/* 아래 댓글 추가 */}
      <CommentInputBtnWrap>
        <div>
          <textarea
            value={comment}
            placeholder="댓글을 작성하세요"
            onChange={(e) => {
              setComment(e.target.value);
            }}
          />
        </div>
        <button
          onClick={() => {
            const LoginIdCheck = getCookie("blogId");
            if (LoginIdCheck == undefined) {
              alert("로그인 후 이용 가능한 기능입니다.");
              navigate("/login");
              window.scrollTo(0, 0);
            } else {
              onPost(comment);
            }
          }}
        >
          댓글 작성
        </button>
      </CommentInputBtnWrap>
      {/* 아래 댓글 리스트 */}
      <CommentListWrap>
        {Comments?.map((value) => {
          return (
            <CommentList
              key={value?.commentId}
              postId={value?.postId}
              CommentUserId={value?.userId}
              blogId={value?.Users.blogId}
              profileImage={value?.Users.profileImage}
              nickname={value?.Users.nickname}
              commentId={value?.commentId}
              createdAt={value?.createdAt}
              text={value?.text}
            />
          );
        })}
      </CommentListWrap>
    </Container>
  );
};

const Container = styled.div`
  width: 898px;
  margin-top: 24px;
`;
const CommentInputBtnWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 24px;
  div {
    height: 100px;
    width: 898px;
    background-color: white;
    outline: 1px solid #acacac;
    border: 1px solid #acacac;
    padding: 10px;
  }
  textarea {
    height: 80px;
    width: 483px;
    border: none;
    resize: none;
    outline: none;
  }
  button {
    height: 40px;
    width: 154px;
    background-color: black;
    color: white;
  }
`;
const CommentListWrap = styled.div`
  width: 898px;
  margin-top: 24px;
`;

export default Comment;
