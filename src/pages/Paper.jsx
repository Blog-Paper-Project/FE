import React, { useCallback, useState } from "react";
import { useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
/* api */
import { apiToken } from "../shared/apis/Apis";
/* 컴포넌트 */
import Header from "../components/main/Header";
import ContentBox from "../components/paper/ContentBox";
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
        console.log(data);
      },
      staleTime: Infinity,
    }
  );

  if (status === "loading") {
    return <>loading...</>;
  }

  if (status === "error") {
    return alert("error");
  }

  return (
    <>
      <Header />
      <p style={{ cursor: "pointer" }} onClick={onBasic}>
        기본 정렬 (카테고리별){" "}
      </p>
      <p style={{ cursor: "pointer" }} onClick={onTag}>
        태그 정렬
      </p>
      <p style={{ cursor: "pointer" }} onClick={onAll}>
        전체 정렬
      </p>
      {basicSort ? (
        <>
          {categoty_Toggle ? (
            <>
              <div>카테고리 입니다</div>
              <button
                onClick={() => {
                  setCategoty_Toggle(!categoty_Toggle);
                }}
              >
                카테고리 토글 버튼
              </button>
              <div>카테고리1</div>
              <div>카테고리2</div>
              <div>카테고리3</div>
              <div>카테고리4</div>
              <div>카테고리5</div>
            </>
          ) : (
            <>
              <div>카테고리 입니다</div>
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
      {tagSort ? (
        <>
          <div> 태그 정렬이 보일 예정</div>

          {mypaper_data?.tags.map((value, index) => {
            return <div key={index}>{value}</div>;
          })}
        </>
      ) : null}
      {allSort ? (
        <>
          <div> 전체 정렬이 보일 예정</div>
          <div>
            {mypaper_data?.user.Papers.map((value, idx) => {
              console.log(mypaper_data);

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
          </div>
        </>
      ) : null}
    </>
  );
};

export default Paper;
