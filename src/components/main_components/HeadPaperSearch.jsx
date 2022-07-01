import React, { useState }from 'react'
import styled from 'styled-components';
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router'

/* 컴포넌트 */
import { __searchPost } from '../../redux/modules/Search';


const HeadPaperSearch = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [search, setSearch] = useState("")




  return (
    <>
      <form>
        <Search1
          value={search}
          placeholder="원하시는 paper를 검색해주세요"
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
      </form>
    </>
  );
};

const Search1 = styled.input`
  line-height: 1.4;
  font-size: 20px;
  background-color: #f2f3f6;
  box-sizing: border-box;
  height: 40px;
  padding: 16px 23px;
  border: none;
  border-radius: 15px;
  width: 360px;
  color: #212124;
`;

export default HeadPaperSearch