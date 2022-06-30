import React, { useState } from "react";
import { useRef } from "react";

/*Editor*/
import { Editor } from "@toast-ui/react-editor";
import "@toast-ui/editor/dist/toastui-editor.css";

/* Toast ColorSyntax 플러그인 */
import "tui-color-picker/dist/tui-color-picker.css";
import "@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css";
import colorSyntax from "@toast-ui/editor-plugin-color-syntax";
import api from "../../shared/apis/Apis";
import { useMutation } from "react-query";

//1. 여기에 임시글 저장 버튼도 필요함.
//2.

const WriteEdit = () => {
  const [markdown_data, setData] = useState(null);
  const [head_data, setHead] = useState(null);
  const editorRef = useRef();
  // console.log(markdown_data);

  const onchange = (e) => {
    const abc = editorRef.current?.getInstance().getMarkdown();
    // console.log("25", abc);
    setData(abc);
    // console.log("27", markdown_data);
  };

  const postfecher = async () => {
    const postData = await api.post(
      "/api/paper",
      {
        contents: markdown_data,
        title: head_data,
      },
      { headers: { "Content-Type": "application/json" } }
    );
    console.log(postData?.data);
    return postData;
  };

  const { mutate: onPost } = useMutation(postfecher, {
    onSuccess: () => {
      alert("post 성공!");
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
        height="700px"
        initialEditType="markdown"
        initialValue="Paper"
        ref={editorRef}
        onChange={onchange}
        useCommandShortcut={false}
        onKeydown={keyDown}
        plugins={[
          [
            colorSyntax,
            // 기본 색상 preset 적용
            {
              preset: ["#1F2E3D", "#4c5864", "#ED7675"],
            },
          ],
        ]} // colorSyntax 플러그인 적용
      />
      <button onClick={onPost}>Click!</button>
    </div>
  );
};

export default WriteEdit;
