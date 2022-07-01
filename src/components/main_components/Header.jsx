import React, { useRef, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useNavigate } from 'react-router'
import { getCookie } from '../../shared/Cookie';
import api from '../../shared/apis/Apis';
import styled from 'styled-components';
import { useQuery } from 'react-query';
import { useDispatch } from 'react-redux'

/* 컴포넌트 */
import HeaderProfile from './HeaderProfile';
import HeadPaperSearch from './HeadPaperSearch';

const Header = () => {
  const navigate = useNavigate();

  /* 유저정보 모달창 */
  const username = getCookie("username")
  const nickname = getCookie("nickname")
  const [modalOpen, setModalOpen] = React.useState(false);
  const openModal = () => {
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };
  /* 유저정보 모달창 */

  /* 개인페이지 이동 */
  const useGetMyPaper = () => {
    return api.get(`/api/paper/users/1`)
  }
  const userpaper_query = useQuery("userpaper_list", useGetMyPaper, {
    onSuccess: (data) => {
      // console.log(data)
    }
  })
  if (userpaper_query.isLoading) {
    return null
  }
  /* 개인페이지 이동 */


  // const userMiniProfile = () => {
  //   return api.get("/api/paper/miniprofile");
  // }

  // const miniProfile_query = useQuery("pofile_list", userMiniProfile, {
  //   onSuccess: (data) => {
  //     console.log(data)
  //   }
  // })
  return (
    <>
      <HeaderBox>
        <Svg>
          <Logo>
            <Link to="/">
              <div>logo</div>
            </Link>
            <MainTitle>
              Paper
            </MainTitle>
          </Logo>


          <HeadPaperSearch />


          <button onClick={() => { navigate(`/myblog/:userId`) }}>내 블로그로 가기</button>
          <ProfileImgBox>
            <button onClick={openModal}>유저이미지(모달오픈)</button>
            <HeaderProfile open={modalOpen} close={closeModal} header="프로필" username={username} nickname={nickname} />
          </ProfileImgBox>

          <div>유저닉네임</div>
        </Svg>
      </HeaderBox>
    </>
  )
};
const HeaderBox = styled.div`
  background-color: gray;  
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
 
  width: 100%;
`
const Svg = styled.div`
  margin: 20px 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 80%;
  padding: 0 20%;
`
const Logo = styled.div`
  display: flex;
  align-items: center;
`
const MainTitle = styled.div`
  background-color: #fff;
  line-height: 2.3;
  display: block; 
  color: green;
  margin: 0 0 0 20px;
  border-radius: 10px;
`

const ProfileImgBox = styled.div`
display: flex; 
`


export default Header