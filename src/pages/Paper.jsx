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
/*그외 */
import defaultUserImage from "../public/images/default_profile.png";
import ArrowUp from "../public/images/icons/Keyboard_up.png";
import ArrowDown from "../public/images/icons/Keyboard_down.png";
import Footer from "../components/main/Footer";

const Paper = () => {
  const { blogId } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  // Cookies
  const isHostId = getCookie("blogId");
  // State
  const [tagSort, setTagSort] = useState(false);
  const [allSort, setAllSort] = useState(true);
  const [categoty_Toggle, setCategoty_Toggle] = useState(false);
  const [CategoryEdit, setCategoryEdit] = useState(false);
  const [EditButton, setEditButton] = useState(false);
  const [SelectCategory, setSelectCategory] = useState(null);
  console.log(SelectCategory);
  //## 이벤트
  const onTag = useCallback(() => {
    setAllSort(!allSort);
    setCategoty_Toggle(false);
  }, [allSort]);

  const onCategory = (e) => {
    setSelectCategory(e);
  };
  // const onCategory = (e) => {
  //   console.log(e.target.value);
  // };
  const onAll = useCallback(() => {
    setAllSort(true);
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
    onError: (err) => {
      alert(err.response.data.errorMessage);
      navigate("/login");
      window.scrollTo(0, 0);
    },
  });

  //## 개인 페이지 데이터  useQuery get
  const GetMyPaperData = async () => {
    const response = await apiToken.get(`/api/paper/${blogId}`);
    return response?.data;
  };

  const { data: mypaper_data, status } = useQuery(
    ["paper_data", blogId],
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
  // 변수 값 저장
  const S3 =
    process.env.REACT_APP_S3_URL + `/${mypaper_data?.user.profileImage}`;

  const isSubscribe = mypaper_data.user.Followers.find((value) => {
    return value.blogId === isHostId;
  });
  const SelectCategoryData = mypaper_data?.user.Papers.filter(
    (PostsData) => PostsData.category === SelectCategory
  );
  console.log(SelectCategoryData);
  console.log("isSubscribe", isSubscribe);
  // console.log(mypaper_data.user.Followers);
  // console.log(mypaper_data?.categories);
  console.log(mypaper_data?.user.Papers);
  return (
    <Container>
      <Header />
      <MyProfile>
        <MyProfileWrap>
          <div className="MyProfileWrap_div1">
            <ProfileImg
              src={
                mypaper_data?.user.profileImage === null ? defaultUserImage : S3
              }
            />
          </div>
          <div className="MyProfileWrap_div2">
            <Nickname>{mypaper_data?.user.nickname}</Nickname>
            <Introduction>{mypaper_data?.user.introduction}</Introduction>
            <Subscribe>구독자</Subscribe>
          </div>
        </MyProfileWrap>
        {isHostId === blogId ? null : (
          <div className="MyProfile_div1">
            {isSubscribe === undefined ? (
              <Button
                onClick={() => {
                  onSubscribe();
                }}
                color="#FFFFFF"
              >
                구독하기
              </Button>
            ) : (
              <Button
                onClick={() => {
                  onSubscribe();
                }}
                color="#ACACAC"
                background_color="#E5E2DB"
                border_color="#ACACAC"
                outline_color="#ACACAC"
              >
                구독중
              </Button>
            )}

            <Button
              onClick={() => {
                if (isHostId == null) {
                  alert("로그인 후 이용 가능한 기능입니다.");
                  navigate("/login");
                  window.scrollTo(0, 0);
                } else {
                  navigate(`/paper/${blogId}/reservation`);
                }
              }}
              background_color="#FFFDF7"
            >
              채팅 예약하기
            </Button>
          </div>
        )}
      </MyProfile>
      <SortType>
        <CategoryWrap>
          {categoty_Toggle ? (
            <>
              <div className="SelectWrap">
                <button
                  className="SelectBox"
                  onClick={() => {
                    setCategoty_Toggle(!categoty_Toggle);
                  }}
                >
                  카테고리 <img src={ArrowUp} alt="카테고리" />
                </button>
              </div>
              {/* <button
                onClick={() => {
                  setCategoryEdit(!CategoryEdit);
                }}
              >
                수정
              </button> */}
              <div className="OptionWrap">
                {mypaper_data?.categories.map((value, index) => {
                  return (
                    <CategoryList
                      onCategory={onCategory}
                      key={index}
                      categories={value}
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
                  setAllSort(true);
                }}
              >
                카테고리
                <img src={ArrowDown} alt="카테고리" />
              </button>
            </>
          )}
        </CategoryWrap>
        <button className="TagBtn" onClick={onTag}>
          태그 모음{" "}
          {allSort ? (
            <img src={ArrowDown} alt="태그모음" />
          ) : (
            <img src={ArrowUp} alt="태그모음" />
          )}
        </button>
      </SortType>
      <ContainerMiddle>
        {/* 아래 전체 정렬 렌더링*/}
        {allSort ? (
          <>
            {SelectCategory === null ? (
              <>
                <AllSortWrap>
                  {mypaper_data?.user.Papers.map((value, idx) => {
                    // console.log(mypaper_data);

                    return (
                      <ContentBox
                        key={idx}
                        title={value.title}
                        thumbnail={value.thumbnail}
                        tags={value.tags}
                        createdAt={value.createdAt}
                        blogId={blogId}
                        postId={value.postId}
                        content={value.contents}
                      />
                    );
                  })}
                </AllSortWrap>
              </>
            ) : (
              <>
                <AllSortWrap>
                  {SelectCategoryData?.map((value, idx) => {
                    // console.log(mypaper_data);

                    return (
                      <ContentBox
                        key={idx}
                        title={value.title}
                        thumbnail={value.thumbnail}
                        tags={value.tags}
                        createdAt={value.createdAt}
                        blogId={blogId}
                        postId={value.postId}
                        content={value.contents}
                      />
                    );
                  })}
                </AllSortWrap>
              </>
            )}
          </>
        ) : (
          <TagSortWrap>
            <TagSort>
              {mypaper_data?.tags.map((value, index) => {
                return <Tag key={index}>{value}</Tag>;
              })}
            </TagSort>
          </TagSortWrap>
        )}
      </ContainerMiddle>
      <Footer />
    </Container>
  );
};

// Container 이 페이지 전체 박스
const Container = styled.div`
  max-width: 1920px;
  margin: 0 auto;
  overflow-x: hidden;
`;
const ContainerMiddle = styled.div`
  width: 1920px;
  min-height: 1000px;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  margin-left: 135px;
  overflow-y: hidden;
`;
// MyProfile 박스
const MyProfile = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 260px;
  width: 100%;
  border-top: 1px solid #acacac;
  border-bottom: 1px solid #acacac;
  outline: 1px solid #acacac;
  .MyProfile_div1 {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    height: 59%;
    width: 154px;
    gap: 10px;
  }
`;
// MyProfile의  Wrap
const MyProfileWrap = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  height: 154px;
  width: 720px;
  gap: 24px;
  .MyProfileWrap_div1 {
    height: 100%;
    width: calc(100% - 566px);
  }
  .MyProfileWrap_div2 {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: calc(100% - 20px);
    width: calc(100% - 178px);
  }
`;
// 기본 모음
// Button
const Button = styled.button`
  height: 40px;
  width: 100%;
  color: ${(props) => props.color || "black"};
  background-color: ${(props) => props.background_color || "black"};
  border: 1px solid ${(props) => props.border_color || "black"};
  font-family: Gmarket Sans;
  font-size: 14px;
  font-weight: 400;
  line-height: 14px;
  outline: 1px solid ${(props) => props.outline_color || "black"};
`;
// MyProfile의 ProfileImg
const ProfileImg = styled.img`
  height: 100%;
  width: 100%;
  border: 1px solid #ffffff;
  border-radius: 50%;
`;

const Nickname = styled.div`
  width: 100%;
  height: 24px;
  display: flex;
  justify-content: flex-start;
  height: 24px;
  font-size: 24px;
  font-weight: 400;
  font-family: "Gmarket Sans";
  color: #333333;
  /* opacity: 0.9; */
`;
const Introduction = styled.div`
  width: 540px;
  min-height: 70px;
  max-height: 70px;
  padding-top: 15px;
  padding-right: 15px;
  margin-bottom: 25px;
  overflow: hidden;
  font-size: 14px;
  font-family: "Noto Sans";
  font-weight: 500;
  line-height: 19px;
`;
const Subscribe = styled.div`
  width: 542px;
  height: 19px;
  font-size: 14px;
  font-family: "Noto Sans";
  font-weight: 500;
  line-height: 19px;
  padding-top: 5px;
  /* margin-top: 15px; */
`;

// SortType 정렬들의 부모 박스
const SortType = styled.div`
  height: 155px;
  width: 500px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 18px;
  margin-left: 470px;
  .TagBtn {
    display: flex;
    justify-content: space-between;
    height: 32px;
    width: 154px;
    color: #333333;
    border-bottom: 2px solid;
    background-color: #fffdf7;
    font-size: 16px;
    font-weight: 400;
    line-height: 16px;
  }
`;

// TagSortWrap wrap - 3
const TagSortWrap = styled.div`
  width: 1078px;
  min-height: 600px;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
`;
// TagSort box - 3
const TagSort = styled.div`
  max-width: 1078px;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  margin-top: 10px;
  padding-right: 150px;
  gap: 15px 8px;
`;
// Tag div - 3
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
  font-size: 16px;
  line-height: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: rgb(0 0 0 / 6%) 0px 4px 15px 0px;
  :hover {
    cursor: pointer;
    color: white;
    background-color: black;
    transition: all 0.3s;
  }
`;

// AllSortWrap wrap - 4 / 각 포스트들 간의 간격 gap
const AllSortWrap = styled.div`
  width: 1078px;
  /* min-height: 1200px; */
  display: flex;
  flex-wrap: wrap;
  gap: 30px 40px;
`;

const CategoryWrap = styled.div`
  height: 32px;
  width: 154px;
  position: relative;
  /* overflow-y: ; */
  select {
    -webkit-appearance: none;

    -moz-appearance: none;

    appearance: none;
  }
  button {
    display: flex;
    justify-content: space-between;
    height: 32px;
    width: 154px;
    color: #333333;
    border-bottom: 2px solid;
    cursor: pointer;
    font-weight: 400;
    font-size: 16px;
    line-height: 16px;
    font-family: "Gmarket Sans";
    background-color: #fffdf7;
  }

  .SelectWrap {
    height: 32px;
    width: 154px;

    z-index: 4;
  }
  .OptionWrap {
    width: 154px;
    min-height: 0px;
    max-height: 300px;
    width: 154px;
    margin-top: 8px;
    outline: 1px solid #acacac;
    border: 1px solid #acacac;
    overflow-y: scroll;
    position: relative;
    z-index: 99;
  }
  .OptionWrap::-webkit-scrollbar {
    width: 10px;
    background-color: white;
  }
  .OptionWrap::-webkit-scrollbar-thumb {
    background-color: #acacac;
  }

  .OptionWrap::::-webkit-scrollbar-track {
    background-color: #acacac;
    box-shadow: inset 0px 0px 5px white;
  }
`;
export default Paper;
