import React from 'react'

const LeafDrop = ({ setLeafCount, LeafCount }) => {
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
    <div>
        <select onChange={handleSelect} value={LeafCount}>
          {selectList.map((item) => (
            <option value={item} key={item}>
              {item}
            </option>
          ))}
        </select>
        <h4>
          나뭇잎 갯수: <b>{LeafCount}</b>
        </h4>
      </div>
  )
}

export default LeafDrop