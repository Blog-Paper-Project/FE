import React, { useState } from "react";
import { useRef } from "react";
import { useNavigate } from "react-router";
import styled from "styled-components";
/* Editor */
import { Editor } from "@toast-ui/react-editor";
import "@toast-ui/editor/dist/toastui-editor.css";
/* Toast ColorSyntax 플러그인 */
import "tui-color-picker/dist/tui-color-picker.css";
import "@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css";
// import colorSyntax from "@toast-ui/editor-plugin-color-syntax";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { apiToken } from "../../shared/apis/Apis";
import { getCookie, setCookie } from "../../shared/Cookie";
// import Meiyou2 from "../../public/images/Meiyou.";
/*해야 할 것*/
//1. 여기에 임시글 저장 버튼도 필요함.
//2. 해시태그 post data 안에 key 값 찾아서 넣기
//3. 상세페이지 post로 보낼 때 배열로 보내드릴 것 ( 배열로가 정확히 무슨 뜻일까?)

const WriteEdit = () => {
  //## 글 작성 데이터 관련 state
  const [markdown_data, setData] = useState("");
  const [head_data, setHead] = useState(null);
  const [thumbImage, setImage] = useState(null);
  const [tag, setTag] = useState("");
  const [tagList, setTagList] = useState([]);
  const [openModal, setOpenModal] = useState(false); // # 모달
  const [previewImg, setPreviewImg] = useState(thumbImage);
  const [editCategory, setEditCategory] = useState(false);
  const [category, setCategory] = useState("");
  const [categoryList, setCategoryList] = useState([]);
  const [selectOption, setSelectOption] = useState("etc");
  console.log(selectOption);
  // console.log(categoryList);
  const editorRef = useRef();
  const navigate = useNavigate();
  const HostId = getCookie("userId");
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
    console.log(e.target.id);
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
    console.log(image_data?.data.imageUrl);

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
      queryClient.invalidateQueries("paper_data", "detail_data");
      // console.log(res?.userId);

      navigate(`/paper/${res?.userId}`);
      alert("post 성공!");
    },
    // onError: (data === null) => {
    //   alert("post 실패!");
    // },
  });
  // ## useQuery 카테고리 데이터 get 함수
  const GetMyPaperData = async () => {
    const response = await apiToken.get(`/api/paper/users/${HostId}`);
    // console.log(response);
    return response?.data;
  };
  // ## useQuery 카테고리 데이터 get
  const { data: mypaper_data, status } = useQuery(
    "paper_data",
    GetMyPaperData,
    {
      onSuccess: (data) => {
        // console.log(data);
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
  console.log(mypaper_data);
  return (
    <>
      {openModal ? (
        <div
          style={{
            box_sizing: "border-box",
            border: "solid #5B6DCD 10px",
            height: "800px",
          }}
        >
          <Thumbmail
            src={previewImg !== null ? previewImg : null}
            alt="썸네일"
          />
          <input
            type="file"
            onChange={(e) => {
              setImage(e.target.files[0]);
              encodeFileToBase64(e.target.files[0]);
            }}
          ></input>
          {editCategory ? (
            <>
              <input
                type="text"
                onChange={(e) => {
                  setCategory(e.target.value);
                }}
                value={category}
              />
              <button
                onClick={() => {
                  setCategoryList([...categoryList, category]);
                  setCategory("");
                  setEditCategory(!editCategory);
                }}
              >
                추가
              </button>
              <button
                onClick={() => {
                  setEditCategory(!editCategory);
                }}
              >
                취소
              </button>
            </>
          ) : (
            <>
              <div>카테고리</div>
              <button
                onClick={() => {
                  setEditCategory(!editCategory);
                }}
              >
                카테고리 추가!
              </button>
            </>
          )}
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
          <button
            onClick={() => {
              setOpenModal(!openModal);
            }}
          >
            x
          </button>
          <button onClick={onPost}>click</button>
        </div>
      ) : (
        <div
          //## 마우스 오른쪽 클릭 이벤트
          onContextMenu={(e) => {
            e.preventDefault();
            alert("붙혀넣기 금지");
          }}
        >
          <textarea
            placeholder="제목 쓰는 곳이야"
            onChange={(e) => {
              setHead(e.target.value);
            }}
          ></textarea>
          <input
            name="HashTagInput"
            type="text"
            value={tag || ""}
            placeholder="Enter를 누르시면 태그가 추가됩니다!"
            maxLength="10"
            onKeyUp={onKeyUp}
            onChange={(e) => {
              setTag(e.target.value);
            }}
          ></input>
          <HashWrapOuter>
            {tagList.length > 0 ? (
              tagList.map((value, index) => {
                return (
                  <div key={value + index} onClick={onClcik_tag}>
                    <p id={index}>{value}</p>
                  </div>
                );
              })
            ) : (
              <div>태그를 추가하실 수 있습니다.</div>
            )}
          </HashWrapOuter>
          <Editor
            previewStyle="vertical"
            placeholder="Paper에 자신의 생각을 적어주세요..."
            height="900px"
            minHeight="600px"
            initialEditType="markdown"
            initialValue={markdown_data}
            ref={editorRef}
            onChange={onchange}
            useCommandShortcut={false}
            onKeydown={onKeyDown}
            usageStatistics={false}
            hooks={{
              addImageBlobHook: async (blob, callback) => {
                // console.log(blob.name.split(".")[0]); // File {name: '.png', ... }

                // 1. 첨부된 이미지 파일을 서버로 전송후, 이미지 경로 url을 받아온다.
                let formData = new FormData();
                formData.append("image", blob);

                const response = await apiToken.post(
                  "/api/paper/image",
                  formData
                );
                // console.log(response?.data.imageUrl);
                // console.log(process.env.REACT_APP_S3_URL);

                // 2. 첨부된 이미지를 화면에 표시(경로는 임의로 넣었다.)
                callback(
                  process.env.REACT_APP_S3_URL + `/${response?.data.imageUrl}`,
                  `${blob.name.split(".")[0]}`
                );
              },
            }}

            // plugins={[
            //   [
            //     colorSyntax,
            //     // 기본 색상 preset 적용
            //     {
            //       preset: ["#1F2E3D", "#4c5864", "#ED7675"],
            //     },
            //   ],
            // ]} // colorSyntax 플러그인 적용
          />
          <button onClick={onModal}>Click!</button>
          <button
            onClick={() => {
              navigate(`/paper/${res?.userId}`);
            }}
          >
            나가기!
          </button>
          <button onClick={onTemporary}>임시저장!</button>
        </div>
      )}
    </>
  );
};

const HashWrapOuter = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const Thumbmail = styled.img`
  width: 15vw;
  height: 100px;
`;

// const HashInput = styled.input`
//   width: auto;
//   margin: 10px;
//   display: inline-flex;
//   outline: none;
//   cursor: text;
//   line-height: 2rem;
//   margin-bottom: 0.75rem;
//   min-width: 8rem;
//   border: none;
// `;

export default WriteEdit;
