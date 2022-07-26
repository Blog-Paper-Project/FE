import React, { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import ViewEdit from "../components/editor/ViewEdit";
import Header from "../components/main/Header";
import Comment from "../components/paper/Comment";
import Like from "../components/paper/Like";
import { apiToken } from "../shared/apis/Apis";
import { getCookie } from "../shared/Cookie";
import defaultUserImage from "../public/images/default_profile.png";
import styled from "styled-components";
import Footer from "../components/main/Footer";
//imgage
import CommentsImg from "../public/images/icons/comments.png";
import ArrowDown from "../public/images/icons/Keyboard_down.png";
import ArrowUp from "../public/images/icons/Keyboard_up.png";
import Line_1 from "../public/images/icons/Line_1.png";

/*해야할 것*/

const PaperDetail = () => {
  const navigate = useNavigate();
  const { blogId } = useParams();
  const { postId } = useParams();
  const StringUserId = getCookie("userId");
  const userId = Number(StringUserId);
  // console.log(typeof userId);
  // console.log(blogId);
  // console.log(postId);
  const queryClient = useQueryClient();
  const isHostId = getCookie("blogId");
  //state
  const [openComment, setOpenComment] = useState(false);
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
      navigate(`/paper/${blogId}`);
    },
  });

  // console.log("PaperDeTail", detail_data);

  // ## useQuery 글 get 함수
  const GetDetailtData = async () => {
    const response = await apiToken.get(`/api/paper/${blogId}/${postId}`, {
      headers: {
        userId: userId,
      },
    });
    // console.log("PaperDetail page", response);
    return response?.data.paper;
  };

  // ## useQuery 글 get

  //1. isLoding, error 대신에 status로 한 번에 저 두가지 체크 가능
  //2. isLoding을 안 만들어주면 데이터가 안 왔을 때 처음에 (Undefined를 찍으니)보여지는 값에서 문제가 생길 수 있음
  const { data: detail_data, status } = useQuery(
    ["detail_data", postId],
    GetDetailtData,

    {
      onSuccess: (data) => {
        // console.log(data);
        return data;
      },
      staleTime: 0,
      cacheTime: 0,
    }
  );
  if (status === "loading") {
    return <>loading...</>;
  }

  if (status === "error") {
    return alert("error");
  }
  const S3 =
    process.env.REACT_APP_S3_URL + `/${detail_data?.Users.profileImage}`;
  console.log("PaperDeTail", detail_data);
  return (
    <Container>
      <Header />

      {/* 아래 글*/}
      <ContainerContents>
        <Title>{detail_data?.title}</Title>
        <Line />
        <UserDataWrap>
          <div className="wrap">
            {/* 블로거 프로필 이미지 */}
            <ProfileImgBox
              src={
                detail_data?.Users.profileImage === null ? defaultUserImage : S3
              }
              onClick={() => {
                navigate(`/paper/${detail_data?.Users.blogId}`);
              }}
            />
            <Nickname>{detail_data?.Users.nickname}</Nickname>
            <CreatedAt>{detail_data?.createdAt}</CreatedAt>
          </div>
          <div className="wrap">
            {isHostId === blogId ? (
              <>
                {/* 아래 글 수정 버튼*/}

                <button
                  onClick={() => {
                    navigate(`/modify/${blogId}/${postId}`);
                  }}
                >
                  글 수정하기
                </button>

                {/* 아래 글 삭제 버튼*/}

                <button
                  onClick={() => {
                    onDelete();
                  }}
                >
                  글 삭제하기
                </button>
              </>
            ) : null}
          </div>
        </UserDataWrap>
        <ViewEditWarp>
          <ViewEdit contents={detail_data?.contents} />
        </ViewEditWarp>
        {/* 아래 해시태그 */}
        <TagWrap>
          {detail_data?.Tags.map((value, index) => {
            return <Tag key={index}>{value.name}</Tag>;
          })}
        </TagWrap>
        {/* 아래 댓글 */}
        <div>
          {openComment ? (
            <>
              <CommentLikeWrap>
                <Like postId={postId} Likes={detail_data?.Likes} />
                <CommentButton
                  onClick={() => {
                    setOpenComment(!openComment);
                  }}
                >
                  <img src={CommentsImg} alt="comment_image" />
                  <div> 댓글</div>
                  <img src={Line_1} alt="Line"></img>
                  <img src={ArrowDown} alt="Arrow"></img>
                </CommentButton>
              </CommentLikeWrap>
              <Comment postId={postId} Comments={detail_data?.Comments} />
            </>
          ) : (
            <>
              <CommentLikeWrap>
                <Like postId={postId} Likes={detail_data?.Likes} />
                <CommentButton
                  onClick={() => {
                    setOpenComment(!openComment);
                  }}
                >
                  <img src={CommentsImg} alt="comment_image" />
                  <div> 댓글</div>
                  <img src={Line_1} alt="Line" />
                  <img src={ArrowUp} alt="Arrow" />
                </CommentButton>
              </CommentLikeWrap>
            </>
          )}
        </div>
      </ContainerContents>
      <Footer />
    </Container>
  );
};

const Container = styled.div`
  max-width: 1920px;
  background-color: white;
`;
const ContainerContents = styled.div`
  width: 899px;
  padding: 160px 511px 160px 510px;
`;
const UserDataWrap = styled.div`
  width: 898px;
  display: flex;
  justify-content: space-between;
  .wrap > {
    display: flex;
  }
  margin-bottom: 59px;
`;

const ProfileImgBox = styled.img`
  width: 30px;
  height: 30px;
  margin: 0 0 0 0;
  border-radius: 50%;
`;

const Nickname = styled.span`
  height: 40px;
  width: 80px;
`;
const Title = styled.div`
  height: 60px;
  width: 896px;
  font-size: 40px;
  font-weight: 400;
  line-height: 60px;
  color: #333333;
  margin-bottom: 10px;
`;
const Line = styled.div`
  width: 898px;
  border-bottom: 1px solid #000000;
  margin-bottom: 20px;
`;
const CreatedAt = styled.div``;
const ViewEditWarp = styled.div`
  width: 898px;
  background-color: #efefef;
`;
const TagWrap = styled.div`
  height: 20px;
  width: 300px;
  display: flex;
  justify-content: flex-start;
  gap: 0 10px;
  margin-top: 24px;
  margin-bottom: 50px;
`;
const Tag = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 25px;
  width: 85px;
  border: 2px solid black;
  border-radius: 30px;
  font-size: 12px;
`;
const CommentLikeWrap = styled.div`
  display: flex;
  flex-direction: row;
  height: 36px;
  width: 284px;
  gap: 24px;
`;
const CommentButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  height: 36px;
  width: 130px;
  outline: 1px solid;
  border: 1px solid;
`;

export default PaperDetail;
