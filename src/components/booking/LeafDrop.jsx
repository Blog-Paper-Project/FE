import React from 'react'

const LeafDrop = ({ LeafCount, setLeafCount }) => {
  const selectList = [
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10"
  ];
  const handleSelect = (e) => {
    setLeafCount(e.target.value);
  };


  return (
    <>
      <div>
        <select onChange={handleSelect} value={LeafCount}>
          {selectList.map((item) => (
            <option value={item} key={item}>
              {item}
            </option>
          ))}
        </select>
      </div>
      
    </>
  )
}


export default LeafDrop