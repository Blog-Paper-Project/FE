import React, { useCallback, useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import styled from "styled-components";
import { apiToken } from "../../shared/apis/Apis";
import { getCookie } from "../../shared/Cookie";
//image
import TrueHeart from "../../public/images/icons/Favorite_border.png";
import FalseHeart from "../../public/images/icons/Favorite.png";
import { useNavigate } from "react-router-dom";

const Like = ({ postId, Likes }) => {
  // console.log(postId);
  const [like, setLike] = useState(false);
  const userId = getCookie("userId");
  const navigate = useNavigate("");
  // console.log(Likes);
  const LikesCheck = Likes?.find((value) => {
    // console.log(value.likes.userId);
    return value.likes.userId == userId;
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
    onSuccess: (data) => {
      queryClient.invalidateQueries("detail_data");
      // console.log(data);
      setLike(data.result);
    },
    onError: (err) => {
      alert(err.response.data.errorMessage);
      // navigate("/login");
      // window.scrollTo(0, 0);
    },
  });
  // console.log(likeData);
  const onLike = useCallback(() => {
    onPost();
  }, []);

  return (
    <>
      <Button
        onClick={() => {
          onLike();
        }}
      >
        {LikesCheck === undefined ? (
          <img src={like ? FalseHeart : TrueHeart} alt="좋아요" />
        ) : (
          <img src={like ? TrueHeart : FalseHeart} alt="좋아요" />
        )}
        좋아요
      </Button>
    </>
  );
};

const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 36px;
  width: 130px;
  gap: 10px;
  border: 1px solid;
  outline: 1px solid;
  font-family: "Noto Sans KR";
  font-weight: 500;
  font-size: 14px;
  line-height: 19px;
  &:hover {
    background-color: #889175;
  }
`;

export default Like;
