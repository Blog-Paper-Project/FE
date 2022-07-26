import React, { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { apiToken } from "../../shared/apis/Apis";
import CommentList from "./CommentList";
/*해야할 것 */
const Comment = (props) => {
  const { postId, Comments } = props;
  const [comment, setComment] = useState("");
  const queryClient = useQueryClient();
  //   console.log(props.Comments);
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
    <>
      {/* 아래 댓글 추가 */}
      <div>
        <input
          value={comment}
          onChange={(e) => {
            setComment(e.target.value);
          }}
          style={{ border: "1px solid black", height: "30px", width: "690px" }}
        />
        <button
          onClick={() => {
            onPost(comment);
          }}
        >
          댓글 등록!
        </button>
      </div>
      {/* 아래 댓글 리스트 */}
      <div>
        {Comments?.map((value) => {
          return (
            <CommentList
              key={value.commentId}
              postId={value.postId}
              CommentUserId={value.userId}
              commentId={value.commentId}
              createdAt={value.createdAt}
              text={value.text}
            />
          );
        })}
      </div>
    </>
  );
};

export default Comment;
