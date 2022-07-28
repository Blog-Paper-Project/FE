import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
/*해야할 것 */
//1. 크레에잇 날짜, 시간 보이기 별로 -> 보이기 좋게 변환
const ContentBox = (props) => {
  const { title, thumbnail, blogId, postId, createdAt } = props;
  const navigate = useNavigate();
  // console.log(thumbnail);
  return (
    <Container>
      {thumbnail === null ? (
        <Meiyou
          onClick={() => {
            navigate(`/paper/${blogId}/${postId}`);
          }}
        />
      ) : (
        <Thumbnail
          src={process.env.REACT_APP_S3_URL + `/${thumbnail}`}
          alt=""
          onClick={() => {
            navigate(`/paper/${blogId}/${postId}`);
          }}
        />
      )}

      <Title
        style={{ cursor: "pointer" }}
        onClick={() => {
          navigate(`/paper/${blogId}/${postId}`);
        }}
      >
        {title}
      </Title>
      <CreatedAt>{createdAt}</CreatedAt>
    </Container>
  );
};

const Container = styled.div`
  width: 438px;
  /* margin-bottom: 10px; */
`;
const Thumbnail = styled.img`
  height: 250px;
  width: 100%;
`;
const Meiyou = styled.div`
  height: 250px;
  width: 100%;
  background-color: white;
  cursor: pointer;
`;
const Title = styled.div`
  height: 54px;
  width: 100%;
  font-weight: 600;
  font-size: 22px;
  line-height: 50px;
`;
const CreatedAt = styled.div`
  height: 16px;
  font-size: 14px;
  width: 100%;
`;
export default ContentBox;
