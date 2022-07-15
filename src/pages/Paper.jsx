import React, { useCallback, useState } from "react";
import { useQuery, useQueryClient } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
/* api */
import { apiToken } from "../shared/apis/Apis";
/* 컴포넌트 */
import Header from "../components/main/Header";
import ContentBox from "../components/paper/ContentBox";
import CategoryList from "../components/paper/CategoryList";
import styled from "styled-components";
/* 해야 할 것 */
//1. 블로그 글 눌러서 들어갔을 때 주소 맨 뒤 params의 postId를 얻어 내야한다.
//2. 아래 map 돌린 거 array 정확히 다 받으면 그거 돌리자
//3. 아래 p 태그 누를 시 페이지 변환할 것 (각각 형태 만들기)
//4. ! 아마 onBasic 함수 필요없을듯
const Paper = () => {
  const [basicSort, setBasicSort] = useState(true);
  const [tagSort, setTagSort] = useState(false);
  const [allSort, setAllSort] = useState(false);
  const [categoty_Toggle, setCategoty_Toggle] = useState(false);
  const [CategoryEdit, setCategoryEdit] = useState(false);
  const [EditButton, setEditButton] = useState(false);
  const { userId } = useParams();
  const navigate = useNavigate();

  //## 아래 조건부 렌더링 이벤트
  const onBasic = useCallback(() => {
    setBasicSort(true);
    setTagSort(false);
    setAllSort(false);
  }, []);

  const onTag = useCallback(() => {
    setTagSort(!tagSort);
    if (tagSort === false) {
      setTagSort(true);
      setBasicSort(false);
      setAllSort(false);
    } else {
      setTagSort(false);
      setBasicSort(true);
      setAllSort(false);
    }
  }, [tagSort]);

  const onAll = useCallback(() => {
    setAllSort(!allSort);
    if (allSort === false) {
      setAllSort(true);
      setBasicSort(false);
      setTagSort(false);
    } else {
      setAllSort(false);
      setBasicSort(true);
      setTagSort(false);
    }
  }, [allSort]);

  //## 개인 페이지 데이터  useQuery get
  const GetMyPaperData = async () => {
    const response = await apiToken.get(`/api/paper/users/${userId}`);
    // console.log(response);
    return response?.data;
  };

  const { data: mypaper_data, status } = useQuery(
    "paper_data",
    GetMyPaperData,
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
  // console.log(mypaper_data.categories);
  return (
    <Container>
      <Header />
      <MyProfile></MyProfile>
      <SortType>
        <p style={{ cursor: "pointer" }} onClick={onBasic}>
          Basic
        </p>
        <p style={{ cursor: "pointer" }} onClick={onTag}>
          Tag
        </p>
        <p style={{ cursor: "pointer" }} onClick={onAll}>
          All
        </p>
      </SortType>

      {/* 아래 카테고리 ( 기본) 정렬 렌더링 */}
      {basicSort ? (
        <>
          {categoty_Toggle ? (
            <>
              <button
                onClick={() => {
                  setCategoty_Toggle(!categoty_Toggle);
                }}
              >
                카테고리 토글 버튼
              </button>
              <button
                onClick={() => {
                  setCategoryEdit(!CategoryEdit);
                }}
              >
                수정
              </button>
              <div>
                {mypaper_data?.categories.map((value, index) => {
                  return (
                    <CategoryList
                      key={index}
                      categories={value}
                      userId={userId}
                    />
                  );
                })}
              </div>
            </>
          ) : (
            <>
              <button
                onClick={() => {
                  setCategoty_Toggle(!categoty_Toggle);
                }}
              >
                카테고리 토글 버튼
              </button>
            </>
          )}
        </>
      ) : null}

      {/* 아래 태그 정렬 렌더링*/}
      {tagSort ? (
        <TagSortWrap>
          <TagSort>
            {mypaper_data?.tags.map((value, index) => {
              return <Tag key={index}>{value}</Tag>;
            })}
          </TagSort>
        </TagSortWrap>
      ) : null}

      {/* 아래 전체 정렬 렌더링*/}
      {allSort ? (
        <AllSortWrap>
          <AllSort>
            {mypaper_data?.user.Papers.map((value, idx) => {
              // console.log(mypaper_data);

              return (
                <ContentBox
                  key={idx}
                  title={value.title}
                  thumbnail={value.thumbnail}
                  tags={value.tags}
                  createdAt={value.createdAt}
                  userId={value.userId}
                  postId={value.postId}
                />
              );
            })}
          </AllSort>
        </AllSortWrap>
      ) : null}
    </Container>
  );
};

// Container 이 페이지 전체 박스
const Container = styled.div`
  height: 500vh;
`;
// MyProfile 박스
const MyProfile = styled.div`
  height: 200px;
  width: 30vw;
`;

// SortType 정렬들의 부모 박스
const SortType = styled.div`
  height: 100px;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  font-size: x-large;
  gap: 1%;

  > p:hover {
    position: relative;

    text-decoration: underline;
    text-underline-position: under;
    text-decoration-thickness: 2px;
  }
`;

// TagSortWrap wrap - 3
const TagSortWrap = styled.div`
  height: 80vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
`;
// TagSort box - 3
const TagSort = styled.div`
  height: 80vh;
  width: 50vw;
  display: flex;
  justify-content: center;
  position: relative;
  top: 110px;
  gap: 1%;
`;
// Tag div - 3
const Tag = styled.div`
  height: 25px;
  width: 90px;
  box-sizing: border-box;
  border: 2px solid black;
  border-radius: 20px;
  padding: 5px;
  font-family: "Noto Sans";
  font-style: normal;
  font-weight: 600;
  font-size: 12px;
  line-height: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  :hover {
    cursor: pointer;
    color: white;
    background-color: black;
    transition: all 0.3s;
  }
`;
// AllSortWrap wrap - 4
const AllSortWrap = styled.div`
  height: 2000px;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  top: 120px;
`;
// AllSort box - 4
const AllSort = styled.div`
  height: 80vh;
  width: 70vw;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 12%;
`;
export default Paper;
