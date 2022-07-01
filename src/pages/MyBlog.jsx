// // import React from "react";
import { useParams } from "react-router-dom";
import ViewEdit from "../components/editor/ViewEdit";
import Header from "../components/main/Header";

const MyBlog = () => {
  // const { userid } = useParams(1); // 1 자리에 이후에 useparams 넣어서 저런 방식으로 props로 보내주면 됌.
  // const WriteData = async () => {
  //   const getData = await api.get(`/api/paper/users/1/11`);
  //   console.log(getData);
  //   return getData;
  // };

  // const { data: write_data } = useQuery("write_data", WriteData);

  return (
    <div>
      <Header />
      <ViewEdit />
    </div>
  );
};

export default MyBlog;
