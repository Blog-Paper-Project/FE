import { styled } from "@material-ui/styles";
import React from "react";
import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { apiToken } from "../../shared/apis/Apis";

const Category = (props) => {
  const { category, userId } = props;
  const [CategoryInput, setCategoryInput] = useState("");
  const [Edit, setEdit] = useState(false);
  const queryClient = useQueryClient();

  // ## useMutation 카테고리 patch 함수
  const PatchCategory = async () => {
    const response = await apiToken.patch(
      `/api/paper/users/${userId}/categories/${category}`,
      {
        newCategory: CategoryInput,
      }
    );
    // console.log(response);
    return response?.data;
  };

  // ## useMutation 카테고리 patch
  const { mutate: onPatch } = useMutation(PatchCategory, {
    onSuccess: () => {
      queryClient.invalidateQueries("paper_data");
      // console.log();
    },
  });

  // ## useMutation 카테고리 patch(delete 역할) 함수
  const DeleteCategory = async () => {
    const response = await apiToken.patch(
      `/api/paper/users/${userId}/categories/${category}`,
      {
        newCategory,
      }
    );
    // console.log(response);
    return response?.data;
  };

  // ## useMutation 카테고리 patch(delete 역할)
  const { mutate: onDelete } = useMutation(DeleteCategory, {
    onSuccess: () => {
      queryClient.invalidateQueries("paper_data");
      // console.log();
    },
  });

  return (
    <Wrap>
      {/* 아래 Edit 변경하기 클릭시 */}
      {Edit ? (
        <>
          <input
            onChange={(e) => {
              setCategoryInput(e.target.value);
            }}
          />
        </>
      ) : (
        <>
          <div>{props.category}</div>
        </>
      )}
      {/* 위 Edit 변경하기 끝 */}
      {/* 아래 Edit 변경하기 클릭시 변경완료로 버튼 변경 (여기 patch 기능) */}
      {Edit ? (
        <>
          <button
            onClick={() => {
              onPatch();
              setCategoryInput("");
              setEdit(!Edit);
            }}
          >
            변경완료!
          </button>
        </>
      ) : (
        <>
          <button
            onClick={() => {
              setEdit(!Edit);
            }}
          >
            변경하기!
          </button>
        </>
      )}
      {/* 위 Edit 변경하기 클릭시 변경완료로 버튼 변경 (여기 patch 기능) */}
      <button onClick={() => {}}>삭제하기</button>
    </Wrap>
  );
};

const Wrap = styled.div``;

export default Category;
