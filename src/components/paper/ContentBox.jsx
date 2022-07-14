import React from "react";
import { useNavigate } from "react-router-dom";
/*해야할 것 */
//1. 크레에잇 날짜, 시간 보이기 별로 -> 보이기 좋게 변환
const ContentBox = (props) => {
  const { title, thumbnail, userId, postId, createdAt } = props;
  const navigate = useNavigate();
  return (
    <div>
      <div
        style={{ cursor: "pointer" }}
        onClick={() => {
          navigate(`/paper/${userId}/${postId}`);
        }}
      >
        {title}
      </div>
      <img
        style={{ cursor: "pointer" }}
        src={
          process.env.REACT_APP_S3_URL + `/${thumbnail}` || "images/Meiyou2.png"
        }
        alt=""
        onClick={() => {
          navigate(`/paper/${userId}/${postId}`);
        }}
      />
      <div>{createdAt}</div>
    </div>
  );
};

export default ContentBox;
