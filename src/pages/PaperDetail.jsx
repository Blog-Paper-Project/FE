import React, { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { apiToken } from "../shared/apis/Apis";
import { getCookie } from "../shared/Cookie";
// Components
import ViewEdit from "../components/editor/ViewEdit";
import Header from "../components/main/Header";
import Comment from "../components/paper/Comment";
import Like from "../components/paper/Like";
import Footer from "../components/main/Footer";
// Imgages
import defaultUserImage from "../public/images/default_profile.png";
import CommentsImg from "../public/images/icons/comments.png";
import ArrowDown from "../public/images/icons/Keyboard_down.png";
import ArrowUp from "../public/images/icons/Keyboard_up.png";
import Line_1 from "../public/images/icons/Line_1.png";
import ModifyImg from "../public/images/icons/modify.png";
import DeleteImg from "../public/images/icons/Delete_forever.png";

const PaperDetail = () => {
  // React Hooks
  const navigate = useNavigate();
  const { blogId } = useParams();
  const { postId } = useParams();
  const queryClient = useQueryClient();
  // Cookies
  const StringUserId = getCookie("userId");
  const isHostId = getCookie("blogId");
  const userId = Number(StringUserId);
  // States
  const [openComment, setOpenComment] = useState(true);

  // UseMutation 글 delete 함수
  const DeleteDetail = async () => {
    const response = await apiToken.delete(`/api/paper/${postId}`);
    return response?.data;
  };

  // UseMutation 글 delete
  const { mutate: onDelete } = useMutation(DeleteDetail, {
    onSuccess: () => {
      queryClient.invalidateQueries("paper_data", "detail_data");
      navigate(`/paper/${blogId}`);
    },
  });

  // UseQuery 글 get 함수
  const GetDetailtData = async () => {
    const response = await apiToken.get(`/api/paper/${blogId}/${postId}`, {
      headers: {
        userId: userId,
      },
    });
    return response.data;
  };

  // UseQuery 글 get
  const { data: detail_data, status } = useQuery(
    ["detail_data", postId],
    GetDetailtData,

    {
      onSuccess: () => {},
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
  // 변수 저장
  const S3 =
    process.env.REACT_APP_S3_URL +
    `/${detail_data?.paper?.Users?.profileImage}`;

  const ViewCountTotal = detail_data?.count + detail_data?.paper?.viewCount;

  return (
    <Container>
      <Header />
      <div className="ContainerContentsWrap">
        {/* 아래 글*/}
        <ContainerContents>
          <Title>{detail_data?.paper?.title}</Title>
          <Line />
          <UserDataWrap>
            <div className="wrap">
              {/* 블로거 프로필 이미지 */}
              <ProfileImgBox
                src={
                  detail_data?.paper?.Users?.profileImage === null
                    ? defaultUserImage
                    : S3
                }
                onClick={() => {
                  navigate(`/paper/${detail_data?.paper?.Users?.blogId}`);
                }}
              />
              <Nickname
                onClick={() => {
                  navigate(`/paper/${detail_data?.paper?.Users?.blogId}`);
                }}
              >
                {detail_data?.paper?.Users?.nickname}
              </Nickname>
              <span>·</span>
              <CreatedAt>{detail_data?.paper?.createdAt}</CreatedAt>
              <span>·</span>
              <div className="ViewCountName">
                조회수 {ViewCountTotal ? ViewCountTotal : null}
              </div>
            </div>
            <div className="EditDeleteBtnWrap">
              {isHostId === blogId ? (
                <>
                  {/* 아래 글 수정 버튼*/}

                  <button
                    className="ModfyBtn"
                    onClick={() => {
                      navigate(`/modify/${blogId}/${postId}`);
                    }}
                  >
                    <img src={ModifyImg} alt="" />
                    수정하기
                  </button>

                  {/* 아래 글 삭제 버튼*/}

                  <button
                    className="ModfyBtn"
                    onClick={() => {
                      if (window.confirm("정말 삭제하시겠습니까?")) {
                        onDelete();
                      } else {
                        return;
                      }
                    }}
                  >
                    <img src={DeleteImg} alt="" />
                    삭제하기
                  </button>
                </>
              ) : null}
            </div>
          </UserDataWrap>
          <ViewEditWarp>
            <ViewEdit contents={detail_data?.paper?.contents} />
          </ViewEditWarp>
          {/* 아래 해시태그 */}
          <TagWrap>
            {detail_data?.paper?.Tags?.map((value, index) => {
              return <Tag key={index}>{value.name}</Tag>;
            })}
          </TagWrap>
          {/* 아래 댓글 */}
          <div>
            {openComment ? (
              <>
                <CommentLikeWrap>
                  <Like postId={postId} Likes={detail_data?.paper?.Likes} />
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
                <Comment
                  postId={postId}
                  Comments={detail_data?.paper?.Comments}
                />
              </>
            ) : (
              <>
                <CommentLikeWrap>
                  <Like postId={postId} Likes={detail_data?.paper.Likes} />
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
      </div>
      <Footer />
    </Container>
  );
};

const Container = styled.div`
  margin: 0 auto;
  background-color: #fffdf7;
  /* overflow-y: hidden; */
  .ContainerContentsWrap {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;
const ContainerContents = styled.div`
  width: 900px;
  padding-top: 100px;
`;
const UserDataWrap = styled.div`
  width: 898px;
  display: flex;
  justify-content: space-between;
  .wrap {
    display: flex;
    align-items: center;
    height: 32px;
    width: 898px;
  }
  .EditDeleteBtnWrap {
    display: flex;
    justify-content: space-between;

    height: 36px;
    width: 240px;
    button {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 10px;
      height: 36px;
      width: 130px;
      border: 1px solid;
      outline: 1px solid;
      margin-left: 10px;
    }
  }
  .ViewCountName {
    display: flex;
    justify-content: center;
    width: 70px;
    font-size: 14px;
  }

  margin-bottom: 59px;
`;

const ProfileImgBox = styled.img`
  width: 30px;
  height: 30px;
  margin: 0 10px 0 0;
  border-radius: 50%;
`;

const Nickname = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 18px;
  margin-right: 8px;
  font-family: "Noto Sans KR";
  font-size: 18px;
  cursor: pointer;
`;
const Title = styled.div`
  min-height: 75px;
  width: 896px;
  font-size: 45px;
  font-weight: 600;
  line-height: 40pt;
  color: #333333;
  margin-bottom: 10px;
  margin-top: 20px;
`;
const Line = styled.div`
  width: 898px;
  border-bottom: 1px solid #000000;
  margin-bottom: 20px;
`;
const CreatedAt = styled.div`
  display: flex;
  align-items: center;
  height: 19px;
  margin-left: 7px;
  margin-right: 7px;
  font-size: 14px;
  font-family: "Noto Sans KR";
`;
const ViewEditWarp = styled.div`
  width: 898px;
`;
const TagWrap = styled.div`
  height: 20px;
  width: 300px;
  display: flex;
  justify-content: flex-start;
  gap: 0 6px;
  margin-top: 24px;
  margin-bottom: 50px;
`;
const Tag = styled.div`
  height: 25px;
  width: auto;
  box-sizing: border-box;
  white-space: nowrap;
  outline: 1px solid;
  border: 1px solid;
  border-radius: 5px;
  padding: 12px 15px 12px 15px;
  font-family: "Noto Sans";
  font-style: normal;
  font-weight: 600;
  font-size: 12px;
  line-height: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
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
