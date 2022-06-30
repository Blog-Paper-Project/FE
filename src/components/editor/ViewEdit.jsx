/* Toast-UI Viewer 임포트 */
import "@toast-ui/editor/dist/toastui-editor-viewer.css";
import { Viewer } from "@toast-ui/react-editor";
import reactMarkdown from "react-markdown";

import { useQuery } from "react-query";
import api from "../../shared/apis/Apis";

const ViewEdit = ({ userid }) => {
  //1. 마크다운 ( 7번 뒷 부분에 이제 get 받아오는 markdouwn 값 넣어주면 됌)
  //2. 그리고 viewer로 만들어진 이 컴포넌트를 myblog의 map 돌리는 곳에 넣어주면 될듯?
  //3. myblog 페이지에서 이거 컴포넌트 넣고 거기에 props로 데이터 보내주고 여기서 돌리면 될듯
  // console.log(userid);
  const WriteData = async () => {
    const getData = await api.get(`/api/paper/users/1/13`);
    // console.log(getData);
    return getData?.data;
  };

  const { data: view_data } = useQuery("write_data", WriteData);

  // console.log("view_data?.papers.contents", view_data?.papers.contents);
  const markdown = view_data?.papers.contents;
  const head = view_data?.papers.title;

  console.log("markdown", markdown);
  return (
    <div style={{ border: "1px solid black", height: "400px" }}>
      {/* <reactMarkdown> */}
      <Viewer initialValue={head} />

      <Viewer initialValue={markdown} />
      {/* </reactMarkdown> */}
    </div>
  );
};

export default ViewEdit;
