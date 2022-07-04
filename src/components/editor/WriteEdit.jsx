import React, { useEffect, useState } from "react";
import { useRef } from "react";
import { useNavigate } from "react-router";

/*Editor*/
import { Editor } from "@toast-ui/react-editor";
import "@toast-ui/editor/dist/toastui-editor.css";

/* Toast ColorSyntax 플러그인 */
import "tui-color-picker/dist/tui-color-picker.css";
import "@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css";
// import colorSyntax from "@toast-ui/editor-plugin-color-syntax";
import { useMutation } from "react-query";
import { apiToken } from "../../shared/apis/Apis";

//1. 여기에 임시글 저장 버튼도 필요함.
//2. 해시태그도

const WriteEdit = () => {
  const [markdown_data, setData] = useState("");
  const [head_data, setHead] = useState(null);
  const [OpenModal, setOpenModal] = useState(false);
  const editorRef = useRef();
  const [thumbImage, setImage] = useState(null);
  const navigate = useNavigate();
  // console.log(markdown_data);

  const onModal = () => {
    setOpenModal(true);
  };

  const onchange = (e) => {
    const abc = editorRef.current?.getInstance().getMarkdown();
    // console.log("25", abc);
    setData(abc); // 이는 위의 head_data 값
    // console.log("27", markdown_data);
  };

  const postfecher = async () => {
    let formData = new FormData();
    formData.append("image", thumbImage);

    const image_data = await apiToken.post("/api/paper/image", formData);
    console.log(image_data);

    const postData = await apiToken.post("/api/paper", {
      contents: markdown_data,
      title: head_data,
      thumbnail: image_data,
    });
    // console.log(postData?.data);
    return postData;
  };

  const { mutate: onPost } = useMutation(postfecher, {
    onSuccess: (data) => {
      console.log(data);
      alert("post 성공!");
      navigate(`/myblog/${data.paper.userId}`);
    },
    onError: () => {
      alert("post 실패!");
    },
  });

  const keyDown = (e) => {
    window.onkeydown = (e) => {
      // console.log(e.key);
      if (e.key === "Control") {
        alert("붙혀넣기 금지");
      }
    };
  };

  return (
    <>
      {OpenModal ? (
        <div
          style={{
            box_sizing: "border-box",
            border: "solid #5B6DCD 10px",
            height: "800px",
          }}
        >
          <input
            type="file"
            onChange={(e) => {
              setImage(e.target.files[0]);
            }}
          ></input>
          <button
            onClick={() => {
              setOpenModal(false);
            }}
          >
            x
          </button>
          <button onClick={onPost}>click</button>
        </div>
      ) : (
        <div
          // onMouseDown={(e) => {
          //   console.log(e);
          // }}
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
            onKeydown={keyDown}
            usageStatistics={false}
            hooks={{
              addImageBlobHook: async (blob, callback) => {
                // console.log(blob.name.split(".")[0]); // File {name: '카레유.png', ... }

                // 1. 첨부된 이미지 파일을 서버로 전송후, 이미지 경로 url을 받아온다.
                let formData = new FormData();
                formData.append("image", blob);

                const image_data = await apiToken.post(
                  "/api/paper/image",
                  formData
                );
                console.log(image_data?.data.imageUrl);
                console.log(process.env.REACT_APP_S3_URL);

                // 2. 첨부된 이미지를 화면에 표시(경로는 임의로 넣었다.)
                callback(
                  process.env.REACT_APP_S3_URL +
                    `/${image_data?.data.imageUrl}`,
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
              // setOpenModal(false);
              navigate(-1);
            }}
          >
            나가기!
          </button>
        </div>
      )}
    </>
  );
};

export default WriteEdit;
