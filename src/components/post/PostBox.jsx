import React from "react";
import ViewEdit from "../editor/ViewEdit";
//1. 여긴 post한 글들을 보이고 싶은 내용들만 보이게 하고 맵 돌린다.
//2. 그리고 이 컴포넌트를 MyBlog에 붙힐 예정
//3. MyBlog에서 여기로 props 내려준다.
//4. !! 여기서 썸네일 이미지와 제목만 보여준다.
const PostBox = ({ userId, postId, title, contents, createAt }) => {
  return (
    <div style={{ margin_bottom: "50px" }}>
      <div>{title}</div>
      <img></img>
      <ViewEdit
        style={{ display: "none" }}
        userId={userId}
        postId={postId}
        title={title}
        contents={contents}
        createAt={createAt}
      />
    </div>
  );
};

export default PostBox;


key={idx}
userId={value.userId}
postId={value.postId}
title={value.title}
contents={value.contents}
createAt={value.createAt}