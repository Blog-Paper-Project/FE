import React, { useState } from "react";
import { useRef } from "react";
import { useNavigate } from "react-router";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { apiToken } from "../../shared/apis/Apis";
import { getCookie, setCookie } from "../../shared/Cookie";
import styled from "styled-components";
// Editor
import { Editor } from "@toast-ui/react-editor";
import "@toast-ui/editor/dist/toastui-editor.css";
import "@toast-ui/editor/dist/i18n/ko-kr";
// Images
import Paper_Logo from "../../public/images/logo_paper.svg";
import Post_Icon from "../../public/images/icons/post_Icon.png";
import Meiyou_thumnail from "../../public/images/meiyou_thumnail.png";

const WriteEdit = () => {
  // React Hooks
  const editorRef = useRef();
  const navigate = useNavigate();
  // Cookies
  const LoginIdCheck = getCookie("blogId");
  const blogId = getCookie("blogId");
  // States
  const [markdown_data, setData] = useState("");
  const [head_data, setHead] = useState(null);
  const [thumbImage, setImage] = useState(null);
  const [tag, setTag] = useState("");
  const [tagList, setTagList] = useState([]);
  const [openModal, setOpenModal] = useState(false); // # 썸네일, 카테고리 고르는 모달 오픈
  const [previewImg, setPreviewImg] = useState(thumbImage); // # 썸네일
  const [editCategory, setEditCategory] = useState(false);
  const [category, setCategory] = useState("etc");
  const [categoryList, setCategoryList] = useState([]);
  const [selectOption, setSelectOption] = useState("etc");
  if (LoginIdCheck == undefined) {
    alert("로그인 후 이용 가능한 기능입니다.");
    navigate("/login");
  }
  // 이미지 미리보기
  const encodeFileToBase64 = (fileBlob) => {
    const reader = new FileReader();

    reader.readAsDataURL(fileBlob);
    // console.log(fileBlob); 이 매겨변수는 아래 사진의 onChange 해당
    return new Promise((resolve) => {
      reader.onload = () => {
        setPreviewImg(reader.result);
        resolve();
      };
    });
  };

  // ## Events
  // modal event
  const onModal = () => {
    setOpenModal(!openModal);
  };
  // ModifyEdit의 데이터(text->markdown) event
  const onchange = (e) => {
    const write_data = editorRef.current?.getInstance().getMarkdown();
    // console.log("25", abc);
    setData(write_data); // 이는 위의 head_data 값
    // console.log("27", markdown_data);
  };

  // 붙혀넣기 금지 event (ctnrl 키 금지)
  const onKeyDown = (e) => {
    window.onkeydown = (e) => {
      // console.log(e.key);
      if (e.key === "Control") {
        alert("붙혀넣기 금지");
      }
    };
  };
  // 'Enter'시 카테고리 추가 event
  const onEnter = (e) => {
    if (
      e.target.value.length !== 0 &&
      e.keyCode === 13 &&
      categoryList.includes(e.target.value) !== true
    ) {
      setCategoryList([...categoryList, category]);
      setSelectOption(category);
      setCategory("");
      setEditCategory(!editCategory);
    } else if (
      e.keyCode === 13 &&
      categoryList.includes(e.target.value) == true
    ) {
      setCategory("");
    }
  };
  // 'Click'시 카테고리 추가 event
  const onClick_categoty = () => {
    if (
      category.length !== 0 &&
      category !== "etc" &&
      categoryList.includes(category) !== true
    ) {
      setCategoryList([...categoryList, category]);
      setSelectOption(category);
      setCategory("");
      setEditCategory(!editCategory);
    } else if (
      category.length === 0 &&
      category === "etc" &&
      categoryList.includes(category) == true
    ) {
      setCategory("");
    }
  };
  // 'Enter'시 태그 추가 event
  const onKeyUp = (e) => {
    if (
      e.target.value.length !== 0 &&
      e.keyCode === 13 &&
      tagList.length < 10 &&
      tagList.includes(e.target.value) !== true
    ) {
      // 새 태그 배열(array) 안에 넣기 < 그래야 map으로 돌릴 수 있음 >
      setTagList([...tagList, tag]);
      setTag(""); // input에 value는 enter 후에 input 창 글 없애기 위함
    } else if (e.keyCode === 13 && tagList.includes(e.target.value) == true) {
      setTag("");
    }
  };
  // 'Click'시 태그 삭제 event
  const onClcik_tag = (e) => {
    // console.log(e.target.id);
    setTagList(
      tagList.filter((tag, index) => {
        return index !== +e.target.id; // + 대신 Number(  )해도 숫자형으로 바꿀 수 있다.
      })
    );
  };
  // 임시저장 event
  const onTemporary = () => {
    setCookie("Temporary_Content", markdown_data, 10);
  };

  // UseMutation write 데이터 post의 함수
  const postfecher = async () => {
    let formData = new FormData();
    formData.append("image", thumbImage);
    const image_data = await apiToken.post("/api/paper/image", formData);

    const response = await apiToken.post("/api/paper", {
      contents: markdown_data,
      title: head_data,
      thumbnail: image_data?.data.imageUrl,
      tags: tagList,
      category: selectOption,
    });
    setTag("");
    setTagList([]);
    return response?.data.paper;
  };
  // UseMutation write 데이터 post
  const queryClient = useQueryClient();
  const { data: res, mutate: onPost } = useMutation(postfecher, {
    onSuccess: (res) => {
      queryClient.invalidateQueries("paper_data");

      navigate(`/paper/${blogId}`);
      alert("post 성공!");
    },
    onError: (err) => {
      alert("제목은 2글자, 내용은 6글자 이상시 발행 가능합니다.");
    },
  });
  // UseQuery 카테고리 데이터 get 함수
  const GetMyPaperData = async () => {
    const response = await apiToken.get(`/api/paper/${blogId}`);
    // console.log(response);
    return response?.data;
  };
  // UseQuery 카테고리 데이터 get
  const { data: mypaper_data, status } = useQuery(
    "paper_data",
    GetMyPaperData,
    {
      onSuccess: (data) => {
        const categoriesAll = data?.categories;
        setCategoryList([...categoriesAll]);
        // console.log(categoriesAll);
      },
      staleTime: 0,
    }
  );

  if (status === "loading") {
    return <>loading...</>;
  }

  if (status === "error") {
    return alert("error");
  }

  return (
    <Container>
      <Head>
        <div>
          <Logo
            src={Paper_Logo}
            onClick={() => {
              navigate("/");
            }}
          ></Logo>
        </div>
        <div>
          <Button
            width="96px"
            background_color="#FFFFFF"
            border_color="white"
            outline_color="white"
            onClick={() => {
              navigate(`/paper/${mypaper_data?.user.blogId}`);
            }}
          >
            나가기
          </Button>
          <Button
            width="96px"
            background_color="#FFFFFF"
            color="#A7ACA1"
            border_color="white"
            outline_color="white"
            onClick={()=>{alert("준비 중인 기능입니다!")}}
          >
            임시저장
          </Button>
          <Button color="white" onClick={onModal}>
            {openModal ? "취소" : "발행하기"}
          </Button>
        </div>
      </Head>
      <ModalBoxWrap>
        {openModal ? (
          <ModalBox>
            {editCategory ? (
              <>
                <CategoryWarp className="openInput">
                  <div className="category_name2">카테고리</div>
                  <input
                    type="text"
                    className="input_plus"
                    onChange={(e) => {
                      setCategory(e.target.value);
                    }}
                    onKeyUp={onEnter}
                  />
                  <button
                    className="btn_plus"
                    onClick={() => {
                      onClick_categoty(category);
                    }}
                  >
                    추가
                  </button>
                  <button
                    className="btn_plus"
                    onClick={() => {
                      setEditCategory(!editCategory);
                    }}
                  >
                    취소
                  </button>
                </CategoryWarp>
                <Box></Box>
              </>
            ) : (
              <CategorySelectWrap>
                <CategoryWarp>
                  <div className="category_name1">카테고리</div>
                  <select
                    onChange={(e) => {
                      setSelectOption(e.target.value);
                    }}
                    autoFocus
                    required
                  >
                    {mypaper_data?.categories.length === 0 ? (
                      <>
                        <>
                          <option value="etc">etc</option>
                        </>

                        <>
                          {categoryList?.map((value, idx) => {
                            return (
                              <option key={idx} value={value}>
                                {value}
                              </option>
                            );
                          })}
                        </>
                      </>
                    ) : (
                      <>
                        <option value="Art">Art</option>{" "}
                        <option value="Sport">Sport</option>{" "}
                        <option value="Daily">Daily</option>{" "}
                        <option value="Food">Food</option>{" "}
                        <option value="Tour">Tour</option>{" "}
                        <option value="Study">Study</option>{" "}
                        <option value="Shopping">Shopping</option>{" "}
                        <option value="Pet">Pet</option>
                      </>
                    )}
                  </select>
                </CategoryWarp>
                <button
                // onClick={() => {
                //   setEditCategory(!editCategory);
                // }}
                ></button>
              </CategorySelectWrap>
            )}

            <ThumbmailWrap>
              <div>
                <div className="thumnail">썸네일</div>
                <label for="file">
                  <div className="btn-upload">파일 선택</div>
                </label>
                <input
                  type="file"
                  name="file"
                  id="file"
                  onChange={(e) => {
                    setImage(e.target.files[0]);
                    encodeFileToBase64(e.target.files[0]);
                  }}
                  maxLength="20"
                ></input>
              </div>
              <Thumbmail
                src={previewImg !== null ? previewImg : Meiyou_thumnail}
                alt=""
              />
            </ThumbmailWrap>
            <ButtonWrap>
              <PostButton
                height="36px"
                width="120px"
                background_color="white"
                onClick={onPost}
              >
                <PostImg src={Post_Icon} />
                발행
              </PostButton>
            </ButtonWrap>
          </ModalBox>
        ) : null}
      </ModalBoxWrap>
      <SpaceWrap>
        <Space />
        <EditWrap
        // //## 마우스 오른쪽 클릭 이벤트
        // onContextMenu={(e) => {
        //   e.preventDefault();
        //   alert("붙혀넣기 금지");
        // }}
        >
          <TitleWrap>
            <Title
              placeholder="제목을 입력하세요"
              onChange={(e) => {
                setHead(e.target.value);
              }}
              maxLength="30"
            ></Title>
            <Line />
            <HashTagInput
              name="HashTagInput"
              type="text"
              value={tag || ""}
              placeholder="태그를 입력하세요"
              maxLength="20"
              onKeyUp={onKeyUp}
              onChange={(e) => {
                setTag(e.target.value);
              }}
            ></HashTagInput>
            <HashWrapOuter>
              {tagList.length > 0 ? (
                tagList.map((value, index) => {
                  return (
                    <Tag key={value + index} onClick={onClcik_tag}>
                      <p id={index}>{value}</p>
                    </Tag>
                  );
                })
              ) : (
                <div>'Enter'을 누르면 태그를 추가할 수 있습니다.</div>
              )}
            </HashWrapOuter>
          </TitleWrap>
          <Editor
            previewStyle="vertical"
            placeholder="당신의 이야기를 적어보세요 ..."
            height="auto"
            minHeight="650px"
            initialEditType="markdown"
            initialValue={markdown_data}
            ref={editorRef}
            onChange={onchange}
            useCommandShortcut={false}
            // onKeydown={onKeyDown}
            usageStatistics={false}
            language="ko-KR"
            toolbarItems={[
              ["heading", "bold", "italic"],
              ["hr", "quote", "task"],
              ["code", "codeblock"],
              ["ul", "ol", "image", "link"],
            ]}
            hooks={{
              addImageBlobHook: async (blob, callback) => {
                // 1. 첨부된 이미지 파일을 서버로 전송후, 이미지 경로 url을 받아온다.
                let formData = new FormData();
                formData.append("image", blob);
                const response = await apiToken.post(
                  "/api/paper/image",
                  formData
                );

                // 2. 첨부된 이미지를 화면에 표시(경로는 임의로 넣었다.)
                callback(
                  process.env.REACT_APP_S3_URL + `/${response?.data.imageUrl}`,
                  `${blob.name.split(".")[0]}`
                );
              },
            }}
          />
        </EditWrap>
        <Space />
      </SpaceWrap>
    </Container>
  );
};
const Container = styled.div`
  width: 100%;
  background-color: white;
`;
const SpaceWrap = styled.div`
  display: flex;
  justify-content: space-between;
`;
const Space = styled.div`
  width: 180px;
  background-color: #f8f8f8;
`;
const EditWrap = styled.div`
  width: 78%;
  min-height: 1200px;
  padding-left: 40px;
  padding-right: 40px;
`;
// 헤더 관련
const Head = styled.div`
  width: 100%;
  height: 72px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 48px;
  padding-right: 50px;
  outline: 1px solid #a7aca1;
  background-color: white;
  position: fixed;
  z-index: 99;
`;
const ModalBoxWrap = styled.div`
  display: flex;
  justify-content: flex-end;
  padding-right: 49px;
  padding-top: 72px;
`;
const ModalBox = styled.div`
  height: 359px;
  width: 424px;
  border: 1px solid #a7aca1;
  background-color: #ffffff;
  position: absolute;
  z-index: 1;

  input[type="file"] {
  }

  .category_name1 {
    display: flex;
    align-items: center;
    height: 20px;
    width: 65px;
    font-size: 14px;
    font-weight: 500;
    font-family: "Noto Sans KR";
    line-height: 20px;
    padding-left: 4px;
  }
  .category_name2 {
    display: flex;
    align-items: center;
    height: 20px;
    width: 65px;
    font-size: 14px;
    font-weight: 500;
    font-family: "Noto Sans KR";
    line-height: 20px;
    /* padding-left: 4px; */
  }
`;
const CategorySelectWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  select {
    width: 248px;
    padding-left: 8px;
    font-size: 14px;
    font-weight: 400;
    font-family: "Noto Sans KR";
    line-height: 20px;
  }
  button {
    height: 14px;
    width: 85px;
    justify-content: space-between;
    margin-top: 13px;
    margin-bottom: 26px;
    margin-right: 24px;
    background-color: white;
    font-size: 14px;
    font-weight: 400;
    font-family: "Gmarket Sans";
    text-decoration-line: underline;
    line-height: 14px;
  }
`;
const Box = styled.div`
  height: 14px;
  width: 85px;
  margin-top: 13px;
  margin-bottom: 26px;
  margin-right: 24px;
`;
const CategoryWarp = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 36px;
  width: 362px;
  margin-top: 31px;
  margin-left: 40px;
  margin-right: 24px;
  .btn_plus {
    background-color: white;
  }
  .input_plus {
    margin-left: 29px;
    height: 20px;
    width: 170px;
    outline: 1px solid #eee;
    border: 1px solid #eee;
  }
`;

const TitleWrap = styled.div`
  width: 898px;
  height: 146px;
  margin-top: 120px;
  margin-bottom: 32px;
`;
const Title = styled.input`
  height: 60px;
  width: 100%;
  color: #333333;
  font-weight: 700;
  font-size: 40px;
  /* line-height: 60px; */
  padding-bottom: 10px;
  padding-left: 1px;
`;
const Line = styled.div`
  width: 100%;
  height: 0px;
  border-bottom: 2px solid #000000;
`;
const HashWrapOuter = styled.div`
  width: 1400px;
  min-height: 30px;
  display: flex;
  flex-wrap: wrap;
  margin-top: 20px;
  margin-bottom: 20px;
  gap: 7px;
`;
const ThumbmailWrap = styled.div`
  display: flex;
  justify-content: space-between;
  height: 140px;
  width: 362px;
  margin-left: 40px;
  margin-right: 24px;
  input[type="file"] {
    display: none;
  }
  .btn-upload {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 24px;
    width: 86px;
    color: #333333;
    outline: 1px solid black;
    font-size: 14px;
    line-height: 14px;
    font-weight: 400;
    margin-top: 16px;
  }
  .thumnail {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 20px;
    width: 42px;
    font-size: 14px;
    font-weight: 500;
    font-family: "Noto Sans KR";
    line-height: 20px;
  }
`;
const Thumbmail = styled.img`
  display: block;
  width: 248px;
  height: 140px;
`;

const HashTagInput = styled.input`
  height: 25px;
  width: 100%;
  margin-top: 15px;
  outline: none;
  cursor: text;
  border: none;
  color: #333333;
  font-size: 18px;
  font-weight: 500;
  line-height: 24.52px;
  padding: 0;
`;

const Tag = styled.div`
  height: 25px;
  min-width: 60px;
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
  cursor: pointer;
`;

const Logo = styled.img`
  height: 28px;
  width: 153px;
`;
const PostImg = styled.img`
  height: 20px;
  width: 20px;
`;
// Button
const ButtonWrap = styled.div`
  height: 70px;
  width: 400px;
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
`;
const Button = styled.button`
  height: ${(props) => props.height || "40px"};
  width: ${(props) => props.width || "154px"};
  color: ${(props) => props.color || "black"};
  background-color: ${(props) => props.background_color || "black"};
  border: 1px solid ${(props) => props.border_color || "black"};
  font-family: "Gmarket Sans";
  font-size: 14px;
  font-weight: 400;
  line-height: 14px;
  outline: 1px solid ${(props) => props.outline_color || "black"};
`;
const PostButton = styled(Button)`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;
export default WriteEdit;
