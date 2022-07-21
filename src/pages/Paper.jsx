import React, { useCallback, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { getCookie } from "../shared/Cookie";
/* api */
import { apiToken } from "../shared/apis/Apis";
/* 컴포넌트 */
import Header from "../components/main/Header";
import ContentBox from "../components/paper/ContentBox";
import CategoryList from "../components/paper/CategoryList";
/*그 외 */
import defaultUserImage from "../public/images/default_profile.png";

const Paper = () => {
  const { blogId } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  // Cookies
  const isHost = getCookie("blogId");
  // const profileImage = getCookie("profileimage");
  // State
  const [tagSort, setTagSort] = useState(false);
  const [allSort, setAllSort] = useState(true);
  const [categoty_Toggle, setCategoty_Toggle] = useState(false);
  const [CategoryEdit, setCategoryEdit] = useState(false);
  const [EditButton, setEditButton] = useState(false);
  // 변수 저장
  //## 이벤트
  const onTag = useCallback(() => {
    setAllSort(false);
  }, []);

  const onAll = useCallback(() => {
    setAllSort(true);
    // if (allSort == true) {
    //   setTagSort(false);
    // }
  }, []);

  //## 개인 페이지 구독하기 useMutation post
  const PostSubscribeData = async () => {
    const response = await apiToken.post(`/api/paper/${blogId}/subscription`);
    return response;
  };

  const { mutate: onSubscribe } = useMutation(PostSubscribeData, {
    onSuccess: (data) => {
      queryClient.invalidateQueries("paper_data");
      // console.log(data);
    },
    onError: () => {
      alert("error");
    },
  });
  //## 개인 페이지 데이터  useQuery get
  const GetMyPaperData = async () => {
    const response = await apiToken.get(`/api/paper/${blogId}`);
    return response?.data;
  };

  const { data: mypaper_data } = useQuery("paper_data", GetMyPaperData, {
    onSuccess: (data) => {
      // console.log(data);
      return data;
    },
    staleTime: 0,
    cacheTime: 0,
  });
  //## 개인 프로필 데이터 useQuery get
  const GetMyProfileData = async () => {
    const response = await apiToken.get(`/api/paper/miniprofile`);
    return response.data.user;
  };

  const { data: myprofile_data, status } = useQuery(
    "myprofile_data",
    GetMyProfileData,
    {
      onSuccess: (data) => {
        console.log(data);
        return data;
      },
    }
  );

  if (status === "loading") {
    return <>loading...</>;
  }

  if (status === "error") {
    return alert("error");
  }
  const S3 = process.env.REACT_APP_S3_URL + `/${myprofile_data?.profileImage}`;

  // console.log(mypaper_data.categories);
  return (
    <Container>
      <Header />
      <MyProfile>
        <MyProfileWrap>
          <div className="MyProfileWrap_div1">
            <ProfileImg
              src={
                myprofile_data?.profileImage === null ? defaultUserImage : S3
              }
            />
          </div>
          <div className="MyProfileWrap_div2">
            <Nickname>{myprofile_data?.nickname}</Nickname>
            <Introduction>{myprofile_data?.introduction}</Introduction>
            <div className="MyProfileWrap_div3">
              <Subscribe>구독자</Subscribe>
              <Tree>나무</Tree>
            </div>
          </div>
        </MyProfileWrap>
        {isHost === blogId ? null : (
          <div className="MyProfile_div1">
            <Button
              onClick={() => {
                onSubscribe();
              }}
              color="white"
            >
              구독하기
            </Button>
            <Button background_color="#FFFDF7">채팅 예약하기</Button>
          </div>
        )}
      </MyProfile>
      <SortType>
        <p style={{ cursor: "pointer" }} onClick={onAll}>
          All
        </p>
        <p style={{ cursor: "pointer" }} onClick={onTag}>
          Tag
        </p>
      </SortType>

      {/* 아래 전체 정렬 렌더링*/}
      {allSort ? (
        <ContainerAllSort>
          <Warpper>
            <CategoryWrap>
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
                          blogId={blogId}
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
            </CategoryWrap>
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
                      blogId={value.blogId}
                      postId={value.postId}
                    />
                  );
                })}
              </AllSort>
            </AllSortWrap>
          </Warpper>
        </ContainerAllSort>
      ) : (
        <TagSortWrap>
          <TagSort>
            {mypaper_data?.tags.map((value, index) => {
              return <Tag key={index}>{value}</Tag>;
            })}
          </TagSort>
        </TagSortWrap>
      )}
    </Container>
  );
};

// Container 이 페이지 전체 박스
const Container = styled.div`
  width: 1920px;
  height: 1885px;
  overflow-x: hidden;
`;
// MyProfile 박스
const MyProfile = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 260px;
  width: 100%;
  border: 1px solid black;
  .MyProfile_div1 {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    /* justify-items: flex-start; */
    height: 59%;
    width: 154px;
    gap: 10px;
  }
`;
// MyProfile의  Wrap
const MyProfileWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 59%;
  width: 34%;
  border: 2px solid black;
  .MyProfileWrap_div1 {
    height: 100%;
    width: 25%;
  }
  .MyProfileWrap_div2 {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 60%;
  }
  .MyProfileWrap_div3 {
    height: 100%;
    width: 60%;
  }
`;
// 기본 모음
// Button
const Button = styled.button`
  height: 40px;
  width: 100%;
  color: ${(props) => props.color || "black"};
  background-color: ${(props) => props.background_color || "black"};
  border: 1px solid black;
  font-size: 14px;
  font-weight: 400;
  line-height: 14px;
  outline: 1px solid #000000;
`;
// MyProfile의 ProfileImg
const ProfileImg = styled.img`
  height: 100%;
  width: 100%;
  border: 1px solid #000000;
  border-radius: 200px;
`;

const Nickname = styled.div``;
const Introduction = styled.div``;
const Subscribe = styled.div``;
const Tree = styled.div``;
// Subscribe 박스

// SortType 정렬들의 부모 박스
const SortType = styled.div`
  height: 100px;
  width: 100%;
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
  width: 100%;
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

const ContainerAllSort = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  height: 996px;
  width: 100%;
`;

const Warpper = styled.div`
  height: 100%;
  width: 56%;
`;
// AllSortWrap wrap - 4
const AllSortWrap = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  overflow: hidden;
  /* overflow-x: hidden; */
`;
// AllSort box - 4
const AllSort = styled.div`
  height: 80%;
  width: 70%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
  gap: 12%;
`;

const CategoryWrap = styled.div`
  height: 141px;
  width: 14%;
`;
export default Paper;
