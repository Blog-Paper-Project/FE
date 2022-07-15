import React, { useCallback, useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { apiToken } from "../../shared/apis/Apis";

const Like = ({ postId, Likes, LoginId }) => {
  // console.log(postId);
  const [like, setLike] = useState(false);
  // console.log(Likes);
  // console.log(LoginId);
  // console.log(LoginId);

  const LikesCheck = Likes?.find((value) => {
    // console.log(value.likes.userId);
    return value.likes.userId == LoginId;
  });
  // console.log(LikesCheck);
  // ## useMutation 좋아요 post 함수
  const queryClient = useQueryClient();

  const PostLike = async () => {
    const response = await apiToken.post(`/api/paper/${postId}/likes`);

    // console.log(response);
    return response;
  };

  // ## useMutation 좋아요 post
  const { mutate: onPost } = useMutation(PostLike, {
    onSuccess: () => {
      queryClient.invalidateQueries("detail_data");
      // console.log(data);
    },
    onError: () => {
      alert("자신의 글엔 좋아요를 할 수 없습니다.");
    },
  });
  // console.log(likeData);
  const onLike = useCallback(() => {
    setLike(!like);
    onPost();
  }, [onPost]);

  return (
    <>
      {LikesCheck === undefined ? <p>🤍</p> : <p>❤</p>}
      <button
        // onClick={() => {
        //   onPost();
        // }}
        onClick={() => {
          onLike();
        }}
      >
        하트 버튼!
      </button>
    </>
  );
};

export default Like;
