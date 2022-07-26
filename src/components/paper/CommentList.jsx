import React, { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import styled from "styled-components";
import { apiToken } from "../../shared/apis/Apis";
import { getCookie } from "../../shared/Cookie";
//image
import Line from "../../public/images/icons/Line_1.png";
import ArrowDown from "../../public/images/icons/Keyboard_down.png";
import ArrowUp from "../../public/images/icons/Keyboard_up.png";
import defaultUserImage from "../../public/images/default_profile.png";
import { useNavigate } from "react-router-dom";

/*해야할 것 */
//1. 댓글이 길어지면 맨 아래 댓글 버튼이 보이니 뱃글 등록 버튼은 항상 위에 두던지 or Enter 누를시 자동 댓글 등록 ( 앞에 것이 나을듯)
//2. 이후 Mutation , keys 관리하는 파일 만들어서 거기서만 보이게 하자. & suspend 사용하여 loading, error 처리까지 !
//3. 코먼트 컨테이너에서 comment 프랍스로 받아올 것

/*트러블 슈팅 */
//1. 44번 EditUserId == CommentUserId 콘솔에 같은 값 나오는데 왜 화면상으론 구현 안 되지 싶었는데 데이터 타입이 달랐다. 그래서 ===에서 -> == 바꿈

const CommentList = (props) => {
  const {
    commentId,
    text,
    postId,
    CommentUserId,
    createdAt,
    profileImage,
    blogId,
    nickname,
  } = props;
  // State
  const [modifyText, setModifyText] = useState(text);
  const [ifEdit, setIfEdit] = useState(false);
  const [closeEdit, setCloseEdit] = useState(false);
  //
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const EditUserId = getCookie("userId");
  // console.log("CommentUserId", CommentUserId);
  // console.log("EditUserId", EditUserId);
  // console.log("commentId", commentId);
  const S3 = process.env.REACT_APP_S3_URL + `/${profileImage}`;
  console.log(S3);
  // ## useMutation 댓글 patch 함수
  const PatchComment = async () => {
    const response = await apiToken.patch(
      `/api/paper/${postId}/comments/${commentId}`,
      {
        text: modifyText,
      }
    );
    // console.log(response);
    return response?.data;
  };

  // ## useMutation 댓글 patch
  const { mutate: onPatch } = useMutation(PatchComment, {
    onSuccess: () => {
      queryClient.invalidateQueries("detail_data");
      // console.log();
    },
  });
  // ## useMutation 댓글 delete 함수
  const DeleteComment = async () => {
    const response = await apiToken.delete(
      `/api/paper/${postId}/comments/${commentId}`
    );
    // console.log(response);
    return response?.data;
  };

  // ## useMutation 댓글 delete
  const { mutate: onDelete } = useMutation(DeleteComment, {
    onSuccess: () => {
      queryClient.invalidateQueries("detail_data");
      // console.log();
    },
  });

  return (
    <Container>
      {EditUserId == CommentUserId ? (
        <>
          <div>
            {ifEdit ? (
              <input
                onChange={(e) => {
                  setModifyText(e.target.value);
                }}
                value={modifyText}
                maxLength="40"
                style={{
                  backgroound_color: "white",
                  border: "1px solid black",
                  height: "26px",
                  width: "300px",
                }}
              />
            ) : (
              <div>댓글 내용 {text}</div>
            )}
          </div>
          <div>{createdAt}</div>
          <div>유저 아이디{CommentUserId}</div>
          <div>댓글 번호{commentId}</div>
          {closeEdit ? (
            <div>
              <button
                onClick={() => {
                  onPatch();
                  setIfEdit(false);
                  setCloseEdit(!closeEdit);
                }}
              >
                수정 하기!
              </button>
              <button
                onClick={() => {
                  setIfEdit(!ifEdit);
                  setCloseEdit(!closeEdit);
                }}
              >
                취소 하기!
              </button>
            </div>
          ) : (
            <>
              <button
                onClick={() => {
                  setIfEdit(!ifEdit);
                  setCloseEdit(!closeEdit);
                }}
              >
                수정 모양!
              </button>
              <button
                onClick={() => {
                  onDelete();
                }}
              >
                삭제 하기!
              </button>
            </>
          )}
        </>
      ) : (
        <CommentWrap>
          <div className="UserWrap">
            <div>
              <img
                src={profileImage === null ? defaultUserImage : S3}
                alt=""
                onClick={() => {
                  navigate(`/paper/${blogId}`);
                }}
              />
            </div>
            <div className="NicknameCreateWrap">
              <div className="UserNickname">{nickname}</div>
              <div className="CreatedAt">{createdAt}</div>
            </div>
          </div>
          <div className="TextWrap">
            <div className="Text">댓글 내용 {text}</div>
          </div>
        </CommentWrap>
      )}
    </Container>
  );
};
const Container = styled.div`
  width: 898px;
  margin-top: 32px;
`;
const CommentWrap = styled.div`
  width: 898px;
  height: 168px;

  img {
    height: 56px;
    width: 56px;
    border-radius: 50%;
  }
  .UserWrap {
    display: flex;
    gap: 16px;
    height: 56px;
    width: 260px;
  }
  .UserNickname {
    font-size: 14px;
    font-weight: 400;
    line-height: 14px;
    font-family: "Gmarket Sans";
  }
  .NicknameCreateWrap {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 10px;
  }
  .CreatedAt {
    width: ;
  }
  .TextWrap {
    display: flex;
    justify-content: flex-start;
    gap: 10px;
    width: 898px;
    height: 100px;
    margin-top: 10px;
    outline: 1px solid #acacac;
    border: 1px solid #acacac;
  }
  .Text {
    width: 483px;
  }
`;
//## 대댓글 가능할 때 이런 방식으로
// <CommentWrap>
//           <img alt="">유저사진</img>
//           <div className="UserNickname">유저 닉네임{CommentUserId}</div>
//           <div className="CreatedAt">작성 시간{createdAt}</div>
//           <div className="Text">댓글 내용 {text}</div>
//           <button>
//             답글 달기
//             <img src={Line} className="Line" alt="Line_1" />
//             <img src={ArrowDown} className="Arrow" alt="Arrow" />
//           </button>
//         </CommentWrap>
// 아래는 위의 styledComponent
//  button {
// display: flex;
// justify-content: center;
// align-items: center;
// height: 36px;
// width: 130px;
// .Line {
//   height: 16px;
// }
// .Arrow {
//   height: 24px;
//   width: 24px;
// }

export default CommentList;
