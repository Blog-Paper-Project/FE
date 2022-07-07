import React, { useState } from "react";
import { useMutation } from "react-query";
import { apiToken } from "../../shared/apis/Apis";
// /api/paper/{postId}/comments
const CommentBox = ({ postId }) => {
  const [comment, setComment] = useState(null);
  console.log(comment);

  //## useMutation write 데이터 post
  const PostComment = async () => {
    const comment_data = await apiToken.post(`/api/paper/${postId}/comments`, {
      text: comment,
    });
    console.log(comment_data);
    return comment_data;
  };

  //## useMutation write 데이터 post
  const { data: comment_res, mutate: onPost } = useMutation(PostComment, {
    onSuccess: (comment_res) => {
      console.log(comment_res);
    },
  });
  return (
    <div>
      <input
        onChange={(e) => {
          setComment(e.target.value);
        }}
      />
      <button onClick={onPost}>댓글 등록!</button>
    </div>
  );
};

export default CommentBox;
