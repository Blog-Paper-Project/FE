import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import Header from "../components/main/Header";
import { __searchPost } from "../redux/modules/Search";
import defaultUserImage from "../public/images/default_profile.png";
import Footer from "../components/main/Footer";
import HeadPaperSearch from "../components/main/HeadPaperSearch";

const Search = () => {

  return (
    <>
      <Wrap>
        <Header />
        <SearchBox>
          <HeadPaperSearch />
        </SearchBox>
        <Footer />
      </Wrap>
    </>
  );
};



const Wrap = styled.div`
  display: block;  
  height: auto;
  width: 100%;
  background-color: #fffdf7;
`;
const SearchBox = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 50px;
  height: 800px;
`


export default Search;
