// import React, { useState } from "react";
// import styled from "styled-components";

// const HashTag = () => {
//   //태그
//   const [tag, setTag] = useState("");
//   const [tagList, setTagList] = useState([]);

//   //## 'Enter'시 태그 추가
//   const onKeyUp = (e) => {
//     if (
//       e.target.value.length !== 0 &&
//       e.keyCode === 13 &&
//       tagList.length < 10
//     ) {
//       // 새 태그 배열(array) 안에 넣기 < 그래야 map으로 돌릴 수 있음 >
//       setTagList([...tagList, tag]);
//       setTag(""); // input에 value는 enter 후에 input 창 글 없애기 위함
//     }
//   };
//   //## 'Click'시 태그 삭제 이벤트
//   const onClcik_tag = (e) => {
//     console.log(e.target.id);
//     setTagList(
//       tagList.filter((tag, index) => {
//         return index !== +e.target.id; // + 대신 Number(  )해도 숫자형으로 바꿀 수 있다.
//       })
//     );
//   };
//   return (
//     <>
//       <input
//         name="HashTagInput"
//         type="text"
//         value={tag}
//         placeholder="Enter를 누르시면 태그가 추가됩니다!"
//         maxLength="10"
//         onKeyUp={onKeyUp}
//         onChange={(e) => {
//           setTag(e.target.value);
//         }}
//       />
//       <HashWrapOuter>
//         {tagList.length > 0 ? (
//           tagList.map((value, index) => {
//             return (
//               <div key={value + index} onClick={onClcik_tag}>
//                 <p id={index}>{value}</p>
//               </div>
//             );
//           })
//         ) : (
//           <div>태그를 추가하실 수 있습니다.</div>
//         )}
//       </HashWrapOuter>
//     </>
//   );
// };

// const HashWrapOuter = styled.div`
//   display: flex;
//   flex-wrap: wrap;
// `;

// export default HashTag;
