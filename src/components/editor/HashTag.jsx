import React, { useState } from "react";

const HashTag = () => {
  //태그
  const [tag, setTag] = useState("");
  const [tagList, setTagList] = useState([]);

  //
  const onKeyUp = (e) => {
    if (e.target.value.length !== 0 && e.keyCode === 13) {
    }
  };
  return (
    <input type="text" placeholder="Enter를 누르시면 태그가 추가됩니다!" />
  );
};

export default HashTag;
