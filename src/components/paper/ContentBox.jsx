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
        style={{ cursor: "pointer" }}
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
      <div>{createdAt}</div>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 7%;
  height: 316px;
  /* width: 100vw; */
  /* margin-bottom: 50px; */
`;
const Thumbnail = styled.img`
  height: 25vh;
  width: 25vw;
`;

const Title = styled.div`
  font-weight: 600;
  font-size: large;
`;
export default ContentBox;
