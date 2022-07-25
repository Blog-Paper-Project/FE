import React, { useState } from "react";
import { useRef } from "react";
import { useNavigate } from "react-router";
import styled from "styled-components";
/* Editor */
import { Editor } from "@toast-ui/react-editor";
import "@toast-ui/editor/dist/toastui-editor.css";
import "@toast-ui/editor/dist/i18n/ko-kr";
/* Toast ColorSyntax 플러그인 */
import "tui-color-picker/dist/tui-color-picker.css";
import "@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css";
// import colorSyntax from "@toast-ui/editor-plugin-color-syntax";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { apiToken } from "../../shared/apis/Apis";
import { getCookie, setCookie } from "../../shared/Cookie";
import Paper_Logo from "../../public/images/logo_paper.svg";
import Post_Icon from "../../public/images/icons/post_Icon.png";
import Meiyou_thumnail from "../../public/images/meiyou_thumnail.png";

const WriteEdit = () => {
  //## 글 작성 데이터 관련 state
  const [markdown_data, setData] = useState("");
  const [head_data, setHead] = useState(null);
  const [thumbImage, setImage] = useState(null);
  const [tag, setTag] = useState("");
  const [tagList, setTagList] = useState([]);
  const [openModal, setOpenModal] = useState(false); // # 썸네일, 카테고리 고르는 모달 오픈
  const [previewImg, setPreviewImg] = useState(thumbImage); // # 썸네일
  const [editCategory, setEditCategory] = useState(false);
  const [category, setCategory] = useState("");
  const [categoryList, setCategoryList] = useState([]);
  const [selectOption, setSelectOption] = useState("etc");
  // console.log(selectOption);
  // console.log(categoryList);
  const editorRef = useRef();
  const navigate = useNavigate();
  const HostIdCheck = getCookie("userId");
  const blogId = getCookie("blogId");
  //## 이미지 미리보기
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

  //## modal 이벤트
  const onModal = () => {
    setOpenModal(!openModal);
  };

  //## writeEdit의 데이터(text->markdown) 이벤트
  const onchange = (e) => {
    const write_data = editorRef.current?.getInstance().getMarkdown();
    // console.log("25", abc);
    setData(write_data); // 이는 위의 head_data 값
    // console.log("27", markdown_data);
  };

  //## 붙혀넣기 금지 이벤트 (ctnrl 키 금지)
  const onKeyDown = (e) => {
    window.onkeydown = (e) => {
      // console.log(e.key);
      if (e.key === "Control") {
        alert("붙혀넣기 금지");
      }
    };
  };
  //## 'Enter'시 태그 추가 이벤트
  const onKeyUp = (e) => {
    if (
      e.target.value.length !== 0 &&
      e.keyCode === 13 &&
      tagList.length < 10
    ) {
      // 새 태그 배열(array) 안에 넣기 < 그래야 map으로 돌릴 수 있음 >
      setTagList([...tagList, tag]);
      setTag(""); // input에 value는 enter 후에 input 창 글 없애기 위함
    }
  };
  //## 'Click'시 태그 삭제 이벤트
  const onClcik_tag = (e) => {
    // console.log(e.target.id);
    setTagList(
      tagList.filter((tag, index) => {
        return index !== +e.target.id; // + 대신 Number(  )해도 숫자형으로 바꿀 수 있다.
      })
    );
  };
  //## 임시저장 이벤트
  const onTemporary = () => {
    setCookie("Temporary_Content", markdown_data, 10);
  };

  //## useMutation write 데이터 post의 함수
  const postfecher = async () => {
    let formData = new FormData();
    formData.append("image", thumbImage);
    // console.log(formData.get("image"));
    const image_data = await apiToken.post("/api/paper/image", formData);
    // console.log(image_data?.data.imageUrl);

    const response = await apiToken.post("/api/paper", {
      contents: markdown_data,
      title: head_data,
      thumbnail: image_data?.data.imageUrl,
      tags: tagList,
      category: selectOption,
    });
    setTag("");
    setTagList([]);
    // console.log(response?.data);
    return response?.data.paper;
  };
  //## useMutation write 데이터 post
  const queryClient = useQueryClient();
  const { data: res, mutate: onPost } = useMutation(postfecher, {
    onSuccess: (res) => {
      queryClient.invalidateQueries("paper_data");
      // console.log(res?.blogId);

      navigate(`/paper/${blogId}`);
      alert("post 성공!");
    },
    onError: (e) => {
      alert(e.message);
    },
  });
  // ## useQuery 카테고리 데이터 get 함수
  const GetMyPaperData = async () => {
    const response = await apiToken.get(`/api/paper/${blogId}`);
    // console.log(response);
    return response?.data;
  };
  // ## useQuery 카테고리 데이터 get
  const { data: mypaper_data, status } = useQuery(
    "paper_data",
    GetMyPaperData,
    {
      onSuccess: (data) => {
        console.log(data);
        return data;
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
  // console.log(mypaper_data);
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
            onClick={onTemporary}
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
                <CategoryWarp>
                  <div className="category_name">카테고리</div>
                  <input
                    type="text"
                    className="input_plus"
                    onChange={(e) => {
                      setCategory(e.target.value);
                    }}
                    value={category}
                  />
                  <button
                    className="btn_plus"
                    onClick={() => {
                      setCategoryList([...categoryList, category]);
                      setCategory("");
                      setEditCategory(!editCategory);
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
              </>
            ) : (
              <CategorySelectWrap>
                <CategoryWarp>
                  <div className="category_name">카테고리</div>
                  <select
                    onChange={(e) => {
                      setSelectOption(e.target.value);
                    }}
                    required
                  >
                    {categoryList ? (
                      <>
                        {categoryList?.map((value, idx) => {
                          return (
                            <option key={idx} value={value}>
                              {value}
                            </option>
                          );
                        })}
                        {mypaper_data?.categories.length === 0 ? (
                          <>
                            <option value="etc">etc</option>
                          </>
                        ) : (
                          <>
                            {mypaper_data?.categories.map((value, index) => {
                              return (
                                <option key={index} value={value}>
                                  {value}
                                </option>
                              );
                            })}
                          </>
                        )}
                      </>
                    ) : (
                      <>
                        {mypaper_data?.categories.map((value, index) => {
                          return (
                            <option key={index} value={value}>
                              {value}
                            </option>
                          );
                        })}
                      </>
                    )}
                  </select>
                </CategoryWarp>
                <button
                  onClick={() => {
                    setEditCategory(!editCategory);
                  }}
                >
                  카테고리 추가
                </button>
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
                ></input>
              </div>
              <Thumbmail
                src={previewImg !== null ? previewImg : Meiyou_thumnail}
                alt=""
              />
            </ThumbmailWrap>

            {/* <button
              onClick={() => {
                setOpenModal(!openModal);
              }}
            >
              x
            </button> */}
            <ButtonWrap>
              {/* <PostImg src={Post_Icon} /> */}
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
          //## 마우스 오른쪽 클릭 이벤트
          onContextMenu={(e) => {
            e.preventDefault();
            alert("붙혀넣기 금지");
          }}
        >
          <TitleWrap>
            <Title
              placeholder="제목을 입력하세요"
              onChange={(e) => {
                setHead(e.target.value);
              }}
            ></Title>
            <Line />
            <HashTagInput
              name="HashTagInput"
              type="text"
              value={tag || ""}
              placeholder="태그를 입력하세요"
              maxLength="10"
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
            minHeight="500px"
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
              ["ul", "ol", "image"],
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
  max-width: 1920px;
  background-color: white;
`;
const SpaceWrap = styled.div`
  max-width: 1920px;
  display: flex;
`;
const Space = styled.div`
  height: 1000px;
  width: 356px;
  background-color: #f8f8f8;
`;
const EditWrap = styled.div`
  height: 1000px;
  width: 1208px;
  padding-left: 154px;
  padding-right: 154px;
`;
// 헤더 관련 - 2
const Head = styled.div`
  width: 100%;
  height: 72px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 48px;
  padding-right: 50px;
  /* border-bottom: 1px solid #a7aca1; */
  outline: 1px solid #a7aca1;
  background-color: white;
  position: fixed;
  z-index: 1;
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

  .category_name {
    display: flex;
    align-items: center;
    height: 20px;
    width: 57px;
    font-size: 14px;
    font-weight: 500;
    font-family: "Noto Sans KR";
    line-height: 20px;
    padding-left: 4px;
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
    /* margin-left: 2px; */
    height: 20px;
    width: 160px;
    outline: 1px solid #eee;
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
  font-weight: 400;
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
  display: flex;
  flex-wrap: wrap;
  margin-top: 20px;
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
  height: 21px;
  width: 90px;
  box-sizing: border-box;
  outline: 1px solid;
  border: 1px solid;
  border-radius: 5px;
  padding: 5px, 10px, 5px, 10px;
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

// 기본 모음
// Button
const ButtonWrap = styled.div`
  height: 70px;
  width: 400px;
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
`;
const PostImg = styled.img`
  height: 20px;
  width: 20px;
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
const Logo = styled.img`
  height: 28px;
  width: 153px;
`;
export default WriteEdit;
