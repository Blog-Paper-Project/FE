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

  return (
    <>
      <form>
        <SearchBox>
          <BiSearchAlt2 color="black" size="25px" />
          <Search1
            value={search}
            placeholder="검색하기"
            onChange={(e) => {
              setSearch(e.target.value);
            }}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                dispatch(__searchPost(search));
                setSearch("");
                navigate(`/paper/search/${e.target.value}`);
              }
            }}
          />
        </SearchBox>
      </form>
    </>
  );
};

const SearchBox = styled.div`
  position: relative;
  padding-left: 14%;
  display: flex;
  align-items: center !important;
`;

const Search1 = styled.input`
  background-color: #e5e2db;
  width: 46%;
  height: 100%;
  color: #212124;
`;

export default HeadPaperSearch;
