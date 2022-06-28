import React from "react";
import UseInput from "../hooks/UseInput";
/* 컴포넌트 */

const Main = () => {
  const [id, setId] = UseInput(null);
  console.log(id);

  return (
    <>
      <input onChange={setId}></input>
    </>
  );
};

export default Main;
