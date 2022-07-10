import React, { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { apiToken } from "../../shared/apis/Apis";
import { getCookie } from "../../shared/Cookie";

/*해야할 것 */
//1. 댓글이 길어지면 맨 아래 댓글 버튼이 보이니 뱃글 등록 버튼은 항상 위에 두던지 or Enter 누를시 자동 댓글 등록 ( 앞에 것이 나을듯)
//2. 이후 Mutation , keys 관리하는 파일 만들어서 거기서만 보이게 하자. & suspend 사용하여 loading, error 처리까지 !
//3. 코먼트 컨테이너에서 comment 프랍스로 받아올 것

/*트러블 슈팅 */
//1. 44번 EditUserId == CommentUserId 콘솔에 같은 값 나오는데 왜 화면상으론 구현 안 되지 싶었는데 데이터 타입이 달랐다. 그래서 ===에서 -> == 바꿈

const CommentList = (props) => {
  const { commentId, text, postId, CommentUserId, createdAt } = props;

  const [modifyText, setModifyText] = useState(text);
  const [ifEdit, setIfEdit] = useState(false);
  const [closeEdit, setCloseEdit] = useState(false);

  const queryClient = useQueryClient();
  const EditUserId = getCookie("userId");
  // console.log("CommentUserId", CommentUserId);
  // console.log("EditUserId", EditUserId);
  // console.log("commentId", commentId);
  // ## useMutation 댓글 patch 함수
  const PatchComment = async () => {
    const response = await apiToken.patch(
      `/api/paper/${postId}/comments/${commentId}`,
      {
        text: modifyText,
      }
    );
    // setComment("");
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
    <div>
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
        <>
          <div>댓글 내용 {text}</div>
          <div>{createdAt}</div>
          <div>유저 아이디{CommentUserId}</div>
          <div>댓글 번호{commentId}</div>
        </>
      )}
    </div>

    //      <div>
    //         {modify ? (
    //           <>
    //             <input
    //               type="text"
    //               value={value.text}
    //               onChange={(e) => {
    //                 setModifyComment(e.target.value);
    //               }}
    //             />
    //             <span>{value.commentId}</span>
    //             <div>{value.createdAt}</div>
    //             <button
    //               // key={value.commentId}
    //               onClick={(e) => {
    //                 console.log(e.target.value.commentId);
    //                 onPatch();
    //                 setOnModify(!modify);
    //               }}
    //             >
    //               수정하기!
    //             </button>
    //             <button
    //               onClick={() => {
    //                 setOnModify(!modify);
    //               }}
    //             >
    //               취소하기!
    //             </button>
    //           </>
    //         ) : (
    //           <>
    //             <span>{value.text}</span>
    //             <span>{value.commentId}</span>
    //             <div>{value.createdAt}</div>
    //             <button
    //               onClick={() => {
    //                 setOnModify(!modify);
    //               }}
    //             >
    //               수정하기!
    //             </button>
    //           </>
    //         )}
    //       </div>
    //   <button onClick={onPatch}>수정하기!</button>
    // </div>
  );
};

export default CommentList;
