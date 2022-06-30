import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
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
  
  const username = getCookie("username")
  const nickname = getCookie("nickname")
  const [modalOpen, setModalOpen] = React.useState(false);
  const openModal = () => {
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };

  const userMiniProfile = () => {
    return api.get("/api/paper/miniprofile");
  }

  const miniProfile_query = useQuery("pofile_list", userMiniProfile, {
    onSuccess: (data) => {
      console.log(data)
    }
  })
 


  //`/paper/${userId}` - 블로그 개인 페이지 이동


  return (
    <>
      <HeaderBox>
        <Link to="/">
          <div>logo</div>
        </Link>
      
        <HeadPaperSearch />
        

        <button onClick={() => { navigate("/myblog") }}>내 블로그로 가기</button>
        <ProfileImgBox onClick={openModal}>
          <button>유저이미지(모달오픈)</button>
          <HeaderProfile open={modalOpen} close={closeModal} header="프로필" username={username} nickname={nickname}/>
        </ProfileImgBox>

        <div>유저닉네임</div>
      </HeaderBox>
    </>
  )
};
const HeaderBox = styled.div`
display: flex;
align-items: center;
justify-content: space-between;
height: 90px;
border-bottom: 3px solid #2e2727;
background-color: rgba(0, 0, 0, 0.5);
position: fixed;
top: 0;
left: 0;
width: calc(100% - 40px);
padding: 20px;
height: 60px;
}
`

const ProfileImgBox = styled.div`
display: flex; 
`


export default Header