/* Toast-UI Viewer 임포트 */
import "@toast-ui/editor/dist/toastui-editor.css";
import { Viewer } from "@toast-ui/react-editor";

import { useQuery } from "react-query";
import "tui-color-picker/dist/tui-color-picker.css";
import "@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css";
import { api } from "../../shared/apis/Apis";
// import colorSyntax from "@toast-ui/editor-plugin-color-syntax";

const ViewEdit = ({ userid }) => {
  //1. 마크다운 ( 7번 뒷 부분에 이제 get 받아오는 markdouwn 값 넣어주면 됌)
  //2. 그리고 viewer로 만들어진 이 컴포넌트를 myblog의 map 돌리는 곳에 넣어주면 될듯?
  //3. myblog 페이지에서 이거 컴포넌트 넣고 거기에 props로 데이터 보내주고 여기서 돌리면 될듯
  // console.log(userid);
  const WriteData = async () => {
    const getData = await api.get(`/api/paper/users/1/61`);
    // console.log(getData);
    return getData?.data;
  };
  //1. isLoding, error 대신에 status로 한 번에 저 두가지 체크 가능
  //2. isLoding을 안 만들어주면 데이터가 안 왔을 때 처음에 (Undefined를 찍으니)보여지는 값에서 문제가 생길 수 있음
  //3. 왜 아래 error가 안 쓰이고 있다고 뜨는 거지?
  const { data: view_data, status, error } = useQuery("write_data", WriteData);

  if (status === "loading") {
    return <div>로딩중...</div>;
  }

  if (status === "error") {
    return alert("error...입니다");
  }

  // console.log("view_data?.papers.contents", view_data?.papers.contents);
  const markdown = view_data?.paper.contents;
  const head = view_data?.paper.title;
  // const head = `<h1>${view_data?.paper.title}</h1>`;

  // console.log("markdown", markdown);
  // console.log("markdown", view_data?.paper.contents);
  return (
    <div
      style={{
        border: "1px solid black",
        min_height: "900px",
      }}
    >
      <Viewer style={{ overflow: "scroll" }} initialValue={head} />

      <Viewer initialValue={markdown} />
    </div>
  );
};

export default ViewEdit;
