import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
/*해야할 것 */
//1. 크레에잇 날짜, 시간 보이기 별로 -> 보이기 좋게 변환
const ContentBox = (props) => {
  const { title, thumbnail, blogId, postId, createdAt } = props;
  const navigate = useNavigate();
  return (
    <Container>
      <Thumbnail
        src={
          process.env.REACT_APP_S3_URL + `/${thumbnail}` || "images/Meiyou2.png"
        }
        alt=""
        onClick={() => {
          navigate(`/paper/${blogId}/${postId}`);
        }}
      />
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
  height: 316px;
  width: 438px;
`;
const Thumbnail = styled.img`
  height: 250px;
  width: 100%;
`;
const Title = styled.div`
  height: 54px;
  width: 100%;
  font-weight: 540;
  font-size: 25px;
  line-height: 50px;
`;
const CreatedAt = styled.div`
  height: 16px;
  width: 100%;
`;
export default ContentBox;
