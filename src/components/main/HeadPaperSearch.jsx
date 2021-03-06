import React, { useState } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { BiSearchAlt2 } from "react-icons/bi";

/* 컴포넌트 */
import { __searchPost } from "../../redux/modules/Search";

const HeadPaperSearch = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
//   console.log(search);

  return (
    <>
      <SearchBox>
        <BiSearchAlt2 color="black" size="40px" />
        <Search1
          value={search}
          placeholder="페이퍼의 제목이나 내용을 검색하실수 있습니다."
          onChange={(e) => {
            setSearch(e.target.value);
          }}
          onKeyPress={(e) => {
            if (search !== "" && e.key === "Enter") {
              e.preventDefault();
              dispatch(__searchPost(search));
              setSearch("");
              navigate(`/paper/search/${e.target.value}`);
            }
          }}
        />
      </SearchBox>
    </>
  );
};

const SearchBox = styled.div`
  width: 60%;
  height: 70px;
  padding-left: 20px;
  display: flex;
  align-items: center !important;
  outline: 1px solid #a7aca1;
  border: 1px solid #a7aca1;
`;

const Search1 = styled.input`
  background-color: #fffdf7;
  width: 100%;
  height: 100%;
  color: #212124;
`;

export default HeadPaperSearch;
